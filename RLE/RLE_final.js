const fs = require('fs');
const { argv } = require("process");
let mode = argv[2]; // считываем режим работы программы
let c_inp = argv[3]; // считываем исходный файл
let c_out = argv[4]; // считываем файл, в который запишем результат

function code (inp, out) {
    let s_inp = fs.readFileSync(inp, "utf8");
    let result = "";
    let length = s_inp.length;
    let l1 = s_inp[0];
    let l2 = "";
    let counter = 1;
    for (let ind = 1; ind < length; ind++) {
        l2 = s_inp[ind];
        if (l1 == l2) {
            counter += 1;
            // обработка последнего элемента
            if (ind == length - 1) {
                if (counter >= 4) {
                    if (counter <= 255) {
                        result += "#" + String.fromCharCode(counter) + l1;
                    } else {
                        num = Math.floor(counter / 255);
                        diff = counter - 255 * num;
                        for (let k = 1; k <= num; k++) {
                            result += "#" + String.fromCharCode(255) + l1;
                        }
                        if (diff > 0) {
                            result += "#" + String.fromCharCode(diff) + l1;
                        }
                    }
                } else {
                    for (let k = 1; k <= counter; k++) {
                        result += l1;
                    }
                }
            }
        } else {
            if (counter >= 4) {
                if (counter <= 255) {
                    result += "#" + String.fromCharCode(counter) + l1;
                } else {
                    num = Math.floor(counter / 255);
                    diff = counter - 255 * num;
                    for (let k = 1; k <= num; k++) {
                        result += "#" + String.fromCharCode(255) + l1;
                    }
                    if (diff > 0) {
                        result += "#" + String.fromCharCode(diff) + l1;
                    }
                }
            } else {
                // обработки символа #
                if (l1 == "#") {
                    result += "#" + String.fromCharCode(counter) + l1;
                    l1 = l2;
                    counter = 1;
                    continue;
                }
                for (let k = 1; k <= counter; k++) {
                    result += l1;
                }
            }
            // обработка последнего элемента
            if (ind == length - 1) {
                if (l1 == "#") {
                    result += "#" + String.fromCharCode(counter) + l1;
                    l1 = l2;
                    counter = 1;
                    continue;
                }
                result += l2;
                break
            }
            l1 = l2;
            counter = 1;
        }
    }
    fs.writeFileSync(out, result);
}

function decode (inp, out) {
    let s_inp = fs.readFileSync(inp, "utf8");
    let length = s_inp.length;
    let result = "";
    for (let ind = 0; ind < length; ind++) {
        if (s_inp[ind] == "#") {
            let counter = s_inp.charCodeAt(ind+1); //+ 4; //+4 - обработка сдвига при кодировании
            let symb = s_inp[ind+2];
            for (let k = 1; k <= counter; k++) {
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
