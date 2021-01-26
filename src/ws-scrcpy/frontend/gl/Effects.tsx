import * as THREE from 'three'
import React, { useRef, useMemo, useEffect } from 'react'
import { extend, useThree, useFrame,ReactThreeFiber } from 'react-three-fiber'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer'
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass'
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass'
import { BlurPass, Resizer, KernelSize } from 'postprocessing'
import { FilmPass } from 'three/examples/jsm/postprocessing/FilmPass'

extend({ EffectComposer, ShaderPass, RenderPass, UnrealBloomPass, FilmPass })

extend({ BlurPass, Resizer, KernelSize})

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      unrealBloomPass: ReactThreeFiber.Object3DNode<
      UnrealBloomPass,
        typeof UnrealBloomPass
      >;
    }
  }
}

export default function Effects() {
  const composer = useRef()
  const { scene, gl, size, camera } = useThree()
  const aspect = useMemo(() => new THREE.Vector2(512, 512), [])
  useEffect(() => void composer.current.setSize(size.width, size.height), [size])
  useFrame(() => composer.current.render(), 1)
  return (
    <effectComposer ref={composer} args={[gl]}>
      <renderPass attachArray="passes" scene={scene} camera={camera} />
      <unrealBloomPass attachArray="passes" args={[aspect, 1, 0.5, 0]} />
    </effectComposer>
  )
}