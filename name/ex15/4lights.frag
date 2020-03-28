#version 330 core

uniform mat4 modelViewMatrixInverse;

out vec4 fragColor;

in vec3 N;   	// normal (en object space)
in vec3 P; 	// posicio del vertex (en object space)

uniform float time;
uniform bool rotate=true;

// V, N, P, lightPos han d'estar al mateix espai de coordenades
// V és el vector unitari cap a l'observador
// N és la normal
// P és la posició 
// lightPos és la posició de la llum
// lightColor és el color de la llum
vec4 light(vec3 V, vec3 N, vec3 P, vec3 lightPos, vec3 lightColor)
{
	const float shininess = 100.0;
	const float Kd = 0.5;
	N = normalize(N);
	vec3 L = normalize(lightPos - P);
	vec3 R = reflect(-L, N);
	float NdotL = max(0.0, dot(N,L));
	float RdotV = max(0.0, dot(R,V));
	float spec =  pow( RdotV, shininess);
	return vec4(Kd*lightColor*NdotL + vec3(spec),0);
}

void main()
{
	float angle = 0;
	if (rotate) angle = time;
	float cs = cos(angle);
	float sn = sin(angle);
	mat3 R = mat3(vec3(cs, sn, 0), vec3(-sn, cs,0), vec3(0,0,1));
	vec3 lightPos[4];
	lightPos[0] = (modelViewMatrixInverse*vec4(R*vec3(0, 10, 0), 1)).xyz;
	lightPos[1] = (modelViewMatrixInverse*vec4(R*vec3(0, -10, 0), 1)).xyz;
	lightPos[2] = (modelViewMatrixInverse*vec4(R*vec3(10, 0, 0), 1)).xyz;
	lightPos[3] = (modelViewMatrixInverse*vec4(R*vec3(-10, 0, 0), 1)).xyz;
	vec3 lightCol[4];	
	lightCol[0] = vec3(0, 1, 0);
	lightCol[1] = vec3(1, 1, 0);
	lightCol[2] = vec3(0, 0, 1);
	lightCol[3] = vec3(1, 0, 0);
	vec3 V = normalize(modelViewMatrixInverse[3].xyz - P);
	vec4 c = vec4(0);
	for (int i = 0; i < 4; i++) {
		c += light(V, N, P, lightPos[i], lightCol[i]);
	}
	fragColor = c;
}

