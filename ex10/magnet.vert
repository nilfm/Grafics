#version 330 core

layout (location = 0) in vec3 vertex;
layout (location = 1) in vec3 normal;
layout (location = 2) in vec3 color;
layout (location = 3) in vec2 texCoord;

out vec4 frontColor;
out vec2 vtexCoord;

uniform mat4 modelViewMatrixInverse;
uniform mat4 modelViewProjectionMatrix;
uniform mat3 normalMatrix;
uniform vec4 lightPosition; // similar a gl_LightSource[0].position; en eye space
uniform float n = 4;

void main()
{   
    vec3 llum = vec3(modelViewMatrixInverse*lightPosition);
    float d = distance(vertex, llum);
    float w = clamp(1.0/pow(d, n), 0, 1);
    vec3 newVertex = (1.0-w)*vertex + w*llum;
    vec3 N = normalize(normalMatrix * normal);
    frontColor = vec4(N.z, N.z, N.z, 1.0);
    vtexCoord = texCoord;
    gl_Position = modelViewProjectionMatrix * vec4(newVertex, 1.0);
}
