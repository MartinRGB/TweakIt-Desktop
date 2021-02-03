import {
	UniformsLib
} from '../../src/Three';

var TextureAreaLightUniformsLib = {

	init: function ( texture ) {

		UniformsLib.TEXTURE_AREA_LIGHT_TEXTURE = texture;

	}

};

export { TextureAreaLightUniformsLib };
