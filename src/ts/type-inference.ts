// 1. 最佳通用类型
 // 自动推断为 number 类型
let myNumber = 3;

// 兼容所有候选类型的类型，自动推断为 (number | string | null)[]
let myArray = [1, 2, 'test', null];
// myArray.push(undefined); // 类型“undefined”的参数不能赋给类型“string | number | null”的参数

// 被会自动推断为 (Triger | Monkey)[]，当候选类型不能正确使用时，只能明确指出 Animal[]
// let myZoo: Animal[] = [new Triger(), new Monkey()]


// -
// 2. 上下文类型
let myFunction: (n: number) => number;
// myFunction = (arg) => {
//   return arg.num; // 类型“number”上不存在属性“num”
// }
myFunction = (arg: any) => {
  return arg.num;
}

// 最佳通用类型有4个候选："Animal"、"Tiger"、"Monkey"和"Triger | Monkey"，Animal会被认为是最佳通用类型
function createZoo(): Animal[] {
  return [new Triger(), new Monkey()];
}