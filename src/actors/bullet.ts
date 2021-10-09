import { game } from '../core/game';
import { PLAYER_RADIUS } from './player';
import { isOutOfCanvas } from '../utils/helpers';

const BULLET_LEN = 2;
const BULLET_WIDTH = 1;
const BULLET_COLOR = '#fff';
const BULLET_SPEED = 0.1;

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

export const bulletWorker = ({ sin, cos }: BulletWorkerProps) => ({
    params: {
        sin,
        cos,
        x: game.center.x + cos * PLAYER_RADIUS,
        y: game.center.y + sin * PLAYER_RADIUS,
    },
    render(deltaMilliseconds: number) {
        this.params.x += this.params.cos * deltaMilliseconds * BULLET_SPEED;
        this.params.y += this.params.sin * deltaMilliseconds * BULLET_SPEED;
        bullet(this.params);
    },
    removeCondition() {
        return isOutOfCanvas(this.params.x, this.params.y);
    },
});
