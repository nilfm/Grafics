#include "showDegree.h"
#include "glwidget.h"

void ShowDegree::onPluginLoad()
{
    auto& obj = scene()->objects()[0];    

	int caraVertexs = 0;
    for (auto& face : obj.faces()) {
        caraVertexs += face.numVertices();
    }
    grau = 1.0*caraVertexs/obj.vertices().size();
}

void ShowDegree::preFrame()
{
	
}

void ShowDegree::postFrame()
{
    QFont font;
    font.setPixelSize(32);
    painter.begin(glwidget());
    painter.setFont(font);
    int x = 15;
    int y = 40;
    painter.drawText(x, y, QString::fromStdString(to_string(grau)));    
    painter.end();
}

void ShowDegree::onObjectAdd()
{
	auto& obj = scene()->objects()[0];    

	int caraVertexs = 0;
    for (auto& face : obj.faces()) {
        caraVertexs += face.numVertices();
    }
    grau = 1.0*caraVertexs/obj.vertices().size();
}

bool ShowDegree::drawScene()
{
	return false; // return true only if implemented
}

bool ShowDegree::drawObject(int)
{
	return false; // return true only if implemented
}

bool ShowDegree::paintGL()
{
	return false; // return true only if implemented
}

void ShowDegree::keyPressEvent(QKeyEvent *)
{
	
}

void ShowDegree::mouseMoveEvent(QMouseEvent *)
{
	
}

