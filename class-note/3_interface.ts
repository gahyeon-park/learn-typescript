interface User {
  name: string;
  age: number;
}

// 변수에 인터페이스 적용
var personA: User = {
  name: 'suzy',
  age: 20
}

// 함수에 인터페이스 적용
function getUser(user: User) {
  console.log(user); 
}

const capt = {
  name: '캡틴',
  age: 100
}

getUser(capt);

// 함수의 스펙에 인터페이스 적용
interface SubtractInterface {
  (a: number, b: number): number
}

var subtract: SubtractInterface;
subtract = function(a, b) {
  return a - b;
}

// var subtract: SubtractInterface = function(a, b) {
//   return a - b;
// }

// 인덱싱
interface StringArray {
  [index: number]: string;
}

var arr: StringArray = ['a', 'b', 'c'];
arr[0] = 10; // 에러

// 딕셔너리 패턴
interface StringRegexDictionary {
  [key: string]: RegExp;
}

var obj: StringRegexDictionary = {
  // sth: /abc/,
  cssFile: /\.css$/,
  jsFile: /\.js$/
}

Object.keys(obj).forEach(function (value) { // [TS] (parameter) value: string
  
})

// 인터페이스 확장
interface Person {
  name: string;
  age: number;
}

interface Developer extends Person {
  language: string;
}

var nico: Developer = {
  name: 'josh',
  age: 30,
  language: 'typescript'
}