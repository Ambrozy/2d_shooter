import { EMPTY_WORKER_TYPE } from '../actors/types';
import { Circle, Point } from './types';

export interface Worker extends Record<string, unknown> {
    type: string;
    deadAnimationTime: number;
    isDead: boolean;
    deadTime: number;
    position: Circle;
    params: Record<string, unknown>;
    render: (deltaMilliseconds: number) => void;
    removeCondition: () => boolean;
}

export interface BonusWorker extends Worker {
    params: {
        expiredTime: number;
    };
    onBonus: () => void;
}

export interface PlayerWorker extends Worker {
    moveRight: () => void;
    moveLeft: () => void;
    moveUp: () => void;
    moveDown: () => void;
}

export interface EnemyWorker extends Worker {
    params: {
        health: number;
        reward: number;
        attack: number;
    };
    __getNextPosition: (position: Point, deltaMilliseconds: number) => Point;
    onDead: () => void;
}

export interface BulletWorker extends Worker {
    params: {
        attack: number;
        isLine: boolean;
    } & Worker['params'];
    getSecondPosition: () => Point;
    getDamage: (enemy: EnemyWorker) => number;
}

export type WorkerBuilder<T extends Worker> = (position: Point) => T;

export interface WorkersManager {
    workers: readonly Worker[];
    reset: () => void;
    add: (worker: Worker) => void;
    render: (deltaMilliseconds: number) => void;
}

export const processDead = (worker: Worker) => (deltaMilliseconds: number) => {
    if (worker.isDead) {
        worker.deadTime += deltaMilliseconds;
    }
};

export const getEmptyWorker = (): Worker => ({
    type: EMPTY_WORKER_TYPE,
    deadAnimationTime: 0,
    isDead: false,
    deadTime: 0,
    position: { x: 0, y: 0, radius: 0 },
    params: {},
    render(deltaMilliseconds) {
        processDead(this)(deltaMilliseconds);
    },
    removeCondition() {
        return this.isDead && this.deadTime >= this.deadAnimationTime;
    },
});

export const workManager: WorkersManager = {
    workers: [],
    reset() {
        this.workers = [];
    },
    add(worker: Worker) {
        this.workers.push(worker);
    },
    render(deltaMilliseconds: number) {
        this.workers.forEach((worker: Worker) => {
            worker.render(deltaMilliseconds);
        });

        this.workers = this.workers.filter(
            (worker: Worker) => !worker.removeCondition(),
        );
    },
};
