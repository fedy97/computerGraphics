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

// we need to declare an output for the fragment shader
out vec4 outColor;

void main() {
  // Just set the output to a constant 
  outColor = vec4(0.0,1.0,0.5, 1);
}
`;

function createShader(gl, type, source) {
    var shader = gl.createShader(type);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    var success = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
    if (success) {
        return shader;
    } else {
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
    } else {
        throw ("program filed to link:" + gl.getProgramInfoLog(program));
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
    //OUR WEBGL CODE GOES HERE
    let canvas = document.getElementById("my-canvas");
    //let's define the context
    let gl = canvas.getContext("webgl2");
    if (!gl) {
        alert("GL context not opened");
        return;
    }
    //to fit the screen on mozilla
    autoResizeCanvas(canvas);

    let vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
    let fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);

    let program = createProgram(gl, vertexShader, fragmentShader);

    let aspect_ratio = gl.canvas.width/gl.canvas.height;

    //coordinates to build the triangle
    let position =
        [-0.5/aspect_ratio, -0.5,
            0.5/aspect_ratio, -0.5,
            0.0, 0.5];
    //create the buffer to contain the triangle (vbo)
    let positionBuffer = gl.createBuffer();
    //2 types of buffers: here we need a buffer that contains array of vertexes
    // if an array contains indexes we use the ELEMENT ARRAY BUFFER (next lesson)
    //webgl is a FSM so we change the state to that specific buffer
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    //tell to webgl that in the array we have floating points numbers and use the positionBuffer binded before to render that triangle
    //STATIC DRAW because we do not change data in the buffer
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(position), gl.STATIC_DRAW);

    // vec4 a_position in GLSL representing the pos of the vertexes
    // the pos of vertexes is in bufferData, so we need a bridge from buffer and use it as input for a_position
    // here we lock for the pos of that attribute a_position
    // expensive, do this at the beginning only
    let positionAttributeLocation = gl.getAttribLocation(program, "a_position");
    //here we enable it
    gl.enableVertexAttribArray(positionAttributeLocation);
    //x and y for each vertex , so 2
    let size = 2;
    //
    let normalize = false;
    // move forward stride*sizeof(float)
    // here we have values one after the others, so stride = 0
    let stride = 0;
    //I want to start from the start of the array
    let offset = 0;
    gl.vertexAttribPointer(positionAttributeLocation, size, gl.FLOAT, normalize, stride, offset);
    //define the size of my canvas to display
    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
    //paint the colors in the clearColor function for initialize
    gl.clearColor(1,1,1,1);
    gl.clear(gl.COLOR_BUFFER_BIT);

    gl.useProgram(program);
    //strips, fan or just triangles
    let primitiveType = gl.TRIANGLES;
    //start from the first vertex
    let offset2 = 0;
    //3 vertexes, for the triangle
    let count = 3;
    gl.drawArrays(primitiveType, offset2, count);

}

/**
 * call the function main when the page is loaded
 * @type {main}
 */
window.onload = main;


