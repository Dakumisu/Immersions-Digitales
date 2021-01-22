import * as THREE from "three";

import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
// import { GLTFPipeline } from 'gltf-pipeline'
// import { THREEGLTFLoader, THREEDRACOLoader } from 'three-loaders'
import * as POSTPROCESSING from "postprocessing";
import { Interaction } from 'three.interaction';
import TouchSweep from 'touchsweep';

// import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"

import vertexShader from "./libs/glsl/vertex.glsl";
import fragmentShader from "./libs/glsl/fragment.glsl";
import fragmentShaderVertical from "./libs/glsl/fragmentVertical.glsl";

import displacement from "../assets/img/displaces/displace.jpg";
import displacement1 from "../assets/img/displaces/displace.png";
import displacement2 from "../assets/img/displaces/displace2.png"; // Pour le panneau
import displacement3 from "../assets/img/displaces/displace3.png";
import displacement4 from "../assets/img/displaces/displace4.png"; // Pour les planes
import displacement5 from "../assets/img/displaces/displace5.jpg";
import displacement6 from "../assets/img/displaces/displace6.jpg";
import displacement7 from "../assets/img/displaces/displace7.jpg";
import displacement8 from "../assets/img/displaces/displace8.jpg";
import displacement9 from "../assets/img/displaces/displace9.png";

import atelier1Default from "../assets/img/ateliers/atelier1Default.png"; // Backstage
import atelier2Default from "../assets/img/ateliers/atelier2Default.png"; // FTM
import atelier3Default from "../assets/img/ateliers/atelier3Default.png"; // VR
import atelier4Default from "../assets/img/ateliers/atelier4Default.png"; // init dev web
import atelier5Default from "../assets/img/ateliers/atelier5Default.png"; // cube musicale
import atelier6Default from "../assets/img/ateliers/atelier6Default.png"; // ia art gen
import atelier7Default from "../assets/img/ateliers/atelier7Default.png"; // musée mmi
import atelier8Default from "../assets/img/ateliers/atelier8Default.png"; // suite adobe
import atelier9Default from "../assets/img/ateliers/atelier9Default.png"; // fmv
import atelier10Default from "../assets/img/ateliers/atelier10Default.png"; // webradio
import atelier11Default from "../assets/img/ateliers/atelier11Default.png"; // ptv
import atelier12Default from "../assets/img/ateliers/atelier12Default.png"; // fond vert
import atelier13Default from "../assets/img/ateliers/atelier13Default.png"; // mapping
import atelier14Default from "../assets/img/ateliers/atelier14Default.png"; // audiovisuel

import atelier1Hover from "../assets/img/ateliers/atelier1Hover.png"; // Backstage
import atelier2Hover from "../assets/img/ateliers/atelier2Hover.png"; // FTM
import atelier3Hover from "../assets/img/ateliers/atelier3Hover.png"; // VR
import atelier4Hover from "../assets/img/ateliers/atelier4Hover.png"; // init dev web
import atelier5Hover from "../assets/img/ateliers/atelier5Hover.png"; // cube musicale
import atelier6Hover from "../assets/img/ateliers/atelier6Hover.png"; // ia art gen
import atelier7Hover from "../assets/img/ateliers/atelier7Hover.png"; // musée mmi
import atelier8Hover from "../assets/img/ateliers/atelier8Hover.png"; // suite adobe
import atelier9Hover from "../assets/img/ateliers/atelier9Hover.png"; // fmv
import atelier10Hover from "../assets/img/ateliers/atelier10Hover.png"; // webradio
import atelier11Hover from "../assets/img/ateliers/atelier11Hover.png"; // ptv
import atelier12Hover from "../assets/img/ateliers/atelier12Hover.png"; // fond vert
import atelier13Hover from "../assets/img/ateliers/atelier13Hover.png"; // mapping
import atelier14Hover from "../assets/img/ateliers/atelier14Hover.png"; // audiovisuel

import particle from "../assets/img/particle.png";

import socleModel from "../assets/model/socle.gltf";
import logoModel from "../assets/model/logo.glb";
import homeModel from "../assets/model/home.gltf";
import streetModel from "../assets/model/street.gltf";
import rightDoorModel from "../assets/model/rightDoor.gltf";
import rightDoor2Model from "../assets/model/rightDoor2.gltf";
import leftDoorModel from "../assets/model/leftDoor.gltf";
import leftDoor2Model from "../assets/model/leftDoor2.gltf";

import pyloneModel from "../assets/model/navigation/pylone.gltf";
import gridModel from "../assets/model/navigation/grid.gltf";
import tableModel from "../assets/model/navigation/table.gltf";
import poutreModel from "../assets/model/navigation/poutre.gltf";
import leftWallModel from "../assets/model/navigation/leftWall.gltf";
import rightWallModel from "../assets/model/navigation/rightWall.gltf";
import fieldModel from "../assets/model/navigation/field.gltf";
import signModel from "../assets/model/navigation/sign.gltf";

import vr2Model from "../assets/model/navigation/vr2.gltf";
import tabProgModel from "../assets/model/navigation/tabProg.gltf";
import tvModel from "../assets/model/navigation/tv.gltf";
import camModel from "../assets/model/navigation/cam.gltf";
import enceinteModel from "../assets/model/navigation/enceinte.gltf";

////////// SCENE //////////
var scene = new THREE.Scene();

////////// CAMERA //////////
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

/////// CLOCK ///////
var clock = new THREE.Clock();

if (window.matchMedia("(max-width: 600px)").matches) {
    camera.position.set(0, 0, 11.3);
} else {
    camera.position.set(0, 0, 10);
}

/////// MAIN RENDERER ///////
var renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
document.body.appendChild(renderer.domElement);

// const controls = new OrbitControls(camera, renderer.domElement)
// controls.enableDamping = true
// controls.dampingFactor = 0.25
// controls.enableZoom = false 

/////// RESIZE EVENT ///////
window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
})


/////// MESH INTERACTION ///////
const interaction = new Interaction(renderer, scene, camera);

/////// POSTPROCESSING ///////
let composer = new POSTPROCESSING.EffectComposer(renderer);

composer.addPass(new POSTPROCESSING.RenderPass(scene, camera));

const effectPass = new POSTPROCESSING.EffectPass(
    camera,
    new POSTPROCESSING.RealisticBokehEffect()
);
effectPass.renderToScreen = true;

composer.addPass(effectPass);

//POUR LES SHADERS
let customPass = new POSTPROCESSING.ShaderPass({ vertexShader, fragmentShader });
customPass.renderToScreen = true;
composer.addPass(customPass);

let rotateZ = -.2; // PLANES ROTATION

/////// LIGHTS ///////
var targetLogo = new THREE.Object3D();
targetLogo.position.set(0, 0, 0)
scene.add(targetLogo);

let light1 = new THREE.PointLight(0x4cc9f0, .3);
light1.position.set(-2000, 1000, -2000);
scene.add(light1);
let light2 = new THREE.PointLight(0x4cc9f0, .3);
light2.position.set(2000, 0, 0);
scene.add(light2);
let light3 = new THREE.PointLight(0x4cc9f0, .3);
light3.position.set(-2000, 0, 0);
scene.add(light3);
let light4 = new THREE.PointLight(0x4cc9f0, .3);
light4.position.set(2000, 1000, -2000);
scene.add(light4);

let light5 = new THREE.PointLight(0xf72585, .2);
light5.position.set(0, 2000, 2000);
scene.add(light5);

let lightCenter = new THREE.PointLight(0x000000, 30, 2.6);
lightCenter.position.set(0, 1.5, 0)
scene.add(lightCenter);

let lightCenter2 = new THREE.DirectionalLight(0x4cc9f0, 3);
lightCenter2.position.set(0, -.1, 0)
scene.add(lightCenter2);

let lightCenterSocle = new THREE.PointLight(0x000000, 150, .6);
lightCenterSocle.position.set(0, -1.5, 0)
scene.add(lightCenterSocle);

const cyanColor = new THREE.Color(0x4cc9f0);
const cyanColorReset = new THREE.Color(0x000000);

let ambientLight = new THREE.AmbientLight(0x09021e, 7.5);
ambientLight.position.set(0, 0, 0)
scene.add(ambientLight);

/////// 3D MODEL ///////

//HOME MODEL
var home;

if (!window.matchMedia("(max-width: 1024px)").matches) {
    var loaderHome = new GLTFLoader();
    loaderHome.crossOrigin = true
    
    loaderHome.load(homeModel, function(addHome) {
        home = addHome.scene;
        scene.add(home);
        home.position.set(-1.45, -10, 0)
        home.scale.set(100, 100, 100);
        home.rotation.y = -.35;
    });
}

// SOCLE MODEL
var socle;

var loaderSocle = new GLTFLoader;
loaderSocle.crossOrigin = true

loaderSocle.load(socleModel, function(addSocle) {
    socle = addSocle.scene;
    scene.add(socle);
    socle.position.set(0, -10.7, 0)
    socle.scale.set(.7, .7, .7)
    socle.rotation.y = 0;
});

// import test from "../assets/model/DracoModels/socleCompress.gltf";

// var loaderSocle = new THREEGLTFLoader();
// // loaderSocle.setDRACOLoader(new THREEDRACOLoader("node_module/three/examples/js/libs/draco/gltf/"));
// loaderSocle.setDRACOLoader(new THREEDRACOLoader("https://unpkg.com/browse/three@0.124.0/examples/js/libs/draco/"));

// loaderSocle.load(test, gltf => {
//         socle = gltf.scene;
//         scene.add(socle);
//         socle.position.set(0, -10.7, 0)
//         socle.scale.set(.7, .7, .7)
//         socle.rotation.y = 0;
//         console.log(true)
//     },
//     function (xhr) {
//         console.log((xhr.loaded / xhr.total * 100) + '% loaded');
//     }
// );

// Specify path to a folder containing WASM/JS decoding libraries.
// loaderSocle.setDecoderPath( '../node_modules/three/examples/js/libs/draco/gltf/' );

// Load a Draco geometry
// loaderSocle.load(test, function( geometry ) {
//     const material = new THREE.MeshStandardMaterial({
//         color: 0x606060
//     });
//     const mesh = new THREE.Mesh(geometry, material);
//     console.log(mesh)
//     },
//     function (xhr) {
//         console.log((xhr.loaded / xhr.total * 100) + '% loaded');
//         console.log(xhr)
//         // console.log(xhr.srcElement.responseURL)
//         // var test = xhr.srcElement.responseURL
//         // var socle = addSocle.scene;
//         // scene.add(socle);
//         // console.log(scene);

//     },
//     function (error) {
//         console.log('An error happened');
//     }
// );


// LOGO MODEL
var logo;

var loaderLogo = new GLTFLoader;
loaderLogo.crossOrigin = true;
loaderLogo.transparent = true;
loaderLogo.opacity = 0.1;

loaderLogo.load(logoModel, function(addLogo) {
    logo = addLogo.scene;
    scene.add(logo);
    logo.position.set(0, -9.8, 0)
    logo.rotation.z = -.725;
    logo.scale.set(0.0001, 0.0001, 0.0001)
});

// FIELD MODEL
var field;

if (!window.matchMedia("(max-width: 1024px)").matches) {
    var loaderField = new GLTFLoader;
    loaderField.crossOrigin = true;
    
    loaderField.load(fieldModel, function(addField) {
        field = addField.scene;
        scene.add(field);
        field.position.set(-1.2, -53, -48)
        field.rotation.y = -.5 * Math.PI
        field.scale.set(0.0001, 0.0001, 0.0001)
    })
}

// LEFT WALL MODEL
var leftWall;

if (!window.matchMedia("(max-width: 1024px)").matches) {
    var loaderleftWall = new GLTFLoader;
    loaderleftWall.crossOrigin = true;
    
    loaderleftWall.load(leftWallModel, function(addleftWall) {
        leftWall = addleftWall.scene;
        scene.add(leftWall);
        leftWall.position.set(-51.2, -4.8, -48)
        leftWall.rotation.y = -.5 * Math.PI
        leftWall.scale.set(0.0001, 0.0001, 0.0001)
    })
}

// RIGHT WALL MODEL
var rightWall;

if (!window.matchMedia("(max-width: 1024px)").matches) {
    var loaderRightWall = new GLTFLoader;
    loaderRightWall.crossOrigin = true;
    
    loaderRightWall.load(rightWallModel, function(addRightWall) {
        rightWall = addRightWall.scene;
        scene.add(rightWall);
        rightWall.position.set(58.8, -4.8, -48)
        rightWall.rotation.y = -.5 * Math.PI
        rightWall.scale.set(0.0001, 0.0001, 0.0001)
    })
}

// TABLE MODEL
var table;

if (!window.matchMedia("(max-width: 1024px)").matches) {
    var loaderTable = new GLTFLoader;
    loaderTable.crossOrigin = true;
    
    loaderTable.load(tableModel, function(addTable) {
        table = addTable.scene;
        scene.add(table);
        table.position.set(-8.3, -4.9, -8.5)
        table.rotation.y = -.5 * Math.PI
        table.scale.set(0.0001, 0.0001, 0.0001)
    })
}

// PYLONE MODEL
var pylone;

var loaderPylone = new GLTFLoader;
loaderPylone.crossOrigin = true;

if (!window.matchMedia("(max-width: 1024px)").matches) {
    loaderPylone.load(pyloneModel, function(addPylone) {
        pylone = addPylone.scene;
        scene.add(pylone);
        pylone.position.set(-9.2, -1.5, -5)
        pylone.rotation.y = -.5 * Math.PI
        pylone.scale.set(0.0001, 0.0001, 0.0001)
    })
}

// PYLONE2 MODEL
var pylone2;

if (!window.matchMedia("(max-width: 1024px)").matches) {
    var loaderPylone2 = new GLTFLoader;
    loaderPylone2.crossOrigin = true;
    
    loaderPylone2.load(pyloneModel, function(addPylone2) {
        pylone2 = addPylone2.scene;
        scene.add(pylone2);
        pylone2.position.set(-9.2, -1.5, -6.5)
        pylone2.rotation.y = -.5 * Math.PI
        pylone2.scale.set(0.0001, 0.0001, 0.0001)
    })
}

// PYLONE3 MODEL
var pylone3;

if (!window.matchMedia("(max-width: 1024px)").matches) {
    var loaderPylone3 = new GLTFLoader;
    loaderPylone3.crossOrigin = true;
    
    loaderPylone3.load(pyloneModel, function(addPylone3) {
        pylone3 = addPylone3.scene;
        scene.add(pylone3);
        pylone3.position.set(-9.2, -1.5, -8)
        pylone3.rotation.y = -.5 * Math.PI
        pylone3.scale.set(0.0001, 0.0001, 0.0001)
    })
}

// PYLONE4 MODEL
var pylone4;

if (!window.matchMedia("(max-width: 1024px)").matches) {
    var loaderPylone4 = new GLTFLoader;
    loaderPylone4.crossOrigin = true;
    
    loaderPylone.load(pyloneModel, function(addPylone4) {
        pylone4 = addPylone4.scene;
        scene.add(pylone4);
        pylone4.position.set(-9.2, -1.5, -9.5)
        pylone4.rotation.y = -.5 * Math.PI
        pylone4.scale.set(0.0001, 0.0001, 0.0001)
    })
}

// PYLONE 5 MODEL
var pylone5;

if (!window.matchMedia("(max-width: 1024px)").matches) {
    var loaderPylone5 = new GLTFLoader;
    loaderPylone5.crossOrigin = true;
    
    loaderPylone.load(pyloneModel, function(addPylone5) {
        pylone5 = addPylone5.scene;
        scene.add(pylone5);
        pylone5.position.set(-9.2, -1.5, -11)
        pylone5.rotation.y = -.5 * Math.PI
        pylone5.scale.set(0.0001, 0.0001, 0.0001)
    })
}

// GRID MODEL
var grid;

if (!window.matchMedia("(max-width: 1024px)").matches) {
    var loaderGrid = new GLTFLoader;
    loaderGrid.crossOrigin = true;
    
    loaderGrid.load(gridModel, function(addGrid) {
        grid = addGrid.scene;
        scene.add(grid);
        grid.position.set(-8, -3.8, -7.5)
        grid.rotation.y = -.5 * Math.PI
        grid.scale.set(0.0001, 0.0001, 0.0001)
    })
}

// GRID 2 MODEL
var grid2;

if (!window.matchMedia("(max-width: 1024px)").matches) {
    var loaderGrid2 = new GLTFLoader;
    loaderGrid2.crossOrigin = true;
    
    loaderGrid2.load(gridModel, function(addGrid2) {
        grid2 = addGrid2.scene;
        scene.add(grid2);
        grid2.position.set(-8, -3.2, -7.5)
        grid2.rotation.y = -.5 * Math.PI
        grid2.scale.set(0.0001, 0.0001, 0.0001)
    })
}

// GRID 3 MODEL
var grid3;

if (!window.matchMedia("(max-width: 1024px)").matches) {
    var loaderGrid3 = new GLTFLoader;
    loaderGrid3.crossOrigin = true;
    
    loaderGrid3.load(gridModel, function(addGrid3) {
        grid3 = addGrid3.scene;
        scene.add(grid3);
        grid3.position.set(-8, -2.6, -7.5)
        grid3.rotation.y = -.5 * Math.PI
        grid3.scale.set(0.0001, 0.0001, 0.0001)
    })
}

// GRID 4 MODEL
var grid4;

if (!window.matchMedia("(max-width: 1024px)").matches) {
    var loaderGrid4 = new GLTFLoader;
    loaderGrid4.crossOrigin = true;
    
    loaderGrid4.load(gridModel, function(addGrid4) {
        grid4 = addGrid4.scene;
        scene.add(grid4);
        grid4.position.set(-8, -2, -7.5)
        grid4.rotation.y = -.5 * Math.PI
        grid4.scale.set(0.0001, 0.0001, 0.0001)
    })
}

// GRID 5 MODEL
var grid5;

if (!window.matchMedia("(max-width: 1024px)").matches) {
    var loaderGrid5 = new GLTFLoader;
    loaderGrid5.crossOrigin = true;
    
    loaderGrid5.load(gridModel, function(addGrid5) {
        grid5 = addGrid5.scene;
        scene.add(grid5);
        grid5.position.set(-8, -1.4, -7.5)
        grid5.rotation.y = -.5 * Math.PI
        grid5.scale.set(0.0001, 0.0001, 0.0001)
    })
}

// POUTRE MODEL
var poutre;

if (!window.matchMedia("(max-width: 1024px)").matches) {
    var loaderPoutre = new GLTFLoader;
    loaderPoutre.crossOrigin = true;
    
    loaderPoutre.load(poutreModel, function(addPoutre) {
        poutre = addPoutre.scene;
        scene.add(poutre);
        poutre.position.set(-9, 4, -9)
        poutre.rotation.y = -.5 * Math.PI
        poutre.scale.set(0.0001, 0.0001, 0.0001)
    })
}

// SIGN MODEL
var sign;

if (!window.matchMedia("(max-width: 1024px)").matches) {
    var loaderSign = new GLTFLoader;
    loaderSign.crossOrigin = true;
    
    loaderSign.load(signModel, function(addSign) {
        sign = addSign.scene;
        scene.add(sign);
        sign.position.set(7.8, -3.05, -4)
        sign.rotation.y = -.5 * Math.PI
        sign.scale.set(0.0001, 0.0001, 0.0001)
    });
}

// TAB PROG
var tabProg;

if (!window.matchMedia("(max-width: 1024px)").matches) {
    var loaderTabProg = new GLTFLoader();
    loaderTabProg.crossOrigin = true
    
    loaderTabProg.load(tabProgModel, function(addTabProg) {
        tabProg = addTabProg.scene;
        scene.add(tabProg);
        tabProg.position.set(9.2, .5, -11.8)
        tabProg.scale.set(0.0001,0.0001, 0.0001);
        tabProg.rotation.y = -Math.PI;
    });
}

// TV
var tv;

if (!window.matchMedia("(max-width: 1024px)").matches) {
    var loaderTv = new GLTFLoader();
    loaderTv.crossOrigin = true
    
    loaderTv.load(tvModel, function(addTv) {
        tv = addTv.scene;
        scene.add(tv);
        tv.position.set(8.9, 2.2, -6)
        tv.scale.set(0.0001,0.0001, 0.0001);
        tv.rotation.y = -.79*Math.PI;
    });
}

// TV2
var tv2;

if (!window.matchMedia("(max-width: 1024px)").matches) {
    var loaderTv2 = new GLTFLoader();
    loaderTv2.crossOrigin = true
    
    loaderTv2.load(tvModel, function(addTv2) {
        tv2 = addTv2.scene;
        scene.add(tv2);
        tv2.position.set(9, 4.6, -13)
        tv2.scale.set(0.0001,0.0001, 0.0001);
        tv2.rotation.y = -.73*Math.PI;
    });
}
// CAM
var cam;

if (!window.matchMedia("(max-width: 1024px)").matches) {
    var loaderCam = new GLTFLoader();
    loaderCam.crossOrigin = true
    
    loaderCam.load(camModel, function(addCam) {
        cam = addCam.scene;
        scene.add(cam);
        cam.position.set(-8.8, 5.2, -12.5)
        cam.scale.set(0.0001, 0.0001, 0.0001);
        cam.rotation.y = -.45*Math.PI
    });
}

//VR 2
var vr2;

if (!window.matchMedia("(max-width: 1024px)").matches) {
    var loaderVr2 = new GLTFLoader();
    loaderVr2.crossOrigin = true
    
    loaderVr2.load(vr2Model, function(addVr2) {
        vr2 = addVr2.scene;
        scene.add(vr2);
        vr2.position.set(-8.9, 5.2, -8.8)
        vr2.scale.set(0.0001, 0.0001, 0.0001);
    });
}

//ENCEINTE
var enceinte;

if (!window.matchMedia("(max-width: 1024px)").matches) {
    var loaderEnceinte = new GLTFLoader();
    loaderEnceinte.crossOrigin = true
    
    loaderEnceinte.load(enceinteModel, function(addEnceinte) {
        enceinte = addEnceinte.scene;
        scene.add(enceinte);
        enceinte.position.set(-9.2, 5.2,-5)
        enceinte.scale.set(0.0001, 0.0001, 0.0001);
        enceinte.rotation.y = .3*Math.PI;
    });
}

// RIGHT DOOR MODEL
var rightDoor;

if (!window.matchMedia("(max-width: 1024px)").matches) {
    var loaderRightDoor = new GLTFLoader;
    loaderRightDoor.crossOrigin = true;
    
    loaderRightDoor.load(rightDoorModel, function(addRightDoor) {
        rightDoor = addRightDoor.scene;
        scene.add(rightDoor);
        rightDoor.position.set(.35, -55.8, -48)
        rightDoor.rotation.y = -.5 * Math.PI
        rightDoor.scale.set(0.0001, 0.0001, 0.0001)
    });
}

// LEFT DOOR MODEL
var leftDoor;

if (!window.matchMedia("(max-width: 1024px)").matches) {
    var loaderLeftDoor = new GLTFLoader;
    loaderLeftDoor.crossOrigin = true;
    
    loaderLeftDoor.load(leftDoorModel, function(addLeftDoor) {
        leftDoor = addLeftDoor.scene;
        scene.add(leftDoor);
        leftDoor.position.set(.35, -55.8, -48)
        leftDoor.rotation.y = -.5 * Math.PI
        leftDoor.scale.set(0.0001, 0.0001, 0.0001)
    });
}

// RIGHT DOOR 2 MODEL
var rightDoor2;

if (!window.matchMedia("(max-width: 1024px)").matches) {
    var loaderRight2Door = new GLTFLoader;
    loaderRight2Door.crossOrigin = true;
    
    loaderRight2Door.load(rightDoor2Model, function(addRightDoor2) {
        rightDoor2 = addRightDoor2.scene;
        scene.add(rightDoor2);
        rightDoor2.position.set(.35, -5.8, -197)
        rightDoor2.rotation.y = -.5 * Math.PI
        rightDoor2.scale.set(0.0001, 0.0001, 0.0001)
    });
}

// LEFT DOOR 2 MODEL
var leftDoor2;

if (!window.matchMedia("(max-width: 1024px)").matches) {
    var loaderLeftDoor2 = new GLTFLoader;
    loaderLeftDoor2.crossOrigin = true;
    
    loaderLeftDoor2.load(leftDoor2Model, function(addLeftDoor2) {
        leftDoor2 = addLeftDoor2.scene;
        scene.add(leftDoor2);
        leftDoor2.position.set(.35, -5.8, -197)
        leftDoor2.rotation.y = -.5 * Math.PI
        leftDoor2.scale.set(0.0001, 0.0001, 0.0001)
    });
}

// STREET MODEL
var street;

if (!window.matchMedia("(max-width: 1024px)").matches) {
    var loaderStreet = new GLTFLoader;
    loaderStreet.crossOrigin = true;
    
    loaderStreet.load(streetModel, function(addStreet) {
        street = addStreet.scene;
        scene.add(street);
        street.position.set(.5, -5.83, -48.75)
        street.rotation.y = -.5 * Math.PI
        street.scale.set(0.0001, 0.0001, 0.0001)
    });
}

/////// PLANES ///////
var plane = new THREE.PlaneGeometry(1.6 / 1.2, 0.9 / 1.2, 30, 30); //WorkShops
// var planeTrombi = new THREE.PlaneGeometry(1.6/1.2, 0.9/1.2, 30, 30); //Trombi ateliers

var planePanneau = new THREE.PlaneGeometry(1.2, 1.2, 1, 1);

/////// INITIATION DES TEXTURES ///////
let texture1Default = new THREE.TextureLoader().load(atelier1Default)
let texture1Hover = new THREE.TextureLoader().load(atelier1Hover)

let texture2Default = new THREE.TextureLoader().load(atelier2Default)
let texture2Hover = new THREE.TextureLoader().load(atelier2Hover)

let texture3Default = new THREE.TextureLoader().load(atelier3Default)
let texture3Hover = new THREE.TextureLoader().load(atelier3Hover)

let texture4Default = new THREE.TextureLoader().load(atelier4Default)
let texture4Hover = new THREE.TextureLoader().load(atelier4Hover)

let texture5Default = new THREE.TextureLoader().load(atelier5Default)
let texture5Hover = new THREE.TextureLoader().load(atelier5Hover)

let texture6Default = new THREE.TextureLoader().load(atelier6Default)
let texture6Hover = new THREE.TextureLoader().load(atelier6Hover)

let texture7Default = new THREE.TextureLoader().load(atelier7Default)
let texture7Hover = new THREE.TextureLoader().load(atelier7Hover)

let texture8Default = new THREE.TextureLoader().load(atelier8Default)
let texture8Hover = new THREE.TextureLoader().load(atelier8Hover)

let texture9Default = new THREE.TextureLoader().load(atelier9Default)
let texture9Hover = new THREE.TextureLoader().load(atelier9Hover)

let texture10Default = new THREE.TextureLoader().load(atelier10Default)
let texture10Hover = new THREE.TextureLoader().load(atelier10Hover)

let texture11Default = new THREE.TextureLoader().load(atelier11Default)
let texture11Hover = new THREE.TextureLoader().load(atelier11Hover)

let texture12Default = new THREE.TextureLoader().load(atelier12Default)
let texture12Hover = new THREE.TextureLoader().load(atelier12Hover)

let texture13Default = new THREE.TextureLoader().load(atelier13Default)
let texture13Hover = new THREE.TextureLoader().load(atelier13Hover)

let texture14Default = new THREE.TextureLoader().load(atelier14Default)
let texture14Hover = new THREE.TextureLoader().load(atelier14Hover)


/////// PLANES MATERIALS ///////
let planeOpacityDefault = 0.9;

var materialPlane1 = new THREE.ShaderMaterial({
    vertexShader,
    fragmentShader,
    uniforms: {
        time: { type: "f", value: 0.0 },
        alpha: { value: planeOpacityDefault },
        displaceHover: { type: "f", value: 0.0 },

        imagebw: { type: "t", value: texture1Default },
        imagergb: { type: "t", value: texture1Hover },
        displacement: { type: "t", value: new THREE.TextureLoader().load(displacement4) },
        dispFactor: { type: "f", value: 0.0 },
        effectFactor: { type: "f", value: 1 }, //intensity
    },
    side: THREE.DoubleSide,
    transparent: true,
    opacity: 1.0
});
var materialPlane2 = new THREE.ShaderMaterial({
    vertexShader,
    fragmentShader,
    uniforms: {
        time: { type: "f", value: 0.0 },
        alpha: { value: planeOpacityDefault },
        displaceHover: { type: "f", value: 0.0 },

        imagebw: { type: "t", value: texture2Default },
        imagergb: { type: "t", value: texture2Hover },
        displacement: { type: "t", value: new THREE.TextureLoader().load(displacement4) },
        dispFactor: { type: "f", value: 0.0 },
        effectFactor: { type: "f", value: 1 }, //intensity
    },
    side: THREE.DoubleSide,
    transparent: true,
    opacity: 1.0
});
var materialPlane3 = new THREE.ShaderMaterial({
    vertexShader,
    fragmentShader,
    uniforms: {
        time: { type: "f", value: 0.0 },
        alpha: { value: planeOpacityDefault },
        displaceHover: { type: "f", value: 0.0 },

        imagebw: { type: "t", value: texture3Default },
        imagergb: { type: "t", value: texture3Hover },
        displacement: { type: "t", value: new THREE.TextureLoader().load(displacement4) },
        dispFactor: { type: "f", value: 0.0 },
        effectFactor: { type: "f", value: 1 }, //intensity
    },
    side: THREE.DoubleSide,
    transparent: true,
    opacity: 1.0
});
var materialPlane4 = new THREE.ShaderMaterial({
    vertexShader,
    fragmentShader,
    uniforms: {
        time: { type: "f", value: 0.0 },
        alpha: { value: planeOpacityDefault },
        displaceHover: { type: "f", value: 0.0 },

        imagebw: { type: "t", value: texture4Default },
        imagergb: { type: "t", value: texture4Hover },
        displacement: { type: "t", value: new THREE.TextureLoader().load(displacement4) },
        dispFactor: { type: "f", value: 0.0 },
        effectFactor: { type: "f", value: 1 }, //intensity
    },
    side: THREE.DoubleSide,
    transparent: true,
    opacity: 1.0
});
var materialPlane5 = new THREE.ShaderMaterial({
    vertexShader,
    fragmentShader,
    uniforms: {
        time: { type: "f", value: 0.0 },
        alpha: { value: planeOpacityDefault },
        displaceHover: { type: "f", value: 0.0 },

        imagebw: { type: "t", value: texture5Default },
        imagergb: { type: "t", value: texture5Hover },
        displacement: { type: "t", value: new THREE.TextureLoader().load(displacement4) },
        dispFactor: { type: "f", value: 0.0 },
        effectFactor: { type: "f", value: 1 }, //intensity
    },
    side: THREE.DoubleSide,
    transparent: true,
    opacity: 1.0
});
var materialPlane6 = new THREE.ShaderMaterial({
    vertexShader,
    fragmentShader,
    uniforms: {
        time: { type: "f", value: 0.0 },
        alpha: { value: planeOpacityDefault },
        displaceHover: { type: "f", value: 0.0 },

        imagebw: { type: "t", value: texture6Default },
        imagergb: { type: "t", value: texture6Hover },
        displacement: { type: "t", value: new THREE.TextureLoader().load(displacement4) },
        dispFactor: { type: "f", value: 0.0 },
        effectFactor: { type: "f", value: 1 }, //intensity
    },
    side: THREE.DoubleSide,
    transparent: true,
    opacity: 1.0
});
var materialPlane7 = new THREE.ShaderMaterial({
    vertexShader,
    fragmentShader,
    uniforms: {
        time: { type: "f", value: 0.0 },
        alpha: { value: planeOpacityDefault },
        displaceHover: { type: "f", value: 0.0 },

        imagebw: { type: "t", value: texture7Default },
        imagergb: { type: "t", value: texture7Hover },
        displacement: { type: "t", value: new THREE.TextureLoader().load(displacement4) },
        dispFactor: { type: "f", value: 0.0 },
        effectFactor: { type: "f", value: 1 }, //intensity
    },
    side: THREE.DoubleSide,
    transparent: true,
    opacity: 1.0
});
var materialPlane8 = new THREE.ShaderMaterial({
    vertexShader,
    fragmentShader,
    uniforms: {
        time: { type: "f", value: 0.0 },
        alpha: { value: planeOpacityDefault },
        displaceHover: { type: "f", value: 0.0 },

        imagebw: { type: "t", value: texture8Default },
        imagergb: { type: "t", value: texture8Hover },
        displacement: { type: "t", value: new THREE.TextureLoader().load(displacement4) },
        dispFactor: { type: "f", value: 0.0 },
        effectFactor: { type: "f", value: 1 }, //intensity
    },
    side: THREE.DoubleSide,
    transparent: true,
    opacity: 1.0
});
var materialPlane9 = new THREE.ShaderMaterial({
    vertexShader,
    fragmentShader,
    uniforms: {
        time: { type: "f", value: 0.0 },
        alpha: { value: planeOpacityDefault },
        displaceHover: { type: "f", value: 0.0 },

        imagebw: { type: "t", value: texture9Default },
        imagergb: { type: "t", value: texture9Hover },
        displacement: { type: "t", value: new THREE.TextureLoader().load(displacement4) },
        dispFactor: { type: "f", value: 0.0 },
        effectFactor: { type: "f", value: 1 }, //intensity
    },
    side: THREE.DoubleSide,
    transparent: true,
    opacity: 1.0
});
var materialPlane10 = new THREE.ShaderMaterial({
    vertexShader,
    fragmentShader,
    uniforms: {
        time: { type: "f", value: 0.0 },
        alpha: { value: planeOpacityDefault },
        displaceHover: { type: "f", value: 0.0 },

        imagebw: { type: "t", value: texture10Default },
        imagergb: { type: "t", value: texture10Hover },
        displacement: { type: "t", value: new THREE.TextureLoader().load(displacement4) },
        dispFactor: { type: "f", value: 0.0 },
        effectFactor: { type: "f", value: 1 }, //intensity
    },
    side: THREE.DoubleSide,
    transparent: true,
    opacity: 1.0
});
var materialPlane11 = new THREE.ShaderMaterial({
    vertexShader,
    fragmentShader,
    uniforms: {
        time: { type: "f", value: 0.0 },
        alpha: { value: planeOpacityDefault },
        displaceHover: { type: "f", value: 0.0 },

        imagebw: { type: "t", value: texture11Default },
        imagergb: { type: "t", value: texture11Hover },
        displacement: { type: "t", value: new THREE.TextureLoader().load(displacement4) },
        dispFactor: { type: "f", value: 0.0 },
        effectFactor: { type: "f", value: 1 }, //intensity
    },
    side: THREE.DoubleSide,
    transparent: true,
    opacity: 1.0
});
var materialPlane12 = new THREE.ShaderMaterial({
    vertexShader,
    fragmentShader,
    uniforms: {
        time: { type: "f", value: 0.0 },
        alpha: { value: planeOpacityDefault },
        displaceHover: { type: "f", value: 0.0 },

        imagebw: { type: "t", value: texture12Default },
        imagergb: { type: "t", value: texture12Hover },
        displacement: { type: "t", value: new THREE.TextureLoader().load(displacement4) },
        dispFactor: { type: "f", value: 0.0 },
        effectFactor: { type: "f", value: 1 }, //intensity
    },
    side: THREE.DoubleSide,
    transparent: true,
    opacity: 1.0
});
var materialPlane13 = new THREE.ShaderMaterial({
    vertexShader,
    fragmentShader,
    uniforms: {
        time: { type: "f", value: 0.0 },
        alpha: { value: planeOpacityDefault },
        displaceHover: { type: "f", value: 0.0 },

        imagebw: { type: "t", value: texture13Default },
        imagergb: { type: "t", value: texture13Hover },
        displacement: { type: "t", value: new THREE.TextureLoader().load(displacement4) },
        dispFactor: { type: "f", value: 0.0 },
        effectFactor: { type: "f", value: 1 }, //intensity
    },
    side: THREE.DoubleSide,
    transparent: true,
    opacity: 1.0
});
var materialPlane14 = new THREE.ShaderMaterial({
    vertexShader,
    fragmentShader,
    uniforms: {
        time: { type: "f", value: 0.0 },
        alpha: { value: planeOpacityDefault },
        displaceHover: { type: "f", value: 0.0 },

        imagebw: { type: "t", value: texture14Default },
        imagergb: { type: "t", value: texture14Hover },
        displacement: { type: "t", value: new THREE.TextureLoader().load(displacement4) },
        dispFactor: { type: "f", value: 0.0 },
        effectFactor: { type: "f", value: 1 }, //intensity
    },
    side: THREE.DoubleSide,
    transparent: true,
    opacity: 1.0
});

/////// PLANE PANEL ///////
var materialPlanePanneau = new THREE.ShaderMaterial({
    vertexShader,
    fragmentShader: fragmentShaderVertical,
    uniforms: {
        time: { type: "f", value: 0.0 },
        alpha: { value: 1.0 },
        displaceHover: { type: "f", value: 0.0 },

        imagebw: { type: "t", value: texture1Hover },
        imagergb: { type: "t", value: texture2Hover },
        displacement: { type: "t", value: new THREE.TextureLoader().load(displacement2) },
        dispFactor: { type: "f", value: 0.0 }, //transition
        effectFactor: { type: "f", value: 1 }, //intensity
    },
    side: THREE.DoubleSide,
    transparent: true,
    opacity: 1.0
});


/////// PLANE AXES ///////
var planeAxe = new THREE.Object3D();
planeAxe.position.set(0, -26.5, 0);
scene.add(planeAxe);


/////// PLANES PIVOTS ///////
var pivot1 = new THREE.Object3D();
var pivot2 = new THREE.Object3D();
var pivot3 = new THREE.Object3D();
var pivot4 = new THREE.Object3D();
var pivot5 = new THREE.Object3D();
var pivot6 = new THREE.Object3D();
var pivot7 = new THREE.Object3D();
var pivot8 = new THREE.Object3D();
var pivot9 = new THREE.Object3D();
var pivot10 = new THREE.Object3D();
var pivot11 = new THREE.Object3D();
var pivot12 = new THREE.Object3D();
var pivot13 = new THREE.Object3D();
var pivot14 = new THREE.Object3D();

pivot1.position.z = 2.25;
pivot2.position.x = -2.25;
pivot3.position.z = -2.25;
pivot4.position.x = 2.25;
pivot5.position.z = 2.25;
pivot6.position.x = -2.25;
pivot7.position.z = -2.25;
pivot8.position.x = 2.25;
pivot9.position.z = 2.25;
pivot10.position.x = -2.25;
pivot11.position.z = -2.25;
pivot12.position.x = 2.25;
pivot13.position.z = 2.25;
pivot14.position.x = -2.25;

planeAxe.add(pivot1, pivot2, pivot3, pivot4, pivot5, pivot6, pivot7, pivot8, pivot9, pivot10, pivot11, pivot12, pivot13, pivot14);

/////// PLANES MESHS ///////
var planeMesh1 = new THREE.Mesh(plane, materialPlane1);
var planeMesh2 = new THREE.Mesh(plane, materialPlane2);
var planeMesh3 = new THREE.Mesh(plane, materialPlane3);
var planeMesh4 = new THREE.Mesh(plane, materialPlane4);
var planeMesh5 = new THREE.Mesh(plane, materialPlane5);
var planeMesh6 = new THREE.Mesh(plane, materialPlane6);
var planeMesh7 = new THREE.Mesh(plane, materialPlane7);
var planeMesh8 = new THREE.Mesh(plane, materialPlane8);
var planeMesh9 = new THREE.Mesh(plane, materialPlane9);
var planeMesh10 = new THREE.Mesh(plane, materialPlane10);
var planeMesh11 = new THREE.Mesh(plane, materialPlane11);
var planeMesh12 = new THREE.Mesh(plane, materialPlane12);
var planeMesh13 = new THREE.Mesh(plane, materialPlane13);
var planeMesh14 = new THREE.Mesh(plane, materialPlane14);

var planeMeshPanneau = new THREE.Mesh(planePanneau, materialPlanePanneau);

planeMesh1.position.y = 4;
planeMesh2.position.y = 5;
planeMesh3.position.y = 6;
planeMesh4.position.y = 7;
planeMesh5.position.y = 8;
planeMesh6.position.y = 9;
planeMesh7.position.y = 10;
planeMesh8.position.y = 11;
planeMesh9.position.y = 12;
planeMesh10.position.y = 13;
planeMesh11.position.y = 14;
planeMesh12.position.y = 15;
planeMesh13.position.y = 16;
planeMesh14.position.y = 17;

scene.add(planeMeshPanneau)
planeMeshPanneau.position.set(7.2, -3.05, -3)
planeMeshPanneau.rotation.y = -.9;

// sign.position.set(7.8, -3.05, -4)

planeMesh2.rotation.y = -Math.PI / 2;
planeMesh3.rotation.y = -Math.PI;
planeMesh4.rotation.y = Math.PI / 2;
planeMesh6.rotation.y = -Math.PI / 2;
planeMesh7.rotation.y = -Math.PI;
planeMesh8.rotation.y = Math.PI / 2;
planeMesh10.rotation.y = -Math.PI / 2;
planeMesh11.rotation.y = -Math.PI;
planeMesh12.rotation.y = Math.PI / 2;
planeMesh14.rotation.y = -Math.PI / 2;

/////// ROTATION AROUND AXIS ///////
pivot1.add(planeMesh1);
pivot2.add(planeMesh2);
pivot3.add(planeMesh3);
pivot4.add(planeMesh4);
pivot5.add(planeMesh5);
pivot6.add(planeMesh6);
pivot7.add(planeMesh7);
pivot8.add(planeMesh8);
pivot9.add(planeMesh9);
pivot10.add(planeMesh10);
pivot11.add(planeMesh11);
pivot12.add(planeMesh12);
pivot13.add(planeMesh13);
pivot14.add(planeMesh14);


/////// GRID ///////
var screenWidth = (window.innerWidth / 22.2);
var ScreenHeigth = (window.innerHeight / 22.2);

let colContainer = document.querySelector('.colContainer')
let rowContainer = document.querySelector('.rowContainer')

for (let col = 0; col < screenWidth; col++) {
    let drawCol = document.createElement("div");
    colContainer.appendChild(drawCol).classList.add("col");
    drawCol.classList.add(col);
};
for (let row = 0; row < ScreenHeigth; row++) {
    let drawRaw = document.createElement("div");
    rowContainer.appendChild(drawRaw).className = "row";
    drawRaw.classList.add(row);
};

/////// PARTICLES ///////
let particleGeo = new THREE.Geometry();
for (let i = 0; i < 800; i++) {
    let particle = new THREE.Vector3(
            Math.random() * 50 - 40,
            Math.random() * 50 - 40,
            Math.random() * 15 - 7.5)
    particleGeo.vertices.push(particle);
}

let particleMaterial = new THREE.PointsMaterial({
    size: 0.08, //0.018
    map: new THREE.TextureLoader().load(particle),
    blending: THREE.AdditiveBlending,
    transparent: true,
    opacity: .35
});

let particleMesh = new THREE.Points(particleGeo, particleMaterial);
particleMesh.name = 'ParticleObjects';
scene.add(particleMesh);


/////// VARIABLES EVENTS ///////
let homeContainer = document.querySelector('.homeContainer');
let homeMask = document.querySelector('.homeMask');
let titleSvg = document.querySelector('.title');
let titleSvgPath = document.querySelectorAll('.title path');
let titleSvgLine = document.querySelector('.title line');
let littleTitleSvg = document.querySelector('.littleTitle');
let littleTitleSvgPath = document.querySelectorAll('.littleTitle path');
let littleTitleSvgLine = document.querySelector('.littleTitle line');
let buttons = document.querySelectorAll('button');
let btnStart = document.querySelector('.btn__start');
let spanContainerStartMouseOver = document.querySelector('.spanContainerStartMouseover')
let spanContainerStartMouseOut = document.querySelector('.spanContainerStartMouseout')
let btnBackHome = document.querySelector('.btn__backHome');
let spanContainerBackMouseOver = document.querySelector('.spanContainerBackMouseover')
let spanContainerBackMouseOut = document.querySelector('.spanContainerBackMouseout')
let btnBackWorkshop = document.querySelector('.btn__backWorkshop');
let spanContainerBackWorkshopMouseOver = document.querySelector('.spanContainerBackWorkshopMouseover')
let spanContainerBackWorkshopMouseOut = document.querySelector('.spanContainerBackWorkshopMouseout')
let canvas = document.querySelector('canvas');
let sm = document.querySelectorAll('.sm');
let sm1 = document.querySelector('.sm__1');
let sm2 = document.querySelector('.sm__2');
let sm3 = document.querySelector('.sm__3');
let discordContainer = document.querySelector('.btn__discord');
let discordSpanContainer = document.querySelector('.spanContainerDiscord');
let iutContainer = document.querySelector('.btn__iut');
let iutSpanContainer = document.querySelector('.spanContainerIut');
let musicBtn = document.querySelector('.musicBtn');
let lineMusicBtn = document.querySelectorAll('.musicBtn .lineContainer .line')
let maskMusicBtn = document.querySelector('.musicBtn .lineContainer .soundMask')
let onMusic = document.querySelector('.musicBtn .containerIndication .on')
let offMusic = document.querySelector('.musicBtn .containerIndication .off')
let bgCol = document.querySelectorAll('.colContainer .col');
let bgRow = document.querySelectorAll('.rowContainer .row');
let cursor = document.querySelector('.cursor');
let cursorShapeIn = document.querySelector('.cursor-shape_in');
let cursorShapeOut = document.querySelector('.cursor-shape_out');
let tailleBoulette = document.querySelector('.tailleBoulette');
let containerTimeline = document.querySelector('.containerTimeline');
let workShopButton = document.querySelectorAll('.workShopButton');
let workShopButtonMask = document.querySelectorAll('.mask');
let workShopButton1 = document.querySelector('.workShopButton__1');
let workShopButton2 = document.querySelector('.workShopButton__2');
let workShopButton3 = document.querySelector('.workShopButton__3');
let workShopButton4 = document.querySelector('.workShopButton__4');
let workShopButton5 = document.querySelector('.workShopButton__5');
let workShopButton6 = document.querySelector('.workShopButton__6');
let workShopButton7 = document.querySelector('.workShopButton__7');
let workShopButton8 = document.querySelector('.workShopButton__8');
let workShopButton9 = document.querySelector('.workShopButton__9');
let workShopButton10 = document.querySelector('.workShopButton__10');
let workShopButton11 = document.querySelector('.workShopButton__11');
let workShopButton12 = document.querySelector('.workShopButton__12');
let workShopButton13 = document.querySelector('.workShopButton__13');
let workShopButton14 = document.querySelector('.workShopButton__14');

let indicClickOnPlane = document.querySelector('.indicClickOnPlane');
let timelineIndication = document.querySelector('.indication');
let cursorIndication = document.querySelector('.cursorIndication');

let workShopContainer = document.querySelector('.workShopContainer');
let creditContainer = document.querySelector('.creditContainer');

let contentContainer__1 = document.querySelector('.contentContainer__1');
let scrollContainer__1 = document.querySelector('.scrollContainer__1');

let prenom__1 = document.querySelector('.scrollContainer__1 .contentImg__1 .prenom')
let nom__1 = document.querySelector('.scrollContainer__1 .contentImg__1 .nom')
let r1__1 = document.querySelector('.scrollContainer__1 .contentImg__1 .r1')
let r2__1 = document.querySelector('.scrollContainer__1 .contentImg__1 .r2')
let screenMask__1 = document.querySelector('.scrollContainer__1 .contentImg__1 .screenMask')
let faceImgPath__1 = document.querySelector('.scrollContainer__1 .contentImg__1 .content')
let faceImgZoom__1 = document.querySelector('.scrollContainer__1 .contentImg__1 .faceImg')

let prenom__2 = document.querySelector('.scrollContainer__1 .contentImg__2 .prenom')
let nom__2 = document.querySelector('.scrollContainer__1 .contentImg__2 .nom')
let r1__2 = document.querySelector('.scrollContainer__1 .contentImg__2 .r1')
let r2__2 = document.querySelector('.scrollContainer__1 .contentImg__2 .r2')
let screenMask__2 = document.querySelector('.scrollContainer__1 .contentImg__2 .screenMask')
let faceImgPath__2 = document.querySelector('.scrollContainer__1 .contentImg__2 .content')
let faceImgZoom__2 = document.querySelector('.scrollContainer__1 .contentImg__2 .faceImg')

let prenom__3 = document.querySelector('.scrollContainer__1 .contentImg__3 .prenom')
let nom__3 = document.querySelector('.scrollContainer__1 .contentImg__3 .nom')
let r1__3 = document.querySelector('.scrollContainer__1 .contentImg__3 .r1')
let r2__3 = document.querySelector('.scrollContainer__1 .contentImg__3 .r2')
let screenMask__3 = document.querySelector('.scrollContainer__1 .contentImg__3 .screenMask')
let faceImgPath__3 = document.querySelector('.scrollContainer__1 .contentImg__3 .content')
let faceImgZoom__3 = document.querySelector('.scrollContainer__1 .contentImg__3 .faceImg')

let prenom__4 = document.querySelector('.scrollContainer__1 .contentImg__4 .prenom')
let nom__4 = document.querySelector('.scrollContainer__1 .contentImg__4 .nom')
let r1__4 = document.querySelector('.scrollContainer__1 .contentImg__4 .r1')
let r2__4 = document.querySelector('.scrollContainer__1 .contentImg__4 .r2')
let screenMask__4 = document.querySelector('.scrollContainer__1 .contentImg__4 .screenMask')
let faceImgPath__4 = document.querySelector('.scrollContainer__1 .contentImg__4 .content')
let faceImgZoom__4 = document.querySelector('.scrollContainer__1 .contentImg__4 .faceImg')

let prenom__5 = document.querySelector('.scrollContainer__1 .contentImg__5 .prenom')
let nom__5 = document.querySelector('.scrollContainer__1 .contentImg__5 .nom')
let r1__5 = document.querySelector('.scrollContainer__1 .contentImg__5 .r1')
let r2__5 = document.querySelector('.scrollContainer__1 .contentImg__5 .r2')
let screenMask__5 = document.querySelector('.scrollContainer__1 .contentImg__5 .screenMask')
let faceImgPath__5 = document.querySelector('.scrollContainer__1 .contentImg__5 .content')
let faceImgZoom__5 = document.querySelector('.scrollContainer__1 .contentImg__5 .faceImg')

let prenom__6 = document.querySelector('.scrollContainer__1 .contentImg__6 .prenom')
let nom__6 = document.querySelector('.scrollContainer__1 .contentImg__6 .nom')
let r1__6 = document.querySelector('.scrollContainer__1 .contentImg__6 .r1')
let r2__6 = document.querySelector('.scrollContainer__1 .contentImg__6 .r2')
let screenMask__6 = document.querySelector('.scrollContainer__1 .contentImg__6 .screenMask')
let faceImgPath__6 = document.querySelector('.scrollContainer__1 .contentImg__6 .content')
let faceImgZoom__6 = document.querySelector('.scrollContainer__1 .contentImg__6 .faceImg')

/////// IMAGES HOVER ///////
faceImgPath__1.addEventListener('mouseenter', function () {
    faceImgPath__1.classList.add('switch');
    faceImgZoom__1.classList.add('switch');
    prenom__1.classList.add('switch')
    nom__1.classList.add('switch')
    r1__1.classList.add('switch')
    r2__1.classList.add('switch')
})

faceImgPath__1.addEventListener('mouseleave', function () {
    faceImgPath__1.classList.remove('switch');
    faceImgZoom__1.classList.remove('switch');
    prenom__1.classList.remove('switch')
    nom__1.classList.remove('switch')
    r1__1.classList.remove('switch')
    r2__1.classList.remove('switch')
})

faceImgPath__2.addEventListener('mouseenter', function () {
    faceImgPath__2.classList.add('switch');
    faceImgZoom__2.classList.add('switch');
    prenom__2.classList.add('switch')
    nom__2.classList.add('switch')
    r1__2.classList.add('switch')
    r2__2.classList.add('switch')
})

faceImgPath__2.addEventListener('mouseleave', function () {
    faceImgPath__2.classList.remove('switch');
    faceImgZoom__2.classList.remove('switch');
    prenom__2.classList.remove('switch')
    nom__2.classList.remove('switch')
    r1__2.classList.remove('switch')
    r2__2.classList.remove('switch')
})

faceImgPath__3.addEventListener('mouseenter', function () {
    faceImgPath__3.classList.add('switch');
    faceImgZoom__3.classList.add('switch');
    prenom__3.classList.add('switch')
    nom__3.classList.add('switch')
    r1__3.classList.add('switch')
    r2__3.classList.add('switch')
})

faceImgPath__3.addEventListener('mouseleave', function () {
    faceImgPath__3.classList.remove('switch');
    faceImgZoom__3.classList.remove('switch');
    prenom__3.classList.remove('switch')
    nom__3.classList.remove('switch')
    r1__3.classList.remove('switch')
    r2__3.classList.remove('switch')
})

faceImgPath__4.addEventListener('mouseenter', function () {
    faceImgPath__4.classList.add('switch');
    faceImgZoom__4.classList.add('switch');
    prenom__4.classList.add('switch')
    nom__4.classList.add('switch')
    r1__4.classList.add('switch')
    r2__4.classList.add('switch')
})

faceImgPath__4.addEventListener('mouseleave', function () {
    faceImgPath__4.classList.remove('switch');
    faceImgZoom__4.classList.remove('switch');
    prenom__4.classList.remove('switch')
    nom__4.classList.remove('switch')
    r1__4.classList.remove('switch')
    r2__4.classList.remove('switch')
})

faceImgPath__5.addEventListener('mouseenter', function () {
    faceImgPath__5.classList.add('switch');
    faceImgZoom__5.classList.add('switch');
    prenom__5.classList.add('switch')
    nom__5.classList.add('switch')
    r1__5.classList.add('switch')
    r2__5.classList.add('switch')
})

faceImgPath__5.addEventListener('mouseleave', function () {
    faceImgPath__5.classList.remove('switch');
    faceImgZoom__5.classList.remove('switch');
    prenom__5.classList.remove('switch')
    nom__5.classList.remove('switch')
    r1__5.classList.remove('switch')
    r2__5.classList.remove('switch')
})

faceImgPath__6.addEventListener('mouseenter', function () {
    faceImgPath__6.classList.add('switch');
    faceImgZoom__6.classList.add('switch');
    prenom__6.classList.add('switch')
    nom__6.classList.add('switch')
    r1__6.classList.add('switch')
    r2__6.classList.add('switch')
})

faceImgPath__6.addEventListener('mouseleave', function () {
    faceImgPath__6.classList.remove('switch');
    faceImgZoom__6.classList.remove('switch');
    prenom__6.classList.remove('switch')
    nom__6.classList.remove('switch')
    r1__6.classList.remove('switch')
    r2__6.classList.remove('switch')
})

let homeActive = true;
let hoverPlane = true;
let workshopActive = false;
let creditActive = false;

let backPossible = true;
let clickPossible = true;
let scrollPossible = true;

let isScrollDown = false;
let isScrollUp = false;

window.addEventListener('load', function() {
    TweenMax.to(bgCol, { duration: 1, clipPath: "inset(0% 0% 0% 0%)", stagger: 0.02 });
    TweenMax.to(bgCol, { duration: .5, background: '#f72585', opacity: .325, stagger: 0.02 });
    TweenMax.to(bgCol, { duration: .5, background: '#0d0437', opacity: .65, stagger: 0.02 });
    TweenMax.to(bgRow, { duration: 1, clipPath: "inset(0% 0% 0% 0%)", stagger: 0.0355555 });
    TweenMax.to(bgRow, { duration: .5, background: '#f72585', opacity: .325, stagger: 0.0355555 });
    TweenMax.to(bgRow, { duration: .5, background: '#0d0437', opacity: .65, stagger: 0.0355555 });
    TweenMax.to(bgCol, { duration: .5, background: '#f72585', opacity: .05, stagger: 0.02, delay: 2 });
    TweenMax.to(bgRow, { duration: .5, background: '#f72585', opacity: .05, stagger: 0.0355555, delay: 2 });
    if (!window.matchMedia("(max-width: 1024px)").matches) {
        TweenMax.to(bgCol, { duration: 1.5, background: '#f72585', opacity: .05, stagger: 0.02, repeat: -1, yoyo: true, delay: 2 });
        TweenMax.to(bgRow, { duration: 1.5, background: '#f72585', opacity: .05, stagger: 0.0355555, repeat: -1, yoyo: true, delay: 2 });
        canvas.classList.add('hologramActive')
        cursor.style.opacity = 1
        cursorShapeOut.style.opacity = 1
        setTimeout(function() {
            const _cursorIn = new Cursor(cursorShapeIn);
            updateCursor();
        }, 4000)
    }
})


let switchBtn = false;

musicBtn.addEventListener('click', function(){

    if(switchBtn == false){
    TweenMax.to(maskMusicBtn, { duration: .35, clipPath: "inset(100% 0% 0% 0%)",ease: "power3.easeOut" });
    TweenMax.to(maskMusicBtn, { duration: .25, clipPath: "inset(0% 0% 0% 0%)",ease: "power3.easeOut", delay: .15 });
    TweenMax.to(maskMusicBtn, { duration: .25, clipPath: "inset(0% 0% 100% 0%)",ease: "power3.easeOut", delay: .5 });   
    switchBtn = true;    
}

else{
    TweenMax.to(maskMusicBtn, { duration: .35, clipPath: "inset(0% 0% 100% 0%)",ease: "power3.easeOut" });
    TweenMax.to(maskMusicBtn, { duration: .25, clipPath: "inset(0% 0% 0% 0%)",ease: "power3.easeOut", delay: .15 });
    TweenMax.to(maskMusicBtn, { duration: .25, clipPath: "inset(100% 0% 0% 0%)",ease: "power3.easeOut", delay: .5 }); 
    switchBtn = false;
}

    onMusic.classList.toggle('switch');
    offMusic.classList.toggle('switch')

    setTimeout(function(){
        lineMusicBtn.forEach(line=>{
            line.classList.toggle('switch');
        })
    },350)   
})
// var shouldStop = false;

  


// function checkShouldStop() {
//     if(shouldStop) {
//       tl.pause();
//     }else {
//       tl.resume();
//     }
//   }


//   musicBtn.addEventListener('click', function(){
//     shouldStop = true;
//     gsap.staggerTo(lineMusicBtn, .5, { clipPath: "inset(95% 0% 0% 0%)"}, 0.12)
   
//   })

// //   musicBtn.addEventListener('mouseout', function(){
// //     shouldStop = false;
// //     tl.resume();
   
// //   })


/////// PLANE HOVER SHADERS EFFECT ///////
let colorCursorHover = "#f72585";
let colorCursorDefault = "#4cc9f0";

planeMesh1.on('mouseover', function(ev) {
    if (ev && workshopActive == false && (planeAxe.position.y <= -4 && planeAxe.position.y >= -4.5 || planeAxe.position.y <= -3.5 && planeAxe.position.y >= -4)) {
        gsap.to(materialPlane1.uniforms.alpha, 0.75, { value: 1.0, ease: "Power3.easeOut" })
        gsap.to(materialPlane1.uniforms.dispFactor, 0.75, { value: 1.0, ease: "Power3.easeOut" });
        if (!window.matchMedia("(max-width: 1024px)").matches) {
            gsap.to(tailleBoulette, 0.75, { padding: 50, ease: "Power3.easeOut"})
            gsap.to(cursorShapeIn, 0.75, { background: colorCursorHover, padding: 50, ease: "Power3.easeOut"})
            gsap.to(cursorShapeOut, 0.50, { opacity: 0, ease: "Power3.easeOut"})
            gsap.to(indicClickOnPlane, .75, { scale: 1, ease: "Power3.easeOut", delay: .05})
            indicClickOnPlane.classList.add("planeHover")
        }
    }
});
planeMesh1.on('mouseout', function(ev) {
    if (ev && workshopActive == false) {
        gsap.to(materialPlane1.uniforms.alpha, 0.75, { value: planeOpacityDefault, ease: "Power3.easeOut" })
        gsap.to(materialPlane1.uniforms.dispFactor, 0.75, { value: 0.0, ease: "Power3.easeOut" });
        if (!window.matchMedia("(max-width: 1024px)").matches) {
            gsap.to(tailleBoulette, 0.75, {padding: 0, ease: "Power3.easeOut"})
            gsap.to(cursorShapeIn, 0.75, { background: colorCursorDefault, padding: 0, ease: "Power3.easeOut"})
            gsap.to(cursorShapeOut, 0.25, { opacity: 1,  delay: 0.25, ease: "Power3.easeOut"})
            gsap.to(indicClickOnPlane, 0.75, { scale: 0, ease: "Power3.easeOut"})
            indicClickOnPlane.classList.remove("planeHover")
        }
    }
});

planeMesh2.on('mouseover', function(ev) {
    if (ev && workshopActive == false && (planeAxe.position.y <= -5 && planeAxe.position.y >= -5.5 || planeAxe.position.y <= -4.5 && planeAxe.position.y >= -5)) {
        console.log(ev)
        gsap.to(materialPlane2.uniforms.alpha, 0.75, { value: 1.0, ease: "Power3.easeOut" })
        gsap.to(materialPlane2.uniforms.dispFactor, 0.75, { value: 1.0, ease: "Power3.easeOut" });
        if (!window.matchMedia("(max-width: 1024px)").matches) {
            gsap.to(tailleBoulette, 0.75, { padding: 50, ease: "Power3.easeOut"})
            gsap.to(cursorShapeIn, 0.75, { background: colorCursorHover, padding: 50, ease: "Power3.easeOut"})
            gsap.to(cursorShapeOut, 0.50, { opacity: 0, ease: "Power3.easeOut"})
            gsap.to(indicClickOnPlane, .75, { scale: 1, ease: "Power3.easeOut", delay: .05})
            indicClickOnPlane.classList.add("planeHover")
        }
    }
});
planeMesh2.on('mouseout', function(ev) {
    if (ev && workshopActive == false) {
        gsap.to(materialPlane2.uniforms.alpha, 0.75, { value: planeOpacityDefault, ease: "Power3.easeOut" })
        gsap.to(materialPlane2.uniforms.dispFactor, 0.75, { value: 0.0, ease: "Power3.easeOut" });
        if (!window.matchMedia("(max-width: 1024px)").matches) {
            gsap.to(tailleBoulette, 0.75, {padding: 0, ease: "Power3.easeOut"})
            gsap.to(cursorShapeIn, 0.75, { background: colorCursorDefault, padding: 0, ease: "Power3.easeOut"})
            gsap.to(cursorShapeOut, 0.25, { opacity: 1,  delay: 0.25, ease: "Power3.easeOut"})
            gsap.to(indicClickOnPlane, 0.75, { scale: 0, ease: "Power3.easeOut"})
            indicClickOnPlane.classList.remove("planeHover")
        }
    }
});

planeMesh3.on('mouseover', function(ev) {
    if (ev && workshopActive == false && (planeAxe.position.y <= -6 && planeAxe.position.y >= -6.5 || planeAxe.position.y <= -5.5 && planeAxe.position.y >= -6)) {
        console.log(ev)
        gsap.to(materialPlane3.uniforms.alpha, 0.75, { value: 1.0, ease: "Power3.easeOut" })
        gsap.to(materialPlane3.uniforms.dispFactor, 0.75, { value: 1.0, ease: "Power3.easeOut" });
        if (!window.matchMedia("(max-width: 1024px)").matches) {
            gsap.to(tailleBoulette, 0.75, { padding: 50, ease: "Power3.easeOut"})
            gsap.to(cursorShapeIn, 0.75, { background: colorCursorHover, padding: 50, ease: "Power3.easeOut"})
            gsap.to(cursorShapeOut, 0.50, { opacity: 0, ease: "Power3.easeOut"})
            gsap.to(indicClickOnPlane, .75, { scale: 1, ease: "Power3.easeOut", delay: .05})
            indicClickOnPlane.classList.add("planeHover")
        }
    }
});
planeMesh3.on('mouseout', function(ev) {
    if (ev && workshopActive == false) {
        gsap.to(materialPlane3.uniforms.alpha, 0.75, { value: planeOpacityDefault, ease: "Power3.easeOut" })
        gsap.to(materialPlane3.uniforms.dispFactor, 0.75, { value: 0.0, ease: "Power3.easeOut" });
        if (!window.matchMedia("(max-width: 1024px)").matches) {
            gsap.to(tailleBoulette, 0.75, {padding: 0, ease: "Power3.easeOut"})
            gsap.to(cursorShapeIn, 0.75, { background: colorCursorDefault, padding: 0, ease: "Power3.easeOut"})
            gsap.to(cursorShapeOut, 0.25, { opacity: 1,  delay: 0.25, ease: "Power3.easeOut"})
            gsap.to(indicClickOnPlane, 0.75, { scale: 0, ease: "Power3.easeOut"})
            indicClickOnPlane.classList.remove("planeHover")
        }
    }
});

planeMesh4.on('mouseover', function(ev) {
    if (ev && workshopActive == false && (planeAxe.position.y <= -7 && planeAxe.position.y >= -7.5 || planeAxe.position.y <= -6.5 && planeAxe.position.y >= -7)) {
        console.log(ev)
        gsap.to(materialPlane4.uniforms.alpha, 0.75, { value: 1.0, ease: "Power3.easeOut" })
        gsap.to(materialPlane4.uniforms.dispFactor, 0.75, { value: 1.0, ease: "Power3.easeOut" });
        if (!window.matchMedia("(max-width: 1024px)").matches) {
            gsap.to(tailleBoulette, 0.75, { padding: 50, ease: "Power3.easeOut"})
            gsap.to(cursorShapeIn, 0.75, { background: colorCursorHover, padding: 50, ease: "Power3.easeOut"})
            gsap.to(cursorShapeOut, 0.50, { opacity: 0, ease: "Power3.easeOut"})
            gsap.to(indicClickOnPlane, .75, { scale: 1, ease: "Power3.easeOut", delay: .05})
            indicClickOnPlane.classList.add("planeHover")
        }
    }
});
planeMesh4.on('mouseout', function(ev) {
    if (ev && workshopActive == false) {
        gsap.to(materialPlane4.uniforms.alpha, 0.75, { value: planeOpacityDefault, ease: "Power3.easeOut" })
        gsap.to(materialPlane4.uniforms.dispFactor, 0.75, { value: 0.0, ease: "Power3.easeOut" });
        if (!window.matchMedia("(max-width: 1024px)").matches) {
            gsap.to(tailleBoulette, 0.75, {padding: 0, ease: "Power3.easeOut"})
            gsap.to(cursorShapeIn, 0.75, { background: colorCursorDefault, padding: 0, ease: "Power3.easeOut"})
            gsap.to(cursorShapeOut, 0.25, { opacity: 1,  delay: 0.25, ease: "Power3.easeOut"})
            gsap.to(indicClickOnPlane, 0.75, { scale: 0, ease: "Power3.easeOut"})
            indicClickOnPlane.classList.remove("planeHover")
        }
    }
});

planeMesh5.on('mouseover', function(ev) {
    if (ev && workshopActive == false && (planeAxe.position.y <= -8 && planeAxe.position.y >= -8.5 || planeAxe.position.y <= -7.5 && planeAxe.position.y >= -8)) {
        console.log(ev)
        gsap.to(materialPlane5.uniforms.alpha, 0.75, { value: 1.0, ease: "Power3.easeOut" })
        gsap.to(materialPlane5.uniforms.dispFactor, 0.75, { value: 1.0, ease: "Power3.easeOut" });
        if (!window.matchMedia("(max-width: 1024px)").matches) {
            gsap.to(tailleBoulette, 0.75, { padding: 50, ease: "Power3.easeOut"})
            gsap.to(cursorShapeIn, 0.75, { background: colorCursorHover, padding: 50, ease: "Power3.easeOut"})
            gsap.to(cursorShapeOut, 0.50, { opacity: 0, ease: "Power3.easeOut"})
            gsap.to(indicClickOnPlane, .75, { scale: 1, ease: "Power3.easeOut", delay: .05})
            indicClickOnPlane.classList.add("planeHover")
        }
    }
});
planeMesh5.on('mouseout', function(ev) {
    if (ev && workshopActive == false) {
        gsap.to(materialPlane5.uniforms.alpha, 0.75, { value: planeOpacityDefault, ease: "Power3.easeOut" })
        gsap.to(materialPlane5.uniforms.dispFactor, 0.75, { value: 0.0, ease: "Power3.easeOut" });
        if (!window.matchMedia("(max-width: 1024px)").matches) {
            gsap.to(tailleBoulette, 0.75, {padding: 0, ease: "Power3.easeOut"})
            gsap.to(cursorShapeIn, 0.75, { background: colorCursorDefault, padding: 0, ease: "Power3.easeOut"})
            gsap.to(cursorShapeOut, 0.25, { opacity: 1,  delay: 0.25, ease: "Power3.easeOut"})
            gsap.to(indicClickOnPlane, 0.75, { scale: 0, ease: "Power3.easeOut"})
            indicClickOnPlane.classList.remove("planeHover")
        }
    }
});

planeMesh6.on('mouseover', function(ev) {
    if (ev && workshopActive == false && (planeAxe.position.y <= -9 && planeAxe.position.y >= -9.5 || planeAxe.position.y <= -8.5 && planeAxe.position.y >= -9)) {
        console.log(ev)
        gsap.to(materialPlane6.uniforms.alpha, 0.75, { value: 1.0, ease: "Power3.easeOut" })
        gsap.to(materialPlane6.uniforms.dispFactor, 0.75, { value: 1.0, ease: "Power3.easeOut" });
       if (!window.matchMedia("(max-width: 1024px)").matches) {
           gsap.to(tailleBoulette, 0.75, { padding: 50, ease: "Power3.easeOut"})
            gsap.to(cursorShapeIn, 0.75, { background: colorCursorHover, padding: 50, ease: "Power3.easeOut"})
            gsap.to(cursorShapeOut, 0.50, { opacity: 0, ease: "Power3.easeOut"})
            gsap.to(indicClickOnPlane, .75, { scale: 1, ease: "Power3.easeOut", delay: .05})
            indicClickOnPlane.classList.add("planeHover")
        }
    }
});
planeMesh6.on('mouseout', function(ev) {
    if (ev && workshopActive == false) {
        gsap.to(materialPlane6.uniforms.alpha, 0.75, { value: planeOpacityDefault, ease: "Power3.easeOut" })
        gsap.to(materialPlane6.uniforms.dispFactor, 0.75, { value: 0.0, ease: "Power3.easeOut" });
        if (!window.matchMedia("(max-width: 1024px)").matches) {
            gsap.to(tailleBoulette, 0.75, {padding: 0, ease: "Power3.easeOut"})
            gsap.to(cursorShapeIn, 0.75, { background: colorCursorDefault, padding: 0, ease: "Power3.easeOut"})
            gsap.to(cursorShapeOut, 0.25, { opacity: 1,  delay: 0.25, ease: "Power3.easeOut"})
            gsap.to(indicClickOnPlane, 0.75, { scale: 0, ease: "Power3.easeOut"})
            indicClickOnPlane.classList.remove("planeHover")
        }
    }
});

planeMesh7.on('mouseover', function(ev) {
    if (ev && workshopActive == false && (planeAxe.position.y <= -10 && planeAxe.position.y >= -10.5 || planeAxe.position.y <= -9.5 && planeAxe.position.y >= -10)) {
        console.log(ev)
        gsap.to(materialPlane7.uniforms.alpha, 0.75, { value: 1.0, ease: "Power3.easeOut" })
        gsap.to(materialPlane7.uniforms.dispFactor, 0.75, { value: 1.0, ease: "Power3.easeOut" });
       if (!window.matchMedia("(max-width: 1024px)").matches) {
           gsap.to(tailleBoulette, 0.75, { padding: 50, ease: "Power3.easeOut"})
            gsap.to(cursorShapeIn, 0.75, { background: colorCursorHover, padding: 50, ease: "Power3.easeOut"})
            gsap.to(cursorShapeOut, 0.50, { opacity: 0, ease: "Power3.easeOut"})
            gsap.to(indicClickOnPlane, .75, { scale: 1, ease: "Power3.easeOut", delay: .05})
            indicClickOnPlane.classList.add("planeHover")
        }
    }
});
planeMesh7.on('mouseout', function(ev) {
    if (ev && workshopActive == false) {
        gsap.to(materialPlane7.uniforms.alpha, 0.75, { value: planeOpacityDefault, ease: "Power3.easeOut" })
        gsap.to(materialPlane7.uniforms.dispFactor, 0.75, { value: 0.0, ease: "Power3.easeOut" });
        if (!window.matchMedia("(max-width: 1024px)").matches) {
            gsap.to(tailleBoulette, 0.75, {padding: 0, ease: "Power3.easeOut"})
            gsap.to(cursorShapeIn, 0.75, { background: colorCursorDefault, padding: 0, ease: "Power3.easeOut"})
            gsap.to(cursorShapeOut, 0.25, { opacity: 1,  delay: 0.25, ease: "Power3.easeOut"})
            gsap.to(indicClickOnPlane, 0.75, { scale: 0, ease: "Power3.easeOut"})
            indicClickOnPlane.classList.remove("planeHover")
        }
    }
});

planeMesh8.on('mouseover', function(ev) {
    if (ev && workshopActive == false && (planeAxe.position.y <= -11 && planeAxe.position.y >= -11.5 || planeAxe.position.y <= -10.5 && planeAxe.position.y >= -11)) {
        console.log(ev)
        gsap.to(materialPlane8.uniforms.alpha, 0.75, { value: 1.0, ease: "Power3.easeOut" })
        gsap.to(materialPlane8.uniforms.dispFactor, 0.75, { value: 1.0, ease: "Power3.easeOut" });
        if (!window.matchMedia("(max-width: 1024px)").matches) {
            gsap.to(tailleBoulette, 0.75, { padding: 50, ease: "Power3.easeOut"})
            gsap.to(cursorShapeIn, 0.75, { background: colorCursorHover, padding: 50, ease: "Power3.easeOut"})
            gsap.to(cursorShapeOut, 0.50, { opacity: 0, ease: "Power3.easeOut"})
            gsap.to(indicClickOnPlane, .75, { scale: 1, ease: "Power3.easeOut", delay: .05})
            indicClickOnPlane.classList.add("planeHover")
        }
    }
});
planeMesh8.on('mouseout', function(ev) {
    if (ev && workshopActive == false) {
        gsap.to(materialPlane8.uniforms.alpha, 0.75, { value: planeOpacityDefault, ease: "Power3.easeOut" })
        gsap.to(materialPlane8.uniforms.dispFactor, 0.75, { value: 0.0, ease: "Power3.easeOut" });
        if (!window.matchMedia("(max-width: 1024px)").matches) {
            gsap.to(tailleBoulette, 0.75, {padding: 0, ease: "Power3.easeOut"})
            gsap.to(cursorShapeIn, 0.75, { background: colorCursorDefault, padding: 0, ease: "Power3.easeOut"})
            gsap.to(cursorShapeOut, 0.25, { opacity: 1,  delay: 0.25, ease: "Power3.easeOut"})
            gsap.to(indicClickOnPlane, 0.75, { scale: 0, ease: "Power3.easeOut"})
            indicClickOnPlane.classList.remove("planeHover")
        }
    }
});

planeMesh9.on('mouseover', function(ev) {
    if (ev && workshopActive == false && (planeAxe.position.y <= -12 && planeAxe.position.y >= -12.5 || planeAxe.position.y <= -11.5 && planeAxe.position.y >= -12)) {
        console.log(ev)
        gsap.to(materialPlane9.uniforms.alpha, 0.75, { value: 1.0, ease: "Power3.easeOut" })
        gsap.to(materialPlane9.uniforms.dispFactor, 0.75, { value: 1.0, ease: "Power3.easeOut" });
        if (!window.matchMedia("(max-width: 1024px)").matches) {
            gsap.to(tailleBoulette, 0.75, { padding: 50, ease: "Power3.easeOut"})
            gsap.to(cursorShapeIn, 0.75, { background: colorCursorHover, padding: 50, ease: "Power3.easeOut"})
            gsap.to(cursorShapeOut, 0.50, { opacity: 0, ease: "Power3.easeOut"})
            gsap.to(indicClickOnPlane, .75, { scale: 1, ease: "Power3.easeOut", delay: .05})
            indicClickOnPlane.classList.add("planeHover")
        }
    }
});
planeMesh9.on('mouseout', function(ev) {
    if (ev && workshopActive == false) {
        gsap.to(materialPlane9.uniforms.alpha, 0.75, { value: planeOpacityDefault, ease: "Power3.easeOut" })
        gsap.to(materialPlane9.uniforms.dispFactor, 0.75, { value: 0.0, ease: "Power3.easeOut" });
        if (!window.matchMedia("(max-width: 1024px)").matches) {
            gsap.to(tailleBoulette, 0.75, {padding: 0, ease: "Power3.easeOut"})
            gsap.to(cursorShapeIn, 0.75, { background: colorCursorDefault, padding: 0, ease: "Power3.easeOut"})
            gsap.to(cursorShapeOut, 0.25, { opacity: 1,  delay: 0.25, ease: "Power3.easeOut"})
            gsap.to(indicClickOnPlane, 0.75, { scale: 0, ease: "Power3.easeOut"})
            indicClickOnPlane.classList.remove("planeHover")
        }
    }   
});

planeMesh10.on('mouseover', function(ev) {
    if (ev && workshopActive == false && (planeAxe.position.y <= -13 && planeAxe.position.y >= -13.5 || planeAxe.position.y <= -12.5 && planeAxe.position.y >= -13)) {
        console.log(ev)
        gsap.to(materialPlane10.uniforms.alpha, 0.75, { value: 1.0, ease: "Power3.easeOut" })
        gsap.to(materialPlane10.uniforms.dispFactor, 0.75, { value: 1.0, ease: "Power3.easeOut" });
        if (!window.matchMedia("(max-width: 1024px)").matches) {
            gsap.to(tailleBoulette, 0.75, { padding: 50, ease: "Power3.easeOut"})
            gsap.to(cursorShapeIn, 0.75, { background: colorCursorHover, padding: 50, ease: "Power3.easeOut"})
            gsap.to(cursorShapeOut, 0.50, { opacity: 0, ease: "Power3.easeOut"})
            gsap.to(indicClickOnPlane, .75, { scale: 1, ease: "Power3.easeOut", delay: .05})
            indicClickOnPlane.classList.add("planeHover")
        }
    }
});
planeMesh10.on('mouseout', function(ev) {
    if (ev && workshopActive == false) {
        gsap.to(materialPlane10.uniforms.alpha, 0.75, { value: planeOpacityDefault, ease: "Power3.easeOut" })
        gsap.to(materialPlane10.uniforms.dispFactor, 0.75, { value: 0.0, ease: "Power3.easeOut" });
        if (!window.matchMedia("(max-width: 1024px)").matches) {
            gsap.to(tailleBoulette, 0.75, {padding: 0, ease: "Power3.easeOut"})
            gsap.to(cursorShapeIn, 0.75, { background: colorCursorDefault, padding: 0, ease: "Power3.easeOut"})
            gsap.to(cursorShapeOut, 0.25, { opacity: 1,  delay: 0.25, ease: "Power3.easeOut"})
            gsap.to(indicClickOnPlane, 0.75, { scale: 0, ease: "Power3.easeOut"})
            indicClickOnPlane.classList.remove("planeHover")
        }
    }
});

planeMesh11.on('mouseover', function(ev) {
    if (ev && workshopActive == false && (planeAxe.position.y <= -14 && planeAxe.position.y >= -14.5 || planeAxe.position.y <= -13.5 && planeAxe.position.y >= -14)) {
        console.log(ev)
        gsap.to(materialPlane11.uniforms.alpha, 0.75, { value: 1.0, ease: "Power3.easeOut" })
        gsap.to(materialPlane11.uniforms.dispFactor, 0.75, { value: 1.0, ease: "Power3.easeOut" });
        if (!window.matchMedia("(max-width: 1024px)").matches) {
            gsap.to(tailleBoulette, 0.75, { padding: 50, ease: "Power3.easeOut"})
            gsap.to(cursorShapeIn, 0.75, { background: colorCursorHover, padding: 50, ease: "Power3.easeOut"})
            gsap.to(cursorShapeOut, 0.50, { opacity: 0, ease: "Power3.easeOut"})
            gsap.to(indicClickOnPlane, .75, { scale: 1, ease: "Power3.easeOut", delay: .05})
            indicClickOnPlane.classList.add("planeHover")
        }
    }
});
planeMesh11.on('mouseout', function(ev) {
    if (ev && workshopActive == false) {
        gsap.to(materialPlane11.uniforms.alpha, 0.75, { value: planeOpacityDefault, ease: "Power3.easeOut" })
        gsap.to(materialPlane11.uniforms.dispFactor, 0.75, { value: 0.0, ease: "Power3.easeOut" });
        if (!window.matchMedia("(max-width: 1024px)").matches) {
            gsap.to(tailleBoulette, 0.75, {padding: 0, ease: "Power3.easeOut"})
            gsap.to(cursorShapeIn, 0.75, { background: colorCursorDefault, padding: 0, ease: "Power3.easeOut"})
            gsap.to(cursorShapeOut, 0.25, { opacity: 1,  delay: 0.25, ease: "Power3.easeOut"})
            gsap.to(indicClickOnPlane, 0.75, { scale: 0, ease: "Power3.easeOut"})
            indicClickOnPlane.classList.remove("planeHover")
        }
    }
});

planeMesh12.on('mouseover', function(ev) {
    if (ev && workshopActive == false && (planeAxe.position.y <= -15 && planeAxe.position.y >= -15.5 || planeAxe.position.y <= -14.5 && planeAxe.position.y >= -15)) {
        console.log(ev)
        gsap.to(materialPlane12.uniforms.alpha, 0.75, { value: 1.0, ease: "Power3.easeOut" })
        gsap.to(materialPlane12.uniforms.dispFactor, 0.75, { value: 1.0, ease: "Power3.easeOut" });
        if (!window.matchMedia("(max-width: 1024px)").matches) {
            gsap.to(tailleBoulette, 0.75, { padding: 50, ease: "Power3.easeOut"})
            gsap.to(cursorShapeIn, 0.75, { background: colorCursorHover, padding: 50, ease: "Power3.easeOut"})
            gsap.to(cursorShapeOut, 0.50, { opacity: 0, ease: "Power3.easeOut"})
            gsap.to(indicClickOnPlane, .75, { scale: 1, ease: "Power3.easeOut", delay: .05})
            indicClickOnPlane.classList.add("planeHover")
        }
    }
});
planeMesh12.on('mouseout', function(ev) {
    if (ev && workshopActive == false) {
        gsap.to(materialPlane12.uniforms.alpha, 0.75, { value: planeOpacityDefault, ease: "Power3.easeOut" })
        gsap.to(materialPlane12.uniforms.dispFactor, 0.75, { value: 0.0, ease: "Power3.easeOut" });
        if (!window.matchMedia("(max-width: 1024px)").matches) {
            gsap.to(tailleBoulette, 0.75, {padding: 0, ease: "Power3.easeOut"})
            gsap.to(cursorShapeIn, 0.75, { background: colorCursorDefault, padding: 0, ease: "Power3.easeOut"})
            gsap.to(cursorShapeOut, 0.25, { opacity: 1,  delay: 0.25, ease: "Power3.easeOut"})
            gsap.to(indicClickOnPlane, 0.75, { scale: 0, ease: "Power3.easeOut"})
            indicClickOnPlane.classList.remove("planeHover")
        }
    }
});

planeMesh13.on('mouseover', function(ev) {
    if (ev && workshopActive == false && (planeAxe.position.y <= -16 && planeAxe.position.y >= -16.5 || planeAxe.position.y <= -15.5 && planeAxe.position.y >= -16)) {
        console.log(ev)
        gsap.to(materialPlane13.uniforms.alpha, 0.75, { value: 1.0, ease: "Power3.easeOut" })
        gsap.to(materialPlane13.uniforms.dispFactor, 0.75, { value: 1.0, ease: "Power3.easeOut" });
        if (!window.matchMedia("(max-width: 1024px)").matches) {
            gsap.to(tailleBoulette, 0.75, { padding: 50, ease: "Power3.easeOut"})
            gsap.to(cursorShapeIn, 0.75, { background: colorCursorHover, padding: 50, ease: "Power3.easeOut"})
            gsap.to(cursorShapeOut, 0.50, { opacity: 0, ease: "Power3.easeOut"})
            gsap.to(indicClickOnPlane, .75, { scale: 1, ease: "Power3.easeOut", delay: .05})
            indicClickOnPlane.classList.add("planeHover")
        }
    }
});
planeMesh13.on('mouseout', function(ev) {
    if (ev && workshopActive == false) {
        gsap.to(materialPlane13.uniforms.alpha, 0.75, { value: planeOpacityDefault, ease: "Power3.easeOut" })
        gsap.to(materialPlane13.uniforms.dispFactor, 0.75, { value: 0.0, ease: "Power3.easeOut" });
        if (!window.matchMedia("(max-width: 1024px)").matches) {
            gsap.to(tailleBoulette, 0.75, {padding: 0, ease: "Power3.easeOut"})
            gsap.to(cursorShapeIn, 0.75, { background: colorCursorDefault, padding: 0, ease: "Power3.easeOut"})
            gsap.to(cursorShapeOut, 0.25, { opacity: 1,  delay: 0.25, ease: "Power3.easeOut"})
            gsap.to(indicClickOnPlane, 0.75, { scale: 0, ease: "Power3.easeOut"})
            indicClickOnPlane.classList.remove("planeHover")
        }
    }
});

planeMesh14.on('mouseover', function(ev) {
    if (ev && (hoverPlane && (planeAxe.position.y <= -17 && planeAxe.position.y >= -17.5 || planeAxe.position.y <= -16.5 && planeAxe.position.y >= -17))) {
        console.log(ev.intersects)
        gsap.to(materialPlane14.uniforms.alpha, 0.75, { value: 1.0, ease: "Power3.easeOut" })
        gsap.to(materialPlane14.uniforms.dispFactor, 0.75, { value: 1.0, ease: "Power3.easeOut" });
        if (!window.matchMedia("(max-width: 1024px)").matches) {
            gsap.to(tailleBoulette, 0.75, { padding: 50, ease: "Power3.easeOut"})
            gsap.to(cursorShapeIn, 0.75, { background: colorCursorHover, padding: 50, ease: "Power3.easeOut"})
            gsap.to(cursorShapeOut, 0.50, { opacity: 0, ease: "Power3.easeOut"})
            gsap.to(indicClickOnPlane, .75, { scale: 1, ease: "Power3.easeOut", delay: .05})
            indicClickOnPlane.classList.add("planeHover")
        }
    }
});
planeMesh14.on('mouseout', function(ev) {
    if (ev && workshopActive == false) {
        gsap.to(materialPlane14.uniforms.alpha, 0.75, { value: planeOpacityDefault, ease: "Power3.easeOut" })
        gsap.to(materialPlane14.uniforms.dispFactor, 0.75, { value: 0.0, ease: "Power3.easeOut" });
        if (!window.matchMedia("(max-width: 1024px)").matches) {
            gsap.to(tailleBoulette, 0.75, {padding: 0, ease: "Power3.easeOut"})
            gsap.to(cursorShapeIn, 0.75, { background: colorCursorDefault, padding: 0, ease: "Power3.easeOut"})
            gsap.to(cursorShapeOut, 0.25, { opacity: 1,  delay: 0.25, ease: "Power3.easeOut"})
            gsap.to(indicClickOnPlane, 0.75, { scale: 0, ease: "Power3.easeOut"})
            indicClickOnPlane.classList.remove("planeHover")
        }
    }
});


const el = document.querySelector('canvas');
const data = {
    value: 1
};
const threshold = 20;

new TouchSweep(el, data, threshold);


el.addEventListener('swipeleft', () => {
    console.log('left')
    if (!workshopActive)
        scrollDown();
});

el.addEventListener('swiperight', () => {
    console.log('right')
    if (!workshopActive)
        scrollUp();
});

// el.addEventListener('swipedown', () => {
//     console.log('down')
//     if (!workshopActive)
//         scrollUp();
// });

// el.addEventListener('swipeup', () => {
//     console.log('up')
//     if (!workshopActive)
//         scrollDown();
// });

// el.addEventListener('tap', () => {
// });

///// PLANES CLICK /////
function plane14Click() {
    if (clickPossible && (planeAxe.position.y <= -17 && planeAxe.position.y >= -17.5 || planeAxe.position.y <= -16.5 && planeAxe.position.y >= -17)) {
        gsap.to(camera.position, 3, { z: -20, ease: "power3.inOut", delay: .75 })
        gsap.to(logo.rotation, 1.5, { z: -.725, y: 0, ease: "power3.inOut" })
        gsap.to(logo.position, 1.5, { z: -15, y: .35, ease: "power3.inOut" })
        gsap.to(logo.position, 1.5, { x: 15, ease: "power3.inOut", delay: 1.5 })
        gsap.to(materialPlane14.uniforms.alpha, 0.75, { value: 0.0, ease: "power3.inOut" });
        gsap.to(planeMesh14.scale, 0.75, { x: 1.2, y: 1.2, ease: "power3.inOut" });
        
        TweenMax.to(btnBackHome, 1, { opacity: 0, clipPath: "inset(0% 100% 0% 0%)", ease: "power3.inOut" })
        TweenMax.to(btnBackWorkshop, .75, { opacity: 1, clipPath: "inset(0% 0% 0% 0%)", delay: 2.5, ease: "power3.inOut" })

        hideTimeline()
    
        if (!window.matchMedia("(max-width: 1024px)").matches) {
            gsap.to(tailleBoulette, 0.75, {padding: 0, ease: "Power3.easeOut"})
            gsap.to(leftDoor.position, 1.5, { x: -15, ease: "power3.inOut", delay: 1.5 })
            gsap.to(rightDoor.position, 1.5, { x: 15, ease: "power3.inOut", delay: 1.5 })
            gsap.to(cursorShapeIn, 0.75, { background: colorCursorDefault, padding: 0, ease: "Power3.easeOut"})
            gsap.to(cursorShapeOut, 0.25, { opacity: 1,  delay: 0.25, ease: "Power3.easeOut"})
            gsap.to(indicClickOnPlane, 0.75, { scale: 0, ease: "Power3.easeOut"})
            indicClickOnPlane.classList.remove("planeHover")
        }

        gsap.to(workShopContainer, 1.5, { opacity: 1, ease: "Power3.easeOut", delay: 2 })
        gsap.to(contentContainer__1, 1.5, { opacity: 1, ease: "Power3.easeOut", delay: 2})
        setTimeout(function() {
            if(workshopActive)
                workShopContainer.classList.add('switchPlane');
        }, 3500)
        
        workshopActive = true
        hoverPlane = false
        clickPossible = false
    }
}
planeMesh14.on('click', function() {
    plane14Click();
})

function plane13Click() {
    if (clickPossible && (planeAxe.position.y <= -16 && planeAxe.position.y >= -16.5 || planeAxe.position.y <= -15.5 && planeAxe.position.y >= -16)) {
        gsap.to(camera.position, 3, { z: -20, ease: "power3.inOut", delay: .75 })
        gsap.to(logo.rotation, 1.5, { z: -.725, y: 0, ease: "power3.inOut" })
        gsap.to(logo.position, 1.5, { z: -15, y: .35, ease: "power3.inOut" })
        gsap.to(logo.position, 1.5, { x: 15, ease: "power3.inOut", delay: 1.5 })
        gsap.to(materialPlane13.uniforms.alpha, 0.75, { value: 0.0, ease: "power3.inOut" });
        gsap.to(planeMesh13.scale, 0.75, { x: 1.2, y: 1.2, ease: "power3.inOut" });
        
        TweenMax.to(btnBackHome, 1, { opacity: 0, clipPath: "inset(0% 100% 0% 0%)", ease: "power3.inOut" })
        TweenMax.to(btnBackWorkshop, .75, { opacity: 1, clipPath: "inset(0% 0% 0% 0%)", delay: 2.5, ease: "power3.inOut" })
        
        if (!window.matchMedia("(max-width: 1024px)").matches) {
            gsap.to(tailleBoulette, 0.75, {padding: 0, ease: "Power3.easeOut"})
            gsap.to(leftDoor.position, 1.5, { x: -15, ease: "power3.inOut", delay: 1.5 })
            gsap.to(rightDoor.position, 1.5, { x: 15, ease: "power3.inOut", delay: 1.5 })
            gsap.to(cursorShapeIn, 0.75, { background: colorCursorDefault, padding: 0, ease: "Power3.easeOut"})
            gsap.to(cursorShapeOut, 0.25, { opacity: 1,  delay: 0.25, ease: "Power3.easeOut"})
            gsap.to(indicClickOnPlane, 0.75, { scale: 0, ease: "Power3.easeOut"})
            indicClickOnPlane.classList.remove("planeHover")
        }
        workshopActive = true
        hoverPlane = false
        clickPossible = false
    }
}
planeMesh13.on('click', function() {
    plane13Click();
})

function plane12Click() {
    if (clickPossible && (planeAxe.position.y <= -15 && planeAxe.position.y >= -15.5 || planeAxe.position.y <= -14.5 && planeAxe.position.y >= -15)) {
        gsap.to(camera.position, 3, { z: -20, ease: "power3.inOut", delay: .75 })
        gsap.to(logo.rotation, 1.5, { z: -.725, y: 0, ease: "power3.inOut" })
        gsap.to(logo.position, 1.5, { z: -15, y: .35, ease: "power3.inOut" })
        gsap.to(logo.position, 1.5, { x: 15, ease: "power3.inOut", delay: 1.5 })
        gsap.to(materialPlane12.uniforms.alpha, 0.75, { value: 0.0, ease: "power3.inOut" });
        gsap.to(planeMesh12.scale, 0.75, { x: 1.2, y: 1.2, ease: "power3.inOut" });
        
        TweenMax.to(btnBackHome, 1, { opacity: 0, clipPath: "inset(0% 100% 0% 0%)", ease: "power3.inOut" })
        TweenMax.to(btnBackWorkshop, .75, { opacity: 1, clipPath: "inset(0% 0% 0% 0%)", delay: 2.5, ease: "power3.inOut" })
    
        if (!window.matchMedia("(max-width: 1024px)").matches) {
            gsap.to(tailleBoulette, 0.75, {padding: 0, ease: "Power3.easeOut"})
            gsap.to(leftDoor.position, 1.5, { x: -15, ease: "power3.inOut", delay: 1.5 })
            gsap.to(rightDoor.position, 1.5, { x: 15, ease: "power3.inOut", delay: 1.5 })
            gsap.to(cursorShapeIn, 0.75, { background: colorCursorDefault, padding: 0, ease: "Power3.easeOut"})
            gsap.to(cursorShapeOut, 0.25, { opacity: 1,  delay: 0.25, ease: "Power3.easeOut"})
            gsap.to(indicClickOnPlane, 0.75, { scale: 0, ease: "Power3.easeOut"})
            indicClickOnPlane.classList.remove("planeHover")
        }
        workshopActive = true
        hoverPlane = false
        clickPossible = false
    }
}
planeMesh12.on('click', function() {
    plane12Click();
})

function plane11Click() {
    if (clickPossible && (planeAxe.position.y <= -14 && planeAxe.position.y >= -14.5 || planeAxe.position.y <= -13.5 && planeAxe.position.y >= -14)) {
        gsap.to(camera.position, 3, { z: -20, ease: "power3.inOut", delay: .75 })
        gsap.to(logo.rotation, 1.5, { z: -.725, y: 0, ease: "power3.inOut" })
        gsap.to(logo.position, 1.5, { z: -15, y: .35, ease: "power3.inOut" })
        gsap.to(logo.position, 1.5, { x: 15, ease: "power3.inOut", delay: 1.5 })
        gsap.to(materialPlane11.uniforms.alpha, 0.75, { value: 0.0, ease: "power3.inOut" });
        gsap.to(planeMesh11.scale, 0.75, { x: 1.2, y: 1.2, ease: "power3.inOut" });
        
        TweenMax.to(btnBackHome, 1, { opacity: 0, clipPath: "inset(0% 100% 0% 0%)", ease: "power3.inOut" })
        TweenMax.to(btnBackWorkshop, .75, { opacity: 1, clipPath: "inset(0% 0% 0% 0%)", delay: 2.5, ease: "power3.inOut" })
    
        if (!window.matchMedia("(max-width: 1024px)").matches) {
            gsap.to(tailleBoulette, 0.75, {padding: 0, ease: "Power3.easeOut"})
            gsap.to(leftDoor.position, 1.5, { x: -15, ease: "power3.inOut", delay: 1.5 })
            gsap.to(rightDoor.position, 1.5, { x: 15, ease: "power3.inOut", delay: 1.5 })
            gsap.to(cursorShapeIn, 0.75, { background: colorCursorDefault, padding: 0, ease: "Power3.easeOut"})
            gsap.to(cursorShapeOut, 0.25, { opacity: 1,  delay: 0.25, ease: "Power3.easeOut"})
            gsap.to(indicClickOnPlane, 0.75, { scale: 0, ease: "Power3.easeOut"})
            indicClickOnPlane.classList.remove("planeHover")
        }
        workshopActive = true
        hoverPlane = false
        clickPossible = false
    }
}
planeMesh11.on('click', function() {
    plane11Click();
})

function plane10Click() {
    if (clickPossible && (planeAxe.position.y <= -13 && planeAxe.position.y >= -13.5 || planeAxe.position.y <= -12.5 && planeAxe.position.y >= -13)) {
        gsap.to(camera.position, 3, { z: -20, ease: "power3.inOut", delay: .75 })
        gsap.to(logo.rotation, 1.5, { z: -.725, y: 0, ease: "power3.inOut" })
        gsap.to(logo.position, 1.5, { z: -15, y: .35, ease: "power3.inOut" })
        gsap.to(logo.position, 1.5, { x: 15, ease: "power3.inOut", delay: 1.5 })
        gsap.to(materialPlane10.uniforms.alpha, 0.75, { value: 0.0, ease: "power3.inOut" });
        gsap.to(planeMesh10.scale, 0.75, { x: 1.2, y: 1.2, ease: "power3.inOut" });
        
        TweenMax.to(btnBackHome, 1, { opacity: 0, clipPath: "inset(0% 100% 0% 0%)", ease: "power3.inOut" })
        TweenMax.to(btnBackWorkshop, .75, { opacity: 1, clipPath: "inset(0% 0% 0% 0%)", delay: 2.5, ease: "power3.inOut" })
    
        if (!window.matchMedia("(max-width: 1024px)").matches) {
            gsap.to(tailleBoulette, 0.75, {padding: 0, ease: "Power3.easeOut"})
            gsap.to(leftDoor.position, 1.5, { x: -15, ease: "power3.inOut", delay: 1.5 })
            gsap.to(rightDoor.position, 1.5, { x: 15, ease: "power3.inOut", delay: 1.5 })
            gsap.to(cursorShapeIn, 0.75, { background: colorCursorDefault, padding: 0, ease: "Power3.easeOut"})
            gsap.to(cursorShapeOut, 0.25, { opacity: 1,  delay: 0.25, ease: "Power3.easeOut"})
            gsap.to(indicClickOnPlane, 0.75, { scale: 0, ease: "Power3.easeOut"})
            indicClickOnPlane.classList.remove("planeHover")
        }
        workshopActive = true
        hoverPlane = false
        clickPossible = false
    }
}
planeMesh10.on('click', function() {
    plane10Click();
})

function plane9Click() {
    if (clickPossible && (planeAxe.position.y <= -12 && planeAxe.position.y >= -12.5 || planeAxe.position.y <= -11.5 && planeAxe.position.y >= -12)) {
        gsap.to(camera.position, 3, { z: -20, ease: "power3.inOut", delay: .75 })
        gsap.to(logo.rotation, 1.5, { z: -.725, y: 0, ease: "power3.inOut" })
        gsap.to(logo.position, 1.5, { z: -15, y: .35, ease: "power3.inOut" })
        gsap.to(logo.position, 1.5, { x: 15, ease: "power3.inOut", delay: 1.5 })
        gsap.to(materialPlane9.uniforms.alpha, 0.75, { value: 0.0, ease: "power3.inOut" });
        gsap.to(planeMesh9.scale, 0.75, { x: 1.2, y: 1.2, ease: "power3.inOut" });
    
        TweenMax.to(btnBackHome, 1, { opacity: 0, clipPath: "inset(0% 100% 0% 0%)", ease: "power3.inOut" })
        TweenMax.to(btnBackWorkshop, .75, { opacity: 1, clipPath: "inset(0% 0% 0% 0%)", delay: 2.5, ease: "power3.inOut" })
    
        if (!window.matchMedia("(max-width: 1024px)").matches) {
            gsap.to(tailleBoulette, 0.75, {padding: 0, ease: "Power3.easeOut"})
            gsap.to(leftDoor.position, 1.5, { x: -15, ease: "power3.inOut", delay: 1.5 })
            gsap.to(rightDoor.position, 1.5, { x: 15, ease: "power3.inOut", delay: 1.5 })
            gsap.to(cursorShapeIn, 0.75, { background: colorCursorDefault, padding: 0, ease: "Power3.easeOut"})
            gsap.to(cursorShapeOut, 0.25, { opacity: 1,  delay: 0.25, ease: "Power3.easeOut"})
            gsap.to(indicClickOnPlane, 0.75, { scale: 0, ease: "Power3.easeOut"})
            indicClickOnPlane.classList.remove("planeHover")
        }
        workshopActive = true
        hoverPlane = false
        clickPossible = false
    }
}
planeMesh9.on('click', function() {
    plane9Click();
})

function plane8Click() {
    if (clickPossible && (planeAxe.position.y <= -11 && planeAxe.position.y >= -11.5 || planeAxe.position.y <= -11.5 && planeAxe.position.y >= -11)) {
        gsap.to(camera.position, 3, { z: -20, ease: "power3.inOut", delay: .75 })
        gsap.to(logo.rotation, 1.5, { z: -.725, y: 0, ease: "power3.inOut" })
        gsap.to(logo.position, 1.5, { z: -15, y: .35, ease: "power3.inOut" })
        gsap.to(logo.position, 1.5, { x: 15, ease: "power3.inOut", delay: 1.5 })
        gsap.to(materialPlane8.uniforms.alpha, 0.75, { value: 0.0, ease: "power3.inOut" });
        gsap.to(planeMesh8.scale, 0.75, { x: 1.2, y: 1.2, ease: "power3.inOut" });
    
        TweenMax.to(btnBackHome, 1, { opacity: 0, clipPath: "inset(0% 100% 0% 0%)", ease: "power3.inOut" })
        TweenMax.to(btnBackWorkshop, .75, { opacity: 1, clipPath: "inset(0% 0% 0% 0%)", delay: 2.5, ease: "power3.inOut" })
    
        if (!window.matchMedia("(max-width: 1024px)").matches) {
            gsap.to(tailleBoulette, 0.75, {padding: 0, ease: "Power3.easeOut"})
            gsap.to(leftDoor.position, 1.5, { x: -15, ease: "power3.inOut", delay: 1.5 })
            gsap.to(rightDoor.position, 1.5, { x: 15, ease: "power3.inOut", delay: 1.5 })
            gsap.to(cursorShapeIn, 0.75, { background: colorCursorDefault, padding: 0, ease: "Power3.easeOut"})
            gsap.to(cursorShapeOut, 0.25, { opacity: 1,  delay: 0.25, ease: "Power3.easeOut"})
            gsap.to(indicClickOnPlane, 0.75, { scale: 0, ease: "Power3.easeOut"})
            indicClickOnPlane.classList.remove("planeHover")
        }
        workshopActive = true
        hoverPlane = false
        clickPossible = false
    }
}
planeMesh8.on('click', function() {
    plane8Click();
})

function plane7Click() {
    if (clickPossible && (planeAxe.position.y <= -10 && planeAxe.position.y >= -10.5 || planeAxe.position.y <= -9.5 && planeAxe.position.y >= -10)) {
        gsap.to(camera.position, 3, { z: -20, ease: "power3.inOut", delay: .75 })
        gsap.to(logo.rotation, 1.5, { z: -.725, y: 0, ease: "power3.inOut" })
        gsap.to(logo.position, 1.5, { z: -15, y: .35, ease: "power3.inOut" })
        gsap.to(logo.position, 1.5, { x: 15, ease: "power3.inOut", delay: 1.5 })
        gsap.to(materialPlane7.uniforms.alpha, 0.75, { value: 0.0, ease: "power3.inOut" });
        gsap.to(planeMesh7.scale, 0.75, { x: 1.2, y: 1.2, ease: "power3.inOut" });
    
        TweenMax.to(btnBackHome, 1, { opacity: 0, clipPath: "inset(0% 100% 0% 0%)", ease: "power3.inOut" })
        TweenMax.to(btnBackWorkshop, .75, { opacity: 1, clipPath: "inset(0% 0% 0% 0%)", delay: 2.5, ease: "power3.inOut" })
    
        if (!window.matchMedia("(max-width: 1024px)").matches) {
            gsap.to(tailleBoulette, 0.75, {padding: 0, ease: "Power3.easeOut"})
            gsap.to(leftDoor.position, 1.5, { x: -15, ease: "power3.inOut", delay: 1.5 })
            gsap.to(rightDoor.position, 1.5, { x: 15, ease: "power3.inOut", delay: 1.5 })
            gsap.to(cursorShapeIn, 0.75, { background: colorCursorDefault, padding: 0, ease: "Power3.easeOut"})
            gsap.to(cursorShapeOut, 0.25, { opacity: 1,  delay: 0.25, ease: "Power3.easeOut"})
            gsap.to(indicClickOnPlane, 0.75, { scale: 0, ease: "Power3.easeOut"})
            indicClickOnPlane.classList.remove("planeHover")
        }
        workshopActive = true
        hoverPlane = false
        clickPossible = false
    }
}
planeMesh7.on('click', function() {
    plane7Click();
})

function plane6Click() {
    if (clickPossible && (planeAxe.position.y <= -9 && planeAxe.position.y >= -9.5 || planeAxe.position.y <= -8.5 && planeAxe.position.y >= -9)) {
        gsap.to(camera.position, 3, { z: -20, ease: "power3.inOut", delay: .75 })
        gsap.to(logo.rotation, 1.5, { z: -.725, y: 0, ease: "power3.inOut" })
        gsap.to(logo.position, 1.5, { z: -15, y: .35, ease: "power3.inOut" })
        gsap.to(logo.position, 1.5, { x: 15, ease: "power3.inOut", delay: 1.5 })
        gsap.to(materialPlane6.uniforms.alpha, 0.75, { value: 0.0, ease: "power3.inOut" });
        gsap.to(planeMesh6.scale, 0.75, { x: 1.2, y: 1.2, ease: "power3.inOut" });
    
        TweenMax.to(btnBackHome, 1, { opacity: 0, clipPath: "inset(0% 100% 0% 0%)", ease: "power3.inOut" })
        TweenMax.to(btnBackWorkshop, .75, { opacity: 1, clipPath: "inset(0% 0% 0% 0%)", delay: 2.5, ease: "power3.inOut" })
    
        if (!window.matchMedia("(max-width: 1024px)").matches) {
            gsap.to(tailleBoulette, 0.75, {padding: 0, ease: "Power3.easeOut"})
            gsap.to(leftDoor.position, 1.5, { x: -15, ease: "power3.inOut", delay: 1.5 })
            gsap.to(rightDoor.position, 1.5, { x: 15, ease: "power3.inOut", delay: 1.5 })
            gsap.to(cursorShapeIn, 0.75, { background: colorCursorDefault, padding: 0, ease: "Power3.easeOut"})
            gsap.to(cursorShapeOut, 0.25, { opacity: 1,  delay: 0.25, ease: "Power3.easeOut"})
            gsap.to(indicClickOnPlane, 0.75, { scale: 0, ease: "Power3.easeOut"})
            indicClickOnPlane.classList.remove("planeHover")
        }
        workshopActive = true
        hoverPlane = false
        clickPossible = false
    }
}
planeMesh6.on('click', function() {
    plane6Click();
})

function plane5Click() {
    if (clickPossible && (planeAxe.position.y <= -8 && planeAxe.position.y >= -8.5 || planeAxe.position.y <= -7.5 && planeAxe.position.y >= -8)) {
        gsap.to(camera.position, 3, { z: -20, ease: "power3.inOut", delay: .75 })
        gsap.to(logo.rotation, 1.5, { z: -.725, y: 0, ease: "power3.inOut" })
        gsap.to(logo.position, 1.5, { z: -15, y: .35, ease: "power3.inOut" })
        gsap.to(logo.position, 1.5, { x: 15, ease: "power3.inOut", delay: 1.5 })
        gsap.to(materialPlane5.uniforms.alpha, 0.75, { value: 0.0, ease: "power3.inOut" });
        gsap.to(planeMesh5.scale, 0.75, { x: 1.2, y: 1.2, ease: "power3.inOut" });
    
        TweenMax.to(btnBackHome, 1, { opacity: 0, clipPath: "inset(0% 100% 0% 0%)", ease: "power3.inOut" })
        TweenMax.to(btnBackWorkshop, .75, { opacity: 1, clipPath: "inset(0% 0% 0% 0%)", delay: 2.5, ease: "power3.inOut" })
    
        if (!window.matchMedia("(max-width: 1024px)").matches) {
            gsap.to(tailleBoulette, 0.75, {padding: 0, ease: "Power3.easeOut"})
            gsap.to(leftDoor.position, 1.5, { x: -15, ease: "power3.inOut", delay: 1.5 })
            gsap.to(rightDoor.position, 1.5, { x: 15, ease: "power3.inOut", delay: 1.5 })
            gsap.to(cursorShapeIn, 0.75, { background: colorCursorDefault, padding: 0, ease: "Power3.easeOut"})
            gsap.to(cursorShapeOut, 0.25, { opacity: 1,  delay: 0.25, ease: "Power3.easeOut"})
            gsap.to(indicClickOnPlane, 0.75, { scale: 0, ease: "Power3.easeOut"})
            indicClickOnPlane.classList.remove("planeHover")
        }
        workshopActive = true
        hoverPlane = false
        clickPossible = false
    }
}
planeMesh5.on('click', function() {
    plane5Click();
})

function plane4Click() {
    if (clickPossible && (planeAxe.position.y <= -7 && planeAxe.position.y >= -7.5 || planeAxe.position.y <= -6.5 && planeAxe.position.y >= -7)) {
        gsap.to(camera.position, 3, { z: -20, ease: "power3.inOut", delay: .75 })
        gsap.to(logo.rotation, 1.5, { z: -.725, y: 0, ease: "power3.inOut" })
        gsap.to(logo.position, 1.5, { z: -15, y: .35, ease: "power3.inOut" })
        gsap.to(logo.position, 1.5, { x: 15, ease: "power3.inOut", delay: 1.5 })
        gsap.to(materialPlane4.uniforms.alpha, 0.75, { value: 0.0, ease: "power3.inOut" });
        gsap.to(planeMesh4.scale, 0.75, { x: 1.2, y: 1.2, ease: "power3.inOut" });
    
        TweenMax.to(btnBackHome, 1, { opacity: 0, clipPath: "inset(0% 100% 0% 0%)", ease: "power3.inOut" })
        TweenMax.to(btnBackWorkshop, .75, { opacity: 1, clipPath: "inset(0% 0% 0% 0%)", delay: 2.5, ease: "power3.inOut" })
    
        if (!window.matchMedia("(max-width: 1024px)").matches) {
            gsap.to(tailleBoulette, 0.75, {padding: 0, ease: "Power3.easeOut"})
            gsap.to(leftDoor.position, 1.5, { x: -15, ease: "power3.inOut", delay: 1.5 })
            gsap.to(rightDoor.position, 1.5, { x: 15, ease: "power3.inOut", delay: 1.5 })
            gsap.to(cursorShapeIn, 0.75, { background: colorCursorDefault, padding: 0, ease: "Power3.easeOut"})
            gsap.to(cursorShapeOut, 0.25, { opacity: 1,  delay: 0.25, ease: "Power3.easeOut"})
            gsap.to(indicClickOnPlane, 0.75, { scale: 0, ease: "Power3.easeOut"})
            indicClickOnPlane.classList.remove("planeHover")
        }
        workshopActive = true
        hoverPlane = false
        clickPossible = false
    }
}
planeMesh4.on('click', function() {
    plane4Click();
})

function plane3Click() {
    if (clickPossible && (planeAxe.position.y <= -6 && planeAxe.position.y >= -6.5 || planeAxe.position.y <= -5.5 && planeAxe.position.y >= -6)) {
        gsap.to(camera.position, 3, { z: -20, ease: "power3.inOut", delay: .75 })
        gsap.to(logo.rotation, 1.5, { z: -.725, y: 0, ease: "power3.inOut" })
        gsap.to(logo.position, 1.5, { z: -15, y: .35, ease: "power3.inOut" })
        gsap.to(logo.position, 1.5, { x: 15, ease: "power3.inOut", delay: 1.5 })
        gsap.to(materialPlane3.uniforms.alpha, 0.75, { value: 0.0, ease: "power3.inOut" });
        gsap.to(planeMesh3.scale, 0.75, { x: 1.2, y: 1.2, ease: "power3.inOut" });
    
        TweenMax.to(btnBackHome, 1, { opacity: 0, clipPath: "inset(0% 100% 0% 0%)", ease: "power3.inOut" })
        TweenMax.to(btnBackWorkshop, .75, { opacity: 1, clipPath: "inset(0% 0% 0% 0%)", delay: 2.5, ease: "power3.inOut" })
    
        if (!window.matchMedia("(max-width: 1024px)").matches) {
            gsap.to(tailleBoulette, 0.75, {padding: 0, ease: "Power3.easeOut"})
            gsap.to(leftDoor.position, 1.5, { x: -15, ease: "power3.inOut", delay: 1.5 })
            gsap.to(rightDoor.position, 1.5, { x: 15, ease: "power3.inOut", delay: 1.5 })
            gsap.to(cursorShapeIn, 0.75, { background: colorCursorDefault, padding: 0, ease: "Power3.easeOut"})
            gsap.to(cursorShapeOut, 0.25, { opacity: 1,  delay: 0.25, ease: "Power3.easeOut"})
            gsap.to(indicClickOnPlane, 0.75, { scale: 0, ease: "Power3.easeOut"})
            indicClickOnPlane.classList.remove("planeHover")
        }
        workshopActive = true
        hoverPlane = false
        clickPossible = false
    }
}
planeMesh3.on('click', function() {
    plane3Click();
})

function plane2Click() {
    if (clickPossible && (planeAxe.position.y <= -5 && planeAxe.position.y >= -5.5 || planeAxe.position.y <= -4.5 && planeAxe.position.y >= -5)) {
        gsap.to(camera.position, 3, { z: -20, ease: "power3.inOut", delay: .75 })
        gsap.to(logo.rotation, 1.5, { z: -.725, y: 0, ease: "power3.inOut" })
        gsap.to(logo.position, 1.5, { z: -15, y: .35, ease: "power3.inOut" })
        gsap.to(logo.position, 1.5, { x: 15, ease: "power3.inOut", delay: 1.5 })
        gsap.to(materialPlane2.uniforms.alpha, 0.75, { value: 0.0, ease: "power3.inOut" });
        gsap.to(planeMesh2.scale, 0.75, { x: 1.2, y: 1.2, ease: "power3.inOut" });
    
        TweenMax.to(btnBackHome, 1, { opacity: 0, clipPath: "inset(0% 100% 0% 0%)", ease: "power3.inOut" })
        TweenMax.to(btnBackWorkshop, .75, { opacity: 1, clipPath: "inset(0% 0% 0% 0%)", delay: 2.5, ease: "power3.inOut" })
    
        if (!window.matchMedia("(max-width: 1024px)").matches) {
            gsap.to(tailleBoulette, 0.75, {padding: 0, ease: "Power3.easeOut"})
            gsap.to(leftDoor.position, 1.5, { x: -15, ease: "power3.inOut", delay: 1.5 })
            gsap.to(rightDoor.position, 1.5, { x: 15, ease: "power3.inOut", delay: 1.5 })
            gsap.to(cursorShapeIn, 0.75, { background: colorCursorDefault, padding: 0, ease: "Power3.easeOut"})
            gsap.to(cursorShapeOut, 0.25, { opacity: 1,  delay: 0.25, ease: "Power3.easeOut"})
            gsap.to(indicClickOnPlane, 0.75, { scale: 0, ease: "Power3.easeOut"})
            indicClickOnPlane.classList.remove("planeHover")
        }
        workshopActive = true
        hoverPlane = false
        clickPossible = false
    }
}
planeMesh2.on('click', function() {
    plane2Click();
})

function plane1Click() {
    if (clickPossible && (planeAxe.position.y <= -4 && planeAxe.position.y >= -4.5 || planeAxe.position.y <= -3.5 && planeAxe.position.y >= -4)) {
        gsap.to(camera.position, 3, { z: -20, ease: "power3.inOut", delay: .75 })
        gsap.to(logo.rotation, 1.5, { z: -.725, y: 0, ease: "power3.inOut" })
        gsap.to(logo.position, 1.5, { z: -15, y: .35, ease: "power3.inOut" })
        gsap.to(logo.position, 1.5, { x: 15, ease: "power3.inOut", delay: 1.5 })
        gsap.to(materialPlane1.uniforms.alpha, 0.75, { value: 0.0, ease: "power3.inOut" });
        gsap.to(planeMesh1.scale, 0.75, { x: 1.2, y: 1.2, ease: "power3.inOut" });
    
        TweenMax.to(btnBackHome, 1, { opacity: 0, clipPath: "inset(0% 100% 0% 0%)", ease: "power3.inOut" })
        TweenMax.to(btnBackWorkshop, .75, { opacity: 1, clipPath: "inset(0% 0% 0% 0%)", delay: 2.5, ease: "power3.inOut" })
    
        if (!window.matchMedia("(max-width: 1024px)").matches) {
            gsap.to(leftDoor.position, 1.5, { x: -15, ease: "power3.inOut", delay: 1.5 })
            gsap.to(rightDoor.position, 1.5, { x: 15, ease: "power3.inOut", delay: 1.5 })
            gsap.to(tailleBoulette, 0.75, {padding: 0, ease: "Power3.easeOut"})
            gsap.to(cursorShapeIn, 0.75, { background: colorCursorDefault, padding: 0, ease: "Power3.easeOut"})
            gsap.to(cursorShapeOut, 0.25, { opacity: 1,  delay: 0.25, ease: "Power3.easeOut"})
            gsap.to(indicClickOnPlane, 0.75, { scale: 0, ease: "Power3.easeOut"})
            indicClickOnPlane.classList.remove("planeHover")
        }
        workshopActive = true
        hoverPlane = false
        clickPossible = false
    }
}
planeMesh1.on('click', function() {
    plane1Click();
})


/////// BACKHOME BUTTON EVENTS ///////
function functionBtnBackHome() {
    
    workshopActive = false
    homeActive = true;

    gsap.to(materialPlane1.uniforms.alpha, 0.75, { value: 1.0, ease: "power3.inOut" });
    gsap.to(materialPlane2.uniforms.alpha, 0.75, { value: 1.0, ease: "power3.inOut" });
    gsap.to(materialPlane3.uniforms.alpha, 0.75, { value: 1.0, ease: "power3.inOut" });
    gsap.to(materialPlane4.uniforms.alpha, 0.75, { value: 1.0, ease: "power3.inOut" });
    gsap.to(materialPlane5.uniforms.alpha, 0.75, { value: 1.0, ease: "power3.inOut" });
    gsap.to(materialPlane6.uniforms.alpha, 0.75, { value: 1.0, ease: "power3.inOut" });
    gsap.to(materialPlane7.uniforms.alpha, 0.75, { value: 1.0, ease: "power3.inOut" });
    gsap.to(materialPlane8.uniforms.alpha, 0.75, { value: 1.0, ease: "power3.inOut" });
    gsap.to(materialPlane9.uniforms.alpha, 0.75, { value: 1.0, ease: "power3.inOut" });
    gsap.to(materialPlane10.uniforms.alpha, 0.75, { value: 1.0, ease: "power3.inOut" });
    gsap.to(materialPlane11.uniforms.alpha, 0.75, { value: 1.0, ease: "power3.inOut" });
    gsap.to(materialPlane12.uniforms.alpha, 0.75, { value: 1.0, ease: "power3.inOut" });
    gsap.to(materialPlane13.uniforms.alpha, 0.75, { value: 1.0, ease: "power3.inOut" });
    gsap.to(materialPlane14.uniforms.alpha, 0.75, { value: 1.0, ease: "power3.inOut" });

    TweenMax.to(".spanContainerDiscord span", { duration: 0.75, opacity: .6, stagger: { each: 0.07, from: 'random' }, ease: "power2.inOut", delay: 1.25 })
    TweenMax.to(".spanContainerIut span", { duration: 0.75, opacity: .6, stagger: { each: 0.05, from: 'random' }, ease: "power2.inOut", delay: 1.25 })

    setTimeout(function() {
        discordContainer.classList.remove('close')
        iutContainer.classList.remove('close')
    }, 3000)

    canvas.classList.remove('hologramDefault')
    canvas.classList.add('hologramActive')
    btnBackHome.classList.add('close')
    btnBackHome.disabled = true;
    
    setTimeout(function(){
        btnStart.disabled = false;
        btnStart.classList.remove('close')
        littleTitleSvg.classList.add('close')
    }, 3000)

    hideTimeline()

    if (planeAxe.position.y <= -11) {
        //AXES ANIM
        gsap.to(planeAxe.position, 2.25, { y: -26.5, ease: "power3.inOut" })
        gsap.to(planeAxe.rotation, 2.25, { y: 0, ease: "power3.inOut" })
    }
    if (planeAxe.position.y > -11) {
        //AXES ANIM
        gsap.to(planeAxe.position, 2.25, { y: 7, ease: "power3.inOut" })
        gsap.to(planeAxe.rotation, 2.25, { y: -13.5 * Math.PI, ease: "power3.inOut" })
            //RESET AXES POSITION 
        gsap.to(planeAxe.position, 0, { y: -26.5, delay: 3 })
        gsap.to(planeAxe.rotation, 0, { y: 0, delay: 3 })
        gsap.to(planeAxe.scale, 0, { y: 0.0001, x: 0.0001, z: 0.0001, delay: 2 })
        gsap.to(planeAxe.scale, 0, { y: 1, x: 1, z: 1, delay: 3.1 })
    }

    //CAMERA ANIM
    if (window.matchMedia("(max-width: 600px)").matches) {
        gsap.to(camera.position, 2.95, { z: 11.3, ease: "power3.inOut" })
    } else {
        gsap.to(camera.position, 2.95, { z: 10, ease: "power3.inOut" })
    }

     //RAJOUT DES PARTICULES
     scene.add(particleMesh);
     gsap.to(particleMesh.scale, 2.95, { x: 1, y: 1, z: 1, ease: "power3.inOut" })

    //HTML ELEMENTS ANIM
    titleSvgPath.forEach(e => {
        e.classList.remove("pathTitleOut")
        e.classList.add("pathTitleIn")
    });
    titleSvgLine.classList.remove("pathLineOut")
    titleSvgLine.classList.add("pathLineIn")

    littleTitleSvgPath.forEach(e => {
        e.classList.remove("pathTitleIn")
        e.classList.add("pathTitleOut")
    });
    littleTitleSvgLine.classList.remove("pathLineIn")
    littleTitleSvgLine.classList.add("pathLineOut")

    cursorIndication.classList.remove('switch')

    TweenMax.to(btnStart, .75, { opacity: 1, clipPath: "inset(0% 0% 0% 0%)", delay: 1.75, ease: "power3.inOut" })
    TweenMax.to(homeMask, 2.95, { opacity: 1, ease: "power3.inOut" })
    TweenMax.to(btnBackHome, 1, { opacity: 0, clipPath: "inset(0% 100% 0% 0%)", ease: "power3.inOut" })
        //PLANE ROTATION Z ANIM
    gsap.to(planeMesh1.rotation, 2.25, { z: rotateZ, ease: "power3.inOut" })
    gsap.to(planeMesh2.rotation, 2.25, { z: rotateZ, ease: "power3.inOut" })
    gsap.to(planeMesh3.rotation, 2.25, { z: rotateZ, ease: "power3.inOut" })
    gsap.to(planeMesh4.rotation, 2.25, { z: rotateZ, ease: "power3.inOut" })
    gsap.to(planeMesh5.rotation, 2.25, { z: rotateZ, ease: "power3.inOut" })
    gsap.to(planeMesh6.rotation, 2.25, { z: rotateZ, ease: "power3.inOut" })
    gsap.to(planeMesh7.rotation, 2.25, { z: rotateZ, ease: "power3.inOut" })
    gsap.to(planeMesh8.rotation, 2.25, { z: rotateZ, ease: "power3.inOut" })
    gsap.to(planeMesh9.rotation, 2.25, { z: rotateZ, ease: "power3.inOut" })
    gsap.to(planeMesh10.rotation, 2.25, { z: rotateZ, ease: "power3.inOut" })
    gsap.to(planeMesh11.rotation, 2.25, { z: rotateZ, ease: "power3.inOut" })
    gsap.to(planeMesh12.rotation, 2.25, { z: rotateZ, ease: "power3.inOut" })
    gsap.to(planeMesh13.rotation, 2.25, { z: rotateZ, ease: "power3.inOut" })
    gsap.to(planeMesh14.rotation, 2.25, { z: rotateZ, ease: "power3.inOut" })
        //MODELS ANIM
    gsap.to(logo.position, 2.25, { y: -9.8, ease: "power3.inOut" })
    gsap.to(logo.scale, 2.25, { z: 0.0001, x: 0.0001, y: 0.0001, ease: "power3.inOut", })
    gsap.to(logo.rotation, 2.25, { z: -.725, y: 0, ease: "power3.inOut" })
    gsap.to(socle.position, 2.25, { y: -10.7, ease: "power3.inOut" })
    gsap.to(socle.rotation, 2.25, { y: 0, ease: "power3.inOut" })
    if (!window.matchMedia("(max-width: 1024px)").matches) {
        gsap.to(home.position, 2.95, { z: 0, x: -1.45, ease: "power3.inOut" })
        gsap.to(home.rotation, 2.95, { y: -.35, z: 0, ease: "power3.inOut" })
        gsap.to(field.scale, 2.25, { y: 0.0001, x: 0.0001, z: 0.0001, ease: "power3.inOut" })
        gsap.to(field.position, 2.25, { y: -53, ease: "power3.inOut" })
        gsap.to(leftWall.position, 2.25, { x: -51.2, ease: "power3.inOut" })
        gsap.to(leftWall.scale, 2.25, { x: 0.0001, y: 0.0001, z: 0.0001, ease: "power3.inOut" })
        gsap.to(rightWall.position, 2.25, { x: 58.8, ease: "power3.inOut" })
        gsap.to(rightWall.scale, 2.25, { x: 0.0001, y: 0.0001, z: 0.0001, ease: "power3.inOut" })
        gsap.to(leftDoor.position, 2.25, { y: -55.8, ease: "power3.inOut" })
        gsap.to(rightDoor.position, 2.25, { y: -55.8, ease: "power3.inOut" })
        gsap.to(leftDoor.scale, 2.25, { x: 0.0001, y: 0.0001, z: 0.0001, ease: "power3.inOut" })
        gsap.to(rightDoor.scale, 2.25, { x: 0.0001, y: 0.0001, z: 0.0001, ease: "power3.inOut" })
        gsap.to(sign.scale, 2.25, { x: 0.0001, y: 0.0001, z: 0.0001, ease: "power3.inOut" })
        gsap.to(table.scale, 2.25, { x: 0.0001, y: 0.0001, z: 0.0001, ease: "power3.inOut" })
        gsap.to(pylone5.scale, 2.25, { x: 0.0001, y: 0.0001, z: 0.0001, ease: "power3.inOut" })
        gsap.to(pylone4.scale, 2.1, { x: 0.0001, y: 0.0001, z: 0.0001, ease: "power3.inOut", delay: .15 })
        gsap.to(pylone3.scale, 1.95, { x: 0.0001, y: 0.0001, z: 0.0001, ease: "power3.inOut", delay: .3 })
        gsap.to(pylone2.scale, 1.8, { x: 0.0001, y: 0.0001, z: 0.0001, ease: "power3.inOut", delay: .45 })
        gsap.to(pylone.scale, 1.65, { x: 0.0001, y: 0.0001, z: 0.0001, ease: "power3.inOut", delay: .6 })
        gsap.to(grid.scale, 2.25, { x: 0.0001, y: 0.0001, z: 0.0001, ease: "power3.inOut" })
        gsap.to(grid2.scale, 2.1, { x: 0.0001, y: 0.0001, z: 0.0001, ease: "power3.inOut", delay: .15 })
        gsap.to(grid3.scale, 1.95, { x: 0.0001, y: 0.0001, z: 0.0001, ease: "power3.inOut", delay: .3 })
        gsap.to(grid4.scale, 1.8, { x: 0.0001, y: 0.0001, z: 0.0001, ease: "power3.inOut", delay: .45 })
        gsap.to(grid5.scale, 1.65, { x: 0.0001, y: 0.0001, z: 0.0001, ease: "power3.inOut", delay: .6 })
        gsap.to(poutre.scale, 2.25, { x: 0.0001, y: 0.0001, z: 0.0001, ease: "power3.inOut" })
        gsap.to(street.scale, 0, { x: 0.0001, y: 0.0001, z: 0.0001 })
        gsap.to(leftDoor2.scale, 0, { x: 0.0001, y: 0.0001, z: 0.0001, ease: "power3.inOut" })
        gsap.to(rightDoor2.scale, 0, { x: 0.0001, y: 0.0001, z: 0.0001, ease: "power3.inOut" })
        gsap.to(cam.scale, 1.65, { x: 0.0001, y: 0.0001, z: 0.0001, ease: "power3.inOut", delay: .6 })
        gsap.to(vr2.scale, 1.95, { x: 0.0001, y: 0.0001, z: 0.0001, ease: "power3.inOut", delay: .3 })
        gsap.to(enceinte.scale, 2.25, { x: 0.0001, y: 0.0001, z: 0.0001, ease: "power3.inOut" })
        gsap.to(tv2.scale, 1.65, { x: 0.0001, y: 0.0001, z: 0.0001, ease: "power3.inOut", delay: .6})
        gsap.to(tabProg.scale, 1.95, { x: 0.0001, y: 0.0001, z: 0.0001, ease: "power3.inOut", delay: .3})
        gsap.to(tv.scale, 2.25, { x: 0.0001, y: 0.0001, z: 0.0001, ease: "power3.inOut"})
    }
        //LIGHTS ANIM
    TweenMax.to(lightCenterSocle.color, .75, { r: cyanColorReset.r, g: cyanColorReset.g, b: cyanColorReset.b, delay: .75 });
    TweenMax.to(lightCenter.color, .75, { r: cyanColorReset.r, g: cyanColorReset.g, b: cyanColorReset.b, delay: .75 });
    //SWITCH ELEMENTS ON CLICK
    canvas.style.zIndex = -1;
    homeContainer.style.zIndex = 2;
    homeMask.style.zIndex = 1;
}

function revealTimeline(){
    TweenMax.to(workShopButton, 1, {  x: 0, opacity: 1, webkitFilter: 'blur(0)', stagger: { each: 0.03, from: "edges" }, ease: "power3.inOut", delay: 2 })
    TweenMax.to(timelineIndication,1, { opacity: 1,  webkitFilter: 'blur(0)', ease: "power3.inOut", delay: 2.5 });
    setTimeout(function(){
        containerTimeline.classList.add('switch');
    }, 4000)
}

function hideTimeline(){
    TweenMax.to(workShopButton, 1, {  x: '25%', opacity: 0, webkitFilter: 'blur(2px)', stagger: { each: 0.03, from: "center" }, ease: "power3.inOut" })
    TweenMax.to(timelineIndication,1, { opacity: 0,  webkitFilter: 'blur(2px)', ease: "power3.inOut" });
    setTimeout(function(){
        containerTimeline.classList.remove('switch');
    }, 1000)
}

///// START BUTTON EVENTS /////
function functionBtnStart() {
    homeActive = false;

    //HTML ELEMENTS ANIM
    titleSvgPath.forEach(e => {
        e.classList.remove("pathTitleIn")
        e.classList.add("pathTitleOut")
    });
    titleSvgLine.classList.remove("pathLineIn")
    titleSvgLine.classList.add("pathLineOut")

    littleTitleSvgPath.forEach(e => {
        e.classList.add("pathTitleIn")
        e.classList.remove("pathTitleOut")
    });
    littleTitleSvgLine.classList.remove("pathLineOut")
    littleTitleSvgLine.classList.add("pathLineIn")

    canvas.classList.remove('hologramActive')
    canvas.classList.add('hologramDefault')

    btnStart.classList.add('close')
    btnStart.disabled = true;

    setTimeout(function(){
        btnBackHome.disabled = false;
        btnBackHome.classList.remove('close')
        littleTitleSvg.classList.remove('close')
    }, 4000)

    TweenMax.to(btnStart, 1.7, { opacity: 0, clipPath: "inset(0% 0% 0% 100%)", ease: "power3.inOut" })
    TweenMax.to(homeMask, 3, { opacity: 0, ease: "power3.inOut" })

    revealTimeline()

    TweenMax.to(".spanContainerDiscord span", { duration: 0.75, opacity: .0, stagger: { each: 0.07, from: 'random' }, ease: "power2.inOut" })
    TweenMax.to(".spanContainerIut span", { duration: 0.75, opacity: .0, stagger: { each: 0.05, from: 'random' }, ease: "power2.inOut" })

    discordContainer.classList.add('close')
    iutContainer.classList.add('close')

    setTimeout(function() {
    // SUPPRESSIONS DES PARTICULES
    setTimeout(function(){
        scene.remove(scene.getObjectByName("ParticleObjects"));
    }, 3000)
    gsap.to(particleMesh.scale, 3, { x: 8, y: 8, z: 8, ease: "power3.inOut" })
        //AXES ANIM
        gsap.to(planeAxe.position, 1.5, { y: -17, ease: "power3.inOut", delay: 1.25 })
        gsap.to(planeAxe.rotation, 1.5, { y: -3.5 * Math.PI, ease: "power3.inOut", delay: 1.25 })
        
            //CAMERA ANIM
        if (window.matchMedia("(max-width: 600px)").matches) {
            gsap.to(camera.position, 3, { z: 4.5, ease: "power3.inOut" })
        } else {
            gsap.to(camera.position, 3, { z: 3.7, ease: "power3.inOut" })
        }
        TweenMax.to(btnBackHome, 1.3, { opacity: 1, clipPath: "inset(0% 0% 0% 0%)", delay: 1.75, ease: "power3.inOut" })
            //PLANE ROTATION Z ANIM
        gsap.to(planeMesh1.rotation, 1.5, { z: rotateZ, ease: "power3.inOut", delay: 1.25 })
        gsap.to(planeMesh2.rotation, 1.5, { z: rotateZ, ease: "power3.inOut", delay: 1.25 })
        gsap.to(planeMesh3.rotation, 1.5, { z: rotateZ, ease: "power3.inOut", delay: 1.25 })
        gsap.to(planeMesh4.rotation, 1.5, { z: rotateZ, ease: "power3.inOut", delay: 1.25 })
        gsap.to(planeMesh5.rotation, 1.5, { z: rotateZ, ease: "power3.inOut", delay: 1.25 })
        gsap.to(planeMesh6.rotation, 1.5, { z: rotateZ, ease: "power3.inOut", delay: 1.25 })
        gsap.to(planeMesh7.rotation, 1.5, { z: rotateZ, ease: "power3.inOut", delay: 1.25 })
        gsap.to(planeMesh8.rotation, 1.5, { z: rotateZ, ease: "power3.inOut", delay: 1.25 })
        gsap.to(planeMesh9.rotation, 1.5, { z: rotateZ, ease: "power3.inOut", delay: 1.25 })
        gsap.to(planeMesh10.rotation, 1.5, { z: rotateZ, ease: "power3.inOut", delay: 1.25 })
        gsap.to(planeMesh11.rotation, 1.5, { z: rotateZ, ease: "power3.inOut", delay: 1.25 })
        gsap.to(planeMesh12.rotation, 1.5, { z: rotateZ, ease: "power3.inOut", delay: 1.25 })
        gsap.to(planeMesh13.rotation, 1.5, { z: rotateZ, ease: "power3.inOut", delay: 1.25 })
        gsap.to(planeMesh14.rotation, 1.5, { z: 0, ease: "power3.inOut" })
            //MODELS ANIM
        gsap.to(logo.position, 3, { y: 0, ease: "power3.inOut" })
        gsap.to(logo.scale, 3, { z: .95, x: .95, y: .95, ease: "power3.inOut", delay: .25 })
        gsap.to(logo.rotation, 3, { z: 0.25, ease: "power3.inOut" })
        gsap.to(socle.position, 3, { y: -2.5, ease: "power3.inOut" })
        gsap.to(socle.rotation, 3, { y: -Math.PI, ease: "power3.inOut" })
        if (!window.matchMedia("(max-width: 1024px)").matches) {
            gsap.to(home.position, 3, { z: 105, x: 20, ease: "power3.inOut" })
            gsap.to(home.rotation, 3, { y: -Math.PI, z: Math.PI, ease: "power3.inOut" })
            gsap.to(field.scale, 3, { y: 110, x: 110, z: 110, ease: "power3.inOut" })
            gsap.to(field.position, 3, { y: -5.1, ease: "power3.inOut" })
            gsap.to(leftWall.position, 3, { x: -1.2, ease: "power3.inOut" })
            gsap.to(leftWall.scale, 3, { y: 140, x: 110, z: 110, ease: "power3.inOut" })
            gsap.to(rightWall.position, 3, { x: -1.2, ease: "power3.inOut" })
            gsap.to(rightWall.scale, 3, { y: 140, x: 110, z: 110, ease: "power3.inOut" })
            gsap.to(leftDoor.position, 3, { y: -5.8, ease: "power3.inOut" })
            gsap.to(rightDoor.position, 3, { y: -5.8, ease: "power3.inOut" })
            gsap.to(leftDoor.scale, 3, { x: 110, y: 110, z: 110, ease: "power3.inOut" })
            gsap.to(rightDoor.scale, 3, { x: 110, y: 110, z: 110, ease: "power3.inOut" })
            gsap.to(sign.scale, 3, { x: 100, y: 100, z: 100, ease: "power3.inOut" })
            gsap.to(table.scale, 3, { x: 110, y: 110, z: 110, ease: "power3.inOut" })
            gsap.to(cam.scale, 3, { x: 14, y: 14, z: 14, ease: "power3.inOut" })
            gsap.to(vr2.scale, 2.7, { x: 75, y: 75, z: 75, ease: "power3.inOut", delay: .3 })
            gsap.to(enceinte.scale, 2.4, { x: 1, y: 1, z: 1, ease: "power3.inOut", delay: .6 })
            gsap.to(tv2.scale, 3, { x: 95, y: 95, z: 65, ease: "power3.inOut"})
            gsap.to(tabProg.scale, 2.7, { x: 95, y: 95, z: 95, ease: "power3.inOut", delay: .3})
            gsap.to(tv.scale, 2.4, { x: 95, y: 95, z: 95, ease: "power3.inOut", delay: .6})
            gsap.to(pylone.scale, 3, { x: 110, y: 80, z: 110, ease: "power3.inOut" })
            gsap.to(pylone2.scale, 2.85, { x: 110, y: 80, z: 110, ease: "power3.inOut", delay: .15 })
            gsap.to(pylone3.scale, 2.7, { x: 110, y: 80, z: 110, ease: "power3.inOut", delay: .3 })
            gsap.to(pylone4.scale, 2.55, { x: 110, y: 80, z: 110, ease: "power3.inOut", delay: .45 })
            gsap.to(pylone5.scale, 2.4, { x: 110, y: 80, z: 110, ease: "power3.inOut", delay: .6 })
            gsap.to(grid5.scale, 3, { x: 110, y: 80, z: 110, ease: "power3.inOut" })
            gsap.to(grid4.scale, 2.85, { x: 110, y: 80, z: 110, ease: "power3.inOut", delay: .15 })
            gsap.to(grid3.scale, 2.7, { x: 110, y: 80, z: 110, ease: "power3.inOut", delay: .3 })
            gsap.to(grid2.scale, 2.55, { x: 110, y: 80, z: 110, ease: "power3.inOut", delay: .45 })
            gsap.to(grid.scale, 2.4, { x: 110, y: 80, z: 110, ease: "power3.inOut", delay: .6 })
            gsap.to(poutre.scale, 3, { x: 90, y: 100, z: 100, ease: "power3.inOut" })
            gsap.to(street.scale, 0, { x: 110, y: 110, z: 110, delay: 3.1 })
            gsap.to(leftDoor2.scale, 0, { x: 110, y: 110, z: 110, ease: "power3.inOut", delay: 3.1 })
            gsap.to(rightDoor2.scale, 0, { x: 110, y: 110, z: 110, ease: "power3.inOut", delay: 3.1 })
        }
            //LIGHTS ANIM
        TweenMax.to(lightCenterSocle.color, .75, { r: cyanColor.r, g: cyanColor.g, b: cyanColor.b, delay: 1 });
        TweenMax.to(lightCenter.color, .75, { r: cyanColor.r, g: cyanColor.g, b: cyanColor.b, delay: 1 });
        //SWITCH ELEMENTS ON CLICK  
        setTimeout(function() {
            canvas.style.zIndex = 1;
            homeContainer.style.zIndex = -1;
            homeMask.style.zIndex = -1;
            setTimeout(function(){
                cursorIndication.classList.add('switch')
            },1100)
        }, 1500)
    }, 1000)
}


btnStart.addEventListener('click', function() {
    functionBtnStart();
    TweenMax.to(".spanContainerStartMouseover span", { duration: .5, translateY: 0, stagger: { each: 0.01, from: "center" }, ease: "power3.inOut" });
    TweenMax.to(".spanContainerStartMouseout span", { duration: .5, translateY: 40, stagger: { each: 0.01, from: "center" }, ease: "power3.inOut" });
    TweenMax.to(btnStart, { color: "#4cc9f0", background: "#09021e", ease: "power3.inOut" });

    handleMouseLeave();
    btnStart.classList.remove('hover')
    cursorShapeIn.classList.remove('mouseover');
    setTimeout(function() {
        spanContainerStartMouseOut.classList.remove('neonText');
    }, 750)
})

btnStart.addEventListener('mouseenter', function() {
    TweenMax.to(".spanContainerStartMouseover span", { duration: .5, translateY: -40, stagger: { each: 0.01, from: "center" }, ease: "power3.inOut" });
    TweenMax.to(".spanContainerStartMouseout span", { duration: .5, translateY: 0, stagger: { each: 0.01, from: "center" }, ease: "power3.inOut" });
    TweenMax.to(btnStart, { color: "#09021e", background: "#4cc9f0", ease: "power3.inOut" });
    btnStart.classList.add('hover')
    spanContainerStartMouseOut.classList.add('neonText');
    cursorShapeIn.classList.add('mouseover');
})

btnStart.addEventListener('mouseleave', function() {
    TweenMax.to(".spanContainerStartMouseover span", { duration: .5, translateY: 0, stagger: { each: 0.01, from: "center" }, ease: "power3.inOut" });
    TweenMax.to(".spanContainerStartMouseout span", { duration: .5, translateY: 40, stagger: { each: 0.01, from: "center" }, ease: "power3.inOut" });
    TweenMax.to(btnStart, { color: "#4cc9f0", background: "#09021e", ease: "power3.inOut" });
    btnStart.classList.remove('hover')
    spanContainerStartMouseOut.classList.remove('neonText');
    cursorShapeIn.classList.remove('mouseover');
})

btnBackHome.addEventListener('click', function() {
    functionBtnBackHome();
    TweenMax.to(".spanContainerBackMouseover span", { duration: .5, translateY: 0, stagger: { each: 0.01, from: "center" }, ease: "power3.inOut" });
    TweenMax.to(".spanContainerBackMouseout span", { duration: .5, translateY: 40, stagger: { each: 0.01, from: "center" }, ease: "power3.inOut" });
    TweenMax.to(btnBackHome, { color: "#4cc9f0", background: "#09021e", ease: "power3.inOut" });

    handleMouseLeave();
    btnBackHome.classList.remove('hover')
    setTimeout(function() {
        spanContainerBackMouseOut.classList.remove('neonText');
    }, 750)
})

btnBackHome.addEventListener('mouseenter', function() {
    TweenMax.to(".spanContainerBackMouseover span", { duration: .5, translateY: -40, stagger: .027, ease: "power3.inOut" });
    TweenMax.to(".spanContainerBackMouseout span", { duration: .5, translateY: 0, stagger: .027, ease: "power3.inOut" });
    TweenMax.to(btnBackHome, { color: "#09021e", background: "#4cc9f0", ease: "power3.inOut" });
    btnBackHome.classList.add('hover')
    spanContainerBackMouseOut.classList.add('neonText');
    cursorShapeIn.classList.add('mouseover');
})

btnBackHome.addEventListener('mouseleave', function() {
    TweenMax.to(".spanContainerBackMouseover span", { duration: .5, translateY: 0, stagger: .027, ease: "power3.inOut" });
    TweenMax.to(".spanContainerBackMouseout span", { duration: .5, translateY: 40, stagger: .027, ease: "power3.inOut" });
    TweenMax.to(btnBackHome, { color: "#4cc9f0", background: "#09021e", ease: "power3.inOut" });
    btnBackHome.classList.remove('hover')
    spanContainerBackMouseOut.classList.remove('neonText');
    cursorShapeIn.classList.remove('mouseover');
})

function backToPlane() {
    let varDelay = .0
    let taillePopUpSplit = contentContainer__1.scrollHeight / 4
    if (camera.position.z >= -106 && contentContainer__1.scrollTop >= taillePopUpSplit * 2 && contentContainer__1.scrollTop < taillePopUpSplit * 3) {
        varDelay = .75
        gsap.to(contentContainer__1, 3, { opacity: 0, ease: "Power3.easeOut", delay: 0.25})
        console.log("loin")
    } else if (contentContainer__1.scrollTop < taillePopUpSplit * 2 && contentContainer__1.scrollTop >= taillePopUpSplit) {
        varDelay = .50
        gsap.to(contentContainer__1, 3, { opacity: 0, ease: "Power3.easeOut", delay: 0.25})
        console.log("milieu")
    } else {
        gsap.to(contentContainer__1, 3, { opacity: 0, ease: "Power3.easeOut", delay: 0.25})
    }

    if (!window.matchMedia("(max-width: 1024px)").matches) {
        gsap.to(leftDoor.position, 1.5, { x: .3, ease: "power3.inOut", delay: 0.75 + varDelay })
        gsap.to(rightDoor.position, 1.5, { x: .3, ease: "power3.inOut", delay: 0.75 + varDelay })
        gsap.to(camera.position, 3 , { z: 3.7, ease: "power3.inOut" })
        setTimeout(function() {
            creditContainer.classList.remove('switchStreet')
            scrollPossible = true
        }, 1500)
    } else {
        gsap.to(camera.position, 3, { z: 4.5, ease: "power3.inOut" })
    }
    
    gsap.to(logo.position, 1.5, { x: 0, ease: "power3.inOut", delay: 0.75 + varDelay })
    gsap.to(logo.rotation, 1.5, { z: .25, ease: "power3.inOut", delay: 1.5 + varDelay })
    gsap.to(logo.position, 1.5, { z: 0, y: 0, ease: "power3.inOut", delay: 1.5 + varDelay })
    
    if (materialPlane14.uniforms.alpha.value == 0) {
        gsap.to(materialPlane14.uniforms.dispFactor, .0, { value: 0.0, ease: "Power3.easeOut" });
        gsap.to(materialPlane14.uniforms.alpha, 0.75, { value: 1.0, ease: "power3.inOut", delay: 2.75 });
        gsap.to(planeMesh14.scale, 0.75, { x: 1, y: 1, ease: "power3.inOut" });
    } else if (materialPlane13.uniforms.alpha.value == 0) {
        gsap.to(materialPlane13.uniforms.dispFactor, .0, { value: 0.0, ease: "Power3.easeOut" });
        gsap.to(materialPlane13.uniforms.alpha, 0.75, { value: 1.0, ease: "power3.inOut", delay: 2.75 });
        gsap.to(planeMesh13.scale, 0.75, { x: 1, y: 1, ease: "power3.inOut" });
    } else if (materialPlane13.uniforms.alpha.value == 0) {
        gsap.to(materialPlane12.uniforms.dispFactor, .0, { value: 0.0, ease: "Power3.easeOut" });
        gsap.to(materialPlane13.uniforms.alpha, 0.75, { value: 1.0, ease: "power3.inOut", delay: 2.75 });
        gsap.to(planeMesh13.scale, 0.75, { x: 1, y: 1, ease: "power3.inOut" });
    } else if (materialPlane12.uniforms.alpha.value == 0) {
        gsap.to(materialPlane12.uniforms.alpha, 0.75, { value: 1.0, ease: "power3.inOut", delay: 2.75 });
        gsap.to(planeMesh12.scale, 0.75, { x: 1, y: 1, ease: "power3.inOut" });
    } else if (materialPlane11.uniforms.alpha.value == 0) {
        gsap.to(materialPlane11.uniforms.dispFactor, .0, { value: 0.0, ease: "Power3.easeOut" });
        gsap.to(materialPlane11.uniforms.alpha, 0.75, { value: 1.0, ease: "power3.inOut", delay: 2.75 });
        gsap.to(planeMesh11.scale, 0.75, { x: 1, y: 1, ease: "power3.inOut" });
        gsap.to(materialPlane10.uniforms.dispFactor, .0, { value: 0.0, ease: "Power3.easeOut" });
    } else if (materialPlane10.uniforms.alpha.value == 0) {
        gsap.to(materialPlane10.uniforms.alpha, 0.75, { value: 1.0, ease: "power3.inOut", delay: 2.75 });
        gsap.to(planeMesh10.scale, 0.75, { x: 1, y: 1, ease: "power3.inOut" });
    } else if (materialPlane9.uniforms.alpha.value == 0) {
        gsap.to(materialPlane9.uniforms.dispFactor, .0, { value: 0.0, ease: "Power3.easeOut" });
        gsap.to(materialPlane9.uniforms.alpha, 0.75, { value: 1.0, ease: "power3.inOut", delay: 2.75 });
        gsap.to(planeMesh9.scale, 0.75, { x: 1, y: 1, ease: "power3.inOut" });
    } else if (materialPlane8.uniforms.alpha.value == 0) {
        gsap.to(materialPlane8.uniforms.dispFactor, .0, { value: 0.0, ease: "Power3.easeOut" });
        gsap.to(materialPlane8.uniforms.alpha, 0.75, { value: 1.0, ease: "power3.inOut", delay: 2.75 });
        gsap.to(planeMesh8.scale, 0.75, { x: 1, y: 1, ease: "power3.inOut" });
    } else if (materialPlane7.uniforms.alpha.value == 0) {
        gsap.to(materialPlane7.uniforms.dispFactor, .0, { value: 0.0, ease: "Power3.easeOut" });
        gsap.to(materialPlane7.uniforms.alpha, 0.75, { value: 1.0, ease: "power3.inOut", delay: 2.75 });
        gsap.to(planeMesh7.scale, 0.75, { x: 1, y: 1, ease: "power3.inOut" });
    } else if (materialPlane6.uniforms.alpha.value == 0) {
        gsap.to(materialPlane6.uniforms.dispFactor, .0, { value: 0.0, ease: "Power3.easeOut" });
        gsap.to(materialPlane6.uniforms.alpha, 0.75, { value: 1.0, ease: "power3.inOut", delay: 2.75 });
        gsap.to(planeMesh6.scale, 0.75, { x: 1, y: 1, ease: "power3.inOut" });
    } else if (materialPlane5.uniforms.alpha.value == 0) {
        gsap.to(materialPlane5.uniforms.dispFactor, .0, { value: 0.0, ease: "Power3.easeOut" });
        gsap.to(materialPlane5.uniforms.alpha, 0.75, { value: 1.0, ease: "power3.inOut", delay: 2.75 });
        gsap.to(planeMesh5.scale, 0.75, { x: 1, y: 1, ease: "power3.inOut" });
    } else if (materialPlane4.uniforms.alpha.value == 0) {
        gsap.to(materialPlane4.uniforms.dispFactor, .0, { value: 0.0, ease: "Power3.easeOut" });
        gsap.to(materialPlane4.uniforms.alpha, 0.75, { value: 1.0, ease: "power3.inOut", delay: 2.75 });
        gsap.to(planeMesh4.scale, 0.75, { x: 1, y: 1, ease: "power3.inOut" });
    } else if (materialPlane3.uniforms.alpha.value == 0) {
        gsap.to(materialPlane3.uniforms.dispFactor, .0, { value: 0.0, ease: "Power3.easeOut" });
        gsap.to(materialPlane3.uniforms.alpha, 0.75, { value: 1.0, ease: "power3.inOut", delay: 2.75 });
        gsap.to(planeMesh3.scale, 0.75, { x: 1, y: 1, ease: "power3.inOut" });
    } else if (materialPlane2.uniforms.alpha.value == 0) {
        gsap.to(materialPlane2.uniforms.dispFactor, .0, { value: 0.0, ease: "Power3.easeOut" });
        gsap.to(materialPlane2.uniforms.alpha, 0.75, { value: 1.0, ease: "power3.inOut", delay: 2.75 });
        gsap.to(planeMesh2.scale, 0.75, { x: 1, y: 1, ease: "power3.inOut" });
    } else if (materialPlane1.uniforms.alpha.value == 0) {
        gsap.to(materialPlane1.uniforms.dispFactor, .0, { value: 0.0, ease: "Power3.easeOut" });
        gsap.to(materialPlane1.uniforms.alpha, 0.75, { value: 1.0, ease: "power3.inOut", delay: 2.75 });
        gsap.to(planeMesh1.scale, 0.75, { x: 1, y: 1, ease: "power3.inOut" });
    }

    TweenMax.to(btnBackHome, 0.75, { opacity: 1, clipPath: "inset(0% 0% 0% 0%)", delay: 2.5, ease: "power3.inOut" })
    TweenMax.to(btnBackWorkshop, 1, { opacity: 0, clipPath: "inset(0% 100% 0% 0%)", ease: "power3.inOut" })
    gsap.to(workShopContainer, 1.5, { opacity: 0, ease: "Power3.easeOut", delay: 0.5 })
    workShopContainer.classList.remove('switchPlane');

    hoverPlane = true
    clickPossible = true

    setTimeout(function() {
        workshopActive = false;
        contentContainer__1.scrollTop = 0
    }, 2500)
}

function backToWorkshop() {
    if (camera.position.z <= -185) {
        let lastPosScroll = contentContainer__1.scrollTop
        contentContainer__1.scrollTop = lastPosScroll - 50
        gsap.to(camera.position, 3, { z: scrollWorkshop(contentContainer__1), ease: "power3.inOut" })
        gsap.to(leftDoor2.position, 1.5, { x: .3, ease: "power3.inOut", delay: .75 })
        gsap.to(rightDoor2.position, 1.5, { x: .3, ease: "power3.inOut", delay: .75 })
        gsap.to(creditContainer, 2.5, { opacity: 0, ease: "Power4.easeOut" })

        for (let i=1; i <= 6; i++) {
            gsap.to(".contentImg__"+i, { opacity: 0, ease: "Power3.easeOut", delay: 2.5 })
        }
        
        gsap.to(workShopContainer, 1.5, { opacity: 1, ease: "Power3.easeOut", delay: 2 })

        setTimeout(function() {
            workShopContainer.classList.add('switchPlane');
            creditActive = false;
        }, 1000)

        setTimeout(function() {
            creditContainer.classList.remove('switchStreet')
        }, 1500)
    }
}

btnBackWorkshop.addEventListener('click', function() {
    if (workshopActive && !creditActive && backPossible) {
        backToPlane();
    } else if (workshopActive && creditActive) {
        backToWorkshop();
    }

    if (!window.matchMedia("(max-width: 1024px)").matches && backPossible) {
        handleMouseLeave();
        btnBackWorkshop.classList.remove('hover')
        TweenMax.to(btnBackWorkshop, { color: "#4cc9f0", background: "#09021e", ease: "power2.inOut" });
    }

    TweenMax.to(".spanContainerBackMouseover span", { duration: .5, translateY: 0, stagger: { each: 0.01, from: "center" }, ease: "power3.inOut" });
    TweenMax.to(".spanContainerBackMouseout span", { duration: .5, translateY: 40, stagger: { each: 0.01, from: "center" }, ease: "power3.inOut" });
    setTimeout(function() {
        spanContainerBackMouseOut.classList.remove('neonText');
    }, 750)    
})

btnBackWorkshop.addEventListener('mouseenter', function() {
    TweenMax.to(".spanContainerBackWorkshopMouseover span", { duration: .5, translateY: -40, stagger: .027, ease: "power3.inOut" });
    TweenMax.to(".spanContainerBackWorkshopMouseout span", { duration: .5, translateY: 0, stagger: .027, ease: "power3.inOut" });
    TweenMax.to(btnBackWorkshop, { color: "#09021e", background: "#4cc9f0", ease: "power3.inOut" });
    btnBackWorkshop.classList.add('hover')
    spanContainerBackMouseOut.classList.add('neonText');
    cursorShapeIn.classList.add('mouseover');
})

btnBackWorkshop.addEventListener('mouseleave', function() {
    TweenMax.to(".spanContainerBackWorkshopMouseover span", { duration: .5, translateY: 0, stagger: .027, ease: "power3.inOut" });
    TweenMax.to(".spanContainerBackWorkshopMouseout span", { duration: .5, translateY: 40, stagger: .027, ease: "power3.inOut" });
    TweenMax.to(btnBackWorkshop, { color: "#4cc9f0", background: "#09021e", ease: "power3.inOut" });
    btnBackWorkshop.classList.remove('hover')
    spanContainerBackMouseOut.classList.remove('neonText');
    cursorShapeIn.classList.remove('mouseover');
})

///// BUTTON START HOVER /////
let btnStartText = "Découvrir les ateliers"
let charsTextBtnStart = btnStartText.split('')

charsTextBtnStart.forEach(letter => {
    let btnChar = document.createElement('span')
    btnChar.innerHTML = letter
    spanContainerStartMouseOver.append(btnChar)
});

charsTextBtnStart.forEach(letter => {
    let btnChar = document.createElement('span')
    btnChar.innerHTML = letter
    spanContainerStartMouseOut.append(btnChar)
});

///// BUTTON BACK HOME HOVER /////
let btnBackText = "Accueil"
let charsTextBtnBack = btnBackText.split('')

charsTextBtnBack.forEach(letter => {
    let btnChar = document.createElement('span')
    btnChar.innerHTML = letter
    spanContainerBackMouseOver.append(btnChar)
});

charsTextBtnBack.forEach(letter => {
    let btnChar = document.createElement('span')
    btnChar.innerHTML = letter
    spanContainerBackMouseOut.append(btnChar)
});

///// BUTTON BACK WORKSHOP HOVER /////
let btnBackWorkshopText = "Retour"
let charsTextBtnBackWorkshop = btnBackWorkshopText.split('')

charsTextBtnBackWorkshop.forEach(letter => {
    let btnChar = document.createElement('span')
    btnChar.innerHTML = letter
    spanContainerBackWorkshopMouseOver.append(btnChar)
});

charsTextBtnBackWorkshop.forEach(letter => {
    let btnChar = document.createElement('span')
    btnChar.innerHTML = letter
    spanContainerBackWorkshopMouseOut.append(btnChar)
});

///// BUTTON DISCORD /////
let btnDiscordText = "Discord"
let charsTextDiscord = btnDiscordText.split('')

charsTextDiscord.forEach(letter => {
    let btnChar = document.createElement('span')
    btnChar.innerHTML = letter
    discordSpanContainer.append(btnChar)
});

///// BUTTON IUT /////
let btnIutText = "Site Officiel"
let charsTextIut = btnIutText.split('')

charsTextIut.forEach(letter => {
    let btnChar = document.createElement('span')
    btnChar.innerHTML = letter
    iutSpanContainer.append(btnChar)
});

///// WORKSHOP TIMELINE /////
containerTimeline.addEventListener('mouseenter', function() {
        TweenMax.to(workShopButton, { duration: .25, clipPath: "inset(0% 0% 0% 0%)", stagger: 0.013, ease: "power3.inOut" });
        TweenMax.to(workShopButtonMask, { duration: .25, width: "100%", stagger: 0.013, ease: "power3.inOut" });
        TweenMax.to(workShopButtonMask, { duration: .25, width: "2px", stagger: 0.013, ease: "power3.inOut", delay: .5 });
        TweenMax.to(containerTimeline, { duration: .25, clipPath: "inset(0% 0% 0% 0%)", ease: "power3.inOut" });
        TweenMax.to(timelineIndication, { duration: .25, opacity: 0,  webkitFilter: 'blur(2px)', ease: "power4.inOut" });
})

containerTimeline.addEventListener('mouseleave', function() {
    TweenMax.to(workShopButton, { duration: .25, clipPath: "inset(0% 0% 0% 99%)", stagger: 0.013, ease: "power3.inOut" });
    TweenMax.to(workShopButtonMask, { duration: .25, width: "100%", stagger: 0.013, ease: "power3.inOut" });
    TweenMax.to(workShopButtonMask, { duration: .25, width: "2px", stagger: 0.013, ease: "power3.inOut", delay: .4 });
    TweenMax.to(containerTimeline, { duration: .25, clipPath: "inset(0% 0% 0% 70%)", ease: "power3.inOut" });
    if(camera.position.z == 3.7){
    TweenMax.to(timelineIndication, { duration: .4, opacity: 1,  webkitFilter: 'blur(0)', ease: "power4.inOut" });
    }
})

/////// SM HOVER ///////
sm1.classList.add('mouseout')
sm2.classList.add('mouseout')
sm3.classList.add('mouseout')

sm1.addEventListener('mouseenter', function() { // POINTER SOCIAL MEDIA 6
    sm1.classList.add('mouseover')
    sm1.classList.remove('mouseout')
    sm1.classList.add('neonText')
})

sm1.addEventListener('mouseleave', function() {
    sm1.classList.add('mouseout')
    sm1.classList.remove('mouseover')
    sm1.classList.remove('neonText')
})

sm1.addEventListener('click', function() {
    window.open('https://www.facebook.com/mmi.tarbes.jpo', '_blank');
})

sm2.addEventListener('mouseenter', function() { // POINTER SOCIAL MEDIA 2
    sm2.classList.add('mouseover')
    sm2.classList.remove('mouseout')
    sm2.classList.add('neonText')
})

sm2.addEventListener('mouseleave', function() {
    sm2.classList.add('mouseout')
    sm2.classList.remove('mouseover')
    sm2.classList.remove('neonText')
})

sm2.addEventListener('click', function() {
    window.open('https://www.instagram.com/immersions_digitales_tarbes/', '_blank');
})

sm3.addEventListener('mouseenter', function() { // POINTER SOCIAL MEDIA 3
    sm3.classList.add('mouseover')
    sm3.classList.remove('mouseout')
    sm3.classList.add('neonText')
})

sm3.addEventListener('mouseleave', function() {
    sm3.classList.add('mouseout')
    sm3.classList.remove('mouseover')
    sm3.classList.remove('neonText')
})

sm3.addEventListener('click', function() {
    window.open('https://www.linkedin.com/in/immersions-digitales/', '_blank');
})

discordContainer.addEventListener('mouseenter', function() { // POINTER DISCORD
    TweenMax.to(".spanContainerDiscord span", { duration: 0.5, opacity: 1, stagger: { each: 0.07, from: 'end' }, ease: "power2.inOut" })
})

discordContainer.addEventListener('mouseleave', function() {
    TweenMax.to(".spanContainerDiscord span", { duration: 0.5, opacity: .6, stagger: { each: 0.07, from: 'end' }, ease: "power2.inOut" })
})

discordContainer.addEventListener('click', function() {
    window.open('https://discord.gg/RrT9Tv4n', '_blank');
})

iutContainer.addEventListener('mouseenter', function() { // POINTER IUT
    TweenMax.to(".spanContainerIut span", { duration: 0.5, opacity: 1, stagger: { each: 0.05, from: 'start' }, ease: "power2.inOut" })
})

iutContainer.addEventListener('mouseleave', function() {
    TweenMax.to(".spanContainerIut span", { duration: 0.5, opacity: .6, stagger: { each: 0.05, from: 'start' }, ease: "power2.inOut" })
})

iutContainer.addEventListener('click', function() {
    window.open('https://www.iut-tarbes.fr/', '_blank');
})

littleTitleSvg.addEventListener('click', function() {
    window.open('https://www.immersions-digitales.fr/', '_blank');
})

///// CUSTOM CURSOR /////
const pixelRatio = window.devicePixelRatio;

Math.dist = (dx, dy) => {
    return Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2))
}

class Cursor {
    constructor(cursor) {
        // this.container = window["cursor"];
        this.shape = cursor;
        this.translation = {
            x: 1,
            y: 1
        };
        this.mouse = {
            x: window.innerWidth / 2,
            y: window.innerHeight / 2
        };
        this.precision = 2;
        this.scale = 1;
        this.rotation = 1;
        this.friction = .500;
        this.animate();
        this.events();
    }

    events() {
        document.addEventListener('mousemove', (e) => {
            this.mouse.x = e.clientX * pixelRatio;
            this.mouse.y = e.clientY * pixelRatio;
        }, false);
    }

    animate() {
        requestAnimationFrame(this.animate.bind(this));
        this.render();
    }

    speed_morph() {
        const dist = Math.dist(this.dx, this.dy);
        const min = 1;
        const max_distance = 275;
        const total = dist / max_distance;
        return Number(Math.min(total, min).toFixed(2));
    }

    update() {
        const speed_morph = this.speed_morph(this.dx, this.dy);
        this.scale += (speed_morph - this.scale) * this.friction;

        this.translation.x += this.dx * this.friction;
        this.translation.y += this.dy * this.friction;

        this.rotation = Math.atan2(this.dy, this.dx) * 180 / Math.PI;

    }

    render() {
        this.update();
        // this.container.style.transform = 'translate3d(' + this.translation.x.toFixed(this.precision) + 'px ,' + this.translation.y.toFixed(this.precision) + 'px, 0)';
        this.shape.style.transform = 'rotate(' + this.rotation.toFixed(this.precision) + 'deg) ' + 'scale(' + (1 + this.scale) + ', ' + (1 - this.scale) + ')';
    }

    get dx() {
        return this.mouse.x - this.translation.x;
    }

    get dy() {
        return this.mouse.y - this.translation.y;
    }
}

let isStuck = false;
let mouse = {
    x: -100,
    y: -100,
};

// Just in case you need to scroll
let scrollHeight = 0;
window.addEventListener('scroll', function(e) {
    scrollHeight = window.scrollY
})

let cursorOuterOriginalState = {
    width: cursorShapeOut.getBoundingClientRect().width,
    height: cursorShapeOut.getBoundingClientRect().height,
};

btnStart.addEventListener("pointerenter", function() {
    if (homeActive) {
        handleMouseEnterBtn(btnStart);
    }
        
    btnStart.addEventListener("pointerleave", handleMouseLeave)
})

btnBackHome.addEventListener("pointerenter", function() {
    if (!homeActive) {
        handleMouseEnterBtn(btnBackHome);
    }
        
    btnBackHome.addEventListener("pointerleave", handleMouseLeave)
})

btnBackWorkshop.addEventListener("pointerenter", function() {
    if (workshopActive) {
        handleMouseEnterBtn(btnBackWorkshop);
    }
        
    btnBackWorkshop.addEventListener("pointerleave", handleMouseLeave)
})

sm.forEach(e => {
    e.addEventListener("pointerenter", handleMouseEnter);
    e.addEventListener("pointerleave", handleMouseLeave);
});

workShopButton.forEach(e => {
    e.addEventListener("pointerenter", handleMouseEnter);
    e.addEventListener("pointerleave", handleMouseLeave);
})

discordContainer.addEventListener("pointerenter", handleMouseEnter);
discordContainer.addEventListener("pointerleave", handleMouseLeave);

iutContainer.addEventListener("pointerenter", handleMouseEnter);
iutContainer.addEventListener("pointerleave", handleMouseLeave);

musicBtn.addEventListener("pointerenter", handleMouseEnter);
musicBtn.addEventListener("pointerleave", handleMouseLeave);

littleTitleSvg.addEventListener("pointerenter", handleMouseEnter);
littleTitleSvg.addEventListener("pointerleave", handleMouseLeave);

document.body.addEventListener("pointermove", updateCursorPosition);

function updateCursorPosition(e) {
    mouse.x = e.pageX;
    mouse.y = e.pageY;
}

function updateCursor() {
    let cursorInnerOriginalState = {
        width: tailleBoulette.getBoundingClientRect().width,
        height: tailleBoulette.getBoundingClientRect().height,
    };
    gsap.set(cursor, {
        x: mouse.x - cursorInnerOriginalState.width / 2,
        y: mouse.y - cursorInnerOriginalState.height / 2,
    });

    if (!isStuck) {
        gsap.to(cursorShapeOut, {
            duration: 0.15,
            x: mouse.x - cursorOuterOriginalState.width / 2,
            y: mouse.y - cursorOuterOriginalState.height / 2,
        });
    }

    requestAnimationFrame(updateCursor);
}

function handleMouseEnter(e) {
    isStuck = true;
    const targetBox = e.currentTarget.getBoundingClientRect();
    console.log(targetBox)
    gsap.to(cursorShapeOut, 0.2, {
        x: targetBox.left,
        y: targetBox.top + scrollHeight,
        width: targetBox.width,
        height: targetBox.height,
        borderRadius: 0,
        backgroundColor: "transparent",
    });
    cursorShapeIn.classList.add('mouseover');
}

function handleMouseEnterBtn(e) {
    isStuck = true;
    const targetBox = e.getBoundingClientRect();
    console.log(targetBox)
    gsap.to(cursorShapeOut, 0.2, {
        x: targetBox.left,
        y: targetBox.top + scrollHeight,
        width: targetBox.width,
        height: targetBox.height,
        borderRadius: 0,
        backgroundColor: "transparent",
    });
    cursorShapeIn.classList.add('mouseover');
}

function handleMouseLeave(e) {
    isStuck = false;
    // updateCursor();
    gsap.to(cursorShapeOut, 0.2, {
        width: cursorOuterOriginalState.width,
        height: cursorOuterOriginalState.height,
        borderRadius: "50px",
        backgroundColor: "transparent",
    });
    cursorShapeIn.classList.remove('mouseover');
}

// Indication plane hover
document.addEventListener('mousemove', e => {
    indicClickOnPlane.style.top = e.pageY - 20 / 2 + "px"
    indicClickOnPlane.style.left = e.pageX - 20 / 2 + "px"
})


/////// TIMELINE REDIRECTION ///////
workShopButton1.addEventListener('click', function() { // WORKSHOP 1
    scrollPlane1();
    if (materialPlanePanneau.uniforms.dispFactor.value >= .0 && materialPlanePanneau.uniforms.dispFactor.value <= .2) {
        materialPlanePanneau.uniforms.imagergb.value = texture14Hover
        gsap.to(materialPlanePanneau.uniforms.dispFactor, 1.5, { value: 1.0, ease: "Power3.easeOut" });
    } else {
        materialPlanePanneau.uniforms.imagebw.value = texture14Hover
        gsap.to(materialPlanePanneau.uniforms.dispFactor, 1.5, { value: .0, ease: "Power3.easeOut" });
    }
})

workShopButton2.addEventListener('click', function() { // WORKSHOP 2
    scrollPlane2();
    if (materialPlanePanneau.uniforms.dispFactor.value >= .0 && materialPlanePanneau.uniforms.dispFactor.value <= .2) {
        materialPlanePanneau.uniforms.imagergb.value = texture13Hover
        gsap.to(materialPlanePanneau.uniforms.dispFactor, 1.5, { value: 1.0, ease: "Power3.easeOut" });
    } else {
        materialPlanePanneau.uniforms.imagebw.value = texture13Hover
        gsap.to(materialPlanePanneau.uniforms.dispFactor, 1.5, { value: .0, ease: "Power3.easeOut" });
    }
})

workShopButton3.addEventListener('click', function() { // WORKSHOP 3
    scrollPlane3();
    if (materialPlanePanneau.uniforms.dispFactor.value >= .0 && materialPlanePanneau.uniforms.dispFactor.value <= .2) {
        materialPlanePanneau.uniforms.imagergb.value = texture12Hover
        gsap.to(materialPlanePanneau.uniforms.dispFactor, 1.5, { value: 1.0, ease: "Power3.easeOut" });
    } else {
        materialPlanePanneau.uniforms.imagebw.value = texture12Hover
        gsap.to(materialPlanePanneau.uniforms.dispFactor, 1.5, { value: .0, ease: "Power3.easeOut" });
    }
})

workShopButton4.addEventListener('click', function() { // WORKSHOP 4
    scrollPlane4();
    if (materialPlanePanneau.uniforms.dispFactor.value >= .0 && materialPlanePanneau.uniforms.dispFactor.value <= .2) {
        materialPlanePanneau.uniforms.imagergb.value = texture11Hover
        gsap.to(materialPlanePanneau.uniforms.dispFactor, 1.5, { value: 1.0, ease: "Power3.easeOut" });
    } else {
        materialPlanePanneau.uniforms.imagebw.value = texture11Hover
        gsap.to(materialPlanePanneau.uniforms.dispFactor, 1.5, { value: .0, ease: "Power3.easeOut" });
    }
})

workShopButton5.addEventListener('click', function() { // WORKSHOP 5
    scrollPlane5();
    if (materialPlanePanneau.uniforms.dispFactor.value >= .0 && materialPlanePanneau.uniforms.dispFactor.value <= .2) {
        materialPlanePanneau.uniforms.imagergb.value = texture10Hover
        gsap.to(materialPlanePanneau.uniforms.dispFactor, 1.5, { value: 1.0, ease: "Power3.easeOut" });
    } else {
        materialPlanePanneau.uniforms.imagebw.value = texture10Hover
        gsap.to(materialPlanePanneau.uniforms.dispFactor, 1.5, { value: .0, ease: "Power3.easeOut" });
    }
})

workShopButton6.addEventListener('click', function() { // WORKSHOP 6
    scrollPlane6();
    if (materialPlanePanneau.uniforms.dispFactor.value >= .0 && materialPlanePanneau.uniforms.dispFactor.value <= .2) {
        materialPlanePanneau.uniforms.imagergb.value = texture9Hover
        gsap.to(materialPlanePanneau.uniforms.dispFactor, 1.5, { value: 1.0, ease: "Power3.easeOut" });
    } else {
        materialPlanePanneau.uniforms.imagebw.value = texture9Hover
        gsap.to(materialPlanePanneau.uniforms.dispFactor, 1.5, { value: .0, ease: "Power3.easeOut" });
    }
})

workShopButton7.addEventListener('click', function() { // WORKSHOP 7
    scrollPlane7();
    if (materialPlanePanneau.uniforms.dispFactor.value >= .0 && materialPlanePanneau.uniforms.dispFactor.value <= .2) {
        materialPlanePanneau.uniforms.imagergb.value = texture8Hover
        gsap.to(materialPlanePanneau.uniforms.dispFactor, 1.5, { value: 1.0, ease: "Power3.easeOut" });
    } else {
        materialPlanePanneau.uniforms.imagebw.value = texture8Hover
        gsap.to(materialPlanePanneau.uniforms.dispFactor, 1.5, { value: .0, ease: "Power3.easeOut" });
    }
})

workShopButton8.addEventListener('click', function() { // WORKSHOP 8
    scrollPlane8();
    if (materialPlanePanneau.uniforms.dispFactor.value >= .0 && materialPlanePanneau.uniforms.dispFactor.value <= .2) {
        materialPlanePanneau.uniforms.imagergb.value = texture7Hover
        gsap.to(materialPlanePanneau.uniforms.dispFactor, 1.5, { value: 1.0, ease: "Power3.easeOut" });
    } else {
        materialPlanePanneau.uniforms.imagebw.value = texture7Hover
        gsap.to(materialPlanePanneau.uniforms.dispFactor, 1.5, { value: .0, ease: "Power3.easeOut" });
    }
})

workShopButton9.addEventListener('click', function() { // WORKSHOP 9
    scrollPlane9();
    if (materialPlanePanneau.uniforms.dispFactor.value >= .0 && materialPlanePanneau.uniforms.dispFactor.value <= .2) {
        materialPlanePanneau.uniforms.imagergb.value = texture6Hover
        gsap.to(materialPlanePanneau.uniforms.dispFactor, 1.5, { value: 1.0, ease: "Power3.easeOut" });
    } else {
        materialPlanePanneau.uniforms.imagebw.value = texture6Hover
        gsap.to(materialPlanePanneau.uniforms.dispFactor, 1.5, { value: .0, ease: "Power3.easeOut" });
    }
})

workShopButton10.addEventListener('click', function() { // WORKSHOP 10
    scrollPlane10();
    if (materialPlanePanneau.uniforms.dispFactor.value >= .0 && materialPlanePanneau.uniforms.dispFactor.value <= .2) {
        materialPlanePanneau.uniforms.imagergb.value = texture5Hover
        gsap.to(materialPlanePanneau.uniforms.dispFactor, 1.5, { value: 1.0, ease: "Power3.easeOut" });
    } else {
        materialPlanePanneau.uniforms.imagebw.value = texture5Hover
        gsap.to(materialPlanePanneau.uniforms.dispFactor, 1.5, { value: .0, ease: "Power3.easeOut" });
    }
})

workShopButton11.addEventListener('click', function() { // WORKSHOP 11
    scrollPlane11();
    if (materialPlanePanneau.uniforms.dispFactor.value >= .0 && materialPlanePanneau.uniforms.dispFactor.value <= .2) {
        materialPlanePanneau.uniforms.imagergb.value = texture4Hover
        gsap.to(materialPlanePanneau.uniforms.dispFactor, 1.5, { value: 1.0, ease: "Power3.easeOut" });
    } else {
        materialPlanePanneau.uniforms.imagebw.value = texture4Hover
        gsap.to(materialPlanePanneau.uniforms.dispFactor, 1.5, { value: .0, ease: "Power3.easeOut" });
    }
})

workShopButton12.addEventListener('click', function() { // WORKSHOP 12
    scrollPlane12();
    if (materialPlanePanneau.uniforms.dispFactor.value >= .0 && materialPlanePanneau.uniforms.dispFactor.value <= .2) {
        materialPlanePanneau.uniforms.imagergb.value = texture3Hover
        gsap.to(materialPlanePanneau.uniforms.dispFactor, 1.5, { value: 1.0, ease: "Power3.easeOut" });
    } else {
        materialPlanePanneau.uniforms.imagebw.value = texture3Hover
        gsap.to(materialPlanePanneau.uniforms.dispFactor, 1.5, { value: .0, ease: "Power3.easeOut" });
    }
})

workShopButton13.addEventListener('click', function() { // WORKSHOP 13
    scrollPlane13();
    if (materialPlanePanneau.uniforms.dispFactor.value >= .0 && materialPlanePanneau.uniforms.dispFactor.value <= .2) {
        materialPlanePanneau.uniforms.imagergb.value = texture2Hover
        gsap.to(materialPlanePanneau.uniforms.dispFactor, 1.5, { value: 1.0, ease: "Power3.easeOut" });
    } else {
        materialPlanePanneau.uniforms.imagebw.value = texture2Hover
        gsap.to(materialPlanePanneau.uniforms.dispFactor, 1.5, { value: .0, ease: "Power3.easeOut" });
    }
})

workShopButton14.addEventListener('click', function() { // WORKSHOP 14
    scrollPlane14();
    if (materialPlanePanneau.uniforms.dispFactor.value >= .0 && materialPlanePanneau.uniforms.dispFactor.value <= .2) {
        materialPlanePanneau.uniforms.imagergb.value = texture1Hover
        gsap.to(materialPlanePanneau.uniforms.dispFactor, 1.5, { value: 1.0, ease: "Power3.easeOut" });
    } else {
        materialPlanePanneau.uniforms.imagebw.value = texture1Hover
        gsap.to(materialPlanePanneau.uniforms.dispFactor, 1.5, { value: .0, ease: "Power3.easeOut" });
    }
})

function scrollPlane14() {
    //AXES ANIM
    gsap.to(planeAxe.position, .75, { y: -17, ease: "power3.inOut" })
    gsap.to(planeAxe.rotation, .75, { y: -3.5 * Math.PI, ease: "power3.inOut" })
        //PLANES ROTATION Z ANIM
    gsap.to(planeMesh1.rotation, .75, { z: rotateZ, ease: "power3.inOut" })
    gsap.to(planeMesh2.rotation, .75, { z: rotateZ, ease: "power3.inOut" })
    gsap.to(planeMesh3.rotation, .75, { z: rotateZ, ease: "power3.inOut" })
    gsap.to(planeMesh4.rotation, .75, { z: rotateZ, ease: "power3.inOut" })
    gsap.to(planeMesh5.rotation, .75, { z: rotateZ, ease: "power3.inOut" })
    gsap.to(planeMesh6.rotation, .75, { z: rotateZ, ease: "power3.inOut" })
    gsap.to(planeMesh7.rotation, .75, { z: rotateZ, ease: "power3.inOut" })
    gsap.to(planeMesh8.rotation, .75, { z: rotateZ, ease: "power3.inOut" })
    gsap.to(planeMesh9.rotation, .75, { z: rotateZ, ease: "power3.inOut" })
    gsap.to(planeMesh10.rotation, .75, { z: rotateZ, ease: "power3.inOut" })
    gsap.to(planeMesh11.rotation, .75, { z: rotateZ, ease: "power3.inOut" })
    gsap.to(planeMesh12.rotation, .75, { z: rotateZ, ease: "power3.inOut" })
    gsap.to(planeMesh13.rotation, .75, { z: rotateZ, ease: "power3.inOut" })
    gsap.to(planeMesh14.rotation, .75, { z: 0, ease: "power3.inOut" })
}

function scrollPlane13() {
    //AXES ANIM
    gsap.to(planeAxe.position, .75, { y: -16, ease: "power3.inOut" })
    gsap.to(planeAxe.rotation, .75, { y: -4 * Math.PI, ease: "power3.inOut" })
        //PLANE ROTATION Z ANIM
    gsap.to(planeMesh1.rotation, .75, { z: rotateZ, ease: "power3.inOut" })
    gsap.to(planeMesh2.rotation, .75, { z: rotateZ, ease: "power3.inOut" })
    gsap.to(planeMesh3.rotation, .75, { z: rotateZ, ease: "power3.inOut" })
    gsap.to(planeMesh4.rotation, .75, { z: rotateZ, ease: "power3.inOut" })
    gsap.to(planeMesh5.rotation, .75, { z: rotateZ, ease: "power3.inOut" })
    gsap.to(planeMesh6.rotation, .75, { z: rotateZ, ease: "power3.inOut" })
    gsap.to(planeMesh7.rotation, .75, { z: rotateZ, ease: "power3.inOut" })
    gsap.to(planeMesh8.rotation, .75, { z: rotateZ, ease: "power3.inOut" })
    gsap.to(planeMesh9.rotation, .75, { z: rotateZ, ease: "power3.inOut" })
    gsap.to(planeMesh10.rotation, .75, { z: rotateZ, ease: "power3.inOut" })
    gsap.to(planeMesh11.rotation, .75, { z: rotateZ, ease: "power3.inOut" })
    gsap.to(planeMesh12.rotation, .75, { z: rotateZ, ease: "power3.inOut" })
    gsap.to(planeMesh13.rotation, .75, { z: 0, ease: "power3.inOut" })
    gsap.to(planeMesh14.rotation, .75, { z: rotateZ, ease: "power3.inOut" })
}

function scrollPlane12() {
    //AXES ANIM
    gsap.to(planeAxe.position, .75, { y: -15, ease: "power3.inOut" })
    gsap.to(planeAxe.rotation, .75, { y: -4.5 * Math.PI, ease: "power3.inOut" })
        //PLANE ROTATION Z ANIM
    gsap.to(planeMesh1.rotation, .75, { z: rotateZ, ease: "power3.inOut" })
    gsap.to(planeMesh2.rotation, .75, { z: rotateZ, ease: "power3.inOut" })
    gsap.to(planeMesh3.rotation, .75, { z: rotateZ, ease: "power3.inOut" })
    gsap.to(planeMesh4.rotation, .75, { z: rotateZ, ease: "power3.inOut" })
    gsap.to(planeMesh5.rotation, .75, { z: rotateZ, ease: "power3.inOut" })
    gsap.to(planeMesh6.rotation, .75, { z: rotateZ, ease: "power3.inOut" })
    gsap.to(planeMesh7.rotation, .75, { z: rotateZ, ease: "power3.inOut" })
    gsap.to(planeMesh8.rotation, .75, { z: rotateZ, ease: "power3.inOut" })
    gsap.to(planeMesh9.rotation, .75, { z: rotateZ, ease: "power3.inOut" })
    gsap.to(planeMesh10.rotation, .75, { z: rotateZ, ease: "power3.inOut" })
    gsap.to(planeMesh11.rotation, .75, { z: rotateZ, ease: "power3.inOut" })
    gsap.to(planeMesh12.rotation, .75, { z: 0, ease: "power3.inOut" })
    gsap.to(planeMesh13.rotation, .75, { z: rotateZ, ease: "power3.inOut" })
    gsap.to(planeMesh14.rotation, .75, { z: rotateZ, ease: "power3.inOut" })
}

function scrollPlane11() {
    //AXES ANIM
    gsap.to(planeAxe.position, .75, { y: -14, ease: "power3.inOut" })
    gsap.to(planeAxe.rotation, .75, { y: -5 * Math.PI, ease: "power3.inOut" })
        //PLANES ROTATION Z ANIM
    gsap.to(planeMesh1.rotation, .75, { z: rotateZ, ease: "power3.inOut" })
    gsap.to(planeMesh2.rotation, .75, { z: rotateZ, ease: "power3.inOut" })
    gsap.to(planeMesh3.rotation, .75, { z: rotateZ, ease: "power3.inOut" })
    gsap.to(planeMesh4.rotation, .75, { z: rotateZ, ease: "power3.inOut" })
    gsap.to(planeMesh5.rotation, .75, { z: rotateZ, ease: "power3.inOut" })
    gsap.to(planeMesh6.rotation, .75, { z: rotateZ, ease: "power3.inOut" })
    gsap.to(planeMesh7.rotation, .75, { z: rotateZ, ease: "power3.inOut" })
    gsap.to(planeMesh8.rotation, .75, { z: rotateZ, ease: "power3.inOut" })
    gsap.to(planeMesh9.rotation, .75, { z: rotateZ, ease: "power3.inOut" })
    gsap.to(planeMesh10.rotation, .75, { z: rotateZ, ease: "power3.inOut" })
    gsap.to(planeMesh11.rotation, .75, { z: 0, ease: "power3.inOut" })
    gsap.to(planeMesh12.rotation, .75, { z: rotateZ, ease: "power3.inOut" })
    gsap.to(planeMesh13.rotation, .75, { z: rotateZ, ease: "power3.inOut" })
    gsap.to(planeMesh14.rotation, .75, { z: rotateZ, ease: "power3.inOut" })
}

function scrollPlane10() {
    //AXES ANIM
    gsap.to(planeAxe.position, .75, { y: -13, ease: "power3.inOut" })
    gsap.to(planeAxe.rotation, .75, { y: -5.5 * Math.PI, ease: "power3.inOut" })
        //PLANES ROTATION Z ANIM
    gsap.to(planeMesh1.rotation, .75, { z: rotateZ, ease: "power3.inOut" })
    gsap.to(planeMesh2.rotation, .75, { z: rotateZ, ease: "power3.inOut" })
    gsap.to(planeMesh3.rotation, .75, { z: rotateZ, ease: "power3.inOut" })
    gsap.to(planeMesh4.rotation, .75, { z: rotateZ, ease: "power3.inOut" })
    gsap.to(planeMesh5.rotation, .75, { z: rotateZ, ease: "power3.inOut" })
    gsap.to(planeMesh6.rotation, .75, { z: rotateZ, ease: "power3.inOut" })
    gsap.to(planeMesh7.rotation, .75, { z: rotateZ, ease: "power3.inOut" })
    gsap.to(planeMesh8.rotation, .75, { z: rotateZ, ease: "power3.inOut" })
    gsap.to(planeMesh9.rotation, .75, { z: rotateZ, ease: "power3.inOut" })
    gsap.to(planeMesh10.rotation, .75, { z: 0, ease: "power3.inOut" })
    gsap.to(planeMesh11.rotation, .75, { z: rotateZ, ease: "power3.inOut" })
    gsap.to(planeMesh12.rotation, .75, { z: rotateZ, ease: "power3.inOut" })
    gsap.to(planeMesh13.rotation, .75, { z: rotateZ, ease: "power3.inOut" })
    gsap.to(planeMesh14.rotation, .75, { z: rotateZ, ease: "power3.inOut" })  
}

function scrollPlane9() {
    //AXES ANIM
    gsap.to(planeAxe.position, .75, { y: -12, ease: "power3.inOut" })
    gsap.to(planeAxe.rotation, .75, { y: -6 * Math.PI, ease: "power3.inOut" })
        //PLANES ROTATION Z ANIM
    gsap.to(planeMesh1.rotation, .75, { z: rotateZ, ease: "power3.inOut" })
    gsap.to(planeMesh2.rotation, .75, { z: rotateZ, ease: "power3.inOut" })
    gsap.to(planeMesh3.rotation, .75, { z: rotateZ, ease: "power3.inOut" })
    gsap.to(planeMesh4.rotation, .75, { z: rotateZ, ease: "power3.inOut" })
    gsap.to(planeMesh5.rotation, .75, { z: rotateZ, ease: "power3.inOut" })
    gsap.to(planeMesh6.rotation, .75, { z: rotateZ, ease: "power3.inOut" })
    gsap.to(planeMesh7.rotation, .75, { z: rotateZ, ease: "power3.inOut" })
    gsap.to(planeMesh8.rotation, .75, { z: rotateZ, ease: "power3.inOut" })
    gsap.to(planeMesh9.rotation, .75, { z: 0, ease: "power3.inOut" })
    gsap.to(planeMesh10.rotation, .75, { z: rotateZ, ease: "power3.inOut" })
    gsap.to(planeMesh11.rotation, .75, { z: rotateZ, ease: "power3.inOut" })
    gsap.to(planeMesh12.rotation, .75, { z: rotateZ, ease: "power3.inOut" })
    gsap.to(planeMesh13.rotation, .75, { z: rotateZ, ease: "power3.inOut" })
    gsap.to(planeMesh14.rotation, .75, { z: rotateZ, ease: "power3.inOut" }) 
}

function scrollPlane8() {
    //AXES ANIM
    gsap.to(planeAxe.position, .75, { y: -11, ease: "power3.inOut" })
    gsap.to(planeAxe.rotation, .75, { y: -6.5 * Math.PI, ease: "power3.inOut" })
        //PLANES ROTATION Z ANIM
    gsap.to(planeMesh1.rotation, .75, { z: rotateZ, ease: "power3.inOut" })
    gsap.to(planeMesh2.rotation, .75, { z: rotateZ, ease: "power3.inOut" })
    gsap.to(planeMesh3.rotation, .75, { z: rotateZ, ease: "power3.inOut" })
    gsap.to(planeMesh4.rotation, .75, { z: rotateZ, ease: "power3.inOut" })
    gsap.to(planeMesh5.rotation, .75, { z: rotateZ, ease: "power3.inOut" })
    gsap.to(planeMesh6.rotation, .75, { z: rotateZ, ease: "power3.inOut" })
    gsap.to(planeMesh7.rotation, .75, { z: rotateZ, ease: "power3.inOut" })
    gsap.to(planeMesh8.rotation, .75, { z: 0, ease: "power3.inOut" })
    gsap.to(planeMesh9.rotation, .75, { z: rotateZ, ease: "power3.inOut" })
    gsap.to(planeMesh10.rotation, .75, { z: rotateZ, ease: "power3.inOut" })
    gsap.to(planeMesh11.rotation, .75, { z: rotateZ, ease: "power3.inOut" })
    gsap.to(planeMesh12.rotation, .75, { z: rotateZ, ease: "power3.inOut" })
    gsap.to(planeMesh13.rotation, .75, { z: rotateZ, ease: "power3.inOut" })
    gsap.to(planeMesh14.rotation, .75, { z: rotateZ, ease: "power3.inOut" })    
}

function scrollPlane7() {
    //AXES ANIM
    gsap.to(planeAxe.position, .75, { y: -10, ease: "power3.inOut" })
    gsap.to(planeAxe.rotation, .75, { y: -7 * Math.PI, ease: "power3.inOut" })
        //PLANES ROTATION Z ANIM
    gsap.to(planeMesh1.rotation, .75, { z: rotateZ, ease: "power3.inOut" })
    gsap.to(planeMesh2.rotation, .75, { z: rotateZ, ease: "power3.inOut" })
    gsap.to(planeMesh3.rotation, .75, { z: rotateZ, ease: "power3.inOut" })
    gsap.to(planeMesh4.rotation, .75, { z: rotateZ, ease: "power3.inOut" })
    gsap.to(planeMesh5.rotation, .75, { z: rotateZ, ease: "power3.inOut" })
    gsap.to(planeMesh6.rotation, .75, { z: rotateZ, ease: "power3.inOut" })
    gsap.to(planeMesh7.rotation, .75, { z: 0, ease: "power3.inOut" })
    gsap.to(planeMesh8.rotation, .75, { z: rotateZ, ease: "power3.inOut" })
    gsap.to(planeMesh9.rotation, .75, { z: rotateZ, ease: "power3.inOut" })
    gsap.to(planeMesh10.rotation, .75, { z: rotateZ, ease: "power3.inOut" })
    gsap.to(planeMesh11.rotation, .75, { z: rotateZ, ease: "power3.inOut" })
    gsap.to(planeMesh12.rotation, .75, { z: rotateZ, ease: "power3.inOut" })
    gsap.to(planeMesh13.rotation, .75, { z: rotateZ, ease: "power3.inOut" })
    gsap.to(planeMesh14.rotation, .75, { z: rotateZ, ease: "power3.inOut" })    
}

function scrollPlane6() {
    //AXES ANIM
    gsap.to(planeAxe.position, .75, { y: -9, ease: "power3.inOut" })
    gsap.to(planeAxe.rotation, .75, { y: -7.5 * Math.PI, ease: "power3.inOut" })
        //PLANES ROTATION Z ANIM
    gsap.to(planeMesh1.rotation, .75, { z: rotateZ, ease: "power3.inOut" })
    gsap.to(planeMesh2.rotation, .75, { z: rotateZ, ease: "power3.inOut" })
    gsap.to(planeMesh3.rotation, .75, { z: rotateZ, ease: "power3.inOut" })
    gsap.to(planeMesh4.rotation, .75, { z: rotateZ, ease: "power3.inOut" })
    gsap.to(planeMesh5.rotation, .75, { z: rotateZ, ease: "power3.inOut" })
    gsap.to(planeMesh6.rotation, .75, { z: 0, ease: "power3.inOut" })
    gsap.to(planeMesh7.rotation, .75, { z: rotateZ, ease: "power3.inOut" })
    gsap.to(planeMesh8.rotation, .75, { z: rotateZ, ease: "power3.inOut" })
    gsap.to(planeMesh9.rotation, .75, { z: rotateZ, ease: "power3.inOut" })
    gsap.to(planeMesh10.rotation, .75, { z: rotateZ, ease: "power3.inOut" })
    gsap.to(planeMesh11.rotation, .75, { z: rotateZ, ease: "power3.inOut" })
    gsap.to(planeMesh12.rotation, .75, { z: rotateZ, ease: "power3.inOut" })
    gsap.to(planeMesh13.rotation, .75, { z: rotateZ, ease: "power3.inOut" })
    gsap.to(planeMesh14.rotation, .75, { z: rotateZ, ease: "power3.inOut" })    
}

function scrollPlane5() {
    //AXES ANIM
    gsap.to(planeAxe.position, .75, { y: -8, ease: "power3.inOut" })
    gsap.to(planeAxe.rotation, .75, { y: -8 * Math.PI, ease: "power3.inOut" })
        //PLANES ROTATION Z ANIM
    gsap.to(planeMesh1.rotation, .75, { z: rotateZ, ease: "power3.inOut" })
    gsap.to(planeMesh2.rotation, .75, { z: rotateZ, ease: "power3.inOut" })
    gsap.to(planeMesh3.rotation, .75, { z: rotateZ, ease: "power3.inOut" })
    gsap.to(planeMesh4.rotation, .75, { z: rotateZ, ease: "power3.inOut" })
    gsap.to(planeMesh5.rotation, .75, { z: 0, ease: "power3.inOut" })
    gsap.to(planeMesh6.rotation, .75, { z: rotateZ, ease: "power3.inOut" })
    gsap.to(planeMesh7.rotation, .75, { z: rotateZ, ease: "power3.inOut" })
    gsap.to(planeMesh8.rotation, .75, { z: rotateZ, ease: "power3.inOut" })
    gsap.to(planeMesh9.rotation, .75, { z: rotateZ, ease: "power3.inOut" })
    gsap.to(planeMesh10.rotation, .75, { z: rotateZ, ease: "power3.inOut" })
    gsap.to(planeMesh11.rotation, .75, { z: rotateZ, ease: "power3.inOut" })
    gsap.to(planeMesh12.rotation, .75, { z: rotateZ, ease: "power3.inOut" })
    gsap.to(planeMesh13.rotation, .75, { z: rotateZ, ease: "power3.inOut" })
    gsap.to(planeMesh14.rotation, .75, { z: rotateZ, ease: "power3.inOut" })  

}

function scrollPlane4() {
    //AXES ANIM
    gsap.to(planeAxe.position, .75, { y: -7, ease: "power3.inOut" })
    gsap.to(planeAxe.rotation, .75, { y: -8.5 * Math.PI, ease: "power3.inOut" })
        //PLANES ROTATION Z ANIM
    gsap.to(planeMesh1.rotation, .75, { z: rotateZ, ease: "power3.inOut" })
    gsap.to(planeMesh2.rotation, .75, { z: rotateZ, ease: "power3.inOut" })
    gsap.to(planeMesh3.rotation, .75, { z: rotateZ, ease: "power3.inOut" })
    gsap.to(planeMesh4.rotation, .75, { z: 0, ease: "power3.inOut" })
    gsap.to(planeMesh5.rotation, .75, { z: rotateZ, ease: "power3.inOut" })
    gsap.to(planeMesh6.rotation, .75, { z: rotateZ, ease: "power3.inOut" })
    gsap.to(planeMesh7.rotation, .75, { z: rotateZ, ease: "power3.inOut" })
    gsap.to(planeMesh8.rotation, .75, { z: rotateZ, ease: "power3.inOut" })
    gsap.to(planeMesh9.rotation, .75, { z: rotateZ, ease: "power3.inOut" })
    gsap.to(planeMesh10.rotation, .75, { z: rotateZ, ease: "power3.inOut" })
    gsap.to(planeMesh11.rotation, .75, { z: rotateZ, ease: "power3.inOut" })
    gsap.to(planeMesh12.rotation, .75, { z: rotateZ, ease: "power3.inOut" })
    gsap.to(planeMesh13.rotation, .75, { z: rotateZ, ease: "power3.inOut" })
    gsap.to(planeMesh14.rotation, .75, { z: rotateZ, ease: "power3.inOut" })   
}

function scrollPlane3() {
    //AXES ANIM
    gsap.to(planeAxe.position, .75, { y: -6, ease: "power3.inOut" })
    gsap.to(planeAxe.rotation, .75, { y: -9 * Math.PI, ease: "power3.inOut" })
        //PLANES ROTATION Z ANIM
    gsap.to(planeMesh1.rotation, .75, { z: rotateZ, ease: "power3.inOut" })
    gsap.to(planeMesh2.rotation, .75, { z: rotateZ, ease: "power3.inOut" })
    gsap.to(planeMesh3.rotation, .75, { z: 0, ease: "power3.inOut" })
    gsap.to(planeMesh4.rotation, .75, { z: rotateZ, ease: "power3.inOut" })
    gsap.to(planeMesh5.rotation, .75, { z: rotateZ, ease: "power3.inOut" })
    gsap.to(planeMesh6.rotation, .75, { z: rotateZ, ease: "power3.inOut" })
    gsap.to(planeMesh7.rotation, .75, { z: rotateZ, ease: "power3.inOut" })
    gsap.to(planeMesh8.rotation, .75, { z: rotateZ, ease: "power3.inOut" })
    gsap.to(planeMesh9.rotation, .75, { z: rotateZ, ease: "power3.inOut" })
    gsap.to(planeMesh10.rotation, .75, { z: rotateZ, ease: "power3.inOut" })
    gsap.to(planeMesh11.rotation, .75, { z: rotateZ, ease: "power3.inOut" })
    gsap.to(planeMesh12.rotation, .75, { z: rotateZ, ease: "power3.inOut" })
    gsap.to(planeMesh13.rotation, .75, { z: rotateZ, ease: "power3.inOut" })
    gsap.to(planeMesh14.rotation, .75, { z: rotateZ, ease: "power3.inOut" })
}

function scrollPlane2() {
    //AXES ANIM
    gsap.to(planeAxe.position, .75, { y: -5, ease: "power3.inOut" })
    gsap.to(planeAxe.rotation, .75, { y: -9.5 * Math.PI, ease: "power3.inOut" })
        //PLANES ROTATION Z ANIM
    gsap.to(planeMesh1.rotation, .75, { z: rotateZ, ease: "power3.inOut" })
    gsap.to(planeMesh2.rotation, .75, { z: 0, ease: "power3.inOut" })
    gsap.to(planeMesh3.rotation, .75, { z: rotateZ, ease: "power3.inOut" })
    gsap.to(planeMesh4.rotation, .75, { z: rotateZ, ease: "power3.inOut" })
    gsap.to(planeMesh5.rotation, .75, { z: rotateZ, ease: "power3.inOut" })
    gsap.to(planeMesh6.rotation, .75, { z: rotateZ, ease: "power3.inOut" })
    gsap.to(planeMesh7.rotation, .75, { z: rotateZ, ease: "power3.inOut" })
    gsap.to(planeMesh8.rotation, .75, { z: rotateZ, ease: "power3.inOut" })
    gsap.to(planeMesh9.rotation, .75, { z: rotateZ, ease: "power3.inOut" })
    gsap.to(planeMesh10.rotation, .75, { z: rotateZ, ease: "power3.inOut" })
    gsap.to(planeMesh11.rotation, .75, { z: rotateZ, ease: "power3.inOut" })
    gsap.to(planeMesh12.rotation, .75, { z: rotateZ, ease: "power3.inOut" })
    gsap.to(planeMesh13.rotation, .75, { z: rotateZ, ease: "power3.inOut" })
    gsap.to(planeMesh14.rotation, .75, { z: rotateZ, ease: "power3.inOut" })    
}

function scrollPlane1() {
    //AXES ANIM
    gsap.to(planeAxe.position, .75, { y: -4, ease: "power3.inOut" })
    gsap.to(planeAxe.rotation, .75, { y: -10 * Math.PI, ease: "power3.inOut" })
        //PLANES ROTATION Z ANIM
    gsap.to(planeMesh1.rotation, .75, { z: 0, ease: "power3.inOut" })
    gsap.to(planeMesh2.rotation, .75, { z: rotateZ, ease: "power3.inOut" })
    gsap.to(planeMesh3.rotation, .75, { z: rotateZ, ease: "power3.inOut" })
    gsap.to(planeMesh4.rotation, .75, { z: rotateZ, ease: "power3.inOut" })
    gsap.to(planeMesh5.rotation, .75, { z: rotateZ, ease: "power3.inOut" })
    gsap.to(planeMesh6.rotation, .75, { z: rotateZ, ease: "power3.inOut" })
    gsap.to(planeMesh7.rotation, .75, { z: rotateZ, ease: "power3.inOut" })
    gsap.to(planeMesh8.rotation, .75, { z: rotateZ, ease: "power3.inOut" })
    gsap.to(planeMesh9.rotation, .75, { z: rotateZ, ease: "power3.inOut" })
    gsap.to(planeMesh10.rotation, .75, { z: rotateZ, ease: "power3.inOut" })
    gsap.to(planeMesh11.rotation, .75, { z: rotateZ, ease: "power3.inOut" })
    gsap.to(planeMesh12.rotation, .75, { z: rotateZ, ease: "power3.inOut" })
    gsap.to(planeMesh13.rotation, .75, { z: rotateZ, ease: "power3.inOut" })
    gsap.to(planeMesh14.rotation, .75, { z: rotateZ, ease: "power3.inOut" })  
}

///// SCROLL FUNCTIONS /////
function scrollUp() {
    if (planeAxe.position.y <= -17 && planeAxe.position.y >= -17.1) {
        homeActive = true
        //RAJOUT DES PARTICULES
     
        scene.add(particleMesh);
        gsap.to(particleMesh.scale, 2.95, { x: 1, y: 1, z: 1, ease: "power3.inOut" })

        //AXES ANIM
        gsap.to(planeAxe.position, 2.25, { y: -26.5, ease: "power3.inOut" })
        gsap.to(planeAxe.rotation, 2.25, { y: 0, ease: "power3.inOut" })
            //CAMERA ANIM
        if (window.matchMedia("(max-width: 600px)").matches) {
            gsap.to(camera.position, 2.95, { z: 11.3, ease: "power3.inOut" })
        } else {
            gsap.to(camera.position, 2.95, { z: 10, ease: "power3.inOut" })
        }
        //HTML ELEMENTS ANIM
        cursorIndication.classList.remove('switch')
        canvas.classList.remove('hologramDefault')
        canvas.classList.add('hologramActive')
        btnBackHome.disabled = true;
        btnStart.disabled = false;
        titleSvgPath.forEach(e => {
            e.classList.remove("pathTitleOut")
            e.classList.add("pathTitleIn")
        });
        titleSvgLine.classList.remove("pathLineOut")
        titleSvgLine.classList.add("pathLineIn")

        littleTitleSvgPath.forEach(e => {
            e.classList.remove("pathTitleIn")
            e.classList.add("pathTitleOut")
        });
        littleTitleSvgLine.classList.remove("pathLineIn")
        littleTitleSvgLine.classList.add("pathLineOut")

        hideTimeline()

        TweenMax.to(btnStart, .75, { opacity: 1, clipPath: "inset(0% 0% 0% 0%)", delay: 1.75, ease: "power3.inOut" })
        TweenMax.to(homeMask, 2.95, { opacity: 1, ease: "power3.inOut" })
        TweenMax.to(btnBackHome, 1, { opacity: 0, clipPath: "inset(0% 100% 0% 0%)", ease: "power3.inOut" })

        TweenMax.to(".spanContainerDiscord span", { duration: 0.75, opacity: .6, stagger: { each: 0.07, from: 'random' }, ease: "power2.inOut", delay: 1.25 })
        TweenMax.to(".spanContainerIut span", { duration: 0.75, opacity: .6, stagger: { each: 0.05, from: 'random' }, ease: "power2.inOut", delay: 1.25 })

        setTimeout(function() {
            discordContainer.classList.remove('close')
            iutContainer.classList.remove('close')
            btnStart.classList.remove('close')
            littleTitleSvg.classList.add('close')
        }, 2500)
            //PLANE ROTATION Z ANIM
        gsap.to(planeMesh1.rotation, 2.25, { z: rotateZ, ease: "power3.inOut" })
        gsap.to(planeMesh2.rotation, 2.25, { z: rotateZ, ease: "power3.inOut" })
        gsap.to(planeMesh3.rotation, 2.25, { z: rotateZ, ease: "power3.inOut" })
        gsap.to(planeMesh4.rotation, 2.25, { z: rotateZ, ease: "power3.inOut" })
        gsap.to(planeMesh5.rotation, 2.25, { z: rotateZ, ease: "power3.inOut" })
        gsap.to(planeMesh6.rotation, 2.25, { z: rotateZ, ease: "power3.inOut" })
        gsap.to(planeMesh7.rotation, 2.25, { z: rotateZ, ease: "power3.inOut" })
        gsap.to(planeMesh8.rotation, 2.25, { z: rotateZ, ease: "power3.inOut" })
        gsap.to(planeMesh9.rotation, 2.25, { z: rotateZ, ease: "power3.inOut" })
        gsap.to(planeMesh10.rotation, 2.25, { z: rotateZ, ease: "power3.inOut" })
        gsap.to(planeMesh11.rotation, 2.25, { z: rotateZ, ease: "power3.inOut" })
        gsap.to(planeMesh12.rotation, 2.25, { z: rotateZ, ease: "power3.inOut" })
        gsap.to(planeMesh13.rotation, 2.25, { z: rotateZ, ease: "power3.inOut" })
        gsap.to(planeMesh14.rotation, 2.25, { z: rotateZ, ease: "power3.inOut" })
            //MODELS ANIM
        gsap.to(logo.position, 2.25, { y: -9.8, ease: "power3.inOut" })
        gsap.to(logo.scale, 2.25, { z: 0, x: 0, y: 0, ease: "power3.inOut", })
        gsap.to(logo.rotation, 2.25, { z: -.725, y: 0, ease: "power3.inOut" })
        gsap.to(home.position, 2.95, { z: 0, x: -1.45, ease: "power3.inOut" })
        gsap.to(home.rotation, 2.95, { y: -.35, z: 0, ease: "power3.inOut" })
        gsap.to(socle.position, 2.25, { y: -10.7, ease: "power3.inOut" })
        gsap.to(socle.rotation, 2.25, { y: 0, ease: "power3.inOut" })
        gsap.to(field.scale, 2.25, { y: 0.0001, x: 0.0001, z: 0.0001, ease: "power3.inOut" })
        gsap.to(field.position, 2.25, { y: -53, ease: "power3.inOut" })
        gsap.to(leftWall.position, 2.25, { x: -51.2, ease: "power3.inOut" })
        gsap.to(leftWall.scale, 2.25, { x: 0.0001, y: 0.0001, z: 0.0001, ease: "power3.inOut" })
        gsap.to(rightWall.position, 2.25, { x: 58.8, ease: "power3.inOut" })
        gsap.to(rightWall.scale, 2.25, { x: 0.0001, y: 0.0001, z: 0.0001, ease: "power3.inOut" })
        gsap.to(leftDoor.position, 2.25, { y: -55.8, ease: "power3.inOut" })
        gsap.to(rightDoor.position, 2.25, { y: -55.8, ease: "power3.inOut" })
        gsap.to(leftDoor.scale, 2.25, { x: 0.0001, y: 0.0001, z: 0.0001, ease: "power3.inOut" })
        gsap.to(rightDoor.scale, 2.25, { x: 0.0001, y: 0.0001, z: 0.0001, ease: "power3.inOut" })
        gsap.to(sign.scale, 2.25, { x: 0.0001, y: 0.0001, z: 0.0001, ease: "power3.inOut" })
        gsap.to(table.scale, 2.25, { x: 0.0001, y: 0.0001, z: 0.0001, ease: "power3.inOut" })
        gsap.to(pylone5.scale, 2.25, { x: 0.0001, y: 0.0001, z: 0.0001, ease: "power3.inOut" })
        gsap.to(pylone4.scale, 2.1, { x: 0.0001, y: 0.0001, z: 0.0001, ease: "power3.inOut", delay: .15 })
        gsap.to(pylone3.scale, 1.95, { x: 0.0001, y: 0.0001, z: 0.0001, ease: "power3.inOut", delay: .3 })
        gsap.to(pylone2.scale, 1.8, { x: 0.0001, y: 0.0001, z: 0.0001, ease: "power3.inOut", delay: .45 })
        gsap.to(pylone.scale, 1.65, { x: 0.0001, y: 0.0001, z: 0.0001, ease: "power3.inOut", delay: .6 })
        gsap.to(grid.scale, 2.25, { x: 0.0001, y: 0.0001, z: 0.0001, ease: "power3.inOut" })
        gsap.to(grid2.scale, 2.1, { x: 0.0001, y: 0.0001, z: 0.0001, ease: "power3.inOut", delay: .15 })
        gsap.to(grid3.scale, 1.95, { x: 0.0001, y: 0.0001, z: 0.0001, ease: "power3.inOut", delay: .3 })
        gsap.to(grid4.scale, 1.8, { x: 0.0001, y: 0.0001, z: 0.0001, ease: "power3.inOut", delay: .45 })
        gsap.to(grid5.scale, 1.65, { x: 0.0001, y: 0.0001, z: 0.0001, ease: "power3.inOut", delay: .6 })
        gsap.to(poutre.scale, 2.25, { x: 0.0001, y: 0.0001, z: 0.0001, ease: "power3.inOut" })
        gsap.to(cam.scale, 1.65, { x: 0.0001, y: 0.0001, z: 0.0001, ease: "power3.inOut", delay: .6 })
        gsap.to(vr2.scale, 1.95, { x: 0.0001, y: 0.0001, z: 0.0001, ease: "power3.inOut", delay: .3 })
        gsap.to(enceinte.scale, 2.25, { x: 0.0001, y: 0.0001, z: 0.0001, ease: "power3.inOut" })
        gsap.to(tv2.scale, 1.65, { x: 0.0001, y: 0.0001, z: 0.0001, ease: "power3.inOut", delay: .6})
        gsap.to(tabProg.scale, 1.95, { x: 0.0001, y: 0.0001, z: 0.0001, ease: "power3.inOut", delay: .3})
        gsap.to(tv.scale, 2.25, { x: 0.0001, y: 0.0001, z: 0.0001, ease: "power3.inOut"})
        gsap.to(street.scale, 0, { x: 0.0001, y: 0.0001, z: 0.0001 })
        gsap.to(leftDoor2.scale, 0, { x: 0.0001, y: 0.0001, z: 0.0001, ease: "power3.inOut" })
        gsap.to(rightDoor2.scale, 0, { x: 0.0001, y: 0.0001, z: 0.0001, ease: "power3.inOut" })
            //LIGHTS ANIM
        TweenMax.to(lightCenterSocle.color, .75, { r: cyanColorReset.r, g: cyanColorReset.g, b: cyanColorReset.b, delay: .75 });
        TweenMax.to(lightCenter.color, .75, { r: cyanColorReset.r, g: cyanColorReset.g, b: cyanColorReset.b, delay: .75 });
        //SWITCH ELEMENTS ON CLICK
        canvas.style.zIndex = -1;
        homeContainer.style.zIndex = 2;
        homeMask.style.zIndex = 1;
    } else if (planeAxe.position.y <= -16 && planeAxe.position.y >= -17.1) {
        scrollPlane14();
        if (materialPlanePanneau.uniforms.dispFactor.value >= .0 && materialPlanePanneau.uniforms.dispFactor.value <= .2) {
            materialPlanePanneau.uniforms.imagergb.value = texture1Hover
            gsap.to(materialPlanePanneau.uniforms.dispFactor, 1.5, { value: 1.0, ease: "Power3.easeOut" });
        } else {
            materialPlanePanneau.uniforms.imagebw.value = texture1Hover
            gsap.to(materialPlanePanneau.uniforms.dispFactor, 1.5, { value: .0, ease: "Power3.easeOut" });
        }
    } else if (planeAxe.position.y <= -15 && planeAxe.position.y >= -16.1) {
        scrollPlane13();
        if (materialPlanePanneau.uniforms.dispFactor.value >= .0 && materialPlanePanneau.uniforms.dispFactor.value <= .2) {
            materialPlanePanneau.uniforms.imagergb.value = texture2Hover
            gsap.to(materialPlanePanneau.uniforms.dispFactor, 1.5, { value: 1.0, ease: "Power3.easeOut" });
        } else {
            materialPlanePanneau.uniforms.imagebw.value = texture2Hover
            gsap.to(materialPlanePanneau.uniforms.dispFactor, 1.5, { value: .0, ease: "Power3.easeOut" });
        }
    } else if (planeAxe.position.y <= -14 && planeAxe.position.y >= -15.1) {
        scrollPlane12();
        if (materialPlanePanneau.uniforms.dispFactor.value >= .0 && materialPlanePanneau.uniforms.dispFactor.value <= .2) {
            materialPlanePanneau.uniforms.imagergb.value = texture3Hover
            gsap.to(materialPlanePanneau.uniforms.dispFactor, 1.5, { value: 1.0, ease: "Power3.easeOut" });
        } else {
            materialPlanePanneau.uniforms.imagebw.value = texture3Hover
            gsap.to(materialPlanePanneau.uniforms.dispFactor, 1.5, { value: .0, ease: "Power3.easeOut" });
        }
    } else if (planeAxe.position.y <= -13 && planeAxe.position.y >= -14.1) {
        scrollPlane11();
        if (materialPlanePanneau.uniforms.dispFactor.value >= .0 && materialPlanePanneau.uniforms.dispFactor.value <= .2) {
            materialPlanePanneau.uniforms.imagergb.value = texture4Hover
            gsap.to(materialPlanePanneau.uniforms.dispFactor, 1.5, { value: 1.0, ease: "Power3.easeOut" });
        } else {
            materialPlanePanneau.uniforms.imagebw.value = texture4Hover
            gsap.to(materialPlanePanneau.uniforms.dispFactor, 1.5, { value: .0, ease: "Power3.easeOut" });
        }
    } else if (planeAxe.position.y <= -12 && planeAxe.position.y >= -13.1) {
        scrollPlane10();
        if (materialPlanePanneau.uniforms.dispFactor.value >= .0 && materialPlanePanneau.uniforms.dispFactor.value <= .2) {
            materialPlanePanneau.uniforms.imagergb.value = texture5Hover
            gsap.to(materialPlanePanneau.uniforms.dispFactor, 1.5, { value: 1.0, ease: "Power3.easeOut" });
        } else {
            materialPlanePanneau.uniforms.imagebw.value = texture5Hover
            gsap.to(materialPlanePanneau.uniforms.dispFactor, 1.5, { value: .0, ease: "Power3.easeOut" });
        }
    } else if (planeAxe.position.y <= -11 && planeAxe.position.y >= -12.1) {
        scrollPlane9();
        if (materialPlanePanneau.uniforms.dispFactor.value >= .0 && materialPlanePanneau.uniforms.dispFactor.value <= .2) {
            materialPlanePanneau.uniforms.imagergb.value = texture6Hover
            gsap.to(materialPlanePanneau.uniforms.dispFactor, 1.5, { value: 1.0, ease: "Power3.easeOut" });
        } else {
            materialPlanePanneau.uniforms.imagebw.value = texture6Hover
            gsap.to(materialPlanePanneau.uniforms.dispFactor, 1.5, { value: .0, ease: "Power3.easeOut" });
        }
    } else if (planeAxe.position.y <= -10 && planeAxe.position.y >= -11.1) {
        scrollPlane8();
        if (materialPlanePanneau.uniforms.dispFactor.value >= .0 && materialPlanePanneau.uniforms.dispFactor.value <= .2) {
            materialPlanePanneau.uniforms.imagergb.value = texture7Hover
            gsap.to(materialPlanePanneau.uniforms.dispFactor, 1.5, { value: 1.0, ease: "Power3.easeOut" });
        } else {
            materialPlanePanneau.uniforms.imagebw.value = texture7Hover
            gsap.to(materialPlanePanneau.uniforms.dispFactor, 1.5, { value: .0, ease: "Power3.easeOut" });
        }
    } else if (planeAxe.position.y <= -9 && planeAxe.position.y >= -10.1) {
        scrollPlane7();
        if (materialPlanePanneau.uniforms.dispFactor.value >= .0 && materialPlanePanneau.uniforms.dispFactor.value <= .2) {
            materialPlanePanneau.uniforms.imagergb.value = texture8Hover
            gsap.to(materialPlanePanneau.uniforms.dispFactor, 1.5, { value: 1.0, ease: "Power3.easeOut" });
        } else {
            materialPlanePanneau.uniforms.imagebw.value = texture8Hover
            gsap.to(materialPlanePanneau.uniforms.dispFactor, 1.5, { value: .0, ease: "Power3.easeOut" });
        }
    } else if (planeAxe.position.y <= -8 && planeAxe.position.y >= -9.1) {
        scrollPlane6();
        if (materialPlanePanneau.uniforms.dispFactor.value >= .0 && materialPlanePanneau.uniforms.dispFactor.value <= .2) {
            materialPlanePanneau.uniforms.imagergb.value = texture9Hover
            gsap.to(materialPlanePanneau.uniforms.dispFactor, 1.5, { value: 1.0, ease: "Power3.easeOut" });
        } else {
            materialPlanePanneau.uniforms.imagebw.value = texture9Hover
            gsap.to(materialPlanePanneau.uniforms.dispFactor, 1.5, { value: .0, ease: "Power3.easeOut" });
        }
    } else if (planeAxe.position.y <= -7 && planeAxe.position.y >= -8.1) {
        scrollPlane5();
        if (materialPlanePanneau.uniforms.dispFactor.value >= .0 && materialPlanePanneau.uniforms.dispFactor.value <= .2) {
            materialPlanePanneau.uniforms.imagergb.value = texture10Hover
            gsap.to(materialPlanePanneau.uniforms.dispFactor, 1.5, { value: 1.0, ease: "Power3.easeOut" });
        } else {
            materialPlanePanneau.uniforms.imagebw.value = texture10Hover
            gsap.to(materialPlanePanneau.uniforms.dispFactor, 1.5, { value: .0, ease: "Power3.easeOut" });
        }
    } else if (planeAxe.position.y <= -6 && planeAxe.position.y >= -7.1) {
        scrollPlane4();
        if (materialPlanePanneau.uniforms.dispFactor.value >= .0 && materialPlanePanneau.uniforms.dispFactor.value <= .2) {
            materialPlanePanneau.uniforms.imagergb.value = texture11Hover
            gsap.to(materialPlanePanneau.uniforms.dispFactor, 1.5, { value: 1.0, ease: "Power3.easeOut" });
        } else {
            materialPlanePanneau.uniforms.imagebw.value = texture11Hover
            gsap.to(materialPlanePanneau.uniforms.dispFactor, 1.5, { value: .0, ease: "Power3.easeOut" });
        }
    } else if (planeAxe.position.y <= -5 && planeAxe.position.y >= -6.1) {
        scrollPlane3();
        if (materialPlanePanneau.uniforms.dispFactor.value >= .0 && materialPlanePanneau.uniforms.dispFactor.value <= .2) {
            materialPlanePanneau.uniforms.imagergb.value = texture12Hover
            gsap.to(materialPlanePanneau.uniforms.dispFactor, 1.5, { value: 1.0, ease: "Power3.easeOut" });
        } else {
            materialPlanePanneau.uniforms.imagebw.value = texture12Hover
            gsap.to(materialPlanePanneau.uniforms.dispFactor, 1.5, { value: .0, ease: "Power3.easeOut" });
        }
    } else if (planeAxe.position.y <= -4 && planeAxe.position.y >= -5.1) {
        scrollPlane2();
        if (materialPlanePanneau.uniforms.dispFactor.value >= .0 && materialPlanePanneau.uniforms.dispFactor.value <= .2) {
            materialPlanePanneau.uniforms.imagergb.value = texture13Hover
            gsap.to(materialPlanePanneau.uniforms.dispFactor, 1.5, { value: 1.0, ease: "Power3.easeOut" });
        } else {
            materialPlanePanneau.uniforms.imagebw.value = texture13Hover
            gsap.to(materialPlanePanneau.uniforms.dispFactor, 1.5, { value: .0, ease: "Power3.easeOut" });
        }
    }
}

//REVEAL AND HIDE CURSOR INDICATION
// gsap.to(cursorIndication, 0, { opacity: 0, ease: "power1.inOut"})
// gsap.to(cursorIndication, 1.5, { opacity: 1, ease: "power1.inOut", delay: 7})

function scrollDown() {
    if (planeAxe.position.y <= -16.01 && planeAxe.position.y >= -17) {
        scrollPlane13();
        if (materialPlanePanneau.uniforms.dispFactor.value >= .0 && materialPlanePanneau.uniforms.dispFactor.value <= .2) {
            materialPlanePanneau.uniforms.imagergb.value = texture2Hover
            gsap.to(materialPlanePanneau.uniforms.dispFactor, 1.5, { value: 1.0, ease: "Power3.easeOut" });
        } else {
            materialPlanePanneau.uniforms.imagebw.value = texture2Hover
            gsap.to(materialPlanePanneau.uniforms.dispFactor, 1.5, { value: .0, ease: "Power3.easeOut" });
        }
    } else if (planeAxe.position.y <= -15.01 && planeAxe.position.y >= -16) {
        scrollPlane12();
        if (materialPlanePanneau.uniforms.dispFactor.value >= .0 && materialPlanePanneau.uniforms.dispFactor.value <= .2) {
            materialPlanePanneau.uniforms.imagergb.value = texture3Hover
            gsap.to(materialPlanePanneau.uniforms.dispFactor, 1.5, { value: 1.0, ease: "Power3.easeOut" });
        } else {
            materialPlanePanneau.uniforms.imagebw.value = texture3Hover
            gsap.to(materialPlanePanneau.uniforms.dispFactor, 1.5, { value: .0, ease: "Power3.easeOut" });
        }
    } else if (planeAxe.position.y <= -14.01 && planeAxe.position.y >= -15) {
        scrollPlane11();
        if (materialPlanePanneau.uniforms.dispFactor.value >= .0 && materialPlanePanneau.uniforms.dispFactor.value <= .2) {
            materialPlanePanneau.uniforms.imagergb.value = texture4Hover
            gsap.to(materialPlanePanneau.uniforms.dispFactor, 1.5, { value: 1.0, ease: "Power3.easeOut" });
        } else {
            materialPlanePanneau.uniforms.imagebw.value = texture4Hover
            gsap.to(materialPlanePanneau.uniforms.dispFactor, 1.5, { value: .0, ease: "Power3.easeOut" });
        }
    } else if (planeAxe.position.y <= -13.01 && planeAxe.position.y >= -14) {
        scrollPlane10();
        if (materialPlanePanneau.uniforms.dispFactor.value >= .0 && materialPlanePanneau.uniforms.dispFactor.value <= .2) {
            materialPlanePanneau.uniforms.imagergb.value = texture5Hover
            gsap.to(materialPlanePanneau.uniforms.dispFactor, 1.5, { value: 1.0, ease: "Power3.easeOut" });
        } else {
            materialPlanePanneau.uniforms.imagebw.value = texture5Hover
            gsap.to(materialPlanePanneau.uniforms.dispFactor, 1.5, { value: .0, ease: "Power3.easeOut" });
        }
    } else if (planeAxe.position.y <= -12.01 && planeAxe.position.y >= -13) {
        scrollPlane9();
        if (materialPlanePanneau.uniforms.dispFactor.value >= .0 && materialPlanePanneau.uniforms.dispFactor.value <= .2) {
            materialPlanePanneau.uniforms.imagergb.value = texture6Hover
            gsap.to(materialPlanePanneau.uniforms.dispFactor, 1.5, { value: 1.0, ease: "Power3.easeOut" });
        } else {
            materialPlanePanneau.uniforms.imagebw.value = texture6Hover
            gsap.to(materialPlanePanneau.uniforms.dispFactor, 1.5, { value: .0, ease: "Power3.easeOut" });
        }
    } else if (planeAxe.position.y <= -11.01 && planeAxe.position.y >= -12) {
        scrollPlane8();
        if (materialPlanePanneau.uniforms.dispFactor.value >= .0 && materialPlanePanneau.uniforms.dispFactor.value <= .2) {
            materialPlanePanneau.uniforms.imagergb.value = texture7Hover
            gsap.to(materialPlanePanneau.uniforms.dispFactor, 1.5, { value: 1.0, ease: "Power3.easeOut" });
        } else {
            materialPlanePanneau.uniforms.imagebw.value = texture7Hover
            gsap.to(materialPlanePanneau.uniforms.dispFactor, 1.5, { value: .0, ease: "Power3.easeOut" });
        }
    } else if (planeAxe.position.y <= -10.01 && planeAxe.position.y >= -11) {
        scrollPlane7();
        if (materialPlanePanneau.uniforms.dispFactor.value >= .0 && materialPlanePanneau.uniforms.dispFactor.value <= .2) {
            materialPlanePanneau.uniforms.imagergb.value = texture8Hover
            gsap.to(materialPlanePanneau.uniforms.dispFactor, 1.5, { value: 1.0, ease: "Power3.easeOut" });
        } else {
            materialPlanePanneau.uniforms.imagebw.value = texture8Hover
            gsap.to(materialPlanePanneau.uniforms.dispFactor, 1.5, { value: .0, ease: "Power3.easeOut" });
        }
    } else if (planeAxe.position.y <= -9.01 && planeAxe.position.y >= -10) {
        scrollPlane6();
        if (materialPlanePanneau.uniforms.dispFactor.value >= .0 && materialPlanePanneau.uniforms.dispFactor.value <= .2) {
            materialPlanePanneau.uniforms.imagergb.value = texture9Hover
            gsap.to(materialPlanePanneau.uniforms.dispFactor, 1.5, { value: 1.0, ease: "Power3.easeOut" });
        } else {
            materialPlanePanneau.uniforms.imagebw.value = texture9Hover
            gsap.to(materialPlanePanneau.uniforms.dispFactor, 1.5, { value: .0, ease: "Power3.easeOut" });
        }
    } else if (planeAxe.position.y <= -8.01 && planeAxe.position.y >= -9) {
        scrollPlane5();
        if (materialPlanePanneau.uniforms.dispFactor.value >= .0 && materialPlanePanneau.uniforms.dispFactor.value <= .2) {
            materialPlanePanneau.uniforms.imagergb.value = texture10Hover
            gsap.to(materialPlanePanneau.uniforms.dispFactor, 1.5, { value: 1.0, ease: "Power3.easeOut" });
        } else {
            materialPlanePanneau.uniforms.imagebw.value = texture10Hover
            gsap.to(materialPlanePanneau.uniforms.dispFactor, 1.5, { value: .0, ease: "Power3.easeOut" });
        }
    } else if (planeAxe.position.y <= -7.01 && planeAxe.position.y >= -8) {
        scrollPlane4();
        if (materialPlanePanneau.uniforms.dispFactor.value >= .0 && materialPlanePanneau.uniforms.dispFactor.value <= .2) {
            materialPlanePanneau.uniforms.imagergb.value = texture11Hover
            gsap.to(materialPlanePanneau.uniforms.dispFactor, 1.5, { value: 1.0, ease: "Power3.easeOut" });
        } else {
            materialPlanePanneau.uniforms.imagebw.value = texture11Hover
            gsap.to(materialPlanePanneau.uniforms.dispFactor, 1.5, { value: .0, ease: "Power3.easeOut" });
        }
    } else if (planeAxe.position.y <= -6.01 && planeAxe.position.y >= -7) {
        scrollPlane3();
        if (materialPlanePanneau.uniforms.dispFactor.value >= .0 && materialPlanePanneau.uniforms.dispFactor.value <= .2) {
            materialPlanePanneau.uniforms.imagergb.value = texture12Hover
            gsap.to(materialPlanePanneau.uniforms.dispFactor, 1.5, { value: 1.0, ease: "Power3.easeOut" });
        } else {
            materialPlanePanneau.uniforms.imagebw.value = texture12Hover
            gsap.to(materialPlanePanneau.uniforms.dispFactor, 1.5, { value: .0, ease: "Power3.easeOut" });
        }
    } else if (planeAxe.position.y <= -5.01 && planeAxe.position.y >= -6) {
        scrollPlane2();
        if (materialPlanePanneau.uniforms.dispFactor.value >= .0 && materialPlanePanneau.uniforms.dispFactor.value <= .2) {
            materialPlanePanneau.uniforms.imagergb.value = texture13Hover
            gsap.to(materialPlanePanneau.uniforms.dispFactor, 1.5, { value: 1.0, ease: "Power3.easeOut" });
        } else {
            materialPlanePanneau.uniforms.imagebw.value = texture13Hover
            gsap.to(materialPlanePanneau.uniforms.dispFactor, 1.5, { value: .0, ease: "Power3.easeOut" });
        }
    } else if (planeAxe.position.y <= -4.01 && planeAxe.position.y >= -5) {
        scrollPlane1();
        if (materialPlanePanneau.uniforms.dispFactor.value >= .0 && materialPlanePanneau.uniforms.dispFactor.value <= .2) {
            materialPlanePanneau.uniforms.imagergb.value = texture14Hover
            gsap.to(materialPlanePanneau.uniforms.dispFactor, 1.5, { value: 1.0, ease: "Power3.easeOut" });
        } else {
            materialPlanePanneau.uniforms.imagebw.value = texture14Hover
            gsap.to(materialPlanePanneau.uniforms.dispFactor, 1.5, { value: .0, ease: "Power3.easeOut" });
        }
    } else if (planeAxe.position.y == -4) {
        homeActive = true
        
        //RAJOUT DES PARTICULES
        scene.add(particleMesh);
        gsap.to(particleMesh.scale, 2.95, { x: 1, y: 1, z: 1, ease: "power3.inOut" })
        //AXES ANIM
        gsap.to(planeAxe.position, 2.25, { y: 4.2, ease: "power3.inOut" })
        gsap.to(planeAxe.rotation, 2.25, { y: -13.5 * Math.PI, ease: "power3.inOut" })
            //CAMERA ANIM
        if (window.matchMedia("(max-width: 600px)").matches) {
            gsap.to(camera.position, 2.95, { z: 11.3, ease: "power3.inOut" })
        } else {
            gsap.to(camera.position, 2.95, { z: 10, ease: "power3.inOut" })
        }
        //HTML ELEMENTS ANIM
        cursorIndication.classList.remove('switch')
        canvas.classList.remove('hologramDefault')
        canvas.classList.add('hologramActive')
        btnBackHome.disabled = true;
        btnStart.disabled = false;
        titleSvgPath.forEach(e => {
            e.classList.remove("pathTitleOut")
            e.classList.add("pathTitleIn")
        });
        titleSvgLine.classList.remove("pathLineOut")
        titleSvgLine.classList.add("pathLineIn")

        littleTitleSvgPath.forEach(e => {
            e.classList.remove("pathTitleIn")
            e.classList.add("pathTitleOut")
        });
        littleTitleSvgLine.classList.remove("pathLineIn")
        littleTitleSvgLine.classList.add("pathLineOut")

        hideTimeline()

        TweenMax.to(btnStart, .75, { opacity: 1, clipPath: "inset(0% 0% 0% 0%)", delay: 1.75, ease: "power3.inOut" })
        TweenMax.to(homeMask, 2.95, { opacity: 1, ease: "power3.inOut"})
        TweenMax.to(btnBackHome, 1, { opacity: 0, clipPath: "inset(0% 100% 0% 0%)", ease: "power3.inOut" })

        TweenMax.to(".spanContainerDiscord span", { duration: 0.75, opacity: .6, stagger: { each: 0.07, from: 'random' }, ease: "power2.inOut", delay: 1.25 })
        TweenMax.to(".spanContainerIut span", { duration: 0.75, opacity: .6, stagger: { each: 0.05, from: 'random' }, ease: "power2.inOut", delay: 1.25 })

        setTimeout(function() {
            discordContainer.classList.remove('close')
            iutContainer.classList.remove('close')
            btnStart.classList.remove('close')
            littleTitleSvg.classList.add('close')
        }, 2500)
            //PLANE ROTATION Z ANIM
        gsap.to(planeMesh1.rotation, 2.25, { z: rotateZ, ease: "power3.inOut" })
        gsap.to(planeMesh2.rotation, 2.25, { z: rotateZ, ease: "power3.inOut" })
        gsap.to(planeMesh3.rotation, 2.25, { z: rotateZ, ease: "power3.inOut" })
        gsap.to(planeMesh4.rotation, 2.25, { z: rotateZ, ease: "power3.inOut" })
        gsap.to(planeMesh5.rotation, 2.25, { z: rotateZ, ease: "power3.inOut" })
        gsap.to(planeMesh6.rotation, 2.25, { z: rotateZ, ease: "power3.inOut" })
        gsap.to(planeMesh7.rotation, 2.25, { z: rotateZ, ease: "power3.inOut" })
        gsap.to(planeMesh8.rotation, 2.25, { z: rotateZ, ease: "power3.inOut" })
        gsap.to(planeMesh9.rotation, 2.25, { z: rotateZ, ease: "power3.inOut" })
        gsap.to(planeMesh10.rotation, 2.25, { z: rotateZ, ease: "power3.inOut" })
        gsap.to(planeMesh11.rotation, 2.25, { z: rotateZ, ease: "power3.inOut" })
        gsap.to(planeMesh12.rotation, 2.25, { z: rotateZ, ease: "power3.inOut" })
        gsap.to(planeMesh13.rotation, 2.25, { z: rotateZ, ease: "power3.inOut" })
        gsap.to(planeMesh14.rotation, 2.25, { z: rotateZ, ease: "power3.inOut" })
            //MODELS ANIM
        gsap.to(logo.position, 2.25, { y: -9.8, ease: "power3.inOut" })
        gsap.to(logo.scale, 2.25, { z: 0.0001, x: 0.0001, y: 0.0001, ease: "power3.inOut", })
        gsap.to(logo.rotation, 2.25, { z: -.725, y: 0, ease: "power3.inOut" })
        gsap.to(home.position, 2.95, { z: 0, x: -1.45, ease: "power3.inOut" })
        gsap.to(home.rotation, 2.95, { y: -.35, z: 0, ease: "power3.inOut" })
        gsap.to(socle.position, 2.25, { y: -10.7, ease: "power3.inOut" })
        gsap.to(socle.rotation, 2.25, { y: 0, ease: "power3.inOut" })
        gsap.to(field.scale, 2.25, { y: 0.0001, x: 0.0001, z: 0.0001, ease: "power3.inOut" })
        gsap.to(field.position, 2.25, { y: -53, ease: "power3.inOut" })
        gsap.to(leftWall.position, 2.25, { x: -51.2, ease: "power3.inOut" })
        gsap.to(leftWall.scale, 2.25, { x: 0.0001, y: 0.0001, z: 0.0001, ease: "power3.inOut" })
        gsap.to(rightWall.position, 2.25, { x: 58.8, ease: "power3.inOut" })
        gsap.to(rightWall.scale, 2.25, { x: 0.0001, y: 0.0001, z: 0.0001, ease: "power3.inOut" })
        gsap.to(leftDoor.position, 2.25, { y: -55.8, ease: "power3.inOut" })
        gsap.to(rightDoor.position, 2.25, { y: -55.8, ease: "power3.inOut" })
        gsap.to(leftDoor.scale, 2.25, { x: 0.0001, y: 0.0001, z: 0.0001, ease: "power3.inOut" })
        gsap.to(rightDoor.scale, 2.25, { x: 0.0001, y: 0.0001, z: 0.0001, ease: "power3.inOut" })
        gsap.to(sign.scale, 2.25, { x: 0.0001, y: 0.0001, z: 0.0001, ease: "power3.inOut" })
        gsap.to(table.scale, 2.25, { x: 0.0001, y: 0.0001, z: 0.0001, ease: "power3.inOut" })
        gsap.to(pylone5.scale, 2.25, { x: 0.0001, y: 0.0001, z: 0.0001, ease: "power3.inOut" })
        gsap.to(pylone4.scale, 2.1, { x: 0.0001, y: 0.0001, z: 0.0001, ease: "power3.inOut", delay: .15 })
        gsap.to(pylone3.scale, 1.95, { x: 0.0001, y: 0.0001, z: 0.0001, ease: "power3.inOut", delay: .3 })
        gsap.to(pylone2.scale, 1.8, { x: 0.0001, y: 0.0001, z: 0.0001, ease: "power3.inOut", delay: .45 })
        gsap.to(pylone.scale, 1.65, { x: 0.0001, y: 0.0001, z: 0.0001, ease: "power3.inOut", delay: .6 })
        gsap.to(grid.scale, 2.25, { x: 0.0001, y: 0.0001, z: 0.0001, ease: "power3.inOut" })
        gsap.to(grid2.scale, 2.1, { x: 0.0001, y: 0.0001, z: 0.0001, ease: "power3.inOut", delay: .15 })
        gsap.to(grid3.scale, 1.95, { x: 0.0001, y: 0.0001, z: 0.0001, ease: "power3.inOut", delay: .3 })
        gsap.to(grid4.scale, 1.8, { x: 0.0001, y: 0.0001, z: 0.0001, ease: "power3.inOut", delay: .45 })
        gsap.to(grid5.scale, 1.65, { x: 0.0001, y: 0.0001, z: 0.0001, ease: "power3.inOut", delay: .6 })
        gsap.to(poutre.scale, 2.25, { x: 0.0001, y: 100, z: 0.0001, ease: "power3.inOut" })
        gsap.to(cam.scale, 1.65, { x: 0.0001, y: 0.0001, z: 0.0001, ease: "power3.inOut", delay: .6 })
        gsap.to(vr2.scale, 1.95, { x: 0.0001, y: 0.0001, z: 0.0001, ease: "power3.inOut", delay: .3 })
        gsap.to(enceinte.scale, 2.25, { x: 0.0001, y: 0.0001, z: 0.0001, ease: "power3.inOut" })
        gsap.to(tv2.scale, 1.65, { x: 0.0001, y: 0.0001, z: 0.0001, ease: "power3.inOut", delay: .6})
        gsap.to(tabProg.scale, 1.95, { x: 0.0001, y: 0.0001, z: 0.0001, ease: "power3.inOut", delay: .3})
        gsap.to(tv.scale, 2.25, { x: 0.0001, y: 0.0001, z: 0.0001, ease: "power3.inOut"})
        gsap.to(street.scale, 0, { x: 0.0001, y: 0.0001, z: 0.0001 })
        gsap.to(leftDoor2.scale, 0, { x: 0.0001, y: 0.0001, z: 0.0001, ease: "power3.inOut" })
        gsap.to(rightDoor2.scale, 0, { x: 0.0001, y: 0.0001, z: 0.0001, ease: "power3.inOut" })
            //LIGHTS ANIM
        TweenMax.to(lightCenterSocle.color, .75, { r: cyanColorReset.r, g: cyanColorReset.g, b: cyanColorReset.b, delay: .75 });
        TweenMax.to(lightCenter.color, .75, { r: cyanColorReset.r, g: cyanColorReset.g, b: cyanColorReset.b, delay: .75 });
        //SWITCH ELEMENTS ON CLICK
        canvas.style.zIndex = -1;
        homeContainer.style.zIndex = 2;
        homeMask.style.zIndex = 1;
        //RESET AXES POSITION 
        gsap.to(planeAxe.position, 0, { y: -26.5, delay: 3 })
        gsap.to(planeAxe.rotation, 0, { y: 0, delay: 3 })
        gsap.to(planeAxe.scale, 0, { y: 0.0001, x: 0.0001, z: 0.0001, delay: 2 })
        gsap.to(planeAxe.scale, 0, { y: 1, x: 1, z: 1, delay: 3.1 })
    }
}
///// MOUSE SCROLL /////
document.body.addEventListener('wheel', scrollWheel);

function scrollWheel(event) {
    if (!workshopActive) {
        if (!isScrollUp) {
            if (checkScrollDirectionIsUp(event)) { // SCROLL UP
                scrollUp();
                isScrollUp = true
                setTimeout(function () {
                    isScrollUp = false
                }, 750)
            }
        }
        if (!isScrollDown) {
            if (checkScrollDirectionIsUp(event)) { // SCROLL DOWN
            } else {
                scrollDown();
                isScrollDown = true
                setTimeout(function () {
                    isScrollDown = false
                }, 750)
            }
        }
    } else if (creditActive) {
        if (checkScrollDirectionIsUp(event)) { // SCROLL UP
            if (camera.position.z <= -185 && scrollContainer__1.scrollTop == 0) {
                backToWorkshop();
            }
        }
    } else if (workshopActive) {
        if (checkScrollDirectionIsUp(event)) { // SCROLL UP
            if (contentContainer__1.scrollTop == 0 && scrollPossible) {
                backToPlane();
                scrollPossible = false
            }
        }
    }
}

function checkScrollDirectionIsUp(event) { //REVERSE SCROLL
    if (event.wheelDeltaY) {
        return event.wheelDeltaY > 0;
    }
    return event.deltaY < 0;
}

///// WORKSHOP SCROLL /////
contentContainer__1.addEventListener('scroll', function() {
    if (!creditActive) {
        camera.position.z = scrollWorkshop(contentContainer__1)
        if (window.matchMedia("(max-width: 1440px)").matches) {
            if (camera.position.z <= -109) {
                scrollContainer__1.scrollTop = 0
                creditContainer.classList.add('switchStreet')
                workShopContainer.classList.remove('switchPlane');
                gsap.to(workShopContainer, 1.5, { opacity: 0, ease: "Power3.easeOut" })
                gsap.to(camera.position, 3, { z: -185, ease: "power3.inOut" })
                gsap.to(leftDoor2.position, 1.5, { x: -15, ease: "power3.inOut", delay: .75 })
                gsap.to(rightDoor2.position, 1.5, { x: 15, ease: "power3.inOut", delay: .75 })
                gsap.to(creditContainer, 2, { opacity: 1, ease: "Power1.easeOut", delay: 2 })
                backPossible = false;
                setTimeout(function() {
                    creditActive = true
                }, 1000)
                setTimeout(function() {
                    backPossible = true
                }, 3000)
            } 
        } else {
            if (camera.position.z <= -106) {
                scrollContainer__1.scrollTop = 0
                creditContainer.classList.add('switchStreet')
                workShopContainer.classList.remove('switchPlane');
                gsap.to(workShopContainer, 1.5, { opacity: 0, ease: "Power3.easeOut" })
                gsap.to(camera.position, 3, { z: -185, ease: "power3.inOut" })
                gsap.to(leftDoor2.position, 1.5, { x: -15, ease: "power3.inOut", delay: .75 })
                gsap.to(rightDoor2.position, 1.5, { x: 15, ease: "power3.inOut", delay: .75 })
                gsap.to(creditContainer, 2, { opacity: 1, ease: "Power1.easeOut", delay: 2 })
                backPossible = false;
                setTimeout(function() {
                    creditActive = true
                }, 1000)
                setTimeout(function() {
                    backPossible = true
                }, 3000)
            } 
        }
    }
})

scrollContainer__1.addEventListener("scroll", function() {
    if (creditActive) {
        for (let i = 1; i <= 6; i++) {
            let tl = gsap.timeline({ defaults: { ease: "Power3.InOut" }}).to(".contentImg__"+i, { opacity: 1, duration: 1 })
            ScrollTrigger.create({
                trigger: ".contentImg__"+i,
                start: "10% 50%",
                // end: "+=300",
                scroller: ".scrollContainer__1",
                animation: tl,
                // scrub: true,
            })
        }
    }
})

function scrollWorkshop(el) {
    let posCam = -20 + (el.scrollTop / el.scrollHeight) * -120
    return posCam
}

///// ARROWS SCROLL + KEY ECHAP ///////
document.onkeydown = function(e) {
    switch (e.keyCode) {
        case 37:
            if (!workshopActive) {
                scrollUp();
            }
            console.log('left');
            break;
        case 38: // SCROLL UP
            if (!workshopActive) {
                scrollUp();
            }
            console.log('up');
            break;
        case 39:
            if (!workshopActive) {
                scrollDown();
            }
            console.log('right');
            break;
        case 40: // SCROLL DOWN
            if (!workshopActive) {
                scrollDown();
            }
            console.log('down');
            break;
        case 27:
            if (camera.position.z == 3.7 && !workshopActive) {
                functionBtnBackHome();
            }
            if (workshopActive && !creditActive) {
                backToPlane();
            } else if (workshopActive && creditActive) {
                backToWorkshop();
            }
            console.log("echap")
            break;
        case 13:
            if (camera.position.z == 10) {
                functionBtnStart();
            }
            if (!homeActive) {
                plane14Click();
                plane13Click();
                plane12Click();
                plane11Click();
                plane10Click();
                plane9Click();
                plane8Click();
                plane7Click();
                plane6Click();
                plane5Click();
                plane4Click();
                plane3Click();
                plane2Click();
                plane1Click();
            }
            console.log("enter")
            break;
        case 65: // DEBUGGER
            console.log(camera.position.z)
            // console.log("1/4 : " + contentContainer__1.scrollHeight / 4)
            // console.log("2/4 : " + contentContainer__1.scrollHeight / 4 * 2)
            // console.log("3/4 : " + contentContainer__1.scrollHeight / 4 * 3)
            // console.log("4/4 : " + contentContainer__1.scrollHeight / 4 * 4)
            console.log("pos Fiche Actuelle : " + contentContainer__1.scrollTop)
            console.log("pos Crédit Actuelle : " + scrollContainer__1.scrollTop)
            console.log("Crédit : " + creditActive)
            console.log("Workshop : " + workshopActive)
            console.log("Back : " + backPossible)
            break;
    }
};


let variation = 0;
let variationShaders = 0;

var render = function() {

    composer.render();

    requestAnimationFrame(render);

    if (logo && logo.position.z == 0) {
        logo.rotation.y += .01
        if (logo.rotation.y > Math.PI) {
            logo.rotation.y -= Math.PI * 2
        }
    }


    particleGeo.vertices.forEach(p => { //PARTICLES ANIMATION
        p.y += 0.0025;
        variation += 0.000005;
        p.x += Math.sin(variation) / 1000
        if (p.y > 9) {
            p.y = -9;
        }
    });

    particleGeo.verticesNeedUpdate = true;
    
    // window.onmousemove = function(e) { //PARTICLES MOUSE EVENT

    //     // var resetCenterX = window.innerWidth / 2;
    //     // var resetCenterY = window.innerHeight / 2;


    //         var cameraRotationYTolerance = .05;
    //         var cameraRotationXTolerance = .05;

    //         var rotX = window.innerWidth * .5;
    //         var rotY = window.innerHeight * .5;

    //         // camera.rotation.y = (e.clientX - rotX) / rotX * cameraRotationYTolerance;
    //         // camera.rotation.x = (e.clientY - rotY) / rotY * cameraRotationXTolerance;
    //         // gsap.to(camera.position, 0.05, { x: (e.clientX - rotX) / rotX * cameraRotationXTolerance, y: (e.clientY - rotY) / rotY * cameraRotationYTolerance, ease: "power4.inOut" })
    // };

    renderer.render(scene, camera);

    // if (!window.matchMedia("(max-width: 1024px)").matches) {
        if (camera.position.z >= 3.4 && camera.position.z <= 3.9 || camera.position.z == 4.5) {
            materialPlane1.uniforms.time.value = clock.getElapsedTime();
            materialPlane2.uniforms.time.value = clock.getElapsedTime();
            materialPlane3.uniforms.time.value = clock.getElapsedTime();
            materialPlane4.uniforms.time.value = clock.getElapsedTime();
            materialPlane5.uniforms.time.value = clock.getElapsedTime();
            materialPlane6.uniforms.time.value = clock.getElapsedTime();
            materialPlane7.uniforms.time.value = clock.getElapsedTime();
            materialPlane8.uniforms.time.value = clock.getElapsedTime();
            materialPlane9.uniforms.time.value = clock.getElapsedTime();
            materialPlane10.uniforms.time.value = clock.getElapsedTime();
            materialPlane11.uniforms.time.value = clock.getElapsedTime();
            materialPlane12.uniforms.time.value = clock.getElapsedTime();
            materialPlane13.uniforms.time.value = clock.getElapsedTime();
            materialPlane14.uniforms.time.value = clock.getElapsedTime();
        }
    // }
};

render();