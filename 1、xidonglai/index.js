const orderForm = document.querySelector('.order-form')

function AlterText(formValue) {
  const text = `
  【您的订单已经生成】
  ------------------------
  奶茶口味：${formValue.type}
  数量：${formValue.num}
  杯型：${formValue.size}
  甜度：${formValue.sugar}
  免费小料：${formValue['snack'] ? formValue['snack'] : '-'}
  加价小料：${formValue['sugarprize'] ? formValue['sugarprize'] : '-'}
  是否加冰：${formValue.ice}
  是否去茶底：${formValue.tea}
  地址：${formValue.address}
  手机号：${formValue.phone}
  期待送达时间：${formValue.time}
  备注：${formValue.other}
  支付方式：${formValue.pay}
  `
  return text
}

const onSubmit = (e) => {
  debugger
  // 防止跳转
  e.preventDefault()
  // 创建一个新的 FormData 对象，并将表单数据 orderForm 中的字段和值添加到该对象中
  const formData = new FormData(orderForm)
  const formValues = {}
  // formData.entries() 是一个方法，它用于返回一个包含表单字段的迭代器对象。该迭代器对象可以用于遍历表单中的每个字段及其对应的值。
  for (let every of formData.entries()) {
    const formName = every[0]
    const formValue = every[1]
    if (formValues[formName]) {
      // formValues[formName] = [formValue].concat(formValues[formName])
      // formValues[formName] = [奶霜（￥2）].concat(冰淇淋（￥4）)
      formValues[formName] = [formValue].concat(formValues[formName])
    } else {
      formValues[formName] = formValue
    }
  }
  console.log(formValues)
  alert(AlterText(formValues))
}
// 提交表单时，触发事件
orderForm.addEventListener('submit', onSubmit)

// window.onscroll 是 window 对象的一个事件属性，用于指定一个滚动事件的处理函数。当用户滚动页面时，浏览器会检测到滚动事件，并在滚动发生时触发该事件
window.onscroll = function () {
  scrollFunction()
}

function scrollFunction() {
  // 判断页面顶部距离当前可见区域顶部的距离是否大于 20 像素
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    document.querySelector('.scroll-top').style.display = 'block'
  } else {
    document.querySelector('.scroll-top').style.display = 'none'
  }
}
// 点击 回到顶部 触发事件
document.querySelector('.scroll-top').addEventListener('click', () => {
  document.documentElement.scrollTop = 0
})
