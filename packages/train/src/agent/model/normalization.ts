import { tf } from '../../tensorflow';
import { ControlsState, GameState, RowControlsState } from '../types';

const IMAGE_MAX_VALUE = 255;
const BONUS_MAX_TIME = 10000;
const HEALTH_MAX = 100;
const AMMUNITION_MAX = 200;
const PLAYER_SPEED_MAX = 5;
const normalizeValue = (value: number, max: number) =>
    Math.min(max, value) / max;

export const NUM_CHANNELS = 3;
export const CANVAS_WIDTH = 600;
export const CANVAS_HEIGHT = 400;
export const NUMBER_INPUT_SHAPE = [11]; // 5xBonuses + health + ammo + speed + 3xGun
export const IMAGE_INPUT_SHAPE = [CANVAS_WIDTH, CANVAS_HEIGHT, NUM_CHANNELS];

export const normalizeNumberInput = (gameState: GameState) =>
    tf.tensor1d(
        [
            ...gameState.bonusTimes.map((bonusTime) =>
                normalizeValue(bonusTime, BONUS_MAX_TIME),
            ),
            normalizeValue(gameState.health, HEALTH_MAX),
            normalizeValue(gameState.ammunition, AMMUNITION_MAX),
            normalizeValue(gameState.speed, PLAYER_SPEED_MAX),
            ...gameState.gun,
        ],
        'float32',
    );

/**
 * @param gameState
 * @returns tensor3d values=[0...1], shape=(height, width, 3), dtype=float32
 */
export const normalizeImageInput = (gameState: GameState) => {
    const numChannels = NUM_CHANNELS;
    const pixels = gameState.image;
    const [width, height] = [pixels.width, pixels.height];
    const vals = pixels.data;
    const numPixels = width * height;
    const values = new Float32Array(numPixels * numChannels);

    for (let i = 0; i < numPixels; i++) {
        for (let channel = 0; channel < numChannels; ++channel) {
            values[i * numChannels + channel] =
                vals[i * 4 + channel] / IMAGE_MAX_VALUE;
        }
    }

    return tf.tensor3d(values, [height, width, numChannels], 'float32');
};

export const denormalizeControls = (
    state: RowControlsState,
): ControlsState => ({
    mousePosition: {
        x: state.mousePosition.x * CANVAS_WIDTH,
        y: state.mousePosition.y * CANVAS_HEIGHT,
    },
    buttons: state.buttons.map((value) =>
        Boolean(Math.round(value)),
    ) as ControlsState['buttons'],
});
