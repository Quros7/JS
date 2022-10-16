const fs = require('fs');
const { argv } = require("process");
let f_name = argv[2]; // считываем файл с кодом
var readline = require('readline-sync');
mem = new Array(); // эмуляция памяти
// преобразование исходного кода в последовательность элементов массива
f_inp = fs.readFileSync(f_name, "utf8").toString().split("\r\n");
let t_str = "";
for (let i = 0; i < f_inp.length; i++) {
    t_str += f_inp[i] + " ";
}
t_str += "exit";
mem = t_str.split(" ");
let ip = 0;
// обработка операторов
while (mem[ip] != "exit") {
    switch(mem[ip]) {
        case "input":
            mem[mem[ip+1]] = readline.question("Enter: ") * 1;
            ip += 2;
            break;
        case "output":
            console.log(mem[mem[ip+1]]);
            ip += 2;
            break;
        case "add":
            mem[mem[ip+3]] = mem[mem[ip+1]] + mem[mem[ip+2]];
            ip += 4;
            break;
        case "mul":
            mem[mem[ip+3]] = mem[mem[ip+1]] * mem[mem[ip+2]];
            ip += 4;
            break;
        case "set":
            mem[mem[ip+1]] = mem[ip+2] * 1;
            ip += 3;
            break;
        case "jmp":
            ip = mem[ip+1] * 1;
            break;
        case "cmp":
            if (mem[mem[ip+1]] < mem[mem[ip+2]]) ip = mem[ip+3] * 1;
            else ip += 4;
            break;
        default:
            ip += 1;
            break;
    }
}
