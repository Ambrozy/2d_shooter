import { Point, Rotation } from '../core/types';
import { getPlayerInstance } from '../actors/player';

export const getRotationRelatedToPlayer = (position: Point): Rotation => {
    const y = position.y - getPlayerInstance().position.y;
    const x = position.x - getPlayerInstance().position.x;

    if (x === 0) {
        return { sin: 1, cos: 0 };
    }

    const k2 = (y / x) * (y / x);
    const cos = Math.sqrt(1 / (k2 + 1)) * Math.sign(x);
    const sin = Math.sqrt(k2 / (k2 + 1)) * Math.sign(y);

    return { sin, cos };
};
