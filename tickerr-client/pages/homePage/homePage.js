"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HomePage = void 0;
const react_1 = __importDefault(require("react"));
const page_1 = require("../page/page");
const tickerLink_1 = require("../../components/tickerLink/tickerLink");
const tickerEffects_1 = require("../../effects/tickerEffects");
const HomePage = (props) => {
    const { tickers, status } = tickerEffects_1.useTickerListEffect();
    const getTickerLinks = () => tickers
        .map((ticker, index) => react_1.default.createElement(tickerLink_1.TickerLink, { key: ticker.id, index: index + 1, ticker: ticker }));
    return (react_1.default.createElement(page_1.Page, { id: "tickerr-home-page", status: status },
        react_1.default.createElement("div", { id: "tickerr-home-page-ticker-links" }, getTickerLinks())));
};
exports.HomePage = HomePage;
