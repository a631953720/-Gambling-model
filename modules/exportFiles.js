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
    DEBUG_MODE,
    OUTPUT_TYPE
} = process.env;

function exportXlsx(params) {
    const testTable = outputType(params);
    const testData = [
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

    let arrayWorkSheet = xlsx.utils.aoa_to_sheet(testTable.concat(testData));
    let workBook = {
        SheetNames: ['arrayWorkSheet'],
        Sheets: {
            'arrayWorkSheet': arrayWorkSheet
        }
    };

    xlsx.writeFile(workBook, `./test-${Date.now()}.xlsx`);
}

function outputType (params) {
    if (OUTPUT_TYPE === "money") {
        return [
            ['區間內容', '次數'],
            ['遊戲結束的現金 是初始現金的0.5倍以下的次數', params.a1],
            ['遊戲結束的現金 是初始現金的0.5~1倍的次數', params.a2],
            ['遊戲結束的現金 是初始現金的1~1.5倍的次數', params.a3],
            ['遊戲結束的現金 是初始現金的1.5~2倍的次數', params.a4],
            ['遊戲結束的現金 是初始現金的2倍以上的次數', params.a5],
            []
        ]
    }

    if(OUTPUT_TYPE === "rateOfReturn"){
        return [
            ['區間內容', '次數'],
            ['報酬率小於-50', params.a1],
            ['報酬率介於-50~0', params.a2],
            ['報酬率介於0~50', params.a3],
            ['報酬率介於50~100', params.a4],
            ['報酬率大於100', params.a5],
            []
        ]
    }
}

module.exports = exportXlsx;