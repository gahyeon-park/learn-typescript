function logMessageA(value: any) {
  console.log(value);
}

logMessageA("test");
logMessageA(100);


// 유니온 타입(|) : 두개 이상의 타입을 쓸 수 있도록..
var value: string | number | boolean;

function logMessageB(value: string | number) {

  // ※타입 가드: 특정 타입으로 타입의 범위를 좁혀나가는(필터링하는) 과정
  if(typeof value === 'number') {
    value.toLocaleString();
  }

  if(typeof value === 'string') {
    value.toString();
  }

  // type이 string도 number도 아닐 경우 에러를 캐치할 수 있다.
  throw new TypeError('type must be a string or number');
}

logMessageB("test");
logMessageB(100);

//////////////////////////////////////////////////////////////////////////

interface Worker {
  name: string;
  age: number;
}

interface Designer {
  name: string;
  skill: string;
}

function askSomeone(someone: Designer | Worker) {
  return someone.name;
}