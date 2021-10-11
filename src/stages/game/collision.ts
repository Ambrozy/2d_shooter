import {
    BonusWorker,
    EnemyWorker,
    PlayerWorker,
    Worker,
} from '../../core/worker';
import { isCollision } from '../../utils/helpers';
import { updateHealth, updateScore } from '../../utils/statistic';
import { game } from '../../core/game';

export const processCollision = (
    player: PlayerWorker,
    enemies: EnemyWorker[],
    bullets: Worker[],
    bonuses: BonusWorker[],
) => {
    enemies.forEach((enemy) => {
        bullets.forEach((bullet) => {
            if (!enemy.isDead && isCollision(bullet.position, enemy.position)) {
                enemy.isDead = true;
                bullet.isDead = true;
                updateScore(enemy.params.reward);
            }
        });

        if (!enemy.isDead && isCollision(player.position, enemy.position)) {
            if (game.health <= 0) {
                player.isDead = true;
            }
            updateHealth(-enemy.params.attack);
        }
    });

    bonuses.forEach((bonus) => {
        if (!bonus.isDead && isCollision(player.position, bonus.position)) {
            bonus.isDead = true;
            bonus.onBonus();
        }
    });
};
