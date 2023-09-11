// 타입 단언 (타입스크립트보다 개발자인 내가 타입을 더 잘 알고있다.)
var a;
a = 20;
a = 'a';
var b = a as string;


// DOM API 조작
var div = document.querySelector('div') as HTMLDivElement; 
if(div) { // null일 수도 있으므로 엘리먼트가 있는지 한번 체크
  div.innerText 
}

