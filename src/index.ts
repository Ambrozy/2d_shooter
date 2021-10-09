import { game } from './core/game';
import { working } from './core/worker';
import { inverseCameraMapping } from './core/camera';
import { addKeyboardListeners, pressedKeys } from './core/keyboard';
import { playerInstance, spawnPlayer } from './actors/player';
import { spawnBullet } from './actors/bullet';
import { spawnEnemy } from './actors/enemy';
import { printFPS } from './utils/fps';
import { getRotationRelatedToPlayer } from './utils/playerHelpers';
import { updateAmmo, updateHealth, updateScore } from './utils/statistic';

import './index.scss';

let lastRender = 0;

const clearScreen = () =>
    game.context.clearRect(0, 0, game.canvas.width, game.canvas.height);

const loop = (timestamp: number) => {
    printFPS(timestamp);

    clearScreen();
    working.workers.forEach((worker) => {
        worker.render(timestamp - lastRender);
    });
    working.update();

    if (pressedKeys.has('ArrowRight')) {
        playerInstance.moveRight();
    } else if (pressedKeys.has('ArrowLeft')) {
        playerInstance.moveLeft();
    }
    if (pressedKeys.has('ArrowUp')) {
        playerInstance.moveUp();
    } else if (pressedKeys.has('ArrowDown')) {
        playerInstance.moveDown();
    }
    // console.log(working.workers);

    lastRender = timestamp;

    window.requestAnimationFrame(loop);
};

window.onload = () => {
    game.canvas.addEventListener('mousemove', (e) => {
        game.mousePosition = inverseCameraMapping({
            x: e.offsetX,
            y: e.offsetY,
        });
        game.mouseRotation = getRotationRelatedToPlayer(game.mousePosition);
    });
    game.canvas.addEventListener('mousedown', () => {
        if (game.ammunition > 0) {
            spawnBullet();
            updateAmmo(1);
        }
    });
    addKeyboardListeners();

    spawnPlayer();
    for (let i = 0; i < 10; i++) {
        spawnEnemy();
    }

    updateScore(0);
    updateAmmo(0);
    updateHealth(0);
    window.requestAnimationFrame(loop);
};
