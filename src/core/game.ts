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
}

const canvas = document.querySelector('canvas');
const context = canvas.getContext('2d');
const mousePosition: Point = { x: 0, y: 0 };
const mouseRotation: Rotation = { sin: 0, cos: 1 };

export const game: Game = {
    canvas,
    context,
    mousePosition,
    mouseRotation,
};
