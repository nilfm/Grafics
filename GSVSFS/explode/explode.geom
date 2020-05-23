#version 330 core
        
layout(triangles) in;
layout(triangle_strip, max_vertices = 36) out;

in vec4 vfrontColor[];
out vec4 gfrontColor;

uniform mat4 modelViewProjectionMatrix;
uniform float time;
const float speed = 0.5;

in vec3 nrm[];

void main() {
	vec3 N = vec3(0);
	for (int i = 0; i < 3; i++) N += speed*time*nrm[i]/3;
	for (int i = 0; i < 3; i++) {
		gfrontColor = vfrontColor[i];
		vec3 V = gl_in[i].gl_Position.xyz + N;
		gl_Position = modelViewProjectionMatrix*vec4(V, 1);
		EmitVertex();
	}
    EndPrimitive();
}
