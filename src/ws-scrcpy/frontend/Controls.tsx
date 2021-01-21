import React, { useRef } from 'react';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { extend, useThree, useFrame, ReactThreeFiber } from 'react-three-fiber';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

// https://spectrum.chat/react-three-fiber/general/property-orbitcontrols-does-not-exist-on-type-jsx-intrinsicelements~44712e68-4601-4486-b4b4-5e112f3dc09e
declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      orbitControls: ReactThreeFiber.Object3DNode<
        OrbitControls,
        typeof OrbitControls
      >;
    }
  }
}

interface OrbitRef {
  obj: {
    update: Function;
  };
}

extend({ OrbitControls });

const Controls: React.FC<any> = (props) => {
  const ref = useRef<OrbitRef>(null);
  const { camera, gl } = useThree();
  useFrame(() => {
    ref.current?.obj?.update();
  });
  return <orbitControls ref={ref} args={[camera, gl.domElement]} {...props} />;
};

export default Controls;