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
const ballColor = "yellow";
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


function gameStart(){
	createBall();
	nextTick();
};
function nextTick(){
	intervalID = setTimeout(() => {
		clearBoard();
		drawPaddles();
		moveBall();
		drawBall(ballX, ballY);
		checkCollision();
		nextTick();
	}, 10);
};
function clearBoard(){
	context.fillStyle = boardBackground;
	context.fillRect(0, 0, gameWidth, gameHeight);
};
function drawPaddles(){
	context.strokeStyle = paddleBorder;

	context.fillStyle = paddle1Color;
	context.fillRect(paddle1.x, paddle1.y, paddle1.width, paddle1.height);
	context.strokeRect(paddle1.x, paddle1.y, paddle1.width, paddle1.height);

	context.fillStyle = paddle2Color;
	context.fillRect(paddle2.x, paddle2.y, paddle2.width, paddle2.height);
	context.strokeRect(paddle2.x, paddle2.y, paddle2.width, paddle2.height);
};

function createBall(){
	ballSpeed = 1;
	// If number is 1 move to right/down, if 0 then move left/up
	if(Math.round(Math.random()) == 1){
		ballXDirection = 1;
	}
	else{
		ballXDirection = -1;
	}
	if(Math.round(Math.random()) == 1){
		ballYDirection = 1;
	}
	else{
		ballYDirection = -1;
	}
	// Start ball in center
	ballX = gameWidth / 2;
	ballY = gameHeight / 2;
	drawBall(ballX, ballY);
};
function moveBall(){
	ballX += (ballSpeed * ballXDirection);
	ballY += (ballSpeed * ballYDirection);
};
function drawBall(ballX, ballY){
	  context.fillStyle = ballColor;
	  context.strokeStyle = ballBorderColor;
	  context.lineWidth = 2;
	  context.beginPath();
	  context.arc(ballX, ballY, ballRadius, 0, 2 * Math.PI);
	  context.stroke();
	  context.fill();
};
function checkCollision(){
	// If ball hits top/bottom of board, reverse it's direction
	if(ballY <= 0 + ballRadius){
		ballYDirection *= -1;
	}
	if(ballY >= gameHeight - ballRadius){
		ballYDirection *= -1;
	}
	// If ball hits left/right corner, update player scores
	if(ballX <= 0){
		player2Score+=1;
		updateScore();
		createBall();
		return;
	}
	if(ballX >= gameWidth){
		player1Score+=1;
		updateScore();
		createBall();
		return;
	}

	if (ballX <= (paddle1.x + paddle1.width + ballRadius)){
		if (ballY > paddle1.y && ballY < paddle1.y + paddle1.height) {
			ballX = (paddle1.x + paddle1.width) + ballRadius; // if ball gets stuck
			ballXDirection *= -1;
			ballSpeed += 0.5;
		}
	}
	if (ballX >= (paddle2.x - ballRadius)) {
		if (ballY > paddle2.y && ballY < paddle2.y + paddle2.height) {
			ballX = paddle2.x - ballRadius; // if ball gets stuck
			ballXDirection *= -1;
			ballSpeed += 0.5;
		}
	}
};
function changeDirection(event){
	const keyPressed = event.keyCode;
	const paddle1Up = 87;
	const paddle1Down = 83;
	const paddle2Up = 38;
	const paddle2Down = 40;

	switch (keyPressed) {
		case (paddle1Up):
			if(paddle1.y > 0){
				paddle1.y -= paddleSpeed;
			}
			break;
		case (paddle1Down):
			if(paddle1.y < gameHeight - paddle1.height){
				paddle1.y += paddleSpeed;
			}
			break;
		case (paddle2Up):
			if(paddle2.y > 0){
				paddle2.y -= paddleSpeed;
			}
			break;
		case (paddle2Down):
			if(paddle2.y < gameHeight - paddle2.height){
				paddle2.y += paddleSpeed;
			}
			break;
	}
};
function updateScore(){
	scoreText.textContent = `${player1Score} : ${player2Score}`;
};
function resetGame(){};