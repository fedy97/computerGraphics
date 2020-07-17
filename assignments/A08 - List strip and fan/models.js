function buildGeometry() {
    // Draws a cube (replace the vertices)
    //if Y stays at 0, the figure is hidden because has no height
    var vert1 = [[0.0, 0.0, 1.0], [0.0, 0.0, 0.0], [1.0, 0.0, 1.0], [1.0, 0.0, 0.0], [1, 1, 1], [1, 1, 0],
        [0, 1, 0], [1, 0, 0], [0, 0, 0], [0, 1, 0], [0, 0, 1], [0, 1, 1], [1, 0, 1], [1, 1, 1], [0, 1, 1], [0, 1, 0]];

    addMesh(vert1, "S", [1.0, 0.0, 0.0]);


    // Draws a flat L-shaped pattern (replace the vertices)
    var vert2 = [[2, 0, 0], [0, 0, 0], [2, 1, 0], [0, 1, 0], [1, 1, 0], [0, 3, 0], [1, 3, 0]];

    addMesh(vert2, "S", [0.0, 0.0, 1.0]);


    // Draws a flat hexagon (replace the vertices)
    var vert3 = [[0, 0, 0], [1, 0, 0], [0.5, -0.866, 0], [-0.5,-0.866,0],[-1,0,0],[-0.5,0.866,0],[0.5,0.866,0],[1,0,0]
    ];

    addMesh(vert3, "F", [0.0, 1.0, 0.0]);

}

