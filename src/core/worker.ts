export interface Worker {
    params: Record<string, unknown>;
    render: (deltaMilliseconds: number) => void;
    removeCondition: () => boolean;
}

export interface WorkersState {
    workers: readonly Worker[];
    update: () => void;
    add: (worker: Worker) => void;
}

export const working: WorkersState = {
    workers: [],
    update() {
        this.workers = this.workers.filter(
            (worker: Worker) => !worker.removeCondition(),
        );
    },
    add(worker: Worker) {
        this.workers.push(worker);
    },
};
