import { Circle, Point } from '../core/types';
import { gameMap } from '../core/camera';

export const getDistance = (position1: Point, position2: Point) =>
    Math.sqrt(
        (position1.x - position2.x) * (position1.x - position2.x) +
            (position1.y - position2.y) * (position1.y - position2.y),
    );

export const isCollision = (circle1: Circle, circle2: Circle) =>
    getDistance(circle1, circle2) < circle1.radius + circle2.radius;

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

export const randomEdgePosition = (): Point => {
    const position = randomPosition();

    return randomItem([
        { x: 0, y: position.y },
        { x: gameMap.width, y: position.y },
        { x: position.x, y: 0 },
        { x: position.x, y: gameMap.height },
    ]);
};
