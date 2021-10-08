import firebase from "firebase-admin";
import { EventContext, logger } from "firebase-functions";

import { TickerService } from "./tickerService";

import { ITicker } from "../../../tickerr-models/ticker";
import { ITickerReference, tickerReferenceConverter } from "../../../tickerr-models/tickerReference";

import { db } from "../../firebase";

interface IScheduleService {  
  scheduledTickerUpdate: (context: EventContext) => Promise<void>;
}

export const ScheduleService: IScheduleService = {
  scheduledTickerUpdate: async (context: EventContext): Promise<void> => {
    const limit: number = 500;

    logger.info(`Checking top ${limit} cryptos for new entries.`);

    try {
      const tickers: ITicker[] = await TickerService.fetchTickers(limit);

      const referenceToTickers: firebase.firestore.Query<ITickerReference> = db.collection("tickers")
        .withConverter<ITickerReference>(tickerReferenceConverter);

      await db.runTransaction(async (transaction: firebase.firestore.Transaction) => {
        const snap: firebase.firestore.QuerySnapshot<ITickerReference> = await transaction.get(referenceToTickers);

        let references: ITickerReference[] = [];

        snap.forEach((doc: firebase.firestore.QueryDocumentSnapshot<ITickerReference>) => 
          references.push(doc.data()));

        const geckoIDs: string[] = references.map((reference: ITickerReference) => reference.geckoID),
          updates: ITicker[] = tickers.filter((ticker: ITicker) => !geckoIDs.includes(ticker.geckoID));

        if(updates.length > 0) {
          logger.info(`Adding ${updates.length} new entries.`, updates.map((update: ITicker) => update.symbol));

          updates.forEach((ticker: ITicker) => {
            const ref: firebase.firestore.DocumentReference = db.collection("tickers")
              .doc(ticker.symbol);

            transaction.set(ref, { geckoID: ticker.geckoID });
          });
        }
      });
    } catch (err) {
      logger.error(err);
    }
  }
}