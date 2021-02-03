// import {
// 	Color,
// 	Light,
// } from '../../src/Three';

// export class TextureAreaLight extends Light {

// 	constructor(
// 		color?: Color | string | number,
// 		intensity?: number,
// 		width?: number,
// 		height?: number
// 	);

// 	/**
// 	 * @default 'TextureAreaLight'
// 	 */
// 	type: string;

// 	/**
// 	 * @default 10
// 	 */
// 	width: number;

// 	/**
// 	 * @default 10
// 	 */
// 	height: number;

// 	/**
// 	 * @default 1
// 	 */
// 	intensity: number;

// }

/**
 * @loader 		 					src/loaders/ObjectLoader
 * @light_number 					src/renderers/webgl/WebGLProgram
 * 	 								src/renderers/webgl/WebGLPrograms
 * @webgl_light_define  			src/renderers/webgl/WebGLLight
 * @cpu_uniforms_define  			src/renderers/shaders/UniformsLib
 * @shader_uniforms_define			src/renderers/shaders/ShaderChunk/lights_pars_begin.glsl
 * @shader_functions_entry			src/renderers/shaders/ShaderChunk/lights_fragment_begin.glsl
 * @shader_on_physics_material		src/renderers/shaders/ShaderChunk/lights_physical_pars_fragment.glsl
 *
 * @TODO_shader_on_shadowmap		src/renderers/shaders/ShaderChunk/shadowmap_pars_vertex.glsl
 * 									src/renderers/shaders/ShaderChunk/shadowmask_pars_fragment.glsl
 * 									src/renderers/shaders/ShaderChunk/shadowmap_vertex.glsl.glsl
 * 									src/renderers/shaders/ShaderChunk/shadowmap_pars_fragment.glsl
 *
 * @ltc_define						src/renderers/webgl/WebGLLight
 * @ltc_bsdf						src/renderers/shaders/ShaderChunk/bsdfs
 * @ltc_tonemapping					src/renderers/shaders/ShaderChunk/tonemapping_pars_fragment.glsl
 */


import {
	AreaLightProxy,
	Color,
	Light,
	Texture,
	WebGLRenderer
} from '../../src/Three';

export class TextureAreaLight extends Light {

	constructor(
		color?: Color | string | number,
		intensity?: number,
		width?: number,
		height?: number,
		texture?: Texture | Texture[] | null,
		renderer?: WebGLRenderer,
	);

	/**
	 * @default 'TextureAreaLight'
	 */
	type: string;

	/**
	 * @default 10
	 */
	width: number;

	/**
	 * @default 10
	 */
	height: number;

	/**
	 * @default 1
	 */
	intensity: number;

	/**
	 * @default undefined
	 */
	texture: Texture | null;

	/**
	 * @default undefined
	 */
	renderer: WebGLRenderer | null;

	/**
	 * @default undefined
	 */
	lightProxy: AreaLightProxy;

	readonly isTextureAreaLight: true;

}
