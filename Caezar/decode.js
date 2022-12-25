const fs = require("fs");
const {argv} = require("process");
let f = fs.readFileSync(argv[2], "utf8"); // считываем файл, название передано как аргумент командной строки
flen = f.length; // длина файла
let sh = 0; // величина сдвига
let alphabet = "abcdefghijklmnopqrstuvwxyz";
let upper_alph = alphabet.toUpperCase();
alph_len = alphabet.length; // мощность алфавита
let pos_up = []; // позиции, на которых располагаются буквы в верхнем регистре
let CF = new Array();
CF = [8.2, 1.5, 2.8, 4.3, 13, 2.2, 2, 6.1, 7, 0.15, 0.77, 4, 2.4, 6.7, 7.5, 1.9, 0.095, 6, 6.3, 9.1, 2.8, 0.98, 2.4, 0.15, 2, 0.074];
let FF = new Array(); // фактические частоты
let output = ""; // дешифрованное сообщение

for (let i = 0; i < flen; i++) {
    let sym = f[i];
    if (upper_alph.includes(sym)) { // обработка больших букв
        pos_up.push(i);
        sym = sym.toLowerCase();
    }
    if (!(alphabet.includes(sym))) continue;
    if (FF[sym]) {
        FF[sym]++;
    }
    else {
        FF[sym] = 1;
    }
}

n = 0; // мощность алфавита сообщения
for (i in FF) {
    FF[i] /= flen;
    n++;
}

// здесь должен быть цикл с поиском нужного сдвига

console.log(FF);
console.log(alphabet);
