export default class Ball {
    constructor(game) {
        this.image = document.getElementById("img_ball");

        this.gameHeight = game.gameHeight;
        this.gameWidth = game.gameWidth;

        this.speed = {
            x: 4,
            y: 4
        };

        this.position = {
            x: 10,
            y: 10
        };

        this.size = 20;
    }

    draw(ctx) {
        ctx.drawImage(this.image, this.position.x, this.position.y, this.size, this.size);
    }

    update(deltaTime) {
        this.position.x += this.speed.x;
        this.position.y += this.speed.y;

        if (this.position.x < 0 || this.position.x > (this.gameWidth - this.size)) {
            this.speed.x = -this.speed.x;
        } else if (this.position.y > (this.gameHeight - this.size) || this.position.y < 0) {
            this.speed.y = -this.speed.y;
        }

    }
}