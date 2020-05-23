#version 330 core

layout (location = 0) in vec3 vertex;
layout (location = 1) in vec3 normal;
layout (location = 2) in vec3 color;
layout (location = 3) in vec2 texCoord;

out vec4 frontColor;
out vec2 vtexCoord;

uniform mat4 modelViewProjectionMatrix;
uniform mat3 normalMatrix;
uniform vec4 lightPosition; // similar a gl_LightSource[0].position; en eye space
uniform float amplitude = 0.1;
uniform float freq = 1;
uniform float time;

void main()
{   
    vec3 N = normalize(normalMatrix * normal);
    frontColor = vec4(N.z, N.z, N.z, 1.0);
    vtexCoord = texCoord;
    float dt = amplitude*sin(2*3.141592*texCoord[0] + freq*2*3.141592*time);
    gl_Position = modelViewProjectionMatrix * vec4(vertex + dt*normalize(normal), 1.0);
}