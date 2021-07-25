"use strict";
// 1. 泛型
// 泛型函数：返回值的类型与传入参数的类型一致
// <T>是类型变量，一种特殊的变量，只用于表示类型而不是值
function identity(arg) {
    // console.log(arg.length); // number 类型不存在属性length
    return arg;
}
// 使用方法1：传入所有的参数，包括类型参数
let myIdentity = identity;
let output1 = identity('string arg');
console.log(output1);
// 使用方法2：编译器的类型推论
let output2 = identity(20);
console.log(output2);
let output3 = identity(['array elm1']);
console.log(output3);
// 泛型函数：参数类型明确为数组
function identity2(arg) {
    console.log(arg.length);
    return arg;
}
// 使用不同的泛型参数名，只要在数量上和使用方式对应上即可，相当于起别名
let identity2_otherName = identity2;
let output4 = identity2_otherName([1, 2, 3]);
console.log(output4);
// -
// 2. 泛型接口
// 使用带有调用签名的对象字面量来定义泛型函数
let identity2_otherName2 = identity2;
let output5 = identity2_otherName2([1, 2, 3]);
console.log(output5);
// 使用泛型接口
let identity2_otherName3 = identity2;
// 使用泛型接口，传递 number 指定泛型接口泛型参数类型，identity2_otherName4 这个函数仅用使用 number 类型数组参数
let identity2_otherName4 = identity2;
identity2_otherName4([1, 2, 3]);
// identity2_otherName4(['1', '2', '3']); // 不能将类型“string”分配给类型“number”
// -
// 3. 泛型类
class GenericClass {
    constructor(prop1, prop2) {
        this.getProp2 = () => {
            return this._prop2;
        };
        this._prop1 = prop1;
        this._prop2 = prop2;
    }
    get prop1() {
        return this._prop1;
    }
}
let myGenericClass = new GenericClass(110, 120);
let prop1 = myGenericClass.prop1;
let prop2 = myGenericClass.getProp2();
console.log(prop1, prop2); // 110 120
// 使用约束条件接口和 extends 关键字来实现泛型约束
function loggingIdentity(arg) {
    console.log(arg.length);
    return arg;
}
// 使用时，arg 参数必须带有 length 属性，length 属性是由约束描述的
loggingIdentity([1, 2, 3]); // 3
loggingIdentity({ length: 10 }); // 10
// 在泛型约束中使用类型参数
function getProperty(obj, key) {
    return obj[key];
}
let myObj = {
    a: 'a',
    b: 'b'
};
console.log(getProperty(myObj, 'a'));
console.log(getProperty(myObj, 'b'));
// console.log(getProperty(myObj, 'c')); // 类型“"c"”的参数不能赋给类型“"a" | "b"”的参数
// 在泛型里使用类类型
function createClass(c) {
    return new c();
}
// 使用原型属性推断并约束构造函数与类实例的关系
class MonkeyName {
    constructor() {
        this.name = 'monkey';
    }
}
class TrigerName {
    constructor() {
        this.name = 'triger';
    }
}
class Animal {
}
class Monkey extends Animal {
    constructor() {
        super(...arguments);
        this.prop = new MonkeyName;
    }
}
class Triger extends Animal {
    constructor() {
        super(...arguments);
        this.prop = new TrigerName;
    }
}
function createInstance(c) {
    return new c();
}
let monkey = createInstance(Monkey).prop.name;
let triger = createInstance(Triger).prop.name;
console.log(monkey); // monkey
console.log(triger); // triger
