import { Point } from '../../core/types';
import { EnemyWorker, getEmptyWorker, processDead } from '../../core/worker';
import { cameraMapping } from '../../core/camera';
import { game } from '../../core/game';
import { FREEZE_BONUS, FREEZE_BORDER_COLOR } from '../../core/bonusManager';
import { getRotationRelatedToPlayer } from '../../utils/playerHelpers';
import { drawCircle, drawDonut } from '../../utils/paint';
import { ENEMY_WORKER_TYPE } from '../types';

const DEAD_WIDTH = 3;

export const getRandomRotation = () => ({
    cos: 2 * (Math.random() - 0.5),
    sin: 2 * (Math.random() - 0.5),
});

export const getDirectToPlayerDelta = (position: Point, withRandom = false) => {
    const rotation =
        withRandom && Math.random() > 0.5
            ? getRandomRotation()
            : getRotationRelatedToPlayer(position);

    return { x: -rotation.cos, y: -rotation.sin };
};

export const getEnemyWorker = (
    { x, y }: Point,
    radius: number,
    color: string,
    speed: number,
    health: number,
    reward: number,
    attack: number,
    attackDelay: number,
    additionalParams?: Record<string, unknown>,
): EnemyWorker => ({
    ...getEmptyWorker(),
    type: ENEMY_WORKER_TYPE,
    deadAnimationTime: 100,
    position: { x, y, radius },
    params: {
        health,
        reward,
        attack,
        attackDelay,
        timeFromLastAttack: attackDelay,
        ...additionalParams,
    },
    render(deltaMilliseconds: number) {
        processDead(this)(deltaMilliseconds);
        this.params.timeFromLastAttack += deltaMilliseconds;

        if (this.isDead) {
            drawDonut(
                cameraMapping(this.position),
                radius,
                radius - DEAD_WIDTH,
                color,
            );
        }

        if (!game.getBonusValue(FREEZE_BONUS)) {
            const nextPosition = this.__getNextPosition(
                this.position,
                deltaMilliseconds,
            );

            this.position.x = nextPosition.x;
            this.position.y = nextPosition.y;
        }

        if (game.getBonusValue(FREEZE_BONUS)) {
            drawCircle(
                cameraMapping(this.position),
                radius + 1,
                FREEZE_BORDER_COLOR,
            );
        }

        drawCircle(cameraMapping(this.position), radius, color);
    },
    __getNextPosition(position: Point, deltaMilliseconds: number) {
        const delta = getDirectToPlayerDelta(position, true);

        return {
            x: position.x + delta.x * deltaMilliseconds * speed,
            y: position.y + delta.y * deltaMilliseconds * speed,
        };
    },
    onDead: () => undefined,
    getDamage() {
        if (this.params.timeFromLastAttack >= this.params.attackDelay) {
            this.params.timeFromLastAttack = 0;

            return this.params.attack;
        }

        return 0;
    },
});
