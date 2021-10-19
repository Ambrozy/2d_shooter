import { Point, UNTOUCHABLE_BONUS } from '../../core/types';
import { game } from '../../core/game';
import { drawCircle, drawText } from '../../utils/paint';
import { BONUS_COLOR, BONUS_RADIUS, getBonusWorker } from './constants';

const UNTOUCHABLE_TEXT_HEIGHT = 10;
const UNTOUCHABLE_COLOR = '#a8cb96';

export const untouchableBonus = (position: Point) => {
    drawCircle(position, BONUS_RADIUS, BONUS_COLOR);
    drawText('U', position, UNTOUCHABLE_TEXT_HEIGHT, UNTOUCHABLE_COLOR);
};

export const untouchableBonusWorker = (position: Point) => ({
    ...getBonusWorker(position, untouchableBonus),
    onBonus() {
        game.addBonus(UNTOUCHABLE_BONUS);
    },
});
