function axonometry() {
    // Make an isometric view, w = 50, a = 16/9, n = 1, f = 101.
    var A1 = isometric(50, 16 / 9, 1, 101);
    // Make a dimetric view, w = 50, a = 16/9, n = 1, f = 101, rotated 20 around the x-axis
    var A2 = dimetric(20, 50, 16 / 9, 1, 101);
    // Make a trimetric view, w = 50, a = 16/9, n = 1, f = 101, rotated -30 around the x-axis and 30 around the y-axis
    var A3 = trimetric(-30, 30, 50, 16 / 9, 1, 101);
    // Make an cavalier projection view, w = 50, a = 16/9, n = 1, f = 101, at 45 degrees
    var O1 = cavalier(45, 50, 16 / 9, 1, 101);
    // Make a cabinet projection view, w = 50, a = 16/9, n = 1, f = 101, at 60 degrees
    var O2 = cabinet(60, 50, 16 / 9, 1, 101);

    return [A1, A2, A3, O1, O2];
}

function isometric(w, a, n, f) {
    var parallel = utils.MakeParallel(w, a, n, f);
    var rotX = utils.MakeRotateXMatrix(35.26);
    var rotY = utils.MakeRotateYMatrix(45);
    var A11 = utils.multiplyMatrices(parallel, rotX);
    return utils.multiplyMatrices(A11, rotY);
}


function dimetric(degX, w, a, n, f) {
    var parallel = utils.MakeParallel(w, a, n, f);
    var rotX = utils.MakeRotateXMatrix(degX);
    var rotY = utils.MakeRotateYMatrix(45);
    var A11 = utils.multiplyMatrices(parallel, rotX);
    return utils.multiplyMatrices(A11, rotY);
}

function trimetric(degX, degY, w, a, n, f) {
    var parallel = utils.MakeParallel(w, a, n, f);
    var rotX = utils.MakeRotateXMatrix(degX);
    var rotY = utils.MakeRotateYMatrix(degY);
    var A11 = utils.multiplyMatrices(parallel, rotX);
    return utils.multiplyMatrices(A11, rotY);
}

function cavalier(degZ, w, a, n, f) {
    var parallel = utils.MakeParallel(w, a, n, f);
    var shearZ = utils.MakeShearZMatrix(-Math.cos(utils.degToRad(degZ)), -Math.sin(utils.degToRad(degZ)));
    return utils.multiplyMatrices(parallel, shearZ);
}

function cabinet(degZ, w, a, n, f) {
    var p = 0.5;
    var parallel = utils.MakeParallel(w, a, n, f);
    var shearZ = utils.MakeShearZMatrix(-p * Math.cos(utils.degToRad(degZ)), -p * Math.sin(utils.degToRad(degZ)));
    return utils.multiplyMatrices(parallel, shearZ);
}