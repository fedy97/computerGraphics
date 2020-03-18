function perspective(w, h, fov) {
	// Build a perspective projection matrix, for a viewport whose size is determined by parameters w (width) and h (height), and whose fov-y is passed in parameter fov. Near plane is n=0.1, and far plane f=100.
	var out = [0.01,		0.0,		0.0,		0.0,
			   0.0,		0.01,		0.0,		0.0,
			   0.0,		0.0,		0.01,		0.0,
			   0.0,		0.0,		0.0,		1.0];

	return out;
}

