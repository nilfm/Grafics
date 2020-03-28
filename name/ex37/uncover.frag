#version 330 core

in vec4 frontColor;
out vec4 fragColor;
in float NDCx;

uniform float time = 0;

void main()
{
    if (NDCx > time) discard;
    fragColor = vec4(0, 0, 1, 1);
}
