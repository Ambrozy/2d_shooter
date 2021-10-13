import { BULLET_WORKER_TYPE } from '../types';
import { cameraMapping } from '../../core/camera';
import { Point } from '../../core/types';
import { getEmptyWorker, processDead, workManager } from '../../core/worker';
import { drawCircle } from '../../utils/paint';
import { BONUS_COLOR, BONUS_RADIUS, getBonusWorker } from './constants';

const BOMB_IMAGE_RADIUS = 2;
const BOMB_IMAGE_COLOR = '#ecd857';
const BOMB_IMAGE_OFFSET = 3;
const EXPLOSION_RADIUS = 100;
const EXPLOSION_COLOR = '#625d2a';
const BOMB_ATTACK = 1000;

const sqrt2 = Math.sqrt(2);

export const bombBonus = (position: Point) => {
    const sideOffset = BOMB_IMAGE_OFFSET / sqrt2;

    drawCircle(position, BONUS_RADIUS, BONUS_COLOR);
    drawCircle(
        { x: position.x, y: position.y + BOMB_IMAGE_OFFSET },
        BOMB_IMAGE_RADIUS,
        BOMB_IMAGE_COLOR,
    );
    drawCircle(
        { x: position.x + sideOffset, y: position.y - sideOffset },
        BOMB_IMAGE_RADIUS,
        BOMB_IMAGE_COLOR,
    );
    drawCircle(
        { x: position.x - sideOffset, y: position.y - sideOffset },
        BOMB_IMAGE_RADIUS,
        BOMB_IMAGE_COLOR,
    );
};

export const explosion = (position: Point) => {
    drawCircle(position, EXPLOSION_RADIUS, EXPLOSION_COLOR);
};

export const explosionWorker = ({ x, y }: Point) => ({
    ...getEmptyWorker(),
    type: BULLET_WORKER_TYPE,
    deadAnimationTime: 100,
    isDead: true,
    position: { x, y, radius: EXPLOSION_RADIUS },
    params: { attack: BOMB_ATTACK },
    render(deltaMilliseconds: number) {
        processDead(this)(deltaMilliseconds);
        explosion(cameraMapping(this.position));
    },
});

export const bombBonusWorker = (position: Point) => ({
    ...getBonusWorker(position, bombBonus),
    onBonus() {
        workManager.add(explosionWorker(this.position));
    },
});
