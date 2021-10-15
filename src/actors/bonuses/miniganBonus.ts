import { Point } from '../../core/types';
import { drawCircle, drawLine } from '../../utils/paint';
import {
    ammoBonusMap,
    BONUS_COLOR,
    BONUS_RADIUS,
    getBonusWorker,
} from './constants';
import { game } from '../../core/game';
import { playerGun } from '../bullets/playerGun';
import { GUN_MINIGUN } from '../bullets/constants';

const BONUS_LINE_HEIGHT = 7;
const BONUS_LINE_OFFSET = 3;
const BONUS_LINE_WIDTH = 1;
const BONUS_LINE_COLOR = '#ff0000';

export const minigunBonus = (position: Point) => {
    drawCircle(position, BONUS_RADIUS, BONUS_COLOR);
    drawLine(
        { x: position.x, y: position.y - BONUS_LINE_HEIGHT / 2 },
        { x: position.x, y: position.y + BONUS_LINE_HEIGHT / 2 },
        BONUS_LINE_WIDTH,
        BONUS_LINE_COLOR,
    );
    drawLine(
        {
            x: position.x - BONUS_LINE_OFFSET,
            y: position.y - BONUS_LINE_HEIGHT / 2,
        },
        {
            x: position.x - BONUS_LINE_OFFSET,
            y: position.y + BONUS_LINE_HEIGHT / 2,
        },
        BONUS_LINE_WIDTH,
        BONUS_LINE_COLOR,
    );
    drawLine(
        {
            x: position.x + BONUS_LINE_OFFSET,
            y: position.y - BONUS_LINE_HEIGHT / 2,
        },
        {
            x: position.x + BONUS_LINE_OFFSET,
            y: position.y + BONUS_LINE_HEIGHT / 2,
        },
        BONUS_LINE_WIDTH,
        BONUS_LINE_COLOR,
    );
};

export const minigunBonusWorker = (position: Point) => ({
    ...getBonusWorker(position, minigunBonus),
    onBonus() {
        game.updateAmmo(ammoBonusMap[GUN_MINIGUN]);
        playerGun.setGun(GUN_MINIGUN);
    },
});
