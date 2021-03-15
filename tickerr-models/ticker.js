"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tickerConverter = void 0;
exports.tickerConverter = {
    toFirestore(ticker) {
        return {
            cap: ticker.cap,
            change: ticker.change,
            geckoID: ticker.geckoID,
            name: ticker.name,
            price: ticker.price,
            symbol: ticker.symbol,
            volume: ticker.volume
        };
    },
    fromFirestore(snapshot, options) {
        const data = snapshot.data(options);
        return {
            id: snapshot.id,
            cap: data.cap,
            change: data.change,
            geckoID: data.geckoID,
            name: data.name,
            price: data.price,
            symbol: data.symbol,
            volume: data.volume
        };
    }
};
