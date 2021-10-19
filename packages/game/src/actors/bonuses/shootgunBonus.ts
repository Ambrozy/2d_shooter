import { Point } from '../../core/types';
import { drawCircle, drawText } from '../../utils/paint';
import {
    ammoBonusMap,
    BONUS_COLOR,
    BONUS_RADIUS,
    getBonusWorker,
} from './constants';
import { game } from '../../core/game';
import { playerGun } from '../bullets/playerGun';
import { GUN_SHOOTGUN } from '../bullets/constants';

const SHOOTGUN_TEXT_HEIGHT = 10;
const SHOOTGUN_COLOR = '#ffffff';

export const shootgunBonus = (position: Point) => {
    drawCircle(position, BONUS_RADIUS, BONUS_COLOR);
    drawText('=', position, SHOOTGUN_TEXT_HEIGHT, SHOOTGUN_COLOR);
};

export const shootgunBonusWorker = (position: Point) => ({
    ...getBonusWorker(position, shootgunBonus),
    onBonus() {
        game.updateAmmo(ammoBonusMap[GUN_SHOOTGUN]);
        playerGun.setGun(GUN_SHOOTGUN);
    },
});
