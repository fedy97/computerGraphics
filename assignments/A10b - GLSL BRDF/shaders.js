function shaders() {
// The shader can find the required informations in the following variables:

//vec3 fs_pos;		// Position of the point in 3D space
//
//float SpecShine;		// specular coefficient for both Blinn and Phong
//float DToonTh;		// Threshold for diffuse in a toon shader
//float SToonTh;		// Threshold for specular in a toon shader
//
//vec4 diffColor;		// diffuse color
//vec4 ambColor;		// material ambient color
//vec4 specularColor;		// specular color
//vec4 emit;			// emitted color
//	
//vec3 normalVec;		// direction of the normal vecotr to the surface
//vec3 eyedirVec;		// looking direction
//
//
// Lighr directions can be found into:
//vec3 lightDirA;
//vec3 lightDirB;
//vec3 lightDirC;
//
//and intensity is returned into:
//
//vec4 lightColorA;
//vec4 lightColorB;
//vec4 lightColorC;
//
// Ambient light contribution can be found intop
//
// vec4 ambientLight;

// Lambert diffuse and Ambient material
var S1 = `
	vec4 LAcontr = clamp(dot(lightDirA, normalVec),0.0,1.0) * lightColorA;
	vec4 LBcontr = clamp(dot(lightDirB, normalVec),0.0,1.0) * lightColorB;
	vec4 LCcontr = clamp(dot(lightDirC, normalVec),0.0,1.0) * lightColorC;
	out_color = clamp(diffColor * (LAcontr + LBcontr + LCcontr) + ambientLight * ambColor, 0.0, 1.0);
`;

// Lambert diffuse and Blinn specular
var S2 = `
	vec4 dLAcontr = clamp(dot(lightDirA, normalVec),0.0,1.0) * lightColorA;
	vec4 dLBcontr = clamp(dot(lightDirB, normalVec),0.0,1.0) * lightColorB;
	vec4 dLCcontr = clamp(dot(lightDirC, normalVec),0.0,1.0) * lightColorC;
	vec4 diffuse = diffColor * (dLAcontr + dLBcontr + dLCcontr);

	vec4 sLAcontr = pow(clamp(dot(normalize(eyedirVec+lightDirA), normalVec),0.0,1.0), SpecShine) * lightColorA;
	vec4 sLBcontr = pow(clamp(dot(normalize(eyedirVec+lightDirB), normalVec),0.0,1.0), SpecShine) * lightColorB;
	vec4 sLCcontr = pow(clamp(dot(normalize(eyedirVec+lightDirC), normalVec),0.0,1.0), SpecShine) * lightColorC;
	vec4 specular = specularColor * (sLAcontr + sLBcontr + sLCcontr);
	out_color = clamp(diffuse + specular, 0.0, 1.0);
`;

// No diffuse, ambient and Blinn specular
var S3 = `
	vec4 ambLight = ambientLight * ambColor;
	vec4 sLAcontr = pow(clamp(dot(normalize(eyedirVec+lightDirA), normalVec),0.0,1.0), SpecShine) * lightColorA;
	vec4 sLBcontr = pow(clamp(dot(normalize(eyedirVec+lightDirB), normalVec),0.0,1.0), SpecShine) * lightColorB;
	vec4 sLCcontr = pow(clamp(dot(normalize(eyedirVec+lightDirC), normalVec),0.0,1.0), SpecShine) * lightColorC;
	vec4 blinn_specular = specularColor * (sLAcontr + sLBcontr + sLCcontr);
	out_color = clamp(blinn_specular + ambLight, 0.0, 1.0);
`;

// Diffuse and Phong specular
var S4 = `
	vec4 dLAcontr = clamp(dot(lightDirA, normalVec),0.0,1.0) * lightColorA;
	vec4 dLBcontr = clamp(dot(lightDirB, normalVec),0.0,1.0) * lightColorB;
	vec4 dLCcontr = clamp(dot(lightDirC, normalVec),0.0,1.0) * lightColorC;
	vec4 diffuse = diffColor * (dLAcontr + dLBcontr + dLCcontr);
	
	vec3 rA = 2.0 * normalVec * dot(lightDirA, normalVec) - lightDirA;
	vec3 rB = 2.0 * normalVec * dot(lightDirB, normalVec) - lightDirB;
	vec3 rC = 2.0 * normalVec * dot(lightDirC, normalVec) - lightDirC;
	vec4 sLAcontr2 = pow(clamp(dot(eyedirVec, rA),0.0,1.0), SpecShine) * lightColorA;
	vec4 sLBcontr2 = pow(clamp(dot(eyedirVec, rB),0.0,1.0), SpecShine) * lightColorB;
	vec4 sLCcontr2 = pow(clamp(dot(eyedirVec, rC),0.0,1.0), SpecShine) * lightColorC;
	vec4 phong_specular = specularColor * (sLAcontr2 + sLBcontr2 + sLCcontr2);
	
	out_color = clamp(diffuse + phong_specular, 0.0, 1.0);
`;

// Diffuse, ambient, emission and Phong specular
var S5 = `
	vec4 dLAcontr = clamp(dot(lightDirA, normalVec),0.0,1.0) * lightColorA;
	vec4 dLBcontr = clamp(dot(lightDirB, normalVec),0.0,1.0) * lightColorB;
	vec4 dLCcontr = clamp(dot(lightDirC, normalVec),0.0,1.0) * lightColorC;
	vec4 diffuse = diffColor * (dLAcontr + dLBcontr + dLCcontr);
	vec3 rA = 2.0 * normalVec * dot(lightDirA, normalVec) - lightDirA;
	vec3 rB = 2.0 * normalVec * dot(lightDirB, normalVec) - lightDirB;
	vec3 rC = 2.0 * normalVec * dot(lightDirC, normalVec) - lightDirC;
	vec4 sLAcontr2 = pow(clamp(dot(eyedirVec, rA),0.0,1.0), SpecShine) * lightColorA;
	vec4 sLBcontr2 = pow(clamp(dot(eyedirVec, rB),0.0,1.0), SpecShine) * lightColorB;
	vec4 sLCcontr2 = pow(clamp(dot(eyedirVec, rC),0.0,1.0), SpecShine) * lightColorC;
	vec4 phong_specular = specularColor * (sLAcontr2 + sLBcontr2 + sLCcontr2);
	vec4 ambLight = ambientLight * ambColor;
	out_color = clamp(diffuse + phong_specular + ambLight + emit, 0.0, 1.0);
`;

// Ambient + Oren-Nayar with roughness sigma=0.5 (consider only Light A)
var S6 = `
	vec4 ambLight = ambientLight * ambColor;
	vec4 L = diffColor * clamp(dot(lightDirA, normalVec), 0.0, 1.0);
	float A = 1.0 - 0.5*(pow(0.5,2.0) / pow(0.5,2.0) + 0.33);
	float B = 0.45*(pow(0.5,2.0) / pow(0.5,2.0) + 0.09);
	vec3 vi = normalize(lightDirA - dot(lightDirA, normalVec)*normalVec);
	vec3 vr = normalize(eyedirVec - dot(eyedirVec, normalVec)*normalVec);
	float G = max(0.0, dot(vi,vr));
	float tetai = acos(dot(lightDirA, normalVec));
	float tetar = acos(dot(eyedirVec, normalVec));
	float alfa = max(tetai, tetar);
	float beta = min(tetai, tetar);
	vec4 oren = L*(A+B*G*sin(alfa)*tan(beta));
	out_color = clamp(ambLight + oren, 0.0, 1.0);
`;

	return [S1, S2, S3, S4, S5, S6];
}

