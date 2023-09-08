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

interface People {
  name: string;
  age: number;
}

interface Designer {
  name: string;
  skill: string;
}

function askSomeoneA(someone: Designer | People) {
  return someone.name;
}

//////////////////////////////////////////////////////////////////////////
// 인터섹션 타입(&)
function askSomeoneB(someone: Designer & People) {  // Designer와 People 인터페이스의 합집합인 셈..
  return someone.skill;
}

askSomeoneA({ name: '디자이너', skill: '웹디자인' });
askSomeoneA({ name: '작업자', age: 30 });

askSomeoneB({ name: '디자이너', skill: '웹디자인' });  // 에러: Designer와 People의 속성이 모두 있어야 함.
askSomeoneB({ name: '작업자', age: 30 }); // 에러: Designer와 People의 속성이 모두 있어야 함.