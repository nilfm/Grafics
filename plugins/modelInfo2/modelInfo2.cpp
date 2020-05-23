#include "modelInfo2.h"
#include "glwidget.h"

void ModelInfo2::writeModelInfo() {
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
	QFont font;
	font.setPixelSize(32);
	painter.begin(glwidget());
	painter.setFont(font);
	string text1 = "Total number of polygons: " + to_string(polygons);
	string text2 = "Total number of vertices: " + to_string(vertices);

	painter.drawText(35, 40, QString::fromStdString(text1));
	painter.drawText(35, 100, QString::fromStdString(text2));
    painter.end();
}

void ModelInfo2::onPluginLoad()
{

}

void ModelInfo2::preFrame()
{
	
}

void ModelInfo2::postFrame()
{
	writeModelInfo();
}

void ModelInfo2::onObjectAdd()
{

}

bool ModelInfo2::drawScene()
{
	return false; // return true only if implemented
}

bool ModelInfo2::drawObject(int)
{
	return false; // return true only if implemented
}

bool ModelInfo2::paintGL()
{
	return false; // return true only if implemented
}

void ModelInfo2::keyPressEvent(QKeyEvent *)
{
	
}

void ModelInfo2::mouseMoveEvent(QMouseEvent *)
{
	
}

