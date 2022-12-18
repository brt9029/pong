export default class Game extends Phaser.Scene
{
    paddleRightVelocity = new Phaser.Math.Vector2(0, 0);

    preload()
    {

    }

    create()
    {
        this.ball = this.add.circle(400, 250, 10, 0xffffff, 1);
        this.physics.add.existing(this.ball);
        this.ball.body.setBounce(1, 1);

        this.ball.body.setCollideWorldBounds(true, 1, 1);
        this.ball.body.setVelocity(Phaser.Math.Between(-200, 200), Phaser.Math.Between(-200, 200));

        this.paddleLeft = this.add.rectangle(50, 250, 10, 100, 0xffffff, 1);
        this.physics.add.existing(this.paddleLeft, true);

        this.paddleRight = this.add.rectangle(750, 250, 10, 100, 0xffffff, 1);
        this.physics.add.existing(this.paddleRight, true);

        this.physics.add.collider(this.paddleLeft, this.ball);
        this.physics.add.collider(this.paddleRight, this.ball);

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

        const paddleRight = this.paddleRight;
        const diff = this.ball.y - this.paddleRight.y;

        if (Math.abs(diff) < 30)
        {
            return
        }

        const aiSpeed = 3;

        if (diff < 0)
        {
            // ball above the paddle
            this.paddleRightVelocity.y = -aiSpeed;
            if (this.paddleRightVelocity.y < -10)
            {
                this.paddleRightVelocity.y = -10;
            }
        }
        else if (diff > 0)
        {
            // ball is below the paddle
            this.paddleRightVelocity.y = aiSpeed;
            if (this.paddleRightVelocity.y > 10)
            {
                this.paddleRightVelocity.y = 10;
            }
        }

        paddleRight.y += this.paddleRightVelocity.y;
        paddleRight.body.updateFromGameObject();
    }
}