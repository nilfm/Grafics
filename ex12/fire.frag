#version 330 core

out vec4 fragColor;
in vec2 vtexCoord;

uniform sampler2D sampler0;
uniform sampler2D sampler1;
uniform sampler2D sampler2;
uniform sampler2D sampler3;

uniform float slice = 0.1;
uniform float time = 0.75;

void main()
{
    int curr = int(time/slice)%4;
    if (curr == 0) fragColor = texture(sampler0, vtexCoord);
    if (curr == 1) fragColor = texture(sampler1, vtexCoord);
    if (curr == 2) fragColor = texture(sampler2, vtexCoord);
    if (curr == 3) fragColor = texture(sampler3, vtexCoord);
}
