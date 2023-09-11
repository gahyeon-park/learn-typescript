interface Manager {
  name: string;
  skill: string;
}

interface Workers {
  name: string;
}

interface People {
  name: string;
  skill: string;
}

var manager: Manager;
var worker: Workers;
manager = worker; // [TS에러] worker는 manager에 할당될 수 없음.
worker = manager; // 할당 가능


// 함수
var adding = function(a: number) {
}

var summ = function (a: number, b: number) {
}

adding = summ;  // [TS에러] 
summ = adding;


// 제네릭
interface Empty<T> {

}

var empty1: Empty<string>;
var empty2: Empty<number>;

empty1 = empty2;
empty2 = empty1;

interface NotEmpty<T> {
  data: T
}

var notEmpty1: NotEmpty<string>;
var notEmpty2: NotEmpty<number>;

notEmpty1 = notEmpty2;
notEmpty2 = notEmpty1;