function anim() {
    let quat0 = Quaternion.fromAxisAngle([1, 0, 0], utils.degToRad(0));
    let quat1 = Quaternion.fromAxisAngle([0, 1, 0], utils.degToRad(90));
    let quat2 = Quaternion.fromAxisAngle([0, 1, 0], utils.degToRad(180));
    quat2 = quat2.mul(Quaternion.fromAxisAngle([0, 0, 1], utils.degToRad(90)));
    let quat3 = Quaternion.fromAxisAngle([0, 1, 0], utils.degToRad(180));
    let quat4 = Quaternion.fromAxisAngle([0, 1, 0], utils.degToRad(270));
    let quat5 = Quaternion.fromAxisAngle([0, 0, 1], utils.degToRad(-90));
    return [
        [2, [4, 0, 0], quat0,
            [8, 0, 0], quat0,
            [8, 0, 0], quat1,
            [8, 0, 0], quat1],

        [3, [8, 0, 0], quat1,
            [8, 0, -8], quat1,
            [8, 0, -8], quat2,
            [8, 4, -8], quat2],

        [2, [8, 4, -8], quat2,
            [8, 8, -8], quat2,
            [8, 8, -8], quat3,
            [4, 8, -8], quat3],

        [2, [4, 8, -8], quat3,
            [0, 8, -8], quat3,
            [0, 8, -8], quat4,
            [0, 8, -8], quat4],

        [3, [0, 8, -8], quat4,
            [0, 8, 0], quat4,
            [0, 8, 0], quat5,
            [0, 4, 0], quat5],

        [2, [0, 4, 0], quat5,
            [0, 0, 0], quat5,
            [0, 0, 0], quat0,
            [4, 0, 0], quat0],
    ];
}