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
var printLabel = function (labelObj) {
    console.log(labelObj);
};
var labelObj = {
    message: '使用定义的 LabelIntf 接口',
    label1: 'label1',
    label2: 'label2'
};
printLabel(labelObj);
var createSquare = function (config) {
    var newSquare = {
        color: 'white',
        area: 100
    };
    if (config.color) {
        newSquare.color = config.color;
    }
    if (config.color) {
        newSquare.color = config.color;
    }
    return newSquare;
};
var square = createSquare({ color: 'black' });
console.log(square); // { color: 'black', area: 100 }
var p = { x: 10, y: 20 };
// 函数的参数会逐个检查，要求对应位置的参数类型一致（参数名字在函数类型可以不一致，此外类型也会自动推断），返回值类型要一致
var searchFn = function (a, b) {
    return a + b;
};
var arr = [1, 2];
var obj = { prop1: 'prop1Val', prop2: 'prop2Val' };
var Clock = /** @class */ (function () {
    function Clock(d) {
        this.currentTime = d;
    }
    Clock.prototype.setCurrentTime = function () {
        this.currentTime = new Date();
    };
    Clock.prototype.getCurrentTime = function () {
        var hours = this.currentTime.getHours() <= 9 ? '0' + this.currentTime.getHours() : this.currentTime.getHours();
        var minutes = this.currentTime.getMinutes() <= 9 ? '0' + this.currentTime.getMinutes() : this.currentTime.getMinutes();
        return hours + ":" + minutes;
    };
    return Clock;
}());
// 使用函数参数检查来检查类的静态部分
function createClockClass(ClockClass, d) {
    return new ClockClass(d);
}
// createClockClass的第一个参数为构造器签名ClockConstructor，此时会检查Clock是否符合ClockConstructor，从而间接实现了类的静态部分检查
var clock = createClockClass(Clock, new Date());
var newSquare = {};
newSquare.sType = 'square';
newSquare.cType = 'red';
function getCounter() {
    var counter = function (start) {
        counter.num = start;
    };
    counter.reset = function () {
        counter.num = 0;
    };
    return counter;
}
var c = getCounter();
c(100);
c.reset();
// -
// 9. 接口继承类
var Control = /** @class */ (function () {
    function Control() {
    }
    return Control;
}());
var Button = /** @class */ (function (_super) {
    __extends(Button, _super);
    function Button() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Button.prototype.select = function () { };
    return Button;
}(Control));
var TextBox = /** @class */ (function (_super) {
    __extends(TextBox, _super);
    function TextBox() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TextBox.prototype.select = function () { };
    return TextBox;
}(Control));
