"use strict";
// 1. 数字枚举
var ResponseEnum1;
(function (ResponseEnum1) {
    // 第一个成员默认为0，其余成员自增长
    ResponseEnum1[ResponseEnum1["No"] = 0] = "No";
    ResponseEnum1[ResponseEnum1["Yes"] = 1] = "Yes";
})(ResponseEnum1 || (ResponseEnum1 = {}));
// 通过枚举成员属性名字来获取成员值
console.log(ResponseEnum1.No); // 0
console.log(ResponseEnum1.Yes); // 1
// 通过枚举成员属性值来获取成员名字
console.log(ResponseEnum1[0]); // NO
console.log(ResponseEnum1[1]); // Yes
// 自定义成员值（初始化器）
var Direction;
(function (Direction) {
    Direction[Direction["UP"] = 1] = "UP";
    Direction[Direction["RIGHT"] = 2] = "RIGHT";
    Direction[Direction["DOWN"] = 3] = "DOWN";
    Direction[Direction["LEFT"] = 5] = "LEFT";
})(Direction || (Direction = {}));
// {
//   '1': 'UP',   
//   '2': 'RIGHT',
//   '3': 'DOWN', 
//   '5': 'LEFT', 
//   UP: 1,       
//   RIGHT: 2,    
//   DOWN: 3,     
//   LEFT: 5      
// }
console.log(Direction);
// -
// 2. 字符串字符串
var MyDirection;
(function (MyDirection) {
    MyDirection["Up"] = "UP";
    MyDirection["Down"] = "DOWN";
    MyDirection["Left"] = "LEFT";
    MyDirection["Right"] = "RIGHT";
})(MyDirection || (MyDirection = {}));
// -
// 3. 计算的成员和常量成员
var FileAccess;
(function (FileAccess) {
    // 常量成员
    FileAccess[FileAccess["None"] = 0] = "None";
    FileAccess[FileAccess["Read"] = 2] = "Read";
    FileAccess[FileAccess["Write"] = 4] = "Write";
    FileAccess[FileAccess["ReadWrite"] = 6] = "ReadWrite";
    // 计算得到的成员
    FileAccess[FileAccess["G"] = "123".length] = "G";
})(FileAccess || (FileAccess = {}));
// -
// 4. 联合枚举和枚举成员的类型
var ShapeKindEnum;
(function (ShapeKindEnum) {
    ShapeKindEnum["circle"] = "Circle";
    ShapeKindEnum["square"] = "Square";
})(ShapeKindEnum || (ShapeKindEnum = {}));
let myCircle = {
    shape: ShapeKindEnum.circle,
    radius: 100
};
// let mySquare: Square = {
//   shape: "Square", // 不能将类型“"Square"”分配给类型“ShapeKindEnum.square”，所需类型来自属性 "shape"，在此处的 "Square" 类型上声明该属性
//   width: 100
// }
// -
// 5. 运行时的枚举
var E;
(function (E) {
    E[E["X"] = 0] = "X";
    E[E["Y"] = 1] = "Y";
    E[E["Z"] = 2] = "Z";
})(E || (E = {}));
console.log(E); // { '0': 'X', '1': 'Y', '2': 'Z', X: 0, Y: 1, Z: 2 }
function f(obj) {
    return obj.X;
}
f(E);
// console.log(ConstEnum); // "const" 枚举仅可在属性、索引访问表达式、导入声明的右侧、导出分配或类型查询中使用
let myList = [0 /* A */, 1 /* B */, 2 /* C */];
console.log(myList); // [0, 1, 2]
console.log(DeclareEnum); // ReferenceError: DeclareEnum is not defined
