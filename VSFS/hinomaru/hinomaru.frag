#version 330 core

in vec4 frontColor;
out vec4 fragColor;

in vec2 vtexCoord;

void main()
{
    fragColor = (distance(vtexCoord, vec2(0.5, 0.5)) < 0.2) ? vec4(1, 0, 0, 1) : vec4(1);
}
