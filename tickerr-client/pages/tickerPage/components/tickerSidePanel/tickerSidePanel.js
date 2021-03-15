"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TickerSidePanel = void 0;
const react_1 = __importStar(require("react"));
const tickerSidePanelField_1 = require("./tickerSidePanelField");
const tickerStateContext_1 = require("../../contexts/tickerStateContext");
const currencyUtility_1 = require("../../../../utilities/currencyUtility");
const tickerStateAction_1 = require("../../enums/tickerStateAction");
const TickerSidePanel = (props) => {
    const { tickerState, dispatchToTickerState } = react_1.useContext(tickerStateContext_1.TickerStateContext);
    const { ticker, sidePanelToggled } = tickerState;
    return (react_1.default.createElement("div", { id: "ticker-side-panel" },
        react_1.default.createElement("button", { id: "ticker-icon-and-symbol", onClick: () => dispatchToTickerState({ type: tickerStateAction_1.TickerStateAction.ToggleSidePanel, payload: !sidePanelToggled }) },
            react_1.default.createElement("img", { className: "ticker-icon", src: `/img/icons/color/${ticker.symbol}.svg` }),
            react_1.default.createElement("h1", { className: "ticker-symbol bangers-font" }, ticker.symbol)),
        react_1.default.createElement("div", { id: "ticker-side-panel-details-wrapper" },
            react_1.default.createElement("div", { id: "ticker-side-panel-details", className: "scroll-bar" },
                react_1.default.createElement(tickerSidePanelField_1.TickerSidePanelField, { value: currencyUtility_1.CurrencyUtility.formatUSD(ticker.cap), label: "Market Cap" }),
                react_1.default.createElement(tickerSidePanelField_1.TickerSidePanelField, { value: currencyUtility_1.CurrencyUtility.formatUSD(ticker.volume), label: "Day Volume" }),
                react_1.default.createElement(tickerSidePanelField_1.TickerSidePanelField, { className: currencyUtility_1.CurrencyUtility.getChangeClass(ticker.change.day), value: `${ticker.change.day}%`, label: "Day" })))));
};
exports.TickerSidePanel = TickerSidePanel;
