#version 330 core

in vec4 frontColor;
in vec3 N, V;

out vec4 fragColor;

uniform vec4 lightAmbient;  // similar a gl_LightSource[0].ambient
uniform vec4 lightDiffuse;  // similar a gl_LightSource[0].diffuse
uniform vec4 lightSpecular; // similar a gl_LightSource[0].specular

uniform vec4 matAmbient;    // similar a gl_FrontMaterial.ambient 
uniform vec4 matDiffuse;    // similar a gl_FrontMaterial.diffuse 
uniform vec4 matSpecular;   // similar a gl_FrontMaterial.specular
uniform float matShininess; // similar a gl_FrontMaterial.shininess

uniform int n = 5;
const float pi = 3.141592;

vec4 Phong(vec3 N, vec3 L, vec3 V)
{
    N = normalize(N);
    V = normalize(V);
    L = normalize(L);
    vec3 R = normalize(2.0*dot(N, L)*N - L);
    float dotNL = max(0.0, dot(N, L));
    float dotRV = max(0.0, dot(R, V));
    float specComponent = 0;
    if (dotNL > 0) specComponent = pow(dotRV, matShininess);
    vec4 diffuse = matDiffuse*lightDiffuse*dotNL;
    vec4 specular = matSpecular*lightSpecular*specComponent;
   
    return diffuse/sqrt(n)+specular;
}

void main()
{
    fragColor = vec4(0);
    for (int i = 0; i < n; i++) {
        float theta = 2*i*pi/n;
        vec3 L = vec3(10*cos(theta), 10*sin(theta), 0);
        fragColor += Phong(N, L, V);
    }
}
