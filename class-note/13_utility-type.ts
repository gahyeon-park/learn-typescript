interface Product {
  id: number;
  name: string;
  price: number;
  brand: string;
  stock: number;
}

// 상품목록을 받아오기 위한 API 함수
function fetchProducts(): Promise<Product[]> {
  
}

interface ProductDetail {
  id: number;
  name: string;
  price: number;
}

// 상품 상세정보에서는 Product 인터페이스의 일부만 필요하다고 가정했을 때
// 인터페이스를 각각 만들면, 중복된 속성이 두 인터페이스에 들어가게 됨.

// 이미 정의되어 있는 인터페이스(Product)를 가지고 일부만 사용하고 싶다면, Pick 유틸리티 타입으로 변환해서 쓰자.
type ShoppingItem = Pick<Product, 'id' |'name' | 'price'>;
function displayProductDetail(shoppingItem: Pick<Product, 'id' |'name' | 'price'>) {
  
}