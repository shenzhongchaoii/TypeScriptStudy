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


// -
// 4. 众所周知的Symbols
// Symbol.for()
// let mySym = Symbol('mySymDesc');
// console.log(mySym);
console.log(Symbol.for('mySymDesc')); // Symbol(mySymDesc)
console.log(Symbol.for('mySymDesc') == Symbol.for('mySymDesc')); // true

// Symbol.keyFor()
let globalSymbol = Symbol.for('myGolbalSym');
console.log(Symbol.keyFor(globalSymbol)); // myGolbalSym<br/>
let localSymbol = Symbol('myLocalSym');
console.log(Symbol.keyFor(localSymbol)); // undefined<br/>

// Symbol.iterator
let myArr = [1, 2, 3];
let myArrIteratorFn = myArr[Symbol.iterator]()
console.log(myArrIteratorFn.next()); // { value: 1, done: false }
console.log(myArrIteratorFn.next()); // { value: 2, done: false }
console.log(myArrIteratorFn.next()); // { value: 3, done: false }
console.log(myArrIteratorFn.next()); // { value: undefined, done: true }
for (const iterator of myArr) {
  console.log(iterator); // 1 2 3
}
console.log(...myArr); // 1 2 3

let myIterable = {
  [Symbol.iterator]: function*() {
    yield 3;
    yield 2;
    yield 1;
  }
}
let iteratorFn = myIterable[Symbol.iterator]()
console.log(iteratorFn.next()); // { value: 3, done: false }
console.log(iteratorFn.next()); // { value: 2, done: false }
console.log(iteratorFn.next()); // { value: 1, done: false }
console.log(iteratorFn.next()); // { value: undefined, done: true }
for (const iterator of myIterable) {
  console.log(iterator); // 3 2 1
}
console.log(...myIterable); // 3 2 1


interface In {
  name: string,
  length: number
}

type TypeExample1 = keyof In; // 'name' | 'length'
type TypeExample2 = keyof In[]; // number | 'length' | 'push' | 'forEach' | ....
type TypeExample3 = keyof { [prop:string]: In } // number | string
