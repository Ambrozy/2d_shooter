export const pressedKeys = new Set();

const onKeyDown = (e: KeyboardEvent) => {
    pressedKeys.add(e.key);
};
const onKeyUp = (e: KeyboardEvent) => {
    pressedKeys.delete(e.key);
};

export const addKeyboardListeners = () => {
    document.addEventListener('keydown', onKeyDown);
    document.addEventListener('keyup', onKeyUp);
};
export const removeKeyboardListeners = () => {
    document.removeEventListener('keydown', onKeyDown);
    document.removeEventListener('keyup', onKeyUp);
};
