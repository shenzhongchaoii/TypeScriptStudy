// 1. symbol 类型的值是通过 Symbol 构造函数创建的
let symbol1: symbol = Symbol();
let symbol2 = Symbol();
console.log(symbol1 == symbol2); // false

let symbol3: symbol = Symbol('key');
let symbol4 = Symbol('key');
console.log(symbol3 == symbol4); // false


// -
// 2. 作为对象属性的键
// let key = Symbol();
// let testObj = {
//   [key]: 'value'
// }
// console.log(testObj[key]); // value


// -
// 3. 结合计算出的属性名声明来声明对象的属性和类成员
// let getClassNameSymbol = Symbol();
// class TestC {
//   [getClassNameSymbol]() {
//     return getClassNameSymbol;
//   }
// }
// let testC = new TestC();
// console.log(testC[getClassNameSymbol]()); // Symbol();
