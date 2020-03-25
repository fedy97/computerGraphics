// these global variables are used to contain the current angles of the world
// HERE YOU WILL HAVE TO ADD ONE OR MORE GLOBAL VARIABLES TO CONTAIN THE ORIENTATION
// OF THE OBJECT
var qOld = null;
// this function returns the world matrix with the updated rotations.
// parameters rvx, rvy and rvz contains a value in the -1 .. +1 range that tells the angular velocity of the world.
function updateWorld(rvx, rvy, rvz) {
    var angle = utils.degToRad(1);
    var q1 = [];
    // compute the rotation matrix
    if (rvx === 0 && rvy === 0 && rvz === 0) {
        if (qOld == null) {
            qOld = Quaternion.fromAxisAngle([1, 0, 0], angle).toMatrix4();
        }
    } else {
        var matr = Quaternion.fromAxisAngle([rvx, rvy, rvz], angle).toMatrix4();
        q1 = utils.multiplyMatrices(matr, qOld);
        qOld = q1;
    }

    return qOld;
}

