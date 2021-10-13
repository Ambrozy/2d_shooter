import { Point } from '../../core/types';
import { getEnemyWorker } from './constants';

const ENEMY_RADIUS = 7;
const ENEMY_COLOR = '#ffe8e8';
const ENEMY_SPEED = 0.05;
const ENEMY_HEALTH = 8;
const ENEMY_REWARD = 300;
const ENEMY_ATTACK = 15;

export const sprinterEnemyWorker = (position: Point) =>
    getEnemyWorker(
        position,
        ENEMY_RADIUS,
        ENEMY_COLOR,
        ENEMY_SPEED,
        ENEMY_HEALTH,
        ENEMY_REWARD,
        ENEMY_ATTACK,
    );
