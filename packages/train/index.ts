import * as tf from '@tensorflow/tfjs';
import '@ambrozy/game';

// Define a model for linear regression.
const model = tf.sequential();

model.add(tf.layers.dense({ units: 1, inputShape: [1] }));

model.compile({ loss: 'meanSquaredError', optimizer: 'sgd' });

// Generate some synthetic data for train.
const xs = tf.tensor2d([1, 2, 3, 4], [4, 1]);
const ys = tf.tensor2d([1, 3, 5, 7], [4, 1]);

// Train the model using the data.
model
    .fit(xs, ys, {
        epochs: 10,
        verbose: 1,
        callbacks: {
            onEpochBegin(epoch, log) {
                console.log(epoch, log);
            },
        },
    })
    .then(() => {
        // Use the model to do inference on a data point the model hasn't seen before:
        const result = model.predict(tf.tensor2d([5], [1, 1]));

        // Open the browser devtools to see the output
        console.log(result.toString());
    });
