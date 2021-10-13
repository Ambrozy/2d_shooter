import { Point } from '../../core/types';
import { getEnemyWorker } from './constants';

const ENEMY_RADIUS = 7;
const ENEMY_COLOR = '#dd3d3d';
const ENEMY_SPEED = 0.02;
const ENEMY_HEALTH = 10;
const ENEMY_REWARD = 100;
const ENEMY_ATTACK = 10;

export const simpleEnemyWorker = (position: Point) =>
    getEnemyWorker(
        position,
        ENEMY_RADIUS,
        ENEMY_COLOR,
        ENEMY_SPEED,
        ENEMY_HEALTH,
        ENEMY_REWARD,
        ENEMY_ATTACK,
    );
