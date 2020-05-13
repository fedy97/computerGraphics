var vs = `#version 300 es

in vec3 inPosition;
in vec3 inNormal;
//vertex shader needs to transform this with the matrix
out vec3 fsNormal;

uniform mat4 matrix; 
uniform mat4 nMatrix;

void main() {
  //fsNormal = inNormal; <- wrong
  //I need the 3x3 sub matrix
  fsNormal = mat3(nMatrix) * inNormal;
  //or I can do this:
  // fsNormal = (nMatrix * vec4(inNormal, 0.0)).xyz; <- take the first 3 components
  gl_Position = matrix * vec4(inPosition, 1.0);
}`;

var fs = `#version 300 es

precision mediump float;

in vec3 fsNormal;
out vec4 outColor;

uniform vec3 mDiffColor; //material diffuse color 
uniform vec3 lightDirection; // directional light direction vec
uniform vec3 lightColor; //directional light color 

void main() {
  //lambert law
  
  vec3 nNormal = normalize(fsNormal);
  vec3 lambertColor = mDiffColor * lightColor * dot(-lightDirection,nNormal);
  outColor = vec4(clamp(lambertColor, 0.0, 1.0),1.0);
}`;
//in this problem we need to move the normals with the vertexes in order to compute the right lights and shadows!!
function main() {

  var dirLightAlpha = -utils.degToRad(60);
  var dirLightBeta  = -utils.degToRad(120);
  //convert lights in cartesian coordinates
  var directionalLight = [Math.cos(dirLightAlpha) * Math.cos(dirLightBeta),
            Math.sin(dirLightAlpha), Math.cos(dirLightAlpha) * Math.sin(dirLightBeta) ];
  var directionalLightColor = [0.1, 1.0, 1.0];
  var cubeMaterialColor = [0.5, 0.5, 0.5];
  var lastUpdateTime = (new Date).getTime();
  var cubeRx = 0.0, cubeRy = 0.0, cubeRz = 0.0;

  var canvas = document.getElementById("c");
  var gl = canvas.getContext("webgl2");
  if (!gl) {
    document.write("GL context not opened");
    return;
  }

  utils.resizeCanvasToDisplaySize(gl.canvas);
  gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
  gl.clearColor(0.85, 0.85, 0.85, 1.0);
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
  gl.enable(gl.DEPTH_TEST);

  var vertexShader = utils.createShader(gl, gl.VERTEX_SHADER, vs);
  var fragmentShader = utils.createShader(gl, gl.FRAGMENT_SHADER, fs);
  var program = utils.createProgram(gl, vertexShader, fragmentShader);
  gl.useProgram(program);

  // look up where the vertex data needs to go.
  var positionAttributeLocation = gl.getAttribLocation(program, "inPosition");  
  var normalAttributeLocation = gl.getAttribLocation(program, "inNormal");  
  var matrixLocation = gl.getUniformLocation(program, "matrix");
  var materialDiffColorHandle = gl.getUniformLocation(program, 'mDiffColor');
  var lightDirectionHandle = gl.getUniformLocation(program, 'lightDirection');
  var lightColorHandle = gl.getUniformLocation(program, 'lightColor');
  var normalMatrixPositionHandle = gl.getUniformLocation(program, 'nMatrix');

  var perspectiveMatrix = utils.MakePerspective(90, gl.canvas.width/gl.canvas.height, 0.1, 100.0);
  var viewMatrix = utils.MakeView(0.0, 0.0, 4.0, 0.0, 0.0);
    
  var vao = gl.createVertexArray();

  gl.bindVertexArray(vao);

  var positionBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
  gl.enableVertexAttribArray(positionAttributeLocation);
  gl.vertexAttribPointer(positionAttributeLocation, 3, gl.FLOAT, false, 0, 0);

  var normalBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, normalBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(normals), gl.STATIC_DRAW);
  gl.enableVertexAttribArray(normalAttributeLocation);
  gl.vertexAttribPointer(normalAttributeLocation, 3, gl.FLOAT, false, 0, 0);

  var indexBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
  gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), gl.STATIC_DRAW); 

  drawScene();
  var normalMatrix;

function animate(){
  var currentTime = (new Date).getTime();
  if(lastUpdateTime){
    var deltaC = (30 * (currentTime - lastUpdateTime)) / 1000.0;
    cubeRx += deltaC;
    cubeRy -= deltaC;
    cubeRz += deltaC;

  }
  worldMatrix = utils.MakeWorld(0.0,0.0,0.0, cubeRx, cubeRy, cubeRz, 1.0);
  //recompute the normal matrix
  normalMatrix = utils.invertMatrix(utils.transposeMatrix(worldMatrix));
  lastUpdateTime = currentTime;
}

function drawScene() {
  animate();

  gl.clearColor(0.85, 0.85, 0.85, 1.0);
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

  var viewWorldMatrix = utils.multiplyMatrices(viewMatrix, worldMatrix);
  var projectionMatrix = utils.multiplyMatrices(perspectiveMatrix, viewWorldMatrix);

  gl.uniformMatrix4fv(matrixLocation, gl.FALSE, utils.transposeMatrix(projectionMatrix));
  //pass the new computed normal matrix
  gl.uniformMatrix4fv(normalMatrixPositionHandle, gl.FALSE, utils.transposeMatrix(normalMatrix));
  //this is for the last assignment
  gl.uniform3fv(materialDiffColorHandle, cubeMaterialColor);
  gl.uniform3fv(lightColorHandle,  directionalLightColor);
  gl.uniform3fv(lightDirectionHandle,  directionalLight);
  //rebuild the cube with the new position
  gl.bindVertexArray(vao);
  gl.drawElements(gl.TRIANGLES, indices.length, gl.UNSIGNED_SHORT, 0 );

  window.requestAnimationFrame(drawScene);
}

}


window.onload = main;

