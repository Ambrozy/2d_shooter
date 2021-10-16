import { Point } from '../../core/types';
import { game } from '../../core/game';
import { TELEKINESIS_BONUS } from '../../core/bonusManager';
import { drawCircle, drawLine, drawTriangle } from '../../utils/paint';
import { BONUS_COLOR, BONUS_RADIUS, getBonusWorker } from './constants';

const BONUS_LINE_HEIGHT = 7;
const BONUS_LINE_WIDTH = 2;
const BONUS_LINE_COLOR = '#ffcc00';
const BONUS_TIME_LIMIT = 30000; // 30 seconds

export const telekinesisBonus = (position: Point) => {
    drawCircle(position, BONUS_RADIUS, BONUS_COLOR);
    drawLine(
        { x: position.x, y: position.y - BONUS_LINE_HEIGHT / 2 },
        { x: position.x, y: position.y + BONUS_LINE_HEIGHT / 2 },
        BONUS_LINE_WIDTH,
        BONUS_LINE_COLOR,
    );
    drawTriangle(
        { x: position.x, y: position.y - BONUS_LINE_HEIGHT / 2 },
        {
            x: position.x - 2 * BONUS_LINE_WIDTH,
            y: position.y - BONUS_LINE_HEIGHT / 4,
        },
        {
            x: position.x + 2 * BONUS_LINE_WIDTH,
            y: position.y - BONUS_LINE_HEIGHT / 4,
        },
        BONUS_LINE_COLOR,
    );
};

export const telekinesisBonusWorker = (position: Point) => ({
    ...getBonusWorker(position, telekinesisBonus),
    onBonus() {
        game.temporaryBonusManager.addBonus(
            TELEKINESIS_BONUS,
            1,
            BONUS_TIME_LIMIT,
        );
    },
});
