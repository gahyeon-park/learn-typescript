// function logText(text) {
//   console.log(Text);
//   return text;
// }

// logText(10);
// logText('hello');
// logText(true);

function logGeneric<T>(text:T): T {  // 함수에 정의한 제네릭 타입을 파라미터의 타입으로 쓰고, 그 값을 반환값에도 쓰겠다.
  console.log(text);
  return text;
}

const str = logGeneric<string>('hi');
str.split('');
const flag = logGeneric<boolean>(true);

// ※ 기존 문법과 제네릭의 차이점 !
// 인자로 받는 타입이 하나로 정해져 있지 않을 경우, 파라미터의 타입을 any 또는 유니온 타입(string | number)으로 줄 수 있는데
// 이 경우, 인자로 받을 때는 문제없이 받을 수 있지만 그 값을 활용할 때는 타입이 하나로 명확하게 고정되는 게 아니기 때문에
// 해당 인자의 API를 인텔리센스에서 제공하지 않는다. 
// 또 유니온 타입으로 인자를 받는 함수의 경우 파라미터를 그대로 반환한다고 했을 때
// 반환값의 타입도 마찬가지로 한가지 타입으로 지정할 수 없기 때문에 
// 반환값의 인텔리센스에서는 유니온 타입에 정의한 두 개 이상의 타입의 교집합에 해당하는 API만 출력된다.

function logUnion(text: string | number) {
  console.log(text);
  return text;
}

const a = logUnion('a');
a.split();  // 에러
logUnion(10);


// 인터페이스에 제네릭을 선언하는 방법
interface Dropdown<T> {
  value: T;
  selected: boolean;
}

const dropdown: Dropdown<string> = { value: '선택지1', selected: false };


// 제네릭의 타입 제한 1
// function logTextLength<T>(text: T[]): T[] {
//   console.log(text.length);
//   text.forEach(function (t) {
//     console.log(t);
//   })
//   return text;
// }

// logTextLength<string>(['Hello']);


// 제네릭의 타입 제한 2 - 정의된 타입 이용하기
interface LengthType { 
  length: number;
}

function logTextLength<T extends LengthType>(text: T): T {  // 제네릭으로 어떤 타입이든 받을 수 있지만, LengthType 인터페이스를 상속함으로써 length 속성을 가져야 하는 제한을 갖게 된다.
  text.length;
  return text;
}

logTextLength('a'); // 문자열 객체는 기본적으로 length 속성을 가지므로 통과!
logTextLength(100); // 숫자 객체는 length 속성이 없으므로 에러 !
logTextLength({ length: 100 });


// 제네릭 타입 제한 3 - keyof
interface ShoppingItem {
  name: string;
  price: number;
  stock: number;
}

function getShoppingItemOption<T extends keyof ShoppingItem>(itemOption: T): T { // ShoppingItem 인터페이스의 key이름(name, price, stock)으로 제네릭을 제한.
  return itemOption;
}

getShoppingItemOption(100); // 에러
getShoppingItemOption("price");