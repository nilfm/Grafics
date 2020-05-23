#include "framerate.h"
#include "glwidget.h"

void Framerate::onPluginLoad()
{
	fps=fcnt=0;
    QTimer *frameTimer=new QTimer(this);
    connect(frameTimer, SIGNAL(timeout()), this, SLOT(updateFPS()));
    frameTimer->start(1000);
}

void Framerate::preFrame()
{
	
}

void Framerate::postFrame()
{
	
}

void Framerate::onObjectAdd()
{
	
}

bool Framerate::drawScene()
{
	return false; // return true only if implemented
}

bool Framerate::drawObject(int)
{
	return false; // return true only if implemented
}

bool Framerate::paintGL()
{
	return false; // return true only if implemented
}

void Framerate::keyPressEvent(QKeyEvent *)
{
	
}

void Framerate::mouseMoveEvent(QMouseEvent *)
{
	
}

