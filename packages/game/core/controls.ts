import { Point, Rotation } from './types';

export const MOUSE_LEFT_BUTTON = 'MouseLeft';
export const MOUSE_MIDDLE_BUTTON = 'MouseMiddle';
export const MOUSE_RIGHT_BUTTON = 'MouseRight';

export const mouseButtonMap: Record<number, string> = {
    0: MOUSE_LEFT_BUTTON,
    1: MOUSE_MIDDLE_BUTTON,
    2: MOUSE_RIGHT_BUTTON,
};

export interface ControlManger {
    readonly pressedKeys: Set<string>;
    mousePosition: Point;
    mouseRotation: Rotation;
}

export const controls: ControlManger = {
    pressedKeys: new Set<string>(),
    mousePosition: { x: 0, y: 0 },
    mouseRotation: { sin: 0, cos: 1 },
};

const onMouseDown = (e: MouseEvent) => {
    if (mouseButtonMap[e.button]) {
        controls.pressedKeys.add(mouseButtonMap[e.button]);
    }
};

const onMouseUp = (e: MouseEvent) => {
    if (mouseButtonMap[e.button]) {
        controls.pressedKeys.delete(mouseButtonMap[e.button]);
    }
};

const onKeyDown = (e: KeyboardEvent) => {
    controls.pressedKeys.add(e.key);
};

const onKeyUp = (e: KeyboardEvent) => {
    controls.pressedKeys.delete(e.key);
};

export const addKeyListeners = () => {
    document.addEventListener('keydown', onKeyDown);
    document.addEventListener('keyup', onKeyUp);
    document.addEventListener('mousedown', onMouseDown);
    document.addEventListener('mouseup', onMouseUp);
};

export const removeKeyListeners = () => {
    document.removeEventListener('keydown', onKeyDown);
    document.removeEventListener('keyup', onKeyUp);
    document.removeEventListener('mousedown', onMouseDown);
    document.removeEventListener('mouseup', onMouseUp);
};
