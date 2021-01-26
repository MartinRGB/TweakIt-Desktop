export default {
  uniforms: {
    tDiffuse: { value: null },
    resolution: {value:null},
  },

  vertexShader: `
    varying vec2 vUv;
    void main() {
    vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
    }`,

  fragmentShader: `
    uniform sampler2D tDiffuse;
    uniform vec2 resolution;
    varying vec2 vUv;

    vec4 kawase()
    {
        vec2 uv = vec2(gl_FragCoord.xy / (resolution.xy * 2. * sqrt(4.)));
        vec2 halfpixel = 0.5 / (resolution.xy * 2.0);
        float offset = 3.0;
    
        vec4 sum = texture2D(tDiffuse, uv +vec2(-halfpixel.x * 2.0, 0.0) * offset);
    
        sum += texture2D(tDiffuse, uv + vec2(-halfpixel.x, halfpixel.y) * offset) * 2.0;
        sum += texture2D(tDiffuse, uv + vec2(0.0, halfpixel.y * 2.0) * offset);
        sum += texture2D(tDiffuse, uv + vec2(halfpixel.x, halfpixel.y) * offset) * 2.0;
        sum += texture2D(tDiffuse, uv + vec2(halfpixel.x * 2.0, 0.0) * offset);
        sum += texture2D(tDiffuse, uv + vec2(halfpixel.x, -halfpixel.y) * offset) * 2.0;
        sum += texture2D(tDiffuse, uv + vec2(0.0, -halfpixel.y * 2.0) * offset);
        sum += texture2D(tDiffuse, uv + vec2(-halfpixel.x, -halfpixel.y) * offset) * 2.0;
    
        return sum / 12.0;
    }

    void main() {
      gl_FragColor = kawase();
    }`
}
