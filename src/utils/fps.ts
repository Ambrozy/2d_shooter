let frames = 0;
let lastRender = 0;
const fpsElement = document.getElementById('fps');

export const printFPS = (timestamp: number) => {
    const progress = timestamp - lastRender;

    frames++;

    if (progress >= 1000) {
        fpsElement.innerHTML = `FPS: ${frames}`;
        frames = 0;
        lastRender = timestamp;
    }
};
