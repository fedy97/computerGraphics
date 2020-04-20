"use strict";

//shaders declaration (not covered in the first class)
var vertexShaderSource = `#version 300 es

// an attribute is an input (in) to a vertex shader.
// It will receive data from a buffer
in vec4 a_position;

// all shaders have a main function
void main() {

  // gl_Position is a special variable a vertex shader
  // is responsible for setting
  gl_Position = a_position;
}
`;

var fragmentShaderSource = `#version 300 es

// fragment shaders don't have a default precision so we need
// to pick one. mediump is a good default. It means "medium precision"
precision mediump float;

uniform vec4 u_color;

// we need to declare an output for the fragment shader
out vec4 outColor;

void main() {
  //set the uniform
  outColor = u_color;
}
`;

function createShader(gl, type, source) {
  var shader = gl.createShader(type);
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  var success = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
  if (success) {    
    return shader;
  }else{
    console.log(gl.getShaderInfoLog(shader));  // eslint-disable-line
    gl.deleteShader(shader);
    throw "could not compile shader:" + gl.getShaderInfoLog(shader);
  }

}

function createProgram(gl, vertexShader, fragmentShader) {
  var program = gl.createProgram();
  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);
  var success = gl.getProgramParameter(program, gl.LINK_STATUS);
  if (success) {
    return program;
  }else{
     throw ("program filed to link:" + gl.getProgramInfoLog (program));
    console.log(gl.getProgramInfoLog(program));  // eslint-disable-line
    gl.deleteProgram(program);
    return undefined;
  }
}

function autoResizeCanvas(canvas) {
    const expandFullScreen = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    expandFullScreen();
    // Resize screen when the browser has triggered the resize event
    window.addEventListener('resize', expandFullScreen);
  }


function main() {
  // Get a WebGL context
  var canvas = document.getElementById("my-canvas");
  var gl = canvas.getContext("webgl2");
  if (!gl) {
    alert("GL context not opened");
    return;
  }
  autoResizeCanvas(canvas);
  
  // create GLSL shaders, upload the GLSL source, compile the shaders
  var vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
  var fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);

  // Link the two shaders into a program
  var program = createProgram(gl, vertexShader, fragmentShader);
    
  //use this aspect ratio to keep proportions
  var aspect_ratio = gl.canvas.width*1.0/gl.canvas.height;

  //x,y for each vertex
  var positions = [
        0.1, 0.2*aspect_ratio,
        0.5, 0.5*aspect_ratio,
        0.7, 0.2*aspect_ratio
  ];

  // Create a buffer and put three 2d clip space points in it
  var positionBuffer = gl.createBuffer();

  // Bind it to ARRAY_BUFFER (think of it as ARRAY_BUFFER = positionBuffer)
  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);
    
  // look up where the vertex data needs to go.
  //Assume vec4 a_position attribute in GLSL representing the position of the vertices
  var positionAttributeLocation = gl.getAttribLocation(program, "a_position");

  // Turn on the attribute
  gl.enableVertexAttribArray(positionAttributeLocation);

  // Tell the attribute how to get data out of positionBuffer (ARRAY_BUFFER)
  var size = 2;          // 2 components per iteration
  var normalize = false; // don't normalize the data
  var stride = 0;        // 0 = move forward stride * sizeof(type) each iteration to get the next position
  var offset = 0;        // start at the beginning of the buffer
  gl.vertexAttribPointer(positionAttributeLocation, size, gl.FLOAT, normalize, stride, offset);


  // Tell WebGL how to convert from clip space to pixels
  gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

  // Clear the canvas
  gl.clearColor(1, 1, 1, 1);
  gl.clear(gl.COLOR_BUFFER_BIT);

  // Tell it to use our program (pair of shaders)
  gl.useProgram(program);
  //must be defined after the useProgram()
  var color = [0.2,0.6,0.3,1.0];
  var colorLocation = gl.getUniformLocation(program, "u_color");
  //feed glsl the color we want for th triangle
  //4 components for the color, if it was position there were 3 components
  // f means floating point and v is vector, not single value
  //in the case of single value I would write uniform4f(colorLoc, 0.2,0.4,...)
  gl.uniform4fv(colorLocation, color);

  // draw
  var primitiveType = gl.TRIANGLES;
  var offset = 0;
  var count = 3;
  gl.drawArrays(primitiveType, offset, count);
}

window.onload = main;


