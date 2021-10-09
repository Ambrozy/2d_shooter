import { game, Point, Rotation } from '../core/game';
import { PLAYER_RADIUS, playerInstance } from './player';
import { isOutOfMap } from '../utils/helpers';
import { getEmptyWorker, working } from '../core/worker';
import { BULLET_WORKER_TYPE } from './types';
import { cameraMapping } from '../core/camera';

const BULLET_LEN = 2;
const BULLET_WIDTH = 1;
const BULLET_COLOR = '#fff';
const BULLET_SPEED = 0.5;

export interface BulletProps {
    position: Point;
    rotation: Rotation;
}

export const bullet = ({
    position: { x, y },
    rotation: { cos, sin },
}: BulletProps) => {
    game.context.beginPath();
    game.context.moveTo(x, y);
    game.context.lineTo(x + cos * BULLET_LEN, y + sin * BULLET_LEN);
    game.context.lineWidth = BULLET_WIDTH;
    game.context.strokeStyle = BULLET_COLOR;
    game.context.stroke();
};

export const bulletWorker = ({ sin, cos }: Rotation) => ({
    ...getEmptyWorker(),
    type: BULLET_WORKER_TYPE,
    position: {
        x: playerInstance.position.x + cos * PLAYER_RADIUS,
        y: playerInstance.position.y + sin * PLAYER_RADIUS,
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
            position: cameraMapping(this.position),
            rotation: this.params,
        });
    },
    removeCondition() {
        return this.isDead || isOutOfMap(this.position);
    },
});

export const spawnBullet = () => {
    working.add(bulletWorker(game.mouseRotation));
};
