"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
// 1. 类
// 有构造器函数，成员属性，成员方法
var ClassType = /** @class */ (function () {
    function ClassType() {
        // ...
    }
    ClassType.prototype.memberFn = function () {
        // ...
    };
    return ClassType;
}());
var myClass; // 类的实例类型 ClassType
myClass = new ClassType(); // 构造函数 ClassType
var myClassConstructor = ClassType;
console.log(myClassConstructor);
// -
// 2. 继承
var BaseClass = /** @class */ (function () {
    function BaseClass(n) {
        this.name = n;
    }
    return BaseClass;
}());
var SubClass = /** @class */ (function (_super) {
    __extends(SubClass, _super);
    function SubClass(n) {
        var _this = _super.call(this, n) || this;
        _this.name = n + n;
        return _this;
    }
    SubClass.prototype.setName = function (newName) {
        this.name = newName;
    };
    return SubClass;
}(BaseClass));
var subClass = new SubClass('subClass');
console.log(subClass);
subClass.setName('new name');
console.log(subClass);
// -
// 3. 修饰符
var ClassName = /** @class */ (function () {
    // 标记构造函数为受保护，该类只能被继承，无法被实例化
    function ClassName() {
        this.name = '张三';
        this.age = 18;
        this.oldName = '张小三';
    }
    ClassName.prototype.resetName = function (newName) {
        this.name = newName;
        // this.oldName = newName; // 报错，只读属性
    };
    return ClassName;
}());
var SubClassName = /** @class */ (function (_super) {
    __extends(SubClassName, _super);
    function SubClassName() {
        var _this = _super.call(this) || this;
        _this.name = '';
        // this.age = 20;
        _this.resetName('李四');
        return _this;
    }
    return SubClassName;
}(ClassName));
// let class1 = new ClassName(); // 报错，类“ClassName”的构造函数是受保护的，仅可在类声明中访问
var class2 = new SubClassName();
// class2.oldName = '李四'; // 报错，只读属性
var ClassName2 = /** @class */ (function () {
    function ClassName2(name) {
        this.name = name;
    }
    return ClassName2;
}());
// -
// 4. 存取器
var employeeName = '张三';
var Employee = /** @class */ (function () {
    function Employee() {
        this._bankAccount = '银行卡号';
        this._money = 1e8;
    }
    Object.defineProperty(Employee.prototype, "bankAccount", {
        get: function () {
            if (employeeName && employeeName == '张三') {
                return this._bankAccount;
            }
            return '你不是张三';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Employee.prototype, "money", {
        get: function () {
            if (employeeName && employeeName == '张三') {
                return this._money;
            }
            return 0;
        },
        set: function (newMoney) {
            this._money = newMoney;
        },
        enumerable: false,
        configurable: true
    });
    return Employee;
}());
var e = new Employee();
// e.bankAccount = '新银行卡号'; // 报错，只读属性
console.log(e.bankAccount); // 银行卡号
e.money = 1e7;
console.log(e.money); // 10000000
employeeName = '李四';
console.log(e.bankAccount); // 你不是张三
// -
// 5. 静态属性
var TestClass2 = /** @class */ (function () {
    function TestClass2() {
    }
    TestClass2.staticProp = '静态成员属性';
    return TestClass2;
}());
var tC = new TestClass2();
console.log(TestClass2.staticProp); // 类本身访问静态属性，可以
// console.log(tC.staticProp); // 类实例访问静态属性，不可以
// -
// 6. 抽象类
var AbstractClass = /** @class */ (function () {
    function AbstractClass() {
    }
    AbstractClass.prototype.test2 = function () {
        console.log('123');
    };
    return AbstractClass;
}());
// let ac = new AbstractClass(); // 报错，抽象类无法被实例化
var Derivedclass = /** @class */ (function (_super) {
    __extends(Derivedclass, _super);
    function Derivedclass() {
        return _super.call(this) || this;
    }
    Derivedclass.prototype.test = function () {
        console.log('抽象类中抽象方法在派生类中必须被实现');
    };
    return Derivedclass;
}(AbstractClass));
var dc = new Derivedclass(); // 抽象类的派生类可以被实例化
// -
// 7. 把类当接口使用
var BClass = /** @class */ (function () {
    function BClass() {
        this.x = 1;
        this.y = 2;
    }
    return BClass;
}());
var t = {
    x: 10,
    y: 20,
    z: 30
};
console.log(t);
