// 타입 추론 기본 1
var a = 10; // 변수를 초기화 → 타입 추론 가능

function getB(b = 10) { // 파라미터의 기본값을 지정 시 기본값의 타입으로 추론 가능
  var c = 'hi';
  return b + c;
}

// 타입 추론 기본 2
interface Dropdown<T> {
  value: T;
  title: string;
}

var shoppingItem: Dropdown<string> = {
  value: 'abc',
  title: 'hello'
}

// 타입 추론 기본 3
interface Dropdown<T> {
  value: T;
  title: string;
}

// DetailedDropdown에 들어간 K타입이 Dropdown의 제네릭에도 전달됨.
interface DetailedDropdown<K> extends Dropdown<K> {
  description: string;
  tag: K;
}

var detaileItem: DetailedDropdown<number> = {
  value: 222,
  title: 'hello',
  tag: 111,
  description: 'aa'
}


// Best Commone Type
var arr = [1, 2, true, 'asdf'];  // var arr: (string | number | boolean)[]



