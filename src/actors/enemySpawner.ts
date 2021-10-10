import { Point } from '../core/game';
import { getEmptyWorker, workManager } from '../core/worker';
import { SPAWNER_WORKER_TYPE } from './types';
import { enemyWorker } from './enemy';

export const enemySpawnerWorker = ({ x, y }: Point) => ({
    ...getEmptyWorker(),
    type: SPAWNER_WORKER_TYPE,
    position: {
        x,
        y,
        radius: 0,
    },
    params: {
        spawnDelay: 5000,
        elapsedTime: 4800,
        enemyCapacity: 10,
    },
    render(deltaMilliseconds: number) {
        this.params.elapsedTime += deltaMilliseconds;

        if (this.params.enemyCapacity <= 0) {
            this.isDead = true;
        }

        if (!this.isDead && this.params.elapsedTime >= this.params.spawnDelay) {
            this.params.elapsedTime = 0;
            this.params.enemyCapacity -= 1;
            workManager.add(enemyWorker(this.position));
        }
    },
});

export const spawnEnemySpawner = (spawnCoordinates: Point) => {
    workManager.add(enemySpawnerWorker(spawnCoordinates));
};
