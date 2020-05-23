#include "drawBoundingBox.h"
#include "glwidget.h"

void DrawBoundingBox::onPluginLoad()
{
  GLWidget &g = *glwidget();
  vector<float> vertices;
  vector<vector<float>> triangles;
  
  g.glGenVertexArrays(1, &m_VAO);
  g.glBindVertexArray(m_VAO);
  
  g.glGenBuffers(1, &m_coordBufferID);
  
  // 6 planes to visualize the bounding box
  triangles.push_back({ 0,0,0,  1,0,0,  1,1,0 });
  triangles.push_back({ 0,0,0,  1,1,0,  0,1,0 });
  
  triangles.push_back({ 0,0,1,  1,0,1,  1,1,1 });
  triangles.push_back({ 0,0,1,  1,1,1,  0,1,1 });
  
  triangles.push_back({ 0,1,0,  1,1,0,  1,1,1 });
  triangles.push_back({ 0,1,0,  1,1,1,  0,1,1 });
  
  triangles.push_back({ 0,0,0,  1,0,0,  1,0,1 });
  triangles.push_back({ 0,0,0,  1,0,1,  0,0,1 });
  
  triangles.push_back({ 1,0,0,  1,0,1,  1,1,1 });
  triangles.push_back({ 1,0,0,  1,1,0,  1,1,1 });
  
  triangles.push_back({ 0,0,0,  0,0,1,  0,1,1 });
  triangles.push_back({ 0,0,0,  0,1,0,  0,1,1 });
  
  for (vector<float> &V : triangles) for (float f : V) vertices.push_back(f);
  m_size = vertices.size();
  
  g.glBindBuffer(GL_ARRAY_BUFFER, m_coordBufferID);
  g.glBufferData(GL_ARRAY_BUFFER, sizeof(float)*vertices.size(), vertices.data(), GL_STATIC_DRAW);
  g.glVertexAttribPointer(0, 3, GL_FLOAT, GL_FALSE, 0, 0);  // VAO
  g.glEnableVertexAttribArray(0);
  
  m_pVs = new QOpenGLShader(QOpenGLShader::Vertex, this);
  m_pVs->compileSourceFile("../../../VSFS/pluginsDrawBoundingBox/pluginsDrawBoundingBox.vert");
  cout << "VS log: " << m_pVs->log().toStdString() << endl;
  
  m_pFs = new QOpenGLShader(QOpenGLShader::Fragment, this);
  m_pFs->compileSourceFile("../../../VSFS/pluginsDrawBoundingBox/pluginsDrawBoundingBox.frag");
  cout << "FS log: " << m_pFs->log().toStdString() << endl;
  
  m_pProgram = new QOpenGLShaderProgram(this);
  m_pProgram->addShader(m_pVs);
  m_pProgram->addShader(m_pFs);
  m_pProgram->link();
  cout << "Link log: " << m_pProgram->log().toStdString() << endl;
}

void DrawBoundingBox::postFrame()
{
  GLWidget &g = *glwidget();

  //glPolygonMode( GL_FRONT_AND_BACK, GL_LINE );
  glEnable (GL_BLEND);
  g.glBlendFunc (GL_SRC_ALPHA, GL_ONE_MINUS_SRC_ALPHA);
  
  g.glBindVertexArray(m_VAO);
  vector<Object> &O = scene()->objects();
  m_pProgram->bind();
  QMatrix4x4 MVP = camera()->projectionMatrix() * camera()->viewMatrix();
  m_pProgram->setUniformValue("modelViewProjectionMatrix", MVP);
  
  for (Object &o : O) {
    const Box &b = o.boundingBox();
    
    m_pProgram->setUniformValue("boundingBoxMax", b.max());
    m_pProgram->setUniformValue("boundingBoxMin", b.min());
    
    g.glDrawArrays(GL_TRIANGLES, 0, m_size);
  }
  
  m_pProgram->release();
  
  glDisable(GL_BLEND);
  g.glBindVertexArray(0);
  //glPolygonMode( GL_FRONT_AND_BACK, GL_FILL );
}

















