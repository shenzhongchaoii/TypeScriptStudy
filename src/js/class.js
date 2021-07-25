"use strict";
// 1. 类
// 有构造器函数，成员属性，成员方法
class ClassType {
    constructor() {
        // ...
    }
    memberFn() {
        // ...
    }
}
let myClass; // 类的实例类型 ClassType
myClass = new ClassType(); // 构造函数 ClassType
let myClassConstructor = ClassType;
console.log(myClassConstructor);
// -
// 2. 继承
class BaseClass {
    constructor(n) {
        this.name = n;
    }
}
class SubClass extends BaseClass {
    constructor(n) {
        super(n);
        this.name = n + n;
    }
    setName(newName) {
        this.name = newName;
    }
}
let subClass = new SubClass('subClass');
console.log(subClass);
subClass.setName('new name');
console.log(subClass);
// -
// 3. 修饰符
class ClassName {
    // 标记构造函数为受保护，该类只能被继承，无法被实例化
    constructor() {
        this.name = '张三';
        this.age = 18;
        this.oldName = '张小三';
    }
    resetName(newName) {
        this.name = newName;
        // this.oldName = newName; // 报错，只读属性
    }
}
class SubClassName extends ClassName {
    constructor() {
        super();
        this.name = '';
        // this.age = 20;
        this.resetName('李四');
    }
}
// let class1 = new ClassName(); // 报错，类“ClassName”的构造函数是受保护的，仅可在类声明中访问
let class2 = new SubClassName();
// class2.oldName = '李四'; // 报错，只读属性
class ClassName2 {
    constructor(name) {
        this.name = name;
    }
}
// -
// 4. 存取器
let employeeName = '张三';
class Employee {
    constructor() {
        this._bankAccount = '银行卡号';
        this._money = 1e8;
    }
    get bankAccount() {
        if (employeeName && employeeName == '张三') {
            return this._bankAccount;
        }
        return '你不是张三';
    }
    get money() {
        if (employeeName && employeeName == '张三') {
            return this._money;
        }
        return 0;
    }
    set money(newMoney) {
        this._money = newMoney;
    }
}
let e = new Employee();
// e.bankAccount = '新银行卡号'; // 报错，只读属性
console.log(e.bankAccount); // 银行卡号
e.money = 1e7;
console.log(e.money); // 10000000
employeeName = '李四';
console.log(e.bankAccount); // 你不是张三
// -
// 5. 静态属性
class TestClass2 {
}
TestClass2.staticProp = '静态成员属性';
let tC = new TestClass2();
console.log(TestClass2.staticProp); // 类本身访问静态属性，可以
// console.log(tC.staticProp); // 类实例访问静态属性，不可以
// -
// 6. 抽象类
class AbstractClass {
    test2() {
        console.log('123');
    }
}
// let ac = new AbstractClass(); // 报错，抽象类无法被实例化
class Derivedclass extends AbstractClass {
    constructor() {
        super();
    }
    test() {
        console.log('抽象类中抽象方法在派生类中必须被实现');
    }
}
let dc = new Derivedclass(); // 抽象类的派生类可以被实例化
// -
// 7. 把类当接口使用
class BClass {
    constructor() {
        this.x = 1;
        this.y = 2;
    }
}
let t = {
    x: 10,
    y: 20,
    z: 30
};
console.log(t);
