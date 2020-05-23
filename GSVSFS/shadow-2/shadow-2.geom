#version 330 core
        
layout(triangles) in;
layout(triangle_strip, max_vertices = 36) out;

in vec4 vfrontColor[];
out vec4 gfrontColor;

uniform mat4 modelViewProjectionMatrix;
uniform mat4 modelViewProjectionMatrixInverse;
uniform vec3 boundingBoxMin;
uniform vec3 boundingBoxMax;

void createVertex(bool x, bool z, vec3 C, float R) {
    if (x) C.x += R;
    else C.x -= R;
    if (z) C.z += R;
    else C.z -= R;
    gl_Position = modelViewProjectionMatrix*vec4(C, 1);
    EmitVertex();
}

void main( void )
{
    if (gl_PrimitiveIDIn == 0) {
        gfrontColor = vec4(0, 1, 1, 1);
        float y = boundingBoxMin.y - 0.01;
        float R = distance(boundingBoxMax, boundingBoxMin)/2;
        vec3 C = (boundingBoxMax + boundingBoxMin)/2;
        C.y = y;
        createVertex(false, false, C, R);
        createVertex(true, false, C, R);
        createVertex(false, true, C, R);
        createVertex(true, true, C, R);
        EndPrimitive();
    }
	for (int i = 0; i < 3; i++)
	{
		gfrontColor = vfrontColor[i];
		gl_Position = gl_in[i].gl_Position;
		EmitVertex();
	}
    EndPrimitive();
	for (int i = 0; i < 3; i++) {
		gfrontColor = vec4(0);
		vec4 v = modelViewProjectionMatrixInverse*gl_in[i].gl_Position;
		v.y = boundingBoxMin.y;
		gl_Position = modelViewProjectionMatrix*v;
		EmitVertex();
	}
    EndPrimitive();
}

