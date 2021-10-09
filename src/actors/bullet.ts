import { game } from '../core/game';
import { PLAYER_RADIUS } from './player';
import { isOutOfCanvas } from '../utils/helpers';
import { getEmptyWorker, working } from '../core/worker';
import { BULLET_WORKER_TYPE } from './types';

const BULLET_LEN = 2;
const BULLET_WIDTH = 1;
const BULLET_COLOR = '#fff';
const BULLET_SPEED = 0.5;

export interface BulletWorkerProps {
    sin: number;
    cos: number;
}

export interface BulletProps extends BulletWorkerProps {
    x: number;
    y: number;
}

export const bullet = ({ x, y, cos, sin }: BulletProps) => {
    game.context.beginPath();
    game.context.moveTo(x, y);
    game.context.lineTo(x + cos * BULLET_LEN, y + sin * BULLET_LEN);
    game.context.lineWidth = BULLET_WIDTH;
    game.context.strokeStyle = BULLET_COLOR;
    game.context.stroke();
};

const emptyWorker = getEmptyWorker();

export const bulletWorker = ({ sin, cos }: BulletWorkerProps) => ({
    ...emptyWorker,
    type: BULLET_WORKER_TYPE,
    position: {
        x: game.center.x + cos * PLAYER_RADIUS,
        y: game.center.y + sin * PLAYER_RADIUS,
        radius: BULLET_LEN,
    },
    params: {
        sin,
        cos,
    },
    render(deltaMilliseconds: number) {
        this.position.x += this.params.cos * deltaMilliseconds * BULLET_SPEED;
        this.position.y += this.params.sin * deltaMilliseconds * BULLET_SPEED;
        bullet({
            x: this.position.x,
            y: this.position.y,
            sin: this.params.sin,
            cos: this.params.cos,
        });
    },
    removeCondition() {
        return this.isDead || isOutOfCanvas(this.position);
    },
});

export const spawnBullet = () => {
    working.add(bulletWorker(game.mouseRotation));
};
