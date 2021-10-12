import { Point } from './types';
import { context } from './context';
import { game } from './game';

export const MAP_WIDTH = 1600;
export const MAP_HEIGHT = 1200;

export interface Camera {
    readonly x: number;
    readonly y: number;
    readonly reset: () => void;
    readonly moveRight: () => void;
    readonly moveLeft: () => void;
    readonly moveUp: () => void;
    readonly moveDown: () => void;
}

export interface Map {
    readonly width: number;
    readonly height: number;
    readonly center: Point;
}

export const gameMap: Map = {
    width: MAP_WIDTH,
    height: MAP_HEIGHT,
    center: { x: MAP_WIDTH / 2, y: MAP_HEIGHT / 2 },
};

export const camera: Camera = {
    x: gameMap.center.x,
    y: gameMap.center.y,
    reset() {
        this.x = gameMap.center.x;
        this.y = gameMap.center.y;
    },
    moveRight() {
        this.x += game.getPlayerSpeed();
        this.x = Math.min(MAP_WIDTH - context.canvas.width / 2, this.x);
    },
    moveLeft() {
        this.x -= game.getPlayerSpeed();
        this.x = Math.max(context.canvas.width / 2, this.x);
    },
    moveUp() {
        this.y -= game.getPlayerSpeed();
        this.y = Math.max(context.canvas.height / 2, this.y);
    },
    moveDown() {
        this.y += game.getPlayerSpeed();
        this.y = Math.min(MAP_HEIGHT - context.canvas.height / 2, this.y);
    },
};

export const cameraMapping = (position: Point): Point => ({
    x: position.x - (camera.x - context.canvas.width / 2),
    y: position.y - (camera.y - context.canvas.height / 2),
});

export const inverseCameraMapping = (position: Point): Point => ({
    x: position.x + (camera.x - context.canvas.width / 2),
    y: position.y + (camera.y - context.canvas.height / 2),
});
