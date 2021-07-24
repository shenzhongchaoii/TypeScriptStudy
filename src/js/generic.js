"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
// 1. 泛型
// 泛型函数：返回值的类型与传入参数的类型一致
// <T>是类型变量，一种特殊的变量，只用于表示类型而不是值
function identity(arg) {
    // console.log(arg.length); // number 类型不存在属性length
    return arg;
}
// 使用方法1：传入所有的参数，包括类型参数
var myIdentity = identity;
var output1 = identity('string arg');
console.log(output1);
// 使用方法2：编译器的类型推论
var output2 = identity(20);
console.log(output2);
var output3 = identity(['array elm1']);
console.log(output3);
// 泛型函数：参数类型明确为数组
function identity2(arg) {
    console.log(arg.length);
    return arg;
}
// 使用不同的泛型参数名，只要在数量上和使用方式对应上即可，相当于起别名
var identity2_otherName = identity2;
var output4 = identity2_otherName([1, 2, 3]);
console.log(output4);
// -
// 2. 泛型接口
// 使用带有调用签名的对象字面量来定义泛型函数
var identity2_otherName2 = identity2;
var output5 = identity2_otherName2([1, 2, 3]);
console.log(output5);
// 使用泛型接口
var identity2_otherName3 = identity2;
// 使用泛型接口，传递 number 指定泛型接口泛型参数类型，identity2_otherName4 这个函数仅用使用 number 类型数组参数
var identity2_otherName4 = identity2;
identity2_otherName4([1, 2, 3]);
// identity2_otherName4(['1', '2', '3']); // 不能将类型“string”分配给类型“number”
// -
// 3. 泛型类
var GenericClass = /** @class */ (function () {
    function GenericClass(prop1, prop2) {
        var _this = this;
        this.getProp2 = function () {
            return _this._prop2;
        };
        this._prop1 = prop1;
        this._prop2 = prop2;
    }
    Object.defineProperty(GenericClass.prototype, "prop1", {
        get: function () {
            return this._prop1;
        },
        enumerable: false,
        configurable: true
    });
    return GenericClass;
}());
var myGenericClass = new GenericClass(110, 120);
var prop1 = myGenericClass.prop1;
var prop2 = myGenericClass.getProp2();
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
var myObj = {
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
var MonkeyName = /** @class */ (function () {
    function MonkeyName() {
        this.name = 'monkey';
    }
    return MonkeyName;
}());
var TrigerName = /** @class */ (function () {
    function TrigerName() {
        this.name = 'triger';
    }
    return TrigerName;
}());
var Animal = /** @class */ (function () {
    function Animal() {
    }
    return Animal;
}());
var Monkey = /** @class */ (function (_super) {
    __extends(Monkey, _super);
    function Monkey() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.prop = new MonkeyName;
        return _this;
    }
    return Monkey;
}(Animal));
var Triger = /** @class */ (function (_super) {
    __extends(Triger, _super);
    function Triger() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.prop = new TrigerName;
        return _this;
    }
    return Triger;
}(Animal));
function createInstance(c) {
    return new c();
}
var monkey = createInstance(Monkey).prop.name;
var triger = createInstance(Triger).prop.name;
console.log(monkey); // monkey
console.log(triger); // triger
