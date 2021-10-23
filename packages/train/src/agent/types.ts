import type { NextStateProps, getNextGameState } from '@ambrozy/game';

export type GameState = ReturnType<typeof getNextGameState>;
export type RowControlsState = {
    buttons: number[];
    mousePosition: NextStateProps['mousePosition'];
};
export type ControlsState = NextStateProps;

export interface Agent {
    nextState: (state: GameState) => ControlsState;
}
