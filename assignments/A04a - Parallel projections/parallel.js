function parallel() {
	// Build a parallel projection matrix, for a 16/9 viewport, with halfwidth w=40, near plane n=1, and far plane f=101.
	let out = [1.0,		0.0,		0.0,		0.0,
			   0.0,		1.0,		0.0,		0.0,
			   0.0,		0.0,		1.0,		0.0,
			   0.0,		0.0,		0.0,		1.0];
	out = parallelProjection(out,16/9, 40, 1, 101);
	return out;
}

function parallelProjection(matrix, ratio, w, near ,far) {
	matrix[0] = 1/w;
	matrix[5] = ratio/w;
	matrix[10] = -2/(far-near);
	matrix[11] = -(far+near)/(far-near);
	return matrix;
}

