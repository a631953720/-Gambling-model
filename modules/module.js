require('dotenv').config();
const transpoartArr = require('./test');

const {
    DEBUG_MODE,
    WIN_BONUS_ARR,
    MIN_BET,
    LOSE_BONUS_ARR
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
    // win
    if (point >= 0.5 && point < 0.7) return bet * winBonusTable[0];
    if (point >= 0.7 && point < 0.9) return bet * winBonusTable[1];
    if (point >= 0.9 && point < 1) return bet * winBonusTable[2];

    // lose
    if (point >= 0.3 && point < 0.5) return bet * loseBonusTable[0];
    if (point >= 0.1 && point < 0.3) return bet * loseBonusTable[1];
    if (point >= 0 && point < 0.1) return bet * loseBonusTable[2];

    if (DEBUG_MODE === 'true') console.log(bet, point);
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

    if(DEBUG_MODE === 'true') console.log(global);
    return global;
}

function assortLevel(base, moneyResultArr) {
    const global = {
        a1: 0,
        a2: 0,
        a3: 0,
        a4: 0,
        a5: 0
    };
    moneyResultArr.forEach((item) => {
        if (item <= base * 0.5) global.a1 = global.a1 + 1;
        if (item > base * 0.5 && item <= base) global.a2 = global.a2 + 1;
        if (item > base && item <= base * 1.5) global.a3 = global.a3 + 1;
        if (item > base * 1.5 && item <= base * 2) global.a4 = global.a4 + 1;
        if (item > base * 2) global.a5 = global.a5 + 1;
    });
    if(DEBUG_MODE === 'true') console.log(moneyResultArr);
    return global;
}

module.exports = {
    random,
    updateBet,
    bonus,
    action,
    assortLevel
};