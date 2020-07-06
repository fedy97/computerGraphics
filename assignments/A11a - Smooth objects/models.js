function buildGeometry() {
    var i;

    // Draws a pyramid --- Already done, just for inspiration
    var vert1 = [[0.0, 1.0, 0.0], [1.0, -1.0, -1.0], [-1.0, -1.0, -1.0],
        [0.0, 1.0, 0.0], [1.0, -1.0, 1.0], [1.0, -1.0, -1.0],
        [0.0, 1.0, 0.0], [-1.0, -1.0, 1.0], [1.0, -1.0, 1.0],
        [0.0, 1.0, 0.0], [-1.0, -1.0, -1.0], [-1.0, -1.0, 1.0],
        [-1.0, -1.0, -1.0], [1.0, -1.0, -1.0], [1.0, -1.0, 1.0], [-1.0, -1.0, 1.0],
    ];
    var norm1 = [[0.0, 0.4472, -0.8944], [0.0, 0.4472, -0.8944], [0.0, 0.4472, -0.8944],
        [0.8944, 0.4472, 0.0], [0.8944, 0.4472, 0.0], [0.8944, 0.4472, 0.0],
        [0.0, 0.4472, 0.8944], [0.0, 0.4472, 0.8944], [0.0, 0.4472, 0.8944],
        [-0.8944, 0.4472, 0.0], [-0.8944, 0.4472, 0.0], [-0.8944, 0.4472, 0.0],
        [0.0, -1.0, 0.0], [0.0, -1.0, 0.0], [0.0, -1.0, 0.0], [0.0, -1.0, 0.0]
    ];
    var ind1 = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 12, 14, 15];
    var color1 = [0.0, 0.0, 1.0];
    addMesh(vert1, norm1, ind1, color1);

    // Draws a cube -- To do for the assignment.
    var vert2 = [[0.0, 0.0, 0.0], [1.0, 0.0, 0.0], [1.0, 1.0, 0.0], [0.0, 1.0, 0.0], [0.0, 1.0, 1.0], [1.0, 1.0, 1.0], [1.0, 0.0, 1.0], [0.0, 0.0, 1.0],
        [0.0, 0.0, 0.0], [1.0, 0.0, 0.0], [1.0, 1.0, 0.0], [0.0, 1.0, 0.0], [0.0, 1.0, 1.0], [1.0, 1.0, 1.0], [1.0, 0.0, 1.0], [0.0, 0.0, 1.0],
        [0.0, 0.0, 0.0], [1.0, 0.0, 0.0], [1.0, 1.0, 0.0], [0.0, 1.0, 0.0], [0.0, 1.0, 1.0], [1.0, 1.0, 1.0], [1.0, 0.0, 1.0], [0.0, 0.0, 1.0]];
    var norm2 = [[0.0, 0.0, -1.0], [0.0, 0.0, -1.0], [0.0, 0.0, -1.0], [0.0, 0.0, -1.0], [0.0, 0.0, 1.0], [0.0, 0.0, 1.0], [0.0, 0.0, 1.0], [0.0, 0.0, 1.0],
        [-1.0, 0.0, 0.0], [1.0, 0.0, 0.0], [1.0, 0.0, 0.0], [-1.0, 0.0, 0.0], [-1.0, 0.0, 0.0], [1.0, 0.0, 0.0], [1.0, 0.0, 0.0], [-1.0, 0.0, 0.0],
        [0.0, -1.0, 0.0], [0.0, -1.0, 0.0], [0.0, 1.0, 0.0], [0.0, 1.0, 0.0], [0.0, 1.0, 0.0], [0.0, 1.0, 0.0], [0.0, -1.0, 0.0], [0.0, -1.0, 0.0]];
    var ind2 = [0, 2, 1, 0, 3, 2, 18, 19, 20, 18, 20, 21, 9, 10, 13, 9, 13, 14, 8, 15, 12, 8, 12, 11, 5, 4, 7, 5, 7, 6, 16, 22, 23, 16, 17, 22];
    var color2 = [0.0, 1.0, 1.0];
    addMesh(vert2, norm2, ind2, color2);

    // Draws a Cylinder --- Already done, just for inspiration
    ///// Creates vertices
    var vert3 = [[0.0, 1.0, 0.0]];
    var norm3 = [[0.0, 1.0, 0.0]];
    for (i = 0; i < 36; i++) {
        vert3[i + 1] = [Math.sin(i * 10.0 / 180.0 * Math.PI), 1.0, Math.cos(i * 10.0 / 180.0 * Math.PI)];
        norm3[i + 1] = [0.0, 1.0, 0.0];
        vert3[i + 37] = [Math.sin(i * 10.0 / 180.0 * Math.PI), 1.0, Math.cos(i * 10.0 / 180.0 * Math.PI)];
        norm3[i + 37] = [Math.sin(i * 10.0 / 180.0 * Math.PI), 0.0, Math.cos(i * 10.0 / 180.0 * Math.PI)];
        vert3[i + 73] = [Math.sin(i * 10.0 / 180.0 * Math.PI), -1.0, Math.cos(i * 10.0 / 180.0 * Math.PI)];
        norm3[i + 73] = [Math.sin(i * 10.0 / 180.0 * Math.PI), 0.0, Math.cos(i * 10.0 / 180.0 * Math.PI)];
        vert3[i + 109] = [Math.sin(i * 10.0 / 180.0 * Math.PI), -1.0, Math.cos(i * 10.0 / 180.0 * Math.PI)];
        norm3[i + 109] = [0.0, -1.0, 0.0];
    }
    vert3[145] = [0.0, -1.0, 0.0];
    norm3[145] = [0.0, -1.0, 0.0];
    ////// Creates indices
    var ind3 = [];
    //////// Upper part
    j = 0;
    for (i = 0; i < 36; i++) {
        ind3[j++] = 0;
        ind3[j++] = i + 1;
        ind3[j++] = (i + 1) % 36 + 1;
    }
    //////// Lower part
    for (i = 0; i < 36; i++) {
        ind3[j++] = 145;
        ind3[j++] = (i + 1) % 36 + 109;
        ind3[j++] = i + 109;
    }
    //////// Mid part
    for (i = 0; i < 36; i++) {
        ind3[j++] = i + 73;
        ind3[j++] = (i + 1) % 36 + 37;
        ind3[j++] = i + 37;

        ind3[j++] = (i + 1) % 36 + 37;
        ind3[j++] = i + 73;
        ind3[j++] = (i + 1) % 36 + 73;
    }
    var color3 = [1.0, 0.0, 1.0];
    addMesh(vert3, norm3, ind3, color3);


    // Draws a Cone -- To do for the assignment.
    var norm4 = [];
    ///// Creates vertices
    var vert4 = [];
    var ind4 = [];
    var circles = 10.0;
    var edges = 50;
    var ray = 1.0;
    var curr_ray = ray;
    var k = 0;
    var curr_height = -1.0;
    for (var j = 0; j <= circles; j++) {
        for (i = 0; i < edges; i++) {
            var normm1 = [Math.sin(i * (360/edges) / 180.0 * Math.PI), 1.0 / 2.0, Math.cos(i * (360/edges) / 180.0 * Math.PI)];
            var abbs = Math.sqrt(Math.pow(normm1[0], 2) + Math.pow(normm1[1], 2) + Math.pow(normm1[2], 2));
            norm4[k] = [normm1[0] / abbs, normm1[1] / abbs, normm1[2] / abbs];
            vert4[k] = [curr_ray * Math.sin(i * (360/edges) / 180.0 * Math.PI), curr_height, curr_ray * Math.cos(i * (360/edges) / 180.0 * Math.PI)]
            k++;
        }
        curr_ray = curr_ray - (ray / circles);
        curr_height = curr_height + (2.0/circles);
    }
    var l = k;
    vert4[k] = [0.0, -1.0, 0.0];
    norm4[k] = [0.0, -1.0, 0.0];
    k++;
    //base verso il giu
    for (i = 0; i < edges; i++) {
        norm4[k] = [0.0, -1.0, 0.0];
        vert4[k] = [Math.sin(i * (360/edges) / 180.0 * Math.PI), -1.0, Math.cos(i * (360/edges) / 180.0 * Math.PI)];
        k++;
    }

    for (j = 1; j <= circles; j++) {
        for (i = 1; i <= edges; i++) {
            /*var a = (tubi + 1) * j + i - 1;
            var b = (tubi + 1) * (j - 1) + i - 1;
            var c = (tubi + 1) * (j - 1) + i;
            var d = (tubi + 1) * j + i;*/
            var a = edges * j + i - 1; //36 - 37 --- 71
            var b = edges * (j - 1) + i - 1; //0 - 1 --- 35
            var c = edges * (j - 1) + i; //1 - 2 --- 36
            var d = edges * j + i; //37 - 38 --- 72
            if (i === edges) {
                c = c - edges;
                d = d - edges;
            }
            ind4.push(b, c, a);
            ind4.push(c, d, a);
        }
    }
    for (i = 0; i < edges - 1; i++)
        ind4.push(i % edges + l + 2, i + l + 1, l);
    ind4.push(l+1,l+edges,l);
    /*
    for (i = 0; i < 36; i++) {
        var normm1 = [Math.sin(i * 10.0 / 180.0 * Math.PI), 1.0 / 2.0, Math.cos(i * 10.0 / 180.0 * Math.PI)];
        var abbs = Math.sqrt(Math.pow(normm1[0], 2) + Math.pow(normm1[1], 2) + Math.pow(normm1[2], 2));
        norm4[i] = [normm1[0], normm1[1], normm1[2]];
        vert4[i] = [Math.sin(i * 10.0 / 180.0 * Math.PI), -1.0, Math.cos(i * 10.0 / 180.0 * Math.PI)];
    }
    vert4[36] = [0.0, -1.0, 0.0];
    norm4[36] = [0.0, -1.0, 0.0];
    //corona
    for (i = 37; i < 73; i++) {
        var normm2 = [Math.sin((i - 37) * 10.0 / 180.0 * Math.PI), 1.0 / 2.0, Math.cos((i - 37) * 10.0 / 180.0 * Math.PI)];
        var abbs2 = Math.sqrt(Math.pow(normm2[0], 2) + Math.pow(normm2[1], 2) + Math.pow(normm2[2], 2));
        norm4[i] = [0.0,1.0,0.0];
        vert4[i] = [0.0, 1.0, 0.0];
    }
    //base verso il giu
    for (i = 73; i < 109; i++) {
        norm4[i] = [0.0, -1.0, 0.0];
        vert4[i] = [Math.sin((i - 73) * 10.0 / 180.0 * Math.PI), -1.0, Math.cos((i - 73) * 10.0 / 180.0 * Math.PI)];
    }
    ////// Creates indices
    var ind4 = [];
    //////// Upper part
    var j = 0;
    for (i = 0; i < 35; i++) {
        ind4[j++] = i + 37;
        ind4[j++] = i;
        ind4[j++] = (i) % 36 + 1;
    }
    ind4[j++] = 72;
    ind4[j++] = 35;
    ind4[j++] = 0;
    //////// Lower part
    for (i = 0; i < 35; i++) {
        ind4[j++] = (i) % 36 + 74;
        ind4[j++] = i + 73;
        ind4[j++] = 36;
    }
    ind4[j++] = 73;
    ind4[j++] = 108;
    ind4[j++] = 36;
    */
    var color4 = [1.0, 1.0, 0.0];
    addMesh(vert4, norm4, ind4, color4);


    // Draws a Sphere --- Already done, just for inspiration
    var vert5 = [[0.0, 1.0, 0.0]];
    var norm5 = [[0.0, 1.0, 0.0]];
    ///// Creates vertices
    k = 1;
    for (j = 1; j < 18; j++) {
        for (i = 0; i < 36; i++) {
            x = Math.sin(i * 10.0 / 180.0 * Math.PI) * Math.sin(j * 10.0 / 180.0 * Math.PI);
            y = Math.cos(j * 10.0 / 180.0 * Math.PI);
            z = Math.cos(i * 10.0 / 180.0 * Math.PI) * Math.sin(j * 10.0 / 180.0 * Math.PI);
            norm5[k] = [x, y, z];
            vert5[k++] = [x, y, z];
        }
    }
    lastVert = k;
    norm5[k] = [0.0, -1.0, 0.0];
    vert5[k++] = [0.0, -1.0, 0.0];

    ////// Creates indices
    var ind5 = [];
    k = 0;
    ///////// Lateral part
    for (i = 0; i < 36; i++) {
        for (j = 1; j < 17; j++) {
            ind5[k++] = i + (j - 1) * 36 + 1;
            ind5[k++] = i + j * 36 + 1;
            ind5[k++] = (i + 1) % 36 + (j - 1) * 36 + 1;

            ind5[k++] = (i + 1) % 36 + (j - 1) * 36 + 1;
            ind5[k++] = i + j * 36 + 1;
            ind5[k++] = (i + 1) % 36 + j * 36 + 1;
        }
    }
    //////// Upper Cap
    for (i = 0; i < 36; i++) {
        ind5[k++] = 0;
        ind5[k++] = i + 1;
        ind5[k++] = (i + 1) % 36 + 1;
    }
    //////// Lower Cap
    for (i = 0; i < 36; i++) {
        ind5[k++] = lastVert;
        ind5[k++] = (i + 1) % 36 + 541;
        ind5[k++] = i + 541;
    }
    var color5 = [0.8, 0.8, 1.0];
    addMesh(vert5, norm5, ind5, color5);

    // Draws a Torus -- To do for the assignment.
    var vert6 = [];
    var norm6 = [];
    var ind6 = [];
    let R = 1;
    let r = 0.4;
    let arc = Math.PI * 2;
    k = 0;
    let radial = 27;
    let tubi = 36;
    for (j = 0; j <= radial; j++) {
        for (i = 0; i <= tubi; i++) {

            var u = i / tubi * arc;
            var v = j / radial * arc;
            let x = (R + r * Math.cos(v)) * Math.cos(u);
            let y = (R + r * Math.cos(v)) * Math.sin(u);
            let z = r * Math.sin(v);
            var center = [R * Math.cos(u), R * Math.sin(u), 0.0];

            vert6[k] = [x, y, z];
            var normal = [x - center[0], y - center[1], z - center[2]];
            var abss = normal[0] * normal[0] + normal[1] * normal[1] + normal[2] * normal[2];
            var sqrtabs = Math.sqrt(abss);
            //console.log("normal: " + normal + ", center: " + center);
            normal[0] = normal[0] / sqrtabs;
            normal[1] = normal[1] / sqrtabs;
            normal[2] = normal[2] / sqrtabs;
            norm6[k] = [normal[0], normal[1], normal[2]];
            //console.log("vertex: " + k + ", coords: [" + x + "," + y + "," + z + "]");
            //console.log("normalized: " + normal);
            k++;
        }

    }
    for (j = 1; j <= radial; j++) {
        for (i = 1; i <= tubi; i++) {

            var a = (tubi + 1) * j + i - 1;
            var b = (tubi + 1) * (j - 1) + i - 1;
            var c = (tubi + 1) * (j - 1) + i;
            var d = (tubi + 1) * j + i;

            ind6.push(a, b, d);
            ind6.push(b, c, d);
        }

    }
    var color6 = [1.0, 0.0, 0.0];
    addMesh(vert6, norm6, ind6, color6);
}

