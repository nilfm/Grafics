#version 330 core


out vec4 fragColor;

in vec2 vtexCoord;

uniform sampler2D noise0;
uniform sampler2D rock1;
uniform sampler2D grass2;

void main()
{
    vec4 tex0 = texture(noise0, vtexCoord);
    vec4 tex1 = texture(rock1, vtexCoord);
    vec4 tex2 = texture(grass2, vtexCoord);
    float x = mix(tex1.x, tex2.x, tex0.x);
    float y = mix(tex1.y, tex2.y, tex0.y);
    float z = mix(tex1.z, tex2.z, tex0.z);
    fragColor = vec4(x, y, z, 1.0);
}
