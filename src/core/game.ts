const canvas = document.querySelector('canvas');
const context = canvas.getContext('2d');
const centerPoint = { x: canvas.width / 2, y: canvas.height / 2 };

export const game = {
    canvas,
    context,
    center: centerPoint,
    mousePosition: { x: 0, y: 0 },
    mouseRotation: { sin: 0, cos: 1 },
};
