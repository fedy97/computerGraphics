// these global variables are used to contain the current angles of the world
// HERE YOU WILL HAVE TO ADD ONE OR MORE GLOBAL VARIABLES TO CONTAIN THE ORIENTATION
// OF THE OBJECT
var qOld = null;
let rotationSpeed = 2;
// this function returns the world matrix with the updated rotations.
// parameters rvx, rvy and rvz contains a value in the -1 .. +1 range that tells the angular velocity of the world.
function updateWorld(rvx, rvy, rvz) {
    var angle = utils.degToRad(rotationSpeed);
    var qNew = [];
    //if no keys are pressed
    if (rvx === 0 && rvy === 0 && rvz === 0) {
        //set the initial rotation, it occurs only once
        if (qOld == null)
            qOld = Quaternion.fromAxisAngle([1, 0, 0], 0).toMatrix4();
    } else {
        var currRot = Quaternion.fromAxisAngle([rvx, rvy, rvz], angle).toMatrix4();
        qNew = utils.multiplyMatrices(currRot, qOld);
        qOld = qNew;
    }

    return qOld;
}

