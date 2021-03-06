import { screenManager } from './core/screen';
import { ScreenNameType, GAME_SCREEN, WELCOME_SCREEN } from './stages/types';
import { welcomeScreen } from './stages/welcome';
import { gameScreen, onMouseDown, onMouseMove } from './stages/game/game';
import { deadScreen } from './stages/dead';
import { winScreen } from './stages/win';
import { context } from './core/context';
import { game } from './core/game';
import { controls, MOUSE_LEFT_BUTTON } from './core/controls';
import {
    TemporaryBonusNames,
    BonusState,
    Point,
    SPEED_BONUS,
    EXP_SPEED_BONUS,
    FREEZE_BONUS,
    UNTOUCHABLE_BONUS,
    TELEKINESIS_BONUS,
} from './core/types';
import { playerGun } from './actors/bullets/playerGun';
import {
    GUN_PISTOL,
    GUN_MINIGUN,
    GUN_SHOOTGUN,
    GunName,
} from './actors/bullets/constants';

import './index.scss';

export * from './stages/types';

export const possibleButtons = [
    MOUSE_LEFT_BUTTON,
    'ArrowRight',
    'ArrowLeft',
    'ArrowUp',
    'ArrowDown',
    'Enter',
];
export const possibleBonuses = [
    SPEED_BONUS,
    EXP_SPEED_BONUS,
    FREEZE_BONUS,
    UNTOUCHABLE_BONUS,
    TELEKINESIS_BONUS,
];
export const possibleGuns = [GUN_PISTOL, GUN_MINIGUN, GUN_SHOOTGUN];

const playerGunMap: Record<GunName, [number, number, number]> = {
    GUN_PISTOL: [1, 0, 0],
    GUN_MINIGUN: [0, 1, 0],
    GUN_SHOOTGUN: [0, 0, 1],
};

export interface NextStateProps {
    /**
     * Effects the game speed in milliseconds
     * 16 ms equal 60 fps
     *
     * @default 16
     */
    deltaMilliseconds?: number;
    /**
     * Current mouse position { x: number, y: number }
     */
    mousePosition: Point;
    /**
     * Array of pressed buttons
     * @default new Set()
     */
    buttons: [
        boolean, // 'MouseLeft'
        boolean, // 'ArrowRight'
        boolean, // 'ArrowLeft'
        boolean, // 'ArrowUp'
        boolean, // 'ArrowDown'
        boolean, // 'Enter'
    ];
}

/**
 * Setup screen and game settings
 * @param canvas
 */
export const initGame = (canvas: HTMLCanvasElement) => {
    context.constructor(canvas);
    game.useHTMLRendering = false;

    screenManager.registerScreen(welcomeScreen);
    screenManager.registerScreen(gameScreen);
    screenManager.registerScreen(deadScreen);
    screenManager.registerScreen(winScreen);
    screenManager.changeScreen(WELCOME_SCREEN);
};

/**
 * Turn on the game screen
 */
export const startGame = () => {
    screenManager.changeScreen(GAME_SCREEN);
};

/**
 * Process one frame of game
 *
 * @params control state & deltaMilliseconds
 * @return game state
 */
export const getNextGameState = ({
    mousePosition,
    buttons,
    deltaMilliseconds = 16,
}: NextStateProps) => {
    // setup controls
    controls.pressedKeys.clear();
    buttons.forEach((button, index) => {
        if (button) {
            controls.pressedKeys.add(possibleButtons[index]);
        }
    });
    // emulate mouse events
    if (screenManager.screen?.name === GAME_SCREEN) {
        onMouseMove({
            offsetX: mousePosition.x,
            offsetY: mousePosition.y,
        } as MouseEvent);
        // MouseLeft
        if (buttons[0]) {
            onMouseDown({ button: 0 } as MouseEvent);
        }
    }

    // process frame
    screenManager.clearScreen();
    screenManager.screen?.render(deltaMilliseconds);

    // get state after render
    const image = context.context.getImageData(
        0,
        0,
        context.canvas.width,
        context.canvas.height,
    );

    const bonuses = game.bonuses as Record<TemporaryBonusNames, BonusState>;
    const bonusTimes = possibleBonuses.map((bonusName: TemporaryBonusNames) =>
        bonuses[bonusName]
            ? bonuses[bonusName].timeLimit - bonuses[bonusName].actionTime
            : 0,
    );

    return {
        image,
        bonusTimes,
        score: game.score,
        health: game.health,
        ammunition: game.ammunition,
        gun: playerGunMap[playerGun.gunName],
        speed: game.getPlayerSpeed(),
        screen: screenManager.screen?.name as ScreenNameType,
    };
};
