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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TickerPage = void 0;
const react_1 = __importStar(require("react"));
const react_router_1 = require("react-router");
const classnames_1 = __importDefault(require("classnames"));
const page_1 = require("../page/page");
const tickerPrice_1 = require("../../components/tickerPrice/tickerPrice");
const tickerSidePanel_1 = require("./components/tickerSidePanel/tickerSidePanel");
const tickerStateReducer_1 = require("./reducers/tickerStateReducer");
const tickerStateContext_1 = require("./contexts/tickerStateContext");
const tickerEffects_1 = require("../../effects/tickerEffects");
const currencyUtility_1 = require("../../utilities/currencyUtility");
const tickerState_1 = require("./models/tickerState");
const tickerStateAction_1 = require("./enums/tickerStateAction");
const TickerPage = (props) => {
    const [tickerState, dispatchToTickerState] = react_1.useReducer(tickerStateReducer_1.tickerStateReducer, tickerState_1.defaultTickerState());
    const { ticker, status, sidePanelToggled, urlSymbol } = tickerState;
    const dispatch = (type, payload) => dispatchToTickerState({ type, payload });
    const match = react_router_1.useRouteMatch();
    react_1.useEffect(() => {
        if (match &&
            match.params &&
            match.params.symbol &&
            match.params.symbol.length > 1 &&
            match.params.symbol.length < 20) {
            dispatch(tickerStateAction_1.TickerStateAction.SetUrlSymbol, match.params.symbol);
        }
    }, []);
    tickerEffects_1.useTickerEffect(urlSymbol, dispatch);
    const getTickerStats = () => {
        if (ticker) {
            const classes = classnames_1.default(currencyUtility_1.CurrencyUtility.getChangeClass(ticker.change.day), {
                "side-panel-toggled": sidePanelToggled
            });
            return (react_1.default.createElement("div", { id: "ticker-stats", className: classes },
                react_1.default.createElement(tickerSidePanel_1.TickerSidePanel, null),
                react_1.default.createElement("div", { id: "ticker-stats-price-wrapper" },
                    react_1.default.createElement(tickerPrice_1.TickerPrice, { value: ticker.price, change: ticker.change.day }))));
        }
    };
    return (react_1.default.createElement(tickerStateContext_1.TickerStateContext.Provider, { value: { tickerState, dispatchToTickerState } },
        react_1.default.createElement(page_1.Page, { id: "tickerr-ticker-page", status: status }, getTickerStats())));
};
exports.TickerPage = TickerPage;
