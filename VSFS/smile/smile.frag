#version 330 core

in vec4 frontColor;
out vec4 fragColor;
in vec3 N;

in vec2 vtexCoord;
uniform sampler2D colorMap;

void main()
{
    fragColor = texture(colorMap, vtexCoord);
    vec2 eyes[2];
    eyes[0] = vec2(0.34, 0.65) - 0.1*N.xy;
    eyes[1] = vec2(0.66, 0.65) - 0.1*N.xy;
    for (int i = 0; i < 2; i++) {
        if (distance(vtexCoord, eyes[i]) < 0.05) fragColor = vec4(0.0);
    }
}
