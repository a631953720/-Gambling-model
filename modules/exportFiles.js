require('dotenv').config();
const xlsx = require('xlsx');
const {
    INTERVAL,
    PLAY_TIMES,
    TEST_TIMES,
    INIT_BET,
    MIN_BET,
    INIT_MONEY,
    WIN_BONUS_ARR,
    LOSE_BONUS_ARR,
    DEBUG_MODE
} = process.env;
console.log(DEBUG_MODE);

function exportXlsx(params) {
    const testData = [
        ['區間內容', '次數'],
        ['遊戲結束的現金 是初始現金的0.5倍以下的次數', params.a1],
        ['遊戲結束的現金 是初始現金的0.5~1倍的次數', params.a2],
        ['遊戲結束的現金 是初始現金的1~1.5倍的次數', params.a3],
        ['遊戲結束的現金 是初始現金的1.5~2倍的次數', params.a4],
        ['遊戲結束的現金 是初始現金的2倍以上的次數', params.a5],
        [],
        ['參數名稱','參數設定'],
        ['賭金變動幅度',INTERVAL],
        ['每次遊戲的賭博次數',PLAY_TIMES],
        ['重複新一輪遊戲的次數',TEST_TIMES],
        ['初始賭金',INIT_BET],
        ['最低賭金',MIN_BET],
        ['初始現金',INIT_MONEY],
        ['勝利獎金參數陣列',WIN_BONUS_ARR],
        ['失敗賠錢參數陣列',LOSE_BONUS_ARR],
    ];

    let arrayWorkSheet = xlsx.utils.aoa_to_sheet(testData);
    let workBook = {
        SheetNames: ['arrayWorkSheet'],
        Sheets: {
            'arrayWorkSheet': arrayWorkSheet
        }
    };

    xlsx.writeFile(workBook, `./test-${Date.now()}.xlsx`);
}

module.exports = exportXlsx;