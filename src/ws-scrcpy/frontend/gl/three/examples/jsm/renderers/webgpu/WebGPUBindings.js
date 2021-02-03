import WebGPUUniformsGroup from './WebGPUUniformsGroup.js';
import { FloatUniform, Matrix3Uniform, Matrix4Uniform } from './WebGPUUniform.js';
import WebGPUSampler from './WebGPUSampler.js';
import { WebGPUSampledTexture } from './WebGPUSampledTexture.js';

class WebGPUBindings {

	constructor( device, info, properties, textures, pipelines, computePipelines, attributes ) {

		this.device = device;
		this.info = info;
		this.properties = properties;
		this.textures = textures;
		this.pipelines = pipelines;
		this.computePipelines = computePipelines;
		this.attributes = attributes;

		this.uniformsData = new WeakMap();

		this.sharedUniformsGroups = new Map();

		this.updateMap = new WeakMap();

		this._setupSharedUniformsGroups();

	}

	get( object ) {

		let data = this.uniformsData.get( object );

		if ( data === undefined ) {

			const pipeline = this.pipelines.get( object );
			const material = object.material;
			let bindings;

			// each material defines an array of bindings (ubos, textures, samplers etc.)

			if ( material.isMeshBasicMaterial ) {

				bindings = this._getMeshBasicBindings();

			} else if ( material.isPointsMaterial ) {

				bindings = this._getPointsBasicBindings();

			} else if ( material.isLineBasicMaterial ) {

				bindings = this._getLinesBasicBindings();

			} else {

				console.error( 'THREE.WebGPURenderer: Unknwon shader type.' );

			}

			// setup (static) binding layout and (dynamic) binding group

			const bindLayout = pipeline.getBindGroupLayout( 0 );
			const bindGroup = this._createBindGroup( bindings, bindLayout );

			data = {
				layout: bindLayout,
				group: bindGroup,
				bindings: bindings
			};

			this.uniformsData.set( object, data );

		}

		return data;

	}

	getForCompute( param ) {

		let data = this.uniformsData.get( param );

		if ( data === undefined ) {

			const pipeline = this.computePipelines.get( param );
			const bindings = param.bindings !== undefined ? param.bindings.slice() : [];
			const bindLayout = pipeline.getBindGroupLayout( 0 );
			const bindGroup = this._createBindGroup( bindings, bindLayout );

			data = {
				layout: bindLayout,
				group: bindGroup,
				bindings: bindings
			};

			this.uniformsData.set( param, data );

		}

		return data;

	}

	update( object, camera ) {

		const textures = this.textures;

		const data = this.get( object );
		const bindings = data.bindings;

		const updateMap = this.updateMap;
		const frame = this.info.render.frame;
		const sharedUniformsGroups = this.sharedUniformsGroups;

		let needsBindGroupRefresh = false;

		// iterate over all bindings and check if buffer updates or a new binding group is required

		for ( const binding of bindings ) {

			if ( binding.isUniformsGroup ) {

				const isShared = sharedUniformsGroups.has( binding.name );
				const isUpdated = updateMap.get( binding ) === frame;

				if ( isShared && isUpdated ) continue;

				const array = binding.array;
				const bufferGPU = binding.bufferGPU;

				binding.onBeforeUpdate( object, camera );

				const needsBufferWrite = binding.update();

				if ( needsBufferWrite === true ) {

					this.device.defaultQueue.writeBuffer(
						bufferGPU,
						0,
						array,
						0
					);

				}

				updateMap.set( binding, frame );

			} else if ( binding.isStorageBuffer ) {

				const attribute = binding.attribute;
				this.attributes.update( attribute, false, binding.usage );

			} else if ( binding.isSampler ) {

				const material = object.material;
				const texture = material[ binding.name ];

				if ( texture !== null ) {

					textures.updateSampler( texture );

					const samplerGPU = textures.getSampler( texture );

					if ( binding.samplerGPU !== samplerGPU ) {

						binding.samplerGPU = samplerGPU;
						needsBindGroupRefresh = true;

					}

				}

			} else if ( binding.isSampledTexture ) {

				const material = object.material;
				const texture = material[ binding.name ];

				if ( texture !== null ) {

					const forceUpdate = textures.updateTexture( texture );
					const textureGPU = textures.getTextureGPU( texture );

					if ( binding.textureGPU !== textureGPU || forceUpdate === true ) {

						binding.textureGPU = textureGPU;
						needsBindGroupRefresh = true;

					}

				}

			}

		}

		if ( needsBindGroupRefresh === true ) {

			data.group = this._createBindGroup( bindings, data.layout );

		}

	}

	dispose() {

		this.uniformsData = new WeakMap();
		this.updateMap = new WeakMap();

	}

	_createBindGroup( bindings, layout ) {

		let bindingPoint = 0;
		const entries = [];

		for ( const binding of bindings ) {

			if ( binding.isUniformsGroup ) {

				if ( binding.bufferGPU === null ) {

					const byteLength = binding.getByteLength();

					binding.array = new Float32Array( new ArrayBuffer( byteLength ) );

					binding.bufferGPU = this.device.createBuffer( {
						size: byteLength,
						usage: binding.usage,
					} );

				}

				entries.push( { binding: bindingPoint, resource: { buffer: binding.bufferGPU } } );

			} else if ( binding.isStorageBuffer ) {

				if ( binding.bufferGPU === null ) {

					const attribute = binding.attribute;

					this.attributes.update( attribute, false, binding.usage );
					binding.bufferGPU = this.attributes.get( attribute ).buffer;

				}

				entries.push( { binding: bindingPoint, resource: { buffer: binding.bufferGPU } } );

			} else if ( binding.isSampler ) {

				if ( binding.samplerGPU === null ) {

					binding.samplerGPU = this.textures.getDefaultSampler();

				}

				entries.push( { binding: bindingPoint, resource: binding.samplerGPU } );

			} else if ( binding.isSampledTexture ) {

				if ( binding.textureGPU === null ) {

					if ( binding.isSampledCubeTexture ) {

						binding.textureGPU = this.textures.getDefaultCubeTexture();

					} else {

						binding.textureGPU = this.textures.getDefaultTexture();

					}

				}

				entries.push( { binding: bindingPoint, resource: binding.textureGPU.createView( { dimension: binding.dimension } ) } );

			}

			bindingPoint ++;

		}

		return this.device.createBindGroup( {
			layout: layout,
			entries: entries
		} );

	}

	_getMeshBasicBindings() {

		const bindings = [];

		// UBOs

		// model

		const modelViewUniform = new Matrix4Uniform( 'modelMatrix' );
		const modelViewMatrixUniform = new Matrix4Uniform( 'modelViewMatrix' );
		const normalMatrixUniform = new Matrix3Uniform( 'normalMatrix' );

		const modelGroup = new WebGPUUniformsGroup( 'modelUniforms' );
		modelGroup.addUniform( modelViewUniform );
		modelGroup.addUniform( modelViewMatrixUniform );
		modelGroup.addUniform( normalMatrixUniform );
		modelGroup.setOnBeforeUpdate( function ( object/*, camera */ ) {

			modelViewUniform.setValue( object.matrixWorld );
			modelViewMatrixUniform.setValue( object.modelViewMatrix );
			normalMatrixUniform.setValue( object.normalMatrix );

		} );

		// camera

		const cameraGroup = this.sharedUniformsGroups.get( 'cameraUniforms' );

		// material (opacity for testing)

		const opacityUniform = new FloatUniform( 'opacity', 1 );

		const opacityGroup = new WebGPUUniformsGroup( 'opacityUniforms' );
		opacityGroup.addUniform( opacityUniform );
		opacityGroup.setVisibility( GPUShaderStage.FRAGMENT );
		opacityGroup.setOnBeforeUpdate( function ( object/*, camera */ ) {

			const material = object.material;
			const opacity = ( material.transparent === true ) ? material.opacity : 1.0;

			opacityUniform.setValue( opacity );

		} );

		// sampler

		const diffuseSampler = new WebGPUSampler( 'map' );

		// texture

		const diffuseTexture = new WebGPUSampledTexture( 'map' );

		// the order of WebGPUBinding objects must match the binding order in the shader

		bindings.push( modelGroup );
		bindings.push( cameraGroup );
		bindings.push( opacityGroup );
		bindings.push( diffuseSampler );
		bindings.push( diffuseTexture );

		return bindings;

	}

	_getPointsBasicBindings() {

		const bindings = [];

		// UBOs

		const modelViewUniform = new Matrix4Uniform( 'modelMatrix' );
		const modelViewMatrixUniform = new Matrix4Uniform( 'modelViewMatrix' );

		const modelGroup = new WebGPUUniformsGroup( 'modelUniforms' );
		modelGroup.addUniform( modelViewUniform );
		modelGroup.addUniform( modelViewMatrixUniform );
		modelGroup.setOnBeforeUpdate( function ( object/*, camera */ ) {

			modelViewUniform.setValue( object.matrixWorld );
			modelViewMatrixUniform.setValue( object.modelViewMatrix );

		} );

		const cameraGroup = this.sharedUniformsGroups.get( 'cameraUniforms' );

		//

		bindings.push( modelGroup );
		bindings.push( cameraGroup );

		return bindings;

	}

	_getLinesBasicBindings() {

		const bindings = [];

		// UBOs

		const modelViewUniform = new Matrix4Uniform( 'modelMatrix' );
		const modelViewMatrixUniform = new Matrix4Uniform( 'modelViewMatrix' );

		const modelGroup = new WebGPUUniformsGroup( 'modelUniforms' );
		modelGroup.addUniform( modelViewUniform );
		modelGroup.addUniform( modelViewMatrixUniform );
		modelGroup.setOnBeforeUpdate( function ( object/*, camera */ ) {

			modelViewUniform.setValue( object.matrixWorld );
			modelViewMatrixUniform.setValue( object.modelViewMatrix );

		} );

		const cameraGroup = this.sharedUniformsGroups.get( 'cameraUniforms' );

		//

		bindings.push( modelGroup );
		bindings.push( cameraGroup );

		return bindings;

	}

	_setupSharedUniformsGroups() {

		const projectionMatrixUniform = new Matrix4Uniform( 'projectionMatrix' );
		const viewMatrixUniform = new Matrix4Uniform( 'viewMatrix' );

		const cameraGroup = new WebGPUUniformsGroup( 'cameraUniforms' );
		cameraGroup.addUniform( projectionMatrixUniform );
		cameraGroup.addUniform( viewMatrixUniform );
		cameraGroup.setOnBeforeUpdate( function ( object, camera ) {

			projectionMatrixUniform.setValue( camera.projectionMatrix );
			viewMatrixUniform.setValue( camera.matrixWorldInverse );

		} );

		this.sharedUniformsGroups.set( cameraGroup.name, cameraGroup );

	}

}

export default WebGPUBindings;
