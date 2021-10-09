import { game, Point } from '../core/game';
import { getEmptyWorker, working } from '../core/worker';
import { cameraMapping, gameMap } from '../core/camera';
import { clipMap, isCollision } from '../utils/helpers';
import { getRotationRelatedToPlayer } from '../utils/playerHelpers';
import { ENEMY_WORKER_TYPE } from './types';

export const ENEMY_RADIUS = 7;
export const ENEMY_COLOR = '#dd3d3d';
export const ENEMY_SPEED = 0.01;
export const DEAD_ENEMY_RADIUS = 4;
export const MIN_SPAWN_RADIUS = 300;
export const ENEMY_REWARD = 100;
export const ENEMY_ATTACK = 10;

export interface EnemyProps {
    x: number;
    y: number;
}

export const enemy = ({ x, y }: EnemyProps) => {
    game.context.beginPath();
    game.context.arc(x, y, ENEMY_RADIUS, 0, 2 * Math.PI, false);
    game.context.fillStyle = ENEMY_COLOR;
    game.context.fill();
};

export const enemyDead = ({ x, y }: EnemyProps) => {
    game.context.beginPath();
    game.context.arc(x, y, ENEMY_RADIUS, 0, 2 * Math.PI, false);
    game.context.arc(x, y, DEAD_ENEMY_RADIUS, 0, 2 * Math.PI, true);
    game.context.fillStyle = ENEMY_COLOR;
    game.context.fill();
};

export const enemyWorker = ({ x, y }: EnemyProps) => ({
    ...getEmptyWorker(),
    type: ENEMY_WORKER_TYPE,
    deadAnimationTime: 100,
    position: {
        x,
        y,
        radius: ENEMY_RADIUS,
    },
    params: {
        reward: ENEMY_REWARD,
        attack: ENEMY_ATTACK,
    },
    render(deltaMilliseconds: number) {
        if (this.isDead) {
            this.deadTime += deltaMilliseconds;
        }

        if (this.isDead) {
            return enemyDead(cameraMapping(this.position));
        }

        const rotation = getRotationRelatedToPlayer(this.position as Point);

        this.position.x += -rotation.cos * deltaMilliseconds * ENEMY_SPEED;
        this.position.y += -rotation.sin * deltaMilliseconds * ENEMY_SPEED;
        ({ x: this.position.x, y: this.position.y } = clipMap(
            this.position,
            DEAD_ENEMY_RADIUS,
        ));
        enemy(cameraMapping(this.position));
    },
});

const clipCenter = (position: Point, offset: number): Point => {
    if (
        isCollision(
            { ...position, radius: 0 },
            { ...gameMap.center, radius: offset },
        )
    ) {
        return {
            x: position.x + Math.sign(position.x - gameMap.center.x) * offset,
            y: position.y + Math.sign(position.y - gameMap.center.y) * offset,
        };
    }

    return position;
};

export const spawnEnemy = () => {
    const spawnCoordinates = clipCenter(
        clipMap(
            {
                x: Math.random() * game.canvas.width,
                y: Math.random() * game.canvas.height,
            },
            DEAD_ENEMY_RADIUS,
        ),
        MIN_SPAWN_RADIUS,
    );

    working.add(enemyWorker(spawnCoordinates));
};
