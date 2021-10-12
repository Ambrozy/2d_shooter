import { Point } from '../../core/types';
import { game } from '../../core/game';
import { drawCircle, drawTriangle } from '../../utils/paint';
import { BONUS_COLOR, BONUS_RADIUS, getBonusWorker } from './constants';

const HEALTH_RADIUS = 6;
const HEALTH_COLOR = '#f87676';
const HEALTH_BONUS = 50;

export const healthBonus = (position: Point) => {
    drawCircle(position, BONUS_RADIUS, BONUS_COLOR);
    drawCircle(
        { x: position.x - HEALTH_RADIUS / 2, y: position.y },
        HEALTH_RADIUS / 2,
        HEALTH_COLOR,
    );
    drawCircle(
        { x: position.x + HEALTH_RADIUS / 2, y: position.y },
        HEALTH_RADIUS / 2,
        HEALTH_COLOR,
    );
    drawTriangle(
        { x: position.x, y: position.y + HEALTH_RADIUS },
        { x: position.x - HEALTH_RADIUS, y: position.y },
        { x: position.x + HEALTH_RADIUS, y: position.y },
        HEALTH_COLOR,
    );
};

export const healthBonusWorker = (position: Point) => ({
    ...getBonusWorker(position, healthBonus),
    onBonus() {
        game.updateHealth(HEALTH_BONUS);
    },
});
