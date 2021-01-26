"use strict";
exports.__esModule = true;
var react_1 = require("react");
var useAspect_1 = require("@react-three/drei/useAspect");
var react_three_fiber_1 = require("react-three-fiber");
var drei_1 = require("@react-three/drei");
var THREE = require("three");
var nx_jpg_1 = require("../assets/envmap_citynight/nx.jpg");
var ny_jpg_1 = require("../assets/envmap_citynight/ny.jpg");
var nz_jpg_1 = require("../assets/envmap_citynight/nz.jpg");
var px_jpg_1 = require("../assets/envmap_citynight/px.jpg");
var py_jpg_1 = require("../assets/envmap_citynight/py.jpg");
var pz_jpg_1 = require("../assets/envmap_citynight/pz.jpg");
var cubeUrls = [
    px_jpg_1["default"], nx_jpg_1["default"],
    py_jpg_1["default"], ny_jpg_1["default"],
    pz_jpg_1["default"], nz_jpg_1["default"]
];
var MetalRustRepolished001_COL_1K_SPECULAR_jpg_1 = require("../assets/floor_texture/MetalRustRepolished001_COL_1K_SPECULAR.jpg");
var MetalRustRepolished001_NRM_1K_SPECULAR_jpg_1 = require("../assets/floor_texture/MetalRustRepolished001_NRM_1K_SPECULAR.jpg");
var MetalRustRepolished001_GLOSS_VAR2_1K_SPECULAR_jpg_1 = require("../assets/floor_texture/MetalRustRepolished001_GLOSS_VAR2_1K_SPECULAR.jpg");
var MetalRustRepolished001_DISP_1K_SPECULAR_jpg_1 = require("../assets/floor_texture/MetalRustRepolished001_DISP_1K_SPECULAR.jpg");
var tex_jpg_1 = require("../assets/realistic_texutre/tex.jpg");
var WIDTH = window.innerWidth;
var HEIGHT = window.innerHeight;
var ReflectorInstance_1 = require("./reflector/ReflectorInstance");
var three_1 = require("three");
var EffectComposer_1 = require("three/examples/jsm/postprocessing/EffectComposer");
var RenderPass_1 = require("three/examples/jsm/postprocessing/RenderPass");
var ShaderPass_1 = require("three/examples/jsm/postprocessing/ShaderPass");
var UnrealBloomPass_1 = require("three/examples/jsm/postprocessing/UnrealBloomPass");
react_three_fiber_1.extend({ EffectComposer: EffectComposer_1.EffectComposer, RenderPass: RenderPass_1.RenderPass, ShaderPass: ShaderPass_1.ShaderPass, UnrealBloomPass: UnrealBloomPass_1.UnrealBloomPass });
var shaders_1 = require("./shaders");
var DEFAULT_LAYER = 0;
var OCCLUSION_LAYER = 1;
var onBeforeCompile = function (shader) {
    //shader.uniforms.time = { value: 0 }
    var baseVertex = 
    // `uniform float time;\n varying vec3 vPos;\n` + noise + 
    shader.vertexShader;
    // shader.vertexShader = baseVertex.replace(
    //   `#include <begin_vertex>`,
    //   `#include <begin_vertex>\n
    //            vec2 tuv = uv;\n
    //            float t = time * 0.01 * ${speed}.;\n
    //            tuv.y += t;\n
    //            transformed.y = snoise(vec3(tuv * 5., 0.)) * 5.;\n
    //            transformed.y *= smoothstep(5., 15., abs(transformed.x)); // road stripe\n
    //            vPos = transformed;\n
    //           `
    // )
    var baseFragment = 
    // `uniform float time;\nvarying vec3 vPos;\nfloat line(vec3 position, float width, vec3 step){\nvec3 tempCoord = position / step;\nvec2 coord = tempCoord.xz; \ncoord.y -= time * ${speed}. / 2.; \nvec2 grid = abs(fract(coord - 0.5) - 0.5) / fwidth(coord * width); \nfloat line = min(grid.x, grid.y); \nreturn min(line, 1.0); \n}\n` +
    shader.fragmentShader;
    console.log(baseFragment);
    // shader.fragmentShader = baseFragment.replace(
    //   `gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,
    //   `gl_FragColor = vec4( vec3(0.,1.,0.), diffuseColor.a );`
    //   // `float l = line(vPos, 2.0, vec3(2.0)); \n
    //   //          vec3 base = mix(vec3(0, 0.75, 1), vec3(0), smoothstep(5., 7.5, abs(vPos.x))); \n
    //   //          vec3 c = mix(outgoingLight, base, l); \n
    //   //          gl_FragColor = vec4(outgoingLight, diffuseColor.a); \n
    //   //        `
    // )
    // shader.fragmentShader = baseFragment.replace(
    //   `gl_FragColor = vec4( blendOverlay( base.rgb, color ), 1.0 );`,
    //   `gl_FragColor = vec4( vec3(1.,0.,0.), 1.0 );`
    // )
};
function MirrorScene(_a) {
    var video = _a.video, width = _a.width, height = _a.height;
    var _b = useAspect_1.useAspect("cover", width, height), x = _b[0], y = _b[1];
    var canvas = document.getElementById('screen-canvas');
    var ratioW = width / canvas.offsetWidth;
    var ratioH = height / canvas.offsetHeight;
    var reflectorRef = react_1.useRef();
    var groundRef = react_1.useRef();
    var sceneRef = react_1.useRef();
    var screenSceneRef = react_1.useRef();
    var _c = react_three_fiber_1.useThree(), scene = _c.scene, gl = _c.gl, size = _c.size, camera = _c.camera;
    var occlusionRenderTarget = react_1.useMemo(function () { return new THREE.WebGLRenderTarget(); }, []);
    var occlusionComposer = react_1.useRef();
    var composer = react_1.useRef();
    var aspect = react_1.useMemo(function () { return new THREE.Vector2(512, 512); }, []);
    var envTexture = new THREE.CubeTextureLoader().load(cubeUrls);
    scene.background = envTexture;
    scene.environment = envTexture;
    var repeatX = 512;
    var repeatY = 512;
    var floorAO = react_three_fiber_1.useLoader(three_1.TextureLoader, MetalRustRepolished001_GLOSS_VAR2_1K_SPECULAR_jpg_1["default"]);
    var floorTex = react_three_fiber_1.useLoader(three_1.TextureLoader, MetalRustRepolished001_COL_1K_SPECULAR_jpg_1["default"]);
    var floorNormal = react_three_fiber_1.useLoader(three_1.TextureLoader, MetalRustRepolished001_NRM_1K_SPECULAR_jpg_1["default"]);
    var floorDisplace = react_three_fiber_1.useLoader(three_1.TextureLoader, MetalRustRepolished001_DISP_1K_SPECULAR_jpg_1["default"]);
    floorTex.anisotropy = repeatY;
    floorTex.wrapS = floorTex.wrapT = THREE.RepeatWrapping;
    floorTex.repeat.set(repeatX, repeatY);
    floorNormal.anisotropy = repeatY;
    floorNormal.wrapS = floorNormal.wrapT = THREE.RepeatWrapping;
    floorNormal.repeat.set(repeatX, repeatY);
    floorAO.anisotropy = repeatY;
    floorAO.wrapS = floorNormal.wrapT = THREE.RepeatWrapping;
    floorAO.repeat.set(repeatX, repeatY);
    floorDisplace.anisotropy = 128;
    floorDisplace.wrapS = floorDisplace.wrapT = THREE.RepeatWrapping;
    floorDisplace.repeat.set(repeatX, repeatY);
    var realisticTex = react_three_fiber_1.useLoader(three_1.TextureLoader, tex_jpg_1["default"]);
    realisticTex.wrapS = realisticTex.wrapT = THREE.RepeatWrapping;
    realisticTex.repeat.set(512, 512);
    //const oBC = useCallback(onBeforeCompile, [reflectorRef.current,secondRef.current])
    react_1.useEffect(function () {
        // occlusionComposer.current.setSize(size.width, size.height)
        composer.current.setSize(size.width, size.height);
    }, [size]);
    react_1.useEffect(function () {
        if (reflectorRef.current) {
            console.log(reflectorRef.current);
            console.log(groundRef.current);
            console.log(sceneRef.current);
            //console.log(scene)
        }
    }, [reflectorRef]);
    // useFrame(({ gl }) => void ((gl.autoClear = false), gl.clearDepth(), gl.render(sceneRef.current, camera)), 10)
    var blurRef = react_1.useRef();
    var iterations = 8;
    var direction;
    react_three_fiber_1.useFrame(function () {
        camera.layers.set(OCCLUSION_LAYER);
        occlusionComposer.current.render();
        camera.layers.set(DEFAULT_LAYER);
        composer.current.render();
        //var anim = 20;
        // for (var i = 0; i < iterations; i++) {
        //   direction = i % 2 === 0 ? [radius, 0] : [0, radius];
        //   var radius = (iterations - i - 1) * anim;
        //   // // console.log(direction);
        //   // console.log(blurRef.current)
        //   blurRef.current.uniforms.direction.value = direction;
        //   blurRef.current.uniforms.resolution.value = [size.width,size.height];
        //   console.log(blurRef.current)
        // }
        //blurRef.current.uniforms.resolution.value = [size.width,size.height];
        // secondRef.current.material.uniforms.tMaterial.value = groundRef.current.material.map; 
    }, 16);
    console.log(WIDTH * window.devicePixelRatio);
    return (react_1["default"].createElement("scene", { ref: sceneRef },
        react_1["default"].createElement(ReflectorInstance_1.ReflectorInstance, { ref: reflectorRef, clipBias: 0.003, textureWidth: WIDTH * window.devicePixelRatio / 2, textureHeight: HEIGHT * window.devicePixelRatio / 2, color: 0x777777, position: [0, -y * Math.min(ratioW, ratioH) / 2, 0], rotation: [-Math.PI / 2, 0, 0] },
            react_1["default"].createElement("planeBufferGeometry", { args: [50000, 50000, 32], attach: "geometry" })),
        react_1["default"].createElement("mesh", { layers: DEFAULT_LAYER, ref: groundRef, position: [0, -y * Math.min(ratioW, ratioH) / 2 + 1, 0], rotation: [-Math.PI / 2, 0, 0], receiveShadow: true },
            react_1["default"].createElement("planeBufferGeometry", { args: [50000, 50000, 32], attach: "geometry" }),
            react_1["default"].createElement("meshStandardMaterial", { attach: "material", color: 0xffffff, map: realisticTex, bumpMap: realisticTex, roughnessMap: realisticTex, normalMap: floorNormal, bumpScale: 0.11, metalness: 0.75, roughness: 0.15, reflectivity: 0.9, transparent: true, opacity: 0.7 })),
        react_1["default"].createElement("mesh", { layers: OCCLUSION_LAYER, rotation: [0, 0, 0], scale: [x * Math.min(ratioW, ratioH),
                y * Math.min(ratioW, ratioH), 1], position: [0, 0, 0], castShadow: true, receiveShadow: true },
            react_1["default"].createElement(drei_1.Plane, { args: [1, 1, 1], rotation: [0, 0, 0], position: [0, 0, 0] },
                react_1["default"].createElement("meshBasicMaterial", { side: three_1.DoubleSide },
                    react_1["default"].createElement("videoTexture", { attach: "map", args: [video] })))),
        react_1["default"].createElement("effectComposer", { ref: occlusionComposer, args: [gl, occlusionRenderTarget], renderToScreen: true },
            react_1["default"].createElement("renderPass", { attachArray: "passes", args: [scene, camera] })),
        react_1["default"].createElement("effectComposer", { ref: composer, args: [gl] },
            react_1["default"].createElement("renderPass", { attachArray: "passes", args: [scene, camera], renderToScreen: false }),
            react_1["default"].createElement("shaderPass", { ref: blurRef, attachArray: "passes", args: [shaders_1.Kawase1Shader], "uniforms-resolution-value": [size.width, size.height], renderToScreen: true }))));
}
;
function ScreenScene(_a) {
    var video = _a.video, width = _a.width, height = _a.height;
    var _b = useAspect_1.useAspect("cover", width, height), x = _b[0], y = _b[1];
    var canvas = document.getElementById('screen-canvas');
    var ratioW = width / canvas.offsetWidth;
    var ratioH = height / canvas.offsetHeight;
    var _c = react_three_fiber_1.useThree(), gl = _c.gl, scene = _c.scene, camera = _c.camera, size = _c.size;
    var screenSceneRef = react_1.useRef();
    var envTexture = new THREE.CubeTextureLoader().load(cubeUrls);
    scene.background = envTexture;
    scene.environment = envTexture;
    react_1.useEffect(function () {
        if (screenSceneRef.current) {
            console.log(screenSceneRef.current);
        }
    }, [screenSceneRef]);
    // useFrame(({ gl }) => void ((gl.autoClear = true), gl.render(screenSceneRef.current, camera)), 5000)
    return (react_1["default"].createElement("scene", { ref: screenSceneRef, background: envTexture },
        react_1["default"].createElement("mesh", { rotation: [0, 0, 0], scale: [x * Math.min(ratioW, ratioH), y * Math.min(ratioW, ratioH), 1], position: [0, 0, 0], castShadow: true, receiveShadow: true },
            react_1["default"].createElement(drei_1.Plane, { args: [1, 1, 1], rotation: [0, 0, 0], position: [0, 0, 0] },
                react_1["default"].createElement("meshBasicMaterial", { side: three_1.DoubleSide },
                    react_1["default"].createElement("videoTexture", { attach: "map", args: [video] }))))));
}
function Content(_a) {
    var video = _a.video, canvasVideoWidth = _a.canvasVideoWidth, canvasVideoHeight = _a.canvasVideoHeight;
    var camera = react_1.useRef();
    var _b = react_three_fiber_1.useThree(), size = _b.size, setDefaultCamera = _b.setDefaultCamera;
    react_1.useEffect(function () { return void setDefaultCamera(camera.current); }, [camera]);
    react_three_fiber_1.useFrame(function () { return camera.current.updateMatrixWorld(); });
    var envTexture = new THREE.CubeTextureLoader().load(cubeUrls);
    return (react_1["default"].createElement(react_1["default"].Fragment, null,
        react_1["default"].createElement("ambientLight", { intensity: 0.2 }),
        react_1["default"].createElement("spotLight", { castShadow: true, intensity: 0.25, color: 'rgb(145, 200, 255)', position: [6 * 45, 8 * 45, -20 * 20], "shadow-mapSize-width": 4096, "shadow-mapSize-height": 4096 }),
        react_1["default"].createElement("spotLight", { castShadow: true, intensity: 0.25, color: 'rgb(255, 220, 180)', position: [-12 * 45, 6 * 45, -10 * 20], "shadow-mapSize-width": 4096, "shadow-mapSize-height": 4096 }),
        react_1["default"].createElement("perspectiveCamera", { ref: camera, aspect: size.width / size.height, radius: (size.width + size.height) / 4, fov: 45, near: 1, far: 23000, position: [0, 0, 100], onUpdate: function (self) { return self.updateProjectionMatrix(); } }),
        camera.current && (react_1["default"].createElement(react_1.Suspense, { fallback: null },
            react_1["default"].createElement(MirrorScene, { video: video, width: canvasVideoWidth, height: canvasVideoHeight }),
            react_1["default"].createElement(drei_1.OrbitControls, null)))));
}
var PureScreen = function (_a) {
    var video = _a.video, canvasVideoWidth = _a.canvasVideoWidth, canvasVideoHeight = _a.canvasVideoHeight, pixelRatio = _a.pixelRatio;
    return (react_1["default"].createElement(react_three_fiber_1.Canvas, { id: "screen-canvas", pixelRatio: pixelRatio, shadowMap: true, colorManagement: false, gl: { antialias: true } },
        react_1["default"].createElement(Content, { video: video, canvasVideoWidth: canvasVideoWidth, canvasVideoHeight: canvasVideoHeight })));
};
exports["default"] = PureScreen;
