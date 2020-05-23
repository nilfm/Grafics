#include "phongPlugin.h"
#include "glwidget.h"

void PhongPlugin::onPluginLoad()
{
    vs = new QOpenGLShader(QOpenGLShader::Vertex, this);
    vs->compileSourceFile("../../../VSFS/lighting4/lighting4.vert");
    cout << "VS log: " << vs->log().toStdString() << endl;

    fs = new QOpenGLShader(QOpenGLShader::Fragment, this);
    fs->compileSourceFile("../../../VSFS/lighting4/lighting4.frag");
    cout << "FS log: " << fs->log().toStdString() << endl;
    
    program = new QOpenGLShaderProgram(this);
    program->addShader(vs);
    program->addShader(fs);
    program->link();
    cout << "Link log: " << program->log().toStdString() << endl;
}

void PhongPlugin::preFrame()
{
    program->bind();
    QMatrix4x4 MVP = camera()->projectionMatrix() * camera()->viewMatrix();
    program->setUniformValue("modelViewProjectionMatrix", MVP);
    QMatrix3x3 NM = camera()->viewMatrix().normalMatrix();
    program->setUniformValue("normalMatrix", NM);
    QMatrix4x4 MV = camera()->viewMatrix();
    program->setUniformValue("modelViewMatrix", MV);
    // Valors inventats
    program->setUniformValue("lightAmbient", QVector4D(Vector(0.1,0.1,0.1),1));
    program->setUniformValue("lightDiffuse", QVector4D(Vector(1,1,1),1));
    program->setUniformValue("lightSpecular", QVector4D(Vector(1,1,1),1));
    program->setUniformValue("lightPosition", QVector4D(0,0,0,1));
    program->setUniformValue("matAmbient", QVector4D(Vector(0.8, 0.8, 0.6),1));
    program->setUniformValue("matDiffuse", QVector4D(Vector(0.8, 0.8, 0.6),1));
    program->setUniformValue("matSpecular", QVector4D(Vector(1.0, 1.0, 1.0),1));
    program->setUniformValue("matShininess", GLfloat(64.0));
}

void PhongPlugin::postFrame()
{
	program->release();
}

void PhongPlugin::onObjectAdd()
{
	
}

bool PhongPlugin::drawScene()
{
	return false; // return true only if implemented
}

bool PhongPlugin::drawObject(int)
{
	return false; // return true only if implemented
}

bool PhongPlugin::paintGL()
{
	return false; // return true only if implemented
}

void PhongPlugin::keyPressEvent(QKeyEvent *)
{
	
}

void PhongPlugin::mouseMoveEvent(QMouseEvent *)
{
	
}

