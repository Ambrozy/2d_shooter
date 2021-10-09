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

const canvas = document.querySelector('canvas');
const context = canvas.getContext('2d');
const center: Point = { x: canvas.width / 2, y: canvas.height / 2 };
const mousePosition: Point = { x: 0, y: 0 };
const mouseRotation: Rotation = { sin: 0, cos: 1 };

export const game = {
    canvas,
    context,
    center,
    mousePosition,
    mouseRotation,
};
