#include "modelInfo.h"
#include "glwidget.h"

void ModelInfo::writeModelInfo() {
	cout << "Total number of loaded objects: " << scene()->objects().size() << endl;
	int polygons = 0;

	int vertices = 0;
	int triangles = 0;
	for (const auto& obj : scene()->objects()) {
		polygons += obj.faces().size();
	    for (const auto& face : obj.faces()) {
	        vertices += face.numVertices();
	        triangles += face.numVertices() == 3;
	    }
	}
	cout << "Total number of polygons: " << polygons << endl;
	cout << "Total number of vertices: " << vertices << endl;
	cout << "Percentage of polygons that are triangles: " << 100.0*triangles/polygons << "%" << endl;
}

void ModelInfo::onPluginLoad()
{
    writeModelInfo();
}

void ModelInfo::onObjectAdd()
{
    writeModelInfo();
}

bool ModelInfo::drawScene()
{
	return false; // return true only if implemented
}

bool ModelInfo::drawObject(int)
{
	return false; // return true only if implemented
}

bool ModelInfo::paintGL()
{
	return false; // return true only if implemented
}

void ModelInfo::keyPressEvent(QKeyEvent *)
{
	
}

void ModelInfo::mouseMoveEvent(QMouseEvent *)
{
	
}

