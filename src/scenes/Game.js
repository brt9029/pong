export default class Game extends Phaser.Scene
{
    preload()
    {

    }

    create()
    {
        const ball = this.add.circle(400, 250, 10, 0xffffff, 1);
        this.physics.add.existing(ball);

        ball.body.setCollideWorldBounds(true, 1, 1);
        ball.body.setVelocity(200, 200);
    }
}