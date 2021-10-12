import {
    bonusManager,
    BonusManger,
    TemporaryBonusNames,
    UNTOUCHABLE_BONUS,
    EXP_SPEED_BONUS,
    SPEED_BONUS,
} from './bonusManager';

const statisticElement = document.getElementById('statistic');
const scoreElement = document.getElementsByClassName('score')[0];
const ammunitionElement = document.getElementsByClassName('ammunition')[0];
const healthElement = document.getElementsByClassName('health-bar')[0];

export const MAX_HEALTH = 100;
export const INITIAL_AMMUNITION = 100;
export const PLAYER_SPEED = 2.5;

export interface GameState {
    readonly score: number;
    readonly health: number;
    readonly ammunition: number;
    readonly playerSpeed: number;
    readonly temporaryBonusManager: BonusManger;
    readonly getPlayerSpeed: () => number;
    readonly getBonusValue: (
        bonusName: TemporaryBonusNames,
    ) => number | undefined;
    readonly updateScore: (delta: number) => void;
    readonly updateAmmo: (delta: number) => void;
    readonly updateHealth: (delta: number) => void;
    readonly initStatistics: (
        stats: Pick<GameState, 'score' | 'health' | 'ammunition'>,
    ) => void;
    readonly hideStatistics: () => void;
}

export const game: GameState = {
    score: 0,
    health: MAX_HEALTH,
    ammunition: INITIAL_AMMUNITION,
    playerSpeed: PLAYER_SPEED,
    temporaryBonusManager: bonusManager,
    getPlayerSpeed() {
        return this.playerSpeed * (this.getBonusValue(SPEED_BONUS) || 1);
    },
    getBonusValue(bonusName: TemporaryBonusNames) {
        return this.temporaryBonusManager.bonuses[bonusName]?.value;
    },
    updateScore(delta: number) {
        this.score += (this.getBonusValue(EXP_SPEED_BONUS) || 1) * delta;
        scoreElement.innerHTML = `Score: ${this.score}`;
    },
    updateAmmo(delta: number) {
        this.ammunition += delta;
        ammunitionElement.innerHTML = `Ammunition: ${this.ammunition}`;
    },
    updateHealth(delta: number) {
        if (delta < 0 && this.getBonusValue(UNTOUCHABLE_BONUS)) {
            return;
        }

        this.health += delta;
        this.health = Math.min(this.health, 100);
        (healthElement as HTMLElement).style.transform = `translateX(-${
            100 - this.health
        }%)`;
    },
    initStatistics({ score, health, ammunition }) {
        this.score = score;
        this.health = health;
        this.ammunition = ammunition;
        this.temporaryBonusManager.reset();
        this.updateScore(0);
        this.updateAmmo(0);
        this.updateHealth(0);
        statisticElement.style.display = 'block';
    },
    hideStatistics() {
        statisticElement.style.display = 'none';
    },
};
