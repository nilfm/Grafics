#version 330 core

in vec4 frontColor;
in vec3 V;

out vec4 fragColor;


void main()
{
    vec3 dx = dFdx(V);
    vec3 dy = dFdy(V);
    vec3 N = normalize(cross(dx, dy));
    fragColor = frontColor*N.z;
}

