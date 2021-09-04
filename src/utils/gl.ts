export type GameInstance = {
    gl: WebGLRenderingContext;
    canvas: HTMLCanvasElement;
    width: number;
    height: number;
};

export const INITIAL_WIDTH = 800;
export const INITIAL_HEIGHT = 600;

export const createGame = (width = INITIAL_WIDTH, height = INITIAL_HEIGHT) => {
    const canvas = document.querySelector('canvas');
    const gl = canvas.getContext('webgl');

    canvas.width = width;
    canvas.height = height;

    return {
        gl,
        canvas,
        width,
        height,
    } as GameInstance;
};
