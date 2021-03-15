"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CurrencyUtility = void 0;
exports.CurrencyUtility = {
    getChangeClass: (value) => {
        return value >= 0 ? "green" : "red";
    },
    formatUSD: (value) => {
        const formatter = Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
            maximumSignificantDigits: 12
        });
        return formatter.format(value);
    }
};
