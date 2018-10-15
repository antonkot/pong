// Global Constants
const APP_SIZE = 400
const PLAYER_SIZE = 40
const BALL_SIZE = 10
const PLAYER_SPEED = 10
const BALL_SPEED = 6
const FRAME_RATE = 30

// Variables
const player1 = document.getElementById('player1')
const player2 = document.getElementById('player2')
const ball = document.getElementById('ball')

const score1 = document.getElementById('score1')
const score2 = document.getElementById('score2')

let p1posY = APP_SIZE / 2 - PLAYER_SIZE / 2
let p1posX = BALL_SIZE
let p1speed = 0
let p2posY = APP_SIZE / 2 - PLAYER_SIZE / 2
let p2posX = APP_SIZE - BALL_SIZE * 2
let p2speed = 0

let p1score = 0
let p2score = 0

let ballPosX = APP_SIZE / 2 - BALL_SIZE / 2
let ballPosY = APP_SIZE / 2 - BALL_SIZE / 2

let ballSpeedX = BALL_SPEED
let ballSpeedY = BALL_SPEED

// Input Event Listeners
document.addEventListener('keydown', evt => {
    switch (evt.keyCode) {
        case 87: // w
            p1speed = -PLAYER_SPEED
            break;
        case 83: // s
            p1speed = PLAYER_SPEED
            break;
        case 38: // ArrowUp
            p2speed = -PLAYER_SPEED
            break;
        case 40: // ArrowDown
            p2speed = PLAYER_SPEED
            break;
        default:

    }
})

document.addEventListener('keyup', evt => {
    switch (evt.keyCode) {
        case 87: // w
        case 83: // s
            p1speed = 0
            break;
        case 38: // ArrowUp
        case 40: // ArrowDown
            p2speed = 0
            break;
        default:

    }
})

function addPoint(first = true) {
    if (first) {
        p1score++
        score1.innerText = p1score
    } else {
        p2score++
        score2.innerText = p2score
    }
    ballPosX = APP_SIZE / 2 - BALL_SIZE / 2
    ballPosY = APP_SIZE / 2 - BALL_SIZE / 2
    ballSpeedX = BALL_SPEED * (first ? 1 : -1)
}

// Main Loop
setInterval(() => {

    // Handling ball movement
    ballPosX += ballSpeedX
    ballPosY += ballSpeedY

    if (ballPosY <= 0) {
        ballPosY = 0
        ballSpeedY *= -1
    }
    if (ballPosY >= APP_SIZE - BALL_SIZE) {
        ballPosY = APP_SIZE - BALL_SIZE
        ballSpeedY *= -1
    }

    let cond1 = !(
        (
            p1posX > ballPosX + BALL_SIZE ||
            p1posX < ballPosX - BALL_SIZE
        ) || (
            p1posY < ballPosY - BALL_SIZE ||
            p1posY > ballPosY + PLAYER_SIZE
        )
    )
    let cond2 = !(
        (
            p2posX > ballPosX + BALL_SIZE ||
            p2posX < ballPosX - BALL_SIZE
        ) || (
            p2posY < ballPosY - BALL_SIZE ||
            p2posY > ballPosY + PLAYER_SIZE
        )
    )

    if (cond1 || cond2) {
        ballSpeedX *= -1
    }

    // Handle scores
    if (ballPosX <= 0) {
        // Player1 lost
        addPoint(false)
    }
    if (ballPosX >= APP_SIZE - BALL_SIZE) {
        // Player2 lost
        addPoint(true)
    }

    ball.style.left = ballPosX + "px"
    ball.style.top = ballPosY + "px"

    // Handling player #1 movement
    p1posY += p1speed
    if (p1posY <= 0) {
        p1posY = 0
    }
    if (p1posY >= APP_SIZE - PLAYER_SIZE) {
        p1posY = APP_SIZE - PLAYER_SIZE
    }
    player1.style.top = p1posY + "px"

    // Handling player #2 movement
    p2posY += p2speed
    if (p2posY <= 0) {
        p2posY = 0
    }
    if (p2posY >= APP_SIZE - PLAYER_SIZE) {
        p2posY = APP_SIZE - PLAYER_SIZE
    }
    player2.style.top = p2posY + "px"

}, 1000 / FRAME_RATE)