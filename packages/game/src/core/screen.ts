import { clearScreen } from '../utils/paint';

export interface ScreenInstance {
    name: string;
    render: (deltaMilliseconds: number) => void;
    constructor: () => void;
    destructor: () => void;
}

export interface ScreenManager {
    readonly screen: ScreenInstance;
    readonly changeScreen: (nextScreen: string) => void;
    readonly registerScreen: (screen: ScreenInstance) => void;
    readonly clearScreen: () => void;
}

const screens: Record<string, ScreenInstance> = {};

export const BACKGROUND_COLOR = '#000';

export const screenManager: ScreenManager = {
    screen: undefined,
    changeScreen(nextScreen: string) {
        if (this.screen) {
            this.screen.destructor();
        }
        if (screens[nextScreen]) {
            this.screen = screens[nextScreen];
            this.screen.constructor();
        } else {
            console.error(`Register screen '${nextScreen}' before use`);
        }
    },
    registerScreen(screen: ScreenInstance) {
        screens[screen.name] = screen;
    },
    clearScreen() {
        clearScreen(BACKGROUND_COLOR);
    },
};
