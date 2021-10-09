import { game } from './core/game';
import { working } from './core/worker';
import { inverseCameraMapping } from './core/camera';
import { playerInstance, spawnPlayer } from './actors/player';
import { spawnBullet } from './actors/bullet';
import { spawnEnemy } from './actors/enemy';
import { printFPS } from './utils/fps';
import { getRotationRelatedToPlayer } from './utils/playerHelpers';

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
    console.log(working.workers);

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
        spawnBullet();
    });
    document.addEventListener('keydown', (e) => {
        switch (e.key) {
            case 'ArrowRight':
                return playerInstance.moveRight();
            case 'ArrowLeft':
                return playerInstance.moveLeft();
            case 'ArrowUp':
                return playerInstance.moveUp();
            case 'ArrowDown':
                return playerInstance.moveDown();
        }
    });

    spawnPlayer();
    for (let i = 0; i < 10; i++) {
        spawnEnemy();
    }

    window.requestAnimationFrame(loop);
};
