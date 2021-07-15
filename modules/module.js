require('dotenv').config();
const transpoartArr = require('./stringToArray');

const {
    DEBUG_MODE,
    WIN_BONUS_ARR,
    MIN_BET,
    LOSE_BONUS_ARR,
    INIT_MONEY,
    TEST_TIMES,
    OUTPUT_TYPE
} = process.env;

const winBonusTable = transpoartArr(WIN_BONUS_ARR);
const loseBonusTable = transpoartArr(LOSE_BONUS_ARR);

function random() {
    return Math.random();
}

function updateBet(bet, interval) {
    return bet + interval;
}

function bonus(bet, point) {
    if (DEBUG_MODE === 'true') console.log(point >= 0.5 ? "win" : "lose");

    // win
    if (point >= 0.5 && point < 0.7) return bet * winBonusTable[0];
    if (point >= 0.7 && point < 0.9) return bet * winBonusTable[1];
    if (point >= 0.9 && point < 1) return bet * winBonusTable[2];

    // lose
    if (point >= 0.3 && point < 0.5) return bet * loseBonusTable[0];
    if (point >= 0.1 && point < 0.3) return bet * loseBonusTable[1];
    if (point >= 0 && point < 0.1) return bet * loseBonusTable[2];

}

// 計算報酬率，小數點四捨五入參考:https://blog.xuite.net/chingwei/blog/20942533
function roundDecimal(val, precision) {
    const size = Math.pow(10, precision);
    if (DEBUG_MODE === 'true') console.log(Math.round(val * size) / size, "precision");
    return Math.round(val * size) / size;
}

function assortLevel(base, testResultArr) {
    const global = {
        a1: 0,
        a2: 0,
        a3: 0,
        a4: 0,
        a5: 0
    };
    if (DEBUG_MODE === 'true') console.log("outputType:", OUTPUT_TYPE);
    if (OUTPUT_TYPE === "money") {
        testResultArr.forEach((item) => {
            if (item <= base * 0.5) global.a1 = global.a1 + 1;
            if (item > base * 0.5 && item <= base) global.a2 = global.a2 + 1;
            if (item > base && item <= base * 1.5) global.a3 = global.a3 + 1;
            if (item > base * 1.5 && item <= base * 2) global.a4 = global.a4 + 1;
            if (item > base * 2) global.a5 = global.a5 + 1;
        });
    }

    if (OUTPUT_TYPE === "rateOfReturn") {

        testResultArr.forEach((item) => {
            if (item <= -50) global.a1 = global.a1 + 1;
            if (item > -50 && item <= 0) global.a2 = global.a2 + 1;
            if (item > 0 && item <= 50) global.a3 = global.a3 + 1;
            if (item > 50 * 1.5 && item <= 100) global.a4 = global.a4 + 1;
            if (item > 100) global.a5 = global.a5 + 1;
        });
    }

    return global;
}

function action(interval, _global, times) {
    const global = Object.assign({}, _global);

    for (let i = 0; i < times; i++) {
        if (global.money <= 0) break;
        const _random = random();
        if (_random >= 0.5) {
            global.times = global.times + 1;
            global.win = global.win + 1;
            global.money = global.money + bonus(global.bet, _random);
            global.bet = updateBet(global.bet, interval);
        } else {
            global.times = global.times + 1;
            global.lose = global.lose + 1;
            global.money = global.money - bonus(global.bet, _random);
            global.bet = updateBet(global.bet, interval * -2);
            if (global.bet <= 0) global.bet = Number(MIN_BET);
        }
    }
    global.initMoney = Number(INIT_MONEY);
    global.rateOfReturn = roundDecimal((((global.money / INIT_MONEY) - 1) * 100), 3);

    return global;
}

function runTest(interval, global, times) {
    const moneyResultArr = [];
    const rateOfReturnArr = [];

    for (let i = 0; i < TEST_TIMES; i++) {
        const { money, rateOfReturn } = action(interval, global, times);
        moneyResultArr.push(money);
        rateOfReturnArr.push(rateOfReturn);
    }

    // if (OUTPUT_TYPE === "money") return moneyResultArr;
    // if (OUTPUT_TYPE === "rateOfReturn") return rateOfReturnArr;
    return {
        "money": moneyResultArr,
        "rateOfReturn": rateOfReturnArr
    };

}

module.exports = {
    random,
    updateBet,
    bonus,
    action,
    assortLevel,
    runTest
};