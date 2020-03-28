#version 330 core

out vec4 fragColor;
uniform mat4 modelViewMatrix;
uniform mat3 normalMatrix;
in vec4 norm;
in vec4 vert;
in vec2 vtexCoord;

uniform sampler2D noise;

vec4 shading(vec3 N, vec3 Pos, vec4 diffuse) {
    vec3 lightPos = vec3(0.0,0.0,2.0);
    vec3 L = normalize( lightPos - Pos );
    vec3 V = normalize( -Pos);
    vec3 R = reflect(-L,N);
    float NdotL = max( 0.0, dot( N,L ) );
    float RdotV = max( 0.0, dot( R,V ) );
    float Ispec = pow( RdotV, 20.0 );
    return diffuse * NdotL + Ispec;
}

void main()
{
    vec4 S = 0.3*vec4(0, 1, -1, 0);
    vec4 T = 0.3*vec4(-2, -1, 1, 0);
    float s = dot(S, vert);
    float t = dot(T, vert);
    float v = 2*texture(noise, vec2(s, t)).x;
    vec4 white = vec4(1, 1, 1, 1);
    vec4 reddish = vec4(0.5, 0.2, 0.2, 1.0);
    vec4 diffuse = white;
    if (v < 1) diffuse = mix(white, reddish, fract(v));
    else if (v < 2) diffuse = mix(reddish, white, fract(v));
    vec3 NE = normalMatrix*norm.xyz;
    vec3 VE = (modelViewMatrix*vert).xyz;
    fragColor = shading(NE, VE, diffuse);
}

