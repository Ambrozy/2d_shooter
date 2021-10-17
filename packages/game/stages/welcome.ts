import { context } from '../core/context';
import {
    addKeyListeners,
    controls,
    removeKeyListeners,
} from '../core/controls';
import { ScreenInstance, screenManager } from '../core/screen';
import { GAME_SCREEN, WELCOME_SCREEN } from './types';

export const welcomeScreen: ScreenInstance = {
    name: WELCOME_SCREEN,
    render() {
        context.context.font = '30px Arial';
        context.context.textAlign = 'center';
        context.context.fillStyle = '#fff';
        context.context.fillText(
            'Press Enter to start the game',
            context.canvas.width / 2,
            context.canvas.height / 2,
        );

        if (controls.pressedKeys.has('Enter')) {
            screenManager.changeScreen(GAME_SCREEN);
        }
    },
    constructor() {
        addKeyListeners();
    },
    destructor() {
        removeKeyListeners();
    },
};
