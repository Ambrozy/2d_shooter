import { context } from './core/context';
import { screenManager } from './core/screen';
import { WELCOME_SCREEN } from './stages/types';
import { welcomeScreen } from './stages/welcome';
import { gameScreen } from './stages/game/game';
import { deadScreen } from './stages/dead';
import { winScreen } from './stages/win';
import { printFPS } from './utils/fps';
import { BACKGROUND_COLOR } from './constants';

import './index.scss';

let lastRender = 0;

const clearScreen = () => {
    context.context.fillStyle = BACKGROUND_COLOR;
    context.context.fillRect(0, 0, context.canvas.width, context.canvas.height);
};

const loop = (timestamp: number) => {
    printFPS(timestamp);

    clearScreen();
    screenManager.screen?.render(timestamp - lastRender);

    lastRender = timestamp;

    window.requestAnimationFrame(loop);
};

window.onload = () => {
    screenManager.registerScreen(welcomeScreen);
    screenManager.registerScreen(gameScreen);
    screenManager.registerScreen(deadScreen);
    screenManager.registerScreen(winScreen);
    screenManager.changeScreen(WELCOME_SCREEN);

    window.requestAnimationFrame(loop);
};
