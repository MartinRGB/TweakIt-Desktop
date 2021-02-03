import * as THREE from '../../src/Three';
import { Color } from '../../src/math/Color';
import { Vector2 } from '../../src/math/Vector2';
import { Vector3 } from '../../src/math/Vector3';
import { Vector4 } from '../../src/math/Vector4';
import { Matrix4 } from '../../src/math/Matrix4';
import { DeferredShaderChunk } from './DeferredShaderChunk';

const ShaderDeferred = {
	areaLight: {
		uniforms: {
			testColor: {
				type: 'c',
				value: new Color( 'blue' )
			},
			samplerNormalDepth: {
				type: 't',
				value: null
			},
			samplerColor: {
				type: 't',
				value: null
			},
			matProjInverse: {
				type: 'm4',
				value: new Matrix4()
			},
			viewWidth: {
				type: 'f',
				value: 800
			},
			viewHeight: {
				type: 'f',
				value: 600
			},
			lightPositionVS: {
				type: 'v3',
				value: new Vector3( 0, 1, 0 )
			},
			lightNormalVS: {
				type: 'v3',
				value: new Vector3( 0, - 1, 0 )
			},
			lightRightVS: {
				type: 'v3',
				value: new Vector3( 1, 0, 0 )
			},
			lightUpVS: {
				type: 'v3',
				value: new Vector3( 1,
					0, 0 )
			},
			lightColor: {
				type: 'c',
				value: new Color( 0 )
			},
			lightIntensity: {
				type: 'f',
				value: 1
			},
			lightWidth: {
				type: 'f',
				value: 1
			},
			lightHeight: {
				type: 'f',
				value: 1
			},
			constantAttenuation: {
				type: 'f',
				value: 1.5
			},
			linearAttenuation: {
				type: 'f',
				value: 0.5
			},
			quadraticAttenuation: {
				type: 'f',
				value: 0.1
			},
			samplerTexture: {
				type: 't',
				value: null
			}
		},
		fragmentShader: [ 'uniform vec3 lightPositionVS;\n'
        + 'uniform vec3 lightNormalVS;\n'
        + 'uniform vec3 lightRightVS;\n'
        + 'uniform vec3 lightUpVS;\n'
        + 'uniform sampler2D samplerColor;\n'
        + 'uniform sampler2D samplerNormalDepth;\n'
        + '#ifdef AREA_TEXTURE\n'
        + 'uniform sampler2D samplerTexture;\n'
        + '#endif\n'
        + 'uniform float lightWidth;\n'
        + 'uniform float lightHeight;\n'
        + 'uniform float constantAttenuation;\n'
        + 'uniform float linearAttenuation;\n'
        + 'uniform float quadraticAttenuation;\n'
        + 'uniform float lightIntensity;\n'
        + 'uniform vec3 lightColor;\n'
        + 'uniform float viewHeight;\n'
        + 'uniform float viewWidth;\n'
        + 'uniform mat4 matProjInverse;',
		DeferredShaderChunk.unpackFloat, 'vec3 projectOnPlane( vec3 point, vec3 planeCenter, vec3 planeNorm ) {\n'
            + 'return point - dot( point - planeCenter, planeNorm ) * planeNorm;\n'
            + '}\n'
            + 'bool sideOfPlane( vec3 point, vec3 planeCenter, vec3 planeNorm ) {\n'
            + 'return ( dot( point - planeCenter, planeNorm ) >= 0.0 );\n'
            + '}\n'
            + 'vec3 linePlaneIntersect( vec3 lp, vec3 lv, vec3 pc, vec3 pn ) {\n'
            + 'return lp + lv * ( dot( pn, pc - lp ) / dot( pn, lv ) );\n'
            + '}\n'
            + 'float calculateAttenuation( float dist ) {\n'
            + 'return ( 1.0 / ( constantAttenuation + linearAttenuation * dist + quadraticAttenuation * dist * dist ) );\n'
            + '}\n'
            + 'void main() {',
		DeferredShaderChunk.computeVertexPositionVS, DeferredShaderChunk.computeNormal, DeferredShaderChunk.unpackColorMap, 'float w = lightWidth;\n'
            + 'float h = lightHeight;\n'
            + 'vec3 proj = projectOnPlane( vertexPositionVS.xyz, lightPositionVS, lightNormalVS );\n'
            + 'vec3 dir = proj - lightPositionVS;\n'
            + 'vec2 diagonal = vec2( dot( dir, lightRightVS ), dot( dir, lightUpVS ) );\n'
            + 'vec2 nearest2D = vec2( clamp( diagonal.x, -w, w ), clamp( diagonal.y, -h, h ) );\n'
            + 'vec3 nearestPointInside = lightPositionVS + ( lightRightVS * nearest2D.x + lightUpVS * nearest2D.y );\n'
            + 'vec3 lightDir = normalize( nearestPointInside - vertexPositionVS.xyz );\n'
            + 'float NdotL = max( dot( lightNormalVS, -lightDir ), 0.0 );\n'
            + 'float NdotL2 = max( dot( normal, lightDir ), 0.0 );\n'
            + 'vec3 diffuse = vec3( sqrt( NdotL * NdotL2 ) );\n'
            + '#ifdef AREA_TEXTURE\n'
            + 'float d = distance( vertexPositionVS.xyz, nearestPointInside );\n'
            + 'vec2 co = ( diagonal.xy + vec2( w, h ) ) / ( 2.0 * vec2( w, h ) );\n'
            + 'co.y = 1.0 - co.y;\n'
            + 'vec3 ve = vertexPositionVS.xyz - lightPositionVS;\n'
            + 'vec4 diff = vec4( 0.0 );\n'
            + 'if ( dot( ve, lightNormalVS ) < 0.0 ) {\n'
            + 'diff = vec4( 0.0 );\n'
            + '} else {\n'
            + 'float lod = max( pow( d, 0.1 ), 0.0 ) * 5.0;\n'
            + 'vec4 t00 = texture2D( samplerTexture, co, lod );\n'
            + 'vec4 t01 = texture2D( samplerTexture, co, lod + 1.0 );\n'
            + 'diff = mix( t00, t01, 0.5 );\n'
            + '}\n'
            + 'diffuse *= diff.xyz;\n'
            + '#endif\n'
            + 'vec3 specular = vec3( 0.0 );\n'
            + 'vec3 R = reflect( normalize( -vertexPositionVS.xyz ), normal );\n'
            + 'vec3 E = linePlaneIntersect( vertexPositionVS.xyz, R, lightPositionVS, lightNormalVS );\n'
            + 'float specAngle = dot( R, lightNormalVS );\n'
            + 'if ( dot( vertexPositionVS.xyz - lightPositionVS, lightNormalVS )>=0.0 && specAngle > 0.0 ) {\n'
            + 'vec3 dirSpec = E - lightPositionVS;\n'
            + 'vec2 dirSpec2D = vec2( dot( dirSpec, lightRightVS ), dot( dirSpec, lightUpVS ) );\n'
            + 'vec2 nearestSpec2D = vec2( clamp( dirSpec2D.x, -w, w ), clamp( dirSpec2D.y, -h, h ) );\n'
            + 'float specFactor = 1.0 - clamp( length( nearestSpec2D - dirSpec2D ) * 0.05 * shininess, 0.0, 1.0 );\n'
            + 'specular = specularColor * specFactor * specAngle * diffuse;\n'
            + '#ifdef AREA_TEXTURE\n'
            + 'float hard = 16.0;\n'
            + 'float gloss = 16.0;\n'
            + 'vec3 specPlane = lightPositionVS + ( lightRightVS * dirSpec2D.x + lightUpVS * dirSpec2D.y );\n'
            + 'float dist = max( distance( vertexPositionVS.xyz, specPlane ), 0.0 );\n'
            + 'float d = ( ( 1.0 / hard ) / 2.0 ) * ( dist / gloss );\n'
            + 'w = max( w, 0.0 );\n'
            + 'h = max( h, 0.0 );\n'
            + 'vec2 co = dirSpec2D / ( d + 1.0 );\n'
            + 'co /= 2.0 * vec2( w, h );\n'
            + 'co = co + vec2( 0.5 );\n'
            + 'co.y = 1.0 - co.y;\n'
            + 'float lod = ( 2.0 / hard * max( dist, 0.0 ) );\n'
            + 'vec4 t00 = texture2D( samplerTexture, co, lod );\n'
            + 'vec4 t01 = texture2D( samplerTexture, co, lod + 1.0 );\n'
            + 'vec4 spec = mix( t00, t01, 0.5 );\n'
            + 'specular *= spec.xyz;\n'
            + '#endif\n'
            + '}\n'
            + 'float dist = distance( vertexPositionVS.xyz, nearestPointInside );\n'
            + 'float attenuation = calculateAttenuation( dist );',
		DeferredShaderChunk.combine, '}'
		].join( '\n'
        + '' ),
		vertexShader: 'void main() {\n'
        + 'gl_Position = vec4( sign( position.xy ), 0.0, 1.0 );\n'
        + '}'
	}
	// color: {
	// 	uniforms: THREE.UniformsUtils.merge( [ THREE.UniformsLib.common, THREE.UniformsLib.fog, THREE.UniformsLib.shadowmap, {
	// 		emissive: {
	// 			type: 'c',
	// 			value: new Color( 0 )
	// 		},
	// 		specular: {
	// 			type: 'c',
	// 			value: new Color( 1118481 )
	// 		},
	// 		shininess: {
	// 			type: 'f',
	// 			value: 30
	// 		},
	// 		wrapAround: {
	// 			type: 'f',
	// 			value: 1
	// 		},
	// 		additiveSpecular: {
	// 			type: 'f',
	// 			value: 1
	// 		},
	// 		samplerNormalDepth: {
	// 			type: 't',
	// 			value: null
	// 		},
	// 		viewWidth: {
	// 			type: 'f',
	// 			value: 800
	// 		},
	// 		viewHeight: {
	// 			type: 'f',
	// 			value: 600
	// 		}
	// 	} ] ),
	// 	fragmentShader: [ 'uniform vec3 diffuse;\n'
	//     + 'uniform vec3 specular;\n'
	//     + 'uniform vec3 emissive;\n'
	//     + 'uniform float shininess;\n'
	//     + 'uniform float wrapAround;\n'
	//     + 'uniform float additiveSpecular;',
	// 	THREE.ShaderChunk.color_pars_fragment, THREE.ShaderChunk.map_pars_fragment, THREE.ShaderChunk.lightmap_pars_fragment, '#ifdef USE_ENVMAP\n'
	//         + 'varying vec3 vWorldPosition;\n'
	//         + 'uniform float reflectivity;\n'
	//         + 'uniform samplerCube envMap;\n'
	//         + 'uniform float flipEnvMap;\n'
	//         + 'uniform int combine;\n'
	//         + 'uniform bool useRefract;\n'
	//         + 'uniform float refractionRatio;\n'
	//         + 'uniform sampler2D samplerNormalDepth;\n'
	//         + 'uniform float viewHeight;\n'
	//         + 'uniform float viewWidth;\n'
	//         + '#endif', THREE.ShaderChunk.fog_pars_fragment, THREE.ShaderChunk.shadowmap_pars_fragment,
	// 	THREE.ShaderChunk.specularmap_pars_fragment, 'const float unit = 255.0/256.0;\n'
	//         + 'float vec3_to_float( vec3 data ) {\n'
	//         + 'highp float compressed = fract( data.x * unit ) + floor( data.y * unit * 255.0 ) + floor( data.z * unit * 255.0 ) * 255.0;\n'
	//         + 'return compressed;\n'
	//         + '}\n'
	//         + 'void main() {\n'
	//         + 'const float opacity = 1.0;\n'
	//         + 'gl_FragColor = vec4( diffuse, opacity );', THREE.ShaderChunk.map_fragment, THREE.ShaderChunk.alphatest_fragment, THREE.ShaderChunk.specularmap_fragment, THREE.ShaderChunk.lightmap_fragment, THREE.ShaderChunk.color_fragment,
	// 	'#ifdef USE_ENVMAP\n'
	//         + 'vec2 texCoord = gl_FragCoord.xy / vec2( viewWidth, viewHeight );\n'
	//         + 'vec4 normalDepth = texture2D( samplerNormalDepth, texCoord );\n'
	//         + 'vec3 normal = normalDepth.xyz * 2.0 - 1.0;\n'
	//         + 'vec3 reflectVec;\n'
	//         + 'vec3 cameraToVertex = normalize( vWorldPosition - cameraPosition );\n'
	//         + 'if ( useRefract ) {\n'
	//         + 'reflectVec = refract( cameraToVertex, normal, refractionRatio );\n'
	//         + '} else { \n'
	//         + 'reflectVec = reflect( cameraToVertex, normal );\n'
	//         + '}\n'
	//         + '#ifdef DOUBLE_SIDED\n'
	//         + 'float flipNormal = ( -1.0 + 2.0 * float( gl_FrontFacing ) );\n'
	//         + 'vec4 cubeColor = textureCube( envMap, flipNormal * vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );\n'
	//         + '#else\n'
	//         + 'vec4 cubeColor = textureCube( envMap, vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );\n'
	//         + '#endif\n'
	//         + '#ifdef GAMMA_INPUT\n'
	//         + 'cubeColor.xyz *= cubeColor.xyz;\n'
	//         + '#endif\n'
	//         + 'if ( combine == 1 ) {\n'
	//         + 'gl_FragColor.xyz = mix( gl_FragColor.xyz, cubeColor.xyz, specularStrength * reflectivity );\n'
	//         + '} else if ( combine == 2 ) {\n'
	//         + 'gl_FragColor.xyz += cubeColor.xyz * specularStrength * reflectivity;\n'
	//         + '} else {\n'
	//         + 'gl_FragColor.xyz = mix( gl_FragColor.xyz, gl_FragColor.xyz * cubeColor.xyz, specularStrength * reflectivity );\n'
	//         + '}\n'
	//         + '#endif',
	// 	THREE.ShaderChunk.shadowmap_fragment, THREE.ShaderChunk.fog_fragment, 'const float compressionScale = 0.999;\n'
	//         + 'vec3 diffuseMapColor;\n'
	//         + '#ifdef USE_MAP\n'
	//         + 'diffuseMapColor = texelColor.xyz;\n'
	//         + '#else\n'
	//         + 'diffuseMapColor = vec3( 1.0 );\n'
	//         + '#endif\n'
	//         + 'gl_FragColor.x = vec3_to_float( compressionScale * gl_FragColor.xyz );\n'
	//         + 'if ( additiveSpecular < 0.0 ) {\n'
	//         + 'gl_FragColor.y = vec3_to_float( compressionScale * specular );\n'
	//         + '} else {\n'
	//         + 'gl_FragColor.y = vec3_to_float( compressionScale * specular * diffuseMapColor );\n'
	//         + '}\n'
	//         + 'gl_FragColor.y *= additiveSpecular;\n'
	//         + 'gl_FragColor.z = wrapAround * shininess;\n'
	//         + '#ifdef USE_COLOR\n'
	//         + 'gl_FragColor.w = vec3_to_float( compressionScale * emissive * diffuseMapColor * vColor );\n'
	//         + '#else\n'
	//         + 'gl_FragColor.w = vec3_to_float( compressionScale * emissive * diffuseMapColor );\n'
	//         + '#endif\n'
	//         + '}'
	// 	].join( '\n'
	//     + '' ),
	// 	vertexShader: [ THREE.ShaderChunk.map_pars_vertex, THREE.ShaderChunk.lightmap_pars_vertex, THREE.ShaderChunk.color_pars_vertex, THREE.ShaderChunk.morphtarget_pars_vertex, THREE.ShaderChunk.skinning_pars_vertex, THREE.ShaderChunk.shadowmap_pars_vertex, '#ifdef USE_ENVMAP\n'
	//     + 'varying vec3 vWorldPosition;\n'
	//     + '#endif\n'
	//     + 'void main() {', THREE.ShaderChunk.map_vertex, THREE.ShaderChunk.lightmap_vertex, THREE.ShaderChunk.color_vertex, THREE.ShaderChunk.skinbase_vertex, THREE.ShaderChunk.morphtarget_vertex, THREE.ShaderChunk.skinning_vertex,
	// 	THREE.ShaderChunk.default_vertex, THREE.ShaderChunk.worldpos_vertex, THREE.ShaderChunk.shadowmap_vertex, '#ifdef USE_ENVMAP\n'
	//         + 'vWorldPosition = worldPosition.xyz;\n'
	//         + '#endif\n'
	//         + '}'
	// 	].join( '\n'
	//     + '' )
	// },
	// normalDepth: {
	// 	uniforms: {
	// 		alphaMap: {
	// 			type: 't',
	// 			value: null
	// 		},
	// 		bumpMap: {
	// 			type: 't',
	// 			value: null
	// 		},
	// 		bumpScale: {
	// 			type: 'f',
	// 			value: 1
	// 		},
	// 		normalMap: {
	// 			type: 't',
	// 			value: null
	// 		},
	// 		normalScale: {
	// 			type: 'v2',
	// 			value: new Vector2( 1, 1 )
	// 		},
	// 		offsetRepeat: {
	// 			type: 'v4',
	// 			value: new Vector4( 0, 0, 1, 1 )
	// 		}
	// 	},
	// 	fragmentShader: [ '#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP )\n'
	//     + '#extension GL_OES_standard_derivatives : enable\n'
	//     + '\n'
	//     + 'varying vec3 vViewPosition;\n'
	//     + '#endif\n'
	//     + '#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( ALPHATEST )\n'
	//     + 'varying vec2 vUv;\n'
	//     + '#endif',
	// 	THREE.ShaderChunk.bumpmap_pars_fragment, THREE.ShaderChunk.normalmap_pars_fragment, '#ifdef ALPHATEST\n'
	//         + 'uniform sampler2D alphaMap;\n'
	//         + '#endif\n'
	//         + 'varying vec3 normalView;\n'
	//         + 'varying vec4 clipPos;\n'
	//         + 'void main() {\n'
	//         + '#ifdef ALPHATEST\n'
	//         + 'float alphaValue = texture2D( alphaMap, vUv ).a;\n'
	//         + 'if ( alphaValue < ALPHATEST ) discard;\n'
	//         + '#endif\n'
	//         + 'vec3 normal = normalize( normalView );\n'
	//         + '#ifdef USE_NORMALMAP\n'
	//         + 'normal = perturbNormal2Arb( -normalize( vViewPosition ), normal );\n'
	//         + '#elif defined( USE_BUMPMAP )\n'
	//         + 'normal = perturbNormalArb( -vViewPosition, normal, dHdxy_fwd() );\n'
	//         + '#endif\n'
	//         + 'gl_FragColor.xyz = normal * 0.5 + 0.5;\n'
	//         + 'gl_FragColor.w = clipPos.z / clipPos.w;\n'
	//         + '}'
	// 	].join( '\n'
	//     + '' ),
	// 	vertexShader: [ 'varying vec3 normalView;\n'
	//     + 'varying vec4 clipPos;\n'
	//     + '#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( ALPHATEST )\n'
	//     + 'varying vec2 vUv;\n'
	//     + 'uniform vec4 offsetRepeat;\n'
	//     + '#endif\n'
	//     + '#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP )\n'
	//     + 'varying vec3 vViewPosition;\n'
	//     + '#endif', THREE.ShaderChunk.morphtarget_pars_vertex, THREE.ShaderChunk.skinning_pars_vertex, 'void main() {', THREE.ShaderChunk.morphnormal_vertex, THREE.ShaderChunk.skinbase_vertex, THREE.ShaderChunk.skinnormal_vertex, THREE.ShaderChunk.defaultnormal_vertex,
	// 	THREE.ShaderChunk.morphtarget_vertex, THREE.ShaderChunk.skinning_vertex, THREE.ShaderChunk.default_vertex, 'normalView = normalize( normalMatrix * objectNormal );\n'
	//         + '#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( ALPHATEST )\n'
	//         + 'vUv = uv * offsetRepeat.zw + offsetRepeat.xy;\n'
	//         + '#endif\n'
	//         + '#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP )\n'
	//         + 'vViewPosition = -mvPosition.xyz;\n'
	//         + '#endif\n'
	//         + 'clipPos = gl_Position;\n'
	//         + '}'
	// 	].join( '\n'
	//     + '' )
	// },
	// depth: {
	// 	uniforms: {
	// 		slopeScale: {
	// 			type: 'f',
	// 			value: 2
	// 		},
	// 		slopeBias: {
	// 			type: 'f',
	// 			value: 0
	// 		},
	// 		slopeMax: {
	// 			type: 'f',
	// 			value: 0.001
	// 		},
	// 		alphaMap: {
	// 			type: 't',
	// 			value: null
	// 		},
	// 		offsetRepeat: {
	// 			type: 'v4',
	// 			value: new Vector4( 0, 0, 1, 1 )
	// 		}
	// 	},
	// 	fragmentShader: '#ifdef ALPHATEST\n'
	//     + 'uniform sampler2D alphaMap;\n'
	//     + 'varying vec2 vUv;\n'
	//     + '#endif\n'
	//     + '#ifdef SLOPE_DEPTH_BIAS\n'
	//     + '#extension GL_OES_standard_derivatives : enable\n'
	//     + '\n'
	//     + 'uniform float slopeScale;\n'
	//     + 'uniform float slopeBias;\n'
	//     + 'uniform float slopeMax;\n'
	//     + '#endif\n'
	//     + 'varying vec4 clipPos;\n'
	//     + 'void main() {\n'
	//     + '#ifdef ALPHATEST\n'
	//     + 'float alphaValue = texture2D( alphaMap, vUv ).a;\n'
	//     + 'if ( alphaValue < ALPHATEST ) discard;\n'
	//     + '#endif\n'
	//     + 'float depth = clipPos.z / clipPos.w;\n'
	//     + '#ifdef SLOPE_DEPTH_BIAS\n'
	//     + 'float dx = dFdx( depth );\n'
	//     + 'float dy = dFdy( depth );\n'
	//     + 'float m = max( abs(dx), abs(dy) );\n'
	//     + 'm = min( m, slopeMax );\n'
	//     + 'gl_FragColor.x = depth + m * slopeScale + slopeBias;\n'
	//     + '#else\n'
	//     + 'gl_FragColor.x = depth;\n'
	//     + '#endif\n'
	//     + '}',
	// 	vertexShader: [ '#ifdef ALPHATEST\n'
	//     + 'varying vec2 vUv;\n'
	//     + 'uniform vec4 offsetRepeat;\n'
	//     + '#endif\n'
	//     + 'varying vec4 clipPos;', THREE.ShaderChunk.morphtarget_pars_vertex, THREE.ShaderChunk.skinning_pars_vertex, 'void main() {', THREE.ShaderChunk.skinbase_vertex, THREE.ShaderChunk.morphtarget_vertex, THREE.ShaderChunk.skinning_vertex, THREE.ShaderChunk.default_vertex, 'clipPos = gl_Position;\n'
	//     + '#ifdef ALPHATEST\n'
	//     + 'vUv = uv * offsetRepeat.zw + offsetRepeat.xy;\n'
	//     + '#endif\n'
	//     + '}' ].join( '\n'
	//     + '' )
	// },
	// pointLight: {
	// 	uniforms: {
	// 		samplerNormalDepth: {
	// 			type: 't',
	// 			value: null
	// 		},
	// 		samplerColor: {
	// 			type: 't',
	// 			value: null
	// 		},
	// 		matProjInverse: {
	// 			type: 'm4',
	// 			value: new Matrix4()
	// 		},
	// 		viewWidth: {
	// 			type: 'f',
	// 			value: 800
	// 		},
	// 		viewHeight: {
	// 			type: 'f',
	// 			value: 600
	// 		},
	// 		lightPositionVS: {
	// 			type: 'v3',
	// 			value: new Vector3( 0, 0, 0 )
	// 		},
	// 		lightColor: {
	// 			type: 'c',
	// 			value: new Color( 0 )
	// 		},
	// 		lightIntensity: {
	// 			type: 'f',
	// 			value: 1
	// 		},
	// 		lightRadius: {
	// 			type: 'f',
	// 			value: 1
	// 		},
	// 		matViewInverse: {
	// 			type: 'm4',
	// 			value: new Matrix4()
	// 		},
	// 		matLightView: {
	// 			type: 'm4v',
	// 			value: []
	// 		},
	// 		matLightProj: {
	// 			type: 'm4v',
	// 			value: []
	// 		},
	// 		samplerShadowMap: {
	// 			type: 'tv',
	// 			value: []
	// 		},
	// 		shadowMapSize: {
	// 			type: 'v2',
	// 			value: new Vector2( 512, 512 )
	// 		},
	// 		shadowDarkness: {
	// 			type: 'f',
	// 			value: 0.5
	// 		},
	// 		shadowBias: {
	// 			type: 'f',
	// 			value: 0
	// 		}
	// 	},
	// 	fragmentShader: [ 'uniform sampler2D samplerColor;\n'
	//     + 'uniform sampler2D samplerNormalDepth;\n'
	//     + 'uniform float lightRadius;\n'
	//     + 'uniform float lightIntensity;\n'
	//     + 'uniform float viewHeight;\n'
	//     + 'uniform float viewWidth;\n'
	//     + 'uniform vec3 lightColor;\n'
	//     + 'uniform vec3 lightPositionVS;\n'
	//     + 'uniform mat4 matProjInverse;\n'
	//     + '#ifdef USE_SHADOWMAP\n'
	//     + 'uniform mat4 matViewInverse;\n'
	//     + 'uniform mat4 matLightView[ 6 ];\n'
	//     + 'uniform mat4 matLightProj[ 6 ];\n'
	//     + 'uniform sampler2D samplerShadowMap[ 6 ];\n'
	//     + 'uniform float shadowBias;\n'
	//     + 'uniform float shadowDarkness;\n'
	//     + 'uniform vec2 shadowMapSize;\n'
	//     + '#endif',
	// 	DeferredShaderChunk.unpackFloat, DeferredShaderChunk.shadowMapPCF, DeferredShaderChunk.shadowMapPCFSoft, 'void main() {', DeferredShaderChunk.computeVertexPositionVS, 'vec3 lightVector = lightPositionVS - vertexPositionVS.xyz;\n'
	//         + 'float distance = length( lightVector );\n'
	//         + 'if ( distance > lightRadius ) discard;', DeferredShaderChunk.computeNormal, DeferredShaderChunk.unpackColorMap, 'lightVector = normalize( lightVector );', DeferredShaderChunk.computeDiffuse, DeferredShaderChunk.computeSpecular,
	// 	'float cutoff = 0.3;\n'
	//         + 'float denom = distance / lightRadius + 1.0;\n'
	//         + 'float attenuation = 1.0 / ( denom * denom );\n'
	//         + 'attenuation = ( attenuation - cutoff ) / ( 1.0 - cutoff );\n'
	//         + 'attenuation = max( attenuation, 0.0 );\n'
	//         + 'attenuation *= attenuation;\n'
	//         + 'float occlusion = 1.0;\n'
	//         + '#ifdef USE_SHADOWMAP\n'
	//         + 'vec4 posWS = matViewInverse * vertexPositionVS;\n'
	//         + 'for ( int i = 0; i < 6; i ++ ) {\n'
	//         + 'float sectorOcclusion = 1.0;\n'
	//         + 'vec4 posLightCS = matLightProj[ i ] * matLightView[ i ] * posWS;\n'
	//         + 'vec2 shadowCoord = ( posLightCS.xy / posLightCS.w ) * 0.5 + 0.5;\n'
	//         + 'bvec4 inFrustumVec = bvec4 ( shadowCoord.x >= 0.0, shadowCoord.x <= 1.0, shadowCoord.y >= 0.0, shadowCoord.y <= 1.0 );\n'
	//         + 'bool inFrustum = all( inFrustumVec );\n'
	//         + 'if ( inFrustum ) {\n'
	//         + 'float vertexDepth = posLightCS.z / posLightCS.w;\n'
	//         + '#if !defined( SLOPE_DEPTH_BIAS )\n'
	//         + 'vertexDepth -= shadowBias;\n'
	//         + '#endif\n'
	//         + '#if defined( SHADOWMAP_TYPE_PCF )\n'
	//         + 'float shadowValue = sampleShadowPCF( samplerShadowMap[ i ], shadowMapSize, shadowCoord, vertexDepth );\n'
	//         + '#elif defined( SHADOWMAP_TYPE_PCF_SOFT )\n'
	//         + 'float shadowValue = sampleShadowPCFSoft( samplerShadowMap[ i ], shadowMapSize, shadowCoord, vertexDepth );\n'
	//         + '#else\n'
	//         + 'float shadowDepth = texture2D( samplerShadowMap[ i ], shadowCoord ).x;\n'
	//         + 'float shadowValue = float( vertexDepth > shadowDepth );\n'
	//         + '#endif\n'
	//         + 'sectorOcclusion = 1.0 - shadowDarkness * shadowValue;\n'
	//         + 'occlusion *= sectorOcclusion;\n'
	//         + '}\n'
	//         + '}\n'
	//         + '#endif\n'
	//         + 'attenuation *= occlusion;',
	// 	DeferredShaderChunk.combine, '}'
	// 	].join( '\n'
	//     + '' ),
	// 	vertexShader: 'void main() { \n'
	//     + 'vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );\n'
	//     + 'gl_Position = projectionMatrix * mvPosition;\n'
	//     + '}'
	// },
	// spotLight: {
	// 	uniforms: {
	// 		samplerNormalDepth: {
	// 			type: 't',
	// 			value: null
	// 		},
	// 		samplerColor: {
	// 			type: 't',
	// 			value: null
	// 		},
	// 		matProjInverse: {
	// 			type: 'm4',
	// 			value: new Matrix4()
	// 		},
	// 		viewWidth: {
	// 			type: 'f',
	// 			value: 800
	// 		},
	// 		viewHeight: {
	// 			type: 'f',
	// 			value: 600
	// 		},
	// 		lightPositionVS: {
	// 			type: 'v3',
	// 			value: new Vector3( 0, 1, 0 )
	// 		},
	// 		lightDirectionVS: {
	// 			type: 'v3',
	// 			value: new Vector3( 0,
	// 				1, 0 )
	// 		},
	// 		lightColor: {
	// 			type: 'c',
	// 			value: new Color( 0 )
	// 		},
	// 		lightIntensity: {
	// 			type: 'f',
	// 			value: 1
	// 		},
	// 		lightDistance: {
	// 			type: 'f',
	// 			value: 1
	// 		},
	// 		lightAngle: {
	// 			type: 'f',
	// 			value: 1
	// 		},
	// 		matViewInverse: {
	// 			type: 'm4',
	// 			value: new Matrix4()
	// 		},
	// 		matLightView: {
	// 			type: 'm4',
	// 			value: new Matrix4()
	// 		},
	// 		matLightProj: {
	// 			type: 'm4',
	// 			value: new Matrix4()
	// 		},
	// 		samplerShadowMap: {
	// 			type: 't',
	// 			value: null
	// 		},
	// 		shadowMapSize: {
	// 			type: 'v2',
	// 			value: new Vector2( 512, 512 )
	// 		},
	// 		shadowDarkness: {
	// 			type: 'f',
	// 			value: 0.5
	// 		},
	// 		shadowBias: {
	// 			type: 'f',
	// 			value: 0
	// 		}
	// 	},
	// 	fragmentShader: [ 'uniform vec3 lightPositionVS;\n'
	//     + 'uniform vec3 lightDirectionVS;\n'
	//     + 'uniform sampler2D samplerColor;\n'
	//     + 'uniform sampler2D samplerNormalDepth;\n'
	//     + 'uniform float viewHeight;\n'
	//     + 'uniform float viewWidth;\n'
	//     + 'uniform float lightAngle;\n'
	//     + 'uniform float lightIntensity;\n'
	//     + 'uniform vec3 lightColor;\n'
	//     + 'uniform mat4 matProjInverse;\n'
	//     + '#ifdef USE_SHADOWMAP\n'
	//     + 'uniform mat4 matViewInverse;\n'
	//     + 'uniform mat4 matLightView;\n'
	//     + 'uniform mat4 matLightProj;\n'
	//     + 'uniform sampler2D samplerShadowMap;\n'
	//     + 'uniform float shadowBias;\n'
	//     + 'uniform float shadowDarkness;\n'
	//     + 'uniform vec2 shadowMapSize;\n'
	//     + '#endif',
	// 	DeferredShaderChunk.unpackFloat, DeferredShaderChunk.shadowMapPCF, DeferredShaderChunk.shadowMapPCFSoft, 'void main() {', DeferredShaderChunk.computeVertexPositionVS, DeferredShaderChunk.computeNormal, DeferredShaderChunk.unpackColorMap, 'vec3 lightVector = normalize( lightPositionVS.xyz - vertexPositionVS.xyz );\n'
	//         + 'float rho = dot( lightDirectionVS, lightVector );\n'
	//         + 'float rhoMax = cos( lightAngle * 0.5 );\n'
	//         + 'if ( rho <= rhoMax ) discard;\n'
	//         + 'float theta = rhoMax + 0.0001;\n'
	//         + 'float phi = rhoMax + 0.05;\n'
	//         + 'float falloff = 4.0;\n'
	//         + 'float spot = 0.0;\n'
	//         + 'if ( rho >= phi ) {\n'
	//         + 'spot = 1.0;\n'
	//         + '} else if ( rho <= theta ) {\n'
	//         + 'spot = 0.0;\n'
	//         + '} else { \n'
	//         + 'spot = pow( ( rho - theta ) / ( phi - theta ), falloff );\n'
	//         + '}',
	// 	DeferredShaderChunk.computeDiffuse, 'diffuse *= spot;', DeferredShaderChunk.computeSpecular, 'float occlusion = 1.0;\n'
	//         + '#ifdef USE_SHADOWMAP\n'
	//         + 'vec4 posWS = matViewInverse * vertexPositionVS;\n'
	//         + 'vec4 posLightCS = matLightProj * matLightView * posWS;\n'
	//         + 'vec2 shadowCoord = ( posLightCS.xy / posLightCS.w ) * 0.5 + 0.5;\n'
	//         + 'float vertexDepth = posLightCS.z / posLightCS.w;\n'
	//         + '#if !defined( SLOPE_DEPTH_BIAS )\n'
	//         + 'vertexDepth -= shadowBias;\n'
	//         + '#endif\n'
	//         + '#if defined( SHADOWMAP_TYPE_PCF )\n'
	//         + 'float shadowValue = sampleShadowPCF( samplerShadowMap, shadowMapSize, shadowCoord, vertexDepth );\n'
	//         + '#elif defined( SHADOWMAP_TYPE_PCF_SOFT )\n'
	//         + 'float shadowValue = sampleShadowPCFSoft( samplerShadowMap, shadowMapSize, shadowCoord, vertexDepth );\n'
	//         + '#else\n'
	//         + 'float shadowDepth = texture2D( samplerShadowMap, shadowCoord ).x;\n'
	//         + 'float shadowValue = float( vertexDepth > shadowDepth );\n'
	//         + '#endif\n'
	//         + 'occlusion = 1.0 - shadowDarkness * shadowValue;\n'
	//         + '#endif\n'
	//         + 'float attenuation = occlusion;',
	// 	DeferredShaderChunk.combine, '}'
	// 	].join( '\n'
	//     + '' ),
	// 	vertexShader: 'void main() { \n'
	//     + 'gl_Position = vec4( sign( position.xy ), 0.0, 1.0 );\n'
	//     + '}'
	// },
	// directionalLight: {
	// 	uniforms: {
	// 		samplerNormalDepth: {
	// 			type: 't',
	// 			value: null
	// 		},
	// 		samplerColor: {
	// 			type: 't',
	// 			value: null
	// 		},
	// 		matProjInverse: {
	// 			type: 'm4',
	// 			value: new Matrix4()
	// 		},
	// 		viewWidth: {
	// 			type: 'f',
	// 			value: 800
	// 		},
	// 		viewHeight: {
	// 			type: 'f',
	// 			value: 600
	// 		},
	// 		lightDirectionVS: {
	// 			type: 'v3',
	// 			value: new Vector3( 0, 1, 0 )
	// 		},
	// 		lightColor: {
	// 			type: 'c',
	// 			value: new Color( 0 )
	// 		},
	// 		lightIntensity: {
	// 			type: 'f',
	// 			value: 1
	// 		},
	// 		matViewInverse: {
	// 			type: 'm4',
	// 			value: new Matrix4()
	// 		},
	// 		matLightView: {
	// 			type: 'm4v',
	// 			value: []
	// 		},
	// 		matLightProj: {
	// 			type: 'm4v',
	// 			value: []
	// 		},
	// 		samplerShadowMap: {
	// 			type: 'tv',
	// 			value: []
	// 		},
	// 		shadowMapSize: {
	// 			type: 'v2',
	// 			value: new Vector2( 512, 512 )
	// 		},
	// 		shadowDarkness: {
	// 			type: 'f',
	// 			value: 0.5
	// 		},
	// 		shadowBias: {
	// 			type: 'f',
	// 			value: 0
	// 		}
	// 	},
	// 	fragmentShader: [ 'uniform sampler2D samplerColor;\n'
	//     + 'uniform sampler2D samplerNormalDepth;\n'
	//     + 'uniform float lightIntensity;\n'
	//     + 'uniform float viewHeight;\n'
	//     + 'uniform float viewWidth;\n'
	//     + 'uniform vec3 lightColor;\n'
	//     + 'uniform vec3 lightDirectionVS;\n'
	//     + 'uniform mat4 matProjInverse;\n'
	//     + '#ifdef USE_SHADOWMAP\n'
	//     + 'uniform mat4 matViewInverse;\n'
	//     + 'uniform mat4 matLightView[ CASCADE_COUNT ];\n'
	//     + 'uniform mat4 matLightProj[ CASCADE_COUNT ];\n'
	//     + 'uniform sampler2D samplerShadowMap[ CASCADE_COUNT ];\n'
	//     + 'uniform float shadowBias;\n'
	//     + 'uniform float shadowDarkness;\n'
	//     + 'uniform vec2 shadowMapSize;\n'
	//     + '#endif',
	// 	DeferredShaderChunk.unpackFloat, DeferredShaderChunk.shadowMapPCF, DeferredShaderChunk.shadowMapPCFSoft, 'void main() {', DeferredShaderChunk.computeVertexPositionVS, DeferredShaderChunk.computeNormal, DeferredShaderChunk.unpackColorMap, 'vec3 lightVector = lightDirectionVS;', DeferredShaderChunk.computeDiffuse, DeferredShaderChunk.computeSpecular, 'float occlusion = 1.0;\n'
	//         + '#ifdef USE_SHADOWMAP\n'
	//         + 'int inFrustumCount = 0;\n'
	//         + '#ifdef SHADOWMAP_DEBUG\n'
	//         + 'vec3 frustumColors[3];\n'
	//         + 'frustumColors[0] = vec3( 1.0, 0.5, 0.0 );\n'
	//         + 'frustumColors[1] = vec3( 0.0, 1.0, 0.8 );\n'
	//         + 'frustumColors[2] = vec3( 0.0, 0.5, 1.0 );\n'
	//         + 'vec3 debugColor = vec3( 1.0 );\n'
	//         + '#endif\n'
	//         + 'vec4 posWS = matViewInverse * vertexPositionVS;\n'
	//         + 'for ( int i = 0; i < CASCADE_COUNT; i ++ ) {\n'
	//         + 'float sectorOcclusion = 1.0;\n'
	//         + 'vec4 posLightCS = matLightProj[ i ] * matLightView[ i ] * posWS;\n'
	//         + 'vec2 shadowCoord = ( posLightCS.xy / posLightCS.w ) * 0.5 + 0.5;\n'
	//         + 'bvec4 inFrustumVec = bvec4 ( shadowCoord.x >= 0.0, shadowCoord.x <= 1.0, shadowCoord.y >= 0.0, shadowCoord.y <= 1.0 );\n'
	//         + 'bool inFrustum = all( inFrustumVec );\n'
	//         + 'inFrustumCount += int( inFrustum );\n'
	//         + 'if ( inFrustum && inFrustumCount == 1 ) {\n'
	//         + 'float vertexDepth = posLightCS.z / posLightCS.w;\n'
	//         + '#if !defined( SLOPE_DEPTH_BIAS )\n'
	//         + 'vertexDepth -= shadowBias;\n'
	//         + '#endif\n'
	//         + '#if defined( SHADOWMAP_TYPE_PCF )\n'
	//         + 'float shadowValue = sampleShadowPCF( samplerShadowMap[ i ], shadowMapSize, shadowCoord, vertexDepth );\n'
	//         + '#elif defined( SHADOWMAP_TYPE_PCF_SOFT )\n'
	//         + 'float shadowValue = sampleShadowPCFSoft( samplerShadowMap[ i ], shadowMapSize, shadowCoord, vertexDepth );\n'
	//         + '#else\n'
	//         + 'float shadowDepth = texture2D( samplerShadowMap[ i ], shadowCoord ).x;\n'
	//         + 'float shadowValue = float( vertexDepth > shadowDepth );\n'
	//         + '#endif\n'
	//         + 'sectorOcclusion = 1.0 - shadowDarkness * shadowValue;\n'
	//         + 'occlusion *= sectorOcclusion;\n'
	//         + '}\n'
	//         + '#ifdef SHADOWMAP_DEBUG\n'
	//         + 'if ( inFrustum && inFrustumCount == 1 )  debugColor *= frustumColors[ i ];\n'
	//         + '#endif\n'
	//         + '}\n'
	//         + '#endif\n'
	//         + 'float attenuation = occlusion;',
	// 	DeferredShaderChunk.combine, '#ifdef SHADOWMAP_DEBUG\n'
	//         + 'gl_FragColor.xyz *= debugColor;\n'
	//         + '#endif\n'
	//         + '}'
	// 	].join( '\n'
	//     + '' ),
	// 	vertexShader: 'void main() { \n'
	//     + 'gl_Position = vec4( sign( position.xy ), 0.0, 1.0 );\n'
	//     + '}'
	// },
	// hemisphereLight: {
	// 	uniforms: {
	// 		samplerNormalDepth: {
	// 			type: 't',
	// 			value: null
	// 		},
	// 		samplerColor: {
	// 			type: 't',
	// 			value: null
	// 		},
	// 		matProjInverse: {
	// 			type: 'm4',
	// 			value: new Matrix4()
	// 		},
	// 		viewWidth: {
	// 			type: 'f',
	// 			value: 800
	// 		},
	// 		viewHeight: {
	// 			type: 'f',
	// 			value: 600
	// 		},
	// 		lightDirectionVS: {
	// 			type: 'v3',
	// 			value: new Vector3( 0, 1, 0 )
	// 		},
	// 		lightColorSky: {
	// 			type: 'c',
	// 			value: new Color( 0 )
	// 		},
	// 		lightColorGround: {
	// 			type: 'c',
	// 			value: new Color( 0 )
	// 		},
	// 		lightIntensity: {
	// 			type: 'f',
	// 			value: 1
	// 		}
	// 	},
	// 	fragmentShader: [ 'uniform sampler2D samplerColor;\n'
	//     + 'uniform sampler2D samplerNormalDepth;\n'
	//     + 'uniform float lightIntensity;\n'
	//     + 'uniform float viewHeight;\n'
	//     + 'uniform float viewWidth;\n'
	//     + 'uniform vec3 lightColorSky;\n'
	//     + 'uniform vec3 lightColorGround;\n'
	//     + 'uniform vec3 lightDirectionVS;\n'
	//     + 'uniform mat4 matProjInverse;', DeferredShaderChunk.unpackFloat, 'void main() {', DeferredShaderChunk.computeVertexPositionVS,
	// 	DeferredShaderChunk.computeNormal, DeferredShaderChunk.unpackColorMap, 'vec3 lightVector = lightDirectionVS;\n'
	//         + 'float dotProduct = dot( normal, lightVector );\n'
	//         + 'float hemiDiffuseWeight = 0.5 * dotProduct + 0.5;\n'
	//         + 'vec3 hemiColor = mix( lightColorGround, lightColorSky, hemiDiffuseWeight );\n'
	//         + 'vec3 diffuse = hemiColor;\n'
	//         + 'vec3 R = reflect( normalize( vertexPositionVS.xyz ), normal );\n'
	//         + 'R = normalize( R );\n'
	//         + 'vec3 specular = specularColor * mix( lightColorGround, lightColorSky, dot( R, lightVector ) );\n'
	//         + 'const float maxShininess = 200.0;\n'
	//         + 'float shininessCoef = clamp( shininess / maxShininess, 0.0, 1.0 );\n'
	//         + 'gl_FragColor = vec4( lightIntensity * albedo * mix( diffuse, specular, shininessCoef ), 1.0 );\n'
	//         + '}'
	// 	].join( '\n'
	//     + '' ),
	// 	vertexShader: 'void main() { \n'
	//     + 'gl_Position = vec4( sign( position.xy ), 0.0, 1.0 );\n'
	//     + '}'
	// },
	// dayLight: {
	// 	uniforms: {
	// 		samplerNormalDepth: {
	// 			type: 't',
	// 			value: null
	// 		},
	// 		samplerColor: {
	// 			type: 't',
	// 			value: null
	// 		},
	// 		matProjInverse: {
	// 			type: 'm4',
	// 			value: new Matrix4()
	// 		},
	// 		viewWidth: {
	// 			type: 'f',
	// 			value: 800
	// 		},
	// 		viewHeight: {
	// 			type: 'f',
	// 			value: 600
	// 		},
	// 		lightDirectionVSSun: {
	// 			type: 'v3',
	// 			value: new Vector3( 0, 1, 0 )
	// 		},
	// 		lightDirectionVSHemi: {
	// 			type: 'v3',
	// 			value: new Vector3( 0, 1, 0 )
	// 		},
	// 		lightColorSun: {
	// 			type: 'c',
	// 			value: new Color( 0 )
	// 		},
	// 		lightColorSky: {
	// 			type: 'c',
	// 			value: new Color( 0 )
	// 		},
	// 		lightColorGround: {
	// 			type: 'c',
	// 			value: new Color( 0 )
	// 		},
	// 		lightIntensitySun: {
	// 			type: 'f',
	// 			value: 1
	// 		},
	// 		lightIntensityHemi: {
	// 			type: 'f',
	// 			value: 1
	// 		},
	// 		matViewInverse: {
	// 			type: 'm4',
	// 			value: new Matrix4()
	// 		},
	// 		matLightView: {
	// 			type: 'm4v',
	// 			value: []
	// 		},
	// 		matLightProj: {
	// 			type: 'm4v',
	// 			value: []
	// 		},
	// 		samplerShadowMap: {
	// 			type: 'tv',
	// 			value: []
	// 		},
	// 		shadowMapSize: {
	// 			type: 'v2',
	// 			value: new Vector2( 512, 512 )
	// 		},
	// 		shadowDarkness: {
	// 			type: 'f',
	// 			value: 0.5
	// 		},
	// 		shadowBias: {
	// 			type: 'f',
	// 			value: 0
	// 		}
	// 	},
	// 	fragmentShader: [ 'uniform sampler2D samplerColor;\n'
	//     + 'uniform sampler2D samplerNormalDepth;\n'
	//     + 'uniform float lightIntensitySun;\n'
	//     + 'uniform float lightIntensityHemi;\n'
	//     + 'uniform float viewHeight;\n'
	//     + 'uniform float viewWidth;\n'
	//     + 'uniform vec3 lightColorSun;\n'
	//     + 'uniform vec3 lightColorSky;\n'
	//     + 'uniform vec3 lightColorGround;\n'
	//     + 'uniform vec3 lightDirectionVSSun;\n'
	//     + 'uniform vec3 lightDirectionVSHemi;\n'
	//     + 'uniform mat4 matProjInverse;\n'
	//     + '#ifdef USE_SHADOWMAP\n'
	//     + 'uniform mat4 matViewInverse;\n'
	//     + 'uniform mat4 matLightView[ CASCADE_COUNT ];\n'
	//     + 'uniform mat4 matLightProj[ CASCADE_COUNT ];\n'
	//     + 'uniform sampler2D samplerShadowMap[ CASCADE_COUNT ];\n'
	//     + 'uniform float shadowBias;\n'
	//     + 'uniform float shadowDarkness;\n'
	//     + 'uniform vec2 shadowMapSize;\n'
	//     + '#endif',
	// 	DeferredShaderChunk.unpackFloat, DeferredShaderChunk.shadowMapPCF, DeferredShaderChunk.shadowMapPCFSoft, 'void main() {', DeferredShaderChunk.computeVertexPositionVS, DeferredShaderChunk.computeNormal, DeferredShaderChunk.unpackColorMap, 'vec3 lightVector = lightDirectionVSSun;', DeferredShaderChunk.computeDiffuse, DeferredShaderChunk.computeSpecular, 'float occlusion = 1.0;\n'
	//         + '#ifdef USE_SHADOWMAP\n'
	//         + 'int inFrustumCount = 0;\n'
	//         + '#ifdef SHADOWMAP_DEBUG\n'
	//         + 'vec3 frustumColors[3];\n'
	//         + 'frustumColors[0] = vec3( 1.0, 0.5, 0.0 );\n'
	//         + 'frustumColors[1] = vec3( 0.0, 1.0, 0.8 );\n'
	//         + 'frustumColors[2] = vec3( 0.0, 0.5, 1.0 );\n'
	//         + 'vec3 debugColor = vec3( 1.0 );\n'
	//         + '#endif\n'
	//         + 'vec4 posWS = matViewInverse * vertexPositionVS;\n'
	//         + 'for ( int i = 0; i < CASCADE_COUNT; i ++ ) {\n'
	//         + 'float sectorOcclusion = 1.0;\n'
	//         + 'vec4 posLightCS = matLightProj[ i ] * matLightView[ i ] * posWS;\n'
	//         + 'vec2 shadowCoord = ( posLightCS.xy / posLightCS.w ) * 0.5 + 0.5;\n'
	//         + 'bvec4 inFrustumVec = bvec4 ( shadowCoord.x >= 0.0, shadowCoord.x <= 1.0, shadowCoord.y >= 0.0, shadowCoord.y <= 1.0 );\n'
	//         + 'bool inFrustum = all( inFrustumVec );\n'
	//         + 'inFrustumCount += int( inFrustum );\n'
	//         + 'if ( inFrustum && inFrustumCount == 1 ) {\n'
	//         + 'float vertexDepth = posLightCS.z / posLightCS.w;\n'
	//         + '#if !defined( SLOPE_DEPTH_BIAS )\n'
	//         + 'vertexDepth -= shadowBias;\n'
	//         + '#endif\n'
	//         + '#if defined( SHADOWMAP_TYPE_PCF )\n'
	//         + 'float shadowValue = sampleShadowPCF( samplerShadowMap[ i ], shadowMapSize, shadowCoord, vertexDepth );\n'
	//         + '#elif defined( SHADOWMAP_TYPE_PCF_SOFT )\n'
	//         + 'float shadowValue = sampleShadowPCFSoft( samplerShadowMap[ i ], shadowMapSize, shadowCoord, vertexDepth );\n'
	//         + '#else\n'
	//         + 'float shadowDepth = texture2D( samplerShadowMap[ i ], shadowCoord ).x;\n'
	//         + 'float shadowValue = float( vertexDepth > shadowDepth );\n'
	//         + '#endif\n'
	//         + 'sectorOcclusion = 1.0 - shadowDarkness * shadowValue;\n'
	//         + 'occlusion *= sectorOcclusion;\n'
	//         + '}\n'
	//         + '#ifdef SHADOWMAP_DEBUG\n'
	//         + 'if ( inFrustum && inFrustumCount == 1 )  debugColor *= frustumColors[ i ];\n'
	//         + '#endif\n'
	//         + '}\n'
	//         + '#endif\n'
	//         + 'vec3 directionalTerm = occlusion * lightIntensitySun * lightColorSun * ( albedo * diffuse + specular );\n'
	//         + '#ifdef SHADOWMAP_DEBUG\n'
	//         + 'gl_FragColor.xyz *= debugColor;\n'
	//         + '#endif\n'
	//         + 'vec3 lightVectorHemi = lightDirectionVSHemi;\n'
	//         + 'float dotProductHemi = dot( normal, lightVectorHemi );\n'
	//         + 'float hemiDiffuseWeight = 0.5 * dotProductHemi + 0.5;\n'
	//         + 'vec3 hemiColor = mix( lightColorGround, lightColorSky, hemiDiffuseWeight );\n'
	//         + 'vec3 diffuseHemi = hemiColor;\n'
	//         + 'vec3 R = reflect( normalize( vertexPositionVS.xyz ), normal );\n'
	//         + 'R = normalize( R );\n'
	//         + 'vec3 specularHemi = specularColor * mix( lightColorGround, lightColorSky, dot( R, lightVectorHemi ) );\n'
	//         + 'const float maxShininess = 200.0;\n'
	//         + 'float shininessCoef = clamp( shininess / maxShininess, 0.0, 1.0 );\n'
	//         + 'vec3 hemiTerm = lightIntensityHemi * albedo * mix( diffuseHemi, specularHemi, shininessCoef );\n'
	//         + 'vec3 emissiveTerm = float_to_vec3( abs( colorMap.w ) );\n'
	//         + 'gl_FragColor = vec4( directionalTerm + hemiTerm + emissiveTerm, 1.0 );\n'
	//         + '}'
	// 	].join( '\n'
	//     + '' ),
	// 	vertexShader: 'void main() { \n'
	//     + 'gl_Position = vec4( sign( position.xy ), 0.0, 1.0 );\n'
	//     + '}'
	// },
	// emissiveLight: {
	// 	uniforms: {
	// 		samplerColor: {
	// 			type: 't',
	// 			value: null
	// 		},
	// 		viewWidth: {
	// 			type: 'f',
	// 			value: 800
	// 		},
	// 		viewHeight: {
	// 			type: 'f',
	// 			value: 600
	// 		}
	// 	},
	// 	fragmentShader: [ 'uniform sampler2D samplerColor;\n'
	//     + 'uniform float viewHeight;\n'
	//     + 'uniform float viewWidth;', DeferredShaderChunk.unpackFloat, 'void main() {\n'
	//     + 'vec2 texCoord = gl_FragCoord.xy / vec2( viewWidth, viewHeight );\n'
	//     + 'vec4 colorMap = texture2D( samplerColor, texCoord );\n'
	//     + 'vec3 emissiveColor = float_to_vec3( abs( colorMap.w ) );\n'
	//     + 'gl_FragColor = vec4( emissiveColor, 1.0 );\n'
	//     + '}' ].join( '\n'
	//     + '' ),
	// 	vertexShader: 'void main() { \n'
	//     + 'gl_Position = vec4( sign( position.xy ), 0.0, 1.0 );\n'
	//     + '}'
	// },
	// composite: {
	// 	uniforms: {
	// 		samplerLight: {
	// 			type: 't',
	// 			value: null
	// 		},
	// 		brightness: {
	// 			type: 'f',
	// 			value: 1
	// 		}
	// 	},
	// 	fragmentShader: 'varying vec2 texCoord;\n'
	//     + 'uniform sampler2D samplerLight;\n'
	//     + 'uniform float brightness;\n'
	//     + '#ifdef TONEMAP_UNCHARTED\n'
	//     + 'const float A = 0.15;\n'
	//     + 'const float B = 0.50;\n'
	//     + 'const float C = 0.10;\n'
	//     + 'const float D = 0.20;\n'
	//     + 'const float E = 0.02;\n'
	//     + 'const float F = 0.30;\n'
	//     + 'const float W = 11.2;\n'
	//     + 'vec3 Uncharted2Tonemap( vec3 x ) {\n'
	//     + 'return ( ( x * ( A * x + C * B ) + D * E ) / ( x * ( A * x + B ) + D * F ) ) - E / F;\n'
	//     + '}\n'
	//     + '#endif\n'
	//     + 'void main() {\n'
	//     + 'vec3 inColor = texture2D( samplerLight, texCoord ).xyz;\n'
	//     + 'inColor *= brightness;\n'
	//     + 'vec3 outColor;\n'
	//     + '#if defined( TONEMAP_SIMPLE )\n'
	//     + 'outColor = sqrt( inColor );\n'
	//     + '#elif defined( TONEMAP_LINEAR )\n'
	//     + 'outColor = pow( inColor, vec3( 1.0 / 2.2 ) );\n'
	//     + '#elif defined( TONEMAP_REINHARD )\n'
	//     + 'inColor = inColor / ( 1.0 + inColor );\n'
	//     + 'outColor = pow( inColor, vec3( 1.0 / 2.2 ) );\n'
	//     + '#elif defined( TONEMAP_FILMIC )\n'
	//     + 'vec3 x = max( vec3( 0.0 ), inColor - 0.004 );\n'
	//     + 'outColor = ( x * ( 6.2 * x + 0.5 ) ) / ( x * ( 6.2 * x + 1.7 ) + 0.06 );\n'
	//     + '#elif defined( TONEMAP_UNCHARTED )\n'
	//     + 'float ExposureBias = 2.0;\n'
	//     + 'vec3 curr = Uncharted2Tonemap( ExposureBias * inColor );\n'
	//     + 'vec3 whiteScale = vec3( 1.0 ) / Uncharted2Tonemap( vec3( W ) );\n'
	//     + 'vec3 color = curr * whiteScale;\n'
	//     + 'outColor = pow( color, vec3( 1.0 / 2.2 ) );\n'
	//     + '#else\n'
	//     + 'outColor = inColor;\n'
	//     + '#endif\n'
	//     + 'gl_FragColor = vec4( outColor, 1.0 );\n'
	//     + '}',
	// 	vertexShader: 'varying vec2 texCoord;\n'
	//     + 'void main() {\n'
	//     + 'vec4 pos = vec4( sign( position.xy ), 0.0, 1.0 );\n'
	//     + 'texCoord = pos.xy * vec2( 0.5 ) + 0.5;\n'
	//     + 'gl_Position = pos;\n'
	//     + '}'
	// }
};

export { ShaderDeferred };
