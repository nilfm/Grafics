#version 330 core

out vec4 fragColor;
in vec2 vtexCoord;

const vec4 BACKGROUND = vec4(104, 150, 102, 255)/255.0;
const vec4 WHITE = vec4(1);

// Les coordenades s son fins a 2 per compensar la compressio de l'aspect ratio
const vec2 CENTER_SQUARE = vec2(1.4, 0.5);
const vec2 CENTER_CIRCLE1 = vec2(0.52, 0.5);
const vec2 CENTER_CIRCLE2 = vec2(0.75, 0.5);
const float CIRCLES_RADIUS = 0.38;
const float SQUARE_HALFSIDE = 0.24;

bool isWithinSquare() {
    if (abs(vtexCoord.s - CENTER_SQUARE.s) >= SQUARE_HALFSIDE) return false;
    if (abs(vtexCoord.t - CENTER_SQUARE.t) >= SQUARE_HALFSIDE) return false;
    return true;
}

bool isWithinCircle(int id) {
    if (id == 1) return distance(vtexCoord, CENTER_CIRCLE1) < CIRCLES_RADIUS;
    else return distance(vtexCoord, CENTER_CIRCLE2) < CIRCLES_RADIUS;
}

// Diferencia de dos cercles
bool isWithinMoon() {
    return isWithinCircle(1) && !isWithinCircle(2);
}

void main()
{
    fragColor = BACKGROUND;
    if (isWithinSquare() || isWithinMoon()) fragColor = WHITE;
}
