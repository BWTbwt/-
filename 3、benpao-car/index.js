// 获取游戏区域
let gameMap = document.querySelector('.game')
// 获取车的图片
let carDom = document.querySelector('.car')
// 车的类型
let carType = document.querySelector('#carType')
// 速度
let speedSelect = document.querySelector('#speed')

// 车型对应的图片
const carTypeImg = {
  tractors: './image/car1.png',
  truck: './image/car2.png',
  motor: './image/car3.png',
  roadster: './image/car4.png',
  electromobile: './image/car5.png',
  bike: './image/car6.png',
}
// 上下左右键对应的keycode值
const KeyCode = {
  left: 37,
  up: 38,
  right: 39,
  down: 40,
}

let carHeadDirection = 'right'

function initGame() {
  // 监听事件 -- 键盘
  keyDirection()
  // 监听事件 -- 车的类型
  carChangeType()
  // 监听事件 -- 速度的变化
  speedChange()
  // 从localStorage中读取之前保存的数据，取出来时是字符串，需要用JSON.parse解析一下
  // 如果什么都不存的话，取出来是null
  const data = JSON.parse(localStorage.getItem('allCar'))
  if (data) {
    speedSelect.value = data.speed
    carType.value = data.carType
    carDom.style.left = data.position.left
    carDom.style.top = data.position.top
    renderCar(data.carType)
    carChangeHeadDirection(data.headCar)
  }
}

// 监听键盘事件 对应的上下左右键
function keyDirection() {
  window.addEventListener('keydown', function (e) {
    const keyCode = e.keyCode
    console.log(keyCode)
    moveCar(keyCode)
    storageAll()
  })
}

// 监听车的类型
function carChangeType() {
  carType.addEventListener('change', function (e) {
    renderCar(e.target.value)
    storageAll()
  })
}
// 监听速度的变化
function speedChange() {
  speedSelect.addEventListener('change', function (e) {
    storageAll()
  })
}

// 切换车对应的类型
function renderCar(carType) {
  const img = carTypeImg[carType]
  carDom.src = img
}

// 移动汽车
function moveCar(keyCode) {
  // 修改汽车dom的style，抽象成方法
  // 如果是往左或者右移动，那么只需要修改绝对定位的left属性即可
  // 往右移动是增加left的值，往左移动是减少left的值
  // 往上移动是减少top的值，往下移动是增加top的值
  function _move(direction) {
    // window.getComputedStyle 是一个 JavaScript 方法，用于获取指定元素的计算样式。
    const computedStyle = window.getComputedStyle(carDom)
    // 获取速度的值
    const curSpeed = parseInt(speedSelect.value)

    let valtWithPX, valWithNumber
    // 移动后最新的left和top值，待计算
    let newLeft = 0,
      newTop = 0
    if (direction === 'left' || direction === 'right') {
      valtWithPX = computedStyle.left
      // 截取 索引0 到 索引（排除px）
      // 例如，假设 valtWithPX 的值为 "100px"，那么 valtWithPX.length 的结果为 5。因此，表达式 valtWithPX.slice(0, valtWithPX.length - 2) 将返回从索引 0 到索引 3（不包括索引 3）的子字符串，即 "100"。
      valWithNumber = parseInt(valtWithPX.slice(0, valtWithPX.length - 2))
      if (direction === 'left') {
        newLeft = valWithNumber - curSpeed
      } else {
        newLeft = valWithNumber + curSpeed
      }
      carDom.style.left = `${newLeft}px`
    } else {
      valtWithPX = computedStyle.top
      valWithNumber = parseInt(valtWithPX.slice(0, valtWithPX.length - 2))
      if (direction === 'up') {
        newTop = valWithNumber - curSpeed
      } else {
        newTop = valWithNumber + curSpeed
      }
      carDom.style.top = `${newTop}px`
    }
  }
  // 键盘的方向
  let direction
  switch (keyCode) {
    case KeyCode.left:
      direction = 'left'
      break
    case KeyCode.up:
      direction = 'up'
      break
    case KeyCode.right:
      direction = 'right'
      break
    case KeyCode.down:
      direction = 'down'
      break
    default:
      break
  }
  _move(direction)
  carChangeHeadDirection(direction)
}

// 改变车头的方向，这里我们使用修改类名的方式来做，提前把各个方向的css类名写好
function carChangeHeadDirection(direction) {
  carHeadDirection = direction
  carDom.classList.remove('car-up', 'car-down', 'car-left', 'car-right')
  switch (direction) {
    case 'up':
      carDom.classList.add('car-up')
      break
    case 'down':
      carDom.classList.add('car-down')
      break
    case 'left':
      carDom.classList.add('car-left')
      break
    case 'right':
      carDom.classList.add('car-right')
      break
    default:
      break
  }
}

// 保存当前最新的速度、车型、车头方向、车的位置到localhost
function storageAll() {
  const curSpeed = speedSelect.value
  const carChangeType = carType.value
  const positionLeft = carDom.style.left
  const positionTop = carDom.style.top

  const objCar = {
    speed: curSpeed,
    carType: carChangeType,
    position: {
      left: positionLeft,
      top: positionTop,
    },
    headCar: carHeadDirection,
  }

  localStorage.setItem('allCar', JSON.stringify(objCar))
}

initGame()
