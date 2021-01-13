import * as THREE from "three";

// import { GLTFLoader } from 'three-gltf-loader';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import * as POSTPROCESSING from "postprocessing";
// import { TweenMax as TM } from "gsap";
import { Interaction } from 'three.interaction';

import vertexShader from "./libs/glsl/vertex.glsl";
import fragmentShader from "./libs/glsl/fragment.glsl";

import displacement from "../assets/img/displace.jpg";
import displacement1 from "../assets/img/displace.png";
import displacement2 from "../assets/img/displace2.png";
import displacement3 from "../assets/img/displace3.png";
import displacement4 from "../assets/img/displace4.png"; //c le bon
import displacement5 from "../assets/img/displace5.jpg";
import displacement6 from "../assets/img/displace6.jpg";
import displacement7 from "../assets/img/displace7.jpg";
import displacement8 from "../assets/img/displace8.jpg";
import displacement9 from "../assets/img/displace9.png";

import atelier1 from "../assets/img/atelier1.png";
import atelier2 from "../assets/img/atelier2.png";
import atelier3 from "../assets/img/atelier3.jpg";
import atelier4 from "../assets/img/atelier4.jpg";
import atelier5 from "../assets/img/atelier5.png";
import atelier6 from "../assets/img/atelier6.png";
import atelier7 from "../assets/img/atelier7.jpg";
import atelier8 from "../assets/img/atelier8.png";

import socleModel from "../assets/model/socle.gltf";
import logoModel from "../assets/model/logo.glb";
import homeModel from "../assets/model/home.gltf";
import streetModel from "../assets/model/street.gltf";
// import pyloneModel from "../assets/model/navigation/pylone.gltf";
// import gridModel from "../assets/model/navigation/grid.gltf";
// import tableModel from "../assets/model/navigation/tableModel.gltf";
// import leftWallModel from "../assets/model/navigation/leftWall.gltf";
// import rightWallModel from "../assets/model/navigation/rightWall.gltf";
// import fieldModel from "../assets/model/navigation/fieldModel.gltf";
// import signModel from "../assets/model/navigation/sign.gltf";
// import greenScreenModel from "../assets/model/navigation/greenScreen.gltf";
// import tvModel from "../assets/model/navigation/tv.gltf";
// import tv2Model from "../assets/model/navigation/tv2.gltf";
// import fieldModel from "../assets/model/navigation/fieldModel.gltf";
import rightDoorModel from "../assets/model/rightDoor.gltf";
import leftDoorModel from "../assets/model/leftDoor.gltf";

import particle from "../assets/img/particle.png";

////////// SCENE //////////
var scene = new THREE.Scene();

////////// CAMERA //////////
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

/////// HORLOGE ///////
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
let customPass = new POSTPROCESSING.ShaderPass({vertexShader,fragmentShader});
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

// let lightCenterPlane = new THREE.PointLight(0x4cc9f0, 1.5, 14);
// lightCenterPlane.position.set(0, 0, 10)
// scene.add(lightCenterPlane);

let lightCenter = new THREE.DirectionalLight(0x000000, 10);
lightCenter.position.set(0, -1.5, 0)
lightCenter.target = targetLogo;
scene.add(lightCenter);

let lightCenterSocle = new THREE.PointLight(0x000000, 150, .6);
lightCenterSocle.position.set(0, -1.5, 0)
scene.add(lightCenterSocle);

const cyanColor = new THREE.Color(0x4cc9f0);
const cyanColorReset = new THREE.Color(0x000000);

let ambientLight = new THREE.AmbientLight(0x09021e, 8);
ambientLight.position.set(0, -1000, 0)
scene.add(ambientLight);

/////// 3D MODEL ///////

// HOME MODEL
var home;

var loaderHome = new GLTFLoader();
loaderHome.crossOrigin = true

loaderHome.load(homeModel, function(addHome) {
    home = addHome.scene;
    scene.add(home);
    home.position.set(-1.45, -10, 0)
    home.scale.set(100, 100, 100);
    home.rotation.y = -.35;
});

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
    logo.scale.set(0.00001, 0.00001, 0.00001)
});

// // FIELD MODEL
// var field;

// var loaderField = new GLTFLoader;
// loaderField.crossOrigin = true;

// loaderField.load(fieldModel, function(addField) {
//     field = addField.scene;
//     scene.add(field);
//     field.position.set(-1.2, -3, -48)
//     field.rotation.y = -.5 * Math.PI
//     field.scale.set(110, 110, 110)
// })

// // PYLONE MODEL
// var pylone;

// var loaderPylone = new GLTFLoader;
// loaderPylone.crossOrigin = true;

// loaderPylone.load(pyloneModel, function(addPylone) {
//     pylone = addPylone.scene;
//     scene.add(pylone);
//     pylone.position.set(-1.2, -3, -48)
//     pylone.rotation.y = -.5 * Math.PI
//     pylone.scale.set(110, 110, 110)
// })

// RIGHT DOOR MODEL
var rightDoor;

var loaderRightDoor = new GLTFLoader;
loaderRightDoor.crossOrigin = true;

loaderRightDoor.load(rightDoorModel, function(addRightDoor) {
    rightDoor = addRightDoor.scene;
    scene.add(rightDoor);
    rightDoor.position.set(.3, -5.8, -48)
    rightDoor.rotation.y = -.5 * Math.PI
    rightDoor.scale.set(110, 110, 110)
});

// LEFT DOOR MODEL
var leftDoor;

var loaderLeftDoor = new GLTFLoader;
loaderLeftDoor.crossOrigin = true;

loaderLeftDoor.load(leftDoorModel, function(addLeftDoor) {
    leftDoor = addLeftDoor.scene;
    scene.add(leftDoor);
    leftDoor.position.set(.3, -5.8, -48)
    leftDoor.rotation.y = -.5 * Math.PI
    leftDoor.scale.set(110, 110, 110)
});

// STREET MODEL
var street;

var loaderStreet = new GLTFLoader;
loaderStreet.crossOrigin = true;

loaderStreet.load(streetModel, function(addStreet) {
    street = addStreet.scene;
    scene.add(street);
    street.position.set(.7, -5.8, -48)
    street.rotation.y = -.5 * Math.PI
    street.scale.set(110, 110, 110)
});

/////// PLANES ///////
var plane = new THREE.PlaneGeometry(1.6/1.2, 0.9/1.2, 30, 30);

plane.receiveShadow = true;

// var materialPlane1 = new THREE.MeshPhongMaterial({
//     side: THREE.DoubleSide,
//     map: new THREE.TextureLoader().load(atelier1)
// });
// var materialPlane2 = new THREE.MeshPhongMaterial({
//     side: THREE.DoubleSide,
//     map: new THREE.TextureLoader().load(atelier2)
// });
// var materialPlane3 = new THREE.MeshPhongMaterial({
//     side: THREE.DoubleSide,
//     map: new THREE.TextureLoader().load(atelier3)
// });
// var materialPlane4 = new THREE.MeshPhongMaterial({
//     side: THREE.DoubleSide,
//     map: new THREE.TextureLoader().load(atelier4)
// });
// var materialPlane5 = new THREE.MeshPhongMaterial({
//     side: THREE.DoubleSide,
//     map: new THREE.TextureLoader().load(atelier5)
// });
// var materialPlane6 = new THREE.MeshPhongMaterial({
//     side: THREE.DoubleSide,
//     map: new THREE.TextureLoader().load(atelier6)
// });
// var materialPlane7 = new THREE.MeshPhongMaterial({
//     side: THREE.DoubleSide,
//     map: new THREE.TextureLoader().load(atelier7)
// });
// var materialPlane8 = new THREE.MeshPhongMaterial({
//     side: THREE.DoubleSide,
//     map: new THREE.TextureLoader().load(atelier8)
// });
// var materialPlane9 = new THREE.MeshPhongMaterial({
//     side: THREE.DoubleSide,
//     map: new THREE.TextureLoader().load(atelier8)
// });
// var materialPlane10 = new THREE.MeshPhongMaterial({
//     side: THREE.DoubleSide,
//     map: new THREE.TextureLoader().load(atelier8)
// });
// var materialPlane11 = new THREE.MeshPhongMaterial({
//     side: THREE.DoubleSide,
//     map: new THREE.TextureLoader().load(atelier8)
// });
// var materialPlane12 = new THREE.MeshPhongMaterial({
//     side: THREE.DoubleSide,
//     map: new THREE.TextureLoader().load(atelier8)
// });
// var materialPlane13 = new THREE.MeshPhongMaterial({
//     side: THREE.DoubleSide,
//     map: new THREE.TextureLoader().load(atelier8),
// });
// var materialPlane14 = new THREE.MeshPhongMaterial({
//     side: THREE.DoubleSide,
//     map: new THREE.TextureLoader().load(atelier8),
//     transparent: true
// });


/////// INITIATION DES TEXTURES ///////

let texture1 = new THREE.TextureLoader().load(atelier1)
let texture2 = new THREE.TextureLoader().load(atelier2)
let texture3 = new THREE.TextureLoader().load(atelier3)
let texture4 = new THREE.TextureLoader().load(atelier4)
let texture5 = new THREE.TextureLoader().load(atelier5)
let texture6 = new THREE.TextureLoader().load(atelier6)
let texture7 = new THREE.TextureLoader().load(atelier7)
let texture8 = new THREE.TextureLoader().load(atelier8)

/////// PLANES MATERIALS ///////

let planeOpacityDefault = 0.95;

var materialPlane1 = new THREE.ShaderMaterial({
    vertexShader,
    fragmentShader,
    uniforms: {
        time: { type: "f", value: 0.0 },
        alpha: { value: planeOpacityDefault },
        displaceHover: { type: "f", value: 0.0 },
        
        imagebw: { type: "t", value: texture7 },
        imagergb: { type: "t", value: texture5 },
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
        
        imagebw: { type: "t", value: texture7 },
        imagergb: { type: "t", value: texture5 },
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
        
        imagebw: { type: "t", value: texture7 },
        imagergb: { type: "t", value: texture5 },
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
        
        imagebw: { type: "t", value: texture7 },
        imagergb: { type: "t", value: texture5 },
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
        
        imagebw: { type: "t", value: texture7 },
        imagergb: { type: "t", value: texture5 },
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
        
        imagebw: { type: "t", value: texture7 },
        imagergb: { type: "t", value: texture5 },
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
        
        imagebw: { type: "t", value: texture7 },
        imagergb: { type: "t", value: texture5 },
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
        
        imagebw: { type: "t", value: texture7 },
        imagergb: { type: "t", value: texture5 },
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
        
        imagebw: { type: "t", value: texture7 },
        imagergb: { type: "t", value: texture5 },
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
        
        imagebw: { type: "t", value: texture7 },
        imagergb: { type: "t", value: texture5 },
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
        
        imagebw: { type: "t", value: texture7 },
        imagergb: { type: "t", value: texture5 },
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
        
        imagebw: { type: "t", value: texture7 },
        imagergb: { type: "t", value: texture5 },
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
        
        imagebw: { type: "t", value: texture7 },
        imagergb: { type: "t", value: texture5 },
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
        
        imagebw: { type: "t", value: texture7 },
        imagergb: { type: "t", value: texture5 },
        displacement: { type: "t", value: new THREE.TextureLoader().load(displacement4) },
        dispFactor: { type: "f", value: 0.0 },
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

/////// 3D TEXTS ///////
// var textMesh1, textMesh2, textMesh3, textMesh4, textMesh5, textMesh6, textMesh7, textMesh8;

// var loader = new THREE.FontLoader();

// loader.load('../assets/font/font.json', function(font) {

//     var textMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });

//     var textGeo1 = new THREE.TextGeometry('INSIDE THE TECH', {
//         font: font,
//         size: 0.05,
//         height: 0.001
//     });

//     var textGeo2 = new THREE.TextGeometry('ESCAPE GAME', {
//         font: font,
//         size: 0.05,
//         height: 0.001
//     });

//     var textGeo3 = new THREE.TextGeometry('BIG BROTHER', {
//         font: font,
//         size: 0.05,
//         height: 0.001
//     });

//     var textGeo4 = new THREE.TextGeometry('FOND VERT', {
//         font: font,
//         size: 0.05,
//         height: 0.001
//     });

//     var textGeo5 = new THREE.TextGeometry('MAPPING', {
//         font: font,
//         size: 0.05,
//         height: 0.001
//     });

//     var textGeo6 = new THREE.TextGeometry('MUSÉE MMI', {
//         font: font,
//         size: 0.05,
//         height: 0.001
//     });

//     var textGeo7 = new THREE.TextGeometry('RÉALITÉ VIRTUELLE', {
//         font: font,
//         size: 0.05,
//         height: 0.001
//     });

//     var textGeo8 = new THREE.TextGeometry('MUR INTERACTIF', {
//         font: font,
//         size: 0.05,
//         height: 0.001
//     });

//     /////// 3D TEXTS MESHS ///////
//     textMesh1 = new THREE.Mesh(textGeo1, textMaterial);
//     textMesh2 = new THREE.Mesh(textGeo2, textMaterial);
//     textMesh3 = new THREE.Mesh(textGeo3, textMaterial);
//     textMesh4 = new THREE.Mesh(textGeo4, textMaterial);
//     textMesh5 = new THREE.Mesh(textGeo5, textMaterial);
//     textMesh6 = new THREE.Mesh(textGeo6, textMaterial);
//     textMesh7 = new THREE.Mesh(textGeo7, textMaterial);
//     textMesh8 = new THREE.Mesh(textGeo8, textMaterial);

//     pivot1.add(textMesh1);
//     textMesh1.position.set(-.8, 4, 0);
//     textMesh1.scale.set(0, 0, 0);

//     pivot2.add(textMesh2);
//     textMesh2.position.set(0, 5, -.8);
//     textMesh2.rotation.y = -Math.PI / 2;
//     textMesh2.scale.set(0, 0, 0);

//     pivot3.add(textMesh3);
//     textMesh3.position.set(.8, 6, 0);
//     textMesh3.rotation.y = -Math.PI;
//     textMesh3.scale.set(0, 0, 0);

//     pivot4.add(textMesh4);
//     textMesh4.position.set(0, 7, .8);
//     textMesh4.rotation.y = Math.PI / 2;
//     textMesh4.scale.set(0, 0, 0);

//     pivot5.add(textMesh5);
//     textMesh5.position.set(-.8, 8, 0);
//     textMesh5.scale.set(0, 0, 0);

//     pivot6.add(textMesh6);
//     textMesh6.position.set(0, 9, -.8);
//     textMesh6.rotation.y = -Math.PI / 2;
//     textMesh6.scale.set(0, 0, 0);

//     pivot7.add(textMesh7);
//     textMesh7.position.set(.8, 10, 0);
//     textMesh7.rotation.y = -Math.PI;
//     textMesh7.scale.set(0, 0, 0);

//     pivot8.add(textMesh8);
//     textMesh8.position.set(0, 11, .8);
//     textMesh8.rotation.y = Math.PI / 2;
//     textMesh8.rotation.z = rotateZ;
//     textMesh8.scale.set(0, 0, 0);
// });


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
var screenWidth = (window.innerWidth);
var ScreenHeigth = (window.innerHeight);

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
            Math.random() * 3.4 - 1.7) //20-10
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
let canvas = document.querySelector('canvas');
let sm = document.querySelectorAll('.sm');
let sm1 = document.querySelector('.sm__1');
let sm2 = document.querySelector('.sm__2');
let sm3 = document.querySelector('.sm__3');
let musicBtn = document.querySelector('.musicBtn');
let bgCol = document.querySelectorAll('.colContainer .col');
let bgRow = document.querySelectorAll('.rowContainer .row');
let cursor = document.querySelector('.cursor');
let cursorShapeIn = document.querySelector('.cursor-shape_in');
let cursorShapeOut = document.querySelector('.cursor-shape_out');
let containerTimeline = document.querySelector('.containerTimeline');
let workShopButton = document.querySelectorAll('.workShopButton');
let workShopButtonMask = document.querySelectorAll('.mask');
let timelineIndication = document.querySelector('.indication');
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

window.addEventListener('load', function() {
    TweenMax.to(bgCol, { duration: 1, clipPath: "inset(0% 0% 0% 0%)", stagger: 0.02 });
    TweenMax.to(bgCol, { duration: .5, background: '#f72585', opacity: .325, stagger: 0.02 });
    TweenMax.to(bgCol, { duration: .5, background: '#0d0437', opacity: .65, stagger: 0.02 });
    TweenMax.to(bgRow, { duration: 1, clipPath: "inset(0% 0% 0% 0%)", stagger: 0.0355555 });
    TweenMax.to(bgRow, { duration: .5, background: '#f72585', opacity: .325, stagger: 0.0355555 });
    TweenMax.to(bgRow, { duration: .5, background: '#0d0437', opacity: .65, stagger: 0.0355555 });
    TweenMax.to(bgCol, { duration: .5, background: '#f72585', opacity: .05, stagger: 0.02, repeat: -1, yoyo: true, delay: 2 });
    TweenMax.to(bgRow, { duration: .5, background: '#f72585', opacity: .05, stagger: 0.0355555, repeat: -1, yoyo: true, delay: 2 });
    canvas.classList.add('hologramActive')
})


/////// PLANE HOVER SHADERS EFFECT ///////
planeMesh1.on('mouseover', function(ev) {
    if (ev && planeAxe.position.y == -4) {
        console.log(ev)
        gsap.to(materialPlane1.uniforms.alpha, 1, { value: 1.0, ease: Power2.easeOut })
        gsap.to(materialPlane1.uniforms.dispFactor, .9, { value: 1.0, ease: Power3.easeOut });
    }
});
planeMesh1.on('mouseout', function(ev) {
    if (ev) {
        gsap.to(materialPlane1.uniforms.alpha, 1, { value: planeOpacityDefault, ease: Power2.easeOut })
        gsap.to(materialPlane1.uniforms.dispFactor, .9, { value: 0.0, ease: Power3.easeOut });
    }
});

planeMesh2.on('mouseover', function(ev) {
    if (ev && planeAxe.position.y == -5) {
        console.log(ev)
        gsap.to(materialPlane2.uniforms.alpha, 1, { value: 1.0, ease: Power2.easeOut })
        gsap.to(materialPlane2.uniforms.dispFactor, .9, { value: 1.0, ease: Power3.easeOut });
    }
});
planeMesh2.on('mouseout', function(ev) {
    if (ev) {
        gsap.to(materialPlane2.uniforms.alpha, 1, { value: planeOpacityDefault, ease: Power2.easeOut })
        gsap.to(materialPlane2.uniforms.dispFactor, .9, { value: 0.0, ease: Power3.easeOut });
    }
});

planeMesh3.on('mouseover', function(ev) {
    if (ev && planeAxe.position.y == -6) {
        console.log(ev)
        gsap.to(materialPlane3.uniforms.alpha, 1, { value: 1.0, ease: Power2.easeOut })
        gsap.to(materialPlane3.uniforms.dispFactor, .9, { value: 1.0, ease: Power3.easeOut });
    }
});
planeMesh3.on('mouseout', function(ev) {
    if (ev) {
        gsap.to(materialPlane3.uniforms.alpha, 1, { value: planeOpacityDefault, ease: Power2.easeOut })
        gsap.to(materialPlane3.uniforms.dispFactor, .9, { value: 0.0, ease: Power3.easeOut });
    }
});

planeMesh4.on('mouseover', function(ev) {
    if (ev && planeAxe.position.y == -7) {
        console.log(ev)
        gsap.to(materialPlane4.uniforms.alpha, 1, { value: 1.0, ease: Power2.easeOut })
        gsap.to(materialPlane4.uniforms.dispFactor, .9, { value: 1.0, ease: Power3.easeOut });
    }
});
planeMesh4.on('mouseout', function(ev) {
    if (ev) {
        gsap.to(materialPlane4.uniforms.alpha, 1, { value: planeOpacityDefault, ease: Power2.easeOut })
        gsap.to(materialPlane4.uniforms.dispFactor, .9, { value: 0.0, ease: Power3.easeOut });
    }
});

planeMesh5.on('mouseover', function(ev) {
    if (ev && planeAxe.position.y == -8) {
        console.log(ev)
        gsap.to(materialPlane5.uniforms.alpha, 1, { value: 1.0, ease: Power2.easeOut })
        gsap.to(materialPlane5.uniforms.dispFactor, .9, { value: 1.0, ease: Power3.easeOut });
    }
});
planeMesh5.on('mouseout', function(ev) {
    if (ev) {
        gsap.to(materialPlane5.uniforms.alpha, 1, { value: planeOpacityDefault, ease: Power2.easeOut })
        gsap.to(materialPlane5.uniforms.dispFactor, .9, { value: 0.0, ease: Power3.easeOut });
    }
});

planeMesh6.on('mouseover', function(ev) {
    if (ev && planeAxe.position.y == -9) {
        console.log(ev)
        gsap.to(materialPlane6.uniforms.alpha, 1, { value: 1.0, ease: Power2.easeOut })
        gsap.to(materialPlane6.uniforms.dispFactor, .9, { value: 1.0, ease: Power3.easeOut });
    }
});
planeMesh6.on('mouseout', function(ev) {
    if (ev) {
        gsap.to(materialPlane6.uniforms.alpha, 1, { value: planeOpacityDefault, ease: Power2.easeOut })
        gsap.to(materialPlane6.uniforms.dispFactor, .9, { value: 0.0, ease: Power3.easeOut });
    }
});

planeMesh7.on('mouseover', function(ev) {
    if (ev && planeAxe.position.y == -10) {
        console.log(ev)
        gsap.to(materialPlane7.uniforms.alpha, 1, { value: 1.0, ease: Power2.easeOut })
        gsap.to(materialPlane7.uniforms.dispFactor, .9, { value: 1.0, ease: Power3.easeOut });
    }
});
planeMesh7.on('mouseout', function(ev) {
    if (ev) {
        gsap.to(materialPlane7.uniforms.alpha, 1, { value: planeOpacityDefault, ease: Power2.easeOut })
        gsap.to(materialPlane7.uniforms.dispFactor, .9, { value: 0.0, ease: Power3.easeOut });
    }
});

planeMesh8.on('mouseover', function(ev) {
    if (ev && planeAxe.position.y == -11) {
        console.log(ev)
        gsap.to(materialPlane8.uniforms.alpha, 1, { value: 1.0, ease: Power2.easeOut })
        gsap.to(materialPlane8.uniforms.dispFactor, .9, { value: 1.0, ease: Power3.easeOut });
    }
});
planeMesh8.on('mouseout', function(ev) {
    if (ev) {
        gsap.to(materialPlane8.uniforms.alpha, 1, { value: planeOpacityDefault, ease: Power2.easeOut })
        gsap.to(materialPlane8.uniforms.dispFactor, .9, { value: 0.0, ease: Power3.easeOut });
    }
});

planeMesh9.on('mouseover', function(ev) {
    if (ev && planeAxe.position.y == -12) {
        console.log(ev)
        gsap.to(materialPlane9.uniforms.alpha, 1, { value: 1.0, ease: Power2.easeOut })
        gsap.to(materialPlane9.uniforms.dispFactor, .9, { value: 1.0, ease: Power3.easeOut });
    }
});
planeMesh9.on('mouseout', function(ev) {
    if (ev) {
        gsap.to(materialPlane9.uniforms.alpha, 1, { value: planeOpacityDefault, ease: Power2.easeOut })
        gsap.to(materialPlane9.uniforms.dispFactor, .9, { value: 0.0, ease: Power3.easeOut });
    }
});

planeMesh10.on('mouseover', function(ev) {
    if (ev && planeAxe.position.y == -13) {
        console.log(ev)
        gsap.to(materialPlane10.uniforms.alpha, 1, { value: 1.0, ease: Power2.easeOut })
        gsap.to(materialPlane10.uniforms.dispFactor, .9, { value: 1.0, ease: Power3.easeOut });
    }
});
planeMesh10.on('mouseout', function(ev) {
    if (ev) {
        gsap.to(materialPlane10.uniforms.alpha, 1, { value: planeOpacityDefault, ease: Power2.easeOut })
        gsap.to(materialPlane10.uniforms.dispFactor, .9, { value: 0.0, ease: Power3.easeOut });
    }
});

planeMesh11.on('mouseover', function(ev) {
    if (ev && planeAxe.position.y == -14) {
        console.log(ev)
        gsap.to(materialPlane11.uniforms.alpha, 1, { value: 1.0, ease: Power2.easeOut })
        gsap.to(materialPlane11.uniforms.dispFactor, .9, { value: 1.0, ease: Power3.easeOut });
    }
});
planeMesh11.on('mouseout', function(ev) {
    if (ev) {
        gsap.to(materialPlane11.uniforms.alpha, 1, { value: planeOpacityDefault, ease: Power2.easeOut })
        gsap.to(materialPlane11.uniforms.dispFactor, .9, { value: 0.0, ease: Power3.easeOut });
    }
});

planeMesh12.on('mouseover', function(ev) {
    if (ev && planeAxe.position.y == -15) {
        console.log(ev)
        gsap.to(materialPlane12.uniforms.alpha, 1, { value: 1.0, ease: Power2.easeOut })
        gsap.to(materialPlane12.uniforms.dispFactor, .9, { value: 1.0, ease: Power3.easeOut });
    }
});
planeMesh12.on('mouseout', function(ev) {
    if (ev) {
        gsap.to(materialPlane12.uniforms.alpha, 1, { value: planeOpacityDefault, ease: Power2.easeOut })
        gsap.to(materialPlane12.uniforms.dispFactor, .9, { value: 0.0, ease: Power3.easeOut });
    }
});

planeMesh13.on('mouseover', function(ev) {
    if (ev && planeAxe.position.y == -16) {
        console.log(ev)
        gsap.to(materialPlane13.uniforms.alpha, 1, { value: 1.0, ease: Power2.easeOut })
        gsap.to(materialPlane13.uniforms.dispFactor, .9, { value: 1.0, ease: Power3.easeOut });
    }
});
planeMesh13.on('mouseout', function(ev) {
    if (ev) {
        gsap.to(materialPlane13.uniforms.alpha, 1, { value: planeOpacityDefault, ease: Power2.easeOut })
        gsap.to(materialPlane13.uniforms.dispFactor, .9, { value: 0.0, ease: Power3.easeOut });
    }
});

planeMesh14.on('mouseover', function(ev) {
    if (ev && planeAxe.position.y == -17) {
        console.log(ev)
        gsap.to(materialPlane14.uniforms.alpha, 1, { value: 1.0, ease: Power2.easeOut })
        gsap.to(materialPlane14.uniforms.dispFactor, .9, { value: 1.0, ease: Power3.easeOut });
    }
});
planeMesh14.on('mouseout', function(ev) {
    if (ev) {
        gsap.to(materialPlane14.uniforms.alpha, 1, { value: planeOpacityDefault, ease: Power2.easeOut })
        gsap.to(materialPlane14.uniforms.dispFactor, .9, { value: 0.0, ease: Power3.easeOut });
    }
});

/////// BACKHOME BUTTON EVENTS ///////
function functionBtnBackHome() {
    scene.add(particleMesh);
    canvas.classList.remove('hologramDefault')
    canvas.classList.add('hologramActive')
    btnBackHome.disabled = true;
    btnStart.disabled = false;
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
        gsap.to(planeAxe.scale, 0, { y: 0.0001, x: 0.0001, z: 0.0001, delay: 3 })
        gsap.to(planeAxe.scale, 0, { y: 1, x: 1, z: 1, delay: 3.1 })
    }
    //CAMERA ANIM
    if (window.matchMedia("(max-width: 600px)").matches) {
        gsap.to(camera.position, 3, { z: 11.3, ease: "power3.inOut" })
    } else {
        gsap.to(camera.position, 3, { z: 10, ease: "power3.inOut" })
    }
    //HTML ELEMENTS ANIM
    titleSvgPath.forEach(e => {
        e.classList.add("pathTitleIn")
        e.classList.remove("pathTitleOut")
    });
    titleSvgLine.classList.add("pathLineIn")
    titleSvgLine.classList.remove("pathLineOut")

    littleTitleSvgPath.forEach(e => {
        e.classList.remove("pathTitleIn")
        e.classList.add("pathTitleOut")
    });
    littleTitleSvgLine.classList.remove("pathLineIn")
    littleTitleSvgLine.classList.add("pathLineOut")
    TweenMax.to(btnStart, .75, { opacity: 1, clipPath: "inset(0% 0% 0% 0%)", delay: .75, ease: "power3.inOut" })
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
        //     //TEXT ROTATION Z ANIM
        // gsap.to(textMesh1.rotation, 2.25, { z: rotateZ, ease: "power3.inOut" })
        // gsap.to(textMesh2.rotation, 2.25, { z: rotateZ, ease: "power3.inOut" })
        // gsap.to(textMesh3.rotation, 2.25, { z: rotateZ, ease: "power3.inOut" })
        // gsap.to(textMesh4.rotation, 2.25, { z: rotateZ, ease: "power3.inOut" })
        // gsap.to(textMesh5.rotation, 2.25, { z: rotateZ, ease: "power3.inOut" })
        // gsap.to(textMesh6.rotation, 2.25, { z: rotateZ, ease: "power3.inOut" })
        // gsap.to(textMesh7.rotation, 2.25, { z: rotateZ, ease: "power3.inOut" })
        // gsap.to(textMesh8.rotation, 2.25, { z: rotateZ, ease: "power3.inOut" })
        //     //TEXT SCALE ANIM
        // gsap.to(textMesh1.scale, .75, { z: 0, x: 0, y: 0, ease: "power3.inOut" })
        // gsap.to(textMesh2.scale, .75, { z: 0, x: 0, y: 0, ease: "power3.inOut" })
        // gsap.to(textMesh3.scale, .75, { z: 0, x: 0, y: 0, ease: "power3.inOut" })
        // gsap.to(textMesh4.scale, .75, { z: 0, x: 0, y: 0, ease: "power3.inOut" })
        // gsap.to(textMesh5.scale, .75, { z: 0, x: 0, y: 0, ease: "power3.inOut" })
        // gsap.to(textMesh6.scale, .75, { z: 0, x: 0, y: 0, ease: "power3.inOut" })
        // gsap.to(textMesh7.scale, .75, { z: 0, x: 0, y: 0, ease: "power3.inOut" })
        // gsap.to(textMesh8.scale, .75, { z: 0, x: 0, y: 0, ease: "power3.inOut" })
        //MODELS ANIM
    gsap.to(logo.position, 2.25, { y: -9.8, ease: "power3.inOut" })
    gsap.to(logo.scale, 2.25, { z: 0.00001, x: 0.00001, y: 0.00001, ease: "power3.inOut", })
    gsap.to(logo.rotation, 2.25, { z: -.725, y: 0, ease: "power3.inOut" })
    gsap.to(home.position, 3, { z: 0, x: -1.45, ease: "power3.inOut" })
    gsap.to(home.rotation, 3, { y: -.35, z: 0, ease: "power3.inOut" })
    gsap.to(socle.position, 2.25, { y: -10.7, ease: "power3.inOut" })
    gsap.to(socle.rotation, 2.25, { y: 0, ease: "power3.inOut" })
        //LIGHTS ANIM
    TweenMax.to(lightCenterSocle.color, .75, { r: cyanColorReset.r, g: cyanColorReset.g, b: cyanColorReset.b, delay: .75 });
    TweenMax.to(lightCenter.color, .75, { r: cyanColorReset.r, g: cyanColorReset.g, b: cyanColorReset.b, delay: .75 });
    //SWITCH ELEMENTS ON CLICK
    homeContainer.classList.add('close');
    homeContainer.classList.remove('open');
    btnBackHome.classList.add('close');
    btnBackHome.classList.remove('open');
    canvas.style.zIndex = -1;
}

///// START BUTTON EVENTS /////
function functionBtnStart() {
    // Supression des particules
    scene.remove(scene.getObjectByName("ParticleObjects"));

    canvas.classList.add('hologramDefault')
    canvas.classList.remove('hologramActive')
    btnBackHome.disabled = false;
    btnStart.disabled = true;
    //AXES ANIM
    gsap.to(planeAxe.position, 1.5, { y: -17, ease: "power3.inOut", delay: 1.25 })
    console.log(planeAxe.position)
    gsap.to(planeAxe.rotation, 1.5, { y: -3.5 * Math.PI, ease: "power3.inOut", delay: 1.25 })
        //CAMERA ANIM
    if (window.matchMedia("(max-width: 600px)").matches) {
        gsap.to(camera.position, 3, { z: 4.5, ease: "power3.inOut" })
    } else {
        gsap.to(camera.position, 3, { z: 3.7, ease: "power3.inOut" })
    }

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
    littleTitleSvgLine.classList.add("pathLineIn")
    littleTitleSvgLine.classList.remove("pathLineOut")
    TweenMax.to(btnStart, 1, { opacity: 0, clipPath: "inset(0% 0% 0% 100%)", ease: "power3.inOut" })
    TweenMax.to(btnBackHome, .75, { opacity: 1, clipPath: "inset(0% 0% 0% 0%)", delay: .75, ease: "power3.inOut" })
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
    gsap.to(planeMesh14.material, 2, {opacity: 0.3});

        //     //TEXT ROTATION Z ANIM
        // gsap.to(textMesh8.rotation, 1.5, { z: 0, ease: "power3.inOut", delay: 1.25 })
        //     //TEXT SCALE ANIM    
        // gsap.to(textMesh8.scale, .75, { z: 1, x: 1, y: 1, ease: "power3.inOut", delay: 2.35 })
        //MODELS ANIM
    gsap.to(logo.position, 3, { y: 0, ease: "power3.inOut" })
    gsap.to(logo.scale, 3, { z: .95, x: .95, y: .95, ease: "power3.inOut", delay: .25 })
    gsap.to(logo.rotation, 3, { z: 0.25, ease: "power3.inOut" })
    gsap.to(home.position, 3, { z: 105, x: 20, ease: "power3.inOut" })
    gsap.to(home.rotation, 3, { y: -Math.PI, z: Math.PI, ease: "power3.inOut" })
    gsap.to(socle.position, 3, { y: -2.5, ease: "power3.inOut" })
    gsap.to(socle.rotation, 3, { y: -Math.PI, ease: "power3.inOut" })
        //LIGHTS ANIM
    TweenMax.to(lightCenterSocle.color, .75, { r: cyanColor.r, g: cyanColor.g, b: cyanColor.b, delay: 1 });
    TweenMax.to(lightCenter.color, .75, { r: cyanColor.r, g: cyanColor.g, b: cyanColor.b, delay: 1 });
    //SWITCH ELEMENTS ON CLICK  
    
    setTimeout(function() {

        //AXES ANIM
        gsap.to(planeAxe.position, 1.5, { y: -17, ease: "power3.inOut", delay: 1.25 })
        gsap.to(planeAxe.rotation, 1.5, { y: -3.5 * Math.PI, ease: "power3.inOut", delay: 1.25 })
            //CAMERA ANIM
        if (window.matchMedia("(max-width: 600px)").matches) {
            gsap.to(camera.position, 3, { z: 4.5, ease: "power3.inOut" })
        } else {
            gsap.to(camera.position, 3, { z: 3.7, ease: "power3.inOut" })
        }
        TweenMax.to(btnStart, 1, { opacity: 0, clipPath: "inset(0% 0% 0% 100%)", ease: "power3.inOut" })
        TweenMax.to(btnBackHome, .75, { opacity: 1, clipPath: "inset(0% 0% 0% 0%)", delay: .75, ease: "power3.inOut" })
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
            //     //TEXT ROTATION Z ANIM
            // gsap.to(textMesh8.rotation, 1.5, { z: 0, ease: "power3.inOut", delay: 1.25 })
            //     //TEXT SCALE ANIM    
            // gsap.to(textMesh8.scale, .75, { z: 1, x: 1, y: 1, ease: "power3.inOut", delay: 2.35 })
            //MODELS ANIM
        gsap.to(logo.position, 3, { y: 0, ease: "power3.inOut" })
        gsap.to(logo.scale, 3, { z: .95, x: .95, y: .95, ease: "power3.inOut", delay: .25 })
        gsap.to(logo.rotation, 3, { z: 0.25, ease: "power3.inOut" })
        gsap.to(home.position, 3, { z: 105, x: 20, ease: "power3.inOut" })
        gsap.to(home.rotation, 3, { y: -Math.PI, z: Math.PI, ease: "power3.inOut" })
        gsap.to(socle.position, 3, { y: -2.5, ease: "power3.inOut" })
        gsap.to(socle.rotation, 3, { y: -Math.PI, ease: "power3.inOut" })
            //LIGHTS ANIM
        TweenMax.to(lightCenterSocle.color, .75, { r: cyanColor.r, g: cyanColor.g, b: cyanColor.b, delay: 1 });
        TweenMax.to(lightCenter.color, .75, { r: cyanColor.r, g: cyanColor.g, b: cyanColor.b, delay: 1 });
        //SWITCH ELEMENTS ON CLICK  
        setTimeout(function() {
            btnBackHome.classList.add('open');
            btnBackHome.classList.remove('close');
            homeContainer.classList.add('open');
            homeContainer.classList.remove('close');
            canvas.style.zIndex = 1;
        }, 1500)
    }, 1000)
}

btnStart.addEventListener('click', function() {
    functionBtnStart();
    setTimeout(function() {
        spanContainerStartMouseOut.classList.remove('neonText');
    }, 750)
})

btnStart.addEventListener('mouseenter', function() {
    TweenMax.to(".spanContainerStartMouseover span", { duration: .5, translateY: -40, stagger: { each: 0.01, from: "center" }, ease: "power2.inOut" });
    TweenMax.to(".spanContainerStartMouseout span", { duration: .5, translateY: 0, stagger: { each: 0.01, from: "center" }, ease: "power2.inOut" });
    spanContainerStartMouseOut.classList.add('neonText');
    cursorShapeIn.classList.add('mouseover');
})

btnStart.addEventListener('mouseleave', function() {
    TweenMax.to(".spanContainerStartMouseover span", { duration: .5, translateY: 0, stagger: { each: 0.01, from: "center" }, ease: "power2.inOut" });
    TweenMax.to(".spanContainerStartMouseout span", { duration: .5, translateY: 40, stagger: { each: 0.01, from: "center" }, ease: "power2.inOut" });
    spanContainerStartMouseOut.classList.remove('neonText');
    cursorShapeIn.classList.remove('mouseover');
})

btnBackHome.addEventListener('click', function() {
    functionBtnBackHome();
    setTimeout(function() {
        spanContainerBackMouseOut.classList.remove('neonText');
    }, 750)
})

btnBackHome.addEventListener('mouseenter', function() {
    TweenMax.to(".spanContainerBackMouseover span", { duration: .5, translateY: -40, stagger: .027, ease: "power2.inOut" });
    TweenMax.to(".spanContainerBackMouseout span", { duration: .5, translateY: 0, stagger: .027, ease: "power2.inOut" });
    spanContainerBackMouseOut.classList.add('neonText');
    cursorShapeIn.classList.add('mouseover');
})

btnBackHome.addEventListener('mouseleave', function() {
    TweenMax.to(".spanContainerBackMouseover span", { duration: .5, translateY: 0, stagger: .027, ease: "power2.inOut" });
    TweenMax.to(".spanContainerBackMouseout span", { duration: .5, translateY: 40, stagger: .027, ease: "power2.inOut" });
    spanContainerBackMouseOut.classList.remove('neonText');
    cursorShapeIn.classList.remove('mouseover');
})

///// BUTTON START HOVER /////
let btnStartText = "Découvrir les ateliers"
let charsTextBtnStart = btnStartText.split('')

charsTextBtnStart.forEach(letter => {
    let btnStartchar = document.createElement('span')
    btnStartchar.innerHTML = letter
    spanContainerStartMouseOver.append(btnStartchar)
});

charsTextBtnStart.forEach(letter => {
    let btnStartchar = document.createElement('span')
    btnStartchar.innerHTML = letter
    spanContainerStartMouseOut.append(btnStartchar)
});

///// BUTTON BACK HOVER /////
let btnBackText = "Retour"
let charsTextBtnBack = btnBackText.split('')

charsTextBtnBack.forEach(letter => {
    let btnBackchar = document.createElement('span')
    btnBackchar.innerHTML = letter
    spanContainerBackMouseOver.append(btnBackchar)
});

charsTextBtnBack.forEach(letter => {
    let btnBackchar = document.createElement('span')
    btnBackchar.innerHTML = letter
    spanContainerBackMouseOut.append(btnBackchar)
});

///// PLANES CLICK /////
planeMesh14.on('click', function() {
    gsap.to(camera.position, 3, { z: -20, ease: "power3.inOut" })
    gsap.to(leftDoor.position, 1.5, { x: -13, ease: "power3.inOut", delay: .75 })
    gsap.to(rightDoor.position, 1.5, { x: 13, ease: "power3.inOut", delay: .75 })
})

console.log(logo)

///// TIMELINE /////
containerTimeline.addEventListener('mouseenter', function() {
    TweenMax.to(workShopButton, { duration: .25, clipPath: "inset(0% 0% 0% 0%)", stagger: 0.02, ease: "power3.inOut" });
    TweenMax.to(workShopButtonMask, { duration: .25, width: "100%", stagger: 0.02, ease: "power3.inOut" });
    TweenMax.to(workShopButtonMask, { duration: .25, width: "2px", stagger: 0.02, ease: "power3.inOut", delay: .5 });
    TweenMax.to(containerTimeline, { duration: 0, clipPath: "inset(0% 0% 0% 0%)", ease: "power3.inOut" });
    timelineIndication.classList.add('switch');
})

containerTimeline.addEventListener('mouseleave', function() {
    TweenMax.to(workShopButton, { duration: .25, clipPath: "inset(0% 0% 0% 99%)", stagger: 0.02, ease: "power3.inOut" });
    TweenMax.to(workShopButtonMask, { duration: .25, width: "100%", stagger: 0.02, ease: "power3.inOut" });
    TweenMax.to(workShopButtonMask, { duration: .25, width: "2px", stagger: 0.02, ease: "power3.inOut", delay: .5 });
    TweenMax.to(containerTimeline, { duration: .25, clipPath: "inset(0% 0% 0% 70%)", ease: "power3.inOut" });
    setTimeout(function() {
        timelineIndication.classList.remove('switch');
    }, 500)

})

/////// TIMELINE BUTTONS HOVER ///////
workShopButton1.addEventListener('click', function() { // WORKSHOP 1
})

workShopButton2.addEventListener('click', function() { // WORKSHOP 2
})

workShopButton3.addEventListener('click', function() { // WORKSHOP 3

})

workShopButton4.addEventListener('click', function() { // WORKSHOP 4
})


workShopButton5.addEventListener('click', function() { // WORKSHOP 5

})

workShopButton6.addEventListener('click', function() { // WORKSHOP 6

})

workShopButton7.addEventListener('click', function() { // WORKSHOP 7

})

workShopButton8.addEventListener('click', function() { // WORKSHOP 8

})

workShopButton9.addEventListener('click', function() { // WORKSHOP 9

})

workShopButton10.addEventListener('click', function() { // WORKSHOP 10

})

workShopButton11.addEventListener('click', function() { // WORKSHOP 11

})

workShopButton12.addEventListener('click', function() { // WORKSHOP 12

})

workShopButton13.addEventListener('click', function() { // WORKSHOP 13

})

workShopButton14.addEventListener('click', function() { // WORKSHOP 14

})

workShopButton14.addEventListener('mouseleave', function() {
    workShopButton14.classList.add('mouseout')
    workShopButton14.classList.remove('mouseover')
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

///// CUSTOM CURSOR /////
const pixelRatio = window.devicePixelRatio;

Math.dist = (dx, dy) => {
    return Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2))
}

class Cursor {
    constructor(cursor) {
        // this.container = window["cursor"];
        this.shape = cursor;
        // console.log(this.shape)
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
        this.friction = .5;
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
        const max_distance = 700;
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

const _cursorIn = new Cursor(cursorShapeIn);
// const _cursorOut = new Cursor("cursor-shape_out");

// document.addEventListener('mousemove', e => {
//     cursorShapeOut.setAttribute("style", "top: "+(e.pageY - 10)+"px; left: "+(e.pageX - 10)+"px;")
// })

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

buttons.forEach(button => {
    button.addEventListener("pointerenter", handleMouseEnter);
    button.addEventListener("pointerleave", handleMouseLeave);
});

sm.forEach(media => {
    media.addEventListener("pointerenter", handleMouseEnter);
    media.addEventListener("pointerleave", handleMouseLeave);
});

workShopButton.forEach(button => {
    button.addEventListener("pointerenter", handleMouseEnter);
    button.addEventListener("pointerleave", handleMouseLeave);
})

document.body.addEventListener("pointermove", updateCursorPosition);

function updateCursorPosition(e) {
    mouse.x = e.pageX;
    mouse.y = e.pageY;
}

function updateCursor() {
    gsap.set(cursor, {
        x: mouse.x,
        y: mouse.y,
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

updateCursor();

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


///// SCROLL FUNCTIONS /////
function scrollUp() {
    camera.position.z += 1;
    if (planeAxe.position.y <= -17 && planeAxe.position.y >= -17.1) {
        scene.add(particleMesh);
        //AXES ANIM
        gsap.to(planeAxe.position, 2.25, { y: -26.5, ease: "power3.inOut" })
        gsap.to(planeAxe.rotation, 2.25, { y: 0, ease: "power3.inOut" })
            //CAMERA ANIM
        if (window.matchMedia("(max-width: 600px)").matches) {
            gsap.to(camera.position, 3, { z: 11.3, ease: "power3.inOut" })
        } else {
            gsap.to(camera.position, 3, { z: 10, ease: "power3.inOut" })
        }
        //HTML ELEMENTS ANIM
        canvas.classList.remove('hologramDefault')
        canvas.classList.add('hologramActive')
        btnBackHome.disabled = true;
        btnStart.disabled = false;
        titleSvgPath.forEach(e => {
            e.classList.add("pathTitleIn")
            e.classList.remove("pathTitleOut")
        });
        titleSvgLine.classList.add("pathLineIn")
        titleSvgLine.classList.remove("pathLineOut")

        littleTitleSvgPath.forEach(e => {
            e.classList.remove("pathTitleIn")
            e.classList.add("pathTitleOut")
        });
        littleTitleSvgLine.classList.remove("pathLineIn")
        littleTitleSvgLine.classList.add("pathLineOut")
        TweenMax.to(btnStart, .75, { opacity: 1, clipPath: "inset(0% 0% 0% 0%)", delay: .75, ease: "power3.inOut" })
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
            //     //TEXT ROTATION Z ANIM
            // gsap.to(textMesh8.rotation, 3, { z: rotateZ, ease: "power3.inOut" })
            //     //TEXT SCALE ANIM
            // gsap.to(textMesh8.scale, .75, { z: 0, x: 0, y: 0, ease: "power3.inOut" })
            //MODELS ANIM
        gsap.to(logo.position, 2.25, { y: -9.8, ease: "power3.inOut" })
        gsap.to(logo.scale, 2.25, { z: 0, x: 0, y: 0, ease: "power3.inOut", })
        gsap.to(logo.rotation, 2.25, { z: -.725, y: 0, ease: "power3.inOut" })
        gsap.to(home.position, 3, { z: 0, x: -1.45, ease: "power3.inOut" })
        gsap.to(home.rotation, 3, { y: -.35, z: 0, ease: "power3.inOut" })
        gsap.to(socle.position, 2.25, { y: -10.7, ease: "power3.inOut" })
        gsap.to(socle.rotation, 2.25, { y: 0, ease: "power3.inOut" })
            //LIGHTS ANIM
        TweenMax.to(lightCenterSocle.color, .75, { r: cyanColorReset.r, g: cyanColorReset.g, b: cyanColorReset.b, delay: .75 });
        TweenMax.to(lightCenter.color, .75, { r: cyanColorReset.r, g: cyanColorReset.g, b: cyanColorReset.b, delay: .75 });
        //SWITCH ELEMENTS ON CLICK
        homeContainer.classList.add('close');
        homeContainer.classList.remove('open');
        btnBackHome.classList.add('close');
        btnBackHome.classList.remove('open');
        canvas.style.zIndex = -1;
    } else if (planeAxe.position.y <= -16 && planeAxe.position.y >= -17.1) {
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
            //     //TEXT ROTATION Z ANIM
            // gsap.to(textMesh8.rotation, .75, { z: 0, ease: "power3.inOut", })
            // gsap.to(textMesh7.rotation, .75, { z: rotateZ, ease: "power3.inOut", })
            //     //TEXT SCALE ANIM
            // gsap.to(textMesh8.scale, .75, { z: 1, x: 1, y: 1, ease: "power3.inOut", delay: .15 })
            // gsap.to(textMesh7.scale, .75, { z: 0, x: 0, y: 0, ease: "power3.inOut" })
    } else if (planeAxe.position.y <= -15 && planeAxe.position.y >= -16.1) {
        //AXES ANIM
        gsap.to(planeAxe.position, .75, { y: -16, ease: "power3.inOut" })
        gsap.to(planeAxe.rotation, .75, { y: -4 * Math.PI, ease: "power3.inOut" })
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
        gsap.to(planeMesh13.rotation, .75, { z: 0, ease: "power3.inOut" })
        gsap.to(planeMesh14.rotation, .75, { z: rotateZ, ease: "power3.inOut" })
            //TEXT ROTATION Z ANIM
            // gsap.to(textMesh7.rotation, .75, { z: 0, ease: "power3.inOut", })
            // gsap.to(textMesh6.rotation, .75, { z: rotateZ, ease: "power3.inOut", })
            //     //TEXT SCALE ANIM
            // gsap.to(textMesh7.scale, .75, { z: 1, x: 1, y: 1, ease: "power3.inOut", delay: .15 })
            // gsap.to(textMesh6.scale, .75, { z: 0, x: 0, y: 0, ease: "power3.inOut" })
    } else if (planeAxe.position.y <= -14 && planeAxe.position.y >= -15.1) {
        //AXES ANIM
        gsap.to(planeAxe.position, .75, { y: -15, ease: "power3.inOut" })
        gsap.to(planeAxe.rotation, .75, { y: -4.5 * Math.PI, ease: "power3.inOut" })
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
        gsap.to(planeMesh12.rotation, .75, { z: 0, ease: "power3.inOut" })
        gsap.to(planeMesh13.rotation, .75, { z: rotateZ, ease: "power3.inOut" })
        gsap.to(planeMesh14.rotation, .75, { z: rotateZ, ease: "power3.inOut" })
            //TEXT ROTATION Z ANIM
            // gsap.to(textMesh6.rotation, .75, { z: 0, ease: "power3.inOut", })
            // gsap.to(textMesh5.rotation, .75, { z: rotateZ, ease: "power3.inOut", })
            //     //TEXT SCALE ANIM
            // gsap.to(textMesh6.scale, .75, { z: 1, x: 1, y: 1, ease: "power3.inOut", delay: .15 })
            // gsap.to(textMesh5.scale, .75, { z: 0, x: 0, y: 0, ease: "power3.inOut" })
    } else if (planeAxe.position.y <= -13 && planeAxe.position.y >= -14.1) {
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
            //TEXT ROTATION Z ANIM
            // gsap.to(textMesh5.rotation, .75, { z: 0, ease: "power3.inOut", })
            // gsap.to(textMesh4.rotation, .75, { z: rotateZ, ease: "power3.inOut", })
            //     //TEXT SCALE ANIM
            // gsap.to(textMesh5.scale, .75, { z: 1, x: 1, y: 1, ease: "power3.inOut", delay: .15 })
            // gsap.to(textMesh4.scale, .75, { z: 0, x: 0, y: 0, ease: "power3.inOut" })
    } else if (planeAxe.position.y <= -12 && planeAxe.position.y >= -13.1) {
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
            //     //TEXT ROTATION Z ANIM
            // gsap.to(textMesh4.rotation, .75, { z: 0, ease: "power3.inOut", })
            // gsap.to(textMesh3.rotation, .75, { z: rotateZ, ease: "power3.inOut", })
            //     //TEXT SCALE ANIM
            // gsap.to(textMesh4.scale, .75, { z: 1, x: 1, y: 1, ease: "power3.inOut", delay: .15 })
            // gsap.to(textMesh3.scale, .75, { z: 0, x: 0, y: 0, ease: "power3.inOut" })
    } else if (planeAxe.position.y <= -11 && planeAxe.position.y >= -12.1) {
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
            //     //TEXT ROTATION Z ANIM
            // gsap.to(textMesh3.rotation, .75, { z: 0, ease: "power3.inOut", })
            // gsap.to(textMesh2.rotation, .75, { z: rotateZ, ease: "power3.inOut", })
            //     //TEXT SCALE ANIM
            // gsap.to(textMesh3.scale, .75, { z: 1, x: 1, y: 1, ease: "power3.inOut", delay: .15 })
            // gsap.to(textMesh2.scale, .75, { z: 0, x: 0, y: 0, ease: "power3.inOut" })
    } else if (planeAxe.position.y <= -10 && planeAxe.position.y >= -11.1) {
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
            //     //TEXT ROTATION Z ANIM
            // gsap.to(textMesh2.rotation, .75, { z: 0, ease: "power3.inOut" })
            // gsap.to(textMesh1.rotation, .75, { z: rotateZ, ease: "power3.inOut" })
            //     //TEXT SCALE ANIM
            // gsap.to(textMesh2.scale, .75, { z: 1, x: 1, y: 1, ease: "power3.inOut", delay: .15 })
            // gsap.to(textMesh1.scale, .75, { z: 0, x: 0, y: 0, ease: "power3.inOut" })
    } else if (planeAxe.position.y <= -9 && planeAxe.position.y >= -10.1) {
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
            //     //TEXT ROTATION Z ANIM
            // gsap.to(textMesh2.rotation, .75, { z: 0, ease: "power3.inOut", })
            // gsap.to(textMesh1.rotation, .75, { z: rotateZ, ease: "power3.inOut", })
            //     //TEXT SCALE ANIM
            // gsap.to(textMesh2.scale, .75, { z: 1, x: 1, y: 1, ease: "power3.inOut", delay: .15 })
            // gsap.to(textMesh1.scale, .75, { z: 0, x: 0, y: 0, ease: "power3.inOut" })
    } else if (planeAxe.position.y <= -8 && planeAxe.position.y >= -9.1) {
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
            //     //TEXT ROTATION Z ANIM
            // gsap.to(textMesh2.rotation, .75, { z: 0, ease: "power3.inOut" })
            // gsap.to(textMesh1.rotation, .75, { z: rotateZ, ease: "power3.inOut" })
            //     //TEXT SCALE ANIM
            // gsap.to(textMesh2.scale, .75, { z: 1, x: 1, y: 1, ease: "power3.inOut", delay: .15 })
            // gsap.to(textMesh1.scale, .75, { z: 0, x: 0, y: 0, ease: "power3.inOut" })
    } else if (planeAxe.position.y <= -7 && planeAxe.position.y >= -8.1) {
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
            //     //TEXT ROTATION Z ANIM
            // gsap.to(textMesh2.rotation, .75, { z: 0, ease: "power3.inOut" })
            // gsap.to(textMesh1.rotation, .75, { z: rotateZ, ease: "power3.inOut" })
            //     //TEXT SCALE ANIM
            // gsap.to(textMesh2.scale, .75, { z: 1, x: 1, y: 1, ease: "power3.inOut", delay: .15 })
            // gsap.to(textMesh1.scale, .75, { z: 0, x: 0, y: 0, ease: "power3.inOut" })
    } else if (planeAxe.position.y <= -6 && planeAxe.position.y >= -7.1) {
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
            //     //TEXT ROTATION Z ANIM
            // gsap.to(textMesh2.rotation, .75, { z: 0, ease: "power3.inOut" })
            // gsap.to(textMesh1.rotation, .75, { z: rotateZ, ease: "power3.inOut" })
            //     //TEXT SCALE ANIM
            // gsap.to(textMesh2.scale, .75, { z: 1, x: 1, y: 1, ease: "power3.inOut", delay: .15 })
            // gsap.to(textMesh1.scale, .75, { z: 0, x: 0, y: 0, ease: "power3.inOut" })
    } else if (planeAxe.position.y <= -5 && planeAxe.position.y >= -6.1) {
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
            //     //TEXT ROTATION Z ANIM
            // gsap.to(textMesh2.rotation, .75, { z: 0, ease: "power3.inOut", })
            // gsap.to(textMesh1.rotation, .75, { z: rotateZ, ease: "power3.inOut", })
            //     //TEXT SCALE ANIM
            // gsap.to(textMesh2.scale, .75, { z: 1, x: 1, y: 1, ease: "power3.inOut", delay: .15 })
            // gsap.to(textMesh1.scale, .75, { z: 0, x: 0, y: 0, ease: "power3.inOut" })
    } else if (planeAxe.position.y <= -4 && planeAxe.position.y >= -5.1) {
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
            //     //TEXT ROTATION Z ANIM
            // gsap.to(textMesh2.rotation, .75, { z: 0, ease: "power3.inOut", })
            // gsap.to(textMesh1.rotation, .75, { z: rotateZ, ease: "power3.inOut", })
            //     //TEXT SCALE ANIM
            // gsap.to(textMesh2.scale, .75, { z: 1, x: 1, y: 1, ease: "power3.inOut", delay: .15 })
            // gsap.to(textMesh1.scale, .75, { z: 0, x: 0, y: 0, ease: "power3.inOut" })
    }
}

function scrollDown() {
    camera.position.z -= 1;
    if (planeAxe.position.y <= -16.01 && planeAxe.position.y >= -17) {
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
            //     //TEXT ROTATION Z ANIM
            // gsap.to(textMesh8.rotation, .75, { z: rotateZ, ease: "power3.inOut" })
            // gsap.to(textMesh7.rotation, .75, { z: 0, ease: "power3.inOut" })
            //     //TEXT SCALE ANIM
            // gsap.to(textMesh8.scale, .75, { z: 0, x: 0, y: 0, ease: "power3.inOut" })
            // gsap.to(textMesh7.scale, .75, { z: 1, x: 1, y: 1, ease: "power3.inOut", delay: .15 })
    } else if (planeAxe.position.y <= -15.01 && planeAxe.position.y >= -16) {
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
            //     //TEXT ROTATION Z ANIM
            // gsap.to(textMesh7.rotation, .75, { z: rotateZ, ease: "power3.inOut" })
            // gsap.to(textMesh6.rotation, .75, { z: 0, ease: "power3.inOut" })
            //     //TEXT SCALE ANIM
            // gsap.to(textMesh7.scale, .75, { z: 0, x: 0, y: 0, ease: "power3.inOut" })
            // gsap.to(textMesh6.scale, .75, { z: 1, x: 1, y: 1, ease: "power3.inOut", delay: .15 })
    } else if (planeAxe.position.y <= -14.01 && planeAxe.position.y >= -15) {
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
            //     //TEXT ROTATION Z ANIM
            // gsap.to(textMesh6.rotation, .75, { z: rotateZ, ease: "power3.inOut" })
            // gsap.to(textMesh5.rotation, .75, { z: 0, ease: "power3.inOut" })
            //     //TEXT SCALE ANIM
            // gsap.to(textMesh6.scale, .75, { z: 0, x: 0, y: 0, ease: "power3.inOut" })
            // gsap.to(textMesh5.scale, .75, { z: 1, x: 1, y: 1, ease: "power3.inOut", delay: .15 })
    } else if (planeAxe.position.y <= -13.01 && planeAxe.position.y >= -14) {
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
            //     //TEXT ROTATION Z ANIM
            // gsap.to(textMesh5.rotation, .75, { z: rotateZ, ease: "power3.inOut" })
            // gsap.to(textMesh4.rotation, .75, { z: 0, ease: "power3.inOut" })
            //     //TEXT SCALE ANIM
            // gsap.to(textMesh5.scale, .75, { z: 0, x: 0, y: 0, ease: "power3.inOut" })
            // gsap.to(textMesh4.scale, .75, { z: 1, x: 1, y: 1, ease: "power3.inOut", delay: .15 })
    } else if (planeAxe.position.y <= -12.01 && planeAxe.position.y >= -13) {
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
            //     //TEXT ROTATION Z ANIM
            // gsap.to(textMesh4.rotation, .75, { z: rotateZ, ease: "power3.inOut" })
            // gsap.to(textMesh3.rotation, .75, { z: 0, ease: "power3.inOut" })
            //     //TEXT SCALE ANIM
            // gsap.to(textMesh4.scale, .75, { z: 0, x: 0, y: 0, ease: "power3.inOut" })
            // gsap.to(textMesh3.scale, .75, { z: 1, x: 1, y: 1, ease: "power3.inOut", delay: .15 })
    } else if (planeAxe.position.y <= -11.01 && planeAxe.position.y >= -12) {
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
            //     //TEXT ROTATION Z ANIM
            // gsap.to(textMesh3.rotation, .75, { z: rotateZ, ease: "power3.inOut" })
            // gsap.to(textMesh2.rotation, .75, { z: 0, ease: "power3.inOut" })
            //     //TEXT SCALE ANIM
            // gsap.to(textMesh3.scale, .75, { z: 0, x: 0, y: 0, ease: "power3.inOut" })
            // gsap.to(textMesh2.scale, .75, { z: 1, x: 1, y: 1, ease: "power3.inOut", delay: .15 })
    } else if (planeAxe.position.y <= -10.01 && planeAxe.position.y >= -11) {
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
            //     //TEXT ROTATION Z ANIM
            // gsap.to(textMesh2.rotation, .75, { z: rotateZ, ease: "power3.inOut" })
            // gsap.to(textMesh1.rotation, .75, { z: 0, ease: "power3.inOut" })
            //     //TEXT SCALE ANIM
            // gsap.to(textMesh2.scale, .75, { z: 0, x: 0, y: 0, ease: "power3.inOut" })
            // gsap.to(textMesh1.scale, .75, { z: 1, x: 1, y: 1, ease: "power3.inOut", delay: .15 })
    } else if (planeAxe.position.y <= -9.01 && planeAxe.position.y >= -10) {
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
            //     //TEXT ROTATION Z ANIM
            // gsap.to(textMesh2.rotation, .75, { z: rotateZ, ease: "power3.inOut" })
            // gsap.to(textMesh1.rotation, .75, { z: 0, ease: "power3.inOut" })
            //     //TEXT SCALE ANIM
            // gsap.to(textMesh2.scale, .75, { z: 0, x: 0, y: 0, ease: "power3.inOut" })
            // gsap.to(textMesh1.scale, .75, { z: 1, x: 1, y: 1, ease: "power3.inOut", delay: .15 })
    } else if (planeAxe.position.y <= -8.01 && planeAxe.position.y >= -9) {
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
            //     //TEXT ROTATION Z ANIM
            // gsap.to(textMesh2.rotation, .75, { z: rotateZ, ease: "power3.inOut" })
            // gsap.to(textMesh1.rotation, .75, { z: 0, ease: "power3.inOut" })
            //     //TEXT SCALE ANIM
            // gsap.to(textMesh2.scale, .75, { z: 0, x: 0, y: 0, ease: "power3.inOut" })
            // gsap.to(textMesh1.scale, .75, { z: 1, x: 1, y: 1, ease: "power3.inOut", delay: .15 })
    } else if (planeAxe.position.y <= -7.01 && planeAxe.position.y >= -8) {
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
            //     //TEXT ROTATION Z ANIM
            // gsap.to(textMesh2.rotation, .75, { z: rotateZ, ease: "power3.inOut" })
            // gsap.to(textMesh1.rotation, .75, { z: 0, ease: "power3.inOut" })
            //     //TEXT SCALE ANIM
            // gsap.to(textMesh2.scale, .75, { z: 0, x: 0, y: 0, ease: "power3.inOut" })
            // gsap.to(textMesh1.scale, .75, { z: 1, x: 1, y: 1, ease: "power3.inOut", delay: .15 })
    } else if (planeAxe.position.y <= -6.01 && planeAxe.position.y >= -7) {
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
            //     //TEXT ROTATION Z ANIM
            // gsap.to(textMesh2.rotation, .75, { z: rotateZ, ease: "power3.inOut" })
            // gsap.to(textMesh1.rotation, .75, { z: 0, ease: "power3.inOut" })
            //     //TEXT SCALE ANIM
            // gsap.to(textMesh2.scale, .75, { z: 0, x: 0, y: 0, ease: "power3.inOut" })
            // gsap.to(textMesh1.scale, .75, { z: 1, x: 1, y: 1, ease: "power3.inOut", delay: .15 })
    } else if (planeAxe.position.y <= -5.01 && planeAxe.position.y >= -6) {
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
            //     //TEXT ROTATION Z ANIM
            // gsap.to(textMesh2.rotation, .75, { z: rotateZ, ease: "power3.inOut" })
            // gsap.to(textMesh1.rotation, .75, { z: 0, ease: "power3.inOut" })
            //     //TEXT SCALE ANIM
            // gsap.to(textMesh2.scale, .75, { z: 0, x: 0, y: 0, ease: "power3.inOut" })
            // gsap.to(textMesh1.scale, .75, { z: 1, x: 1, y: 1, ease: "power3.inOut", delay: .15 })
    } else if (planeAxe.position.y <= -4.01 && planeAxe.position.y >= -5) {
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
            //     //TEXT ROTATION Z ANIM
            // gsap.to(textMesh2.rotation, .75, { z: rotateZ, ease: "power3.inOut" })
            // gsap.to(textMesh1.rotation, .75, { z: 0, ease: "power3.inOut" })
            //     //TEXT SCALE ANIM
            // gsap.to(textMesh2.scale, .75, { z: 0, x: 0, y: 0, ease: "power3.inOut" })
            // gsap.to(textMesh1.scale, .75, { z: 1, x: 1, y: 1, ease: "power3.inOut", delay: .15 })
    } else if (planeAxe.position.y == -4) {
        scene.add(particleMesh);
        //AXES ANIM
        gsap.to(planeAxe.position, 2.25, { y: 4.2, ease: "power3.inOut" })
        gsap.to(planeAxe.rotation, 2.25, { y: -13.5 * Math.PI, ease: "power3.inOut" })
            //CAMERA ANIM
        if (window.matchMedia("(max-width: 600px)").matches) {
            gsap.to(camera.position, 3, { z: 11.3, ease: "power3.inOut" })
        } else {
            gsap.to(camera.position, 3, { z: 10, ease: "power3.inOut" })
        }
        //HTML ELEMENTS ANIM
        canvas.classList.remove('hologramDefault')
        canvas.classList.add('hologramActive')
        btnBackHome.disabled = true;
        btnStart.disabled = false;
        titleSvgPath.forEach(e => {
            e.classList.add("pathTitleIn")
            e.classList.remove("pathTitleOut")
        });
        titleSvgLine.classList.add("pathLineIn")
        titleSvgLine.classList.remove("pathLineOut")

        littleTitleSvgPath.forEach(e => {
            e.classList.remove("pathTitleIn")
            e.classList.add("pathTitleOut")
        });
        littleTitleSvgLine.classList.remove("pathLineIn")
        littleTitleSvgLine.classList.add("pathLineOut")
        TweenMax.to(btnStart, .75, { opacity: 1, clipPath: "inset(0% 0% 0% 0%)", delay: .75, ease: "power3.inOut" })
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
            //     //TEXT ROTATION Z ANIM
            // gsap.to(textMesh1.rotation, 3, { z: rotateZ, ease: "power3.inOut" })
            //     //TEXT SCALE ANIM
            // gsap.to(textMesh1.scale, .75, { z: 0, x: 0, y: 0, ease: "power3.inOut" })
            //MODELS ANIM
        gsap.to(logo.position, 2.25, { y: -9.8, ease: "power3.inOut" })
        gsap.to(logo.scale, 2.25, { z: 0.00001, x: 0.00001, y: 0.00001, ease: "power3.inOut", })
        gsap.to(logo.rotation, 2.25, { z: -.725, y: 0, ease: "power3.inOut" })
        gsap.to(home.position, 3, { z: 0, x: -1.45, ease: "power3.inOut" })
        gsap.to(home.rotation, 3, { y: -.35, z: 0, ease: "power3.inOut" })
        gsap.to(socle.position, 2.25, { y: -10.7, ease: "power3.inOut" })
        gsap.to(socle.rotation, 2.25, { y: 0, ease: "power3.inOut" })
            //LIGHTS ANIM
        TweenMax.to(lightCenterSocle.color, .75, { r: cyanColorReset.r, g: cyanColorReset.g, b: cyanColorReset.b, delay: .75 });
        TweenMax.to(lightCenter.color, .75, { r: cyanColorReset.r, g: cyanColorReset.g, b: cyanColorReset.b, delay: .75 });
        //SWITCH ELEMENTS ON CLICK
        homeContainer.classList.add('close');
        homeContainer.classList.remove('open');
        btnBackHome.classList.add('close');
        btnBackHome.classList.remove('open');
        canvas.style.zIndex = -1;
        //RESET AXES POSITION 
        gsap.to(planeAxe.position, 0, { y: -26.5, delay: 3 })
        gsap.to(planeAxe.rotation, 0, { y: 0, delay: 3 })
        gsap.to(planeAxe.scale, 0, { y: 0.0001, x: 0.0001, z: 0.0001, delay: 3 })
        gsap.to(planeAxe.scale, 0, { y: 1, x: 1, z: 1, delay: 3.1 })
    }
}
///// MOUSE SCROLL /////
document.body.addEventListener('wheel', scrollPlane);

function scrollPlane(event) {
    if (checkScrollDirectionIsUp(event)) { // SCROLL UP
        scrollUp();
        console.log("up:" + planeAxe.position.y)
    } else { // SCROLL DOWN
        scrollDown();
        console.log("down:" + planeAxe.position.y)
    }
}

function checkScrollDirectionIsUp(event) { //REVERSE SCROLL
    if (event.wheelDeltaY) {
        return event.wheelDeltaY > 0;
    }
    return event.deltaY < 0;
}

///// ARROWS SCROLL + KEY ECHAP ///////
document.onkeydown = function(e) {
    switch (e.keyCode) {
        case 37:
            console.log('left');
            break;
        case 38: // SCROLL UP
            console.log('up');
            scrollUp();
            break;
        case 39:
            console.log('right');
            break;
        case 40: // SCROLL DOWN
            console.log('down');
            scrollDown();
            break;
        case 27:
            if (camera.position.z == 3.7) {
                functionBtnBackHome();
                console.log("echap")
            }
            break;
        case 13:
            if (camera.position.z == 10) {
                functionBtnStart();
                console.log("enter")
            }
            break;
    }
};


// /////// DRAG EVENT ///////
// let isDown = false;
// var last_position = {};

// document.body.addEventListener('mousedown', () => {
//     isDown = true;

// });
// document.body.addEventListener('mouseleave', () => {
//     isDown = false;
// });
// document.body.addEventListener('mouseup', () => {
//     isDown = false;

// });


// /////// DRAG EVENT COMPUTER ///////
// document.body.addEventListener('mousemove', function(event) {
//     if (typeof(last_position.x) != 'undefined') {
//         var deltaX = last_position.x - event.offsetX,
//             deltaY = last_position.y - event.offsetY;
//         if (Math.abs(deltaX) > Math.abs(deltaY) && deltaX > 0) { // MOUSEMOVE LEFT

//             if (!isDown) return;

//             mesh.rotation.y += 0.1;

//             planeAxe.rotation.y -= 1 / 2 * Math.PI / 20; // ROTATION SPEED
//             planeAxe.position.y += 1 / 20; // POSITION SPEED


//         } else if (Math.abs(deltaX) > Math.abs(deltaY) && deltaX < 0) { // MOUSEMOVE RIGHT

//             if (!isDown) return;

//             mesh.rotation.y -= 0.1;

//             planeAxe.rotation.y += 1 / 2 * Math.PI / 20; // ROTATION SPEED
//             planeAxe.position.y -= 1 / 20; // POSITION SPEED


//         } else if (Math.abs(deltaY) > Math.abs(deltaX) && deltaY > 0) { // MOUSEMOVE UP

//             if (!isDown) return;

//             mesh.rotation.y -= 0.1;

//             planeAxe.rotation.y += 1 / 2 * Math.PI / 20; // ROTATION SPEED
//             planeAxe.position.y -= 1 / 20; // POSITION SPEED


//         } else if (Math.abs(deltaY) > Math.abs(deltaX) && deltaY < 0) { // MOUSEMOVE DOWN

//             if (!isDown) return;

//             mesh.rotation.y += 0.1;

//             planeAxe.rotation.y -= 1 / 2 * Math.PI / 20; // ROTATION SPEED
//             planeAxe.position.y += 1 / 20; // POSITION SPEED

//         }
//     }
//     last_position = {
//         x: event.offsetX,
//         y: event.offsetY
//     }
// })

// /////// DRAG EVENT MOBILE ///////
// document.body.addEventListener('touchmove', function(event) {
//     if (typeof(last_position.x) != 'undefined') {
//         var deltaX = last_position.x - event.offsetX,
//             deltaY = last_position.y - event.offsetY;
//         if (Math.abs(deltaX) > Math.abs(deltaY) && deltaX > 0) { // TOUCHMOVE LEFT

//             if (!isDown) return;

//             mesh.rotation.y += 0.1;

//             planeAxe.rotation.y -= 1 / 2 * Math.PI / 20; // ROTATION SPEED
//             planeAxe.position.y += 1 / 20; // POSITION SPEED

//         } else if (Math.abs(deltaX) > Math.abs(deltaY) && deltaX < 0) { // TOUCHMOVE RIGHT

//             if (!isDown) return;

//             mesh.rotation.y -= 0.1;

//             planeAxe.rotation.y += 1 / 2 * Math.PI / 20; // ROTATION SPEED
//             planeAxe.position.y -= 1 / 20; // POSITION SPEED


//         } else if (Math.abs(deltaY) > Math.abs(deltaX) && deltaY > 0) { // TOUCHMOVE UP

//             if (!isDown) return;

//             mesh.rotation.y -= 0.1;

//             planeAxe.rotation.y += 1 / 2 * Math.PI / 20; // ROTATION SPEED
//             planeAxe.position.y -= 1 / 20; // POSITION SPEED

//         } else if (Math.abs(deltaY) > Math.abs(deltaX) && deltaY < 0) { // TOUCHMOVE DOWN

//             if (!isDown) return;

//             mesh.rotation.y += 0.1;

//             planeAxe.rotation.y -= 1 / 2 * Math.PI / 20; // ROTATION SPEED
//             planeAxe.position.y += 1 / 20; // POSITION SPEED
//         }
//     }
//     last_position = {
//         x: event.offsetX,
//         y: event.offsetY
//     }
// })

let variation = 0;
let variationShaders = 0;

var render = function() {

    composer.render();

    requestAnimationFrame(render);

    if (camera.position.z < 6) {
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

    //     if (camera.position.z > 9.9) {
    //         var cameraRotationYTolerance = .02;
    //         var cameraRotationXTolerance = .01;

    //         var rotX = window.innerWidth * .5;
    //         var rotY = window.innerHeight * .5;

    //         camera.rotation.y = (e.clientX - rotX) / rotX * cameraRotationYTolerance;
    //         camera.rotation.x = (e.clientY - rotY) / rotY * cameraRotationXTolerance;
    //     }

    // };

    renderer.render(scene, camera);
    
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
};

render();