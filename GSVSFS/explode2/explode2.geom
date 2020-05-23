#version 330 core
        
layout(triangles) in;
layout(triangle_strip, max_vertices = 36) out;

in vec4 vfrontColor[];
out vec4 gfrontColor;

uniform mat4 modelViewProjectionMatrix;
uniform float time;
const float speed = 0.5;
const float angSpeed = 8.0;

in vec3 nrm[];


vec3 rotateZ(vec3 v, float angle) {
	vec3 c1 = vec3(cos(angle), -sin(angle), 0);
	vec3 c2 = vec3(sin(angle), cos(angle), 0);
	vec3 c3 = vec3(0, 0, 0);
	mat3 R = mat3(c1, c2, c3);
	return R*v;
}

void main() {
	vec3 N = speed*time*(nrm[0]+nrm[1]+nrm[2])/3;
	vec3 C = vec3(0);
	for (int i = 0; i < 3; i++) C += gl_in[i].gl_Position.xyz/3;
	float angle = angSpeed*time; 
	
	for (int i = 0; i < 3; i++) {
		gfrontColor = vfrontColor[i];
		vec3 V = gl_in[i].gl_Position.xyz;
		V -= C;
		V = rotateZ(V, angle);
		V += C + N;
		gl_Position = modelViewProjectionMatrix*vec4(V, 1);
		EmitVertex();
	}
    EndPrimitive();
}
