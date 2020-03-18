function perspective(w, h, fov) {
    // Build a perspective projection matrix,
    // for a viewport whose size is determined by parameters w (width) and h (height),
    // and whose fov-y is passed in parameter fov. Near plane is n=0.1, and far plane f=100.
    return perspectiveMatrix(w, h, fov, 0.1, 100);
}

function perspectiveMatrix(w, h, fov, near, far) {
    var a = w / h;
    var matrix = utils.identityMatrix();
    matrix[0] = 1 / (a * Math.tan(utils.degToRad(fov) / 2));
    matrix[10] = (far + near) / (near - far);
    matrix[5] = 1 / (Math.tan(utils.degToRad(fov) / 2));
    matrix[11] = (2 * far * near) / (near - far);
    matrix[14] = -1.0;
    matrix[15] = 0.0;
    return matrix;
}

