// JS 선언
var strA = "hello";

// TS 선언
var strB: string = "hello";
let num: number = 10;
let arr: Array<number> = [1,2,3];
let colors: Array<string> = ["red", "green", "yellow"];
let itemsA: number[] = [1,2,3];
let itemsB: boolean[] = [true, false];


// TS 튜플 : 배열의 index마다 각각 타입이 별도로 정의됨.
let address: [string, number] = ['pangyo', 23];

// TS 객체
let obj: object = {};
// let person: object = {
//   name: 'suzy',
//   age: 100
// };

let person: {name: string, age: number} = {
  name: 'mimi',
  age: 20
};
