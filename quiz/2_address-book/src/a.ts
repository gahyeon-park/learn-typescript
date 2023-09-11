// function fetchItems() {
//   const items = ['a', 'b', 'c'];
//   return items;
// }

// const result = fetchItems();
// console.log(result);

// 1. Promise가 반환값일 경우, 함수 반환타입도 일단 Promise가 되어야 함.
// 2. Promise만 반환하면 Promise<unknown>으로 타입 에러.
// 3. Promise에서 resolve된 값의 타입이 제네릭으로 들어가야 함.
// (Promise 타입 정의파일에는 Promise를 반환받을 때 제네릭을 받게끔 선언되어 있다.)
// ∴ Promise<T>와 같은 형태로 나와야 하는 것.
function fetchItems(): Promise<string[]> {
  const items = ['a', 'b', 'c'];
  return new Promise(function (resolve) {
    resolve(items);
  });
}

fetchItems();
