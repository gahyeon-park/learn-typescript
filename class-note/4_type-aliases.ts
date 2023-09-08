interface IPerson {
  name: string;
  age: number;
}

type TPerson = {
  name: string;
  age: number;
}

var minji: IPerson = {
  name: 'minji',
  age: 20
}

var minji: TPerson = {
  name: 'minji',
  age: 20
}

type MyString = string;
var str: MyString = "hello";

type Todo = { id: number; title: string; done: boolean };
function getTodo(todo: Todo) {
  
}