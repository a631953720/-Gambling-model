require('dotenv').config();
const {
    assortLevel,
    runTest
} = require('./modules/module');
const exportXlsx = require('./modules/exportFiles');
const {
    PLAY_TIMES,
    FUNDING_RATIO,
    INIT_MONEY,
    OUTPUT,
    OUTPUT_TYPE
} = process.env;

function test() {
    const times = Number(PLAY_TIMES);
    const global = {
        win: 0,
        lose: 0,
        times: 0,
        bet: Number(INIT_MONEY) * Number(FUNDING_RATIO),
        money: Number(INIT_MONEY)
    };
    const base = global.money;
    const testResultObj = runTest(global, times);
    return assortLevel(base, testResultObj[OUTPUT_TYPE]);
}

if (OUTPUT === 'true') exportXlsx(test());
else console.log(test());