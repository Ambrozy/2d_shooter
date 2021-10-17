export interface Context {
    readonly canvas: HTMLCanvasElement;
    readonly context: CanvasRenderingContext2D;
    readonly constructor: (canvas: HTMLCanvasElement) => void;
}

export const context: Context = {
    canvas: null,
    context: null,
    constructor(externalCanvas: HTMLCanvasElement) {
        this.canvas = externalCanvas;
        this.context = externalCanvas.getContext('2d');
    },
};
