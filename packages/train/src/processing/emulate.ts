import { Agent } from '../agent/types';
import {
    initGame,
    startGame,
    getNextGameState,
    DEAD_SCREEN,
    WIN_SCREEN,
} from '@ambrozy/game';

export const LOOSE = -1;
export const WIN = 1;
export const DEFAULT = 0;

export type emulateReturnType = {
    finalState: typeof LOOSE | typeof WIN | typeof DEFAULT;
    loops: number;
};

export const getInitialGameState = () =>
    getNextGameState({
        mousePosition: { x: 0, y: 0 },
        buttons: [false, false, false, false, false, false],
        deltaMilliseconds: 0,
    });

export const gameLoop = (
    agent: Agent,
    prevGameState: ReturnType<typeof getNextGameState>,
) => {
    const gameControls = agent.nextState(prevGameState);
    return getNextGameState(gameControls);
};

export const prepareEnvironment = () => {
    const canvas = document.getElementById('game') as HTMLCanvasElement;

    canvas.width = 600;
    canvas.height = 400;
    initGame(canvas);
    startGame();
};

export const emulate = (agent: Agent, loops: number): emulateReturnType => {
    let gameState = getInitialGameState();

    for (let i = 0; i < loops; i++) {
        gameState = gameLoop(agent, gameState);

        if (gameState.screen === DEAD_SCREEN) {
            return { finalState: -1, loops: i + 1 };
        }
        if (gameState.screen === WIN_SCREEN) {
            return { finalState: 1, loops: i + 1 };
        }
    }

    return { finalState: 0, loops };
};

export const emulateAsync = (
    agent: Agent,
    loops: number,
): Promise<emulateReturnType> => {
    let iteration = 0;
    let gameState = getInitialGameState();

    function loop(resolve: (value: emulateReturnType) => void) {
        setTimeout(() => {
            gameState = gameLoop(agent, gameState);
            iteration++;

            if (iteration < loops) {
                if (gameState.screen === DEAD_SCREEN) {
                    resolve({ finalState: -1, loops: iteration + 1 });
                } else if (gameState.screen === WIN_SCREEN) {
                    resolve({ finalState: 1, loops: iteration + 1 });
                } else {
                    loop(resolve);
                }
            } else {
                resolve({ finalState: 0, loops });
            }
        }, 0);
    }

    // eslint-disable-next-line compat/compat
    return new Promise<emulateReturnType>((resolve) => {
        loop(resolve);
    });
};
