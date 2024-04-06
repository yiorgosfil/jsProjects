const startBtn = document.getElementById('start-btn')
const canvas = document.getElementById('canvas') // Used for rendering graphics, animations etc
const startScreen = document.querySelector('.start-screen')
const checkpointScreen = document.querySelector('.checkpoint-screen')

// USe the child combinator `>` to target the <p> inside the `.checkpoint-screen`
const checkpointMessage = document.querySelector('.checkpoint-message > p')

const ctx = canvas.getContext('2d')
canvas.width = innerWidth // Number that represents the interior width of the browser window
canvas.height = innerHeight

// Keep track of the status for the checkpoint collision detection
let isCheckpointCollisionDetectionActive = true

// Keep the size of the elements responsive to different screen sizes
function proportionalSize(size) {
  return innerHeight < 500 ? Math.ceil((size / 500) * innerHeight) : size
}

class Player {
  constructor() {
    this.position = {
      x: proportionalSize(10),
      y: proportionalSize(400)
    }
    this.velocity = {
      x: 0,
      y: 0
    }
    this.width = proportionalSize(40)
    this.height = proportionalSize(40)
  }

  draw() {
    ctx.fillStyle = '#99c9ff'
    ctx.fillRect(this.position.x, this.position.y, this.width, this.height)
  }

  update() {
    this.draw() // Ensures that the player is always drawn on the screen
    this.position.x += this.velocity.x
    this.position.y += this.velocity.y

    if (this.position.y + this.height + this.velocity.y <= canvas.height) {
      if (this.position.y < 0) {
        this.position.y = 0
        this.velocity.y = gravity
      }
      this.velocity.y += gravity
    } else {
      this.velocity.y = 0
    }

    if (this.position.x < this.width) {
      this.position.x = this.width
    }

    if (this.position.x >= canvas.width - 2 * this.width) {
      this.position.x = canvas.width - 2 * this.width
    }
  }
}

class Platform {
  constructor(x, y) {
    this.position = {
      x,
      y,
    }
    this.width = 200
    this.height = proportionalSize(40)
  }
  draw() {
    ctx.fillStyle = '#acd157'
    ctx.fillRect(this.position.x, this.position.y, this.width, this.height)
  }
}

class CheckPoint {
  constructor(x, y, z) {
    this.position = {
      x,
      y,
      z,
    }
    this.width = proportionalSize(40)
    this.height = proportionalSize(70)
    this.claimed = false
  }

  draw() {
    ctx.fillStyle = '#f1be32'
    ctx.fillRect(this.position.x, this.position.y, this.width, this.height)
  }
  claim() {
    this.width = 0
    this.height = 0
    this.position.y = Infinity
    this.claimed = true
  }
}

// Create a new instance of Player
const player = new Player()

const platformPositions = [
  { x: 500, y: proportionalSize(450) },
  { x: 700, y: proportionalSize(400) },
  { x: 850, y: proportionalSize(350) },
  { x: 900, y: proportionalSize(350) },
  { x: 1050, y: proportionalSize(150) },
  { x: 2500, y: proportionalSize(450) },
  { x: 2900, y: proportionalSize(400) },
  { x: 3150, y: proportionalSize(350) },
  { x: 3900, y: proportionalSize(450) },
  { x: 4200, y: proportionalSize(400) },
  { x: 4400, y: proportionalSize(200) },
  { x: 4700, y: proportionalSize(150) },
]
// Create instances of all platforms
const platforms = platformPositions.map(
  (platform) => new Platform(platform.x, platform.y)
)

const checkpointPositions = [
  { x: 1170, y: proportionalSize(80), z: 1 },
  { x: 2900, y: proportionalSize(330), z: 2 },
  { x: 4800, y: proportionalSize(80), z: 3 },
]

// Create instances of all checkpoints
const checkpoints = checkpointPositions.map(
  (checkpoint) => new CheckPoint(checkpoint.x, checkpoint.y, checkpoint.z)
)

// 
function animate() {
  requestAnimationFrame(animate)
  ctx.clearRect(0, 0, canvas.width, canvas.height)

  platforms.forEach((platform) => platform.dra())
  checkpoints.forEach((checkpoint) => checkpoint.draw())
  player.update()

  if (keys.rightKey.pressed && player.position.x < proportionalSize(400)) {
    player.velocity.x = 5
  } else if (keys.leftKey.pressed && player.position.x > proportionalSize(100)) {
    player.velocity.x = -5
  } else {
    player.velocity.x = 0

    if (keys.rightKey.pressed && isCheckpointCollisionDetectionActive) {
      platforms.forEach((platform => platform.position.x -= 5))
      checkpoints.forEach((checkpoint) => checkpoint.position.x -= 5)
    } else if (keys.leftKey.pressed && isCheckpointCollisionDetectionActive) {
      platforms.forEach((platform => platform.position.x += 5))
      checkpoints.forEach((checkpoint) => checkpoint.position.x += 5)
    }
  }

  platforms.forEach((platform) => {
    const collisionDetectionRules = [
      player.position.y + player.height <= platform.position.y,
      player.position.y + player.height + player.velocity.y >= platform.position.y,
      player.position.x >= platform.position.x - player.width / 2,
      player.position.x <= platform.position.x + platform.width - player.width / 3
    ]

    if (collisionDetectionRules.every((rule) => rule)) {
      player.velocity.y = 0
      return
    }

    
  })
}

const keys = {
  rightKey: {
    pressed: false
  },
  leftKey: {
    pressed: false
  }
}

function startGame() {
  canvas.style.display = 'block'
  startScreen.style.display = 'none'
  player.draw()
}

startBtn.addEventListener('click', startGame)

