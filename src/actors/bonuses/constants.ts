import { Point } from '../../core/types';
import { cameraMapping } from '../../core/camera';
import { BonusWorker, getEmptyWorker, processDead } from '../../core/worker';
import {
    GUN_MINIGUN,
    GUN_PISTOL,
    GUN_SHOOTGUN,
    GunName,
} from '../bullets/constants';
import { BONUS_WORKER_TYPE } from '../types';

export const BONUS_RADIUS = 9;
export const BONUS_COLOR = '#5086da';
export const BONUS_EXPIRED_TIME = 15000; // 15 seconds

export const ammoBonusMap: Record<GunName, number> = {
    [GUN_PISTOL]: 100,
    [GUN_MINIGUN]: 500,
    [GUN_SHOOTGUN]: 50,
};

export const processExpired =
    (worker: BonusWorker) => (deltaMilliseconds: number) => {
        worker.params.expiredTime += deltaMilliseconds;

        if (!worker.isDead && worker.params.expiredTime >= BONUS_EXPIRED_TIME) {
            worker.isDead = true;
        }
    };

export const getBonusWorker = (
    { x, y }: Point,
    render: (position: Point) => void,
): BonusWorker => ({
    ...getEmptyWorker(),
    type: BONUS_WORKER_TYPE,
    position: { x, y, radius: BONUS_RADIUS },
    params: { expiredTime: 0 },
    render(deltaMilliseconds: number) {
        processDead(this)(deltaMilliseconds);
        processExpired(this)(deltaMilliseconds);
        render(cameraMapping(this.position));
    },
    onBonus: () => undefined,
});
