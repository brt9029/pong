import Phaser from 'phaser'
import { TitleScreen } from '../utils/SceneKeys'

class GameOver extends Phaser.Scene
{
    create(data)
    {
        let titleText = 'Game Over';
        if (data.leftScore > data.rightScore)
        {
            titleText = 'You Win';
        }

        this.add.text(400, 200, titleText, {
            fontSize: 38,
            fontFamily: '"Press Start 2P"'
        })
        .setOrigin(0.5);

        this.add.text(400, 300, 'Press Space to Continue', {
            fontFamily: '"Press Start 2P"'
        })
        .setOrigin(0.5);

        this.input.keyboard.once('keydown-SPACE', () => {
            this.scene.start(TitleScreen);
        });
    }
}

export default GameOver