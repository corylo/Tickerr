"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TickerPrice = void 0;
const react_1 = __importDefault(require("react"));
const classnames_1 = __importDefault(require("classnames"));
const currencyUtility_1 = require("../../utilities/currencyUtility");
const TickerPrice = (props) => {
    const getClasses = () => {
        return classnames_1.default("ticker-price", "passion-one-font", currencyUtility_1.CurrencyUtility.getChangeClass(props.change), `length-of-${props.value.toString().length}`);
    };
    return (react_1.default.createElement("h1", { className: getClasses() }, currencyUtility_1.CurrencyUtility.formatUSD(props.value)));
};
exports.TickerPrice = TickerPrice;
