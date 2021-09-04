import './index.scss';
import { createGame, GameInstance, INITIAL_WIDTH } from './utils/gl';
import { drawCircle } from './utils/paint';

let game: GameInstance = null;
let lastRender = 0;
let x = 50;
const color = [Math.random(), Math.random(), Math.random(), 1];
const loop = (timestamp: number) => {
    const progress = timestamp - lastRender;

    x += progress;
    if (x > INITIAL_WIDTH) {
        x -= INITIAL_WIDTH;
    }

    game.gl.clear(game.gl.COLOR_BUFFER_BIT);
    drawCircle(game, {
        x,
        y: x / 2,
        r: 50,
        color,
    });

    lastRender = timestamp;
    window.requestAnimationFrame(loop);
};

window.onload = () => {
    game = createGame();
    window.requestAnimationFrame(loop);
};
