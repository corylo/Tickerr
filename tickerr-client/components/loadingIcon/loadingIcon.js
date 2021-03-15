"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoadingIcon = void 0;
const react_1 = __importDefault(require("react"));
const classnames_1 = __importDefault(require("classnames"));
const LoadingIcon = (props) => {
    const classes = classnames_1.default("loading-icon", { white: props.white });
    return (react_1.default.createElement("div", { className: "loading-icon-wrapper" },
        react_1.default.createElement("div", { className: classes },
            react_1.default.createElement("i", { className: "far fa-heart-rate" }))));
};
exports.LoadingIcon = LoadingIcon;
