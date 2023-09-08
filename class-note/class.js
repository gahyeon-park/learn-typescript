// 생성자 함수
function Person(name, age) {
  this.name = name;
  this.age = age;
}

var mina = new Person('mina', 15);

// ↓ 기존의 생성자 함수를 ES6에서 문법만 바뀜
class Person {
  constructor(name, age) {
    // constructor: 초기화 메소드
    console.log('생성 되었습니다.');
    this.name = name;
    this.age = age;
  }
}

var suzy = new Person('수지', 35);
console.log(suzy);