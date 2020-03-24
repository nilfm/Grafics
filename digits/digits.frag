#version 330 core

in vec4 frontColor;
out vec4 fragColor;
in vec2 vtexCoord;

uniform sampler2D colorMap;
uniform float time;

void main()
{
    int seconds = int(time);
    int ones = seconds%10;
    int tens = (seconds/10)%10;
    int hund = (seconds/100)%10;
    float s = vtexCoord.s;
    int chosen = ones;
    if (s >= 1 && s < 2) chosen = tens;
    else if (s >= 2 && s < 3) chosen = hund;
    float horiz = fract(s);
    float vert = vtexCoord.t;
    float a = texture(colorMap, vec2(float(chosen)/10.0 + horiz, vert)).a;
    if (a < 0.5) discard;
    fragColor = vec4(1, 0, 0, 1);
}
