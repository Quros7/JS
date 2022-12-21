const fs = require('fs');
const { argv } = require("process");
let f_inp = argv[2]; // считываем название входного файла в качестве аргумента командной строки
let inp = fs.readFileSync(f_inp, "utf8"); // прочитали содержимое файла в переменную inp

function priority(sym) {
    if (sym == "(") return 0;
    if ((sym == "+") || (sym == "-")) return 1;
    if ((sym == "*") || (sym == "/")) return 2;
    return 3;
}

function code(s) { // s - исходное выражение
    let out = []; // массив, называемый итоговой строкой
    let ind_out = -1; // индекс последнего элемента итоговой строке (сначала -1, т.к. пустой)
    let st = []; // массив, называемый стэком
    let ind_st = -1; // индекс последнего элемента в стэке (сначала -1, т.к. пустой)
    let len = s.length; // длина выражения
    let nums = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
    // начинаем обработку выражения
    for (let i = 0; i < len; i++) {
        let cur = s[i]; // текущий символ
        // если текущий символ - цифра, помещаем в итоговую строку
        if (cur in nums) {
            console.log(cur, "NUM");
            out.push(cur);
            ind_out += 1;
        }
        // если текущий символ - открывающая скобка, то помещаем в стэк
        else if (cur == '(') {
            console.log(cur, "(");
            st.push(cur);
            ind_st += 1;
        }
        // если текущий символ - закрывающая скобка
        else if (cur == ')') {
            console.log(cur, ")");
            // то переносим элементы стэка в итоговую строку
            // пока не встретим открывающую скобку или конец стэка
            while ((ind_st > -1) && (st[ind_st] != '(')) {
                console.log((ind_st > -1), (st[ind_st] != '('));
                out.push(st[ind_st]);
                st.pop();
                ind_out += 1;
                ind_st -= 1;
            }
            // удаляем из стэка открывающую скобку
            st.pop();
            ind_st -= 1;
        }
        // иначе текущий символ - оператор
        else {
            console.log(cur, "OP");
            // разбираем стэк, пока наверху операторы с большим или равным приоритетом
            while ((st.length > 0) && (priority(st[ind_st]) >= priority(cur))) {
                console.log(st[ind_st], cur, "|", priority(st[ind_st]), priority(cur))
                out.push(st[ind_st]);
                st.pop();
                ind_out += 1;
                ind_st -= 1;
            }
            // кладём оператор в стэк
            st.push(cur);
            ind_st += 1;
        }
        console.log(out, out[ind_out], st, st[ind_st]);
    }
    // заносим в итоговую строку все оставшиеся элементы стэка
    while (ind_st > -1) {
        out.push(st[ind_st]);
        st.pop();
        ind_out += 1;
        ind_st -= 1;
    }

    // let res = "";
    // for (let i = 0; i < out.length; i++) {
    //     res += out[i];
    // }
    console.log(out);
}

code(inp);
