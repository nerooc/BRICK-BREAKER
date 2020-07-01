import { detectCollisionHorizontal, detectCollisionVertical } from '/src/collisionDetection.js';

function randomFloat(min, max) {
    return min + (max - min) * Math.random();
}

export default class Ball {
    constructor(game) {
        this.image = document.getElementById("img_ball");

        this.gameHeight = game.gameHeight;
        this.gameWidth = game.gameWidth;

        this.game = game;

        this.size = 20;

        this.reset();
    }

    reset() {
        this.speed = {
            x: 5,
            y: -5
        };

        this.position = {
            x: 10,
            y: 400
        };
    }

    draw(ctx) {
        ctx.drawImage(this.image, this.position.x, this.position.y, this.size, this.size);
    }

    update(deltaTime) {

        this.position.x += this.speed.x;
        this.position.y += this.speed.y;


        // wall on left or right
        if (this.position.x < 0 || this.position.x > (this.gameWidth - this.size)) {
            this.speed.x = -this.speed.x;

            // wall on top or bottom
        } else if (this.position.y < 0) {
            this.speed.y = -this.speed.y;
        }

        // bottom

        if (this.position.y + this.size > this.gameHeight) {
            this.game.lives--;
            this.reset();
        }

        if (detectCollisionVertical(this, this.game.paddle)) {
            this.speed.y = -this.speed.y;
            this.position.y = this.game.paddle.position.y - this.size;
        }

        else if(detectCollisionHorizontal(this, this.game.paddle)){
            this.speed.x = -this.speed.x;
            this.position.x = this.game.paddle.position.x - this.size;
        }
    }
}