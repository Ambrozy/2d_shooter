import { Rotation } from '../../core/types';
import { BulletWorker, workManager } from '../../core/worker';
import { controls } from '../../core/controls';
import { BulletBuilder, getBulletWorker } from './constants';

const BULLET_LEN = 13;
const BULLET_ATTACK = 7;
const BULLET_SPEED = 0.8;
const BULLET_WIDTH = 1;
const BULLET_COLOR = '#fff';
const BULLET_SPAWN_SPEED = 50; // 0.05 second

export const minigunBulletWorker = (rotation: Rotation): BulletWorker =>
    getBulletWorker(
        rotation,
        BULLET_LEN,
        BULLET_ATTACK,
        BULLET_SPEED,
        BULLET_WIDTH,
        BULLET_COLOR,
        true,
    );

export const minigunBulletBuilder: BulletBuilder = {
    spawnSpeed: BULLET_SPAWN_SPEED,
    spawnOnRender: true,
    spawn() {
        workManager.add(minigunBulletWorker(controls.mouseRotation));
    },
};
