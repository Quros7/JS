// возвращает два узла с минимальной частотой
function Pick_mins (arr) {
    tr_l = arr.length;
    let min1 = 1000000000000;
    let min2 = 1000000000000;
    let ind1, ind2 = 0;
    for (let j = 0; j < tr_l; j++) {
        if ((arr[j].freq < min1) && (arr[j].used == 0)) {
            min1 = arr[j].freq;
            ind1 = j;
        }
    }
    for (let j = 0; j < tr_l; j++) {
        if ((arr[j].freq < min2) && (arr[j].used == 0) && (ind1 != j)) {
            min2 = arr[j].freq;
            ind2 = j;
        }
    }
    tree[ind1].used = 1;
    tree[ind2].used = 1;
    return [arr[ind1], arr[ind2]];
}

// создание узлов дерева
function Node (letter, freq, used, father, code) { 
    //this = {}; 
       this.letter = letter; 
       this.freq = freq; 
       this.used = used; 
       this.father = father; 
       this.code = code; 
    //return this 
};

// кодирует строку
function Code (str) {
    let n_str = "";
    // для обработки создаём копию дерева с параметром letter объектов вместо самих объектов
    let l_tree = new Array();
    for (let k = 0; k < tree.length; k++) {
        l_tree.push(tree[k].letter);
    }
    for (let k = 0; k < str.length; k++) {
        n_str += tree[l_tree.indexOf(inpStr[k])].code;
    }
    return n_str;
}
    
let inpStr = 'abrakadabra';
// создаём массив алфавита с частотами
let alph = new Array(); 
for (let i = 0; i < inpStr.length; i++) {
    if (alph[inpStr.charAt(i)]) {
        alph[inpStr.charAt(i)]++;
    }
    else {
        alph[inpStr.charAt(i)] = 1;
    }
}
// создаём базовое дерево
let tree = new Array();
let alph_len = 0;
for (i in alph){ 
    alph_len += 1;
    let n = new Node(i, alph[i], 0, null, ""); 
    tree.push(n);
}

// достраиваем дерево
let n_letter = "";
while (n_letter.length < alph_len) {
    mins = Pick_mins(tree);
    n_letter = mins[0].letter + mins[1].letter;
    let n_freq = mins[0].freq + mins[1].freq;
    let n = new Node(n_letter, n_freq, 0, null, "");
    tree.push(n);
    // изменяем у минимумов параметр father
    tree[tree.indexOf(mins[0])].father = tree.indexOf(n);
    tree[tree.indexOf(mins[1])].father = tree.indexOf(n);
}

// кодируем элементы дерева
let min_father = alph_len;
let max_father = tree.length - 1;
// для обработки создаём копию дерева с параметром father объектов вместо самих объектов
c_tree = new Array();
for (let k = 0; k < tree.length; k++) {
    c_tree.push(tree[k].father);
}
// обрабатываем каждый уровень дерева
for (max_father; max_father >= min_father; max_father--) {
    let ind1 = c_tree.indexOf(max_father);
    let ind2 = c_tree.indexOf(max_father, ind1 + 1);
    tree[ind1].code = tree[max_father].code + "1";
    tree[ind2].code = tree[max_father].code + "0";
}
console.log(tree);
console.log(Code(inpStr));
