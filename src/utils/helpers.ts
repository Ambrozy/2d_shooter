import { game } from '../core/game';

export const isOutOfCanvas = (x: number, y: number) =>
    x < 0 || x > game.canvas.width || y < 0 || y > game.canvas.height;
