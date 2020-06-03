/**
 * not one program anymore, but 3, so array
 * @type {any[]}
 */
var programs = new Array();
var gl;
var baseDir;
var shaderDir;

/**
 * the first is lambertian shaders
 * the second use local pos of vertexes to define the colors, no ligths
 * the third sets a specific color
 */
function main() {
    /**
     * used only for the first shader these lights, only the first program uses lighting
     */
        //directional light
    var dirLightAlpha = utils.degToRad(180);
    var dirLightBeta = utils.degToRad(100);
    var directionalLight = [Math.cos(dirLightAlpha) * Math.cos(dirLightBeta),
        Math.sin(dirLightAlpha), Math.cos(dirLightAlpha) * Math.sin(dirLightBeta)];
    var directionalLightColor = [0.1, 1.0, 1.0];
    //material color
    var cubeMaterialColor = [0.5, 0.5, 0.5];
    var lastUpdateTime = (new Date).getTime();

    var sphereNormalMatrix = new Array(), sphereWorldMatrix = new Array();
    var positionAttributeLocation = new Array(), normalAttributeLocation = new Array();
    var matrixLocation = new Array(), materialDiffColorHandle = new Array();
    var lightDirectionHandle = new Array(), lightColorHandle = new Array();
    var normalMatrixPositionHandle = new Array(), vertexMatrixPositionHandle = new Array();
    var materialDiffColorHandle = new Array();
    /**
     * diff attributes with diff spheres. in fact the first shader has normals, but the other not
     * @type {any[]}
     */
    var vaos = new Array();

    sphereWorldMatrix[0] = utils.MakeWorld(-4.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0);
    sphereWorldMatrix[1] = utils.MakeWorld(0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0);
    sphereWorldMatrix[2] = utils.MakeWorld(4.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0);
    /**
     * only this needs normal matrix to compute lighting
     */
    sphereNormalMatrix[0] = utils.invertMatrix(utils.transposeMatrix(sphereWorldMatrix[0]));

    //Loads all the data required to draw a sphere
    var numIdx = initSphere();

    //SET Global states (viewport size, viewport background color, Depth test)
    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
    gl.clearColor(0.85, 0.85, 0.85, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    gl.enable(gl.DEPTH_TEST);

    /**
     * retrieve diff attributes for each diff program.
     * @type {GLint}
     */
    //Lambert
    positionAttributeLocation[0] = gl.getAttribLocation(programs[0], "inPosition");
    normalAttributeLocation[0] = gl.getAttribLocation(programs[0], "inNormal");
    //****world view projection matrix*****
    matrixLocation[0] = gl.getUniformLocation(programs[0], "matrix");
    materialDiffColorHandle[0] = gl.getUniformLocation(programs[0], 'mDiffColor');
    lightDirectionHandle[0] = gl.getUniformLocation(programs[0], 'lightDirection');
    lightColorHandle[0] = gl.getUniformLocation(programs[0], 'lightColor');
    normalMatrixPositionHandle[0] = gl.getUniformLocation(programs[0], 'nMatrix');

    //Colour by position
    positionAttributeLocation[1] = gl.getAttribLocation(programs[1], "inPosition");
    matrixLocation[1] = gl.getUniformLocation(programs[1], "matrix");

    //Unlit
    positionAttributeLocation[2] = gl.getAttribLocation(programs[2], "inPosition");
    matrixLocation[2] = gl.getUniformLocation(programs[2], "matrix");

    var perspectiveMatrix = utils.MakePerspective(30, gl.canvas.width / gl.canvas.height, 0.1, 100.0);
    var cx = 0.0, cy = 0.0, cz = 20.0;
    var viewMatrix = utils.MakeView(cx, cy, cz, 0.0, 0.0);

    for (i = 0; i < 3; i++) {
        vaos[i] = gl.createVertexArray();

        gl.bindVertexArray(vaos[i]);
        var positionBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertexPositionData), gl.STATIC_DRAW);
        gl.enableVertexAttribArray(positionAttributeLocation[i]);
        gl.vertexAttribPointer(positionAttributeLocation[i], 3, gl.FLOAT, false, 0, 0);
        /**
         * the normal buffer only for the first spehere, lambertian
         **/
        if (i == 0) {
            var normalBuffer = gl.createBuffer();
            gl.bindBuffer(gl.ARRAY_BUFFER, normalBuffer);
            gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(normalData), gl.STATIC_DRAW);
            gl.enableVertexAttribArray(normalAttributeLocation[i]);
            gl.vertexAttribPointer(normalAttributeLocation[i], 3, gl.FLOAT, false, 0, 0);
        }

        var indexBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indexData), gl.STATIC_DRAW);
    }

    drawScene();

    function animate() {
        var currentTime = (new Date).getTime();
        var deltaC = (30 * (currentTime - lastUpdateTime)) / 1000.0;

        var curRotation = utils.MakeRotateXYZMatrix(deltaC, -deltaC, deltaC);

        for (i = 0; i < 3; i++) {
            sphereWorldMatrix[i] = utils.multiplyMatrices(sphereWorldMatrix[i], curRotation);
            if (i == 0) {
                sphereNormalMatrix[i] = utils.invertMatrix(utils.transposeMatrix(sphereWorldMatrix[i]));
            }
        }

        lastUpdateTime = currentTime;
    }

    function drawScene() {
        animate();

        gl.clearColor(0.85, 0.85, 0.85, 1.0);
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

        for (i = 0; i < 3; i++) {
            //set the right program, FSM
            gl.useProgram(programs[i]);
            var viewWorldMatrix = utils.multiplyMatrices(viewMatrix, sphereWorldMatrix[i]);
            var projectionMatrix = utils.multiplyMatrices(perspectiveMatrix, viewWorldMatrix);
            gl.uniformMatrix4fv(matrixLocation[i], gl.FALSE, utils.transposeMatrix(projectionMatrix));
            //this uniforms needs to be passed only for the first sphere
            if (i == 0) {
                gl.uniformMatrix4fv(vertexMatrixPositionHandle[i], gl.FALSE, utils.transposeMatrix(sphereWorldMatrix[i]));
                gl.uniformMatrix4fv(normalMatrixPositionHandle[i], gl.FALSE, utils.transposeMatrix(sphereNormalMatrix[i]));

                gl.uniform3fv(materialDiffColorHandle[i], cubeMaterialColor);
                gl.uniform3fv(lightColorHandle[i], directionalLightColor);
                gl.uniform3fv(lightDirectionHandle[i], directionalLight);
            }


            gl.bindVertexArray(vaos[i]);
            gl.drawElements(gl.TRIANGLES, indexData.length, gl.UNSIGNED_SHORT, 0);
        }

        window.requestAnimationFrame(drawScene);
    }

}

async function init() {
    var path = window.location.pathname;
    var page = path.split("/").pop();
    baseDir = window.location.href.replace(page, '');
    shaderDir = baseDir + "shaders/";

    var canvas = document.getElementById("c");
    gl = canvas.getContext("webgl2");
    if (!gl) {
        document.write("GL context not opened");
        return;
    }
    utils.resizeCanvasToDisplaySize(gl.canvas);

    //MultipleShaders
    /**
     * set to the array of programs the programs, one for each shader, so one for each object
     */
    await utils.loadFiles([shaderDir + 'vs_lamb.glsl', shaderDir + 'fs_lamb.glsl'], function (shaderText) {
        var vertexShader = utils.createShader(gl, gl.VERTEX_SHADER, shaderText[0]);
        var fragmentShader = utils.createShader(gl, gl.FRAGMENT_SHADER, shaderText[1]);

        programs[0] = utils.createProgram(gl, vertexShader, fragmentShader);
    });

    await utils.loadFiles([shaderDir + 'vs_pos.glsl', shaderDir + 'fs_pos.glsl'], function (shaderText) {
        var vertexShader = utils.createShader(gl, gl.VERTEX_SHADER, shaderText[0]);
        var fragmentShader = utils.createShader(gl, gl.FRAGMENT_SHADER, shaderText[1]);

        programs[1] = utils.createProgram(gl, vertexShader, fragmentShader);
    });

    await utils.loadFiles([shaderDir + 'vs_unlit.glsl', shaderDir + 'fs_unlit.glsl'], function (shaderText) {
        var vertexShader = utils.createShader(gl, gl.VERTEX_SHADER, shaderText[0]);
        var fragmentShader = utils.createShader(gl, gl.FRAGMENT_SHADER, shaderText[1]);

        programs[2] = utils.createProgram(gl, vertexShader, fragmentShader);
    });

    main();
}

window.onload = init;

