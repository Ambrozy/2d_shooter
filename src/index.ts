import { game } from './core/game';
import { screenManager } from './core/screen';
import { WELCOME_SCREEN } from './stages/types';
import { welcomeScreen } from './stages/welcome';
import { gameScreen } from './stages/game/game';
import { deadScreen } from './stages/dead';
import { winScreen } from './stages/win';
import { printFPS } from './utils/fps';

import './index.scss';

let lastRender = 0;

const clearScreen = () => {
    game.context.fillStyle = '#000';
    game.context.fillRect(0, 0, game.canvas.width, game.canvas.height);
};

const loop = (timestamp: number) => {
    printFPS(timestamp);

    clearScreen();
    screenManager.screen?.render(timestamp - lastRender);
    // console.log(working.workers);

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
