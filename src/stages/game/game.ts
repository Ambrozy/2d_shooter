import {
    pressedKeys,
    addKeyboardListeners,
    removeKeyboardListeners,
} from '../../core/keyboard';
import { game, INITIAL_AMMUNITION, MAX_HEALTH } from '../../core/game';
import {
    BonusWorker,
    EnemyWorker,
    Worker,
    workManager,
} from '../../core/worker';
import { screenManager } from '../../core/screen';
import { camera, inverseCameraMapping } from '../../core/camera';
import { getPlayerInstance, spawnPlayer } from '../../actors/player';
import { spawnBullet } from '../../actors/bullet';
import { spawnEnemySpawner } from '../../actors/enemySpawner';
import {
    BONUS_WORKER_TYPE,
    BULLET_WORKER_TYPE,
    ENEMY_WORKER_TYPE,
    SPAWNER_WORKER_TYPE,
} from '../../actors/types';
import {
    showStatistics,
    updateAmmo,
    updateHealth,
    updateScore,
} from '../../utils/statistic';
import { getRotationRelatedToPlayer } from '../../utils/playerHelpers';
import { randomPosition } from '../../utils/helpers';
import { DEAD_SCREEN, GAME_SCREEN, WIN_SCREEN } from '../types';
import { processCollision } from './collision';
import { spawnBonusSpawner } from '../../actors/bonuses/bonusSpawner';

const onMouseMove = (e: MouseEvent) => {
    game.mousePosition = inverseCameraMapping({
        x: e.offsetX,
        y: e.offsetY,
    });
    game.mouseRotation = getRotationRelatedToPlayer(game.mousePosition);
};
const onMouseDown = () => {
    if (game.ammunition > 0) {
        spawnBullet();
        updateAmmo(-1);
    }
};

export const gameScreen = {
    name: GAME_SCREEN,
    render(deltaMilliseconds: number) {
        const playerInstance = getPlayerInstance();

        if (pressedKeys.has('ArrowRight')) {
            playerInstance.moveRight();
        } else if (pressedKeys.has('ArrowLeft')) {
            playerInstance.moveLeft();
        }
        if (pressedKeys.has('ArrowUp')) {
            playerInstance.moveUp();
        } else if (pressedKeys.has('ArrowDown')) {
            playerInstance.moveDown();
        }

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
            bullets,
            bonuses as BonusWorker[],
        );

        if (playerInstance.removeCondition()) {
            screenManager.changeScreen(DEAD_SCREEN);
        }
        if (enemies.length === 0 && spawners.length === 0) {
            screenManager.changeScreen(WIN_SCREEN);
        }

        workManager.render(deltaMilliseconds);
    },
    constructor() {
        game.canvas.addEventListener('mousemove', onMouseMove);
        game.canvas.addEventListener('mousedown', onMouseDown);
        addKeyboardListeners();

        camera.reset();
        workManager.reset();
        spawnPlayer();
        spawnBonusSpawner();
        for (let i = 0; i < 100; i++) {
            spawnEnemySpawner(randomPosition());
        }

        game.score = 0;
        game.ammunition = INITIAL_AMMUNITION;
        game.health = MAX_HEALTH;
        updateScore(0);
        updateAmmo(0);
        updateHealth(0);
        showStatistics();
    },
    destructor() {
        game.canvas.removeEventListener('mousemove', onMouseMove);
        game.canvas.removeEventListener('mousedown', onMouseDown);
        removeKeyboardListeners();
    },
};
