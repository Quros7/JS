const { argv } = require("process");
const fs = require("fs");
try {
	let array = fs.readFileSync(argv[2], "utf-8").toString().split("\n");
}
catch {
	console.log("Ошибка при попытке считать файл. Пожалуйста, проверьте корректность ввода имени файла.");
	process.exit();
}
let array = fs.readFileSync(argv[2], "utf-8").toString().split("\n");
let s = array[0];
let t = array[1];
// let s = argv[2];
// s = "колокольчик и колокол";
n = s.length;
// let t = argv[3];
// t = 'колокол';
m = t.length;
alph = new Array();

// Определяем алфавит строки t
for (let i = 0; i < m; i++) {
	alph[t.charAt(i)] = 0;
};
// В двумерном массиве del храним таблицу переходов
del = new Array(m+1);
for (let j = 0; j <= m; j++) {
	del[j] = new Array();
};
// Инициализируем таблицу переходов
for (i in alph) {
	del[0][i] = 0;
};
// Формируем таблицу переходов
for (let j = 0; j < m; j++) {
	prev = del[j][t.charAt(j)];
	del[j][t.charAt(j)] = j + 1;
	for (i in alph)
		del[j+1][i] = del[prev][i]
};
// Выводим таблицу переходов
// for (let j = 0; j <= m; j++) {
// 	out = '';
// 	for (i in alph) {
// 		out += del[j][i] + ' ';
// 	}
// 	console.log(out);
// }

state = 0;
positions = new Array();
for (i = 0; i < n; i++){
	if (s.charAt(i) in alph)
		state = del[state][s.charAt(i)]
	else 
		state = 0;
	// console.log(s.charAt(i), "        ", state);
	if (state == m) {
		positions.push(i - m  + 1);
		// console.log("Найдено вхождение на позиции ", i - m + 1);
	}
};
console.log("Вхождения:", positions);
