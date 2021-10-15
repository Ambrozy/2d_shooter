import { Circle, Point, Rotation } from '../core/types';
import { gameMap } from '../core/camera';

export const minus = (position1: Point, position2: Point) => ({
    x: position1.x - position2.x,
    y: position1.y - position2.y,
});

export const vectorLength = (vector: Point) =>
    Math.sqrt(vector.x * vector.x + vector.y * vector.y);

export const getDistance = (position1: Point, position2: Point) =>
    vectorLength(minus(position1, position2));

export const getProjectionPoint = (
    position1: Point,
    position2: Point,
    center: Point,
) => {
    const k = (position2.y - position1.y) / (position2.x - position1.x);
    const x =
        (center.x + k * (center.y - position1.y) + k * k * position1.x) /
        (k * k + 1);
    const y = k * (x - position1.x) + position1.y;

    return { x, y };
};

export const getCosSign = (vector1: Point, vector2: Point) =>
    Math.sign(vector1.x * vector2.x + vector1.y * vector2.y);

export const isLineCollision = (
    position1: Point,
    position2: Point,
    circle: Circle,
) => {
    const cosSign = getCosSign(
        minus(position2, circle),
        minus(position1, circle),
    );

    // acute angle
    if (cosSign > 0) {
        const distance1 = getDistance(position1, circle);
        const distance2 = getDistance(position2, circle);

        return distance1 < circle.radius || distance2 < circle.radius;
    }

    // obtuse angle
    const projectionPoint = getProjectionPoint(position1, position2, circle);
    const distance3 = getDistance(projectionPoint, circle);

    return distance3 < circle.radius;
};

export const isCollision = (circle1: Circle, circle2: Circle) =>
    getDistance(circle1, circle2) < circle1.radius + circle2.radius;

export const isOutOfMap = (position: Point) =>
    position.x < 0 ||
    position.x > gameMap.width ||
    position.y < 0 ||
    position.y > gameMap.height;

export const getAngleFromRotation = (rotation: Rotation) => {
    const angle = Math.acos(rotation.cos);

    return rotation.sin <= 0 ? 2 * Math.PI - angle : angle;
};

export const getRotationFromAngle = (angle: number): Rotation => ({
    cos: Math.cos(angle),
    sin: Math.sin(angle),
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

export const randomFromRange = (min: number, max: number) =>
    min + Math.random() * (max - min);
