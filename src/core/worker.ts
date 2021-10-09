import {
    BULLET_WORKER_TYPE,
    EMPTY_WORKER_TYPE,
    ENEMY_WORKER_TYPE,
    PLAYER_WORKER_TYPE,
} from '../actors/types';
import { isCollision } from '../utils/helpers';
import { Circle } from './game';

export interface Worker {
    type: string;
    deadAnimationTime: number;
    isDead: boolean;
    deadTime: number;
    position: Circle;
    params: Record<string, unknown>;
    render: (deltaMilliseconds: number) => void;
    removeCondition: () => boolean;
}

export interface WorkersState {
    workers: readonly Worker[];
    update: () => void;
    add: (worker: Worker) => void;
}

export const getEmptyWorker = (): Worker => ({
    type: EMPTY_WORKER_TYPE,
    deadAnimationTime: 0,
    isDead: false,
    deadTime: 0,
    position: { x: 0, y: 0, radius: 0 },
    params: {},
    render(deltaMilliseconds) {
        if (this.isDead) {
            this.deadTime += deltaMilliseconds;
        }
    },
    removeCondition() {
        return this.isDead && this.deadTime >= this.deadAnimationTime;
    },
});

export const working: WorkersState = {
    workers: [],
    update() {
        const enemies = this.workers.filter(
            (worker: Worker) => worker.type === ENEMY_WORKER_TYPE,
        );
        const bullets = this.workers.filter(
            (worker: Worker) => worker.type === BULLET_WORKER_TYPE,
        );
        const playerInstance = this.workers.find(
            (worker: Worker) => worker.type === PLAYER_WORKER_TYPE,
        );

        enemies.forEach((enemy: Worker) => {
            bullets.forEach((bullet: Worker) => {
                if (
                    !bullet.isDead &&
                    !enemy.isDead &&
                    isCollision(bullet.position, enemy.position)
                ) {
                    enemy.isDead = true;
                    bullet.isDead = true;
                }
            });

            if (
                !enemy.isDead &&
                isCollision(playerInstance.position, enemy.position)
            ) {
                playerInstance.isDead = true;
            }
        });

        this.workers = this.workers.filter(
            (worker: Worker) => !worker.removeCondition(),
        );
    },
    add(worker: Worker) {
        this.workers.push(worker);
    },
};
