"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = void 0;
const app_1 = __importDefault(require("firebase/app"));
require("firebase/firestore");
const firebaseConfig_1 = require("../config/firebaseConfig");
const getConfig = () => {
    if (process.env.NODE_ENV === "production") {
        return firebaseConfig_1.tickerrProductionAppConfig;
    }
    return firebaseConfig_1.tickerrProductionAppConfig;
    // return tickerrDevelopmentAppConfig;
};
app_1.default.initializeApp(getConfig());
exports.db = app_1.default.firestore();
