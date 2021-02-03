import { Mesh,
	SphereGeometry,
	NearestFilter,
	FloatType,
	LuminanceFormat,
	RGBFormat,
	Gyroscope,
	WebGLRenderTarget,
	OrthographicCamera,
	PlaneGeometry } from '../../src/Three';
import { Vector3 } from '../../src/math/Vector3';

function LightProxy( light, renderer ) {

	this.light = light ? light : null;
	this.renderer = renderer ? renderer : null;

};

LightProxy.prototype = Object.create( Mesh.prototype );
LightProxy.prototype.update = function ( a ) {

	var b = this.material.uniforms;
	b.matProjInverse && ( b.matProjInverse.value = a.projectionMatrixInverse );
	b.matView && ( b.matView.value = a.matrixWorldInverse );
	b.matViewInverse && ( b.matViewInverse.value = a.matrixWorld );
	this.light && ( this.visible = this.light.visible );

};

LightProxy.prototype.resize = function ( a, b, c, d ) {

	var e = this.material.uniforms,
		f = void 0 !== this.colorLabel ? this.colorLabel : 'samplerColor',
		g = void 0 !== this.normalDepthLabel ? this.normalDepthLabel : 'samplerNormalDepth';
	e[ f ] && ( e[ f ].value = c );
	e[ g ] && ( e[ g ].value = d );
	e.viewWidth && ( e.viewWidth.value = a );
	e.viewHeight && ( e.viewHeight.value = b );

};

LightProxy.prototype.generateDefines = function () {

	var a = this.light,
		b = this.renderer,
		c = {};
	if ( b.shadowMapEnabled && a.castShadow ) {

		c.USE_SHADOWMAP = ! 0;
		switch ( b.shadowMapType ) {

			case BasicShadowMap:
				c.SHADOWMAP_TYPE_BASIC = ! 0;
				break;
			case PCFShadowMap:
				c.SHADOWMAP_TYPE_PCF = ! 0;
				break;
			case PCFSoftShadowMap:
				c.SHADOWMAP_TYPE_PCF_SOFT = ! 0;

		}

		c.SLOPE_DEPTH_BIAS = b.shadowMapSlopeDepthBias;
		c.SHADOWMAP_DEBUG = b.shadowMapDebug;

	}

	return c;

};

LightProxy.prototype.setupDirectionalShadowmap = function ( a ) {

	var b = this.light,
		c = this.renderer.renderer.supportsLuminanceFloatRenderTarget() ? LuminanceFormat : RGBFormat,
		c = {
			minFilter: NearestFilter,
			magFilter: NearestFilter,
			stencilBuffer: ! 1,
			format: c,
			type: FloatType
		};
	b.properties.shadowMap = [];
	b.properties.shadowCamera = [];
	b.properties.pointsWorld = [];
	b.properties.pointsFrustum = [];
	for ( var d = 0; d < a; d ++ ) {

		var e = new WebGLRenderTarget( b.shadowMapWidth, b.shadowMapHeight, c );
		e.generateMipmaps = ! 1;
		b.properties.shadowMap[ d ] = e;
		e = new OrthographicCamera( b.shadowCameraLeft, b.shadowCameraRight, b.shadowCameraTop, b.shadowCameraBottom, b.shadowCameraNear, b.shadowCameraFar );
		b.properties.shadowCamera[ d ] = e;
		if ( b.shadowCascade ) {

			b.properties.pointsWorld[ d ] = [];
			b.properties.pointsFrustum[ d ] = [];
			for ( var f = b.properties.pointsWorld[ d ], e = b.properties.pointsFrustum[ d ], g = 0; 8 > g; g ++ ) f[ g ] = new Vector3(), e[ g ] = new Vector3();
			f = b.shadowCascadeNearZ[ d ];
			g = b.shadowCascadeFarZ[ d ];
			e[ 0 ].set( - 1, - 1, f );
			e[ 1 ].set( 1,
				- 1, f );
			e[ 2 ].set( - 1, 1, f );
			e[ 3 ].set( 1, 1, f );
			e[ 4 ].set( - 1, - 1, g );
			e[ 5 ].set( 1, - 1, g );
			e[ 6 ].set( - 1, 1, g );
			e[ 7 ].set( 1, 1, g );

		}

	}

	b.properties.cascadeCount = a;

};

LightProxy.prototype.updateDirectionalShadowmap = function ( a ) {

	var b = this.light,
		c = this.material.uniforms;
	if ( b.shadowCascade && ! b.properties.gyro ) {

		var d = new Gyroscope();
		d.position = b.shadowCascadeOffset;
		d.add( b );
		d.add( b.target );
		a.add( d );
		b.properties.gyro = d;

	}

	for ( a = 0; a < b.properties.cascadeCount; a ++ ) {

		var d = b.properties.shadowCamera[ a ],
			e = b.properties.shadowMap[ a ];
		c.matLightView.value[ a ] = d.matrixWorldInverse;
		c.matLightProj.value[ a ] = d.projectionMatrix;
		c.samplerShadowMap.value[ a ] = e;

	}

	c.shadowDarkness.value =
        Math.sqrt( b.shadowDarkness );
	c.shadowBias.value = b.shadowBias;
	c.shadowMapSize.value.set( b.shadowMapWidth, b.shadowMapHeight );

};

LightProxy.geometryLightSphere = new SphereGeometry( 1, 16, 8 );
LightProxy.geometryLightPlane = new PlaneGeometry( 2, 2 );
LightProxy.positionVS = new Vector3();
LightProxy.directionVS = new Vector3();
LightProxy.rightVS = new Vector3();
LightProxy.normalVS = new Vector3();
LightProxy.upVS = new Vector3();

export { LightProxy };
