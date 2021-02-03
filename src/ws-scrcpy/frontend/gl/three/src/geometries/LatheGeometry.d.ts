import { Vector2 } from './../math/Vector2';
import { Geometry } from './../core/Geometry';

export class LatheGeometry extends Geometry {

	/**
	 * @param points
	 * @param [segments=12]
	 * @param [phiStart=0]
	 * @param [phiLength=Math.PI * 2]
	 */
	constructor(
		points: Vector2[],
		segments?: number,
		phiStart?: number,
		phiLength?: number
	);


	/**
	 * @default 'LatheGeometry'
	 */
	type: string;

	parameters: {
		points: Vector2[];
		segments: number;
		phiStart: number;
		phiLength: number;
	};

}
