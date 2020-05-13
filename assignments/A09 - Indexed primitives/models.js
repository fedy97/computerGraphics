function buildGeometry() {
    var i;

    // Draws a Cone --- Already done, just for inspiration
    ///// Creates vertices
    var vert1 = [[0.0, 1.0, 0.0]];
    for (i = 0; i < 36; i++) {
        vert1[i + 1] = [Math.sin(i * 10.0 / 180.0 * Math.PI), -1.0, Math.cos(i * 10.0 / 180.0 * Math.PI)];
    }
    vert1[37] = [0.0, -1.0, 0.0];
    ////// Creates indices
    var ind1 = [];
    //////// Upper part
    let j = 0;
    for (i = 0; i < 36; i++) {
        ind1[j++] = 0;
        ind1[j++] = i + 1;
        ind1[j++] = (i + 1) % 36 + 1;
    }
    //////// Lower part
    for (i = 0; i < 36; i++) {
        ind1[j++] = 37;
        ind1[j++] = (i + 1) % 36 + 1;
        ind1[j++] = i + 1;
    }

    var color1 = [1.0, 0.0, 0.0];
    addMesh(vert1, ind1, color1);


    // Draws a Cylinder -- To do for the assignment.
    var vert2 = [[0.0, -1.0, 0.0]];
    //base bottom vertexes (from 0 to 37)
    for (i = 0; i < 36; i++) {
        vert2[i + 1] = [Math.sin(i * 10.0 / 180.0 * Math.PI), -1.0, Math.cos(i * 10.0 / 180.0 * Math.PI)];
    }
    //bottom center
    vert2[37] = [0.0, -1.0, 0.0];
    //base top vertexes (from 38 to 75)
    vert2[38] = [0.0, 1.0, 0.0];
    for (i = 38; i < 74; i++) {
        vert2[i + 1] = [Math.sin((i - 38) * 10.0 / 180.0 * Math.PI), 1.0, Math.cos((i - 38) * 10.0 / 180.0 * Math.PI)];
    }
    //top center
    vert2[75] = [0.0, 1.0, 0.0];

    let ind2 = [];
    j = 0;

    //////// Upper part indexes
    for (i = 0; i < 36; i++) {
        ind2[j++] = 38;
        ind2[j++] = i + 1 + 38;
        ind2[j++] = ((i + 1) % 36) + 1 + 38;
    }
    //////// Lower part indexes
    for (i = 0; i < 36; i++) {
        ind2[j++] = 0;
        ind2[j++] = (i + 1) % 36 + 1;
        ind2[j++] = i + 1;
    }

    //intorno indexes ( need vertexes from 1 to 36 and from 39 to 74 )
    for (i = 0; i < 36; i++) {
        ind2[j++] = i + 1;
        ind2[j++] = (i + 1) % 36 + 1;
        ind2[j++] = (i + 1) % 36 + 1 + 38;
    }
    //punta giu
    for (i = 0; i < 36; i++) {
        ind2[j++] = i + 1;
        ind2[j++] = (i + 1) % 36 + 1 + 38;
        ind2[j++] = i + 1 + 38;
    }

    var color2 = [0.0, 0.0, 1.0];
    addMesh(vert2, ind2, color2);


    // Draws a Sphere --- Already done, just for inspiration
    var vert3 = [[0.0, 1.0, 0.0]];
    ///// Creates vertices
    let k = 1;
    for (j = 1; j < 18; j++) {
        for (i = 0; i < 36; i++) {
            let x = Math.sin(i * 10.0 / 180.0 * Math.PI) * Math.sin(j * 10.0 / 180.0 * Math.PI);
            let y = Math.cos(j * 10.0 / 180.0 * Math.PI);
            let z = Math.cos(i * 10.0 / 180.0 * Math.PI) * Math.sin(j * 10.0 / 180.0 * Math.PI);
            vert3[k++] = [x, y, z];
        }
    }
    vert3[k++] = [0.0, -1.0, 0.0];

    ////// Creates indices
    var ind3 = [];
    k = 0;
    ///////// Lateral part
    for (i = 0; i < 36; i++) {
        for (j = 1; j < 17; j++) {
            ind3[k++] = i + (j - 1) * 36 + 1;
            ind3[k++] = i + j * 36 + 1;
            ind3[k++] = (i + 1) % 36 + (j - 1) * 36 + 1;

            ind3[k++] = (i + 1) % 36 + (j - 1) * 36 + 1;
            ind3[k++] = i + j * 36 + 1;
            ind3[k++] = (i + 1) % 36 + j * 36 + 1;
        }
    }
    //////// Upper Cap
    for (i = 0; i < 36; i++) {
        ind3[k++] = 0;
        ind3[k++] = i + 1;
        ind3[k++] = (i + 1) % 36 + 1;
    }
    //////// Lower Cap
    for (i = 0; i < 36; i++) {
        ind3[k++] = 577;
        ind3[k++] = (i + 1) % 36 + 540;
        ind3[k++] = i + 540;
    }

    var color3 = [0.0, 1.0, 0.0];
    addMesh(vert3, ind3, color3);


    /*
    x = (R + r * cos(v)) * cos(u);
    y = (R + r * cos(v)) * sin(u);
    z = r * sin(v);
    R = from O to
     */
    // Draws a Torus -- To do for the assignment
    var vert4 = [];
    let R = 1;
    let r = 0.4;
    let arc = Math.PI * 2;
    let radial = 27;
    let tubi = 36;
    k = 0;
    for (j = 0; j <= radial; j++) {
        for (i = 0; i <= tubi; i++) {
            //0 = [1.4, 0, 0]
            //1 = [0, 1.4, 0]
            //2 = [-1.4, 0, 0]
            //3 = [0, -1.4, 0] with radial = 6, tubi = 4, R = 1, r = 0.4
            //4 = [1.4, 0, 0]
            //5 = [1.2, 0, 0.34]
            //6 = [0, 1.2, 0.34]
            var u = i / tubi * arc;
            var v = j / radial * arc;
            let x = (R + r * Math.cos(v)) * Math.cos(u);
            let y = (R + r * Math.cos(v)) * Math.sin(u);
            let z = r * Math.sin(v);
            //console.log("vertex: " + k + ", coords: [" + x +","+ y + "," + z + "]");
            vert4[k] = [x, y, z];
            k++;
        }

    }
    k = 0;
	var ind4 = [];
    for (j = 1; j <= radial; j++) {
        for (i = 1; i <= tubi; i++) {
            //a = 2, b = 0, c = 1, d = 3
            var a = (tubi + 1) * j + i - 1;
            var b = (tubi + 1) * (j - 1) + i - 1;
            var c = (tubi + 1) * (j - 1) + i;
            var d = (tubi + 1) * j + i;
            //console.log(a + ", " + b + ", " + c + ", " + d);
			ind4.push(a,b,d);
            ind4.push(b, c, d);
        }

    }
    // Draws a Torus -- To do for the assignment
    //var vert4 = [[-1.0,-1.0,0.0], [1.0,-1.0,0.0], [-1.0,1.0,0.0], [1.0,1.0,0.0]];
    //var ind4 = [0, 1, 2,   1, 3, 2];
    var color4 = [1.0, 1.0, 0.0];
    addMesh(vert4, ind4, color4);
}

