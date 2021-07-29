"use strict";
class MyTestC {
    run() { console.log('run'); }
    jump() { console.log('jump'); }
}
const myTestC = new MyTestC();
// myTestC.run();
const myTestObj = {
    run() { console.log('run'); },
    jump() { console.log('jump'); }
};
// myTestObj.jump();
const myTestObj2 = {
    name: '张三',
    age: 20
};
function getSmallPet() {
    // ...
    let res = {
        fly() { },
        swim() { },
        eat() { }
    };
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
if (pet.swim) {
    pet.swim();
}
else {
    pet.fly();
}
// 用户自定义类型保护
function isFish(pet) {
    return pet.swim !== undefined;
}
if (isFish(pet)) {
    pet.swim();
}
else { // 会被自动结合上下文
    pet.fly();
}
// typeof 类型保护
const myBar = (arg) => {
    console.log(typeof arg);
    if (typeof arg == 'string') {
        console.log(arg.length);
    }
    if (typeof arg !== 'number') {
        console.log(arg.length);
    }
};
myBar(1); // number
myBar('hello world'); // string 11 11
// instanceof 类型保护
class TestClass {
    constructor(name, age) {
        this.name = name;
        this.age = age;
        console.log(this.name);
        console.log(this.age);
    }
}
let tc = new TestClass('张三', 20);
console.log(tc instanceof TestClass); // true
console.log(tc instanceof Object); // true
class BirdClass {
    say() {
        console.log('bird 不会 run');
    }
}
class FishClass {
    say() {
        console.log('Fish 不会 run');
    }
}
function getPet() {
    return Math.random() < 0.5 ? new BirdClass() : new FishClass();
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
function f(x, y) {
    return x + (y || 0);
}
f(1, 2);
f(1);
f(1, undefined);
let o = {
    name: '张三'
};
console.log(o === null || o === void 0 ? void 0 : o.age); // undefined
// 类型保护和类型断言
function print(str) {
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
    return str === null || str === void 0 ? void 0 : str.length; // str 为 null，相当于关闭 strictNullChecks 标记，为 undefined
}
console.log(print(null));
console.log(print('hello'));
function getString(str) {
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
    return str();
}
console.log(getString('hello'));
console.log(getString(() => 'world'));
let otherArg = (() => {
    return 'world';
})();
console.log(getString(otherArg));
function isStringType(arg) {
    return !(arg instanceof Object);
}
let menu;
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
};
let myPoint = { x: 1, y: 1 };
let myPoint2 = { x: 1, y: 1 };
let myPoinstV2 = {
    x: 1,
    y: 1,
    z: 1
};
class PointClass {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}
class PointAliasClass {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}
let myPointClass = new PointClass(1, 1);
let myPointAliasClass = new PointAliasClass(1, 1);
let triangle = {
    l1: 1,
    l2: 1,
    l3: 1
};
let mO = {
    prop1: 'val1',
    prop2: 'val2',
    // prop3: 'val3' // 不存在该property
};
function isNotSet(x) {
    throw new Error('不存在该形状图形');
}
function area(s) {
    switch (s.kind) {
        case "square": return Math.pow(s.size, 2);
        case "rectangle": return s.height * s.width;
        case "circle": return Math.PI * Math.pow(s.radius, 2);
        default: return isNotSet(s);
    }
}
let rtgl = {
    kind: 'triangle',
    base: 20,
    height: 10
};
// console.log(area(rtgl)); // 抛出一个错误
// -
// 6. 索引类型
function getN(obj, key) {
    // K：'name' | 'age
    return obj[key];
}
let zs = {
    name: '张三',
    age: 20
};
let pname = getN(zs, 'name');
let page = getN(zs, 'age');
console.log(pname); // 张三
console.log(page); // 20
let pp1 = 'age';
let pp2 = 'name';
let ppname = '李四';
let ppage = 24;
let keys; // number | string
let value; // number
function proxify(o) {
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
        let res = {};
        for (const key in o) {
            let val = o[key];
            let property = {
                get() {
                    return val;
                },
                set(newVal) {
                    val = newVal;
                }
            };
            Object.defineProperty(res, key, property);
        }
        return res;
    }
    return o;
}
let props = {
    age: 20,
    name: 'zs'
};
let proxyProps = proxify(props);
// console.log('proxyProps', proxyProps);
// console.log('age', proxyProps.age);
// proxyProps.age = 30;
// console.log('age', proxyProps.age);
