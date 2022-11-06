// формат запуска скрипта:
// node bruteforce.js     inp.txt            aba
// где                  входной файл    искомая строка

const fs = require('fs');
const { argv } = require("process");
let inp = argv[2]; // считываем входной файл

let s = fs.readFileSync(inp, "utf8"); // считываем строку, по которой производится поиск
slen = s.length;
let t = argv[3] + ""; // считываем искомую подстроку
tlen = t.length;
let positions = []; // массив найденный позиций вхождений подстроки в строку

// начало отсчёта времени
console.time();

for (let i = 0; i < slen - tlen + 1; i++) {
    flag = true;
    for (let j = 0; j < tlen; j++) {
        if (s[i+j] != t[j]) {
            flag = false;
            break;
        }
    }
    if (flag) positions.push(i+1);
}

console.log(positions);

// конец отсчёта времени
console.timeEnd();
