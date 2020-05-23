#ifndef _DRAWBOUNDINGBOX_H
#define _DRAWBOUNDINGBOX_H

#include "plugin.h" 

class DrawBoundingBox: public QObject, public Plugin
{
	Q_OBJECT
	Q_PLUGIN_METADATA(IID "Plugin") 
	Q_INTERFACES(Plugin)

  public:
	 void onPluginLoad();
	 void postFrame();
  private:
	// add private methods and attributes here
	  GLuint m_VAO;           // ID of VAOs
	  GLuint m_coordBufferID; // ID of vertex coordinates buffer 
	  
	  QOpenGLShaderProgram* m_pProgram;
	  QOpenGLShader *m_pFs;
	  QOpenGLShader *m_pVs; 
	  
	  int m_size;
};

#endif
