// 1. 结构性子类型
interface Named {
  name: string;
}
class Person {
  name: string = '';
}

let myPerson: Named;
myPerson = new Person();


// -
// 2. 原始对象和对象类型的兼容
let x: Named;
let y: { name: string, age: number } = { name: '张三', age: 18 }
x = y;

function sayHello(n: Named) {
  console.log('hello ' + n.name)
}
sayHello(y);


// -
// 3. 函数的兼容
// 比较两个不同函数
// 参数列表不同
let fn11 = (a: number) => 0;
let fn22 = (x: number, y: number) => 0;
fn22 = fn11;
// fn11 = fn22; // 报错，不能将类型“(a: number, b: number) => number”分配给类型“(a: number) => number”

// 返回值列表不同
let fn111 = () => ({ name: '张三' });
let fn222 = () => ({ name: '张三', age: 18 });
fn111 = fn222;
// fn222 = fn111; // 报错，类型 "{ name: string; }" 中缺少属性 "age"，但类型 "{ name: string; age: number; }" 中需要该属性

// 参数双向协变
function exampleFn(cb: (any: any) => void) {
  // ...
}
exampleFn((e: Event) => console.log(e));

// 可选参数与剩余参数
function myFnc(args: any[], cb: (...args: any[]) => void) {
  // ...
}
myFnc([1, 2], (x, y) => console.log(x, y));
myFnc([1, 2], (x?, y?) => console.log(x, y));

let myFnc2 = (...args: any[]) => {
  console.log(args)
}
myFnc2 = (x?, y?) => {
  console.log(x, y)
}


// -
// 4. 枚举的兼容
enum Enum1 { X, Y, Z }
enum Enum2 { X, Y, Z }
let val = Enum1.X;
// val = Enum2.X; // 不能将类型“Enum2.X”分配给类型“Enum1”


// -
// 5. 类的兼容
class Class1 {
  name: string;
  static age: number;

  constructor(name: string, age: number) {
    this.name = name;
  }
}

class Class2 {
  name: string;
  constructor(name: string) {
    this.name = name;
  }
}


let c1: Class1 = new Class1('class1', 18);
let c2: Class2 = new Class2('class2');
c2 = c1;
c1 = c2;


// -
// 6. 泛型的兼容
interface Empty<T> {}
let empty1: Empty<number> = {};
let empty2: Empty<string> = {};
empty1 = empty2;
empty2 = empty1;


// number, string, boolean, symbol, bigInt
// undefined
// null
// object(Object对象，Array对象, Function对象, Date对象等等)
let argX: any;
argX = true;
argX = 10;
argX = null;

enum EnumArg {
  X, // X = 0
  Y, // Y = 1
  Z // Z = 2
}
let result = EnumArg.X;
console.log(result); // 0