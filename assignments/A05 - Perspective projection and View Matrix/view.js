function view(cx, cy, cz, alpha, beta, rho) {
    // Create a view matrix for a camera in position cx, cy and cz, looking in the direction specified by
    // alpha, beta and rho, as outlined in the course slides.

    var invRotZ = utils.MakeRotateZMatrix(-rho);
    var invRotX = utils.MakeRotateXMatrix(-beta);
    var invRotY = utils.MakeRotateYMatrix(-alpha);
    var invTras = utils.MakeTranslateMatrix(-cx, -cy, -cz);
    var out1 = utils.multiplyMatrices(invRotZ, invRotX);
    var out2 = utils.multiplyMatrices(out1, invRotY);
    var out = utils.multiplyMatrices(out2, invTras);
    return out;
}

