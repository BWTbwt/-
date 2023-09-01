// 弹窗
let selectDialog = document.querySelector('#select-dialog')
// 开始下一回合按钮
let startThisRoundBtn = document.querySelector('#start-this-round-btn')
// form 表单
let selectForm = document.querySelector('#select-form')
// 选择框
let gestureSelect = document.querySelector('#gesture-select')
// 结果渲染
let resultThisround = document.querySelector('.result-of-this-round')

// 手势图片的枚举
const GestureImg = {
  rock: './images/rock.png',
  scissor: './images/scissor.png',
  paper: './images/paper.png',
}
// 名称的枚举
const Name = {
  computer: '机器人',
  my: '玩家',
}
// 定义手势数组
const Gesture = ['rock', 'scissor', 'paper']
// 总回合数
const MaxRoundNum = 3
let roundIndex = 1

// 电脑和玩家的输赢情况
const comScore = {
  win: '0',
  lose: '0',
}
const myScore = {
  win: '0',
  lose: '0',
}

// 展示弹窗
function initGame() {
  // 点击 开始下一回合，出现弹窗
  startThisRoundBtn.addEventListener('click', () => {
    selectDialog.showModal()
  })
  // 选中选项后，点击确定关闭弹窗
  selectForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const mygesture = gestureSelect.value
    renderMyGesture(mygesture)
    selectDialog.close()
    const comGesture = renderComGesture()
    console.log(comGesture, mygesture)
    judgeWinlose(comGesture, mygesture)
  })
}

initGame()

// 玩家：选中选项后，点击确定，手势动画会根据选项变化
function renderMyGesture(myoption) {
  // 获取 玩家的手势img 标签
  let myGestureImg = document.querySelector('.my .gesture')
  // 获取传入的 选项，变为对应的图片
  let theGesture = GestureImg[myoption]
  myGestureImg.innerHTML = ` <img src="${theGesture}" >`
}

// 机器人：随机显示图片
function renderComGesture() {
  // 产生0-2的随机数，来对应石头 剪刀 布
  const random = Math.floor(Math.random() * 3)
  // 获取 机器人的手势img 标签
  let comGestureImg = document.querySelector('.computer .gesture')
  // 获取传入的 选项，变为对应的图片
  let randomImg = Gesture[random]
  let theGesture = GestureImg[randomImg]
  comGestureImg.innerHTML = `<img src="${theGesture}" >`

  return randomImg
}

// 机器人和玩家的输赢数据
function renderResult() {
  let comResult = document.querySelector('.computer .score')
  comResult.innerHTML = `胜利：${comScore.win} ｜ 负：${comScore.lose}`
  let myResult = document.querySelector('.my .score')
  myResult.innerHTML = `胜利：${myScore.win} ｜ 负：${myScore.lose}`
}

// 渲染汇合数
function renderRoundInfo(current, total) {
  document.querySelector(
    '.round'
  ).innerHTML = `第${current}回合（共${total}回合）`
}

// 判断输赢
function judgeWinlose(computer, my) {
  // 先定义结果文字
  let theroundResult = ''
  // 玩家 -- 赢
  let Ismywin = true
  if (computer === my) {
    theroundResult = '本回合平局'
  } else {
    // 如果机器 出石头
    if (computer === 'rock') {
      if (my === 'paper') {
        Ismywin = true
      } else {
        Ismywin = false
      }
    }
    // 如果机器 出剪刀
    if (computer === 'scissor') {
      if (my === 'rock') {
        Ismywin = true
      } else {
        Ismywin = false
      }
    }
    // 如果机器 出布
    if (computer === 'paper') {
      if (my === 'scissor') {
        Ismywin = true
      } else {
        Ismywin = false
      }
    }
    // 如果Ismywin为true，则文字渲染为玩家赢
    if (Ismywin) {
      theroundResult = '本回合玩家赢了'
      myScore.win++
      comScore.lose++
    } else {
      theroundResult = '本回合机器人赢了'
      myScore.lose++
      comScore.win++
    }
  }
  resultThisround.innerHTML = theroundResult
  renderResult()
  renderRoundInfo(roundIndex, MaxRoundNum)

  if (roundIndex === MaxRoundNum) {
    if (comScore.win > myScore.win) {
      finishGame('computer')
    } else if (comScore.win < myScore.win) {
      finishGame('my')
    } else {
      finishGame()
    }
  } else {
    if (comScore.win === 2) {
      finishGame('computer')
      return
    } else if (myScore.win === 2) {
      finishGame('my')
      return
    }
    roundIndex++
  }
}

// 结束回合后，开始按钮隐藏
// 如果传入的参数是 my，代表玩家赢了；如果是computer，代表机器人赢了
// 如果什么都不传，表示平局
function finishGame(winer) {
  selectDialog.close()
  startThisRoundBtn.style.display = 'none'
  let final = document.querySelector('.result-of-final')
  if (!winer) {
    final.innerHTML = `二位，是平局哦`
  } else {
    final.innerHTML = `胜利者是${Name[winer]},恭喜!!!`
  }
}
