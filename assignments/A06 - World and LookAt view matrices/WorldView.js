function worldViewProjection(carx, cary, carz, cardir, camx, camy, camz) {
// Computes the world, view and projection matrices for the game.

// carx, cary and carz encodes the position of the car.
// Since the game is basically in 2D, cardir contains the rotation about the y-axis to orient the car

// The camera is placed at position camx, camy and camz. The view matrix should be computed using the
// LookAt camera matrix procedure, with the correct up-vector.

    var world1 = utils.MakeRotateYMatrix(cardir);
    var world2 = utils.MakeTranslateMatrix(carx, cary, carz);
    var world = utils.multiplyMatrices(world2, world1);

    var vectorTarget = [carx, cary, carz];
    var vectorCam = [camx, camy, camz];
    var upVector = [0, 1, 0];

    var vz = vectorDifference(vectorCam, vectorTarget);
    var normalizedVz = utils.normalizeVector3(vz);
    var vx = utils.crossVector(upVector, normalizedVz);
    var normalizedVx = utils.normalizeVector3(vx);
    var normalizedVy = utils.crossVector(normalizedVz, normalizedVx);
    var rc_t =
        [normalizedVx[0], normalizedVx[1], normalizedVx[2],
            normalizedVy[0], normalizedVy[1], normalizedVy[2],
            normalizedVz[0], normalizedVz[1], normalizedVz[2]];
    var view = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1];
    view[0] = rc_t[0];
    view[1] = rc_t[1];
    view[2] = rc_t[2];
    view[4] = rc_t[3];
    view[5] = rc_t[4];
    view[6] = rc_t[5];
    view[8] = rc_t[6];
    view[9] = rc_t[7];
    view[10] = rc_t[8];
    var prod = [];
    prod[0] = vectorCam[0]*rc_t[0]+vectorCam[1]*rc_t[1]+vectorCam[2]*rc_t[2];
    prod[1] = vectorCam[0]*rc_t[3]+vectorCam[1]*rc_t[4]+vectorCam[2]*rc_t[5];
    prod[2] = vectorCam[0]*rc_t[6]+vectorCam[1]*rc_t[7]+vectorCam[2]*rc_t[8];
    //console.log(prod);
    view[3] = -prod[0];
    view[7] = -prod[1];
    view[11] = -prod[2];
    return [world, view];
}

function vectorDifference(v1, v2) {
    let out = [];
    out[0] = v1[0] - v2[0];
    out[1] = v1[1] - v2[1];
    out[2] = v1[2] - v2[2];
    return out;
}
