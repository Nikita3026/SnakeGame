const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");


const box = 32;

let score = 0;

let eatAudio = new Audio();
eatAudio.src = "audio/Amm.mp3";

let overAudio = new Audio();
overAudio.src = "audio/over.mp3";

let backSound = new Audio();
backSound.src = "audio/back.mp3";

let food = new Image();
food.src = "images/food.png";

let egg = new Image();
egg.src = "images/Egg.png";

let cherry = new Image();
cherry.src = "images/cherry.png";

let grapes = new Image();
grapes.src = "images/grapes.png";

let bird = new Image();
bird.src = "images/bird.png";

let Randomfood = food;

let snakeHeadImage = new Image();
snakeHeadImage.src = "images/snake.png";


let currentSpeed = 150;

let RemainFood = 2;

let foodPlace = {
    x: Math.floor(Math.random() * 32) * box,
    y: Math.floor(Math.random() * 23) * box,
};


let snake = [];
snake[0] = {
    x: 15 * box,
    y: 11 * box,
};

document.addEventListener("keydown", direction);

let dir;

function direction(event) {
    if (event.keyCode == 37 && dir != "right") dir = "left";
    else if (event.keyCode == 38 && dir != "down") dir = "up";
    else if (event.keyCode == 39 && dir != "left") dir = "right";
    else if (event.keyCode == 40 && dir != "up") dir = "down";
    else if (event.keyCode == 65 && dir != "right") dir = "left";
    else if (event.keyCode == 87 && dir != "down") dir = "up";
    else if (event.keyCode == 68 && dir != "left") dir = "right";
    else if (event.keyCode == 83 && dir != "up") dir = "down";
}


function eatTail(head, snake) {
    for (let i = 0; i < snake.length; i++) {
        if (head.x == snake[i].x && head.y == snake[i].y) {
            clearInterval(game);
            backSound.pause();
            overAudio.play();
            ctx.fillStyle = "#000000";
            ctx.font = "100px 'VT323', monospace";
            ctx.fillText("GAME OVER", box * 11, box * 11)
            ctx.font = "50px 'VT323', monospace";
            ctx.fillText(`score:${score}`, box * 15, box * 12.5);
        }

    }
}

function foodRandomize() {
    let randomFood = Math.floor(Math.random() * 5 + 1);
    switch (randomFood) {
        case 1:
            return bird;
            break;
        case 2:
            return cherry;
            break;
        case 3:
            return egg;
            break;
        case 4:
            return food;
            break;
        case 5:
            return grapes;
            break;
    }
}

backSound.volume = 0.2;
backSound.loop = true;
backSound.play();


function drawGame() {
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, 1024, 736);
    ctx.drawImage(Randomfood, foodPlace.x, foodPlace.y);

    ctx.fillStyle = "#2AC2D3";
    ctx.font = "50px 'VT323', monospace";
    ctx.fillText(score, box * 30, box * 2)

    for (let i = 0; i < snake.length; i++) {
        ctx.fillStyle = i == 0 ? "#000000" : "#2AC2D3";
        ctx.fillRect(snake[i].x, snake[i].y, box, box);
    }
    let snakeX = snake[0].x;
    let snakeY = snake[0].y;
    if (foodPlace.x == snakeX && foodPlace.y == snakeY) {
        score++;
        eatAudio.play();
        RemainFood--;
        if (RemainFood == 0) {
            RemainFood = 2;
            if (currentSpeed > 70)
                currentSpeed -= 10;
            clearInterval(game);
            game = setInterval(drawGame, currentSpeed)
        }
        Randomfood = foodRandomize();
        foodPlace = {
            x: Math.floor(Math.random() * 32) * box,
            y: Math.floor(Math.random() * 23) * box,
        };
    } else snake.pop();


    if (dir == "left") snakeX -= box;
    if (dir == "right") snakeX += box;
    if (dir == "down") snakeY += box;
    if (dir == "up") snakeY -= box;

    let newHead = {
        x: snakeX,
        y: snakeY,
    };

    if (newHead.x > (31 * box)) newHead.x = 0;
    if (newHead.x < 0) newHead.x = (31 * box);
    if (newHead.y > (22 * box)) newHead.y = 0;
    if (newHead.y < 0) newHead.y = 22 * box;


    eatTail(newHead, snake);

    snake.unshift(newHead);
}



let game = setInterval(drawGame, 150)