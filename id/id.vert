#version 330 core

layout (location = 0) in vec3 vertex;
layout (location = 1) in vec3 normal;
layout (location = 2) in vec3 color;
layout (location = 3) in vec2 texCoord;

out vec2 vtexCoord;

uniform mat4 modelViewProjectionMatrix;

void main()
{
    vtexCoord = texCoord;
    // Fem que la coordenada s vagi de 0 a 6 per facilitar les comparacions despres
    vtexCoord.s *= 6;

    gl_Position = modelViewProjectionMatrix * vec4(vertex, 1.0);
    // Convertim el quadrat en un rectangle
    gl_Position.y *= 0.5;
}
