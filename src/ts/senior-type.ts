// 1. 交叉类型
interface MyIntfOne {
  run(): void
}

interface MyIntfTwo {
  jump(): void
}

class MyTestC implements MyIntfOne, MyIntfTwo {
  run() { console.log('run'); }
  jump() { console.log('jump'); }
}
const myTestC = new MyTestC();
// myTestC.run();

const myTestObj: MyIntfOne & MyIntfTwo = {
  run() { console.log('run'); },
  jump() { console.log('jump'); }
}
// myTestObj.jump();

const myTestObj2: { name: string } & { age: number } = {
  name: '张三',
  age: 20
}


// -
// 2. 联合类型
// const myBar = (arg: number | string) => {
//   console.log(typeof arg);
// }
// myBar(1); // number
// myBar('1'); // string

interface Bird {
  fly(): void;
  eat(): void
}

interface Fish {
  swim(): void;
  eat(): void;
}

function getSmallPet(): Fish | Bird {
  // ...
  let res: Fish | Bird = {
    fly(){},
    swim(){},
    eat(){}
  }
  return res;
}

// let pet1 = getSmallPet() as Bird; // 使用类型断言告诉编译器：这是 bird
// pet1.eat();
// pet1.swim(); // 类型“Bird”上不存在属性“swim”

// let pet2 = getSmallPet() as Fish; // 使用类型断言告诉编译器：这是 Fish
// pet2.eat();
// pet2.swim();


// -
// 3. 类型保护和区分类型
// 改写上面例子
let pet = getSmallPet();
if ((pet as Fish).swim) {
  (pet as Fish).swim();
} else {
  (pet as Bird).fly();
}

// 用户自定义类型保护
function isFish(pet: Fish | Bird): pet is Fish {
  return (pet as Fish).swim !== undefined;
}
if (isFish(pet)) {
  pet.swim();
} else { // 会被自动结合上下文
  pet.fly();
}

// typeof 类型保护
const myBar = (arg: number | string) => {
  console.log(typeof arg);
  if (typeof arg == 'string') {
    console.log((arg as string).length);
  }
  if (typeof arg !== 'number') {
    console.log((arg as string).length);
  }
}
myBar(1); // number
myBar('hello world'); // string 11 11

// instanceof 类型保护
class TestClass {
  constructor(public name: string, private age: number) {
    console.log(this.name);
    console.log(this.age)
  }
}

let tc = new TestClass('张三', 20);
console.log(tc instanceof TestClass); // true
console.log(tc instanceof Object); // true

interface MyIntfThree {
  say(): void
}
class BirdClass implements MyIntfThree {
  say() {
    console.log('bird 不会 run');
  }
}
class FishClass implements MyIntfThree {
  say() {
    console.log('Fish 不会 run');
  }
}
function getPet() {
  return Math.random() < 0.5 ? new BirdClass() : new FishClass()
}
let pet1 = getPet();
if (pet1 instanceof BirdClass) {
  pet1.say();
}
if (pet1 instanceof FishClass) {
  pet1.say();
}


// -
// 4. 可以为 null / undefined 的类型
// tsconfig.json 中
/*
{
  "compilerOptions": {
    ...
    "strictNullChecks": false,
    ...
  }
}
*/
// let s: string;
// s = 'string'; // 相当于 let s: string | null | undefined;
// s = undefined;
// s = null;

// 开启 strictNullChecks 标记
// let s: string | null;
// s = 'string';
// s = null;
// s = undefined; // 不能将类型“undefined”分配给类型“string | null”

// let ss: string | undefined;
// ss = 'string';
// ss = undefined;
// ss = null; // 不能将类型“null”分配给类型“string | undefined”

// let sss: string | null | undefined;
// sss = 'string';
// sss = null;
// sss = undefined;

// sss = s;
// sss = ss;

// s = ss; // 不能将类型“string | undefined”分配给类型“string | null”
// s = sss; // 不能将类型“string | undefined”分配给类型“string | null”

// ss = s;
// ss = sss;

// 可选参数和可选属性
function f(x: number, y?: number) {
  return x + (y || 0);
}
f(1, 2);
f(1);
f(1, undefined);
// f(1, null); // 类型“null”的参数不能赋给类型“number | undefined”的参数

interface IIntf {
  name: string;
  age?: number;
}
let o: IIntf = {
  name: '张三'
}
console.log(o?.age); // undefined

// 类型保护和类型断言
function print(str: string | null) {
  // 1
  // if (str === null) {
  //   return 'default'
  // }
  // return str

  // 2
  // return str || 'default'; // str 为 null，为 default

  // 3
  // return str!.length; // str 为 null 会忽略编译检查，运行报错

  // 4
  return str?.length; // str 为 null，相当于关闭 strictNullChecks 标记，为 undefined
}
console.log(print(null));
console.log(print('hello'));