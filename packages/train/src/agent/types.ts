import type { NextStateProps, getNextGameState } from '@ambrozy/game';

export interface Agent {
    nextState: (state: ReturnType<typeof getNextGameState>) => NextStateProps;
}
