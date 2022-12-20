import Phaser from 'phaser';
import { GameBackground, GameOver } from '../utils/SceneKeys';

const GameState = {
    Running: 'running',
    PlayserWon: 'player-won',
    AiWon: 'ai-won'
}

class Game extends Phaser.Scene
{
    init()
    {
        this.gameState = GameState.Running;

        this.paddleRightVelocity = new Phaser.Math.Vector2(0, 0);
        this.leftScore = 0;
        this.rightScore = 0;

        this.paused = false;
    }

    create()
    {
        this.scene.run(GameBackground);
        this.scene.sendToBack(GameBackground);

        this.physics.world.setBounds(-100, 0, 1000, 500);

        this.ball = this.add.circle(400, 250, 10, 0xffffff, 1);
        this.physics.add.existing(this.ball);
        this.ball.body.setCircle(10);
        this.ball.body.setBounce(1, 1);

        this.ball.body.setCollideWorldBounds(true, 1, 1);

        this.paddleLeft = this.add.rectangle(50, 250, 15, 100, 0xffffff, 1);
        this.physics.add.existing(this.paddleLeft, true);

        this.paddleRight = this.add.rectangle(750, 250, 15, 100, 0xffffff, 1);
        this.physics.add.existing(this.paddleRight, true);

        this.physics.add.collider(this.paddleLeft, this.ball);
        this.physics.add.collider(this.paddleRight, this.ball);

        const scoreStyle = { fontSize: 48, fontFamily: '"Press Start 2P"' }
        
        this.leftScoreLabel = this.add.text(300, 50, '0', scoreStyle)
            .setOrigin(0.5, 0.5);

        this.rightScoreLabel = this.add.text(500, 50, '0', scoreStyle)
            .setOrigin(0.5, 0.5);
        
        this.cursors = this.input.keyboard.createCursorKeys();

        this.time.delayedCall(500, () => {
            this.resetBall();
        });
    }

    update()
    {
        if (this.paused || this.gameState !== GameState.Running)
        {
            return;
        }

        this.playerControl();
        this.updateAi();
        this.checkScore();
    }

    playerControl()
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

    checkScore()
    {
        const x = this.ball.x;
        const leftBounds = -30;
        const rightBounds = 830;
        const endScore = 3;

        if (x >= leftBounds && x <= rightBounds)
        {
            return
        }
        
        if (this.ball.x < leftBounds)
        {
            // scored on the left side
            this.incrementRightScore();
        }
        else if (this.ball.x > rightBounds)
        {
            // scored on the right side
            this.incrementLeftScore();
        }

        if (this.leftScore >= endScore)
        {
            this.gameState = GameState.PlayserWon;
        }
        else if (this.rightScore >= endScore)
        {
            this.gameState = GameState.AiWon;
        }

        if (this.gameState === GameState.Running)
        {
            this.resetBall();
        }
        else
        {
            this.physics.world.remove(this.ball.body);

            this.scene.stop(GameBackground);

            // pass data onto gameover screen
            this.scene.start(GameOver, { 
                leftScore: this.leftScore,
                rightScore: this.rightScore
            });
        }
    }

    updateAi()
    {
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