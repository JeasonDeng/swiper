let n
let length

init()

setInterval(() => {

  makeLeave(getSlide(n))
    .one('transitionend', (e) => {
      makeEnter($(e.currentTarget)) // 千万注意，这里不可以写 $this, 此处的 this 是 window
                                    // 也不能写 getSlide(n)，此处是异步代码，会在 n++ 之后才执行
    })

  makeCurrent(getSlide(n + 1))

  n++
}, 2000)



function init() {
  const $slides = $('[class^=slide]')
  n = 1
  length = $slides.length

  getSlide(n).addClass('current').siblings().addClass('enter')
}



function x(n) {
  if (n % length) {
    n = n % length
  } else {
    n = 4
  }
  return n
}

function getSlide(n) {
  return $(`.slide${x(n)}`)
}


function makeEnter($node) {
  return $node.removeClass('current leave').addClass('enter')
}

function makeLeave($node) {
  return $node.removeClass('current enter').addClass('leave')
}

function makeCurrent($node) {
  return $node.removeClass('enter leave').addClass('current')
}



// setTimeout(() => {
//   $slide1.css({
//     transform: 'translateX(-100%)'
//   }).one('transitionend', () => {
//     $slide1.css({ transform: 'translateX(100%)' })
//   })
//   $slide2.css({
//     transform: 'translateX(0)'
//   })
// }, 2000)

// setTimeout(() => {
//   $slide2.css({
//     transform: 'translateX(-100%)'
//   })
//   $slide3.css({
//     transform: 'translateX(0)'
//   })
// }, 4000)

// setTimeout(() => {
//   $slide3.css({
//     transform: 'translateX(-100%)'
//   })
//   $slide4.css({
//     transform: 'translateX(0)'
//   })
// }, 6000)

// setTimeout(() => {
//   $slide4.css({
//     transform: 'translateX(-100%)'
//   })
//   $slide1.css({
//     transform: 'translateX(0)'
//   })
// }, 8000)