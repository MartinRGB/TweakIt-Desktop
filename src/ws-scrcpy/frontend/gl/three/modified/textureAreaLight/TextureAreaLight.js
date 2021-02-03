// import {
// 	Vector3,
// 	Light
// } from '../../src/Three';

// /**
//  *  This helper must be added as a child of the light
//  */

// function TextureAreaLight( color, intensity, width, height ) {

// 	Light.call( this, color );

// 	this.type = 'TextureAreaLight';

// 	this.normal = new Vector3( 0, - 1, 0 );
// 	this.right = new Vector3( 1, 0, 0 );
// 	this.intensity = void 0 !== intensity ? intensity : 1;
// 	this.width = void 0 !== width ? width : 1;
// 	this.height = void 0 !== height ? height : 1;
// 	this.constantAttenuation = 1.5;
// 	this.linearAttenuation = 0.5;
// 	this.quadraticAttenuation = 0.1;
// 	this.texture = null;

// }

// TextureAreaLight.prototype = Object.create( Light.prototype );

// TextureAreaLight.prototype.constructor = TextureAreaLight;

// export { TextureAreaLight };
import { AreaLightProxy, Light, Vector3 } from '../../src/Three';

function TextureAreaLight( color,
	intensity,
	width,
	height,
	texture,
	renderer,
	constantAttenuation,
	linearAttenuation,
	quadraticAttenuation,
	normal,
	right ) {

	Light.call( this, color, intensity );

	this.type = 'TextureAreaLight';

	this.width = ( width !== undefined ) ? width : 10;
	this.height = ( height !== undefined ) ? height : 10;
	this.texture = ( texture !== null ) ? texture : null;
	this.renderer = ( renderer !== null ) ? renderer : null;
	this.normal = ( normal !== undefined ) ? normal : new Vector3( 0, - 1, 0 );
	this.right = ( right !== undefined ) ? right : new Vector3( 1, 0, 0 );
	this.intensity = ( intensity !== undefined ) ? intensity : 1;
	this.constantAttenuation = ( constantAttenuation !== undefined ) ? constantAttenuation : 1.5;
	this.linearAttenuation = ( linearAttenuation !== undefined ) ? linearAttenuation : 0.5;
	this.quadraticAttenuation = ( quadraticAttenuation !== undefined ) ? quadraticAttenuation : 0.5;
	this.lightProxy = ( renderer !== null ) ? new AreaLightProxy( this, renderer ) : null;

}

TextureAreaLight.prototype = Object.assign( Object.create( Light.prototype ), {

	constructor: TextureAreaLight,

	isTextureAreaLight: true,

	copy: function ( source ) {

		Light.prototype.copy.call( this, source );

		this.width = source.width;
		this.height = source.height;
		this.texture = source.texture;
		this.normal = source.normal;
		this.right = source.right;
		this.intensity = source.intensity;
		this.constantAttenuation = source.constantAttenuation;
		this.linearAttenuation = source.linearAttenuation;
		this.quadraticAttenuation = source.quadraticAttenuation;
		this.lightProxy = source.lightProxy;

		return this;

	},

	toJSON: function ( meta ) {

		const data = Light.prototype.toJSON.call( this, meta );

		data.object.width = this.width;
		data.object.height = this.height;
		data.object.texture = this.texture;
		data.object.normal = this.normal;
		data.object.right = this.right;
		data.object.intensity = this.intensity;
		data.object.constantAttenuation = this.constantAttenuation;
		data.object.linearAttenuation = this.linearAttenuation;
		data.object.quadraticAttenuation = this.quadraticAttenuation;
		data.object.lightProxy = this.lightProxy;

		return data;

	}

} );

export { TextureAreaLight };
