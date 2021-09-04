import { createProgramFromSources } from './shader';
import vs from './circleVertex.glsl';
import fs from './circleFragment.glsl';
import { GameInstance } from './gl';

type DrawCircleParams = {
    x: number;
    y: number;
    r: number;
    color: number[];
};

export const drawCircle = (game: GameInstance, params: DrawCircleParams) => {
    const gl = game.gl;
    const program = createProgramFromSources(gl, vs, fs);

    gl.useProgram(program);

    const ATTRIBUTES = 5;
    let j = 0;
    const data = [];

    data[j++] = params.x - params.r;
    data[j++] = params.y - params.r;
    data[j++] = params.x;
    data[j++] = params.y;
    data[j++] = params.r;

    data[j++] = params.x + (1 + Math.sqrt(2)) * params.r;
    data[j++] = params.y - params.r;
    data[j++] = params.x;
    data[j++] = params.y;
    data[j++] = params.r;

    data[j++] = params.x - params.r;
    data[j++] = params.y + (1 + Math.sqrt(2)) * params.r;
    data[j++] = params.x;
    data[j++] = params.y;
    data[j++] = params.r;

    const dataBuffer = new Float32Array(data);

    const buffer = gl.createBuffer();

    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, dataBuffer, gl.STATIC_DRAW);

    const resolutionLocation = gl.getUniformLocation(program, 'u_resolution');
    const colorLocation = gl.getUniformLocation(program, 'u_color');

    gl.uniform2f(resolutionLocation, game.width, game.height);
    gl.uniform4fv(colorLocation, params.color);

    const positionLocation = gl.getAttribLocation(program, 'a_position');
    const centerLocation = gl.getAttribLocation(program, 'a_center');
    const radiusLocation = gl.getAttribLocation(program, 'a_radius');

    gl.enableVertexAttribArray(positionLocation);
    gl.enableVertexAttribArray(centerLocation);
    gl.enableVertexAttribArray(radiusLocation);

    gl.vertexAttribPointer(
        positionLocation,
        2,
        gl.FLOAT,
        false,
        ATTRIBUTES * Float32Array.BYTES_PER_ELEMENT,
        0,
    );
    gl.vertexAttribPointer(
        centerLocation,
        2,
        gl.FLOAT,
        false,
        ATTRIBUTES * Float32Array.BYTES_PER_ELEMENT,
        8,
    );
    gl.vertexAttribPointer(
        radiusLocation,
        1,
        gl.FLOAT,
        false,
        ATTRIBUTES * Float32Array.BYTES_PER_ELEMENT,
        16,
    );

    gl.drawArrays(gl.TRIANGLES, 0, data.length / ATTRIBUTES);
};
