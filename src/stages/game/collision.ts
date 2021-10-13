import {
    BonusWorker,
    BulletWorker,
    EnemyWorker,
    PlayerWorker,
} from '../../core/worker';
import { game } from '../../core/game';
import { isCollision } from '../../utils/helpers';
import { FREEZE_BONUS } from '../../core/bonusManager';

const FREEZE_DAMAGE_FACTOR = 2;

export const processCollision = (
    player: PlayerWorker,
    enemies: EnemyWorker[],
    bullets: BulletWorker[],
    bonuses: BonusWorker[],
) => {
    enemies.forEach((enemy) => {
        bullets.forEach((bullet) => {
            if (!enemy.isDead && isCollision(bullet.position, enemy.position)) {
                const multiplier = game.getBonusValue(FREEZE_BONUS)
                    ? FREEZE_DAMAGE_FACTOR
                    : 1;

                enemy.params.health -= bullet.params.attack * multiplier;
                bullet.isDead = true;

                if (enemy.params.health <= 0) {
                    game.updateScore(enemy.params.reward);
                    enemy.isDead = true;
                    enemy.onDead();
                }
            }
        });

        if (!enemy.isDead && isCollision(player.position, enemy.position)) {
            game.updateHealth(-enemy.params.attack);

            if (game.health <= 0) {
                player.isDead = true;
            }
        }
    });

    bonuses.forEach((bonus) => {
        if (!bonus.isDead && isCollision(player.position, bonus.position)) {
            bonus.isDead = true;
            bonus.onBonus();
        }
    });
};
