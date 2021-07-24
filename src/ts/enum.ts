// 1. 数字枚举
enum ResponseEnum1 {
  // 第一个成员默认为0，其余成员自增长
  No,
  Yes
}
// 通过枚举成员属性名字来获取成员值
console.log(ResponseEnum1.No); // 0
console.log(ResponseEnum1.Yes); // 1

// 通过枚举成员属性值来获取成员名字
console.log(ResponseEnum1[0]); // NO
console.log(ResponseEnum1[1]); // Yes

// 自定义成员值（初始化器）
enum Direction {
  UP = 1,
  RIGHT,
  DOWN,
  LEFT = 5
}
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
enum MyDirection {
  Up = "UP",
  Down = "DOWN",
  Left = "LEFT",
  Right = "RIGHT"
}

// -
// 3. 计算的成员和常量成员
enum FileAccess {
  // 常量成员
  None,
  Read    = 1 << 1,
  Write   = 1 << 2, // 0b001 位向左移动两位 0b100 也就是 4
  ReadWrite  = Read | Write,
  // 计算得到的成员
  G = "123".length
}


// -
// 4. 联合枚举和枚举成员的类型
enum ShapeKindEnum {
  circle = "Circle",
  square = "Square"
}
interface Circle {
  shape: ShapeKindEnum.circle;
  radius: number;
}

interface Square {
  shape: ShapeKindEnum.square;
  width: number;
}

let myCircle: Circle = {
  shape: ShapeKindEnum.circle,
  radius: 100
}

// let mySquare: Square = {
//   shape: "Square", // 不能将类型“"Square"”分配给类型“ShapeKindEnum.square”，所需类型来自属性 "shape"，在此处的 "Square" 类型上声明该属性
//   width: 100
// }


// -
// 5. 运行时的枚举
enum E {
  X, Y, Z
}
console.log(E); // { '0': 'X', '1': 'Y', '2': 'Z', X: 0, Y: 1, Z: 2 }

function f(obj: { X: number }) {
  return obj.X;
}
f(E);


// -
// 6. 常量枚举
const enum ConstEnum {
  A, B, C
}
// console.log(ConstEnum); // "const" 枚举仅可在属性、索引访问表达式、导入声明的右侧、导出分配或类型查询中使用
let myList = [ConstEnum.A, ConstEnum.B, ConstEnum.C];
console.log(myList); // [0, 1, 2]


// -
// 7. 外部枚举
declare enum DeclareEnum {
  A = 1,
  B,
  C = 2
}
console.log(DeclareEnum); // ReferenceError: DeclareEnum is not defined