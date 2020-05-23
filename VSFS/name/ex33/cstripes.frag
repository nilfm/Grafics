#version 330 core

in vec4 frontColor;
out vec4 fragColor;

in vec2 vtexCoord;
uniform int nstripes = 16;
uniform vec2 origin = vec2(0, 0);

void main()
{
    float row = vtexCoord.s*nstripes;
    float col = vtexCoord.t*nstripes;
    float dist = distance(vec2(row, col), origin);
    int ok = int(mod(dist, 2));
    fragColor = (ok == 0) ? vec4(1, 0, 0, 1) : vec4(1, 1, 0, 1);
}
