"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TickerLink = void 0;
const react_1 = __importDefault(require("react"));
const react_router_dom_1 = require("react-router-dom");
const tickerPrice_1 = require("../tickerPrice/tickerPrice");
const TickerLink = (props) => {
    const { ticker } = props;
    return (react_1.default.createElement(react_router_dom_1.Link, { to: `/${ticker.symbol}`, className: "ticker-link" },
        react_1.default.createElement("h1", { className: "ticker-index passion-one-font" }, props.index),
        react_1.default.createElement("img", { className: "ticker-icon", src: `/img/icons/color/${ticker.symbol}.svg` }),
        react_1.default.createElement("div", { className: "ticker-symbol-and-price" },
            react_1.default.createElement("h1", { className: "ticker-symbol bangers-font" }, ticker.symbol),
            react_1.default.createElement(tickerPrice_1.TickerPrice, { value: ticker.price, change: ticker.change.day }))));
};
exports.TickerLink = TickerLink;
