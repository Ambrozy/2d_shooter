import { game } from './core/game';
import { working } from './core/worker';
import { player } from './actors/player';
import { bulletWorker } from './actors/bullet';
import { printFPS } from './utils/fps';

import './index.scss';

let lastRender = 0;

const clearScreen = () =>
    game.context.clearRect(0, 0, game.canvas.width, game.canvas.height);
const getMouseRotation = () => {
    const y = game.mousePosition.y - game.center.y;
    const x = game.mousePosition.x - game.center.x;

    if (x === 0) {
        return { sin: 1, cos: 0 };
    }

    const k2 = (y / x) * (y / x);
    const cos = Math.sqrt(1 / (k2 + 1)) * Math.sign(x);
    const sin = Math.sqrt(k2 / (k2 + 1)) * Math.sign(y);

    return { sin, cos };
};

const loop = (timestamp: number) => {
    printFPS(timestamp);

    clearScreen();
    player({ gunRotation: game.mouseRotation });
    working.workers.forEach((worker) => {
        worker.render(timestamp - lastRender);
    });
    working.update();
    console.log(working.workers, working.workers.length);

    lastRender = timestamp;

    window.requestAnimationFrame(loop);
};

window.onload = () => {
    game.canvas.addEventListener('mousemove', (e) => {
        game.mousePosition = { x: e.offsetX, y: e.offsetY };
        game.mouseRotation = getMouseRotation();
    });
    game.canvas.addEventListener('mousedown', () => {
        working.add(bulletWorker(game.mouseRotation));
    });

    window.requestAnimationFrame(loop);
};
