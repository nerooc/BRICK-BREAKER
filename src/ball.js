import {
    detectCollision
} from '/src/collisionDetection.js'

export default class Ball {
    constructor(game) {
        this.image = document.getElementById("img_ball");

        this.gameHeight = game.gameHeight;
        this.gameWidth = game.gameWidth;

        this.game = game;

        this.speed = {
            x: 4,
            y: -4
        };

        this.position = {
            x: 10,
            y: 400
        };

        this.size = 20;
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
        } else if (this.position.y > (this.gameHeight - this.size) || this.position.y < 0) {
            this.speed.y = -this.speed.y;
        }

        if (detectCollision(this, this.game.paddle)) {
            this.speed.y = -this.speed.y;
            this.position.y = this.game.paddle.position.y - this.size;
        }
    }
}