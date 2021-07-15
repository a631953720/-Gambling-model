require('dotenv').config();
const {
    assortLevel,
    runTest
} = require('./modules/module');
const exportXlsx = require('./modules/exportFiles');
const {
    INTERVAL,
    PLAY_TIMES,
    INIT_BET,
    INIT_MONEY,
    OUTPUT,
    OUTPUT_TYPE
} = process.env;

function test() {
    const interval = Number(INTERVAL);
    const times = Number(PLAY_TIMES);
    const global = {
        win: 0,
        lose: 0,
        times: 0,
        bet: Number(INIT_BET),
        money: Number(INIT_MONEY)
    };
    const base = global.money;
    const testResult = runTest(interval, global, times);

    return assortLevel(base, testResult, OUTPUT_TYPE);
}

if (OUTPUT === 'true') exportXlsx(test());
else console.log(test());