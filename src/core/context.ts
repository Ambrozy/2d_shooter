export interface Context {
    readonly canvas: HTMLCanvasElement;
    readonly context: CanvasRenderingContext2D;
}

const canvas = document.querySelector('canvas');

export const context: Context = {
    canvas,
    context: canvas.getContext('2d'),
};
