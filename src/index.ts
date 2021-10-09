import { game } from './core/game';
import { working } from './core/worker';
import { player } from './actors/player';
import { spawnBullet } from './actors/bullet';
import { spawnEnemy } from './actors/enemy';
import { printFPS } from './utils/fps';
import { getRotationRelatedToCenter } from './utils/helpers';

import './index.scss';

let lastRender = 0;

const clearScreen = () =>
    game.context.clearRect(0, 0, game.canvas.width, game.canvas.height);

const loop = (timestamp: number) => {
    printFPS(timestamp);

    clearScreen();
    player({ gunRotation: game.mouseRotation });
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
        game.mousePosition = { x: e.offsetX, y: e.offsetY };
        game.mouseRotation = getRotationRelatedToCenter(game.mousePosition);
    });
    game.canvas.addEventListener('mousedown', () => {
        spawnBullet();
    });

    for (let i = 0; i < 10; i++) {
        spawnEnemy();
    }

    window.requestAnimationFrame(loop);
};
