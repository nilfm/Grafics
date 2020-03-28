#version 330 core

in vec4 frontColor;
out vec4 fragColor;

in vec2 vtexCoord;

void main()
{
    int row = int(mod(vtexCoord.s*8, 2));
    int col = int(mod(vtexCoord.t*8, 2));
    if (row != col) fragColor = vec4(0.0);
    else fragColor = vec4(0.8);
}
