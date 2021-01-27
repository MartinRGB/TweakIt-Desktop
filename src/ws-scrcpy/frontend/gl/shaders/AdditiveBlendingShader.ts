export default {
  uniforms: {
    tDiffuse: { value: null },
    tReflector: { value: null },
  },

  vertexShader: `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
    }`,

  fragmentShader: `
    uniform sampler2D tDiffuse;
    uniform sampler2D tReflector;
    varying vec2 vUv;
    
    float blendAdd(float base, float blend) {
      return min(base+blend,1.0);
    }
    
    vec3 blendAdd(vec3 base, vec3 blend) {
      return min(base+blend,vec3(1.0));
    }
    
    vec3 blendAdd(vec3 base, vec3 blend, float opacity) {
      return (blendAdd(base, blend) * opacity + base * (1.0 - opacity));
    }

    float blendLighten(float base, float blend) {
      return max(blend,base);
    }
    
    vec3 blendLighten(vec3 base, vec3 blend) {
      return vec3(blendLighten(base.r,blend.r),blendLighten(base.g,blend.g),blendLighten(base.b,blend.b));
    }
    
    vec3 blendLighten(vec3 base, vec3 blend, float opacity) {
      return (blendLighten(base, blend) * opacity + base * (1.0 - opacity));
    }

    void main() {
      vec4 color = texture2D( tDiffuse, vUv );
      vec4 reflector = texture2D( tReflector, vUv );
      gl_FragColor = vec4(blendAdd(color.rgb,reflector.rgb),1.0) ;
    }`
}
