import { context } from './core/context';
import { screenManager } from './core/screen';
import { WELCOME_SCREEN } from './stages/types';
import { welcomeScreen } from './stages/welcome';
import { gameScreen } from './stages/game/game';
import { deadScreen } from './stages/dead';
import { winScreen } from './stages/win';
import { fps } from './utils/fps';

import './index.scss';

let lastRender = 0;

const loop = (timestamp: number) => {
    fps.render(timestamp);

    screenManager.clearScreen();
    screenManager.screen?.render(timestamp - lastRender);

    lastRender = timestamp;

    window.requestAnimationFrame(loop);
};

window.onload = () => {
    fps.init();
    context.constructor(document.querySelector('canvas'));
    screenManager.registerScreen(welcomeScreen);
    screenManager.registerScreen(gameScreen);
    screenManager.registerScreen(deadScreen);
    screenManager.registerScreen(winScreen);
    screenManager.changeScreen(WELCOME_SCREEN);

    window.requestAnimationFrame(loop);
};
