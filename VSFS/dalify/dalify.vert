#version 330 core

layout (location = 0) in vec3 vertex;
layout (location = 1) in vec3 normal;
layout (location = 2) in vec3 color;
layout (location = 3) in vec2 texCoord;

out vec4 frontColor;
out vec2 vtexCoord;

uniform mat4 modelViewProjectionMatrix;
uniform mat3 normalMatrix;

uniform float t = 0.4;
uniform float scale = 4.0;

uniform vec3 boundingBoxMin; // cantonada minima de la capsa englobant 
uniform vec3 boundingBoxMax; // cantonada maxima de la capsa englobant

void main()
{
    float c = mix(boundingBoxMin.y, boundingBoxMax.y, t);
    float delta = c*scale-c;
    vec3 N = normalize(normalMatrix * normal);
    frontColor = vec4(color,1.0) * N.z;
    vtexCoord = texCoord;
    vec3 vert = vertex;
    if (vertex.y < c) vert.y *= scale;
    else vert.y += delta;
    gl_Position = modelViewProjectionMatrix * vec4(vert, 1.0);
}
