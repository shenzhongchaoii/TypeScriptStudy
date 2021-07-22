"use strict";
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
// p.x = 5; // 无法分配到 "x" ，因为它是只读属性。
