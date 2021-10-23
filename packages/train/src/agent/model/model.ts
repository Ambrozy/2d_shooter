import { tf } from '../../tensorflow';
import type { Shape } from '../../tensorflow';

export const model = (inputShape: Shape, imageShape: Shape) => {
    const numberInput = tf.layers.input({
        shape: inputShape,
        name: 'number_input',
    });
    const imageDiffInput = tf.layers.input({
        shape: imageShape,
        name: 'image_diff_input',
    });
    // TODO: construct more complicated model with all inputs
    const output = tf.layers
        .dense({ units: 100, activation: 'relu', name: 'dense' })
        .apply(numberInput) as tf.SymbolicTensor;

    return tf.model({
        inputs: [numberInput, imageDiffInput],
        outputs: output,
        name: 'actor',
    });
};
