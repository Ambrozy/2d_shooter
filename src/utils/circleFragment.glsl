precision mediump float;

varying vec2 center;
varying vec2 resolution;
varying float radius;
uniform vec4 u_color;

void main() {
    float x = gl_FragCoord.x;
    float y = resolution[1] - gl_FragCoord.y;

    float dx = center[0] - x;
    float dy = center[1] - y;
    float distance = sqrt(dx*dx + dy*dy);

    if ( distance < radius )
        gl_FragColor = u_color;
    else
        gl_FragColor = vec4(0.0, 0.0, 0.0, 0.0);

}
