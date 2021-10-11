import { game, Point } from '../core/game';

export const drawCircle = (position: Point, radius: number, color: string) => {
    game.context.beginPath();
    game.context.arc(position.x, position.y, radius, 0, 2 * Math.PI, false);
    game.context.fillStyle = color;
    game.context.fill();
};

export const drawDonut = (
    position: Point,
    radius: number,
    innerRadius: number,
    color: string,
) => {
    game.context.beginPath();
    game.context.arc(position.x, position.y, radius, 0, 2 * Math.PI, false);
    game.context.arc(position.x, position.y, innerRadius, 0, 2 * Math.PI, true);
    game.context.fillStyle = color;
    game.context.fill();
};

export const drawLine = (
    from: Point,
    to: Point,
    width: number,
    color: string,
) => {
    game.context.beginPath();
    game.context.moveTo(from.x, from.y);
    game.context.lineTo(to.x, to.y);
    game.context.lineWidth = width;
    game.context.strokeStyle = color;
    game.context.stroke();
};

export const drawTriangle = (
    pt1: Point,
    pt2: Point,
    pt3: Point,
    color: string,
) => {
    game.context.beginPath();
    game.context.moveTo(pt1.x, pt1.y);
    game.context.lineTo(pt2.x, pt2.y);
    game.context.lineTo(pt3.x, pt3.y);
    game.context.lineTo(pt1.x, pt1.y);
    game.context.fillStyle = color;
    game.context.fill();
};
