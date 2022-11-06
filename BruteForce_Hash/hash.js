// формат запуска скрипта:
// node hash.js     inp.txt            aba
// где            входной файл    искомая строка

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

// вычисляем хэш искомой строки
let t_hs = 0;
for (let i = 0; i < tlen; i++) {
    t_hs += t.charCodeAt(i);
}
// вычисляем хэш для первой позиции подстроки в исходной строке
let s_hs = 0;
for (let i = 0; i < tlen; i++) {
    s_hs += s.charCodeAt(i);
}

// вынужденная проверка совпадения на первой позиции
flag = true;
for (let j = 0; j < tlen; j++) {
    if (s[j] != t[j]) {
        flag = false;
        break;
    }
}
if (flag) positions.push(1);

// выполняем проверку для остальных позиций
for (let i = 1; i < slen - tlen + 1; i++) {
    // пересчитываем хэш для текущей позиции
    s_hs += s.charCodeAt(i+tlen-1) - s.charCodeAt(i-1);
    if (s_hs == t_hs) {
        flag = true;
        for (let j = 0; j < tlen; j++) {
            if (s[i+j] != t[j]) {
                flag = false;
                break;
            }
        }
        if (flag) positions.push(i+1);
    }
}

console.log(positions);

// конец отсчёта времени
console.timeEnd();
