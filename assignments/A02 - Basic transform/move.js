function move() {
    // Translate of +2 on the x axis, and -1 on the y axis
    let T1 = [1.0, 0.0, 0.0, 0.0,
			0.0, 1.0, 0.0, 0.0,
			0.0, 0.0, 1.0, 0.0,
			0.0, 0.0, 0.0, 1.0];
    T1 = translate(T1,2.0,-1.0,0.0);
    // Rotate of 45 degrees on the x axis
    let R1 = [1.0, 0.0, 0.0, 0.0,
			0.0, 1.0, 0.0, 0.0,
			0.0, 0.0, 1.0, 0.0,
			0.0, 0.0, 0.0, 1.0];
	R1 = rotateX(R1, 45);
    // Make the object 2 times smaller
    let S1 = [1.0, 0.0, 0.0, 0.0,
			0.0, 1.0, 0.0, 0.0,
			0.0, 0.0, 1.0, 0.0,
			0.0, 0.0, 0.0, 1.0];
	S1 = scale(S1, 0.5, 0.5, 0.5);
    // Make the object 2 times longer on the z axis, and half on the other axis
    let S2 = [1.0, 0.0, 0.0, 0.0,
			0.0, 1.0, 0.0, 0.0,
			0.0, 0.0, 1.0, 0.0,
			0.0, 0.0, 0.0, 1.0];
	S2 = scale(S2, 0.5, 0.5, 2);
    // Mirror over the z axis
    let S3 = [1.0, 0.0, 0.0, 0.0,
			0.0, 1.0, 0.0, 0.0,
			0.0, 0.0, 1.0, 0.0,
			0.0, 0.0, 0.0, 1.0];
	S3 = mirrorAxis(S3, 'z');
    // Flatten over the z axis
    let S4 = [1.0, 0.0, 0.0, 0.0,
			0.0, 1.0, 0.0, 0.0,
			0.0, 0.0, 1.0, 0.0,
			0.0, 0.0, 0.0, 1.0];
	S4 = flatten(S4, 'z');
    // Make a shear along the Y axis, with a factor of 1 along the x axis
    let H1 = [1.0, 0.0, 0.0, 0.0,
			0.0, 1.0, 0.0, 0.0,
			0.0, 0.0, 1.0, 0.0,
			0.0, 0.0, 0.0, 1.0];
	H1 = shear(H1, 'y', 1.0, 0.0);
    return [T1, R1, S1, S2, S3, S4, H1];
}

function translate(matrix, x, y, z) {
	matrix[3] = x;
	matrix[7] = y;
	matrix[11] = z;
	return matrix;
}

function rotateX(matrix, degree) {
	let rad = (degree*2*3.14)/360;
	matrix[5] = Math.cos(rad);
	matrix[6] = -Math.sin(rad);
	matrix[9] = Math.sin(rad);
	matrix[10] = Math.cos(rad);
	return matrix;
}

function scale(matrix, sx, sy, sz) {
	matrix[0] = sx;
	matrix[5] = sy;
	matrix[10] = sz;
	return matrix;
}

function mirrorAxis(matrix, axis) {
	if (axis === 'z') {
		matrix[0] = -1.0;
		matrix[5] = -1.0;
	}
	else if (axis === 'y') {
		matrix[0] = -1.0;
		matrix[10] = -1.0;
	}
	else if (axis === 'x') {
		matrix[5] = -1.0;
		matrix[10] = -1.0;
	}
	return matrix;
}

function flatten(matrix, axis) {
	if (axis === 'z') {
		matrix[10] = 0.0;
	}
	else if (axis === 'x') {
		matrix[0] = 0.0;
	}
	else if (axis === 'y') {
		matrix[5] = 0.0;
	}
	return matrix;
}

function shear(matrix, axis, h1, h2) {
	if (axis === 'y') {
		matrix[1] = h1;
		matrix[9] = h2;
	}
	else if (axis === 'x') {
		matrix[4] = h1;
		matrix[8] = h2;
	}
	else if (axis === 'z') {
		matrix[2] = h1;
		matrix[6] = h2;
	}
	return matrix;
}

