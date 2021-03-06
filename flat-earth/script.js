const box = document.querySelector('section')
const video = document.querySelector('video')
const modal = document.querySelector('.modal')
const okButton = document.querySelector('button.ok')

let isMouseDown = false
let initialMouseDownXPosition = 0
let previousX = 0
let lastMouseOrTouchPositon

okButton.addEventListener('click', function () {
  modal.remove()
})

function spin(x, isDesktop) {
  box.style.transform = `rotateY(${x * (isDesktop ? 0.4 : 0.8)}deg)`
}
function playVideo() {
  const rotationAngle = getRotationAngle(box)

  rotationAngle >= 180 ? video.play() : video.pause()
}

function startMoveTrack(e) {
  if (e.target.matches('div.face') || e.target.matches('video.face')) {
    isMouseDown = true
    initialMouseDownXPosition = e.clientX || e.touches[0].clientX
  }
}

function endMoveTrack() {
  if (isMouseDown) {
    // Save how much rotation happened, so next time
    // it continues from there
    previousX = lastMouseOrTouchPositon - initialMouseDownXPosition + previousX

    // Reset mouse tracking
    isMouseDown = false
    initialMouseDownXPosition = 0
  }
}

function trackMovement(e) {
  if (isMouseDown) {
    const mousePositionX = e.clientX || e.touches[0].clientX
    const isDesktop = e.clientX

    const movedX = mousePositionX - initialMouseDownXPosition + previousX
    lastMouseOrTouchPositon = mousePositionX

    spin(movedX, isDesktop)
    playVideo()
  }
}
document.addEventListener('mousedown', e => startMoveTrack(e))
document.addEventListener('touchstart', e => startMoveTrack(e))

document.addEventListener('mouseup', () => endMoveTrack())
document.addEventListener('touchend', () => endMoveTrack())

document.addEventListener('mousemove', e => trackMovement(e))
document.addEventListener('touchmove', e => trackMovement(e))
