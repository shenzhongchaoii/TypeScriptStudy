// 1. 接口例子
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
printLabel(labelObj);


// -
// 2. 可选属性
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


// -
// 3. 只读属性
interface Point {
	readonly x: number;
	readonly y: number;
}

let p: Point = { x: 10, y: 20 }
// p.x = 5; // 无法分配到 "x" ，因为它是只读属性。