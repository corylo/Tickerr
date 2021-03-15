"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const react_dom_1 = __importDefault(require("react-dom"));
const react_router_dom_1 = require("react-router-dom");
const app_1 = require("./components/app/app");
require("./components/app/app.scss");
react_dom_1.default.render(react_1.default.createElement(react_router_dom_1.BrowserRouter, null,
    react_1.default.createElement(app_1.App, null)), document.getElementById("root"));
