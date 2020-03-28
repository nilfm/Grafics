#version 330 core

in vec4 frontColor;
in vec3 to_camera;
in vec3 normalized;
out vec4 fragColor;
uniform float epsilon = 0.1;
void main()
{    
    vec4 yellow = vec4(0.7, 0.6, 0.0, 1.0);
    float diff = dot(to_camera, normalized);
    if (abs(diff) < epsilon) fragColor = yellow;
    else fragColor = frontColor;
}
