import { Point, FREEZE_BONUS } from '../../core/types';
import {
    EnemyWorker,
    WorkerBuilder,
    getEmptyWorker,
    workManager,
} from '../../core/worker';
import { game } from '../../core/game';
import { randomItem } from '../../utils/helpers';
import { SPAWNER_WORKER_TYPE } from '../types';
import { simpleEnemyWorker } from './simple';
import { ninjaEnemyWorker } from './ninja';
import { bigassEnemyWorker } from './bigass';
import { spawnerEnemyWorker } from './spawner';
import { puffEnemyWorker } from './puff';
import { sprinterEnemyWorker } from './sprinter';

export const enemies = [
    simpleEnemyWorker,
    ninjaEnemyWorker,
    bigassEnemyWorker,
    spawnerEnemyWorker(simpleEnemyWorker),
    puffEnemyWorker,
    sprinterEnemyWorker,
];

const SPAWN_PERIOD = 5000;
const START_EXPIRED_TIME = 4800;
const SPAWNER_CAPACITY = 10;

export const enemySpawnerWorker = (
    { x, y }: Point,
    enemyWorkerBuilder: WorkerBuilder<EnemyWorker>,
) => ({
    ...getEmptyWorker(),
    type: SPAWNER_WORKER_TYPE,
    position: {
        x,
        y,
        radius: 0,
    },
    params: {
        expiredTime: START_EXPIRED_TIME,
        enemyCapacity: SPAWNER_CAPACITY,
    },
    render(deltaMilliseconds: number) {
        if (!game.getBonusValue(FREEZE_BONUS)) {
            this.params.expiredTime += deltaMilliseconds;
        }

        if (this.params.enemyCapacity <= 0) {
            this.isDead = true;
        }

        if (!this.isDead && this.params.expiredTime >= SPAWN_PERIOD) {
            this.params.expiredTime = 0;
            this.params.enemyCapacity -= 1;
            workManager.add(enemyWorkerBuilder(this.position));
        }
    },
});

export const spawnEnemySpawner = (
    spawnCoordinates: Point,
    enemyWorkerBuilder: WorkerBuilder<EnemyWorker> = randomItem(enemies),
) => {
    workManager.add(enemySpawnerWorker(spawnCoordinates, enemyWorkerBuilder));
};
