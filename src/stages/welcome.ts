import {
    pressedKeys,
    addKeyboardListeners,
    removeKeyboardListeners,
} from '../core/keyboard';
import { game } from '../core/game';
import { ScreenInstance, screenManager } from '../core/screen';
import { hideStatistics } from '../utils/statistic';
import { GAME_SCREEN, WELCOME_SCREEN } from './types';

export const welcomeScreen: ScreenInstance = {
    name: WELCOME_SCREEN,
    render() {
        game.context.font = '30px Arial';
        game.context.textAlign = 'center';
        game.context.fillStyle = '#fff';
        game.context.fillText(
            'Press Enter to start the game',
            game.canvas.width / 2,
            game.canvas.height / 2,
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
