"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Navbar = void 0;
const react_1 = __importDefault(require("react"));
const tickerrBrand_1 = require("../tickerrBrand/tickerrBrand");
const Navbar = (props) => {
    return (react_1.default.createElement("div", { id: "tickerr-navbar" },
        react_1.default.createElement(tickerrBrand_1.TickerrBrand, null)));
};
exports.Navbar = Navbar;
