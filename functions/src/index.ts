import { EventContext, logger, pubsub } from "firebase-functions";
import axios from "axios";

import { db } from "../firebase";

import { TickerService } from "../services/tickerService";

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

      const res: any = await axios.get(TickerUtility.getGeckoUrl(tickers));

      const updatedTickers: ITicker[] = TickerUtility.updateTickers(tickers, res.data);

      const batch: FirebaseFirestore.WriteBatch = db.batch();

      updatedTickers.forEach((ticker: ITicker) =>
        batch.update(db.collection("tickers").doc(ticker.id).withConverter(tickerConverter), ticker));

      await batch.commit();

      await db.collection("summary")
        .doc("crypto")
        .update({ top: updatedTickers });

      logger.log(`Successfully updated ${updatedTickers.length} tickers.`);
    } catch (err) {
      console.error(err);
    }

    return null;
  });
  
exports.updateTickerChartsJob = pubsub.schedule("every 3 minutes")
  .timeZone("America/Chicago")
  .onRun(async (context: EventContext) => {
    try {
      const snap: FirebaseFirestore.QuerySnapshot<FirebaseFirestore.DocumentData> = await db.collection("tickers")
        .orderBy("cap")
        .withConverter(tickerConverter)
        .get();

      const tickers: ITicker[] = TickerUtility.mapTickersFromCollection(snap);

      let updatedTickers = await TickerService.fetchCharts(tickers);
      
      const batch: FirebaseFirestore.WriteBatch = db.batch();

      updatedTickers.forEach((ticker: ITicker) =>
        batch.update(db.collection("tickers").doc(ticker.id).withConverter(tickerConverter), { chart: ticker.chart }));

      await batch.commit();

      logger.log(`Successfully updated charts for ${updatedTickers.length} tickers.`);
    } catch (err) {
      console.error(err);
    }

    return null;
  });