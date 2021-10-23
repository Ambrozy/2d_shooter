import { Agent } from './types';
import { denormalizeControls } from './model/normalization';

export const randomAgent: Agent = {
    nextState() {
        return denormalizeControls({
            mousePosition: {
                x: Math.random(),
                y: Math.random(),
            },
            buttons: [
                Math.random(),
                Math.random(),
                Math.random(),
                Math.random(),
                Math.random(),
                Math.random(),
            ],
        });
    },
};
