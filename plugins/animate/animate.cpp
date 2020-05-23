#include "animate.h"
#include "glwidget.h"

void Animate::onPluginLoad()
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
    
    elapsedTimer.start();
    
    QTimer *timer = new QTimer(this);
    connect(timer, SIGNAL(timeout()), glwidget(), SLOT(update()));
    timer->start();
}

void Animate::preFrame()
{
    program->bind();
    QMatrix4x4 MVP = camera()->projectionMatrix() * camera()->viewMatrix();
    program->setUniformValue("modelViewProjectionMatrix", MVP);
    QMatrix3x3 NM = camera()->viewMatrix().normalMatrix();
    program->setUniformValue("normalMatrix", NM);
    program->setUniformValue("time", float(elapsedTimer.elapsed()/1000.0f));
}

void Animate::postFrame()
{
    program->release();	
}

void Animate::onObjectAdd()
{
	
}

bool Animate::drawScene()
{
	return false; // return true only if implemented
}

bool Animate::drawObject(int)
{
	return false; // return true only if implemented
}

bool Animate::paintGL()
{
	return false; // return true only if implemented
}

void Animate::keyPressEvent(QKeyEvent *)
{
	
}

void Animate::mouseMoveEvent(QMouseEvent *)
{
	
}

