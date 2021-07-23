// 1. 普通函数与匿名函数
function fn1() {

}
const fn2 = function() {

}

// 闭包
function foo() {
  var val = 1;
  function bar() {
    return val ++;
  }
}


// -
// 2. 函数类型
let fooType: (a: number, b: number) => number;

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
console.log((my.createFn())()); // { val: 100 }