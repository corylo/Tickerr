"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TickerSidePanelField = void 0;
const react_1 = __importDefault(require("react"));
const classnames_1 = __importDefault(require("classnames"));
const TickerSidePanelField = (props) => {
    return (react_1.default.createElement("div", { className: classnames_1.default("ticker-side-panel-field", props.className) },
        react_1.default.createElement("h1", { className: "ticker-side-panel-field-value passion-one-font" }, props.value),
        react_1.default.createElement("h1", { className: "ticker-side-panel-field-label passion-one-font" }, props.label)));
};
exports.TickerSidePanelField = TickerSidePanelField;
