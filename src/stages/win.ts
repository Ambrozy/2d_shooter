import {
    pressedKeys,
    addKeyboardListeners,
    removeKeyboardListeners,
} from '../core/keyboard';
import { game } from '../core/game';
import { ScreenInstance, screenManager } from '../core/screen';
import { hideStatistics } from '../utils/statistic';
import { WIN_SCREEN, GAME_SCREEN } from './types';

const LINE_HEIGHT = 45;

export const winScreen: ScreenInstance = {
    name: WIN_SCREEN,
    render() {
        game.context.font = '30px Arial';
        game.context.textAlign = 'center';
        game.context.fillStyle = '#fff';
        game.context.fillText(
            'You win the game',
            game.canvas.width / 2,
            game.canvas.height / 2 - LINE_HEIGHT,
        );
        game.context.fillText(
            `Your score is ${game.score}`,
            game.canvas.width / 2,
            game.canvas.height / 2,
        );
        game.context.fillText(
            'Press Enter to start the game',
            game.canvas.width / 2,
            game.canvas.height / 2 + LINE_HEIGHT,
        );

        if (pressedKeys.has('Enter')) {
            screenManager.changeScreen(GAME_SCREEN);
        }
    },
    constructor() {
        addKeyboardListeners();
        hideStatistics();
    },
    destructor() {
        removeKeyboardListeners();
    },
};
