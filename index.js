const gameBoard = document.querySelector("#gameBoard");
const context = gameBoard.getContext("2d");
const scoreText = document.querySelector("#scoreText");
const resetButton = document.querySelector("#resetButton");
const gameWidth = gameBoard.width;
const gameHeight = gameBoard.height;
const boardBackground = "forestgreen";
const paddle1Color = "lightblue";
const paddle2Color = "red";
const paddleBorder = "black";
const ballColor = "yello";
const ballBorderColor = "black";
const ballRadius = 12.5;
const paddleSpeed = 50;
let intervalID;
let ballSpeed;
// Coordinates of the ball
let ballX = gameWidth / 2;
let ballY = gameHeight / 2;
// Direction of ball along X and Y axis
let ballXDirection = 0;
let ballYDirection = 0;
let player1Score = 0;
let player2Score = 0;
// Start paddle1 in top left corner, and paddle 2 in bottom right corner
let paddle1 = {
	width: 25,
	height: 100,
	x: 0,
	y: 0
};
let paddle2 = {
	width: 25,
	height: 100,
	x: gameWidth - 25,
	y: gameHeight - 100
};


window.addEventListener("keydown", changeDirection);
resetButton.addEventListener("click", resetGame);

gameStart();
drawPaddles();

function gameStart(){};
function nextTick(){};
function clearBoard(){};
function drawPaddles(){
	context.strokeStyle = paddleBorder;

	context.fillStyle = paddle1Color;
	context.fillRect(paddle1.x, paddle1.y, paddle1.width, paddle1.height);
	context.strokeRect(paddle1.x, paddle1.y, paddle1.width, paddle1.height);

	context.fillStyle = paddle2Color;
	context.fillRect(paddle2.x, paddle2.y, paddle2.width, paddle2.height);
	context.strokeRect(paddle2.x, paddle2.y, paddle2.width, paddle2.height);
};
function createBall(){};
function moveBall(){};
function drawBall(){};
function checkCollision(){};
function changeDirection(){};
function updateScore(){};
function resetGame(){};