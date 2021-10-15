import {
    BonusWorker,
    BulletWorker,
    EnemyWorker,
    PlayerWorker,
} from '../../core/worker';
import { game } from '../../core/game';
import { isCollision, isLineCollision } from '../../utils/helpers';
import { FREEZE_BONUS } from '../../core/bonusManager';

const FREEZE_DAMAGE_FACTOR = 2;

const isBulletCollision = (bullet: BulletWorker, enemy: EnemyWorker) => {
    if (!bullet.params.isLine) {
        return isCollision(bullet.position, enemy.position);
    }

    return isLineCollision(
        bullet.position,
        bullet.getSecondPosition(),
        enemy.position,
    );
};

export const processCollision = (
    player: PlayerWorker,
    enemies: EnemyWorker[],
    bullets: BulletWorker[],
    bonuses: BonusWorker[],
) => {
    enemies.forEach((enemy) => {
        bullets.forEach((bullet) => {
            if (!enemy.isDead && isBulletCollision(bullet, enemy)) {
                const multiplier = game.getBonusValue(FREEZE_BONUS)
                    ? FREEZE_DAMAGE_FACTOR
                    : 1;

                enemy.params.health -= bullet.getDamage(enemy) * multiplier;
                bullet.isDead = true;
                bullet.deadTime = Infinity;

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
