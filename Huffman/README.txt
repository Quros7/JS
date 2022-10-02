Лопарёв Влад Владимирович
КНМО-101
Постановка задачи:
На вход подаётся строка (строка считывается из файла, имя которого указывается в качестве аргумента командной консоли).
Необходимо эффективно закодировать и декодировать строку, используя алгоритм Хаффмана.
Для этого построить дерево, кодирующее алфавит из букв, входящих в состав исходной строки.
На выходе: дерево, закодированная строка, декодированная строка.

Пример работы программы:
PS C:\js\Huffman> node .\huffman_n.js .\input.txt
Tree: 
[
  Node { letter: 'a', freq: 5, used: 1, father: 8, code: '1' },
  Node { letter: 'b', freq: 2, used: 1, father: 6, code: '001' },
  Node { letter: 'r', freq: 2, used: 1, father: 6, code: '000' },
  Node { letter: 'k', freq: 1, used: 1, father: 5, code: '011' },
  Node { letter: 'd', freq: 1, used: 1, father: 5, code: '010' },
  Node { letter: 'kd', freq: 2, used: 1, father: 7, code: '01' },
  Node { letter: 'br', freq: 4, used: 1, father: 7, code: '00' },
  Node { letter: 'kdbr', freq: 6, used: 1, father: 8, code: '0' },
  Node { letter: 'akdbr', freq: 11, used: 0, father: null, code: '' }
]
Coded string:
10010001011101010010001
Decoded string:
abrakadabra