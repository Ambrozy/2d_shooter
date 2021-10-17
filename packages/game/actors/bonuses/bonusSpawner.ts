import { getEmptyWorker, workManager } from '../../core/worker';
import { randomItem, randomPosition } from '../../utils/helpers';
import { ammunitionBonusWorker } from './ammunitionBonus';
import { bombBonusWorker } from './bombBonus';
import { healthBonusWorker } from './healthBonus';
import { speedBonusWorker } from './speedBonus';
import { expBonusWorker } from './expBonus';
import { untouchableBonusWorker } from './untouchableBonus';
import { freezeBonusWorker } from './freezeBonus';
import { minigunBonusWorker } from './miniganBonus';
import { shootgunBonusWorker } from './shootgunBonus';
import { telekinesisBonusWorker } from './telekinesisBonus';

const bonuses = [
    ammunitionBonusWorker,
    bombBonusWorker,
    healthBonusWorker,
    speedBonusWorker,
    expBonusWorker,
    untouchableBonusWorker,
    freezeBonusWorker,
    minigunBonusWorker,
    shootgunBonusWorker,
    telekinesisBonusWorker,
];

export const bonusSpawner = () => ({
    ...getEmptyWorker(),
    params: {
        spawnDelay: 1000,
        elapsedTime: 0,
    },
    render(deltaMilliseconds: number) {
        this.params.elapsedTime += deltaMilliseconds;

        if (!this.isDead && this.params.elapsedTime >= this.params.spawnDelay) {
            this.params.elapsedTime = 0;
            workManager.add(randomItem(bonuses)(randomPosition()));
        }
    },
});

export const spawnBonusSpawner = () => {
    workManager.add(bonusSpawner());
};
