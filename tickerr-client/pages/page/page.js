"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Page = void 0;
const react_1 = __importDefault(require("react"));
const loadingIcon_1 = require("../../components/loadingIcon/loadingIcon");
const requestStatus_1 = require("../../enums/requestStatus");
const Page = (props) => {
    const getPageContent = () => {
        if (props.status !== requestStatus_1.RequestStatus.Loading &&
            props.status !== requestStatus_1.RequestStatus.Error) {
            return (react_1.default.createElement("div", { className: "tickerr-page-content" }, props.children));
        }
    };
    const getLoading = () => {
        if (props.status === requestStatus_1.RequestStatus.Loading) {
            return (react_1.default.createElement(loadingIcon_1.LoadingIcon, null));
        }
    };
    return (react_1.default.createElement("div", { id: props.id, className: "tickerr-page" },
        getPageContent(),
        getLoading()));
};
exports.Page = Page;
