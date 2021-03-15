"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TickerrBrand = void 0;
const react_1 = __importDefault(require("react"));
const react_router_dom_1 = require("react-router-dom");
const TickerrBrand = (props) => {
    const getBrandText = () => {
        if (props.showBrandText !== undefined && props.showBrandText === false) {
            return null;
        }
        return (react_1.default.createElement("h1", { className: "bangers-font" }, "Tickerr"));
    };
    return (react_1.default.createElement(react_router_dom_1.Link, { className: "tickerr-brand", to: "/" },
        react_1.default.createElement("i", { className: "far fa-heart-rate" }),
        getBrandText()));
};
exports.TickerrBrand = TickerrBrand;
