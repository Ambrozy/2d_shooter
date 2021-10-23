import type { Agent } from '../types';
import type { LayersModel, Tensor3D } from '../../tensorflow';
import { tf } from '../../tensorflow';
import {
    denormalizeControls,
    IMAGE_INPUT_SHAPE,
    normalizeImageInput,
    normalizeNumberInput,
    NUMBER_INPUT_SHAPE,
} from '../model/normalization';
import { model } from '../model/model';

export interface AIAgent extends Agent {
    model: LayersModel;
    prevImageInput: Tensor3D;
}

export const randomAgent: AIAgent = {
    model: model(NUMBER_INPUT_SHAPE, IMAGE_INPUT_SHAPE),
    prevImageInput: null,
    nextState(state) {
        const numberInput = normalizeNumberInput(state);
        const imageInput = normalizeImageInput(state);
        const diffImageInput =
            this.prevImageInput === null
                ? imageInput
                : tf.sub(imageInput, this.prevImageInput);
        const output = this.model.predict(numberInput, diffImageInput);

        this.prevImageInput = imageInput;
        // TODO: prepare and replace return
        console.log(output.toString());

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
