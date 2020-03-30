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
    // La coordenada s arriba a 2 per compensar que hem comprimit la relació d'aspecte
    vtexCoord.s *= 2;
    
    gl_Position = modelViewProjectionMatrix * vec4(vertex, 1.0);
    // Relació d'aspecte 2:1
    gl_Position.y *= 0.5;
}
