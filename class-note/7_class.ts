

class People {
  // ★ TS에서는 멤버변수의 타입을 최상단에 먼저 정의해야 함.
  // 변수의 유효범위인 public/private/protected 예약어도 쓸 수 있다.
  public name: string;
  private age: number;
  readonly log: string;

  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }
}

// 리액트 예전 문법
class App extends React.Component {
}

// 리액트 최신 문법: 훅 기반의 함수형 코드
function App() {
  return <div>Hello World</div>;
}