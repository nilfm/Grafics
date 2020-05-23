#version 330 core

layout (location = 0) in vec3 vertex;
layout (location = 1) in vec3 normal;
layout (location = 2) in vec3 color;
layout (location = 3) in vec2 texCoord;

out vec4 frontColor;
out vec2 vtexCoord;

uniform mat4 modelViewProjectionMatrix;
uniform mat3 normalMatrix;

uniform vec3 boundingBoxMin; // cantonada minima de la capsa englobant 
uniform vec3 boundingBoxMax; // cantonada maxima de la capsa englobant

uniform vec3 RED =    vec3(1, 0, 0);
uniform vec3 YELLOW = vec3(1, 1, 0);
uniform vec3 GREEN =  vec3(0, 1, 0);
uniform vec3 CYAN =   vec3(0, 1, 1);
uniform vec3 BLUE =   vec3(0, 0, 1);

void main()
{
    vec3 N = normalize(normalMatrix * normal);
    vec3 colors[6];
    colors[0] = RED;
    colors[1] = YELLOW;
    colors[2] = GREEN;
    colors[3] = CYAN;
    colors[4] = BLUE;
    colors[5] = BLUE;
    float minY = boundingBoxMin.y;
    float maxY = boundingBoxMax.y;
    float diff = maxY - minY;
    float mixed = 4*(vertex.y-minY)/diff;
    int index = int(mixed);
    float frac = fract(mixed);
    frontColor = vec4(mix(colors[index], colors[index+1], frac),1.0);
    vtexCoord = texCoord;
    gl_Position = modelViewProjectionMatrix * vec4(vertex, 1.0);
}
