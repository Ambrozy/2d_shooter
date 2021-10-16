import { Point, Rotation } from '../core/types';
import {
    getEmptyWorker,
    PlayerWorker,
    processDead,
    workManager,
} from '../core/worker';
import {
    camera,
    cameraMapping,
    gameMap,
    MAP_HEIGHT,
    MAP_WIDTH,
} from '../core/camera';
import { context } from '../core/context';
import { controls } from '../core/controls';
import { game } from '../core/game';
import {
    UNTOUCHABLE_BONUS,
    UNTOUCHABLE_BORDER_COLOR,
} from '../core/bonusManager';
import { drawCircle, drawDonut } from '../utils/paint';
import { BACKGROUND_COLOR } from '../constants';
import { PLAYER_WORKER_TYPE } from './types';

export const PLAYER_RADIUS = 12;
export const PLAYER_COLOR = '#91e1ff';
export const PLAYER_GUN_RADIUS = 5;
export const PLAYER_GUN_COLOR = '#ff8484';
export const DEAD_PLAYER_RADIUS = 8;

export interface PlayerProps {
    position: Point;
    gunRotation: Rotation;
}

export const player = ({
    position: { x, y },
    gunRotation: { sin, cos },
}: PlayerProps) => {
    if (game.getBonusValue(UNTOUCHABLE_BONUS)) {
        drawCircle({ x, y }, PLAYER_RADIUS + 2, UNTOUCHABLE_BORDER_COLOR);
        drawCircle({ x, y }, PLAYER_RADIUS + 1, BACKGROUND_COLOR);
    }

    drawCircle({ x, y }, PLAYER_RADIUS, PLAYER_COLOR);
    drawCircle(
        { x: x + cos * PLAYER_RADIUS, y: y + sin * PLAYER_RADIUS },
        PLAYER_GUN_RADIUS,
        PLAYER_GUN_COLOR,
    );
};

export const playerDead = (position: Point) => {
    drawDonut(position, PLAYER_RADIUS, DEAD_PLAYER_RADIUS, PLAYER_COLOR);
};

export const playerWorker = ({ x, y }: Point) => ({
    ...getEmptyWorker(),
    type: PLAYER_WORKER_TYPE,
    deadAnimationTime: 100,
    position: {
        x,
        y,
        radius: PLAYER_RADIUS,
    },
    render(deltaMilliseconds: number) {
        processDead(this)(deltaMilliseconds);
        if (this.isDead) {
            return playerDead(cameraMapping(this.position));
        }

        player({
            position: cameraMapping(this.position),
            gunRotation: controls.mouseRotation,
        });
    },
    moveRight() {
        if (this.position.x >= context.canvas.width / 2) {
            camera.moveRight();
        }
        this.position.x += game.getPlayerSpeed();
        this.position.x = Math.min(MAP_WIDTH - PLAYER_RADIUS, this.position.x);
    },
    moveLeft() {
        if (this.position.x <= MAP_WIDTH - context.canvas.width / 2) {
            camera.moveLeft();
        }
        this.position.x -= game.getPlayerSpeed();
        this.position.x = Math.max(PLAYER_RADIUS, this.position.x);
    },
    moveUp() {
        if (this.position.y <= MAP_HEIGHT - context.canvas.width / 2) {
            camera.moveUp();
        }
        this.position.y -= game.getPlayerSpeed();
        this.position.y = Math.max(PLAYER_RADIUS, this.position.y);
    },
    moveDown() {
        if (this.position.y >= context.canvas.width / 2) {
            camera.moveDown();
        }
        this.position.y += game.getPlayerSpeed();
        this.position.y = Math.min(MAP_HEIGHT - PLAYER_RADIUS, this.position.y);
    },
});

let playerInstance: PlayerWorker = playerWorker(gameMap.center);

export const getPlayerInstance = () => playerInstance;

export const spawnPlayer = () => {
    playerInstance = playerWorker(gameMap.center);
    workManager.add(playerInstance);
};
