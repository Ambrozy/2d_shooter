import { getEmptyWorker, workManager } from '../../core/worker';
import { randomItem, randomPosition } from '../../utils/helpers';
import { ammunitionBonusWorker } from './ammunitionBonus';
import { bombBonusWorker } from './bombBonus';
import { healthBonusWorker } from './healthBonus';

const bonuses = [ammunitionBonusWorker, bombBonusWorker, healthBonusWorker];

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
