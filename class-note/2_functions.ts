// 함수의 파라미터에 타입을 정의하는 방식
function sum(a: number, b: number) {
  return a + b;
}

sum(10, 2, 30); 
// └> JS에서는 정해진 파라미터 갯수를 넘겨서 인자를 넘겨도 상관이 없지만, TS에서는 정해진 파라미터 갯수 규칙을 어겨 에러 발생

// 함수의 반환값에 타입을 정의
function add(): number {
  return 10;
}

function add10(a: number, b: number): number {
  return a + b + 10;
}