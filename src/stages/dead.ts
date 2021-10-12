import { context } from '../core/context';
import {
    addKeyListeners,
    controls,
    removeKeyListeners,
} from '../core/controls';
import { game } from '../core/game';
import { ScreenInstance, screenManager } from '../core/screen';
import { DEAD_SCREEN, GAME_SCREEN } from './types';

const LINE_HEIGHT = 45;

export const deadScreen: ScreenInstance = {
    name: DEAD_SCREEN,
    render() {
        context.context.font = '30px Arial';
        context.context.textAlign = 'center';
        context.context.fillStyle = '#fff';
        context.context.fillText(
            'Game is over',
            context.canvas.width / 2,
            context.canvas.height / 2 - LINE_HEIGHT,
        );
        context.context.fillText(
            `Your score is ${game.score}`,
            context.canvas.width / 2,
            context.canvas.height / 2,
        );
        context.context.fillText(
            'Press Enter to start the game',
            context.canvas.width / 2,
            context.canvas.height / 2 + LINE_HEIGHT,
        );

        if (controls.pressedKeys.has('Enter')) {
            screenManager.changeScreen(GAME_SCREEN);
        }
    },
    constructor() {
        addKeyListeners();
        game.hideStatistics();
    },
    destructor() {
        removeKeyListeners();
    },
};
