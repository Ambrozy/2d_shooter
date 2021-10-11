import { Point } from '../../core/game';
import { BonusWorker, getEmptyWorker } from '../../core/worker';
import { BONUS_WORKER_TYPE } from '../types';

export const BONUS_RADIUS = 9;
export const BONUS_COLOR = '#5086da';
export const BONUS_EXPIRED_TIME = 15000; // 15 seconds
export const BONUS_CLOSE_TO_EXPIRED_TIME = 12000; // 12 seconds

export const processExpired =
    (worker: BonusWorker) => (deltaMilliseconds: number) => {
        worker.params.expiredTime += deltaMilliseconds;

        if (!worker.isDead && worker.params.expiredTime >= BONUS_EXPIRED_TIME) {
            worker.isDead = true;
        }
    };

export const getBonusWorker = ({ x, y }: Point): BonusWorker => ({
    ...getEmptyWorker(),
    type: BONUS_WORKER_TYPE,
    position: { x, y, radius: BONUS_RADIUS },
    params: { expiredTime: 0 },
    render(deltaMilliseconds: number) {
        this.params.expiredTime += deltaMilliseconds;

        if (!this.isDead && this.params.expiredTime >= BONUS_EXPIRED_TIME) {
            this.isDead = true;
        }
    },
    onBonus: () => undefined,
});
