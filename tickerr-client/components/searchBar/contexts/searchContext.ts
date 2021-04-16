import { createContext } from "react";

import { ISearchContext } from "../models/searchContext";

export const SearchContext = createContext<ISearchContext>(null);
