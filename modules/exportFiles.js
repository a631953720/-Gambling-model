require('dotenv').config();
const xlsx = require('xlsx');
const {
    PLAY_TIMES,
    TEST_TIMES,
    FUNDING_RATIO,
    INIT_MONEY,
    WIN_BONUS_ARR,
    LOSE_BONUS_ARR,
    OUTPUT_TYPE,
    OUTPUT_NAME
} = process.env;

function exportXlsx(params) {
    const testTable = outputType(params);
    const testData = [
        ['參數名稱','參數設定'],
        ['每次遊戲的賭博次數',PLAY_TIMES],
        ['重複新一輪遊戲的次數',TEST_TIMES],
        ['單次下注的現金百分比', `${Number(FUNDING_RATIO) * 100} %`],
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

    xlsx.writeFile(workBook, `./${OUTPUT_NAME}-${Date.now()}.xlsx`);
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
            [],
            ['獲利人數', params.win],
            ['虧損人數', params.lose],
            ['整體勝率', params.winRate],
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
            [],
            ['獲利人數', params.win],
            ['虧損人數', params.lose],
            ['整體勝率', params.winRate],
            []
        ]
    }
}

module.exports = exportXlsx;