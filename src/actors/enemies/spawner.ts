import { Point } from '../../core/types';
import { EnemyWorker, WorkerBuilder, workManager } from '../../core/worker';
import { getEnemyWorker } from './constants';

const ENEMY_RADIUS = 15;
const ENEMY_COLOR = '#bd37da';
const ENEMY_SPEED = 0;
const ENEMY_HEALTH = 150;
const ENEMY_REWARD = 500;
const ENEMY_ATTACK = 0;

const SPAWN_PERIOD = 5000;

const SPIDER_RADIUS = 5;
const SPIDER_COLOR = '#db8de8';
const SPIDER_SPEED = 0.02;
const SPIDER_HEALTH = 5;
const SPIDER_REWARD = 100;
const SPIDER_ATTACK = 15;

export const spiderEnemyWorker = (position: Point) =>
    getEnemyWorker(
        position,
        SPIDER_RADIUS,
        SPIDER_COLOR,
        SPIDER_SPEED,
        SPIDER_HEALTH,
        SPIDER_REWARD,
        SPIDER_ATTACK,
    );

export const spawnerEnemyWorker =
    (enemyWorkerBuilder: WorkerBuilder<EnemyWorker>) =>
    (initialPosition: Point) => ({
        ...getEnemyWorker(
            initialPosition,
            ENEMY_RADIUS,
            ENEMY_COLOR,
            ENEMY_SPEED,
            ENEMY_HEALTH,
            ENEMY_REWARD,
            ENEMY_ATTACK,
            { expiredTime: 0 },
        ),
        __getNextPosition(position: Point, deltaMilliseconds: number) {
            this.params.expiredTime += deltaMilliseconds;
            if (this.params.expiredTime >= SPAWN_PERIOD) {
                this.params.expiredTime = 0;
                workManager.add(enemyWorkerBuilder(this.position));
            }

            return position;
        },
        onDead() {
            workManager.add(spiderEnemyWorker(this.position));
            workManager.add(
                spiderEnemyWorker({
                    x: this.position.x - ENEMY_RADIUS,
                    y: this.position.y - ENEMY_RADIUS,
                }),
            );
            workManager.add(
                spiderEnemyWorker({
                    x: this.position.x - ENEMY_RADIUS,
                    y: this.position.y + ENEMY_RADIUS,
                }),
            );
            workManager.add(
                spiderEnemyWorker({
                    x: this.position.x + ENEMY_RADIUS,
                    y: this.position.y - ENEMY_RADIUS,
                }),
            );
            workManager.add(
                spiderEnemyWorker({
                    x: this.position.x + ENEMY_RADIUS,
                    y: this.position.y + ENEMY_RADIUS,
                }),
            );
        },
    });
