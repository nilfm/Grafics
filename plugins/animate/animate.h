#ifndef _ANIMATE_H
#define _ANIMATE_H

#include "plugin.h" 
#include <QOpenGLShader>
#include <QOpenGLShaderProgram>
#include <QElapsedTimer>

class Animate: public QObject, public Plugin
{
	Q_OBJECT
	Q_PLUGIN_METADATA(IID "Plugin") 
	Q_INTERFACES(Plugin)

  public:
	 void onPluginLoad();
	 void preFrame();
	 void postFrame();

	 void onObjectAdd();
	 bool drawScene();
	 bool drawObject(int);

	 bool paintGL();

	 void keyPressEvent(QKeyEvent *);
	 void mouseMoveEvent(QMouseEvent *);
  private:
	// add private methods and attributes here
    	QOpenGLShaderProgram* program;
   	QOpenGLShader *fs, *vs; 
        QElapsedTimer elapsedTimer;
};

#endif
