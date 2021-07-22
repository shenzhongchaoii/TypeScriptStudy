# 基础类型



## 类型声明

- 通过类型声明可以指定ts中变量（参数、形参）的类型
- 类型声明给变量设置了类型，变量仅能存储对应类型的值，ts编译器会自动检查值是否符合类型声明
- ts编译器拥有自动类型判断机制，当对变量的声明和赋值是同时进行的，TS编辑器会自动判断变量的类型，此时可以省略类型声明

```typescript
// 完整：let test: string = 'helo world';
let test = 'helo world';

// 完整：const fn = (a: number, b: number): number => a + b;
const fn = (a: number, b: number) => a + b;
```



## 类型

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

### Number

所有浮点数，类型为 number。包括十进制、十六进制、二进制、八进制等

```typescript
let decimalNum: number = 10;
let hexadecimalNum: number = 0x10; // 16
let binaryNum: number = 0b10; // 2
let octalNum: number = 0o10; // 8
```

### String

使用 "" 、''、`` 包围的文本

```typescript
let str1: string = "string1";
let str2: string = 'string2';
let str3: string = `string3`;
```

### Boolean

布尔值 true/false

```typescript
let isDoing: boolean = true;
let isDoing: boolean = false;
```

### 字面量

值仅能为本身定义好的具体值

```typescript
type StringLiteral = 'hello' | 'world';
let val1: StringLiteral = 'hello';
let val2: StringLiteral = 'world';
```

### Any 和 Unknown

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

### Void

某种程度上来说，void 类型与 any （或unknown）类型相反，表示没有任何类型。当函数没有返回值是，其返回值类型为 void

```typescript
// void 类型的变量，值只能为 undefined
let meaninglessVal: void = undefined;

// 没有返回值的函数
const fn = (): void => {
	// todo this
}
```

### Null 和 Undefined

值为null时，对应的类型为null（undefined同理）

```typescript
let n: null = null;
let u: undefined = undefined;
```

### Never

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

### Object

非原始类型，除 number、string、boolean、symbol、null、undefined之外的类型，可以是任意JavaScript对象

```typescript
const fn = (o: object | null) => {
	// todo this
}

fn({ test: 'hello world' });
fn(null);
```

### Array



