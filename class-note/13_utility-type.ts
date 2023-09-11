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


// D. 유틸리티 타입 구현하기 - 인터페이스와 type만으로 Partial처럼 구현하기
interface UserProfile {
  username: string;
  email: string;
  profilePhotoUrl: string;
}

// # 방법1 
type UserProfileUpdate = {
  username?: UserProfile['username'];
  email?: UserProfile['email'];
  profilePhotoUrl?: UserProfile['profilePhotoUrl'];
}


// # 방법2 - Mapped 타입
type UserProfileUpdate = {
  [p in 'username' | 'email' | 'profilePhotoUrl']?: UserProfile[p]
}
// [p in 'username' | 'email' | 'profilePhotoUrl'] 
// └> JS의 for .. in 구문처럼 작동함 (모든 열거 가능한 속성에 대해 반복)


// # 방법3 - #2를 keyof 키워드로 좀더 축약한 버전
type UserProfileKeys = keyof UserProfile;
type UserProfileUpdate = {
  [p in keyof UserProfile]?: UserProfile[p]
}

// ★ updateProfile 함수에서는 UserProfile에 있는 속성을 다 받는 것이 아닌, 선택적으로 받을 수 있어야 한다.
function updateProfile(profile) {
  
}

// #4 (위 #1 ~ #3은 하나의 인터페이스에 국한한 Partial 기능이었고)
// 제네릭을 사용해 어떤 타입을 받든, 그 타입의 속성들을 선택적으로 받을 수 있는 진짜 Partial 기능 구현!
type Subset<T> = { 
  [p in keyof T]?: T[p]
}