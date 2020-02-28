#version 330 core

layout (location = 0) in vec3 vertex;
layout (location = 1) in vec3 normal;
layout (location = 2) in vec3 color;
layout (location = 3) in vec2 texCoord;

out vec4 frontColor;
out vec2 vtexCoord;

uniform mat4 modelViewProjectionMatrix;
uniform mat3 normalMatrix;
uniform mat4 modelViewMatrixInverse;
uniform float epsilon = 0.1;
uniform float light = 0.5;

void main()
{
    vec3 to_camera = normalize(vertex-(modelViewMatrixInverse*vec4(0, 0, 0, 1)).xyz);
    vec3 normalized = normalize(normal);
    float diff = dot(to_camera, normalized);
    vec3 yellow = vec3(0.7, 0.6, 0.0);
    vec3 N = normalize(normalMatrix * normal);
    frontColor = vec4(color,1.0) * light * N.z;
    if (abs(diff) < epsilon) frontColor = vec4(yellow, 1.0);
    vtexCoord = texCoord;
    gl_Position = modelViewProjectionMatrix * vec4(vertex, 1.0);
}
