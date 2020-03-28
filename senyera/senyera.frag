#version 330 core

in vec4 frontColor;
out vec4 fragColor;

in vec2 vtexCoord;

void main()
{
    bool col = (int(mod(vtexCoord.s*9, 2)) == 1);
    fragColor = col ? vec4(1, 0, 0, 1) : vec4(1, 1, 0, 1);
}
