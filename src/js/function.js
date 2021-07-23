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
console.log((my.createFn())()); // { val: 100 }
