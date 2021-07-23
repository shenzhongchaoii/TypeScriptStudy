// 1. 类
// 有构造器函数，成员属性，成员方法
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
let myClassConstructor: typeof ClassType = ClassType;
console.log(myClassConstructor)


// -
// 2. 继承
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


// -
// 3. 修饰符
class ClassName {
  public name: string = '张三';
  private age: number = 18;
    
  readonly oldName: string = '张小三';
  
  // 标记构造函数为受保护，该类只能被继承，无法被实例化
  protected constructor() {
      
  }

  protected resetName(newName: string) {
      this.name = newName;
      // this.oldName = newName; // 报错，只读属性
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

// let class1 = new ClassName(); // 报错，类“ClassName”的构造函数是受保护的，仅可在类声明中访问
let class2 = new SubClassName();
// class2.oldName = '李四'; // 报错，只读属性

class ClassName2 {
  constructor(protected readonly name: string) {

  }
}


// -
// 4. 存取器
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

// e.bankAccount = '新银行卡号'; // 报错，只读属性
console.log(e.bankAccount); // 银行卡号
e.money = 1e7;
console.log(e.money); // 10000000

employeeName = '李四';
console.log(e.bankAccount); // 你不是张三


// -
// 5. 静态属性
class TestClass2 {
  static staticProp: string = '静态成员属性';
}
let tC = new TestClass2();
console.log(TestClass2.staticProp); // 类本身访问静态属性，可以
// console.log(tC.staticProp); // 类实例访问静态属性，不可以


// -
// 6. 抽象类
abstract class AbstractClass {
  abstract test(): void;
  
  test2(): void {
    console.log('123')
  }
}

// let ac = new AbstractClass(); // 报错，抽象类无法被实例化

class Derivedclass  extends AbstractClass{
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
console.log(t);