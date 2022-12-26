const fs = require("fs");
const {argv} = require("process");
let f = fs.readFileSync(argv[2], "utf8"); // считываем файл, название передано как аргумент командной строки
flen = f.length; // длина файла
let sh = argv[4] * 1; // величина сдвига
let alphabet = "abcdefghijklmnopqrstuvwxyz";
let upper_alph = alphabet.toUpperCase();
let alph_len = alphabet.length; // мощность алфавита
let output = ""; // зашифрованное сообщение

for (let i = 0; i < flen; i++) {
    let sym = f[i];
    if (upper_alph.includes(sym)) { // обработка больших букв
        flag = true;
        sym = sym.toLowerCase();
    }
    if (!(alphabet.includes(sym))) { // если символ - не элемент алфавита, сразу записываем в файл;
        output += sym;
        continue;
    }
    let curpos = alphabet.search(sym);
    let edited = alphabet[(curpos + sh) % alph_len];
    if (flag) { // обработка больших букв
        output += edited.toUpperCase();
        flag = false;
    } else {
        output += edited;
    }
}

fs.writeFileSync(argv[3], output);
