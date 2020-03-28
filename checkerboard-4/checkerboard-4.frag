#version 330 core

in vec4 frontColor;
out vec4 fragColor;

in vec2 vtexCoord;

uniform float n = 8;

void main()
{
    float row = fract(vtexCoord.s*n);
    float col = fract(vtexCoord.t*n);
    if (min(row, col) <= 0.1) fragColor = vec4(1, 0, 0, 1);
    else discard;
}

