const $slideWrap = $('.slide-wrap')
const $slides = $('.slide-wrap>div')
const $points = $('.points')
const $container = $('.container')

const WIDTH = $slideWrap.width()
const LENGTH = $points.children().length

let currentIndex = 1

let timer

initSlideWrap()

listenToPoints()

listenToBtns()

listenToSlideWrap()

autoPlay()


$container.on('mouseenter', () => {
  clearInterval(timer)
})

$container.on('mouseleave', () => {
  timer = setInterval(() => {
    slideTo(currentIndex + 1)
  }, 2000)
})

// 页面切换可能导致定时器混乱，解决办法就是切换页面时，停掉定时器
document.addEventListener('visibilitychange', () => {
  if (document.hidden) {
    // 页面切换了
    clearInterval(timer)
  } else {
  	// 切换回来了
    timer = setInterval(() => {
      slideTo(currentIndex + 1)
    }, 2000)
  }
})


// 向头尾插入节点，为实现无缝轮播
function initSlideWrap() {
  $slideWrap.append($slides.eq(0).clone(true))
  $slideWrap.prepend($slides.eq($slides.length - 1).clone(true))
  translateWithNoTransition()
}


function autoPlay() {
  timer = setInterval(() => {
    slideTo(currentIndex + 1)
  }, 2000)
}


function listenToBtns() {
  $('.previous').on('click', () => {
    slideTo(currentIndex - 1)
  })
  $('.next').on('click', () => {
    slideTo(currentIndex + 1)
  })
}

function listenToPoints() {
  $('.points').on('click', 'span', (e) => {
    let index = $(e.currentTarget).index()
    currentIndex = index + 1
    slideTo(currentIndex)
  })
}

function slideTo(targetIndex) {
  $slideWrap.css({ transform: `translateX(-${targetIndex * WIDTH}px)` })

  currentIndex = targetIndex
}

function listenToSlideWrap() {
  $slideWrap[0].addEventListener('transitionend', () => {
    if (currentIndex > LENGTH) {
      currentIndex = 1
      translateWithNoTransition()
    } else if (currentIndex <= 0) {
      currentIndex = LENGTH
      translateWithNoTransition()
    }
  })
}

function translateWithNoTransition() {
  $slideWrap.hide().offset()
  $slideWrap.css({ transform: `translateX(-${currentIndex * WIDTH}px)` }).show()
}