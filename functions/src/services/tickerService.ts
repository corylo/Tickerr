import axios from "axios";
import _sortBy from "lodash.sortby";

import { TickerUtility } from "../../../tickerr-utilities/tickerUtility";

import { IGeckoTicker } from "../../../tickerr-models/geckoTicker";
import { ITicker } from "../../../tickerr-models/ticker";

import { Currency } from "../../../tickerr-enums/currency";

interface ITickerService {
  fetchTickers: (limit: number) => Promise<ITicker[]>;
}

export const TickerService: ITickerService = {
  fetchTickers: async (limit: number): Promise<ITicker[]> => {
    const max: number = 250,
      requests: any[] = [];

    let page: number = 1;

    for(let i: number = 0; i < limit; i += max) {
      requests.push(axios.get(TickerUtility.getGeckoTickersUrl(Currency.USD, limit, page++)));
    }

    const responses: any = await Promise.all(requests),
      data: IGeckoTicker[] = responses.map((res: any) => res.data).flat();
    
    return _sortBy(TickerUtility.mapTickers(data), "rank");
  }
}