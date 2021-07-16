require('dotenv').config();

function transpoart(arrayLike) {
    console.log(arrayLike)
    const arr = arrayLike.split(',');
    return arr.map((item)=>Number(item));
}

module.exports = transpoart;
