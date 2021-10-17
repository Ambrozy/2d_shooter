import { Rotation } from '../../core/types';
import { BulletWorker, EnemyWorker, workManager } from '../../core/worker';
import { controls } from '../../core/controls';
import {
    getAngleFromRotation,
    getDistance,
    getRotationFromAngle,
    randomFromRange,
} from '../../utils/helpers';
import { BulletBuilder, getBulletWorker } from './constants';

const BULLET_LEN = 100;
const BULLET_LEN_VARIATION = 5;
const BULLET_ATTACK = 100;
const BULLET_MINIMUM_ATTACK = 5;
const BULLET_SPEED = 0.1;
const BULLET_WIDTH = 1;
const BULLET_COLOR = '#b9b9b9';
const BULLET_SPAWN_SPEED = 800; // 0.8 second
const BULLET_LIFE_TIME = 300; // 0.3 second
const BULLET_SCATTER_ANGLE = Math.PI / 6;
const BULLET_COUNT = 8;

const getDamageFunctionParams = (attackRange: number) => {
    const x0 = 20;
    const a =
        ((BULLET_ATTACK - BULLET_MINIMUM_ATTACK) * x0 * (attackRange + x0)) /
        attackRange;
    const b = BULLET_ATTACK - a / x0;

    return { a, b, x0 };
};

export const shootgunBulletWorker = (
    rotation: Rotation,
    length: number,
): BulletWorker => ({
    ...getBulletWorker(
        rotation,
        length,
        BULLET_ATTACK,
        BULLET_SPEED,
        BULLET_WIDTH,
        BULLET_COLOR,
        true,
    ),
    deadAnimationTime: BULLET_LIFE_TIME,
    isDead: true,
    params: {
        attack: BULLET_ATTACK,
        isLine: true,
        ...rotation,
        ...getDamageFunctionParams(length),
    },
    getDamage(enemy: EnemyWorker) {
        const distance = getDistance(enemy.position, this.position);

        return this.params.a / (distance + this.params.x0) + this.params.b;
    },
});

export const shootgunBulletBuilder: BulletBuilder = {
    spawnSpeed: BULLET_SPAWN_SPEED,
    spawnOnRender: false,
    spawn() {
        const angle = getAngleFromRotation(controls.mouseRotation);

        for (let i = 0; i < BULLET_COUNT; i++) {
            const nextAngle = randomFromRange(
                angle - BULLET_SCATTER_ANGLE,
                angle + BULLET_SCATTER_ANGLE,
            );
            const rotation = getRotationFromAngle(nextAngle);
            const length = randomFromRange(
                BULLET_LEN - BULLET_LEN_VARIATION,
                BULLET_LEN + BULLET_LEN_VARIATION,
            );

            workManager.add(shootgunBulletWorker(rotation, length));
        }
    },
};
