import { Circle, game, Point, Rotation } from '../core/game';

export const noop: () => void = () => undefined;

export const isCollision = (circle1: Circle, circle2: Circle) =>
    Math.sqrt(
        (circle1.x - circle2.x) * (circle1.x - circle2.x) +
            (circle1.y - circle2.y) * (circle1.y - circle2.y),
    ) <
    circle1.radius + circle2.radius;

export const isOutOfCanvas = (position: Point) =>
    position.x < 0 ||
    position.x > game.canvas.width ||
    position.y < 0 ||
    position.y > game.canvas.height;

export const clipCanvas = (position: Point, offset: number): Point => ({
    x: Math.max(offset, Math.min(game.canvas.width - offset, position.x)),
    y: Math.max(offset, Math.min(game.canvas.height - offset, position.y)),
});

export const getRotationRelatedToCenter = (position: Point): Rotation => {
    const y = position.y - game.center.y;
    const x = position.x - game.center.x;

    if (x === 0) {
        return { sin: 1, cos: 0 };
    }

    const k2 = (y / x) * (y / x);
    const cos = Math.sqrt(1 / (k2 + 1)) * Math.sign(x);
    const sin = Math.sqrt(k2 / (k2 + 1)) * Math.sign(y);

    return { sin, cos };
};
