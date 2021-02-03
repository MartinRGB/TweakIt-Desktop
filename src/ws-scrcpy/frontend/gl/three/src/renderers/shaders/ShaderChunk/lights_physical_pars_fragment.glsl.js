export default /* glsl */`
struct PhysicalMaterial {

	vec3 diffuseColor;
	float specularRoughness;
	vec3 specularColor;

#ifdef CLEARCOAT
	float clearcoat;
	float clearcoatRoughness;
#endif
#ifdef USE_SHEEN
	vec3 sheenColor;
#endif

};

#define MAXIMUM_SPECULAR_COEFFICIENT 0.16
#define DEFAULT_SPECULAR_COEFFICIENT 0.04

// Clear coat directional hemishperical reflectance (this approximation should be improved)
float clearcoatDHRApprox( const in float roughness, const in float dotNL ) {

	return DEFAULT_SPECULAR_COEFFICIENT + ( 1.0 - DEFAULT_SPECULAR_COEFFICIENT ) * ( pow( 1.0 - dotNL, 5.0 ) * pow( 1.0 - roughness, 2.0 ) );

}

#if NUM_RECT_AREA_LIGHTS > 0

	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in GeometricContext geometry, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {

		vec3 normal = geometry.normal;
		vec3 viewDir = geometry.viewDir;
		vec3 position = geometry.position;
		vec3 lightPosition = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.specularRoughness;

		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPosition + halfWidth - halfHeight; // counterclockwise; light shines in local neg z direction
		rectCoords[ 1 ] = lightPosition - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPosition - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPosition + halfWidth + halfHeight;

		vec2 uv = LTC_Uv( normal, viewDir, roughness );

		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );

		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);

		// LTC Fresnel Approximation by Stephen Hill
		// http://blog.selfshadow.com/publications/s2016-advances/s2016_ltc_fresnel.pdf
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );

		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );

		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );

	}

#endif

#if NUM_TEXTURE_AREA_LIGHTS > 0

	// vec3 projectOnPlane( vec3 point, vec3 planeCenter, vec3 planeNorm ) {    
	// 	return point - dot( point - planeCenter, planeNorm ) * planeNorm;   
	// }  
	// bool sideOfPlane( vec3 point, vec3 planeCenter, vec3 planeNorm ) {    
	// 	return ( dot( point - planeCenter, planeNorm ) >= 0.0 );    
	// }   
	// vec3 linePlaneIntersect( vec3 lp, vec3 lv, vec3 pc, vec3 pn ) {    
	// 	return lp + lv * ( dot( pn, pc - lp ) / dot( pn, lv ) );    
	// }   

	vec3 projectOnPlane1( vec3 point, vec3 planeCenter, vec3 planeNorm ) {    
		return point - dot( point - planeCenter, planeNorm ) * planeNorm;   
	}  
	bool sideOfPlane1( vec3 point, vec3 planeCenter, vec3 planeNorm ) {    
		return ( dot( point - planeCenter, planeNorm ) >= 0.0 );    
	}   
	vec3 linePlaneIntersect1( vec3 lp, vec3 lv, vec3 pc, vec3 pn ) {    
		return lp + lv * ( dot( pn, pc - lp ) / dot( pn, lv ) );    
	}   

	vec3 areaDiffuse=vec3(0.);
	vec3 areaSpecular=vec3(0.);

	float calculateAttenuation( float dist, float constantAttenuation, float linearAttenuation,float quadraticAttenuation) { 
		return ( 1.0 / ( constantAttenuation + linearAttenuation * dist + quadraticAttenuation * dist * dist ) );    
	}   

	void RE_Direct_TextureArea_Physical( const in TextureAreaLight textureAreaLight, const in GeometricContext geometry, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {

		vec3 normal = geometry.normal;
		vec3 viewDir = geometry.viewDir;
		vec3 position = geometry.position;
		vec3 halfWidth = textureAreaLight.halfWidth;
		vec3 halfHeight = textureAreaLight.halfHeight;
		vec3 lightColor = textureAreaLight.areaLightColor;
		vec3 lightPosition = textureAreaLight.areaLightPosition;
		vec3 lightNormal = textureAreaLight.areaLightNormal;
		vec3 lightRight = textureAreaLight.areaLightRight;
		vec3 lightUp = textureAreaLight.areaLightUp;
		vec2 lightSize = textureAreaLight.areaLightSize;
		vec3 lightAttenuation = textureAreaLight.areaLightAttenuation;
		float lightIntensity = textureAreaLight.areaLightIntensity;

		// =============== Method I(Three WithOutTexture) - begin ===============

		// float roughness = material.specularRoughness;

		// vec3 rectCoords[ 4 ];
		// rectCoords[ 0 ] = lightPosition + halfWidth - halfHeight; // counterclockwise; light shines in local neg z direction
		// rectCoords[ 1 ] = lightPosition - halfWidth - halfHeight;
		// rectCoords[ 2 ] = lightPosition - halfWidth + halfHeight;
		// rectCoords[ 3 ] = lightPosition + halfWidth + halfHeight;

		// vec2 uv = LTC_Uv( normal, viewDir, roughness );
		
		// vec4 t1 = texture2D( ltc_1, uv );
		// vec4 t2 = texture2D( ltc_2, uv );
		// mat3 mInv = mat3(
		// 	vec3( t1.x, 0, t1.y ),
		// 	vec3(    0, 1,    0 ),
		// 	vec3( t1.z, 0, t1.w )
		// );


		// // LTC Fresnel Approximation by Stephen Hill
		// // http://blog.selfshadow.com/publications/s2016-advances/s2016_ltc_fresnel.pdf
		// vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );

		// reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );

		// reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );

		// ============== Method I(Three WithOutTexture) - end =============

		// =============== Method II(AQ) - begin Texure Area ===============

		// vec3 specular = vec3(1.);
		// float shininess = 30.;

		// float w=lightSize.x;
		// float h=lightSize.y;
		// vec3 vertexPosition=-vViewPosition.xyz;
		// vec3 proj=projectOnPlane1(vertexPosition,lightPosition,lightPosition);
		// vec3 dir=proj-lightPosition;
		// vec2 diagonal=vec2(dot(dir,lightRight),dot(dir,lightUp));
		// vec2 nearest2D=vec2(clamp(diagonal.x,-w,w),clamp(diagonal.y,-h,h));
		// vec3 nearestPointInside=lightPosition+(lightRight*nearest2D.x+lightUp*nearest2D.y);
		// vec3 lightDir=normalize(nearestPointInside-vertexPosition);
		// float NdotL=max(dot(lightNormal,-lightDir),0.);
		// float NdotL2=max(dot(normal,lightDir),0.);
		
		// vec3 areaDiffuseWeight=vec3(sqrt(NdotL*NdotL2));
		// float dist=distance(vertexPosition,nearestPointInside);
		// float attenuation=calculateAttenuation(dist,lightAttenuation.x,lightAttenuation.y,lightAttenuation.z);
		// vec3 areaDiffuseTerm=diffuse*areaDiffuseWeight*lightColor*attenuation;

		// //#ifdef AREA_TEXTURE
		// float d=distance(vertexPosition,nearestPointInside);
        // vec2 co=(diagonal.xy+vec2(w,h))/(2.*vec2(w,h));
        // co.y=1.-co.y;
        // vec3 ve=vertexPosition-lightPosition;
        // vec4 diff=vec4(0.);
        // if(dot(ve,lightNormal)<0.){
        //     diff=vec4(0.);
        // }else{
        //     float lod=max(pow(d,.1),0.)*5.;
        //     vec4 t00=texture2D(ltc_1,co,lod);
		// 	vec4 t01=texture2D(ltc_2,co,lod+1.);
        //     diff=mix(t00,t01,.5);
        // }
		// areaDiffuseTerm*=diff.xyz;
		// // #endif
		// areaDiffuse+= areaDiffuseTerm;
		
		// vec3 R=reflect(normalize(-vertexPosition),normal);
		// vec3 E=linePlaneIntersect1(vertexPosition,R,lightPosition,lightNormal);
		// float specAngle=dot(R,lightNormal);
		

		// if(dot(vertexPosition-lightPosition,lightNormal)>=0.&&specAngle>0.){
		// 	vec3 dirSpec=E-lightPosition;
		// 	vec2 dirSpec2D=vec2(dot(dirSpec,lightRight),dot(dirSpec,lightUp));
		// 	vec2 nearestSpec2D=vec2(clamp(dirSpec2D.x,-w,w),clamp(dirSpec2D.y,-h,h));
		// 	float specFactor=1.-clamp(length(nearestSpec2D-dirSpec2D)*.05*shininess,0.,1.);
		// 	vec3 areaSpecularWeight=specFactor*specAngle*areaDiffuseWeight;
		// 	vec3 areaSpecularTerm=specular*areaSpecularWeight*lightColor*attenuation;
		// 	//#ifdef AREA_TEXTURE
		// 	float hard=16.;
		// 	float gloss=16.;
		// 	vec3 specPlane=lightPosition+(lightRight*dirSpec2D.x+lightUp*dirSpec2D.y);
		// 	float dist=max(distance(vertexPosition,specPlane),0.);
		// 	float d=((1./hard)/2.)*(dist/gloss);
		// 	w=max(w,0.);
		// 	h=max(h,0.);
		// 	vec2 co=dirSpec2D/(d+1.);
		// 	co/=2.*vec2(w,h);
		// 	co=co+vec2(.5);
		// 	co.y=1.-co.y;
		// 	float lod=(2./hard*max(dist,0.));
		// 	vec4 t00=texture2D(ltc_1,co,lod);
		// 	vec4 t01=texture2D(ltc_2,co,lod+1.);
		// 	vec4 spec=mix(t00,t01,.5);
		// 	areaSpecularTerm*=spec.xyz;

		// 	// #endif
		// 	areaSpecular+=areaSpecularTerm;
		// }

		// reflectedLight.directSpecular += areaSpecular;
		// reflectedLight.directDiffuse += areaDiffuse;

		// =============== end Texure Area ===============

		float roughness = material.specularRoughness;
	
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPosition + halfWidth - halfHeight; // counterclockwise; light shines in local neg z direction
		rectCoords[ 1 ] = lightPosition - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPosition - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPosition + halfWidth + halfHeight;

		vec2 uv = LTC_Uv( normal, viewDir, 0. );
		
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);

		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );

		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate_With_Texture( normal, viewDir, position, mInv, rectCoords,areaLightTexture);

		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate_With_Texture( normal, viewDir, position, mat3( 1.0 ), rectCoords,areaLightTexture);

		// reflectedLight.directSpecular += areaSpecular;

		// reflectedLight.directDiffuse += areaDiffuse;

	}

#endif

void RE_Direct_Physical( const in IncidentLight directLight, const in GeometricContext geometry, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {

	float dotNL = saturate( dot( geometry.normal, directLight.direction ) );

	vec3 irradiance = dotNL * directLight.color;

	#ifndef PHYSICALLY_CORRECT_LIGHTS

		irradiance *= PI; // punctual light

	#endif

	#ifdef CLEARCOAT

		float ccDotNL = saturate( dot( geometry.clearcoatNormal, directLight.direction ) );

		vec3 ccIrradiance = ccDotNL * directLight.color;

		#ifndef PHYSICALLY_CORRECT_LIGHTS

			ccIrradiance *= PI; // punctual light

		#endif

		float clearcoatDHR = material.clearcoat * clearcoatDHRApprox( material.clearcoatRoughness, ccDotNL );

		reflectedLight.directSpecular += ccIrradiance * material.clearcoat * BRDF_Specular_GGX( directLight, geometry.viewDir, geometry.clearcoatNormal, vec3( DEFAULT_SPECULAR_COEFFICIENT ), material.clearcoatRoughness );

	#else

		float clearcoatDHR = 0.0;

	#endif

	#ifdef USE_SHEEN
		reflectedLight.directSpecular += ( 1.0 - clearcoatDHR ) * irradiance * BRDF_Specular_Sheen(
			material.specularRoughness,
			directLight.direction,
			geometry,
			material.sheenColor
		);
	#else
		reflectedLight.directSpecular += ( 1.0 - clearcoatDHR ) * irradiance * BRDF_Specular_GGX( directLight, geometry.viewDir, geometry.normal, material.specularColor, material.specularRoughness);
	#endif

	reflectedLight.directDiffuse += ( 1.0 - clearcoatDHR ) * irradiance * BRDF_Diffuse_Lambert( material.diffuseColor );
}

void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in GeometricContext geometry, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {

	reflectedLight.indirectDiffuse += irradiance * BRDF_Diffuse_Lambert( material.diffuseColor );

}

void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in GeometricContext geometry, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {

	#ifdef CLEARCOAT

		float ccDotNV = saturate( dot( geometry.clearcoatNormal, geometry.viewDir ) );

		reflectedLight.indirectSpecular += clearcoatRadiance * material.clearcoat * BRDF_Specular_GGX_Environment( geometry.viewDir, geometry.clearcoatNormal, vec3( DEFAULT_SPECULAR_COEFFICIENT ), material.clearcoatRoughness );

		float ccDotNL = ccDotNV;
		float clearcoatDHR = material.clearcoat * clearcoatDHRApprox( material.clearcoatRoughness, ccDotNL );

	#else

		float clearcoatDHR = 0.0;

	#endif

	float clearcoatInv = 1.0 - clearcoatDHR;

	// Both indirect specular and indirect diffuse light accumulate here

	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;

	BRDF_Specular_Multiscattering_Environment( geometry, material.specularColor, material.specularRoughness, singleScattering, multiScattering );

	vec3 diffuse = material.diffuseColor * ( 1.0 - ( singleScattering + multiScattering ) );

	reflectedLight.indirectSpecular += clearcoatInv * radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;

	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;

}

#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_Direct_TextureArea		RE_Direct_TextureArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical

// ref: https://seblagarde.files.wordpress.com/2015/07/course_notes_moving_frostbite_to_pbr_v32.pdf
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {

	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );

}
`;
