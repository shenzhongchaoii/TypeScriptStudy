"use strict";
class Person {
    constructor() {
        this.name = '';
    }
}
let myPerson;
myPerson = new Person();
// -
// 2. 原始对象和对象类型的兼容
let x;
let y = { name: '张三', age: 18 };
x = y;
function sayHello(n) {
    console.log('hello ' + n.name);
}
sayHello(y);
// -
// 3. 函数的兼容
// 比较两个不同函数
// 参数列表不同
let fn11 = (a) => 0;
let fn22 = (x, y) => 0;
fn22 = fn11;
// fn11 = fn22; // 报错，不能将类型“(a: number, b: number) => number”分配给类型“(a: number) => number”
// 返回值列表不同
let fn111 = () => ({ name: '张三' });
let fn222 = () => ({ name: '张三', age: 18 });
fn111 = fn222;
// fn222 = fn111; // 报错，类型 "{ name: string; }" 中缺少属性 "age"，但类型 "{ name: string; age: number; }" 中需要该属性
// 参数双向协变
function exampleFn(cb) {
    // ...
}
exampleFn((e) => console.log(e));
// 可选参数与剩余参数
function myFnc(args, cb) {
    // ...
}
myFnc([1, 2], (x, y) => console.log(x, y));
myFnc([1, 2], (x, y) => console.log(x, y));
let myFnc2 = (...args) => {
    console.log(args);
};
myFnc2 = (x, y) => {
    console.log(x, y);
};
// -
// 4. 枚举的兼容
var Enum1;
(function (Enum1) {
    Enum1[Enum1["X"] = 0] = "X";
    Enum1[Enum1["Y"] = 1] = "Y";
    Enum1[Enum1["Z"] = 2] = "Z";
})(Enum1 || (Enum1 = {}));
var Enum2;
(function (Enum2) {
    Enum2[Enum2["X"] = 0] = "X";
    Enum2[Enum2["Y"] = 1] = "Y";
    Enum2[Enum2["Z"] = 2] = "Z";
})(Enum2 || (Enum2 = {}));
let val = Enum1.X;
// val = Enum2.X; // 不能将类型“Enum2.X”分配给类型“Enum1”
// -
// 5. 类的兼容
class Class1 {
    constructor(name, age) {
        this.name = name;
    }
}
class Class2 {
    constructor(name) {
        this.name = name;
    }
}
let c1 = new Class1('class1', 18);
let c2 = new Class2('class2');
c2 = c1;
c1 = c2;
let empty1 = {};
let empty2 = {};
empty1 = empty2;
empty2 = empty1;
// number, string, boolean, undefined, symbol, bigInt
// null
// object(Object对象，Array对象, Function对象, Date对象等等)
let argX;
argX = true;
argX = 10;
argX = null;
var EnumArg;
(function (EnumArg) {
    EnumArg[EnumArg["X"] = 0] = "X";
    EnumArg[EnumArg["Y"] = 1] = "Y";
    EnumArg[EnumArg["Z"] = 2] = "Z"; // Z = 2
})(EnumArg || (EnumArg = {}));
let result = EnumArg.X;
console.log(result); // 0
