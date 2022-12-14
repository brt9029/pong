export default class Game extends Phaser.Scene
{
    preload()
    {

    }

    create()
    {
        const ball = this.add.circle(400, 250, 10, 0xffffff, 1);
        this.physics.add.existing(ball);
        ball.body.setBounce(1, 1);

        ball.body.setCollideWorldBounds(true, 1, 1);
        ball.body.setVelocity(-200, 0);

        this.paddleLeft = this.add.rectangle(50, 250, 10, 100, 0xffffff, 1);
        this.physics.add.existing(this.paddleLeft, true);
        this.physics.add.collider(this.paddleLeft, ball);

        this.cursors = this.input.keyboard.createCursorKeys();
    }

    update()
    {
        const paddleLeft = this.paddleLeft;
        if (this.cursors.up.isDown)
        {
            paddleLeft.y -= 6;
            paddleLeft.body.updateFromGameObject();
        }
        else if (this.cursors.down.isDown)
        {
            paddleLeft.y += 6;
            paddleLeft.body.updateFromGameObject();
        }
    }
}