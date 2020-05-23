#ifndef _FRAMERATE_H
#define _FRAMERATE_H

#include "plugin.h" 

class Framerate: public QObject, public Plugin
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

  public slots:
	void updateFPS();

  private:
	// add private methods and attributes here
	int fcnt, fps;
};

#endif
