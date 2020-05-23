#include "animateVertices.h"
#include "glwidget.h"

void AnimateVertices::onPluginLoad()
{
    vs = new QOpenGLShader(QOpenGLShader::Vertex, this);
    vs->compileSourceFile("../../../VSFS/animate-vertices1/animate-vertices1.vert");
    cout << "VS log: " << vs->log().toStdString() << endl;

    fs = new QOpenGLShader(QOpenGLShader::Fragment, this);
    fs->compileSourceFile("../../../VSFS/animate-vertices1/animate-vertices1.frag");
    cout << "FS log: " << fs->log().toStdString() << endl;
    
    program = new QOpenGLShaderProgram(this);
    program->addShader(vs);
    program->addShader(fs);
    program->link();
    cout << "Link log: " << program->log().toStdString() << endl;
}

void AnimateVertices::preFrame()
{
    return;
    program->bind();
    QMatrix4x4 MVP = camera()->projectionMatrix() * camera()->viewMatrix();
    program->setUniformValue("modelViewProjectionMatrix", MVP);
    QMatrix3x3 NM = camera()->viewMatrix().normalMatrix();
    program->setUniformValue("normalMatrix", NM);
    program->setUniformValue("time", float(elapsedTimer.elapsed()/1000.0f));
}

void AnimateVertices::postFrame()
{
	program->release();
}

void AnimateVertices::onObjectAdd()
{
	
}

bool AnimateVertices::drawScene()
{
	return false; // return true only if implemented
}

bool AnimateVertices::drawObject(int)
{
	return false; // return true only if implemented
}

bool AnimateVertices::paintGL()
{
	return false; // return true only if implemented
}

void AnimateVertices::keyPressEvent(QKeyEvent *)
{
	
}

void AnimateVertices::mouseMoveEvent(QMouseEvent *)
{
	
}

