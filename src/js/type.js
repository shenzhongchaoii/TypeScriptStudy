"use strict";
// 1. Number
var decimalNum = 10;
var hexadecimalNum = 0x10; // 16
var binaryNum = 2; // 2
var octalNum = 8; // 8
// -
// 2. String
var str1 = "string1";
var str2 = 'string2';
var str3 = "string3";
// -
// 3. Boolean
var isDoing = true;
var isDone = false;
var val1 = 'hello';
var val2 = 'world';
// -
// 5. Any 和 Unknown
// any 类型：可以直接赋值给其他变量，不管值的类型是什么
// unknown: 类型安全的 any 类型，不可以直接赋值给其他变量，只能赋值给 unknown 类型
var anyVal;
var unknownVal;
var num;
anyVal = 'hello world';
unknownVal = 10;
num = anyVal; // 可以将 any 类型直接分配给 number 类型
console.log('num 的值是: ' + num);
console.log('num 的类型是: ' + typeof num);
// num 的值是: hello world
// num 的类型是: string
// num = unknownVal; // 不能将 unknown 类型直接分配给 number 类型
// 1. 可以使用类型断言赋值
// num = unknownVal as number; 或者 num = <number>unknownVal;
// 2. typeof 运算符判断
if (typeof unknownVal == 'number') {
    num = unknownVal;
}
console.log('num 的值是: ' + num);
console.log('num 的类型是: ' + typeof num);
// num 的值是: 10
// num 的类型是: number
// -
// 6. Void
// void 类型的变量，值只能为 undefined
var meaninglessVal = undefined;
// 没有返回值的函数
var fn = function () {
    // todo this
};
// -
// 7. Null 和 Undefined
var n = null;
var u = undefined;
// -
// 8. Never
// 返回never类型的函数必须存在无法达到的终点
var errorFn = function () {
    throw new Error('报错，到这里就停止');
};
// 类型推断，返回值的类型为never
var failFn = function () {
    return errorFn();
};
// 返回never类型的函数必须存在无法达到的终点
var endlessLoop = function () {
    while (true) { // 死循环
        // todo this
    }
};
// -
// 9. Object
var fnfn = function (o) {
    // todo this
};
fnfn({ test: 'hello world' });
fnfn(null);
// -
// 10. Array
var list = [1, 2, 3]; // let list: Array<number> = [1, 2, 3];
// -
// 11. Tuple
var tupleList = [1, '2'];
// -
// 12. Enum
// 默认情况下，元素从0开始开始编号
var Color;
(function (Color) {
    Color[Color["Red"] = 0] = "Red";
    Color[Color["Green"] = 1] = "Green";
    Color[Color["Blue"] = 2] = "Blue";
})(Color || (Color = {}));
// 也可以手动编号
// enum Color { Red = 0, Green = 1, Blue = 4 }
var numVal = Color.Red;
console.log(numVal); // 0
console.log(typeof numVal); // number 
var strVal = Color[1];
console.log(strVal); // Green
console.log(typeof strVal); // string
// -
// 13. 类型断言
var someVal = "这是一个字符串";
// 1. 尖括号语法（jsx中，不允许尖括号语法）
// let strLen: number = (<string>someVal).length;
// 2. as 语法
var strLen = someVal.length;
console.log(strLen);
