# TypeScript复习整理



## 开始

```javascript
// 安装TypeScript
npm install -g typescript

// 初始化配置
tsc --init

// 编译（加上文件名，则仅编译单个文件）
tsc
// 监听编译
tsc -w
```



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





## 类

使用 class 定义，变量与作用于这些变量的函数的集合，就叫做类

类定义会创建两个东西：类的实例类型和一个构造函数，即声明了一个类的同时，会同时声明了 **<u>类的实例的类型</u>**（如 ***let c: ClassType;***）、构造函数的值（与类同名，如 ***c = new ClassType();*** 中的 ***ClassType***）

```typescript
class ClassType {
  memberProp: unknown; // 成员属性

  constructor() { // 构造器
     // ...
  }

  memberFn() { // 成员方法
    // ...
  }
}
let myClass: ClassType; // 类的实例类型 ClassType
myClass = new ClassType(); // 构造函数 ClassType
let myClassConstructor: typeof ClassType = ClassType; // 构造函数的类型，相当于对类起别名
```



### 继承

被继承的类通常叫做**<u>基类</u>**、**<u>超类</u>**、**<u>父类</u>**，继承的类叫做**<u>派生类</u>**、**<u>子类</u>**

当派生类包含了一个构造函数（基类带有构造函数）时，派生类的构造函数内必须使用 **<u>super()</u>**来执行基类的构造函数

```typescript
class BaseClass {
  name: string;
  constructor(n: string) {
    this.name = n;
  }
}

class SubClass extends BaseClass {
  constructor(n: string) {
    super(n);
    this.name = n + n;
  }
  setName(newName: string) {
    this.name = newName;
  }
}

let subClass = new SubClass('subClass');
console.log(subClass);
subClass.setName('new name');
console.log(subClass);
```



### 公共、私有、受保护、只读的修饰符

| 修饰符    | 说明                                         |
| --------- | -------------------------------------------- |
| public    | 默认的，公共的                               |
| private   | 私有的，仅能在类内部访问                     |
| protected | 受保护的，仅能在类及类的派生类中访问         |
| readonly  | 只读属性，仅能在声明时或者构造函数中被初始化 |

**注意：构造函数也可以被标记为protected，这意味着这个类不能在包含它的类外部被实例化，但可以被继承**

```typescript
class ClassName {
  public name: string = '张三';
  private age: number = 18;
    
  readonly oldName: string = '张小三';
  
  // 标记构造函数为受保护，该类只能被继承，无法被实例化
  protected constructor() {
      
  }

  protected resetName(newName: string) {
      this.name = newName;
      this.oldName = newName; // 报错，只读属性
  }
}

class SubClassName extends ClassName {
  constructor () {
    super();

    this.name = '';
    // this.age = 20;
    this.resetName('李四');
  }
}

let class1 = new ClassName(); // 报错，类“ClassName”的构造函数是受保护的，仅可在类声明中访问
let class2 = new SubClassName();
class2.oldName = '李四'; // 报错，只读属性
```

#### 参数属性

参数属性通过给构造函数参数前增加一个访问限定符来声明，此时声明并初始化一个成员（修饰符与访问限定符一致）

```typescript
class ClassName2 {
  constructor(protected readonly name: string) {

  }
}
```



### 存取器

TS支持通过getters/setters来截取，从而有效的控制对对象成员的访问

存取器要求编辑器输出版本（compilerOptions.target）不能低于ECMAScript5，当只有 get 没有 set时，自动推断设置为 readonly

```typescript
let employeeName: string = '张三';
class Employee {
  private _bankAccount: string = '银行卡号';
  private _money: number = 1e8;

  get bankAccount(): string {
    if (employeeName&& employeeName == '张三') {
      return this._bankAccount;
    }
    return '你不是张三'
  }

  get money(): number {
    if (employeeName&& employeeName == '张三') {
      return this._money;
    }
    return 0
  }

  set money(newMoney: number) {
    this._money = newMoney;
  }
}

let e = new Employee();

e.bankAccount = '新银行卡号'; // 报错，只读属性
console.log(e.bankAccount); // 银行卡号
e.money = 1e7;
console.log(e.money); // 10000000

employeeName = '李四';
console.log(e.bankAccount); // 你不是张三
```



### 静态属性

使用**<u>static</u>**修饰成员，仅存在于类本身而非类的实例上

```typescript
class TestClass2 {
  static staticProp: string = '静态成员属性';
}
let tC = new TestClass2();
console.log(TestClass2.staticProp); // 类本身访问静态属性，可以
console.log(tC.staticProp); // 类实例访问静态属性，不可以
```



### 抽象类与抽象方法

使用**<u>abstract</u>**定义的类为抽象类，抽象类作为其他派生类的基类使用，无法被实例化

在抽象类内部使用**<u>abstract</u>**定义的成员方法为抽象方法，抽象方法不包含具体实现并且必须在派生类中实现

```typescript
abstract class AbstractClass {
  abstract test(): void;
  
  test2(): void {
    console.log('123')
  }
}

let ac = new AbstractClass(); // 报错，抽象类无法被实例化
```

#### 抽象类 VS 接口

不同于接口，抽象类中可以包含成员的实现细节

#### 抽象方法 VS 接口方法

两者相似，都只是定义了方法签名而不包含方法体；不同于接口方法，抽象方法必须使用**<u>abstract</u>**定义且可以包含访问修饰符

```typescript
class Derivedclass  extends AbstractClass{
  constructor() {
    super();
  }

  test() {
    console.log('抽象类中抽象方法在派生类中必须被实现');
  }
}
let dc = new Derivedclass(); // 抽象类的派生类可以被实例化
```



### 把类当接口使用

类定义会创建两个东西：类的实例类型和一个构造函数。因此，可以在允许使用接口的地方使用类（类类型）

```typescript
class BClass {
  readonly x: number = 1;
  readonly y: number = 2;
}
interface BIntf extends BClass {
  readonly z: number;
}

let t: BIntf = {
  x: 10,
  y: 20,
  z: 30
}
```





## 函数

函数是JavaScript的基础，可以用来实现抽象层、模拟类、信息隐藏和模块

可以创建有名字的普通函数和匿名函数

```javascript
function fn1() {

}
const fn2 = function() {
  
}
```



### 闭包

函数和函数内部能够访问到的变量的环境，就是一个闭包

闭包常常用来「间接访问一个变量」。换句话说，「隐藏一个变量」

```javascript
function foo() {
  // bar() 与 val 就形成一个闭包
  // ---
  var val = 1;
  function bar() {
    return val ++;
  }
  // ---
    
  return bar;
}
```



### 函数类型

函数类型包括参数类型和返回值类型

```typescript
// 函数类型
let fooT: (a: number, b: number) => number;

// 完整函数类型
let foo1: (arg1: number, arg2: number) => number = function (a: number, b: number) {
  return a + b;
}

// 函数类型推断
let foo2: (arg1: number, arg2: number) => number = function (a, b) {
  return a + b;
}
```



### 可选参数与默认参数

#### 可选参数

TS函数类型中每个参数都是必需（有没有值传递入函数）；而JavaScript中，每个参数都是可选的，不传则值为undefined

TS中通过在参数名跟**<u>?</u>**来实现可选参数，可选参数必须位于必选参数后

```typescript
function bar(a: number, b?: number) {
  if (typeof b == 'number') {
    return a + b;
  }
  return a;
}
console.log(bar(1)); // 1
console.log(bar(1, 2)); // 3
```

#### 默认参数

声明函数时，带有默认值的参数就是默认参数。当用户没有传递这个参数或传递的值是`undefined`时，参数会取默认值

1. 当默认参数位于必须参数后时，调用函数时可以省略默认参数
2. 当默认参数位于必须参数前是，调用函数时不可以省略默认参数（可以传递默认值或undefined来取默认值）

```typescript
function bar2(a: number, b = 2) {
  return a + b;
}
console.log(bar2(1)); // 3
console.log(bar2(1, undefined)); // 3
```



### 剩余参数

JavaScript中，可以使用 **<u>arguments</u>** 来访问所有传入的参数，也可以在声明函数时，使用 **<u>...（扩展运算符</u>** 收集剩余参数列表

TS中，由于必须参数都必须传入，所以arguments的作用实际不大，同样可以使用 **<u>...（扩展运算符</u>** 收集剩余参数列表

剩余参数会被当成不限个数的可选参数

```typescript
function baz(a: string, b: string, ...other: string[]) {
  console.log(arguments); // [Arguments] { '0': '1', '1': '2', '2': '3', '3': '4', '4': '5' }
  console.log(other); // [ '3', '4', '5' ]
  console.log(`${a}, ${b}, ${other.join(', ')}`); // 1, 2, 3, 4, 5
}

baz('1', '2', '3', '4', '5')
```



### this 和箭头函数

普通函数的 this 指向运行时所在的作用域，即this 对象的指向随着使用的作用域不同而不同

箭头函数的 this 指向绑定定义时所在的作用域，this 对象固定不变

```JavaScript
// .js 文件
const te = {
    val1: 10,
    val2: 20,
    createFn: function () {
        return function () {
            console.log(this.val1 + this.val2);
        }
    }
}

let fnc = te.createFn();
fnc(); // 此时 this 指向window对象（严格模式，this 为 undefined），Cannot read property 'val1' of undefined


const te1 = {
    val1: 10,
    val2: 20,
    createFn: () => {
        return  () => {
          // 由于createFn也用了箭头函数，此时的this执行createFn的{}
          console.log(this.val1 + this.val2);
        }
    }
}

let fnc1 = te1.createFn();
fnc1(); // NaN

const te2 = {
  val1: 10,
  val2: 20,
  createFn: function() {
      return  () => {
        console.log(this.val1 + this.val2);
      }
  }
}

let fnc2 = te2.createFn();
fnc2(); // 30
```

#### this 作为参数

```typescript
function fnc(this: void) {
  console.log(this); // 这里是一个假参数，undefined
}

interface OtherMyIntf {
  val: number;
}
interface MyIntf {
  num: number;
  createFn(this: MyIntf): () => OtherMyIntf // 这里直接表明 this 的类型是 MyIntf
}

let my: MyIntf = {
  num: 100,
  createFn: function(this: MyIntf) { // 这里直接表明 this 的类型是 MyIntf
    return () => {
      return {
        val: this.num // 所以可以直接使用 MyIntf 的 num
      }
    }
  }
}
const myFn = my.createFn();
console.log(myFn()); // { val: 100 }
```

#### this 参数在回调函数中 

将一个函数传递到某个库函数里稍后会被调用时， 当回调被调用的时候，它们会被当成一个普通函数调用， this 为 undefined

```typescript
interface UIElementIntf {
  addClickListener(onclick: (this: void, e: Event) => void): void;
}

class UIElement implements UIElementIntf {
  addClickListener(onClick: (this: void, e: Event) => void) {

  }
}

let uIElement = new UIElement();

class Handler {
  info: string = 'info';
  onClick(this: Handler, e: Event) {
    console.log(this.info); // info
  }
}
let h = new Handler();
// uIElement.addClickListener(h.onClick); // 每个签名的 "this" 类型不兼容，不能将类型“void”分配给类型“Handler”

class Handler2 {
  info: string = 'info';
  onClick(this: void, e: Event) {
    console.log(this.info); // 类型“void”上不存在属性“info”
  }
}
let h2 = new Handler2();
uIElement.addClickListener(h2.onClick);

class Handler3 {
  info: string = 'info';
  onClick = (e: Event) =>  {
    console.log(this.info); // info
  }
}
let h3 = new Handler3();
uIElement.addClickListener(h3.onClick);
```



### 重载

JavaScript是一门动态语言，JavaScript里函数根据传入不同的参数而返回不同类型的数据是很常见的。当然在JavaScript中，后面声明的重名函数会覆盖前面的声明，通常是来函数体内进行一系列的判断来实现。

TS中通过为同一个函数提供多个函数类型定义来进行函数重载，编译器会根据已声明的函数声明列表来查找符合来处理函数的调用，一定要把最精确的定义放在最前面。

```typescript
interface Person {
  name: string;
  age: number;
}

// 重载列表
function getPerson(name: string): Person['name'];
function getPerson(age: number): Person['age'];
function getPerson(person: Person): Person;

// 声明实现
function getPerson(person: unknown) {
  return person;
}
console.log(getPerson('张三')); // 张三
console.log(getPerson(18)); // 18
console.log(getPerson(true)); // 报错，重载的实现签名不存在，重载列表中未找到对应的声明
console.log(getPerson({ name: '张三', age: 18 })); //{ name: '张三', age: 18 }
```





## 泛型

软件工程中，不仅要创建一致的定义良好的API，同时也要考虑可重用性。

组件不仅能够支持当前的数据类型，同时也能支持未来的数据类型，一个组件可以支持多种类型的数据，泛型就是一种“代码模板”，可以用一套代码套用各种类型。

**<u>可以创建泛型函数、泛型接口、泛型类，无法创建泛型枚举和泛型命名空间</u>**

| 泛型应用 | 例子                                                         |
| -------- | ------------------------------------------------------------ |
| 泛型函数 | function genericFunc<font color=#FF0000>\<T\></font>(arg: <font color=#FF0000>T</font>): <font color=#FF0000>T</font> {<br/>      return arg;<br/>} |
| 泛型接口 | // 带有泛型参数的泛型接口<br/>interface GenericIntfFn<font color=#FF0000>\<T\></font> {<br/>       (arg: <font color=#FF0000>T[]</font>): <font color=#FF0000>T[]</font>;<br/>       other?: <font color=#FF0000>T</font>;<br/>} |
| 泛型类   | class GenericClass<font color=#FF0000>\<T\></font>( {<br/>       prop: <font color=#FF0000>T</font>;<br/><br/>       constructor(prop: <font color=#FF0000>T</font>) {<br/>               this.prop = prop;<br/>       }<br/><br/>       getProp: () => <font color=#FF0000>T</font> = () => {<br/>               return this.prop;<br/>      }<br/>} |



### 泛型函数

函数声明中，函数名后跟**<u><font color=#FF0000>\<T\></font>泛型参数</u>**（*T 只是一个泛型类型，一个参数名，可以是U、Y等其他*）的函数

```typescript
// 泛型函数例子：返回值的类型与传入参数的类型一致
// <T>是类型变量，一种特殊的变量，只用于表示类型而不是值
function identity<T>(arg: T): T {
  console.log(arg.length); // number 类型不存在属性length
  return arg;
}

// 使用方法1：传入所有的参数，包括类型参数
let output1 = identity<string>('string arg');
console.log(output1);

// 使用方法2：编译器的类型推论
let output2 = identity(20);
console.log(output2);

let output3 = identity(['array elm1']);
console.log(output3);

// 泛型函数：参数类型明确为数组
function identity2<T>(arg: T[]): T[] { // 或者 Array<T>
  console.log(arg.length);
  return arg;
}

let identity2_otherName: <U>(a: U[]) => U[] = identity2;
let output4 = identity2_otherName([1, 2, 3]);
console.log(output4);
```



### 泛型接口

将泛型函数的函数类型单独摘出去，变成带有调用签名的对象字面量，使用接口定义该对象字面量，这就是泛型接口

```typescript
// 使用带有调用签名的对象字面量来定义泛型函数
let identity2_otherName2: { <U>(a: U[]): U[] } = identity2;
let output5 = identity2_otherName2([1, 2, 3]);
console.log(output5);

// 将上面的带有调用签名的对象字面量“{ <U>(a: U[]): U[] }”封装成泛型接口
interface IdentityIntf {
  <T>(arg: T[]): T[];
}

// 使用泛型接口
let identity2_otherName3: IdentityIntf = identity2;
```

#### 带有泛型参数的泛型接口

```typescript
// 带有泛型参数的泛型接口，从而清楚的知道是使用的具体是哪个泛型类型
interface IdentityIntfFn<T> {
  (arg: T[]): T[];
  other?: T;
}

// 使用泛型接口，传递 number 指定泛型接口泛型参数类型，identity2_otherName4 这个函数仅用使用 number 类型数组参数
let identity2_otherName4: IdentityIntfFn<number> = identity2;
identity2_otherName4([1, 2, 3]);
identity2_otherName4(['1', '2', '3']); // 不能将类型“string”分配给类型“number”
```



### 泛型类

与带泛型参数的泛型接口差不多

泛型类指的是类的实例部分的类型，类的静态属性不能使用这泛型类型

```typescript
class GenericClass<T> {
  static prop: T; // 静态成员不能引用类类型参数
  
  private _prop1: T;
  private _prop2: T;

  constructor(prop1: T, prop2: T) {
    this._prop1 = prop1;
    this._prop2 = prop2;
  }

  get prop1(): T{
    return this._prop1;
  }

  getProp2: () => T = () => {
    return this._prop2;
  } 
}

let myGenericClass = new GenericClass<number>(110, 120);
let prop1 = myGenericClass.prop1
let prop2 = myGenericClass.getProp2()
console.log(prop1, prop2); // 110 120
```



泛型约束

```typescript
// 定义一个接口来描述约束条件
interface LengthWise {
  length: number;
}

// 使用约束条件接口和 extends 关键字来实现泛型约束
function loggingIdentity<T extends LengthWise>(arg: T): T {
  console.log(arg.length);
  return arg;
}

// 使用时，arg 参数必须带有 length 属性，length 属性是由约束描述的
loggingIdentity([1, 2, 3]); // 3
loggingIdentity({ length: 10 }); // 10
```

#### 在泛型约束中使用类型参数

```typescript
function getProperty<T, K extends keyof T>(obj: T, key: K) {
  return obj[key];
}
let myObj = {
  a: 'a',
  b: 'b'
}
console.log(getProperty(myObj, 'a'));
console.log(getProperty(myObj, 'b'));
console.log(getProperty(myObj, 'c')); // 类型“"c"”的参数不能赋给类型“"a" | "b"”的参数
```

#### 在泛型里使用类类型

在TS使用泛型创建工厂函数时，需要引用构造函数的类类型

```typescript
// 在泛型里使用类类型
function createClass<T>(c:  new() => T ): T {
  return new c();
}

// 使用原型属性推断并约束构造函数与类实例的关系
class MonkeyName {
  name: string = 'monkey';
}

class TrigerName {
  name: string = 'triger';
}

class Animal {
}

class Monkey extends Animal {
  prop: MonkeyName = new MonkeyName;
}

class Triger extends Animal {
  prop: TrigerName = new TrigerName;
}

function createInstance<A extends Animal>(c: new() => A): A {
  return new c();
}

let monkey = createInstance(Monkey).prop.name;
let triger = createInstance(Triger).prop.name;
console.log(monkey); // monkey
console.log(triger); // triger
```





## 枚举

通常一个被命名的整型常数的集合就是枚举（数字枚举），比如星期，1-7

TS支持数字枚举和字符串枚举



### 数字枚举

成员属性的值为数值的枚举

```typescript
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
```

#### 反向映射

数字枚举除了正向映射（从枚举名字到枚举值），还具有反向映射（从枚举值到枚举名字），比如上面的例子



### 字符串枚举

成员属性的值为字符串的枚举

```typescript
enum MyDirection {
  Up = "UP",
  Down = "DOWN",
  Left = "LEFT",
  Right = "RIGHT"
}
```



### 计算的成员和常量成员

枚举成员都带有一个值，值可以是常量，也可以是计算得到的。

#### 常量成员

- 它是枚举的第一个成员且没有初始化器（这时候它被赋值为0）；

- 它不带初始化器且它之前的枚举成员是一个数字常量，这种情况下，当前枚举成员的值为它上一个枚举成员的值加 1；

- 枚举成员使用 ***常量枚举表达式*** 初始化；

  ​	常数枚举表达式是TS表达式的子集，可以在编译阶段求值。当一个表达式满足下面条件之一时，就是一个常量枚举表达式：

  - 一个枚举表达式字面量（主要字符串字面量或者数字字面量）；
  - 一个对之前定义的常量枚举成员的引用（可以是在不同的枚举类型中定义的）；
  - 带括号的常量枚举表达式；
  - 一元运算符 +（正号）、-（负号）、~（取反） 其中之一应用在了常量枚举表达式；
  - 常量枚举表达式作为二元运算符 +、-、*、/、%、<< 、>>、>>>、&、|、^ 的操作对象（若常数枚举表达式求值后为 NaN 或 Infinity 则会在编译阶段报错）；

#### 计算得出的成员

除上面情况外，所有其他情况的枚举成员都被当成是计算得出的成员

```typescript
enum FileAccess {
  // 常量成员
  None,
  Read    = 1 << 1,
  Write   = 1 << 2, // 0b001 位向左移动两位 0b100 也就是 4
  ReadWrite  = Read | Write,
  // 计算得到的成员
  G = "123".length
}
```



### 联合枚举与枚举成员的类型

存在一种特殊的非计算的常量枚举成员的子集：字面量枚举成员。字面量枚举成员是指不带有初始值的常量枚举成员，或者是值被初始化为：

- 任何数值字面量（如1，100，-1，-100）;
- 任何字符串字面量（如“foo”，“bar”）;

当所有枚举成员都拥有字面量枚举值时，

1. 枚举成员就成为了类型；

   ```typescript
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
   
   let mySquare: Square = {
     shape: "Square", // 不能将类型“"Square"”分配给类型“ShapeKindEnum.square”，所需类型来自属性 "shape"，在此处的 "Square" 类型上声明该属性
     width: 100
   }
   ```

2. 枚举类型本身就变成了每个枚举成员类型的联合

   如上面例子中的 **<u>ShapeKindEnum</u>**，有两个枚举成员类型



### 运行时的枚举

枚举是在运行时真正存在的对象

```typescript
// .ts 文件
enum E {
  X, Y, Z
}
console.log(E); // { '0': 'X', '1': 'Y', '2': 'Z', X: 0, Y: 1, Z: 2 }

function f(obj: { X: number }) {
  return obj.X;
}
f(E);

// .js 文件
var E;
(function (E) {
    E[E["X"] = 0] = "X";
    E[E["Y"] = 1] = "Y";
    E[E["Z"] = 2] = "Z";
})(E || (E = {}));
console.log(E);
function f(obj) {
    return obj.X;
}
f(E);
```



### 常量枚举

通过使用 **<u>const</u>** 修饰符来定义枚举，且常量枚举中只能使用常量枚举表达式，常量枚举在编译阶段会被删除

```typescript
const enum ConstEnum {
  A, B, C
}
console.log(ConstEnum); // "const" 枚举仅可在属性、索引访问表达式、导入声明的右侧、导出分配或类型查询中使用
let myList = [ConstEnum.A, ConstEnum.B, ConstEnum.C];
console.log(myList); // [0, 1, 2]
```



### 外部枚举

通过使用 declare 修饰符来定义枚举，外部枚举用来描述已经存在的枚举类型的形状（也就是一个声明，外部才可以使用）

```typescript
declare enum DeclareEnum {
  A = 1,
  B,
  C = 2
}
console.log(DeclareEnum); // ReferenceError: DeclareEnum is not defined

// 其他 ts 文件
let myEnum: DeclareEnum; // 用刚刚定义的 DeclareEnum 来限制 myEnum
```

外部枚举和非外部枚举的区别：对于正常枚举，没有初始器的成员被当成是常数成员；对于非常数的外部枚举而言，没有初始器的成员被当成是需要经过计算的成员；





## 类型推论

类型推论，即类型是在哪里被推断的，由计算通用类型算法考虑所有的情况自动推断



### 最佳通用类型

当需要从多个表达式中推断类型时，会使用一个兼容这些表达式类型的最佳候选类型作为通用候选类型

```typescript
// 自动推断为 number 类型
let myNumber = 3;

// 兼容所有候选类型的类型，自动推断为 (number | string | null)[]
let myArray = [1, 2, 'test', null];
myArray.push(undefined); // 类型“undefined”的参数不能赋给类型“string | number | null”的参数
```

有时候，通用候选类型可能无法正确使用到我们具体希望指明的类型，只能明确指出

```typescript
// 被会自动推断为 (Triger | Monkey)[]，当候选类型不能正确使用时，只能明确指出 Animal[]
let myZoo: Animal[] = [new Triger(), new Monkey()];
```



### 上下文类型

最佳通用类型的推断是基于值来推断类型，而上下文类型是考虑值出现的上下文来推断类型，也叫“按上下文归类”

上下文归类会发生在表达式的类型与所处的位置相关时，如下面例子

```typescript
let myFunction: (n: number) => number;
myFunction = (arg) => {
  return arg.num; // 类型“number”上不存在属性“num”
}
```

TS类型检查器会使用 ***myFunction*** 的函数类型来推断右边表达式的类型，推断出 ***arg*** 参数的类型为 ***number***，不存在属性 ***num***

改写一下，函数表达式不是在上下文类型的位置，指定参数 ***arg*** 的类型为 ***any***，**<u>如果上下文类型表达式包含了明确的类型信息，则会忽略上下文的类型推断</u>**

```typescript
myFunction = (arg: any | { num: number }) => {
  return arg.num;
}
```

上下文归类使用的情况：包含函数的参数、赋值表达式的右边、类型断言、对象成员、数组字面量和返回值语句，上下文类型也会作为最佳通用类型的候选类型

```typescript
// 最佳通用类型有4个候选："Animal"、"Tiger"、"Monkey"和"Triger | Monkey"，Animal会被认为是最佳通用类型
function createZoo(): Animal[] {
  return [new Triger(), new Monkey()];
}
```





## 类型兼容性

TS的类型兼容性是基于结构子类类型的，结构类型是一种只使用其成员来描述类型的方式（基于名义类型的类型系统中，数据类型的兼容性或等价性是通过明确的声明或类型的名称来决定的；结构性类型系统是基于类型的组成结构，且不要求明确地声明）

```typescript
interface Named {
  name: string;
}
class Person {
  name: string = '';
}

let myPerson: Named;
myPerson = new Person();
```

TypeScript的结构性子类型是根据JavaScript代码的典型写法来设计的。 因为JavaScript里广泛地使用匿名对象，例如函数表达式和对象字面量，所以使用结构类型系统来描述这些类型比使用名义类型系统更好。



### 基本规则

***TS结构化类型系统的基本规则：如果 x 要兼容 y，那么 y 至少具有与 x 相同的属性***



### 原始类型和对象类型的兼容

```typescript
let x: Named;
let y: { name: string, age: number } = { name: '张三', age: 18 }
x = y;

function sayHello(n: Named) {
  console.log('hello ' + n.name)
}
sayHello(y);
```

上面例子中，编译器只会检查目标类型（x 和 参数 n）。检查 x 中的每个属性，查看能否在 y 中也找到对应类型的属性；检查函数参数 n 也是使用相同的规则



### 函数的兼容

#### 比较两个不同函数

- 参数列表不同

  ```typescript
  let fn11 = (a: number) => 0;
  let fn22 = (x: number, y: number) => 0;
  fn22 = fn11;
  fn11 = fn22; // 报错，不能将类型“(a: number, b: number) => number”分配给类型“(a: number) => number”
  ```

  fnc1 是否能赋值给 fnc2，看参数列表。fnc1 的每个参数都必须在 fnc2 中找到对应类型的参数（参数名字可以不同，只看类型对应），忽略了一个参数是允许的，可以参照 Array.property.forEach() 方法例子来理解；

  ```javascript
  let items = [1, 2, 3];
  items.foerEach((item, index, array) => console.log(item));
  items.foerEach(item => console.log(item));
  ```

  fnc2 中需要两个参数，fnc1 缺少一个，不允许赋值；

- 返回值列表不同（与原始对象和对象类型的比较相似）

  ```typescript
  let fn111 = () => ({ name: '张三' });
  let fn222 = () => ({ name: '张三', age: 18 });
  fn111 = fn222;
  fn222 = fn111; // 报错，类型 "{ name: string; }" 中缺少属性 "age"，但类型 "{ name: string; age: number; }" 中需要该属性
  ```

  类型系统强制源函数（fn111）的返回值类型必须是目标函数（fn222）返回值类型的子类型

#### 函数参数双向协变

声明需要传入的函数的类型信息并不是那么明确，但调用者可能传入了一个具有更明确类型学习的函数

```typescript
function exampleFn(cb: (any: any) => void) {
  // ...
}
exampleFn((e: Event) => console.log(e));
```

#### 可选参数与剩余参数

当一个函数有剩余参数时，它被当做无限个可选参数

```typescript
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
```

#### 函数重载

源函数的每个重载都要在目标函数上找到对应的函数签名，确保目标函数可以在所有源函数可调用的地方调用



### 枚举的兼容

不同枚举类型之前是不兼容的

```typescript
enum Enum1 { X, Y, Z }
enum Enum2 { X, Y, Z }
let val = Enum1.X;
val = Enum2.X; // 不能将类型“Enum2.X”分配给类型“Enum1”
```



### 类的兼容

类与对象字面量和接口差不多，但类有静态部分和实例部分的类型，比较两个类类型的对象时，只有实例的成员会被比较，静态成员和构造函数不在比较的范围内

```typescript
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
```

#### 类的私有成员和受保护成员

类的私有成员和受保护成员会影响兼容性。检查类实例的兼容性时，如果目标类型包含一个私有成员时，源类型也必须包含来自同一个类的这个私有成员，受保护成员也是如此，这表明了类的派生。

```typescript
// 改写上面例子
class Class1 {
  ...
  protected address: string = 'address';
  ...
}
...
c1 = c2; // 报错，类型 "Class2" 中缺少属性 "address"，但类型 "Class1" 中需要该属性
```

```typescript
// 还是改写
class Class1 {
  ...
  protected address: string = 'address';
  ...
}
class Class2 {
  ...
  protected address: string = 'address';
  ...
}
...
c2 = c1; // 报错，不能将类型“Class1”分配给类型“Class2”。属性“address”受保护，但类型“Class1”并不是从“Class2”派生的类
c1 = c2; // 报错，不能将类型“Class2”分配给类型“Class1”。属性“address”受保护，但类型“Class2”并不是从“Class1”派生的类
```

```typescript
class Class2 extends Class1{
}
c2 = c1; // ok
c1 = c2; // ok
```



### 泛型的兼容

TS是结构性的类型系统，类型参数只影响使用其作为类型一部分的结果类型

```typescript
interface Empty<T> {}
let empty1: Empty<number> = {};
let empty2: Empty<string> = {};
empty1 = empty2;
empty2 = empty1;
```

这里结果类型被当成 any，因为它们的结构使用类型参数是没有不同的，都是 {}

```typescript
// 改写上面例子
interface Empty<T> {
  empty: T;
}
let empty1: Empty<number> = {
  empty: 0
};
let empty2: Empty<string> = {
  empty: '0'
};
empty1 = empty2; // 不能将类型“Empty<string>”分配给类型“Empty<number>”。不能将类型“string”分配给类型“number”
empty2 = empty1; // 不能将类型“Empty<number>”分配给类型“Empty<string>”。不能将类型“number”分配给类型“string”
```

结果类型不同，所以无法兼容





## Symbol

ECMAScript 2015（ES6）起，规定了一种新的原始类型 symbol，像 number 、string 、boolean 一样，

详见 MDN [Symbol - JavaScript | MDN (mozilla.org)](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Symbol)



### symbol 类型的创建

语法：`Symbol([description])`

description 是可选的，字符串类型，表示对 symbol 的描述，仅用于调试

symbol 类型的值是通过 Symbol 构造函数创建的，每次调用都会创建新的 symbol 类型，即不可变且唯一的

```typescript
let symbol1: symbol = Symbol();
let symbol2 = Symbol();
console.log(symbol1 == symbol2); // false

let symbol3: symbol = Symbol('key');
let symbol4 = Symbol('key');
console.log(symbol3 == symbol4); // false
```



### 作为对象属性的键

```javascript
// .js文件
let key = Symbol();
let testObj = {
  [key]: 'value'
}
console.log(testObj[key]); // value
```



### 结合计算出的属性名声明来声明对象的属性和类成员

```javascript
// .js文件
let getClassNameSymbol = Symbol();
class TestC {
  [getClassNameSymbol]() {
    return getClassNameSymbol;
  }
}
let testC = new TestC();
console.log(testC[getClassNameSymbol]()); // Symbol();
```

