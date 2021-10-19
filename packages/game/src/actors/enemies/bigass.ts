import { Point } from '../../core/types';
import { getEnemyWorker } from './constants';

const ENEMY_RADIUS = 10;
const ENEMY_COLOR = '#9b1111';
const ENEMY_SPEED = 0.01;
const ENEMY_HEALTH = 100;
const ENEMY_REWARD = 300;
const ENEMY_ATTACK = 25;
const ENEMY_ATTACK_DELAY = 1200; // 1.2 second

export const bigassEnemyWorker = (position: Point) =>
    getEnemyWorker(
        position,
        ENEMY_RADIUS,
        ENEMY_COLOR,
        ENEMY_SPEED,
        ENEMY_HEALTH,
        ENEMY_REWARD,
        ENEMY_ATTACK,
        ENEMY_ATTACK_DELAY,
    );
