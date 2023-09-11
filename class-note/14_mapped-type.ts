type Heroes = 'Hulk' | 'Capt' | 'Thor';

type HeroAges = { [k in Heroes]: number }; // Mapped type 이용해서 새로운 타입 생성

const ages: HeroAges = {
  Hulk: 100,
  Capt: 92,
  Thor: 200
}