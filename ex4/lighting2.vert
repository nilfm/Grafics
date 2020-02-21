#version 330 core

layout (location = 0) in vec3 vertex;
layout (location = 1) in vec3 normal;
layout (location = 2) in vec3 color;
layout (location = 3) in vec2 texCoord;

out vec4 frontColor;
out vec2 vtexCoord;

uniform mat4 modelViewProjectionMatrix;
uniform mat4 modelViewMatrix;
uniform mat3 normalMatrix;

uniform vec4 lightAmbient;  // similar a gl_LightSource[0].ambient
uniform vec4 lightDiffuse;  // similar a gl_LightSource[0].diffuse
uniform vec4 lightSpecular; // similar a gl_LightSource[0].specular
uniform vec4 lightPosition; // similar a gl_LightSource[0].position

uniform vec4 matAmbient;    // similar a gl_FrontMaterial.ambient 
uniform vec4 matDiffuse;    // similar a gl_FrontMaterial.diffuse 
uniform vec4 matSpecular;   // similar a gl_FrontMaterial.specular
uniform float matShininess; // similar a gl_FrontMaterial.shininess

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
    vec4 ambient = matAmbient*lightAmbient;
    vec4 diffuse = matDiffuse*lightDiffuse*dotNL;
    vec4 specular = matSpecular*lightSpecular*specComponent;
   
    return ambient+diffuse+specular;
}

void main()
{
    vec3 N = normalize(normalMatrix * normal);
    vec3 P = (modelViewMatrix*vec4(vertex.xyz, 1.0)).xyz;
    vec3 V = -P;
    vec3 L = lightPosition.xyz - P;    
    frontColor = Phong(N, L, V);
    vtexCoord = texCoord;
    gl_Position = modelViewProjectionMatrix * vec4(vertex, 1.0);
}
