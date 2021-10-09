export type Point = {
    x: number;
    y: number;
};
export type Circle = Point & {
    radius: number;
};
export type Rotation = {
    cos: number;
    sin: number;
};

export interface Game {
    readonly canvas: HTMLCanvasElement;
    readonly context: CanvasRenderingContext2D;
    mousePosition: Point;
    mouseRotation: Rotation;
    score: number;
    health: number;
    ammunition: number;
}

const canvas = document.querySelector('canvas');
const context = canvas.getContext('2d');
const mousePosition: Point = { x: 0, y: 0 };
const mouseRotation: Rotation = { sin: 0, cos: 1 };

export const MAX_HEALTH = 100;
export const INITIAL_AMMUNITION = 100;
export const game: Game = {
    canvas,
    context,
    mousePosition,
    mouseRotation,
    score: 0,
    health: MAX_HEALTH,
    ammunition: INITIAL_AMMUNITION,
};
