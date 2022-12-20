import Phaser from 'phaser';
import WebFontFile from './WebFontFile';
import { Game } from '../utils/SceneKeys'

class TitleScreen extends Phaser.Scene
{
    preload()
    {
        const fonts = new WebFontFile(this.load, 'Press Start 2P');
        this.load.addFile(fonts);
    }

    create()
    {
        const title = this.add.text(400, 200, "Pong!", {
            fontSize: 50,
            fontFamily: '"Press Start 2P"'
        });
        title.setOrigin(0.5, 0.5);

        this.add.text(400, 300, 'Press Space to Start', {
            fontFamily: '"Press Start 2P"'
        })
        .setOrigin(0.5);

        this.input.keyboard.once('keydown-SPACE', () => {
            this.scene.start(Game);
        });
    }
}

export default TitleScreen;