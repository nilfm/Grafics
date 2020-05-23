#version 330 core

in vec2 vtexCoord;
out vec4 fragColor;

uniform sampler2D fbm;
uniform float time;
const float pi = 3.14159;

void main()
{
    vec4 colors[8];
    colors[0] = vec4(1, 0, 0, 1);
    colors[1] = vec4(1, 1, 0, 1);
    colors[2] = vec4(0, 1, 0, 1);
    colors[3] = vec4(0, 1, 1, 1);
    colors[4] = vec4(0, 0, 1, 1);
    colors[5] = vec4(1, 0, 1, 1);
    colors[6] = vec4(1, 0, 0, 1);
    colors[7] = vec4(1, 0, 0, 1);
    float r = texture(fbm, vtexCoord).r;
    float v = sin(2*pi*0.1*time + 2*pi*r);
    // Entre -1 i 1
    v += 1;
    // Entre 0 i 2
    v *= 3.5;
    // Entre 0 i 7
    float fr = fract(v);
    int n = int(v);
    fragColor = mix(colors[n], colors[n+1], fr);
}
