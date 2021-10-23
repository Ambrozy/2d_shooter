import { Agent } from './types';

export const randomAgent: Agent = {
    nextState() {
        return {
            mousePosition: {
                x: Math.random(),
                y: Math.random(),
            },
            buttons: [
                Boolean(Math.round(Math.random())),
                Boolean(Math.round(Math.random())),
                Boolean(Math.round(Math.random())),
                Boolean(Math.round(Math.random())),
                Boolean(Math.round(Math.random())),
                Boolean(Math.round(Math.random())),
            ],
        };
    },
};
