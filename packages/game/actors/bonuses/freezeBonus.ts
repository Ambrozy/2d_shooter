import { Point, FREEZE_BONUS } from '../../core/types';
import { game } from '../../core/game';
import { drawCircle, drawTriangle } from '../../utils/paint';
import { BONUS_COLOR, BONUS_RADIUS, getBonusWorker } from './constants';

const FREEZE_RADIUS = 8;
const FREEZE_COLOR = '#113d6c';

export const freezeBonus = (position: Point) => {
    drawCircle(position, BONUS_RADIUS, BONUS_COLOR);
    drawTriangle(
        { x: position.x, y: position.y - FREEZE_RADIUS / 2 },
        {
            x: position.x - FREEZE_RADIUS / 2,
            y: position.y + FREEZE_RADIUS / 2,
        },
        {
            x: position.x + FREEZE_RADIUS / 2,
            y: position.y + FREEZE_RADIUS / 2,
        },
        FREEZE_COLOR,
    );
    drawTriangle(
        { x: position.x, y: position.y + FREEZE_RADIUS / 2 },
        {
            x: position.x - FREEZE_RADIUS / 2,
            y: position.y - FREEZE_RADIUS / 2,
        },
        {
            x: position.x + FREEZE_RADIUS / 2,
            y: position.y - FREEZE_RADIUS / 2,
        },
        FREEZE_COLOR,
    );
};

export const freezeBonusWorker = (position: Point) => ({
    ...getBonusWorker(position, freezeBonus),
    onBonus() {
        game.addBonus(FREEZE_BONUS);
    },
});
