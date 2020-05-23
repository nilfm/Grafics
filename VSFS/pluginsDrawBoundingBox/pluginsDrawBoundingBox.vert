#version 330 core

layout (location=0) in vec3 vertex;
layout (location=2) in vec3 color;

uniform mat4 modelViewProjectionMatrix;
uniform vec3 boundingBoxMin;
uniform vec3 boundingBoxMax;

void main() {
    vec3 v = vertex * (boundingBoxMax-boundingBoxMin);
    v += boundingBoxMin;
    gl_Position = modelViewProjectionMatrix * vec4(v, 1);
}
