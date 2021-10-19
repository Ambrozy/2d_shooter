import { Point } from '../core/types';
import { context } from '../core/context';

export const drawCircle = (position: Point, radius: number, color: string) => {
    context.context.beginPath();
    context.context.arc(position.x, position.y, radius, 0, 2 * Math.PI, false);
    context.context.fillStyle = color;
    context.context.fill();
};

export const drawDonut = (
    position: Point,
    radius: number,
    innerRadius: number,
    color: string,
) => {
    context.context.beginPath();
    context.context.arc(position.x, position.y, radius, 0, 2 * Math.PI, false);
    context.context.arc(
        position.x,
        position.y,
        innerRadius,
        0,
        2 * Math.PI,
        true,
    );
    context.context.fillStyle = color;
    context.context.fill();
};

export const drawLine = (
    from: Point,
    to: Point,
    width: number,
    color: string,
) => {
    context.context.beginPath();
    context.context.moveTo(from.x, from.y);
    context.context.lineTo(to.x, to.y);
    context.context.lineWidth = width;
    context.context.strokeStyle = color;
    context.context.stroke();
};

export const drawTriangle = (
    pt1: Point,
    pt2: Point,
    pt3: Point,
    color: string,
) => {
    context.context.beginPath();
    context.context.moveTo(pt1.x, pt1.y);
    context.context.lineTo(pt2.x, pt2.y);
    context.context.lineTo(pt3.x, pt3.y);
    context.context.lineTo(pt1.x, pt1.y);
    context.context.fillStyle = color;
    context.context.fill();
};

export const drawText = (
    text: string,
    position: Point,
    fontSize: number,
    color: string,
) => {
    context.context.font = `${fontSize}px Arial`;
    context.context.textAlign = 'center';
    context.context.fillStyle = color;
    context.context.fillText(text, position.x, position.y + fontSize / 4);
};

export const clearScreen = (color: string) => {
    context.context.fillStyle = color;
    context.context.fillRect(0, 0, context.canvas.width, context.canvas.height);
};
