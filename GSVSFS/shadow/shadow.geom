#version 330 core
        
layout(triangles) in;
layout(triangle_strip, max_vertices = 36) out;

in vec4 vfrontColor[];
out vec4 gfrontColor;

uniform mat4 modelViewProjectionMatrix;
uniform mat4 modelViewProjectionMatrixInverse;
uniform vec3 boundingBoxMin;

void main( void )
{
	for( int i = 0 ; i < 3 ; i++ )
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
