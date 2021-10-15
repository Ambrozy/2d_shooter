import { game } from '../../core/game';
import { controls, MOUSE_LEFT_BUTTON } from '../../core/controls';
import {
    BulletBuilder,
    GUN_MINIGUN,
    GUN_PISTOL,
    GUN_SHOOTGUN,
    GunName,
} from './constants';
import { pistolBulletBuilder } from './pistol';
import { minigunBulletBuilder } from './minigun';
import { shootgunBulletBuilder } from './shootgun';

export interface PlayerGun {
    readonly lastShotTime: number;
    readonly bulletBuilder: BulletBuilder;
    readonly setGun: (gunName: GunName) => void;
    readonly render: (deltaMilliseconds: number) => void;
    readonly shot: () => void;
}

const gunMap: Record<GunName, BulletBuilder> = {
    [GUN_PISTOL]: pistolBulletBuilder,
    [GUN_MINIGUN]: minigunBulletBuilder,
    [GUN_SHOOTGUN]: shootgunBulletBuilder,
};

export const playerGun: PlayerGun = {
    lastShotTime: Infinity,
    bulletBuilder: shootgunBulletBuilder,
    setGun(gunName: GunName) {
        this.bulletBuilder = gunMap[gunName];
    },
    render(deltaMilliseconds: number) {
        this.lastShotTime += deltaMilliseconds;

        if (
            this.bulletBuilder.spawnOnRender &&
            controls.pressedKeys.has(MOUSE_LEFT_BUTTON)
        ) {
            this.shot();
        }
    },
    shot() {
        if (
            game.ammunition > 0 &&
            this.lastShotTime > this.bulletBuilder.spawnSpeed
        ) {
            this.bulletBuilder.spawn();
            game.updateAmmo(-1);
            this.lastShotTime = 0;
        }
    },
};
