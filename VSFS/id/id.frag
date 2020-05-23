#version 330 core

out vec4 fragColor;
in vec2 vtexCoord;
uniform sampler2D colorMap;

const vec4 BLAU = vec4(0, 0, 1, 1);

void main()
{
    // Inicialitzem els digits del DNI (476993)
    int number[6];
    number[0] = 4;
    number[1] = 7;
    number[2] = 6;
    number[3] = 9;
    number[4] = 9;
    number[5] = 3;
    
    // Per conveniencia
    float s = vtexCoord.s;
    float t = vtexCoord.t;
    
    // Triem quin dels digits estem representant en aquesta regio
    int digit = 4;
    for (int i = 0; i < 6; i++) {
        if (s >= i && s < i+1) {
	    digit = number[i];
	    break;    	
	}
    }
    
    // Calculem desplaçaments des del principi del digit
    float delta_horitzontal = fract(s);
    float delta_vertical = fract(t);
    
    // Calculem coordenades de textura
    vec2 coords_textura = vec2(digit/10.0 + delta_horitzontal/10.0, delta_vertical);

    float a_textura = texture(colorMap, coords_textura).a;
    if (a_textura < 0.5) discard;
    else fragColor = BLAU;
}
