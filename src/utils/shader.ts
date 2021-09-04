export const compileShader = (
    gl: WebGLRenderingContext,
    type: 'vertex' | 'fragment',
    source: string,
) => {
    const shader = gl.createShader(
        type === 'vertex' ? gl.VERTEX_SHADER : gl.FRAGMENT_SHADER,
    );

    gl.shaderSource(shader, source);
    gl.compileShader(shader);

    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.warn(
            'could not compile ' +
                type +
                ' shader:\n\n' +
                gl.getShaderInfoLog(shader),
        );
        gl.deleteShader(shader);

        return null;
    } else {
        return shader;
    }
};

export const createProgram = (
    gl: WebGLRenderingContext,
    compiled_vs: WebGLShader,
    compiled_fs: WebGLShader,
) => {
    const program = gl.createProgram();

    gl.attachShader(program, compiled_vs);
    gl.attachShader(program, compiled_fs);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
        console.warn('could not link the shader program!');
        gl.deleteProgram(program);
        gl.deleteProgram(compiled_vs);
        gl.deleteProgram(compiled_fs);

        return null;
    }

    return program;
};

export const createProgramFromSources = (
    gl: WebGLRenderingContext,
    vertexShader: string,
    fragmentShader: string,
) => {
    const compiled_vs = compileShader(gl, 'vertex', vertexShader);
    const compiled_fs = compileShader(gl, 'fragment', fragmentShader);

    if (!compiled_fs || !compiled_vs) return null;

    return createProgram(gl, compiled_vs, compiled_fs);
};
