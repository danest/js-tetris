let canvas
let ctx

let gBArrayHeight = 20
let gBArrayWidth = 12

let startX = 4
let startY = 0

let score = 0
let level = 1

let winOrLose = 'Playing'

let coordinateArray = [...Array(gBArrayHeight)].map((e) =>
  Array(gBArrayHeight).fill(0)
)

let stoppedShapeArray = [...Array(gBArrayHeight)].map((e) =>
  Array(gBArrayHeight).fill(0)
)

let curTetromino = [
  [1, 0],
  [0, 1],
  [1, 1],
  [2, 1],
]

let tetrominos = []
let tetrominoColors = [
  'purple',
  'cyan',
  'blue',
  'yellow',
  'orange',
  'green',
  'red',
]

let curTetrominoColor

let gameBoardArray = [...Array(gBArrayHeight)].map((e) =>
  Array(gBArrayHeight).fill(0)
)

let DIRECTION = {
  IDLE: 0,
  DOWN: 1,
  LEFT: 2,
  RIGHT: 3,
}

let direction

class Coordinates {
  constructor(x, y) {
    this.x = x
    this.y = y
  }
}

document.addEventListener('DOMContentLoaded', SetupCanvas)

function CreateCoordArray() {
  let i = 0
  let j = 0

  for (let y = 9; y <= 446; y += 23) {
    for (let x = 11; x <= 264; x += 23) {
      coordinateArray[i][j] = new Coordinates(x, y)
      i++
    }
    j++
    i = 0
  }
}

function SetupCanvas() {
  canvas = document.getElementById('my-canvas')
  ctx = canvas.getContext('2d')

  canvas.width = 936
  canvas.height = 956

  ctx.fillStyle = 'white'
  ctx.fillRect(0, 0, canvas.width, canvas.height)

  ctx.strokeStyle = 'black'
  ctx.strokeRect(8, 8, 280, 462)

  ctx.fillStyle = 'black'
  ctx.font = '21px Arial'
  ctx.fillText('SCORE', 300, 98)

  ctx.strokeRect(300, 107, 161, 24)
  ctx.fillText(score.toString(), 310, 127)

  ctx.fillText('LEVEL', 300, 157)
  ctx.strokeRect(300, 171, 161, 24)
  ctx.fillText(level.toString(), 310, 190)

  // Draw next label text
  ctx.fillText('WIN / LOSE', 300, 221)

  // Draw playing condition
  ctx.fillText(winOrLose, 310, 261)

  // Draw playing condition rectangle
  ctx.strokeRect(300, 232, 161, 95)

  // Draw controls label text
  ctx.fillText('CONTROLS', 300, 354)

  // Draw controls rectangle
  ctx.strokeRect(300, 366, 161, 104)

  // Draw controls text
  ctx.font = '19px Arial'
  ctx.fillText('A : Move Left', 310, 388)
  ctx.fillText('D : Move Right', 310, 413)
  ctx.fillText('S : Move Down', 310, 438)
  ctx.fillText('E : Rotate Right', 310, 463)

  document.addEventListener('keydown', HandleyKeyPress)

  CreateTetrominos()
  CreateTetromino()

  CreateCoordArray()
  DrawTetromino()
}

function DrawTetromino() {
  for (let i = 0; i < curTetromino.length; i++) {
    let x = curTetromino[i][0] + startX
    let y = curTetromino[i][1] + startY

    gameBoardArray[x][y] = 1

    let coorX = coordinateArray[x][y].x
    let coorY = coordinateArray[x][y].y

    ctx.fillStyle = curTetrominoColor
    ctx.fillRect(coorX, coorY, 21, 21)
  }
}

function HandleyKeyPress(key) {
  if (key.keyCode === 65) {
    direction = DIRECTION.LEFT

    if (!HittingTheWall()) {
      DeleteTetromino()
      startX--
      DrawTetromino()
    }
  } else if (key.keyCode === 68) {
    direction = DIRECTION.RIGHT
    if (!HittingTheWall()) {
      DeleteTetromino()
      startX++
      DrawTetromino()
    }
  } else if (key.keyCode === 83) {
    direction = DIRECTION.DOWN
    if (!HittingTheWall()) {
      DeleteTetromino()
      startY++
      DrawTetromino()
    }
  }
}

function DeleteTetromino() {
  for (let i = 0; i < curTetromino.length; i++) {
    let x = curTetromino[i][0] + startX
    let y = curTetromino[i][1] + startY
    gameBoardArray[x][y] = 0
    let coorX = coordinateArray[x][y].x
    let coorY = coordinateArray[x][y].y
    ctx.fillStyle = 'white'
    ctx.fillRect(coorX, coorY, 21, 21)
  }
}

function CreateTetrominos() {
  // Push T
  tetrominos.push([
    [1, 0],
    [0, 1],
    [1, 1],
    [2, 1],
  ])
  // Push I
  tetrominos.push([
    [0, 0],
    [1, 0],
    [2, 0],
    [3, 0],
  ])
  // Push J
  tetrominos.push([
    [0, 0],
    [0, 1],
    [1, 1],
    [2, 1],
  ])
  // Push Square
  tetrominos.push([
    [0, 0],
    [1, 0],
    [0, 1],
    [1, 1],
  ])
  // Push L
  tetrominos.push([
    [2, 0],
    [0, 1],
    [1, 1],
    [2, 1],
  ])
  // Push S
  tetrominos.push([
    [1, 0],
    [2, 0],
    [0, 1],
    [1, 1],
  ])
  // Push Z
  tetrominos.push([
    [0, 0],
    [1, 0],
    [1, 1],
    [2, 1],
  ])
}

function CreateTetromino() {
  let randomTetromino = Math.floor(Math.random() * tetrominos.length)

  curTetromino = tetrominos[randomTetromino]
  curTetrominoColor = tetrominoColors[randomTetromino]
}

function HittingTheWall() {
  for (let i = 0; i < curTetromino.length; i++) {
    let newX = curTetromino[i][0] + startX
    if (newX <= 0 && direction === DIRECTION.LEFT) {
      return true
    } else if (newX >= 11 && direction === DIRECTION.RIGHT) {
      return true
    }
  }
  return false
}
