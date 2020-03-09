#version 330 core

in vec4 frontColor;
out vec4 fragColor;

uniform sampler2D explosion;
in vec2 vtexCoord;

uniform float time;

void main()
{
    int frame = int(time*30)%48;
    vec2 scale = vec2(1/8.0, 1/6.0);
    vec2 coords1 = vec2(frame%8, 6-(frame/6));
    vec2 coords2 = vec2(vtexCoord);
    fragColor = texture(explosion, scale*(coords1+coords2));
    fragColor *= fragColor.a;
}
