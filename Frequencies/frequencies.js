const fs = require('fs');
const { argv } = require("process");
let S = argv[2]; // считываем строку
alph = new Array();
//keys - letters of input string
//values - frequencies

//initialisation
for (let i = 0; i < S.length; i++) {
    if (alph[S.charAt(i)]) {
        alph[S.charAt(i)]++;
    }
    else {
        alph[S.charAt(i)] = 1;
    }
}

n = 0; //number of letters
for (i in alph) {
    alph[i] /= S.length;
    n++;
}

let h = 0;
for (i in alph) {
    h -= alph[i] * Math.log(alph[i]);
}
h /= Math.log(n);

console.log(h);
