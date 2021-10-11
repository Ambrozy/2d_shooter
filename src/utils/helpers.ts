import { Circle, Point } from '../core/game';
import { gameMap } from '../core/camera';

export const isCollision = (circle1: Circle, circle2: Circle) =>
    Math.sqrt(
        (circle1.x - circle2.x) * (circle1.x - circle2.x) +
            (circle1.y - circle2.y) * (circle1.y - circle2.y),
    ) <
    circle1.radius + circle2.radius;

export const isOutOfMap = (position: Point) =>
    position.x < 0 ||
    position.x > gameMap.width ||
    position.y < 0 ||
    position.y > gameMap.height;

export const clipMap = (position: Point, offset: number): Point => ({
    x: Math.max(offset, Math.min(gameMap.width - offset, position.x)),
    y: Math.max(offset, Math.min(gameMap.height - offset, position.y)),
});

export const randomPosition = (): Point => ({
    x: Math.random() * gameMap.width,
    y: Math.random() * gameMap.height,
});

export const randomItem = <T>(array: T[]) => {
    const randomIndex = Math.floor(Math.random() * array.length);

    return array[randomIndex];
};
