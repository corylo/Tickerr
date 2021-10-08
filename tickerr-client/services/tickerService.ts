import { DocumentReference, DocumentSnapshot } from "@firebase/firestore";
import { doc, getDoc } from "firebase/firestore";
import axios from "axios";
import _sortBy from "lodash.sortby";

import { db } from "../firebase";

import { TickerUtility } from "../utilities/tickerUtility";

import { ITicker } from "../../tickerr-models/ticker";
import { ITickerChartPoint } from "../../tickerr-models/tickerChartPoint";
import { ITickerReference, tickerReferenceConverter } from "../../tickerr-models/tickerReference";

import { Currency } from "../../tickerr-enums/currency";

interface ITickerService {
  fetchChart: (symbol: string, currency: Currency) => Promise<ITickerChartPoint[]>;
  fetchGeckoID: (symbol: string) => Promise<string>;
  fetchTicker: (geckoID: string, currency: Currency) => Promise<ITicker>;
  fetchTickers: (currency: Currency, limit?: number) => Promise<ITicker[]>;
}

export const TickerService: ITickerService = {
  fetchChart: async (symbol: string, currency: Currency): Promise<ITickerChartPoint[]> => {
    const res: any = await axios.get(TickerUtility.getGeckoChartUrl(symbol, currency));
    
    return TickerUtility.mapTickerChart(res.data);
  },
  fetchGeckoID: async (symbol: string): Promise<string> => {
    const ref: DocumentReference<ITickerReference> = doc(db, "tickers", symbol)
      .withConverter<ITickerReference>(tickerReferenceConverter);

    const document: DocumentSnapshot<ITickerReference> = await getDoc(ref);

    if(document.exists()) {
      const { geckoID } = document.data();
      
      return geckoID;
    }
  },
  fetchTicker: async (geckoID: string, currency: Currency): Promise<ITicker> => {
    const res: any = await axios.get(TickerUtility.getGeckoTickerUrl(geckoID, currency));
    
    if(res.data && res.data.length === 1) {
      return TickerUtility.mapTicker(res.data[0]);
    }

    throw new Error(`Unexpected data returned for ticker: ${geckoID}`);
  },
  fetchTickers: async (currency: Currency, limit?: number): Promise<ITicker[]> => {
    const res: any = await axios.get(TickerUtility.getGeckoTickersUrl(currency, limit));
    
    return _sortBy(TickerUtility.mapTickers(res.data), "rank");
  }
}