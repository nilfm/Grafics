#version 330 core

layout (location = 0) in vec3 vertex;
layout (location = 1) in vec3 normal;
layout (location = 2) in vec3 color;
layout (location = 3) in vec2 texCoord;

out vec4 frontColor;
out vec2 vtexCoord;
out vec3 to_camera;
out vec3 normalized;

uniform mat4 modelViewProjectionMatrix;
uniform mat3 normalMatrix;
uniform mat4 modelViewMatrixInverse;

uniform float light = 0.5;
void main()
{
    to_camera = normalize(vertex-(modelViewMatrixInverse*vec4(0, 0, 0, 1)).xyz);
    normalized = normalize(normal);
    vec3 N = normalize(normalMatrix * normal);
    frontColor = vec4(color,1.0) * light * N.z;
    vtexCoord = texCoord;
    gl_Position = modelViewProjectionMatrix * vec4(vertex, 1.0);
}
