"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __await = (this && this.__await) || function (v) { return this instanceof __await ? (this.v = v, this) : new __await(v); }
var __asyncGenerator = (this && this.__asyncGenerator) || function (thisArg, _arguments, generator) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var g = generator.apply(thisArg, _arguments || []), i, q = [];
    return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
    function verb(n) { if (g[n]) i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
    function resume(n, v) { try { step(g[n](v)); } catch (e) { settle(q[0][3], e); } }
    function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
    function fulfill(value) { resume("next", value); }
    function reject(value) { resume("throw", value); }
    function settle(f, v) { if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]); }
};
// 1. symbol 类型的值是通过 Symbol 构造函数创建的
let symbol1 = Symbol();
let symbol2 = Symbol();
console.log(symbol1 == symbol2); // false
let symbol3 = Symbol('key');
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
let myArrIteratorFn = myArr[Symbol.iterator]();
console.log(myArrIteratorFn.next()); // { value: 1, done: false }
console.log(myArrIteratorFn.next()); // { value: 2, done: false }
console.log(myArrIteratorFn.next()); // { value: 3, done: false }
console.log(myArrIteratorFn.next()); // { value: undefined, done: true }
for (const iterator of myArr) {
    console.log(iterator); // 1 2 3
}
console.log(...myArr); // 1 2 3
let myIterable = {
    [Symbol.iterator]: function* () {
        yield 3;
        yield 2;
        yield 1;
    }
};
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
    [Symbol.asyncIterator]: function () {
        return __asyncGenerator(this, arguments, function* () {
            yield yield __await(3);
            yield yield __await(2);
            yield yield __await(1);
        });
    }
};
let asyncIteratorFn = myAsyncIterable[Symbol.asyncIterator]();
(() => __awaiter(void 0, void 0, void 0, function* () {
    // console.log(await asyncIteratorFn.next()); // { value: 3, done: false }
    // console.log(await asyncIteratorFn.next()); // { value: 2, done: false }
    // console.log(await asyncIteratorFn.next()); // { value: 1, done: false }
    // console.log(await asyncIteratorFn.next()); // { value: undefined, done: true }
    // for await (const iterator of myAsyncIterable) {
    //   console.log(iterator); // 3 2 1
    // }
}))();
// -
// 5. Generator
function* generator(i) {
    while (true) {
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
};
for (const key in myOb) {
    console.log(key); // key1 key2 key3
}
// 不是 iterable，无法使用 for...of，直接报错
// for (const iterator of myOb) {
//   console.log(iterator);
// }
let mySt = 'val';
// string 类型，一切皆对象
for (const key in mySt) {
    console.log(key); // 0 1 2
}
for (const iterator of mySt) {
    console.log(iterator); // v a l
}
