import { game, Point } from '../core/game';
import {
    clipCanvas,
    getRotationRelatedToCenter,
    isCollision,
} from '../utils/helpers';
import { getEmptyWorker, working } from '../core/worker';
import { ENEMY_WORKER_TYPE } from './types';

export const ENEMY_RADIUS = 7;
export const ENEMY_COLOR = '#dd3d3d';
export const ENEMY_SPEED = 0.01;
export const DEAD_ENEMY_RADIUS = 4;
export const MIN_SPAWN_RADIUS = 300;

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

const emptyWorker = getEmptyWorker();

export const enemyWorker = ({ x, y }: EnemyProps) => ({
    ...emptyWorker,
    type: ENEMY_WORKER_TYPE,
    deadAnimationTime: 100,
    position: {
        x,
        y,
        radius: ENEMY_RADIUS,
    },
    render(deltaMilliseconds: number) {
        if (this.isDead) {
            this.deadTime += deltaMilliseconds;
        }

        if (this.isDead) {
            return enemyDead(this.position);
        }

        const rotation = getRotationRelatedToCenter(this.position as Point);

        this.position.x += -rotation.cos * deltaMilliseconds * ENEMY_SPEED;
        this.position.y += -rotation.sin * deltaMilliseconds * ENEMY_SPEED;
        ({ x: this.position.x, y: this.position.y } = clipCanvas(
            this.position,
            DEAD_ENEMY_RADIUS,
        ));
        enemy(this.position);
    },
});

const clipCenter = (position: Point, offset: number): Point => {
    if (
        isCollision(
            { ...position, radius: 0 },
            { ...game.center, radius: offset },
        )
    ) {
        return {
            x: position.x + Math.sign(position.x - game.center.x) * offset,
            y: position.y + Math.sign(position.y - game.center.y) * offset,
        };
    }

    return position;
};

export const spawnEnemy = () => {
    const spawnCoordinates = clipCenter(
        clipCanvas(
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
