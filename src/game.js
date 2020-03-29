import Paddle from '/src/paddle.js';
import InputHandler from '/src/input.js';
import Ball from '/src/ball.js';
import Brick from '/src/brick.js';

import {
    buildLevel,
    level1,
    level2
} from '/src/levels.js';

const GAMESTATE = {
    PAUSED: 0,
    RUNNING: 1,
    MENU: 2,
    GAMEOVER: 3,
    NEWLEVEL: 4
};

export default class Game {
    constructor(gameWidth, gameHeight) {
        this.gameWidth = gameWidth;
        this.gameHeight = gameHeight;
        this.gamestate = GAMESTATE.MENU;
        this.paddle = new Paddle(this);
        this.ball = new Ball(this);
        this.gameObjects = [];
        this.bricks = [];
        this.lives = 3;
        this.levels = [level1, level2];
        this.currentLevel = 0;

        new InputHandler(this.paddle, this);
    }

    start() {

        if (this.gamestate == GAMESTATE.MENU || this.gamestate == GAMESTATE.NEWLEVEL || this.gamestate == GAMESTATE.GAMEOVER) {
            this.bricks = buildLevel(this, this.levels[this.currentLevel]);
            this.ball.reset();
            this.gameObjects = [this.ball, this.paddle];
            this.gamestate = GAMESTATE.RUNNING;
        } else {
            return;
        }
    }

    update(deltaTime) {
        if (this.lives === 0) this.gamestate = GAMESTATE.GAMEOVER;

        if (
            this.gamestate === GAMESTATE.PAUSED ||
            this.gamestate === GAMESTATE.MENU ||
            this.gamestate === GAMESTATE.GAMEOVER
        )
            return;

        if (this.bricks.length === 0) {
            this.bricks = buildLevel(this, this.levels[this.currentLevel]);
            this.currentLevel++;
            this.gamestate = GAMESTATE.NEWLEVEL;
            this.start();
        }

        [...this.gameObjects, ...this.bricks].forEach(object => object.update(deltaTime));
        this.bricks = this.bricks.filter(
            brick => !brick.markedForDeletion
        );
    }


    draw(ctx) {
        if (this.gamestate == GAMESTATE.RUNNING) {
            [...this.gameObjects, ...this.bricks].forEach(object => object.draw(ctx));
            ctx.rect(0, 0, this.gameWidth, this.gameHeight);
            ctx.font = '15px Arial';
            ctx.fillStyle = 'white';
            ctx.textAlign = 'center';
            ctx.fillText('Press ESC to PAUSE', 90, 30);

            ctx.rect(0, 0, this.gameWidth, this.gameHeight);
            ctx.font = '15px Arial';
            ctx.fillStyle = 'white';
            ctx.textAlign = 'center';
            ctx.fillText('LIVES: ' + this.lives, this.gameWidth - 50, 30);

        }
        if (this.gamestate == GAMESTATE.PAUSED) {
            ctx.rect(0, 0, this.gameWidth, this.gameHeight);
            ctx.fillStyle = 'rgba(0,0,0,0.5)';
            ctx.fill();
            ctx.font = '30px Arial';
            ctx.fillStyle = 'white';
            ctx.textAlign = 'center';
            ctx.fillText('PAUSED', this.gameWidth / 2, this.gameHeight / 2);
        }

        if (this.gamestate == GAMESTATE.MENU) {
            ctx.rect(0, 0, this.gameWidth, this.gameHeight);
            ctx.fillStyle = 'rgba(0,0,0,1)';
            ctx.fill();
            ctx.font = '30px Arial';
            ctx.fillStyle = 'white';
            ctx.textAlign = 'center';
            ctx.fillText(
                'PRESS SPACEBAR TO PLAY',
                this.gameWidth / 2,
                this.gameHeight / 2
            );
        }

        if (this.gamestate == GAMESTATE.GAMEOVER) {
            ctx.rect(0, 0, this.gameWidth, this.gameHeight);
            ctx.fillStyle = 'rgba(0,0,0,1)';
            ctx.fill();
            ctx.font = '30px Arial';
            ctx.fillStyle = 'white';
            ctx.textAlign = 'center';
            ctx.fillText(
                'GAME OVER',
                this.gameWidth / 2,
                this.gameHeight / 2
            );
        }
    }

    togglePause() {
        if (this.gamestate == GAMESTATE.PAUSED || this.gamestate == GAMESTATE.GAMEOVER) {
            this.gamestate = GAMESTATE.RUNNING;
        } else if (this.gamestate == GAMESTATE.RUNNING) {
            this.gamestate = GAMESTATE.PAUSED;
        }
    }


}