import {
    pressedKeys,
    addKeyboardListeners,
    removeKeyboardListeners,
} from '../core/keyboard';
import { game, INITIAL_AMMUNITION, MAX_HEALTH } from '../core/game';
import { Worker, workManager } from '../core/worker';
import { screenManager } from '../core/screen';
import { camera, inverseCameraMapping } from '../core/camera';
import { getPlayerInstance, spawnPlayer } from '../actors/player';
import { spawnBullet } from '../actors/bullet';
import { spawnEnemy } from '../actors/enemy';
import { BULLET_WORKER_TYPE, ENEMY_WORKER_TYPE } from '../actors/types';
import {
    showStatistics,
    updateAmmo,
    updateHealth,
    updateScore,
} from '../utils/statistic';
import { getRotationRelatedToPlayer } from '../utils/playerHelpers';
import { isCollision } from '../utils/helpers';
import { DEAD_SCREEN, GAME_SCREEN, WIN_SCREEN } from './types';

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
        updateAmmo(1);
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

        if (playerInstance.removeCondition()) {
            screenManager.changeScreen(DEAD_SCREEN);
        }

        const enemies = workManager.workers.filter(
            (worker: Worker) => worker.type === ENEMY_WORKER_TYPE,
        );
        const bullets = workManager.workers.filter(
            (worker: Worker) => worker.type === BULLET_WORKER_TYPE,
        );

        enemies.forEach((enemy: Worker) => {
            bullets.forEach((bullet: Worker) => {
                if (
                    !bullet.isDead &&
                    !enemy.isDead &&
                    isCollision(bullet.position, enemy.position)
                ) {
                    enemy.isDead = true;
                    bullet.isDead = true;
                    updateScore(enemy.params.reward as number);
                }
            });

            if (
                !enemy.isDead &&
                isCollision(playerInstance.position, enemy.position)
            ) {
                if (game.health <= 0) {
                    playerInstance.isDead = true;
                }
                updateHealth(enemy.params.attack as number);
            }
        });

        if (enemies.length === 0) {
            screenManager.changeScreen(WIN_SCREEN);
        }

        workManager.workers.forEach((worker) => {
            worker.render(deltaMilliseconds);
        });
        workManager.update();
    },
    constructor() {
        game.canvas.addEventListener('mousemove', onMouseMove);
        game.canvas.addEventListener('mousedown', onMouseDown);
        addKeyboardListeners();

        workManager.clear();
        spawnPlayer();
        for (let i = 0; i < 10; i++) {
            spawnEnemy();
        }

        camera.reset();
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
