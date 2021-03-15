"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useTickerEffect = exports.useTickerListEffect = void 0;
const react_1 = require("react");
const firebase_1 = require("../firebase");
const ticker_1 = require("../../tickerr-models/ticker");
const requestStatus_1 = require("../enums/requestStatus");
const tickerStateAction_1 = require("../pages/tickerPage/enums/tickerStateAction");
const useTickerListEffect = () => {
    const [tickers, setTickers] = react_1.useState([]), [status, setStatus] = react_1.useState(requestStatus_1.RequestStatus.Loading);
    react_1.useEffect(() => {
        const unsubscribeToTickers = firebase_1.db.collection("tickers")
            .orderBy("cap", "desc")
            .withConverter(ticker_1.tickerConverter)
            .onSnapshot((snap) => {
            try {
                let updatedTickers = [];
                snap.forEach((doc) => updatedTickers.push(doc.data()));
                setTickers(updatedTickers);
                if (status !== requestStatus_1.RequestStatus.Success) {
                    setStatus(requestStatus_1.RequestStatus.Success);
                }
            }
            catch (err) {
                console.error("useTickerListEffect:", err.message);
                setStatus(requestStatus_1.RequestStatus.Error);
            }
        }, (err) => {
            console.error("useTickerListEffect:", err.message);
            setStatus(requestStatus_1.RequestStatus.Error);
        });
        return () => {
            unsubscribeToTickers();
        };
    }, []);
    return { tickers, status };
};
exports.useTickerListEffect = useTickerListEffect;
const useTickerEffect = (symbol, dispatch) => {
    react_1.useEffect(() => {
        if (symbol !== "") {
            const unsubscribeToTickers = firebase_1.db.collection("tickers")
                .where("symbol", "==", symbol)
                .withConverter(ticker_1.tickerConverter)
                .onSnapshot((snap) => {
                try {
                    if (snap.docs.length === 1) {
                        let tickers = [];
                        snap.forEach((doc) => tickers.push(doc.data()));
                        dispatch(tickerStateAction_1.TickerStateAction.SetTicker, tickers[0]);
                    }
                    else {
                        throw new Error(`Incorrect result size. Expected: [1]. Actual: [${snap.docs.length}]`);
                    }
                }
                catch (err) {
                    console.error("useTickerEffect:", err.message);
                    dispatch(tickerStateAction_1.TickerStateAction.SetStatus, requestStatus_1.RequestStatus.Error);
                }
            }, (err) => {
                console.error("useTickerEffect:", err.message);
                dispatch(tickerStateAction_1.TickerStateAction.SetStatus, requestStatus_1.RequestStatus.Error);
            });
            return () => {
                unsubscribeToTickers();
            };
        }
    }, [symbol]);
};
exports.useTickerEffect = useTickerEffect;
