#version 330 core

in vec4 frontColor;
out vec4 fragColor;

in vec2 vtexCoord;

void main()
{
    vec4 color = vec4(1, 0, 0, 1);
    float dist = distance(vtexCoord, vec2(0.5, 0.5));
    float delta = 0.001;
    float alpha = smoothstep(0.45-delta, 0.45, dist);
    fragColor = mix(color, vec4(1), alpha);
}
