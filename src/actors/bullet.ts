import { game, Point, Rotation } from '../core/game';
import { getPlayerInstance, PLAYER_RADIUS } from './player';
import { isOutOfMap } from '../utils/helpers';
import { getEmptyWorker, workManager } from '../core/worker';
import { BULLET_WORKER_TYPE } from './types';
import { cameraMapping } from '../core/camera';
import { drawLine } from '../utils/paint';

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
    drawLine(
        { x, y },
        { x: x + cos * BULLET_LEN, y: y + sin * BULLET_LEN },
        BULLET_WIDTH,
        BULLET_COLOR,
    );
};

export const bulletWorker = ({ sin, cos }: Rotation) => ({
    ...getEmptyWorker(),
    type: BULLET_WORKER_TYPE,
    position: {
        x: getPlayerInstance().position.x + cos * PLAYER_RADIUS,
        y: getPlayerInstance().position.y + sin * PLAYER_RADIUS,
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
    workManager.add(bulletWorker(game.mouseRotation));
};
