import './index.scss';

window.onload = () => {
    const gl = document.querySelector('canvas').getContext('webgl');

    gl.clearColor(0.4, 0.4, 0.4, 1);
    gl.clear(gl.COLOR_BUFFER_BIT);
};
