# TypeScript复习整理





## 基础类型



### 什么是类型声明

- 通过类型声明可以指定ts中变量（参数、形参）的类型
- 类型声明给变量设置了类型，变量仅能存储对应类型的值，ts编译器会自动检查值是否符合类型声明
- ts编译器拥有自动类型判断机制，当对变量的声明和赋值是同时进行的，TS编辑器会自动判断变量的类型，此时可以省略类型声明

```typescript
// 完整：let test: string = 'helo world';
let test = 'helo world';

// 完整：const fn = (a: number, b: number): number => a + b;
const fn = (a: number, b: number) => a + b;
```



### 类型

| 类型            | 例子                             | 描述                                                        |
| --------------- | -------------------------------- | ----------------------------------------------------------- |
| number          | 1、-1、1.5                       | 任意浮点数                                                  |
| string          | "hello"、'hello'、`hello`        | 任意字符串                                                  |
| boolean         | true、false                      | 布尔值 true 或 false                                        |
| 字面量          | 本身值，定义具体常量             | 值仅能为本身定义好的具体值                                  |
| any             | 任何值                           | 任意类型                                                    |
| unknown         | 未知类型                         | 类型安全的any                                               |
| void            |                                  | 不是任何类型，变量值仅是undefined，通过用于没有返回值的函数 |
| null、undefined | null、undefined                  | null、undefined                                             |
| never           |                                  | 永不存在值的类型                                            |
| object          | { test: "hello world" }          | 任意 JavaScript 对象                                        |
| array           | [ 1, 2, 3 ]                      | 任意 JavaScript 数组（元素类型单一）                        |
| tuple           | [ 1, "1", "2", 2 ]               | 任意 JavaScript 数组（元素类型多种，固定长度）              |
| enum            | enum Color { Red,  Green, Blue } | 枚举                                                        |

#### Number

所有浮点数，类型为 number。包括十进制、十六进制、二进制、八进制等

```typescript
let decimalNum: number = 10;
let hexadecimalNum: number = 0x10; // 16
let binaryNum: number = 0b10; // 2
let octalNum: number = 0o10; // 8
```

#### String

使用 "" 、''、`` 包围的字符串类型

```typescript
let str1: string = "string1";
let str2: string = 'string2';
let str3: string = `string3`;
```

#### Boolean

布尔值 true/false

```typescript
let isDoing: boolean = true;
let isDone: boolean = false;
```

#### 字面量

值仅能为本身定义好的具体值

```typescript
type StringLiteral = 'hello' | 'world';
let val1: StringLiteral = 'hello';
let val2: StringLiteral = 'world';
```

#### Any 和 Unknown

当希望类型检查器不检查某些不清楚类型的变量而是直接通过编译阶段的检查时，可以使用 any / unknown 来标记这些变量

```typescript
// any 类型：可以直接赋值给其他变量，不管值的类型是什么
// unknown: 类型安全的 any 类型，不可以直接赋值给其他变量，只能赋值给 unknown 类型

let anyVal: any;
let unknownVal: unknown;
let num: number;

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
```

#### Void

某种程度上来说，void 类型与 any （或unknown）类型相反，表示没有任何类型。当函数没有返回值是，其返回值类型为 void

```typescript
// void 类型的变量，值只能为 undefined
let meaninglessVal: void = undefined;

// 没有返回值的函数
const fn = (): void => {
	// todo this
}
```

#### Null 和 Undefined

值为null时，对应的类型为null（undefined同理）

```typescript
let n: null = null;
let u: undefined = undefined;
```

#### Never

永不存在值的类型。never类型总是那些会抛出异常或者没有返回值的函数的返回值类型

```typescript
// 返回never类型的函数必须存在无法达到的终点
const errorFn = (): never => {
	throw new Error('报错，到这里就停止')
}

// 类型推断，返回值的类型为never
const failFn = (): never => {
	return errorFn()
}

// 返回never类型的函数必须存在无法达到的终点
const endlessLoop = (): never => {
	while(true) { // 死循环
		// todo this
	}
}
```

#### Object

非原始类型，除 number、string、boolean、symbol、null、undefined之外的类型，可以是任意JavaScript对象

```typescript
type ObjectType = { name: string, age: number, address?: string };
let obj1: ObjectType = {
    name: '张三',
    age: 18
}
let obj2: ObjectType = {
  name: '张三',
  age: 18,
  address: 'xxx地址'
}
```

#### Array

元素类型单一的数组

```typescript
// 1. 直接在元素类型后加上[]：元素类型[]
let list: number[] = [1, 2, 3];
// 2. 使用数组泛型：Array<元素类型>
// let list: Array<number> = [1, 2, 3];
```

##### ReadonlyArray<T>

元素只读的Array。与 Array<T> 相似，去除了数组的所有可变方法（如 shift（删除数组第一项，并返回该项）、unshift（往数组开头添加一个或多个元素，返回新数组长度）、pop（删除数组最后一项，并返回该项）、push（往数组尾部添加添加一个或多个元素，返回新数组长度））

```typescript
let numberList: number[] = [1, 2];
let readonlyNumberList: ReadonlyArray<number> = numberList;
readonlyNumberList[0] = 10; // 类型“readonly number[]”中的索引签名仅允许读取。

// 可以使用类型断言重写
let numberList2 = readonlyNumberList as number[];
```

#### Tuple

元组，已知长度、多种类型的数组

```typescript
let tupleList: [number, string] = [1, '2'];
```

#### Enum

枚举类型，TypeScript 对 JavaScript 标准数据类型的补充

```typescript
// 默认情况下，元素从0开始开始编号
enum Color { Red, Green, Blue }

// 也可以手动编号
// enum Color { Red = 0, Green = 1, Blue = 4 }
let numVal: number = Color.Red;
console.log(numVal) // 0
console.log(typeof numVal) // number 

let strVal: string = Color[1];
console.log(strVal); // Green
console.log(typeof strVal); // string
```

#### 类型断言

类型断言就像是类型转换，但不会进行特殊的数据检查和解构。相当于告诉ts编译器，程序员已经进行了类型检查，不需要再检查了。

```typescript
let someVal: any = "这是一个字符串";

// 1. 尖括号语法（jsx中，不允许尖括号语法）
let strLen: number = (<string>someVal).length;
// 2. as 语法
// let strLen: number = (someVal as string).length;

console.log(strLen); // 7
```



## 接口



### 介绍

TypeScript的核心原则之一是对值所具有的结构进行类型检查（“鸭式辨型法”或“结构性子类型化”）

接口在这里就是为这些类型命名和为代码或者第三方代码定义契约

```typescript
// 定义一个接口，必须包含一个 string 类型的 label1、一个 string 类型的 label2，顺序无所谓
interface LabelIntf {
  label1: string;
   label2: string;
}

const printLabel = (labelObj: LabelIntf) => {
   console.log(labelObj)
}

let labelObj = {
  message: '使用定义的 LabelIntf 接口',
  label1: 'label1',
  label2: 'label2'
}
printLabel(labelObj); // { message: '使用定义的 LabelIntf 接口', label1: 'label1', label2: 'label2' }
```

### 可选属性

接口里（Object对象类型中也一样）的属性不全都是必需的，有些是只在某些条件下存在或者不充值。使用 <u>**?:**</u>

```typescript
// 另外还可以使用字符串签名
// interface Intf {
//   [propName: string]: any; // 可以表示任意类型的属性
// }

interface SquareConfig {
    color?: string;
    width?: number;
}

const createSquare = (config: SquareConfig): { color: string; area: number } => {
    let newSquare = {
        color: 'white',
        area: 100
    }
    
    if (config.color) {
        newSquare.color = config.color;
    }
    
    if (config.color) {
        newSquare.color = config.color;
    }
    
    return newSquare;
}
let square = createSquare({ color: 'black' })
console.log(square); // { color: 'black', area: 100 }
```

### 只读属性

当接口属性中含有 readonly 修饰符时，对象仅能在刚刚创建的时候修改值

```typescript
interface Point {
	readonly x: number;
	readonly y: number;
}

let p: Point = { x: 10, y: 20 }
p.x = 5; // 无法分配到 "x" ，因为它是只读属性
```

#### readonly VS const

作为变量使用就使用 const 来定义，作为属性则使用 readonly 修饰。

### 函数类型

一个只有参数列表和返回值类型的函数定义。参数列表里的每个参数都需要名字和类型

```typescript
interface SearchFn {
  (arg1: number, arg2: number): number;
}

// 函数的参数会逐个检查，要求对应位置的参数类型一致（参数名字在函数类型可以不一致，此外类型也会自动推断），返回值类型要一致
const searchFn: SearchFn = (a: number, b) => {
  return a + b;
}
```

### 可索引类型

可索引类型具有一个索引签名，它描述了对象索引的类型及对应的返回值类型。

ts支持两种签名：字符串和数字

可以同时使用，但此时数字索引的返回值类型必须是字符串索引返回值类型的子类型

```typescript
// 定义一个元素值为字符串的数组类型接口
interface ReadonlyIntf1 {
  readonly [index: number]: number;
}
let arr: ReadonlyIntf1 = [1, 2];
arr[1] = 3; // 类型“ReadonlyIntf1”中的索引签名仅允许读取
arr[2] = 3; // 类型“ReadonlyIntf1”中的索引签名仅允许读取

// 定义一个元素值为数值的数组类型接口
interface ReadonlyIntf2 {
  readonly [index: string]: string;
}
let obj: ReadonlyIntf2 = { prop1: 'prop1Val', prop2: 'prop2Val' };

// 同时使用两种签名
interface MixinsIntf2 {
  // 数字索引的返回值类型只能是字符串索引的返回值类型的子类型
  [index: number]: number; // 数字索引类型“number”不能赋给字符串索引类型“string”
  [index: string]: string;
}
```

### 类类型

符合某种限制的类，通常是通过 **<u>implements</u>** 实现定义好的接口类型来限制类

接口描述了类的公共部分，不包括私有部分，只会检查类的公共成员

```typescript
interface ClockIntf {
  setCurrentTime: (d: Date) => void;
  getCurrentTime(d: Date): string;
}

class Clock implements ClockIntf {
  private currentTime: Date;

  constructor () {
    this.currentTime = new Date();
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
```

##### 类静态部分与实例部分的区别

一个类实现了一个接口时，ts只会检查类的实例部分，不会检查静态部分（如constructor）

```typescript
// 不能直接操作静态部分
interface ClockConstructor {
  new (d: Date): ClockIntf
}
// 使用函数参数检查来检查类的静态部分
function createClockClass(ClockClass: ClockConstructor, d: Date): ClockIntf {
  return new ClockClass(d)
}
// createClockClass的第一个参数为构造器签名ClockConstructor，此时会检查Clock是否符合ClockConstructor，从而间接实现了类的静态部分检查
let clock = createClockClass(Clock, new Date())
```

### 继承接口

与类之间的继承（**<u>extends</u>**）一样，接口可以相互继承。方便接口切割到可重用的模块里，创建合成接口

```typescript
interface ShapeIntf {
  sType: string;
}
interface ColorIntf {
  cType: string
}

interface SquareIntf extends ShapeIntf, ColorIntf {
  width?: number;
  message: string;
}

let newSquare = <SquareIntf>{};
newSquare.sType = 'square';
newSquare.cType = 'red';
```

### 混合类型

有时希望一个对象可以同时具有上面提到的多种类型，比如一个对象同时可以作为函数和对象使用，并带有额外的属性

```typescript
interface Counter {
  (start: number): string;
  num: number;
  reset(): void;
}

function getCounter(): Counter {
  let counter = <Counter>function (start: number) {
    counter.num = start
  }
  counter.reset = () => {
    counter.num = 0
  }

  return counter
}

let c = getCounter()
c(100)
c.reset()
```

### 接口继承类

当接口继承了一个类类型时，会继承类的成员（所有，public、protected、private）但不包括其实现

一个接口继承了一个带有私有或受保护的成员的类时，这个接口类型只能被这个类的子类所实现

```typescript
class Control {
  private state: unknown;
}

interface CtlIntf extends Control {
  select(): void;
}

class Button extends Control implements CtlIntf {
  select() {}
}

class TextBox extends Control {
  select() { }
}
```

