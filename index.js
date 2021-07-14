require('dotenv').config();
const {
    action,
    assortLevel
} = require('./modules/module');
const exportXlsx = require('./modules/exportFiles');
const {
    INTERVAL,
    PLAY_TIMES,
    INIT_BET,
    INIT_MONEY,
    OUTPUT,
    TEST_TIMES
} = process.env;

function test(_times) {
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
    const moneyResultArr = [];
    for (let i = 0; i < _times; i++) {
        const { money } = action(interval, global, times);
        moneyResultArr.push(money);
    }
    return assortLevel(base, moneyResultArr);
}

if (OUTPUT === 'true') exportXlsx(test(TEST_TIMES));
else console.log(test(TEST_TIMES));