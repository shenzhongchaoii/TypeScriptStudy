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


// -
// 4. 类型别名
type StringType = string; // string 类型
type StringTypeResolver = () => string; // 返回值为 string 的 function 类型
type StringTypeOrResolver = String | StringTypeResolver;

function getString(str: StringTypeOrResolver): StringType {
  // 1. typeof 类型保护定义
  // if (typeof str === 'string') { // typeof str !== 'function'
  //   return str;
  // }

  // 2. instanceof 类型保护定义
  // if (!(str instanceof Object)) {
  //   return str;
  // }

  // 3. 类型谓词，用户自定义类型保护
  if (isStringType(str)) {
    return str;
  }

  // 猜猜这个
  // if (str as StringType) {
  //   return (str as StringType);
  // }

  return (str as StringTypeResolver)();
}

console.log(getString('hello'));
console.log(getString(()=>'world'));
let otherArg = (()=>{
  return 'world';
})()
console.log(getString(otherArg));


function isStringType(arg: StringTypeOrResolver): arg is StringType  {
  return !(arg instanceof Object);
}


type Tree<T> = T & {
  value: string;
  children: Tree<T>[] | [];
}

interface Menu {
  value: string;
}

let menu: Tree<Menu>;

menu = {
  value: '一级菜单',
  children: [
    {
      value: '二级菜单',
      children: [
        {
          value: '三级菜单',
          children: []
        }
      ]
    }
  ]
}

// type TestType = null | TestType; // 类型别名“TestType”循环引用自身
type TestType2<TestType2> = {
  next: TestType2
}

interface tt {
  next: tt
}

// let ttt: TestType2<tt> = {
//   next: {
//     next: {
//       next: {
//         // 类型 "{}" 中缺少属性 "next"，但类型 "tt" 中需要该属性
//       }
//     }
//   }
// }
// console.log(ttt.next.next.next)

// 接口 VS 类型别名
interface MyPoint {
  x: number;
  y: number;
}
type MyPointAlias = {
  x: number;
  y: number;
}
let myPoint: MyPoint = { x: 1, y: 1 };
let myPoint2: MyPointAlias = { x: 1, y: 1 };

// 接口的 extends 与 implements，类型别名的 extends 与 implements
interface MyPointV2 extends MyPoint {
  z: number;
}
type MyPointAliasV2  = MyPointAlias & { z: number }
let myPoinstV2: MyPointV2 = {
  x: 1,
  y: 1,
  z: 1
}

class PointClass implements MyPoint {
  constructor(public x: number, public y: number) { }
}
class PointAliasClass implements MyPointAlias {
  constructor(public x: number, public y: number) { }
}
let myPointClass: PointClass = new PointClass(1, 1);
let myPointAliasClass: PointAliasClass = new PointAliasClass(1, 1);

// 接口属性合并
interface Triangle {
  l1: number;
}
interface Triangle {
  l2: number;
}
interface Triangle {
  l3: number;
}
let triangle: Triangle = {
  l1: 1,
  l2: 1,
  l3: 1
}

// type 支持计算属性：枚举字符串字面量类型创建索引签名
type Props = 'prop1' | 'prop2'
type EnumPropObj = {
  [prop in Props]: string;
}
let mO: EnumPropObj = {
  prop1: 'val1',
  prop2: 'val2',
  // prop3: 'val3' // 不存在该property
}
// interface Inttt {
//   [prop in Props]: string; // 接口的计算属性名称必须为 string、number、symbol、any
// }


// -
// 5. 可辨识联合类型
interface MySquareIntf {
  kind: "square";
  size: number;
}
interface MyRectangleIntf {
  kind: "rectangle";
  width: number;
  height: number;
}
interface MyCircleIntf {
  kind: "circle";
  radius: number;
}
interface MyCircleIntf {
  kind: "circle";
  radius: number;
}
interface MyTriangleIntf {
  kind: "triangle";
  base: number;
  height: number;
}
type MyShapeType = MySquareIntf | MyRectangleIntf | MyCircleIntf | MyTriangleIntf;

function isNotSet(x: unknown): never {
  throw new Error('不存在该形状图形')
}
function area(s: MyShapeType) {
  switch (s.kind) {
      case "square": return Math.pow(s.size, 2) ;
      case "rectangle": return s.height * s.width;
      case "circle": return Math.PI * s.radius ** 2;
      default: return isNotSet(s)
  }
}
let rtgl: MyTriangleIntf = {
  kind: 'triangle',
  base: 20,
  height: 10
}

// console.log(area(rtgl)); // 抛出一个错误


// -
// 6. 索引类型
function getN<T, K extends keyof T> (obj: T, key: K): T[K] {
  // K：'name' | 'age
  return obj[key];
}
interface PIntf<T1, T2> {
  name: T1;
  age: T2
}
type P<T1, T2> = {
  readonly [P in keyof PIntf<T1, T2>]: PIntf<T1, T2>[P];
}
let zs: P<string, number> = {
  name: '张三',
  age: 20
}
let pname = getN(zs, 'name');
let page = getN(zs, 'age');
console.log(pname); // 张三
console.log(page); // 20

let pp1: keyof P<string, number> = 'age';
let pp2: keyof P<string, number> = 'name';

let ppname: P<string, number>['name'] = '李四';
let ppage: P<string, number>['age'] = 24;

interface Objj<T> {
  [key: string]: T;
}
let keys: keyof Objj<number>; // number | string
let value: Objj<number>['foo']; // number

interface In {
  name: string,
  length: number
}

type TypeExample1 = keyof In; // 'name' | 'length'
type TypeExample2 = keyof In[]; // number | 'length' | 'push' | 'forEach' | ....
type TypeExample3 = keyof { [prop:string]: In } // number | string


// -
// 7. 索引类型
interface PIntf<T1, T2> {
  name: T1;
  age: T2
}
type ReadonlyP<T1, T2> = {
  readonly [P in keyof PIntf<T1, T2>]: PIntf<T1, T2>[P];
}
type OptionalP<T1, T2> = {
  [P in keyof PIntf<T1, T2>]?: PIntf<T1, T2>[P];
}
type NullablePerson<T1, T2> = {
  [P in keyof PIntf<T1, T2>]: null;
}

































// 一个存取器类型
interface Accessor<T> {
  get(): T;
  set(newVal: T): void;
}

// 一个封装，用来包装类型的属性，使用getter/setter
type Proxify<T> = {
  [P in keyof T]: Accessor<T[P]>;
}


function proxify<T>(o: T):  Proxify<T> | T {
  // 根据 Proxify<T>
  /**
   * {
   *   name: {
   *     get(),
   *     set() 
   *   }
   * }
   */
  if (o instanceof Object) {
    let res = {} as (Proxify<T> | T)
    for (const key in o) {
      let val: T[keyof T] = o[key]
      let property: Accessor<T[keyof T]> = {
        get() {
            return val
        },
        set(newVal){
          val = newVal
        }
      }
      Object.defineProperty(res, key, property)
    }
    return res
  }
  return o
}
let props = {
  age: 20,
  name: 'zs'
}
let proxyProps = proxify(props);
// console.log('proxyProps', proxyProps);
// console.log('age', proxyProps.age);
// proxyProps.age = 30;
// console.log('age', proxyProps.age);
