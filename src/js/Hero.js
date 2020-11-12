import {Texture, AnimatedSprite, Loader, utils} from 'pixi.js';
import gsap from './gsap.min';
import Main from "../Main";

export default class Hero extends AnimatedSprite{
    constructor() {
        super([Texture.EMPTY]);
        Loader.shared.add('hero', './assets/hero.json')
            .load(() => {
                for (let i = 0; i < 25; i++) {
                    this.textures.push(utils.TextureCache['hero-' + i]);
                }
                this.textures.shift();
                this.stopFrame = this.textures.pop();
                this.texture = this.stopFrame;
                this.ready = true;
            })
        this.anchor.set(0.5);
        this.position.set(100, Main.height * 0.5);
    }

    goTo(xy) {
        if (!this.ready) return;
        this.ready = false;
        let newX = 100;
        if (this.x < Main.width*0.5) {
            newX = Main.width - 100;
            this.scale.x = 1;
        } else {
            this.scale.x = -1;
        }
        this.animationSpeed = 0.8
        gsap.to(this, {animationSpeed:0.15, x:newX, duration:3.5, ease:'power2.out',
            onStart: ()=> {
                this.gotoAndPlay(21);
            },
            onComplete: ()=> {
                this.stop();
                this.texture = this.stopFrame;
                this.ready = true;
            }
        });
    }
}