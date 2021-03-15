import { EventContext, logger, pubsub } from "firebase-functions";
import axios from "axios";

import { db } from "../firebase";

import { TickerUtility } from "../utilities/tickerUtility";

import { ITicker, tickerConverter } from "../../tickerr-models/ticker";

exports.updateTickersJob = pubsub.schedule("every 1 minutes")
  .timeZone("America/Chicago")
  .onRun(async (context: EventContext) => {
    try {
      const snap: FirebaseFirestore.QuerySnapshot<FirebaseFirestore.DocumentData> = await db.collection("tickers")
        .orderBy("cap")
        .withConverter(tickerConverter)
        .get();

      const tickers: ITicker[] = TickerUtility.mapTickersFromCollection(snap);

      const res: any = await axios.get(TickerUtility.getGeckoUrl(tickers)),
        updatedTickers: ITicker[] = TickerUtility.updateTickers(tickers, res.data);
      
      const batch: FirebaseFirestore.WriteBatch = db.batch();

      updatedTickers.forEach((ticker: ITicker) =>
        batch.update(db.collection("tickers").doc(ticker.id).withConverter(tickerConverter), ticker));

      await batch.commit();

      await db.collection("tickers")
        .doc("crypto")
        .update({ top: updatedTickers });

      logger.log(`Successfully updated ${updatedTickers.length} tickers.`);
    } catch (err) {
      console.error(err);
    }

    return null;
  });