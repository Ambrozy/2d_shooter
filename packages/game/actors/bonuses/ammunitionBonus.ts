import { Point } from '../../core/types';
import { game } from '../../core/game';
import { playerGun } from '../bullets/playerGun';
import { drawCircle, drawLine } from '../../utils/paint';
import {
    ammoBonusMap,
    BONUS_COLOR,
    BONUS_RADIUS,
    getBonusWorker,
} from './constants';

const BONUS_LINE_HEIGHT = 7;
const BONUS_LINE_WIDTH = 1;
const BONUS_LINE_COLOR = '#000f2c';

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
    ...getBonusWorker(position, ammunitionBonus),
    onBonus() {
        game.updateAmmo(ammoBonusMap[playerGun.gunName]);
    },
});
