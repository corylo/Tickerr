"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.defaultTickerState = void 0;
const requestStatus_1 = require("../../../enums/requestStatus");
const defaultTickerState = () => ({
    sidePanelToggled: false,
    status: requestStatus_1.RequestStatus.Loading,
    ticker: null,
    urlSymbol: ""
});
exports.defaultTickerState = defaultTickerState;
