import { Rotation } from '../../core/types';
import { BulletWorker, workManager } from '../../core/worker';
import { controls } from '../../core/controls';
import { BulletBuilder, getBulletWorker } from './constants';

const BULLET_LEN = 2;
const BULLET_ATTACK = 10;
const BULLET_SPEED = 0.5;
const BULLET_WIDTH = 1;
const BULLET_COLOR = '#fff';
const BULLET_SPAWN_SPEED = 300; // 0.3 second

export const pistolBulletWorker = (rotation: Rotation): BulletWorker =>
    getBulletWorker(
        rotation,
        BULLET_LEN,
        BULLET_ATTACK,
        BULLET_SPEED,
        BULLET_WIDTH,
        BULLET_COLOR,
        false,
    );

export const pistolBulletBuilder: BulletBuilder = {
    spawnSpeed: BULLET_SPAWN_SPEED,
    spawnOnRender: false,
    spawn() {
        workManager.add(pistolBulletWorker(controls.mouseRotation));
    },
};
