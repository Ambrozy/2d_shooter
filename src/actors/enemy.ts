import { game, Point } from '../core/game';
import { getEmptyWorker, workManager } from '../core/worker';
import { cameraMapping } from '../core/camera';
import { clipMap } from '../utils/helpers';
import { getRotationRelatedToPlayer } from '../utils/playerHelpers';
import { ENEMY_WORKER_TYPE } from './types';

export const ENEMY_RADIUS = 7;
export const ENEMY_COLOR = '#dd3d3d';
export const ENEMY_SPEED = 0.01;
export const DEAD_ENEMY_RADIUS = 4;
export const MIN_SPAWN_RADIUS = 300;
export const ENEMY_REWARD = 100;
export const ENEMY_ATTACK = 10;

export const enemy = ({ x, y }: Point) => {
    game.context.beginPath();
    game.context.arc(x, y, ENEMY_RADIUS, 0, 2 * Math.PI, false);
    game.context.fillStyle = ENEMY_COLOR;
    game.context.fill();
};

export const enemyDead = ({ x, y }: Point) => {
    game.context.beginPath();
    game.context.arc(x, y, ENEMY_RADIUS, 0, 2 * Math.PI, false);
    game.context.arc(x, y, DEAD_ENEMY_RADIUS, 0, 2 * Math.PI, true);
    game.context.fillStyle = ENEMY_COLOR;
    game.context.fill();
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
        if (this.isDead) {
            this.deadTime += deltaMilliseconds;

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
