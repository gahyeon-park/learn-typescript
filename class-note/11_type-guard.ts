interface Developer {
  name: string;
  skill: string;
}

interface Workman {
  name: string;
  age: number;
}

function introduce(): Developer | Workman {
  return { name: 'Tom', age: 33, skill: 'javascript'}
}

var tom = introduce();
console.log(tom.skill); 
// [TS에러]: 명시적으로 반환값에 skill이 있음에도 유니온 타입(Developer | Workman)으로 받기 때문에 이 두 타입의 공통 속성(name)만 알려준다.

// 타입 단언으로 먼저 시도
if((tom as Developer).skill) { // tom은 Developer라고 단언해주면 skill 속성을 쓸 수 있다.
  var skill = (tom as Developer).skill;
  console.log(skill);
} else if ((tom as Workman).age) {
  var age = (tom as Workman).age;
  console.log(age);
}

// └> 하지만 코드가 장황해짐..



// 타입 가드를 써보자. ↓↓↓↓↓↓   'is' 키워드 사용
function isDeveloper(target: Developer | Workman): target is Developer {
  return (target as Developer).skill !== undefined; // skill 속성이 있을 경우 Developer 타입으로 취급
}

if(isDeveloper(tom)) {
  console.log(tom.skill);
} else {
  console.log(tom.age);
}