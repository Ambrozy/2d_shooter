import { Point } from '../../core/types';
import { getDistance } from '../../utils/helpers';
import { getDirectToPlayerDelta, getEnemyWorker } from './constants';
import { getPlayerInstance } from '../player';

const ENEMY_RADIUS = 5;
const ENEMY_COLOR = '#383838';
const ENEMY_SPEED = 0.05;
const ENEMY_HEALTH = 30;
const ENEMY_REWARD = 200;
const ENEMY_ATTACK = 8;
const ENEMY_ATTACK_DELAY = 500; // 0.5 second

const MOVE_TIME = 1000;
const DELAY_TIME = 3500;
const RANDOM_TIME = 300;
const ATTACK_DISTANCE = 50;

const DELAY_STATE = 'DELAY_STATE';
const MOVE_STATE = 'MOVE_STATE';

export const ninjaEnemyWorker = (initialPosition: Point) => ({
    ...getEnemyWorker(
        initialPosition,
        ENEMY_RADIUS,
        ENEMY_COLOR,
        ENEMY_SPEED,
        ENEMY_HEALTH,
        ENEMY_REWARD,
        ENEMY_ATTACK,
        ENEMY_ATTACK_DELAY,
        {
            state: MOVE_STATE,
            expiredTime: 0,
        },
    ),
    __getNextPosition(position: Point, deltaMilliseconds: number) {
        const randomTime = 2 * (Math.random() - 0.5) * RANDOM_TIME;

        this.params.expiredTime += deltaMilliseconds;
        if (
            this.params.state === MOVE_STATE &&
            this.params.expiredTime > MOVE_TIME + randomTime
        ) {
            this.params.expiredTime = 0;
            this.params.state = DELAY_STATE;
        } else if (
            this.params.state === DELAY_STATE &&
            this.params.expiredTime > DELAY_TIME + randomTime
        ) {
            this.params.expiredTime = 0;
            this.params.state = MOVE_STATE;
        }

        const playerPosition = getPlayerInstance().position;
        const distance = getDistance(position, playerPosition);
        const isClose = distance <= ATTACK_DISTANCE;

        if (this.params.state === DELAY_STATE && !isClose) {
            return position;
        }

        const delta = getDirectToPlayerDelta(position, !isClose);

        return {
            x: position.x + delta.x * deltaMilliseconds * ENEMY_SPEED,
            y: position.y + delta.y * deltaMilliseconds * ENEMY_SPEED,
        };
    },
});
