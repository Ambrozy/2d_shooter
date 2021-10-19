import { BulletWorker, getEmptyWorker, processDead } from '../../core/worker';
import { Rotation } from '../../core/types';
import { cameraMapping } from '../../core/camera';
import { isOutOfMap } from '../../utils/helpers';
import { drawLine } from '../../utils/paint';
import { getPlayerInstance } from '../player';
import { BULLET_WORKER_TYPE } from '../types';

export const GUN_PISTOL = 'GUN_PISTOL';
export const GUN_MINIGUN = 'GUN_MINIGUN';
export const GUN_SHOOTGUN = 'GUN_SHOOTGUN';

export type GunName =
    | typeof GUN_PISTOL
    | typeof GUN_MINIGUN
    | typeof GUN_SHOOTGUN;

export type BulletBuilder = {
    spawnSpeed: number;
    spawnOnRender: boolean;
    spawn: () => void;
};

const getBulletPosition = ({ sin, cos }: Rotation, length: number) => {
    const playerPosition = getPlayerInstance().position;

    return {
        x: playerPosition.x + cos * playerPosition.radius,
        y: playerPosition.y + sin * playerPosition.radius,
        radius: length,
    };
};

export const getBulletWorker = (
    { sin, cos }: Rotation,
    length: number,
    attack: number,
    speed: number,
    width: number,
    color: string,
    isLine: boolean,
): BulletWorker => ({
    ...getEmptyWorker(),
    type: BULLET_WORKER_TYPE,
    position: getBulletPosition({ sin, cos }, length),
    params: {
        attack: attack,
        isLine,
        sin,
        cos,
    },
    render(deltaMilliseconds: number) {
        processDead(this)(deltaMilliseconds);
        this.position.x += this.params.cos * deltaMilliseconds * speed;
        this.position.y += this.params.sin * deltaMilliseconds * speed;
        drawLine(
            cameraMapping(this.position),
            cameraMapping(this.getSecondPosition()),
            width,
            color,
        );
    },
    removeCondition() {
        return (
            (this.isDead && this.deadTime >= this.deadAnimationTime) ||
            isOutOfMap(this.position)
        );
    },
    getSecondPosition() {
        return {
            x: this.position.x + this.params.cos * this.position.radius,
            y: this.position.y + this.params.sin * this.position.radius,
        };
    },
    getDamage() {
        return this.params.attack;
    },
});
