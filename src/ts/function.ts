// 1. 普通函数与匿名函数
type BaseFnType = () => void;
function fn1(): void { }
const fn2: BaseFnType = function() { }
const fn3: BaseFnType = () => { }

// 闭包
function foo() {
  var val = 1;
  function bar() {
    return val ++;
  }
}


// -
// 2. 函数类型
let fooT: (a: number, b: number) => number;

// 完整函数类型
let foo1: (arg1: number, arg2: number) => number = function (a: number, b: number) {
  return a + b;
}

// 函数类型推断
let foo2: (arg1: number, arg2: number) => number = function (a, b) {
  return a + b;
}


// -
// 3. 可选参数与默认参数
function bar(a: number, b?: number) {
  if (typeof b == 'number') {
    return a + b;
  }
  return a;
}
console.log(bar(1)); // 1
console.log(bar(1, 2)); // 3

function bar2(a: number, b = 2) {
  return a + b;
}
console.log(bar2(1)); // 3
console.log(bar2(1, undefined)); // 3


// -
// 4. 剩余参数
function baz(a: string, b: string, ...other: string[]) {
  console.log(arguments); // [Arguments] { '0': '1', '1': '2', '2': '3', '3': '4', '4': '5' }
  console.log(other); // [ '3', '4', '5' ]
  console.log(`${a}, ${b}, ${other.join(', ')}`) // 1, 2, 3, 4, 5
}

baz('1', '2', '3', '4', '5')


// -
// 5. this 和箭头函数
// this做参数
function fnc(this: void) {
	console.log(this); // 这里是一个假参数，undefined
}
interface OtherMyIntf {
  val: number;
}
interface MyIntf {
  num: number;
  createFn(this: MyIntf): () => OtherMyIntf // 这里直接表明 this 的类型是 MyIntf
}

let my: MyIntf = {
  num: 100,
  createFn: function(this: MyIntf) { // 这里直接表明 this 的类型是 MyIntf
    return () => {
      return {
        val: this.num // 所以可以直接使用 MyIntf 的 num
      }
    }
  }
}
const myFn = my.createFn();
console.log(myFn()); // { val: 100 }

// this 在回调函数内
interface UIElementIntf {
  addClickListener(onclick: (this: void, e: Event) => void): void;
}

class UIElement implements UIElementIntf {
  addClickListener(onClick: (this: void, e: Event) => void) {

  }
}

let uIElement = new UIElement();

class Handler {
  info: string = 'info';
  onClick(this: Handler, e: Event) {
    console.log(this.info); // info
  }
}
let h = new Handler();
// uIElement.addClickListener(h.onClick); // 每个签名的 "this" 类型不兼容，不能将类型“void”分配给类型“Handler”

class Handler2 {
  info: string = 'info';
  onClick(this: void, e: Event) {
    // console.log(this.info); // 类型“void”上不存在属性“info”
  }
}
let h2 = new Handler2();
uIElement.addClickListener(h2.onClick);

class Handler3 {
  info: string = 'info';
  onClick = (e: Event) =>  {
    console.log(this.info); // info
  }
}
let h3 = new Handler3();
uIElement.addClickListener(h3.onClick);


// -
// 6. 重载
interface Person {
  name: string;
  age: number;
}

// 重载列表
function getPerson(name: string): Person['name'];
function getPerson(age: number): Person['age'];
function getPerson(person: Person): Person;

// 声明实现
function getPerson(person: unknown) {
  return person;
}
console.log(getPerson('张三')); // 张三
console.log(getPerson(18)); // 18
// console.log(getPerson(true)); // 报错，重载的实现签名不存在，重载列表中未找到对应的声明
console.log(getPerson({ name: '张三', age: 18 })); //{ name: '张三', age: 18 }
