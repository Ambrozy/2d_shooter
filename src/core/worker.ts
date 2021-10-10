import { EMPTY_WORKER_TYPE } from '../actors/types';
import { Circle } from './game';

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

export interface WorkersManager {
    workers: readonly Worker[];
    reset: () => void;
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

export const workManager: WorkersManager = {
    workers: [],
    reset() {
        this.workers = [];
    },
    update() {
        this.workers = this.workers.filter(
            (worker: Worker) => !worker.removeCondition(),
        );
    },
    add(worker: Worker) {
        this.workers.push(worker);
    },
};
