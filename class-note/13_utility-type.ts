interface Product {
  id: number;
  name: string;
  price: number;
  brand: string;
  stock: number;
}

// A. 상품목록을 받아오기 위한 API 함수
function fetchProducts(): Promise<Product[]> {
  
}

interface ProductDetail {
  id: number;
  name: string;
  price: number;
}

// B. 상품 상세정보를 나타내기 위한 함수
// 상품 상세정보에서는 Product 인터페이스의 일부만 필요하다고 가정했을 때
// 인터페이스를 각각 만들면, 중복된 속성이 두 인터페이스에 들어가게 됨.

// 이미 정의되어 있는 인터페이스(Product)를 가지고 일부만 사용하고 싶다면, Pick 유틸리티 타입으로 변환해서 쓰자.
type ShoppingItem = Pick<Product, 'id' |'name' | 'price'>;
function displayProductDetail(shoppingItem: Pick<Product, 'id' |'name' | 'price'>) {
  
}


// C. 특정 상품정보를 업데이트하는 함수
// : Product 인터페이스의 모든 속성을 매번 업데이트할 필요 X, 선택적으로 업데이트 필요한 속성만 받아서 업데이트하고 싶을 경우
type UpdateProduct = Partial<Product>;
function updateProductItem(productItem: Partial<Product>) { 
  
}
