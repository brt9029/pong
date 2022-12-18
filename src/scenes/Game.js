import Phaser from 'phaser';
import WebFontFile from './WebFontFile';

class Game extends Phaser.Scene
{
    init()
    {
        this.paddleRightVelocity = new Phaser.Math.Vector2(0, 0);
        this.leftScore = 0;
        this.rightScore = 0;
    }

    preload()
    {
        const fonts = new WebFontFile(this.load, 'Press Start 2P');
        this.load.addFile(fonts);
    }

    create()
    {
        this.physics.world.setBounds(-100, 0, 1000, 500);

        this.ball = this.add.circle(400, 250, 10, 0xffffff, 1);
        this.physics.add.existing(this.ball);
        this.ball.body.setBounce(1, 1);

        this.ball.body.setCollideWorldBounds(true, 1, 1);

        this.resetBall();

        this.paddleLeft = this.add.rectangle(50, 250, 10, 100, 0xffffff, 1);
        this.physics.add.existing(this.paddleLeft, true);

        this.paddleRight = this.add.rectangle(750, 250, 10, 100, 0xffffff, 1);
        this.physics.add.existing(this.paddleRight, true);

        this.physics.add.collider(this.paddleLeft, this.ball);
        this.physics.add.collider(this.paddleRight, this.ball);

        const scoreStyle = { fontSize: 48, fontFamily: '"Press Start 2P"' }
        
        this.leftScoreLabel = this.add.text(300, 50, '0', scoreStyle)
            .setOrigin(0.5, 0.5);

        this.rightScoreLabel = this.add.text(500, 50, '0', scoreStyle)
            .setOrigin(0.5, 0.5);
        
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

        if (this.ball.x < -30)
        {
            // scored on the left side
            this.resetBall();
            this.incrementLeftScore();
        }
        else if (this.ball.x > 830)
        {
            // scored on the right side
            this.resetBall();
            this.incrementRightScore();
        }
    }

    incrementLeftScore()
    {
        this.leftScore++;
        this.leftScoreLabel.text = this.leftScore;
    }

    incrementRightScore()
    {
        this.rightScore++;
        this.rightScoreLabel.text = this.rightScore;
    }

    resetBall()
    {
        this.ball.setPosition(400, 250);
        
        const angle = Phaser.Math.Between(0, 360);
        const vector = this.physics.velocityFromAngle(angle, 200);

        this.ball.body.setVelocity(vector.x, vector.y);
    }
}

export default Game;