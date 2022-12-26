const fs = require("fs");
const {argv} = require("process");
let f = fs.readFileSync(argv[2], "utf8"); // считываем файл, название передано как аргумент командной строки
let flen = f.length; // длина сообщения
let sh = 0; // величина сдвига
let alphabet = "abcdefghijklmnopqrstuvwxyz";
let upper_alph = alphabet.toUpperCase();
alph_len = alphabet.length; // мощность алфавита
let pos_up = []; // позиции, на которых располагаются буквы в верхнем регистре
let ref_CF = [8.2, 1.5, 2.8, 4.3, 13, 2.2, 2, 6.1, 7, 0.15, 0.77, 4, 2.4, 6.7, 7.5, 1.9, 0.095, 6, 6.3, 9.1, 2.8, 0.98, 2.4, 0.15, 2, 0.074];
let CF = new Array(); // канонические частоты
for (let i = 0; i < alph_len; i++) {
    CF[alphabet[i]] = ref_CF[i];
}
let FF = new Array(); // фактические частоты
let output = ""; // дешифрованное сообщение

for (let i = 0; i < alph_len; i++) {
    FF[alphabet[i]] = 0;
}

let real_alph = new Array();
for (let i = 0; i < flen; i++) {
    let sym = f[i];
    if (upper_alph.includes(sym)) { // обработка больших букв
        pos_up.push(i);
        sym = sym.toLowerCase();
    }
    if (!(alphabet.includes(sym))) {
        continue;
    }
    FF[sym]++;
    real_alph.push(sym);
}

n = 0; // мощность алфавита сообщения
for (i in FF) { // частот букв в сообщении
    let buffer = FF[i] / flen;
    FF[i] = buffer;
    n++;
}

for (let i = 0; i < alph_len; i++) { // заполняем частоты остальных букв единицами
    if (!(FF[alphabet[i]])) {
        FF[alphabet[i]] = 1;
    }
}

FF = FF.sort();

let sums = [];
let minim = Infinity;

console.log("Значение сумм для каждого сдвига:");
// поиск нужного сдвига
for (let i = 0; i < alph_len; i++) { // i - сдвиг на текущей итерации
    let summa = 0;
    for (let j = 0; j < alph_len; j++) { // j - индекс элемента
        let sym = alphabet[j];
        let sh_sym = alphabet[(j+i)%alph_len];
        summa += Math.pow(CF[sym] - FF[sh_sym], 2);
    }
    sums.push(summa);
    if (summa < minim) { // находим по минимальной сумме сдвиг
        minim = summa;
        sh = i;
    }
}

// обратный сдвиг
for (let i = 0; i < flen; i++) {
    let sym = f[i];
    if ((upper_alph.includes(sym))) { // обработка больших букв
        flag = true;
        sym = sym.toLowerCase();
    }
    if (!(alphabet.includes(sym))) { // если символ - не элемент алфавита, сразу записываем в файл;
        output += sym;
        continue;
    }
    let curpos = alphabet.search(sym);
    let edited = alphabet[(curpos + sh) % alph_len];
    if (flag) {                         // обработка больших букв
        output += edited.toUpperCase();
        flag = false;
    } else {
        output += edited;
    }
}

fs.writeFileSync(argv[3], output); // записываем декодированное сообщение в файл
for (i in sums) console.log(i, sums[i]); // печатаем значение функции суммы для каждого сдвига
console.log("Сдвиг равен", sh);
