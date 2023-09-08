

enum Shoes {
  Nike,
  Adidas,
  NewBalance
}

var myShoes = Shoes.Nike;
console.log(myShoes); // 0

// ★ enum을 문자나 다른 숫자로 초기화하지 않으면, 기본적으로 0부터 시작한 숫자 인덱스가 들어간다.