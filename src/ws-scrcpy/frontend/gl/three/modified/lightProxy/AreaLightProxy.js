import { Mesh,
	ShaderMaterial,
	AdditiveBlending,
	LightProxy,
	UniformsUtils,
	ShaderDeferred } from '../../src/Three';

// function AreaLightProxy( light, renderer ) {

// 	LightProxy.call( this, light, renderer );
// 	var c = ShaderDeferred.areaLight,
// 		d = UniformsUtils.clone( c.uniforms ),
// 		c = new ShaderMaterial( {
// 			uniforms: d,
// 			vertexShader: c.vertexShader,
// 			fragmentShader: c.fragmentShader,
// 			defines: {
// 				AREA_TEXTURE: !! light.texture
// 			},
// 			blending: AdditiveBlending,
// 			depthWrite: ! 1,
// 			depthTest: ! 1,
// 			transparent: ! 0
// 		} );
// 	// 	e = renderer.getColorTarget(),
// 	// 	f = renderer.getNormalDepthTarget();
// 	// d.viewWidth.value = e.width;
// 	// d.viewHeight.value = e.height;
// 	// d.samplerColor.value = e;
// 	// d.samplerNormalDepth.value =
// 	// 		f;
// 	Mesh.call( this, LightProxy.geometryLightPlane, c );

// };


function AreaLightProxy( light, renderer ) {

	this.light = light ? light : null;
	this.renderer = renderer ? renderer : null;

	LightProxy.call( this, light, renderer );
	var c = ShaderDeferred.areaLight,
		d = UniformsUtils.clone( c.uniforms ),
		c = new ShaderMaterial( {
			uniforms: d,
			vertexShader: c.vertexShader,
			fragmentShader: c.fragmentShader,
			// defines: {
			// 	AREA_TEXTURE: !! light.texture
			// },
			blending: AdditiveBlending,
			depthWrite: ! 1,
			depthTest: ! 1,
			transparent: ! 0
		} );
	// 	e = renderer.getColorTarget(),
	// 	f = renderer.getNormalDepthTarget();
	// d.viewWidth.value = e.width;
	// d.viewHeight.value = e.height;
	// d.samplerColor.value = e;
	// d.samplerNormalDepth.value =
	// 		f;
	Mesh.call( this, LightProxy.geometryLightPlane, c );

};

AreaLightProxy.prototype = Object.create( LightProxy.prototype );
AreaLightProxy.prototype.update = function ( a ) { //camera

	// TODO direct do this in WebGLLight.js
	LightProxy.prototype.update.call( this, a );
	var b = this.light,
		c = this.material.uniforms,
		d = b.matrixWorld;
	a = a.matrixWorldInverse;
	var e = LightProxy.positionVS,
		f = LightProxy.rightVS,
		g = LightProxy.normalVS,
		h = LightProxy.upVS;
	e.copy( d.getPosition() );
	//e.setFromMatrixPosition( d );
	a.multiplyVector3( e );
	//e.applyMatrix4( a );
	c.lightPositionVS.value.copy( e );
	f.copy( b.right );
	g.copy( b.normal );
	d.rotateAxis( f );
	d.rotateAxis( g );
	a.rotateAxis( f );
	a.rotateAxis( g );
	// f.transformDirection( d );
	// g.transformDirection( d );
	// f.transformDirection( a );
	// g.transformDirection( a );
	h.crossVectors( f, g );
	h.normalize();
	c.lightRightVS.value.copy( f );
	c.lightNormalVS.value.copy( g );
	c.lightUpVS.value.copy( h );
	c.lightWidth.value = b.width;
	c.lightHeight.value = b.height;
	c.constantAttenuation.value = b.constantAttenuation;
	c.linearAttenuation.value = b.linearAttenuation;
	c.quadraticAttenuation.value = b.quadraticAttenuation;
	c.samplerTexture.value = b.texture;
	c.lightIntensity.value = b.intensity * b.intensity;
	c.lightColor.value.copyGammaToLinear( b.color );
	//console.log(c);

};

export { AreaLightProxy };
