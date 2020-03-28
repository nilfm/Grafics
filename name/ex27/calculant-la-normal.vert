#version 330 core

layout (location = 0) in vec3 vertex;
layout (location = 1) in vec3 normal;
layout (location = 2) in vec3 color;
layout (location = 3) in vec2 texCoord;

out vec3 V;
out vec4 frontColor;

uniform mat4 modelViewProjectionMatrix;
uniform mat4 modelViewMatrix;

void main()
{   
    V=(modelViewMatrix*vec4(vertex, 1)).xyz;
    frontColor = vec4(color, 1);
    gl_Position = modelViewProjectionMatrix * vec4(vertex, 1.0);
} 

