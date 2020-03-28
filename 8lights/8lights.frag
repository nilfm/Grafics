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

uniform mat4 viewMatrix;
uniform mat4 inverseViewMatrix;
uniform vec3 boundingBoxMin; // cantonada minima de la capsa englobant 
uniform vec3 boundingBoxMax; // cantonada maxima de la capsa englobant

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
   
    return diffuse/2 +specular;
}

void main()
{
    fragColor = vec4(0);
    vec3 v[2];
    v[0] = boundingBoxMin;
    v[1] = boundingBoxMax;
    for (int i = 0; i < 8; i++) {
        int ind[3];
        for (int j = 0; j < 3; j++) ind[j] = ((i & (1 << j)) != 0) ? 1 : 0;
        vec3 L = vec3(v[ind[0]].x, v[ind[1]].y, v[ind[2]].z);
	L = (viewMatrix*vec4(L, 1)).xyz;
        fragColor += Phong(N, L+V, V);
    }
}

