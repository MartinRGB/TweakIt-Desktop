import { Geometry } from './../core/Geometry';
import { Material } from './../materials/Material';
import { Object3D } from './../core/Object3D';
import { BufferGeometry } from '../core/BufferGeometry';
import { Vector3 } from './../math/Vector3';
import { Quaternion } from './../math/Quaternion';

export class Gyroscope <
	TGeometry extends Geometry | BufferGeometry = Geometry | BufferGeometry,
	TMaterial extends Material | Material[] = Material | Material[]
> extends Object3D {

	constructor();

	translationWorld:Vector3;
	translationObject:Vector3;
	rotationWorld:Quaternion;
	rotationObject:Quaternion;
	scaleWorld:Vector3;
	scaleObject:Vector3;

	updateMatrixWorld( force?: boolean ): void;

}
