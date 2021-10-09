export const pressedKeys = new Set();

export const addKeyboardListeners = () => {
    document.addEventListener('keydown', (e) => {
        pressedKeys.add(e.key);
    });

    document.addEventListener('keyup', (e) => {
        pressedKeys.delete(e.key);
    });
};
