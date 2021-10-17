import './fps.scss';

let frames = 0;
let lastRender = 0;
let fpsElement: HTMLDivElement;

export const fps = {
    init() {
        fpsElement = document.createElement('div');
        fpsElement.classList.add('fps');
        document.body.appendChild(fpsElement);
    },
    render(timestamp: number) {
        const progress = timestamp - lastRender;

        frames++;

        if (progress >= 1000) {
            fpsElement.innerHTML = `FPS: ${frames}`;
            frames = 0;
            lastRender = timestamp;
        }
    },
};
