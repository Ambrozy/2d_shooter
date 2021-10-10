import { game, Point } from './game';

export const MAP_WIDTH = 1600;
export const MAP_HEIGHT = 1200;
export const CAMERA_SPEED = 3;

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
        this.x += CAMERA_SPEED;
        this.x = Math.min(MAP_WIDTH - game.canvas.width / 2, this.x);
    },
    moveLeft() {
        this.x -= CAMERA_SPEED;
        this.x = Math.max(game.canvas.width / 2, this.x);
    },
    moveUp() {
        this.y -= CAMERA_SPEED;
        this.y = Math.max(game.canvas.height / 2, this.y);
    },
    moveDown() {
        this.y += CAMERA_SPEED;
        this.y = Math.min(MAP_HEIGHT - game.canvas.height / 2, this.y);
    },
};

export const cameraMapping = (position: Point): Point => ({
    x: position.x - (camera.x - game.canvas.width / 2),
    y: position.y - (camera.y - game.canvas.height / 2),
});

export const inverseCameraMapping = (position: Point): Point => ({
    x: position.x + (camera.x - game.canvas.width / 2),
    y: position.y + (camera.y - game.canvas.height / 2),
});
