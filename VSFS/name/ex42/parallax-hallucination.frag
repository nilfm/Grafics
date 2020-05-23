#version 330 core

in vec4 frontColor;
out vec4 fragColor;
in vec2 vtexCoord;

uniform sampler2D map;
uniform float time;
uniform float a;

void main()
{
    vec4 c = texture(map, vtexCoord);
    float m = max(max(c.r, c.g), c.b);
    vec2 u = vec2(m, m);
    float theta = 2*3.141592*time;
    mat2 rot = mat2(vec2(cos(theta), sin(theta)), vec2(-sin(theta), cos(theta)));
    vec2 offset = (a/100)*(rot*u);
    fragColor = texture(map, vtexCoord+offset);
}
