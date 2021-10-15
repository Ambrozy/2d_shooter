import {
    BonusWorker,
    BulletWorker,
    EnemyWorker,
    Worker,
    workManager,
} from '../../core/worker';
import { screenManager } from '../../core/screen';
import { camera, inverseCameraMapping } from '../../core/camera';
import {
    addKeyListeners,
    controls,
    MOUSE_LEFT_BUTTON,
    mouseButtonMap,
    removeKeyListeners,
} from '../../core/controls';
import { game, INITIAL_AMMUNITION, MAX_HEALTH } from '../../core/game';
import { getPlayerInstance, spawnPlayer } from '../../actors/player';
import { spawnEnemySpawner } from '../../actors/enemies/enemySpawner';
import { spawnBonusSpawner } from '../../actors/bonuses/bonusSpawner';
import { playerGun } from '../../actors/bullets/playerGun';
import {
    BONUS_WORKER_TYPE,
    BULLET_WORKER_TYPE,
    ENEMY_WORKER_TYPE,
    SPAWNER_WORKER_TYPE,
} from '../../actors/types';
import { getRotationRelatedToPlayer } from '../../utils/playerHelpers';
import { randomEdgePosition } from '../../utils/helpers';
import { DEAD_SCREEN, GAME_SCREEN, WIN_SCREEN } from '../types';
import { processCollision } from './collision';
import { context } from '../../core/context';

const onMouseMove = (e: MouseEvent) => {
    controls.mousePosition = inverseCameraMapping({
        x: e.offsetX,
        y: e.offsetY,
    });
    controls.mouseRotation = getRotationRelatedToPlayer(controls.mousePosition);
};
const onMouseDown = (e: MouseEvent) => {
    if (mouseButtonMap[e.button] === MOUSE_LEFT_BUTTON) {
        playerGun.shot();
    }
};

export const gameScreen = {
    name: GAME_SCREEN,
    render(deltaMilliseconds: number) {
        const playerInstance = getPlayerInstance();

        if (controls.pressedKeys.has('ArrowRight')) {
            playerInstance.moveRight();
        } else if (controls.pressedKeys.has('ArrowLeft')) {
            playerInstance.moveLeft();
        }
        if (controls.pressedKeys.has('ArrowUp')) {
            playerInstance.moveUp();
        } else if (controls.pressedKeys.has('ArrowDown')) {
            playerInstance.moveDown();
        }

        playerGun.render(deltaMilliseconds);

        const enemies = workManager.workers.filter(
            (worker: Worker) => worker.type === ENEMY_WORKER_TYPE,
        );
        const bullets = workManager.workers.filter(
            (worker: Worker) => worker.type === BULLET_WORKER_TYPE,
        );
        const bonuses = workManager.workers.filter(
            (worker: Worker) => worker.type === BONUS_WORKER_TYPE,
        );
        const spawners = workManager.workers.filter(
            (worker: Worker) => worker.type === SPAWNER_WORKER_TYPE,
        );

        processCollision(
            playerInstance,
            enemies as EnemyWorker[],
            bullets as BulletWorker[],
            bonuses as BonusWorker[],
        );

        if (playerInstance.removeCondition()) {
            screenManager.changeScreen(DEAD_SCREEN);
        }
        if (enemies.length === 0 && spawners.length === 0) {
            screenManager.changeScreen(WIN_SCREEN);
        }

        game.temporaryBonusManager.render(deltaMilliseconds);
        workManager.render(deltaMilliseconds);
    },
    constructor() {
        context.canvas.addEventListener('mousemove', onMouseMove);
        context.canvas.addEventListener('mousedown', onMouseDown);
        addKeyListeners();

        camera.reset();
        workManager.reset();
        spawnPlayer();
        spawnBonusSpawner();
        for (let i = 0; i < 100; i++) {
            spawnEnemySpawner(randomEdgePosition());
        }

        game.initStatistics({
            score: 0,
            health: INITIAL_AMMUNITION,
            ammunition: MAX_HEALTH,
        });
    },
    destructor() {
        context.canvas.removeEventListener('mousemove', onMouseMove);
        context.canvas.removeEventListener('mousedown', onMouseDown);
        removeKeyListeners();
    },
};
