const { sign } = require('crypto');
const fs = require('fs');
const { argv } = require("process");
let mode = argv[2]; // считываем режим работы программы
let c_inp = argv[3]; // считываем исходный файл
let c_out = argv[4]; // считываем файл, в который запишем результат

function code (inp, out) {
    let s_inp = fs.readFileSync(inp, "utf8");
    let result = "";
    let len = s_inp.length;
    counter = 1;
    ind = 1;
    for (let ind = 1; ind < len; ind++) {
        if ((s_inp[ind-1] == s_inp[ind]) && (counter < 255)) {
            counter += 1;
        } 
        else {
            if (counter > 3 || s_inp[ind - 1] == "#") {
                result += "#" + String.fromCharCode(counter) + s_inp[ind - 1];
            } else {
                for (let k = 1; k <= counter; k++) {
                    result += s_inp[ind - 1];
                }
            }
            counter = 1;
        }
    }
    if (counter > 3 || s_inp[len - 1] == "#") {
        result += "#" + String.fromCharCode(counter) + s_inp[len - 1];
    } else {
        for (let k = 1; k <= counter; k++) {
            result += s_inp[len - 1];
        }
    }
    fs.writeFileSync(out, result);
    console.log("Коэффициент сжатия = ", len / result.length);
}

function decode (inp, out) {
    let s_inp = fs.readFileSync(inp, "utf8");
    let len = s_inp.length;
    let result = "";
    for (let ind = 0; ind < len; ind++) {
        if (s_inp[ind] == "#") {
            let counter = s_inp.charCodeAt(ind + 1); //+ 4; //+4 - обработка сдвига при кодировании
            let symb = s_inp[ind + 2];
            for (let k = 0; k < counter; k++) {
                result += symb;
            }
            ind += 2;
        } else {
            result += s_inp[ind];
        }
    }
    fs.writeFileSync(out, result);
}

// обработка выбора режима
if (mode == "code") {
    code(c_inp, c_out);
}
else if (mode == "decode") {
    decode(c_inp, c_out);
}
else {
    console.log("Неверные параметры запуска программы.");
}
