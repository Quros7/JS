const fs = require('fs');
const { argv } = require("process");
let f_inp = argv[2]; // считываем название входного файла в качестве аргумента командной строки
let inp = fs.readFileSync(f_inp, "utf8"); // прочитали содержимое файла в переменную inp
let nums = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
let ops = ['+', '-', '*', '/', '^'];

function priority(sym) {
    if (sym == "(") return 0;
    if ((sym == "+") || (sym == "-")) return 1;
    if ((sym == "*") || (sym == "/")) return 2;
    return 3;
}

function operation(op, n1, n2) {
    n1 = n1 * 1;
    n2 = n2 * 1;
    switch (op) {
        case "+":
            return n1 + n2;
        case "-":
            return n1 - n2;
        case "*":
            return n1 * n2;
        case "/":
            return n1 / n2;
        case "^":
            return Math.pow(n1, n2);
    }
}

function code(s) { // s - исходное выражение
    let out = []; // массив, называемый итоговой строкой
    let ind_out = -1; // индекс последнего элемента итоговой строке (сначала -1, т.к. пустой)
    let st = []; // массив, называемый стеком
    let ind_st = -1; // индекс последнего элемента в стеке (сначала -1, т.к. пустой)
    let len = s.length; // длина выражения
    // начинаем обработку выражения
    for (let i = 0; i < len; i++) {
        let cur = s[i]; // текущий символ
        // если текущий символ - цифра, помещаем в итоговую строку
        if (nums.includes(cur)) {
            // console.log(cur, "NUM");
            out.push(cur);
            ind_out += 1;
        }
        // если текущий символ - открывающая скобка, то помещаем в стек
        else if (cur == '(') {
            // console.log(cur, "(");
            st.push(cur);
            ind_st += 1;
        }
        // если текущий символ - закрывающая скобка
        else if (cur == ')') {
            // console.log(cur, ")");
            // то переносим элементы стека в итоговую строку
            // пока не встретим открывающую скобку или конец стека
            while ((ind_st > -1) && (st[ind_st] != '(')) {
                // console.log((ind_st > -1), (st[ind_st] != '('));
                out.push(st[ind_st]);
                st.pop();
                ind_out += 1;
                ind_st -= 1;
            }
            // удаляем из стека открывающую скобку
            st.pop();
            ind_st -= 1;
        }
        // иначе текущий символ - оператор
        else {
            if (!(ops.includes(cur))) {
                console.log("Введён неподдерживаемый оператор (", cur,"). Пожалуйста, проверьте исходное выражение.");
                process.exit();
            }
            // console.log(cur, "OP");
            // разбираем стек, пока у него наверху операторы с большим или равным приоритетом
            while ((st.length > 0) && (priority(st[ind_st]) >= priority(cur))) {
                // console.log(st[ind_st], cur, "|", priority(st[ind_st]), priority(cur))
                if ((st[ind_st] == cur) && (cur == "^")) {
                    break;
                }
                out.push(st[ind_st]);
                st.pop();
                ind_out += 1;
                ind_st -= 1;
            }
            // кладём оператор в стек
            st.push(cur);
            ind_st += 1;
        }
        // console.log(out, out[ind_out], st, st[ind_st]);
    }
    // заносим в итоговую строку все оставшиеся элементы стека
    while (ind_st > -1) {
        out.push(st[ind_st]);
        st.pop();
        ind_out += 1;
        ind_st -= 1;
    }
    return out; // возвращаем массив, соответствующий преобразованной строке
}

function count(s) {
    let len = s.length;
    let tmp = 0; // вспомогательная переменная
    let res = 0;
    let st = []; // создаём стек
    ind = -1;
    for (let i = 0; i < len; i++) {
        // если текущий символ - число, то добавляем в стек
        if (s[i] in nums) {
            st.push(s[i]);
            ind += 1;
        }
        // если оператор, то используем последние два числа в стеке
        else {
            tmp = operation(s[i], st[ind-1], st[ind]);
            st.pop();
            ind -= 1;
            st[ind] = tmp;
        }
    }
    return st[ind];
}

s_ready = code(inp); // записали в переменную подготовленное исходное выражение
// console.log(s_ready);
let result = count(s_ready);
console.log("Результат применения алгоритма к выражению =", result);
console.log("Результат применения функции eval() к выражению =", eval(inp));
