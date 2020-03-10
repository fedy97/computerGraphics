function move() {
	// Rotate 45 degrees around an arbitrary axis passing through (1,0,-1).
	// The x-axis can be aligned to the arbitrary axis after a rotation of 30 degrees around the z-axis,
	// and then -60 degrees around the y-axis.
	var rotZ = utils.MakeRotateZMatrix(30);
	var rotY = utils.MakeRotateYMatrix(-60);
	var rotX = utils.MakeRotateXMatrix(45);
	var tras = utils.MakeTranslateMatrix(1,0,-1);
	var invRotZ = utils.invertMatrix(rotZ);
	var invRotY = utils.invertMatrix(rotY);
	var invTras = utils.invertMatrix(tras);
	var R2 = utils.multiplyMatrices(tras, rotY);
	var R3 = utils.multiplyMatrices(R2, rotZ);
	var R4 = utils.multiplyMatrices(R3, rotX);
	var R5 = utils.multiplyMatrices(R4, invRotZ);
	var R6 = utils.multiplyMatrices(R5, invRotY);
	var R1 = utils.multiplyMatrices(R6, invTras);

	// Half the size of an object, using as fixed point (5,0,-2)
	var tras2 = utils.MakeTranslateMatrix(5,0,-2);
	var scale = utils.MakeScaleMatrix(0.5);
	var invTras2 = utils.invertMatrix(tras2);
	var R7 = utils.multiplyMatrices(tras2, scale);
	var S1 = utils.multiplyMatrices(R7, invTras2);

	// Mirror the starship along a plane passing through (1,1,1),
	// and obtained rotating 15 degree around the x axis the xz plane

	var tras3 = utils.MakeTranslateMatrix(1,1,1);
	var rot3 = utils.MakeRotateXMatrix(15);
	var mirror = utils.identityMatrix();
	mirror[5] = -1;
	var invTras3 = utils.invertMatrix(tras3);
	var invRot3 = utils.invertMatrix(rot3);

	var S3 = utils.multiplyMatrices(tras3,rot3);
	var S4 = utils.multiplyMatrices(S3, mirror);
	var S5 = utils.multiplyMatrices(S4,invRot3);
	var S2 = utils.multiplyMatrices(S5, invTras3);

	// Apply the inverse of the following sequence of transforms: Translation of (0, 0, 5)
	// then rotation of 30 degree around the Y axis, and finally a uniform scaling of a factor of 3.

	var tras4 = utils.MakeTranslateMatrix(0,0,5);
	var rot = utils.MakeRotateYMatrix(30);
	var scale2 = utils.MakeScaleMatrix(3);

	var invTras4 = utils.invertMatrix(tras4);
	var invRot = utils.invertMatrix(rot);
	var invScale2 = utils.invertMatrix(scale2);

	var I2 = utils.multiplyMatrices(invTras4, invRot);
	var I1 = utils.multiplyMatrices(I2, invScale2);

	return [R1, S1, S2, I1];
}

