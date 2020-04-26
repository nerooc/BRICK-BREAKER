import {
    detectCollision
} from '/src/collisionDetection.js'

var brick = Math.floor(Math.random() * 4 + 1);


export default class Brick {
    constructor(game, position) {


        this.image = document.getElementById("img_brick" + brick);
        this.game = game;
        this.position = position;
        this.width = 80;
        this.height = 35;
        this.markedForDeletion = false;
    }

    update() {
        if (detectCollision(this.game.ball, this)) {
            this.game.ball.speed.y = -this.game.ball.speed.y;
            this.markedForDeletion = true;
        }
    }

    draw(ctx) {
        ctx.drawImage(
            this.image,
            this.position.x,
            this.position.y,
            this.width,
            this.height
        );
    }
}