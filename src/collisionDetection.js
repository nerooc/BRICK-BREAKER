export function detectCollisionVertical(ball, gameObject) {
    //check collision with paddle
    let topOfBall = ball.position.y;
    let bottomOfBall = ball.position.y + ball.size;
    
    let topOfObject = gameObject.position.y;
    let bottomOfObject = gameObject.position.y + gameObject.height;

    let leftOfBall = ball.position.x;
    let rightOfBall = ball.position.x + ball.size;

    let leftSideOfObject = gameObject.position.x;
    let rightSideOfObject = gameObject.position.x + gameObject.width;

    if ((bottomOfBall >= topOfObject) && (topOfBall <= bottomOfObject) && (rightOfBall >= leftSideOfObject) && (leftOfBall <= rightSideOfObject)) {
        return true;

    } else {
        return false;
    }
}

export function detectCollisionHorizontal(ball, gameObject) {
    //I still have to fix that, so the game differentiates Horizontal and Vertical collisions, as it doesn't at the moment.
    let topOfBall = ball.position.y;
    let bottomOfBall = ball.position.y + ball.size;
    
    let topOfObject = gameObject.position.y;
    let bottomOfObject = gameObject.position.y + gameObject.height;

    let leftOfBall = ball.position.x;
    let rightOfBall = ball.position.x + ball.size;

    let leftSideOfObject = gameObject.position.x;
    let rightSideOfObject = gameObject.position.x + gameObject.width;
    
    
    if ((rightOfBall >= leftSideOfObject) && (leftOfBall <= rightSideOfObject) && (bottomOfBall >= topOfObject) && (topOfBall <= bottomOfObject)) {
        return true;

    } else {
        return false;
    }

} 