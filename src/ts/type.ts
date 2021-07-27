// 1. Number
let decimalNum: number = 10;
let hexadecimalNum: number = 0x10; // 16
let binaryNum: number = 0b10; // 2
let octalNum: number = 0o10; // 8


// -
// 2. String
let str1: string = "string1";
let str2: string = 'string2';
let str3: string = `string3`;


// -
// 3. Boolean
let isDoing: boolean = true;
let isDone: boolean = false;


// -
// 4. 字面量
type StringLiteral = 'hello' | 'world';
let val1: StringLiteral = 'hello';
let val2: StringLiteral = 'world';


// -
// 5. Any 和 Unknown
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


// -
// 6. Void
// void 类型的变量，值只能为 undefined
let meaninglessVal: void = undefined;

// 没有返回值的函数
const fn = (): void => {
	// todo this
}


// -
// 7. Null 和 Undefined
let n: null = null;
let u: undefined = undefined;


// -
// 8. Never
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


// -
// 9. Object
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


// -
// 10. Array
let list: number[] = [1, 2, 3]; // let list: Array<number> = [1, 2, 3];
// readonlyArray
let numberList: number[] = [1, 2];
let readonlyNumberList: ReadonlyArray<number> = numberList;
// readonlyNumberList[0] = 10; // 类型“readonly number[]”中的索引签名仅允许读取。

// 可以使用类型断言重写
let numberList2 = readonlyNumberList as number[];
console.log(numberList2)


// -
// 11. Tuple
let tupleList: [number, string] = [1, '2'];


// -
// 12. Enum
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


// -
// 13. 类型断言
let someVal: any = "这是一个字符串";
// 1. 尖括号语法（jsx中，不允许尖括号语法）
// let strLen: number = (<string>someVal).length;
// 2. as 语法
let strLen: number = (someVal as string).length;
console.log(strLen)

// 非空类型断言
let tname: string = 'string'
let tname2: string;
console.log(tname.trim())
//非空断言操作符 ! 可以移除编译器检查对象属性为undefined时报错
//当属性不存在时，运行会报错 undefined 无法通过
console.log(tname2!.toString())