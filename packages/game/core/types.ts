export const SPEED_BONUS = 'SPEED_BONUS';
export const EXP_SPEED_BONUS = 'EXP_SPEED_BONUS';
export const FREEZE_BONUS = 'FREEZE_BONUS';
export const UNTOUCHABLE_BONUS = 'UNTOUCHABLE_BONUS';
export const TELEKINESIS_BONUS = 'TELEKINESIS_BONUS';
export const BONUS_ACTION_TIME = 10000; // 10 seconds
export const FREEZE_BORDER_COLOR = '#5791d3';
export const UNTOUCHABLE_BORDER_COLOR = '#ffbc00';

export type TemporaryBonusNames =
    | typeof SPEED_BONUS
    | typeof EXP_SPEED_BONUS
    | typeof FREEZE_BONUS
    | typeof UNTOUCHABLE_BONUS
    | typeof TELEKINESIS_BONUS;

export interface BonusState {
    actionTime: number;
    timeLimit: number;
    value: number;
}

export type Point = {
    x: number;
    y: number;
};

export type Circle = Point & {
    radius: number;
};

export type Rotation = {
    cos: number;
    sin: number;
};
