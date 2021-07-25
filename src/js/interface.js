"use strict";
const printLabel = (labelObj) => {
    console.log(labelObj);
};
let labelObj = {
    message: '使用定义的 LabelIntf 接口',
    label1: 'label1',
    label2: 'label2'
};
printLabel(labelObj);
const createSquare = (config) => {
    let newSquare = {
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
let square = createSquare({ color: 'black' });
console.log(square); // { color: 'black', area: 100 }
let p = { x: 10, y: 20 };
// 函数的参数会逐个检查，要求对应位置的参数类型一致（参数名字在函数类型可以不一致，此外类型也会自动推断），返回值类型要一致
const searchFn = (a, b) => {
    return a + b;
};
let arr = [1, 2];
let obj = { prop1: 'prop1Val', prop2: 'prop2Val' };
class Clock {
    constructor(d) {
        this.currentTime = d;
    }
    setCurrentTime() {
        this.currentTime = new Date();
    }
    getCurrentTime() {
        const hours = this.currentTime.getHours() <= 9 ? '0' + this.currentTime.getHours() : this.currentTime.getHours();
        const minutes = this.currentTime.getMinutes() <= 9 ? '0' + this.currentTime.getMinutes() : this.currentTime.getMinutes();
        return `${hours}:${minutes}`;
    }
}
// 使用函数参数检查来检查类的静态部分
function createClockClass(ClockClass, d) {
    return new ClockClass(d);
}
// createClockClass的第一个参数为构造器签名ClockConstructor，此时会检查Clock是否符合ClockConstructor，从而间接实现了类的静态部分检查
let clock = createClockClass(Clock, new Date());
let newSquare = {};
newSquare.sType = 'square';
newSquare.cType = 'red';
function getCounter() {
    let counter = function (start) {
        counter.num = start;
    };
    counter.reset = () => {
        counter.num = 0;
    };
    return counter;
}
let c = getCounter();
c(100);
c.reset();
// -
// 9. 接口继承类
class Control {
}
class Button extends Control {
    select() { }
}
class TextBox extends Control {
    select() { }
}
