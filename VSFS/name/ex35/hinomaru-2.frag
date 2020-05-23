#version 330 core

in vec4 frontColor;
out vec4 fragColor;

in vec2 vtexCoord;

uniform bool classic = false;
uniform vec4 RED = vec4(1, 0, 0, 1);
uniform vec4 WHITE = vec4(1);

void main()
{
    float dist = distance(vtexCoord, vec2(0.5, 0.5));
    if (classic == true) {
        fragColor = (dist < 0.2) ? RED: WHITE;
    }
    else {
        fragColor = WHITE;
        if (dist < 0.2) fragColor = RED;
        else {
            vec2 u = vtexCoord-vec2(0.5, 0.5);
            float angle = atan(u.t, u.s)*16/3.141592;
            if (mod(angle+0.5, 2) < 1) fragColor = RED;
        }
    }
}
