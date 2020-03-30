#version 330 core

out vec4 fragColor;
in vec2 vtexCoord;

const vec4 WHITE = vec4(1);
const vec4 BLUE = vec4(0, 0, 1, 1);
const vec4 GREEN = vec4(0, 1, 0, 1);
const vec4 LIGHTGREY = vec4(0.9);

// Gradient de blau a verd
vec4 calculateColorGradient() {
    return mix(BLUE, GREEN, vtexCoord.s);
}

vec4 calculateLineGradient() {
    return mix(LIGHTGREY, WHITE, -vtexCoord.t);
}

bool isPartOfLeft() {
    return abs(vtexCoord.s - 0.2) < 0.05;
}

bool isPartOfRight() {
    return abs(vtexCoord.s - 0.8) < 0.05;
}

// Retorna la distancia del punt vtexCoord a la recta 4*x + 3*y - 3.5 = 0
float distPointToDiagonalLine() {
    return abs(4*vtexCoord.s + 3*vtexCoord.t - 3.5)/5;
}

// La linia passa per (0.2, 0.9) i (0.8, 0.1)
// L'equacio es 4*x + 3*y - 3.5 = 0
bool isPartOfDiagonal() {
    return distPointToDiagonalLine() < 0.05;
}

bool isPartOfLetter() {
    if (abs(vtexCoord.s - 0.5) > 0.35) return false;
    if (abs(vtexCoord.t - 0.5) > 0.4) return false;
    return isPartOfLeft() || isPartOfDiagonal() || isPartOfRight();
}

// Separarem la lletra en caixetes tals que 90% estigui mostrat i 10% no (sortira en gris)
// Hi haura 10x10 = 100 caixetes, algunes de les quals quedaran fora de la lletra
// Les caixetes estaran rotades per un cert angle
bool isPartOfBox() {
    // Calcul de les coordenades rotades
    float angle = 0.25;
    mat2 rot = mat2(vec2(cos(angle), -sin(angle)), 
                    vec2(sin(angle), cos(angle)));
    vec2 newCoord = rot*vtexCoord;
    
    // Si estic als extrems d'una caixa, retorno false; altrament true
    float s = newCoord.s * 10;
    float t = newCoord.t * 10;
    if (min(fract(s), 1-fract(s)) < 0.05) return false;
    if (min(fract(t), 1-fract(t)) < 0.05) return false;
    return true;
}

// Lletra: N
// Color de la lletra: Blau -> Verd
// Color de les linies entre les caixes: Gris clar -> Blanc
void main()
{
    fragColor = WHITE;
    if (isPartOfLetter()) {
        if (isPartOfBox()) fragColor = calculateColorGradient();
        else fragColor = calculateLineGradient();
    }
}
