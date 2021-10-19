import { forEachKeys } from '../utils/typed';
import {
    BONUS_ACTION_TIME,
    BonusState,
    EXP_SPEED_BONUS,
    SPEED_BONUS,
    TemporaryBonusNames,
    UNTOUCHABLE_BONUS,
} from './types';
import { statisticsRenderer } from './statisticsRenderer';

export const PLAYER_SPEED = 2.5;

export interface GameState {
    score: number;
    health: number;
    ammunition: number;
    bonuses: Partial<Record<TemporaryBonusNames, BonusState>>;
    __updateHTML: () => void;
    readonly addBonus: (
        bonusName: TemporaryBonusNames,
        value?: number,
        timeLimit?: number,
    ) => void;
    readonly getPlayerSpeed: () => number;
    readonly getBonusValue: (
        bonusName: TemporaryBonusNames,
    ) => number | undefined;
    readonly updateScore: (delta: number) => void;
    readonly updateAmmo: (delta: number) => void;
    readonly updateHealth: (delta: number) => void;
    readonly render: (deltaMilliseconds: number) => void;
}

export const game: GameState = {
    score: 0,
    health: 100,
    ammunition: 100,
    bonuses: {},
    __updateHTML() {
        statisticsRenderer.update(this);
    },
    getPlayerSpeed() {
        return PLAYER_SPEED * (this.getBonusValue(SPEED_BONUS) || 1);
    },
    getBonusValue(bonusName: TemporaryBonusNames) {
        return this.bonuses[bonusName]?.value;
    },
    addBonus(
        bonusName: TemporaryBonusNames,
        value = 1,
        timeLimit = BONUS_ACTION_TIME,
    ) {
        this.bonuses[bonusName] = {
            actionTime: 0,
            timeLimit,
            value,
        };
    },
    updateScore(delta: number) {
        this.score += (this.getBonusValue(EXP_SPEED_BONUS) || 1) * delta;
    },
    updateAmmo(delta: number) {
        this.ammunition += delta;
    },
    updateHealth(delta: number) {
        if (delta < 0 && this.getBonusValue(UNTOUCHABLE_BONUS)) {
            return;
        }

        this.health += delta;
        this.health = Math.min(this.health, 100);
    },
    render(deltaMilliseconds: number) {
        forEachKeys(this.bonuses, (bonusName: TemporaryBonusNames) => {
            this.bonuses[bonusName].actionTime += deltaMilliseconds;

            if (
                this.bonuses[bonusName].actionTime >=
                this.bonuses[bonusName].timeLimit
            ) {
                delete this.bonuses[bonusName];
            }
        });
        this.__updateHTML();
    },
};
