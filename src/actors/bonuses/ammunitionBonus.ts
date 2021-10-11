import { Point } from '../../core/game';
import { cameraMapping } from '../../core/camera';
import { drawCircle, drawLine } from '../../utils/paint';
import {
    BONUS_COLOR,
    BONUS_RADIUS,
    getBonusWorker,
    processExpired,
} from './constants';
import { updateAmmo } from '../../utils/statistic';

const BONUS_LINE_HEIGHT = 7;
const BONUS_LINE_WIDTH = 1;
const BONUS_LINE_COLOR = '#000f2c';
const AMMO_BONUS = 100;

export const ammunitionBonus = (position: Point) => {
    drawCircle(position, BONUS_RADIUS, BONUS_COLOR);
    drawLine(
        { x: position.x, y: position.y - BONUS_LINE_HEIGHT / 2 },
        { x: position.x, y: position.y + BONUS_LINE_HEIGHT / 2 },
        BONUS_LINE_WIDTH,
        BONUS_LINE_COLOR,
    );
};

export const ammunitionBonusWorker = (position: Point) => ({
    ...getBonusWorker(position),
    render(deltaMilliseconds: number) {
        processExpired(this)(deltaMilliseconds);
        ammunitionBonus(cameraMapping(this.position));
    },
    onBonus() {
        updateAmmo(AMMO_BONUS);
    },
});
