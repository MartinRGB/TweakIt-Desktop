import { Object3D } from '../core/Object3D';
import { Vector3 } from '../math/Vector3.js';
import { Quaternion } from '../math/Quaternion.js';

function Gyroscope() {

	Object3D.call( this );

}


Gyroscope.prototype = Object.create( Object3D.prototype );
Gyroscope.prototype.updateMatrixWorld = function ( a ) {

	this.matrixAutoUpdate && this.updateMatrix();
	if ( this.matrixWorldNeedsUpdate || a ) this.parent ? ( this.matrixWorld.multiply( this.parent.matrixWorld, this.matrix ), this.matrixWorld.decompose( this.translationWorld, this.rotationWorld, this.scaleWorld ), this.matrix.decompose( this.translationObject, this.rotationObject, this.scaleObject ), this.matrixWorld.compose( this.translationWorld, this.rotationObject, this.scaleWorld ) ) : this.matrixWorld.copy( this.matrix ), this.matrixWorldNeedsUpdate = ! 1, a = ! 0;
	for ( var b = 0, c = this.children.length; b < c; b ++ ) this.children[ b ].updateMatrixWorld( a );

};

Gyroscope.prototype.translationWorld = new Vector3();
Gyroscope.prototype.translationObject = new Vector3();
Gyroscope.prototype.rotationWorld = new Quaternion();
Gyroscope.prototype.rotationObject = new Quaternion();
Gyroscope.prototype.scaleWorld = new Vector3();
Gyroscope.prototype.scaleObject = new Vector3();

export { Gyroscope };
