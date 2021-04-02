import { createContext } from "react";

import { IAccountStateContext } from "../models/accountStateContext";

export const AccountStateContext = createContext<IAccountStateContext>(null);
