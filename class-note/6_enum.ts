

enum Shoes {
  Nike = '나이키',
  Adidas = '아디다스',
  NewBalance = '뉴발란스'
}

var myShoes = Shoes.Nike;
console.log(myShoes); // '나이키'

// ★ enum을 문자나 다른 숫자로 초기화하지 않으면, 기본적으로 0부터 시작한 숫자 인덱스가 들어간다.


// ※ enum 활용 예제
enum Answer {
  Yes = 'Y',
  No = 'N',
}

function askQuestion(answer: Answer) {
  if(answer === Answer.Yes) {
    console.log('정답입니다.');
  }
  if(answer === Answer.No) {
    console.log('오답입니다.');
  }
}

askQuestion('예스');
askQuestion('Y');
askQuestion('Yes');
askQuestion(Answer.Yes);