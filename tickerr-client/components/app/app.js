"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.App = void 0;
const react_1 = __importDefault(require("react"));
const react_router_1 = require("react-router");
const homePage_1 = require("../../pages/homePage/homePage");
const tickerPage_1 = require("../../pages/tickerPage/tickerPage");
const navbar_1 = require("../navbar/navbar");
const App = (props) => {
    return (react_1.default.createElement("div", { id: "tickerr-app" },
        react_1.default.createElement(navbar_1.Navbar, null),
        react_1.default.createElement(react_router_1.Switch, null,
            react_1.default.createElement(react_router_1.Route, { exact: true, path: "/" },
                react_1.default.createElement(homePage_1.HomePage, null)),
            react_1.default.createElement(react_router_1.Route, { exact: true, path: "/:symbol" },
                react_1.default.createElement(tickerPage_1.TickerPage, null)))));
};
exports.App = App;
