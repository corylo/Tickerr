import { createContext } from "react";

import { ITickerStateContext } from "../models/tickerStateContext";

export const TickerStateContext = createContext<ITickerStateContext>(null);
