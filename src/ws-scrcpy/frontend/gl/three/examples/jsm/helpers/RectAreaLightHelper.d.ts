import {
	Color,
	Line,
	RectAreaLight,
	TextureAreaLight
} from '../../../src/Three';

export class RectAreaLightHelper extends Line {

	constructor( light: RectAreaLight | TextureAreaLight, color?: Color | string | number );

	light: RectAreaLight | TextureAreaLight;
	color: Color | string | number | undefined;

	update(): void;
	dispose(): void;

}
