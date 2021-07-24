"use strict";
// 1. 普通函数与匿名函数
function fn1() {
}
var fn2 = function () {
};
// 闭包
function foo() {
    var val = 1;
    function bar() {
        return val++;
    }
}
// -
// 2. 函数类型
var fooType;
// 完整函数类型
var foo1 = function (a, b) {
    return a + b;
};
// 函数类型推断
var foo2 = function (a, b) {
    return a + b;
};
// -
// 3. 可选参数与默认参数
function bar(a, b) {
    if (typeof b == 'number') {
        return a + b;
    }
    return a;
}
console.log(bar(1)); // 1
console.log(bar(1, 2)); // 3
function bar2(a, b) {
    if (b === void 0) { b = 2; }
    return a + b;
}
console.log(bar2(1)); // 3
console.log(bar2(1, undefined)); // 3
// -
// 4. 剩余参数
function baz(a, b) {
    var other = [];
    for (var _i = 2; _i < arguments.length; _i++) {
        other[_i - 2] = arguments[_i];
    }
    console.log(arguments); // [Arguments] { '0': '1', '1': '2', '2': '3', '3': '4', '4': '5' }
    console.log(other); // [ '3', '4', '5' ]
    console.log(a + ", " + b + ", " + other.join(', ')); // 1, 2, 3, 4, 5
}
baz('1', '2', '3', '4', '5');
// -
// 5. this 和箭头函数
// this做参数
function fnc() {
    console.log(this); // 这里是一个假参数，undefined
}
var my = {
    num: 100,
    createFn: function () {
        var _this = this;
        return function () {
            return {
                val: _this.num // 所以可以直接使用 MyIntf 的 num
            };
        };
    }
};
var myFn = my.createFn();
console.log(myFn()); // { val: 100 }
var UIElement = /** @class */ (function () {
    function UIElement() {
    }
    UIElement.prototype.addClickListener = function (onClick) {
    };
    return UIElement;
}());
var uIElement = new UIElement();
var Handler = /** @class */ (function () {
    function Handler() {
        this.info = 'info';
    }
    Handler.prototype.onClick = function (e) {
        console.log(this.info); // info
    };
    return Handler;
}());
var h = new Handler();
// uIElement.addClickListener(h.onClick); // 每个签名的 "this" 类型不兼容，不能将类型“void”分配给类型“Handler”
var Handler2 = /** @class */ (function () {
    function Handler2() {
        this.info = 'info';
    }
    Handler2.prototype.onClick = function (e) {
        // console.log(this.info); // 类型“void”上不存在属性“info”
    };
    return Handler2;
}());
var h2 = new Handler2();
uIElement.addClickListener(h2.onClick);
var Handler3 = /** @class */ (function () {
    function Handler3() {
        var _this = this;
        this.info = 'info';
        this.onClick = function (e) {
            console.log(_this.info); // info
        };
    }
    return Handler3;
}());
var h3 = new Handler3();
uIElement.addClickListener(h3.onClick);
// 声明实现
function getPerson(person) {
    return person;
}
console.log(getPerson('张三')); // 张三
console.log(getPerson(18)); // 18
// console.log(getPerson(true)); // 报错，重载的实现签名不存在，重载列表中未找到对应的声明
console.log(getPerson({ name: '张三', age: 18 })); //{ name: '张三', age: 18 }
