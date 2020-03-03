function draw() {
	// line(x1,y1, x2,y2)
	// draws a line from a point at Normalized screen coordinates x1,y1 to Normalized screen coordinates x2,y2

	// Here there are only three lines command, but to obtain the car you will need 8 of them
	line(0.5, -0.3,-0.5,-0.3);
	line(0.3,0.3,-0.2, 0.3);
	line(-0.5,0.0,-0.5,-0.3);
	line(-0.2,0.3,-0.2,0.1);
	line(0.3,0.3,0.3,0.1);
	line(0.5,0.0,0.5,-0.3);
	line(0.3,0.1,0.5,0.0);
	line(-0.2,0.1,-0.5,0.0);
}

function draw2() {
	// this function is to draw a circle
	for(let i = 0; i < 128; i++) {
		//big circle
		x = 0 + 0.8*(Math.cos(i));
		y = 0 + 0.8*(Math.sin(i));
		z = 0 + 0.8*(Math.cos(i+0.11));
		w = 0 + 0.8*(Math.sin(i+0.11));
		//top little circle
		x1 = 0 + 0.1*(Math.cos(i));
		y1 = 0.4 + 0.1*(Math.sin(i));
		z1 = 0 + 0.1*(Math.cos(i+0.11));
		w1 = 0.4 + 0.1*(Math.sin(i+0.11));
		//bottom little circle
		x2 = 0 + 0.1*(Math.cos(i));
		y2 = -0.4 + 0.1*(Math.sin(i));
		z2 = 0 + 0.1*(Math.cos(i+0.11));
		w2 = -0.4 + 0.1*(Math.sin(i+0.11));
		//top half circle
		x3 = 0 + 0.4*(Math.cos(i));
		y3 = 0.4 + 0.4*(Math.sin(i));
		z3 = 0 + 0.4*(Math.cos(i+0.11));
		w3 = 0.4 + 0.4*(Math.sin(i+0.11));
		//bottom half circle
		x4 = 0 + 0.4*(Math.cos(i));
		y4 = -0.4 + 0.4*(Math.sin(i));
		z4 = 0 + 0.4*(Math.cos(i+0.11));
		w4 = -0.4 + 0.4*(Math.sin(i+0.11));
		//draw circles
		line(x,y,z,w);
		line(x1,y1,z1,w1);
		line(x2,y2,z2,w2);
		if (x3 >= 0) {
			line(x3,y3,z3,w3);
		} else {
			line(x4,y4,z4,w4);
		}
	}
	
	 
	
} 
