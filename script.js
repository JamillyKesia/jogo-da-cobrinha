let canvas = document.getElementById("snake");
let context = canvas.getContext("2d");
let box = 32;
let snake = [];
snake[0] = {
    x: 8 * box,
    y: 8 * box
}
let direction = "right";
let food = {
    x: Math.floor(Math.random() * 15 + 1) * box, /*o random da um nºaleatório e o floor tira o ponto flutuante: 0.*/
    y: Math.floor(Math.random() * 15 + 1) * box
}

function criarBG() {
    context.fillStyle = "aquamarine";
    context.fillRect(0, 0 , 16 * box, 16 * box);
}

function criarCobrinha() {
    for(let i=0; i < snake.length; i++){
        context.fillStyle = "blue";
        context.fillRect(snake[i].x, snake[i].y, box, box);
    }
}

function drawFood(){
    context.fillStyle = "red";
    context.fillRect(food.x, food.y, box, box);
}

document.addEventListener('keydown', update);

function update (event) { /*a direção nao pode ser oposta */
    if(event.keyCode == 37 && direction != "right") direction = "left";
    if(event.keyCode == 38 && direction != "down") direction = 'up';
    if(event.keyCode == 39 && direction != "left") direction = "right";
    if(event.keyCode == 40 && direction != "up") direction = "down";
}

function iniciarJogo() {
    if(snake[0].x > 15 * box && direction == "right") snake [0].x = 0;
    if(snake[0].x < 0 && direction == "left") snake [0].x = 16 * box;
    if(snake[0].y > 15 * box && direction == "down") snake [0].y = 0;
    if(snake[0].y < 0 && direction == "up") snake [0].y = 16 * box;
    
    for(i = 1; i < snake.length; i++){ /*para se a combrinha "comer" ela msm o jogo acaba*/
        if(snake[0].x == snake[i].x && snake[0] == snake[i].y){
            clearInterval(jogo);
            alert("GAME OVER :(");
        }
    }

    criarBG();
    criarCobrinha();
    drawFood();

    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    /*acrescenta ou diminui um quadradinho pra dar a impressão que ela ta andando*/
    if(direction == "right") snakeX += box;
    if(direction == "left") snakeX -= box;
    if(direction == "up") snakeY -= box;
    if(direction == "down") snakeY += box;

    if(snakeX != food.x || snakeY != food.y){
        snake.pop();/*retira o último elemento do array */
    }
    else{food.x = Math.floor(Math.random() * 15 + 1) * box; /*o random da um nºaleatório e o floor tira o ponto flutuante: 0.*/
        food.y = Math.floor(Math.random() * 15 + 1) * box;
    }

    let newHead = {
        x: snakeX,
        y: snakeY
    }

    snake.unshift(newHead);/*acrescenta uma box a frente do 1º elemento*/
}

let jogo = setInterval(iniciarJogo, 100); /*a cada 100 milisegundos vai renovar pra não travar o jogo*/
