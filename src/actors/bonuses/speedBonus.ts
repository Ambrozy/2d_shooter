import { Point } from '../../core/types';
import { game } from '../../core/game';
import { SPEED_BONUS } from '../../core/bonusManager';
import { drawCircle, drawText } from '../../utils/paint';
import { BONUS_COLOR, BONUS_RADIUS, getBonusWorker } from './constants';

const SPEED_TEXT_HEIGHT = 10;
const SPEED_COLOR = '#def6f2';
const SPEED_BONUS_VALUE = 2;

export const speedBonus = (position: Point) => {
    drawCircle(position, BONUS_RADIUS, BONUS_COLOR);
    drawText('Sp', position, SPEED_TEXT_HEIGHT, SPEED_COLOR);
};

export const speedBonusWorker = (position: Point) => ({
    ...getBonusWorker(position, speedBonus),
    onBonus() {
        game.temporaryBonusManager.addBonus(SPEED_BONUS, SPEED_BONUS_VALUE);
    },
});
