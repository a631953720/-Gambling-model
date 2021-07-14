require('dotenv').config();

function transpoart(arrayLike) {
    const arr = arrayLike.split(',');
    return arr.map((item)=>Number(item));
}

module.exports = transpoart;
