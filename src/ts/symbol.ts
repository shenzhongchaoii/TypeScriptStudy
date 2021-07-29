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
console.log(Symbol.keyFor(globalSymbol)); // myGolbalSym
let localSymbol = Symbol('myLocalSym');
console.log(Symbol.keyFor(localSymbol)); // undefined

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
let iteratorFn = myIterable[Symbol.iterator]();
console.log(iteratorFn.next()); // { value: 3, done: false }
console.log(iteratorFn.next()); // { value: 2, done: false }
console.log(iteratorFn.next()); // { value: 1, done: false }
console.log(iteratorFn.next()); // { value: undefined, done: true }
for (const iterator of myIterable) {
  console.log(iterator); // 3 2 1
}
console.log(...myIterable); // 3 2 1

// Symbol.asyncIterator  // ES9 新增
let myAsyncIterable = {
  [Symbol.asyncIterator]: async function*() {
    yield 3;
    yield 2;
    yield 1;
  }
}
let asyncIteratorFn = myAsyncIterable[Symbol.asyncIterator]();
(async() => {
  // console.log(await asyncIteratorFn.next()); // { value: 3, done: false }
  // console.log(await asyncIteratorFn.next()); // { value: 2, done: false }
  // console.log(await asyncIteratorFn.next()); // { value: 1, done: false }
  // console.log(await asyncIteratorFn.next()); // { value: undefined, done: true }
  // for await (const iterator of myAsyncIterable) {
  //   console.log(iterator); // 3 2 1
  // }
})()


// -
// 5. Generator
function* generator(i: number) {
  while(true) {
    yield i++;
  }
}
let gen = generator(1);
console.log(gen.next()); // { value: 1, done: false }
console.log(gen.next()); // { value: 2, done: false }

// 使用 return() 返回结束值，并结束生成器
// console.log(gen.return()); // { value: undefined, done: true }
// 使用 throw() 向生成器抛出一个错误
// console.log(gen.throw());

console.log(gen.next()); // 如果前面执行了 return()，后面的 next() 返回的都是 { value: undefined, done: true }


// -
// 6. for...of VS for...in
let myAr = ['val1', 'val2', 'val3'];
for (const key in myAr) {
  console.log(key); // 0 1 2
}
for (const iterator of myAr) {
  console.log(iterator); // val1 val2 val3
}

let myOb = {
  'key1': 'val1',
  'key2': 'val2',
  'key3': 'val3'
}
for (const key in myOb) {
  console.log(key); // key1 key2 key3
}
// 不是 iterable，无法使用 for...of，直接报错
// for (const iterator of myOb) {
//   console.log(iterator);
// }

let mySt = 'val'
// string 类型，一切皆对象
for (const key in mySt) {
  console.log(key); // 0 1 2
}
for (const iterator of mySt) {
  console.log(iterator); // v a l
}