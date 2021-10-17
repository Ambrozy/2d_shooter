export const WELCOME_SCREEN = 'WELCOME_SCREEN';
export const GAME_SCREEN = 'GAME_SCREEN';
export const DEAD_SCREEN = 'DEAD_SCREEN';
export const WIN_SCREEN = 'WIN_SCREEN';

export type ScreenNameType =
    | typeof WELCOME_SCREEN
    | typeof GAME_SCREEN
    | typeof DEAD_SCREEN
    | typeof WIN_SCREEN;
