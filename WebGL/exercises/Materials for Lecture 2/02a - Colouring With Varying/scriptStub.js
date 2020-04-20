"use strict";
/**
 * change color based on position
 */

//shaders declaration (not covered in the first class)
var vertexShaderSource = `#version 300 es

// an attribute is an input (in) to a vertex shader.
// It will receive data from a buffer
//only x,y so vec2 not vec4
in vec2 a_position;
//output of the vertex shader
out vec2 pos_col;

// all shaders have a main function
void main() {
  //equal to position of vertexes
  pos_col = a_position;
  // gl_Position is a special variable a vertex shader
  // is responsible for setting
  //z=0, w=1, so from vec2 to vec4 because we goto homogeneous coordinates
  //set pos of one vertex
  gl_Position = vec4(a_position, 0.0, 1.0);
}
`;

var fragmentShaderSource = `#version 300 es

// fragment shaders don't have a default precision so we need
// to pick one. mediump is a good default. It means "medium precision"
precision mediump float;
//this input is the output of the vertex shader
//interpolated value coming from vertex shader
in vec2 pos_col;

// we need to declare an output for the fragment shader
out vec4 outColor;

void main() {
  //change the color of the triangle in the canvas
  //first 2 components are the x,y of the vertex shader, set the color like this, color depending on the position!!!
  outColor = vec4(pos_col, pos_col.x + pos_col.y, 1.0);
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
  var aspect_ratio = gl.canvas.width/gl.canvas.height;

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

  // draw
  var primitiveType = gl.TRIANGLES;
  var offset = 0;
  var count = 3;
  gl.drawArrays(primitiveType, offset, count);
}

window.onload = main;


