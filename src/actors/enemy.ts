import { Point } from '../core/game';
import { getEmptyWorker, processDead, workManager } from '../core/worker';
import { cameraMapping } from '../core/camera';
import { clipMap } from '../utils/helpers';
import { getRotationRelatedToPlayer } from '../utils/playerHelpers';
import { drawCircle, drawDonut } from '../utils/paint';
import { ENEMY_WORKER_TYPE } from './types';

export const ENEMY_RADIUS = 7;
export const ENEMY_COLOR = '#dd3d3d';
export const ENEMY_SPEED = 0.01;
export const DEAD_ENEMY_RADIUS = 4;
export const ENEMY_REWARD = 100;
export const ENEMY_ATTACK = 10;

export const enemy = (position: Point) => {
    drawCircle(position, ENEMY_RADIUS, ENEMY_COLOR);
};

export const enemyDead = (position: Point) => {
    drawDonut(position, ENEMY_RADIUS, DEAD_ENEMY_RADIUS, ENEMY_COLOR);
};

export const enemyWorker = ({ x, y }: Point) => ({
    ...getEmptyWorker(),
    type: ENEMY_WORKER_TYPE,
    deadAnimationTime: 100,
    position: {
        x,
        y,
        radius: ENEMY_RADIUS,
    },
    params: {
        reward: ENEMY_REWARD,
        attack: ENEMY_ATTACK,
    },
    render(deltaMilliseconds: number) {
        processDead(this)(deltaMilliseconds);
        if (this.isDead) {
            return enemyDead(cameraMapping(this.position));
        }

        const directRotation = getRotationRelatedToPlayer(
            this.position as Point,
        );
        const randomRotation = {
            cos: 2 * (Math.random() - 0.5),
            sin: 2 * (Math.random() - 0.5),
        };
        const rotation = Math.random() > 0.5 ? directRotation : randomRotation;

        this.position.x += -rotation.cos * deltaMilliseconds * ENEMY_SPEED;
        this.position.y += -rotation.sin * deltaMilliseconds * ENEMY_SPEED;
        ({ x: this.position.x, y: this.position.y } = clipMap(
            this.position,
            DEAD_ENEMY_RADIUS,
        ));
        enemy(cameraMapping(this.position));
    },
});

export const spawnEnemy = (spawnCoordinates: Point) => {
    workManager.add(enemyWorker(clipMap(spawnCoordinates, ENEMY_RADIUS)));
};
