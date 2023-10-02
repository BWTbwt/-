// 获取地图
let gameMapDom = document.querySelector('.game-map')
// 获取音乐
let bgmAudioDom = document.querySelector('#bgm')
// 获取选项
let bgmSelectDom = document.querySelector('#playBgm')
// 键盘的上下左右键KeyCode 和方向键的对应关系
let KeyCode = {
  37: 'left',
  38: 'up',
  39: 'right',
  40: 'down',
}
// 车头方向
let trainHeadDirection = 'right'
// 保存火车的节点位置数据
let trainList = [
  {
    top: 0,
    left: 0,
    direction: 'right',
  },
  {
    top: 0,
    left: 22,
    direction: 'right',
  },
  {
    top: 0,
    left: 44,
    direction: 'right',
  },
]

// 初始化数据
function initGame() {
  // 监听背景音乐
  listerSelect()
  // 监听键盘事件
  listenKeyboardDirection()
  //
  renderTrain()
}
initGame()

// 监听背景音乐的选择
function listerSelect() {
  bgmSelectDom.addEventListener('change', (e) => {
    playBgm(e.target.value)
  })
}

// play() 和 pause() 是标准的 HTML5 <audio> 元素提供的方法，用于控制音频的播放和暂停
// play() 方法用于启动或继续播放音频。
// pause() 方法用于暂停音频的播放。
function playBgm(val) {
  if (val === 'y') {
    bgmAudioDom && bgmAudioDom.play()
  } else {
    bgmAudioDom && bgmAudioDom.pause()
  }
}

// 监听键盘事件来响应上下左右按键
function listenKeyboardDirection() {
  window.addEventListener('keydown', (e) => {
    let keyCode = e.keyCode
    let directionKeycode = KeyCode[keyCode]
    console.log(directionKeycode, 'directionKeycode')
    // 如果按下的方向键和当前的方向正好相反，那么就认为是无效的，比如说当前火车正在往右开，但是按下了左方向键盘
    // if (
    //   (trainHeadDirection === 'right' && directionKeycode === 'left') ||
    //   (trainHeadDirection === 'left' && directionKeycode === 'right')(
    //     trainHeadDirection === 'up' && directionKeycode === 'down'
    //   ) ||
    //   (trainHeadDirection === 'down' && directionKeycode === 'up')
    // ) {
    //   return
    // }
    changeTrainDirection(directionKeycode)
  })
}

// 根据键盘操作来改变火车方向，这里需要做两件事情：
// 1. 改变全局变量trainHeadDirection来记录火车的方向
// 2. 改变trainList数据中火车头的方向数据以及位置数据
function changeTrainDirection(direction) {
  trainHeadDirection = direction
  console.log(trainHeadDirection, 'trainHeadDirection')
}

// 根据火车的车厢节点数据List来渲染火车
function renderTrain() {
  let trainNodeDomList = document.querySelectorAll('.train-node')
  console.log(trainNodeDomList, 'trainNodeDomList')
  for (let index = 0; index < trainList.length; index++) {
    const trainNodeData = trainList[index]
    const trainNodeDom = trainNodeDomList[index]
    // 设置每个车厢节点的位置
  }
}
