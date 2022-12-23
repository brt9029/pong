import Phaser from 'phaser';
import WebFontFile from './WebFontFile';
import { Game } from '../utils/SceneKeys'
import * as AudioKeys from '../utils/AudioKeys';

class TitleScreen extends Phaser.Scene
{
    preload()
    {
        const fonts = new WebFontFile(this.load, 'Press Start 2P');
        this.load.addFile(fonts);

        this.load.audio(AudioKeys.PongBeep, 'assets/ping_pong_8bit_beeep.ogg');
        this.load.audio(AudioKeys.PongPlop, 'assets/ping_pong_8bit_plop.ogg');
    }
    create()
    {
        this.add.text(400, 200, "Pong!", {
            fontSize: 50,
            fontFamily: '"Press Start 2P"'
        })
        .setOrigin(0.5, 0.5);

        this.add.text(400, 300, 'Press Space to Start', {
            fontFamily: '"Press Start 2P"'
        })
        .setOrigin(0.5);

        this.input.keyboard.once('keydown-SPACE', () => {
            this.sound.play(AudioKeys.PongBeep);
            this.scene.start(Game);
        });
    }
}

export default TitleScreen;