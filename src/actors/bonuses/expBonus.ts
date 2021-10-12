import { Point } from '../../core/types';
import { game } from '../../core/game';
import { EXP_SPEED_BONUS } from '../../core/bonusManager';
import { drawCircle, drawText } from '../../utils/paint';
import { BONUS_COLOR, BONUS_RADIUS, getBonusWorker } from './constants';

const EXP_COLOR = '#def6f2';
const EXP_TEXT_HEIGHT = 10;
const EXP_BONUS_VALUE = 2;

export const expBonus = (position: Point) => {
    drawCircle(position, BONUS_RADIUS, BONUS_COLOR);
    drawText('x2', position, EXP_TEXT_HEIGHT, EXP_COLOR);
};

export const expBonusWorker = (position: Point) => ({
    ...getBonusWorker(position, expBonus),
    onBonus() {
        game.temporaryBonusManager.addBonus(EXP_SPEED_BONUS, EXP_BONUS_VALUE);
    },
});
