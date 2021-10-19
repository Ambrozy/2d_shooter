import { Point } from '../../core/types';
import { getEnemyWorker } from './constants';
import { workManager } from '../../core/worker';

const ENEMY_RADIUS = 7;
const ENEMY_COLOR = '#c83ddd';
const ENEMY_SPEED = 0.02;
const ENEMY_HEALTH = 30;
const ENEMY_REWARD = 200;
const ENEMY_ATTACK = 10;
const ENEMY_ATTACK_DELAY = 800; // 0.8 second

const CHILDREN_RADIUS = 5;
const CHILDREN_COLOR = ENEMY_COLOR;
const CHILDREN_SPEED = 0.03;
const CHILDREN_HEALTH = 10;
const CHILDREN_REWARD = 100;
const CHILDREN_ATTACK = 3;
const CHILDREN_ATTACK_DELAY = 150; // 0.15 second

export const puffChildrenEnemyWorker = (position: Point) =>
    getEnemyWorker(
        position,
        CHILDREN_RADIUS,
        CHILDREN_COLOR,
        CHILDREN_SPEED,
        CHILDREN_HEALTH,
        CHILDREN_REWARD,
        CHILDREN_ATTACK,
        CHILDREN_ATTACK_DELAY,
    );

export const puffEnemyWorker = (position: Point) => ({
    ...getEnemyWorker(
        position,
        ENEMY_RADIUS,
        ENEMY_COLOR,
        ENEMY_SPEED,
        ENEMY_HEALTH,
        ENEMY_REWARD,
        ENEMY_ATTACK,
        ENEMY_ATTACK_DELAY,
    ),
    onDead() {
        workManager.add(
            puffChildrenEnemyWorker({
                x: this.position.x - ENEMY_RADIUS / 2,
                y: this.position.y - ENEMY_RADIUS / 2,
            }),
        );
        workManager.add(
            puffChildrenEnemyWorker({
                x: this.position.x + ENEMY_RADIUS / 2,
                y: this.position.y + ENEMY_RADIUS / 2,
            }),
        );
    },
});
