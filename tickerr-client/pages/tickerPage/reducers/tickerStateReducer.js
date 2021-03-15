"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tickerStateReducer = void 0;
const requestStatus_1 = require("../../../enums/requestStatus");
const tickerStateAction_1 = require("../enums/tickerStateAction");
const tickerStateReducer = (state, action) => {
    switch (action.type) {
        case tickerStateAction_1.TickerStateAction.SetStatus:
            return Object.assign(Object.assign({}, state), { status: action.payload });
        case tickerStateAction_1.TickerStateAction.SetTicker:
            return Object.assign(Object.assign({}, state), { ticker: action.payload, status: requestStatus_1.RequestStatus.Success });
        case tickerStateAction_1.TickerStateAction.SetUrlSymbol:
            return Object.assign(Object.assign({}, state), { urlSymbol: action.payload });
        case tickerStateAction_1.TickerStateAction.ToggleSidePanel:
            return Object.assign(Object.assign({}, state), { sidePanelToggled: action.payload });
        default:
            throw new Error(`Unknown action type in tickerStateReducer: ${action.type}`);
    }
};
exports.tickerStateReducer = tickerStateReducer;
