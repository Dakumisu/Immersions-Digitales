import * as THREE from "three";
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import * as POSTPROCESSING from "postprocessing";
import { Interaction } from 'three.interaction';
import TouchSweep from 'touchsweep';
import createjs from 'preload-js';

import vertexShader from "./libs/glsl/vertex.glsl";
import fragmentShader from "./libs/glsl/fragment.glsl";
import fragmentShaderVertical from "./libs/glsl/fragmentVertical.glsl";

import displacement2 from "../assets/img/displaces/displace2.png"; // Pour le panneau
import displacement4 from "../assets/img/displaces/displace4.png"; // Pour les planes

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

import atelierbaniere1 from "../assets/img/ruelle/banniere/baniere_backstage.jpg"; 
import atelierbaniere2 from "../assets/img/ruelle/banniere/baniere_fabriquetonmmi.jpg"; 
import atelierbaniere3 from "../assets/img/ruelle/banniere/baniere_vrgaming.jpg"; 
import atelierbaniere4 from "../assets/img/ruelle/banniere/baniere_devweb.jpg"; 
import atelierbaniere5 from "../assets/img/ruelle/banniere/baniere_cubemusical.jpg"; 
import atelierbaniere6 from "../assets/img/ruelle/banniere/baniere_iaartgeneratif.jpg"; 
import atelierbaniere7 from "../assets/img/ruelle/banniere/baniere_museemmi.jpg"; 
import atelierbaniere8 from "../assets/img/ruelle/banniere/baniere_suiteadobe.jpg"; 
import atelierbaniere9 from "../assets/img/ruelle/banniere/baniere_visiteguidée.jpg"; 
import atelierbaniere10 from "../assets/img/ruelle/banniere/baniere_webradio.jpg"; 
import atelierbaniere11 from "../assets/img/ruelle/banniere/baniere_plateautv.jpg"; 
import atelierbaniere12 from "../assets/img/ruelle/banniere/baniere_fondvert.jpg"; 
import atelierbaniere13 from "../assets/img/ruelle/banniere/baniere_mapping.jpg"; 
import atelierbaniere14 from "../assets/img/ruelle/banniere/baniere_audiovisuel.jpg";

/////// IMAGES NUMERO ATELIER ////////
import atelierchiffre1 from "../assets/img/ruelle/numero/rond_1.jpg"; 
import atelierchiffre2 from "../assets/img/ruelle/numero/rond_2.jpg"; 
import atelierchiffre3 from "../assets/img/ruelle/numero/rond_3.jpg"; 
import atelierchiffre4 from "../assets/img/ruelle/numero/rond_4.jpg"; 
import atelierchiffre5 from "../assets/img/ruelle/numero/rond_5.jpg"; 
import atelierchiffre6 from "../assets/img/ruelle/numero/rond_6.jpg"; 
import atelierchiffre7 from "../assets/img/ruelle/numero/rond_7.jpg"; 
import atelierchiffre8 from "../assets/img/ruelle/numero/rond_8.jpg"; 
import atelierchiffre9 from "../assets/img/ruelle/numero/rond_9.jpg"; 
import atelierchiffre10 from "../assets/img/ruelle/numero/rond_10.jpg"; 
import atelierchiffre11 from "../assets/img/ruelle/numero/rond_11.jpg"; 
import atelierchiffre12 from "../assets/img/ruelle/numero/rond_12.jpg"; 
import atelierchiffre13 from "../assets/img/ruelle/numero/rond_13.jpg"; 
import atelierchiffre14 from "../assets/img/ruelle/numero/rond_14.jpg";

/////// IMAGES PANNEAUX RUELLE ////////
import atelierpanneaurue1 from "../assets/img/ruelle/panneaux/panneau_1.jpg";
import atelierpanneaurue2 from "../assets/img/ruelle/panneaux/panneau_2.jpg"; 
import atelierpanneaurue3 from "../assets/img/ruelle/panneaux/panneau_3.jpg"; 
import atelierpanneaurue4 from "../assets/img/ruelle/panneaux/panneau_4.jpg"; 
import atelierpanneaurue5 from "../assets/img/ruelle/panneaux/panneau_5.jpg"; 
import atelierpanneaurue6 from "../assets/img/ruelle/panneaux/panneau_6.jpg"; 
import atelierpanneaurue7 from "../assets/img/ruelle/panneaux/panneau_7.jpg"; 
import atelierpanneaurue8 from "../assets/img/ruelle/panneaux/panneau_8.jpg"; 
import atelierpanneaurue9 from "../assets/img/ruelle/panneaux/panneau_9.jpg"; 
import atelierpanneaurue10 from "../assets/img/ruelle/panneaux/panneau_10.jpg"; 
import atelierpanneaurue11 from "../assets/img/ruelle/panneaux/panneau_11.jpg"; 
import atelierpanneaurue12 from "../assets/img/ruelle/panneaux/panneau_12.jpg"; 
import atelierpanneaurue13 from "../assets/img/ruelle/panneaux/panneau_13.jpg"; 
import atelierpanneaurue14 from "../assets/img/ruelle/panneaux/panneau_14.jpg";

/////// IMAGES PANNEAU ////////
import atelierpanneau1 from "../assets/img/panneau/panneau_1.jpg";
import atelierpanneau2 from "../assets/img/panneau/panneau_2.jpg"; 
import atelierpanneau3 from "../assets/img/panneau/panneau_3.jpg"; 
import atelierpanneau4 from "../assets/img/panneau/panneau_4.jpg"; 
import atelierpanneau5 from "../assets/img/panneau/panneau_5.jpg"; 
import atelierpanneau6 from "../assets/img/panneau/panneau_6.jpg"; 
import atelierpanneau7 from "../assets/img/panneau/panneau_7.jpg"; 
import atelierpanneau8 from "../assets/img/panneau/panneau_8.jpg"; 
import atelierpanneau9 from "../assets/img/panneau/panneau_9.jpg"; 
import atelierpanneau10 from "../assets/img/panneau/panneau_10.jpg"; 
import atelierpanneau11 from "../assets/img/panneau/panneau_11.jpg"; 
import atelierpanneau12 from "../assets/img/panneau/panneau_12.jpg"; 
import atelierpanneau13 from "../assets/img/panneau/panneau_13.jpg"; 
import atelierpanneau14 from "../assets/img/panneau/panneau_14.jpg";

/////// IMAGES BACK PANNEAU ////////
import atelierpanneau2rue1 from "../assets/img/ruelle/back_panneaux/panneau_1.jpg";
import atelierpanneau2rue2 from "../assets/img/ruelle/back_panneaux/panneau_2.jpg"; 
import atelierpanneau2rue3 from "../assets/img/ruelle/back_panneaux/panneau_3.jpg"; 
import atelierpanneau2rue4 from "../assets/img/ruelle/back_panneaux/panneau_4.jpg"; 
import atelierpanneau2rue5 from "../assets/img/ruelle/back_panneaux/panneau_5.jpg"; 
import atelierpanneau2rue6 from "../assets/img/ruelle/back_panneaux/panneau_6.jpg"; 
import atelierpanneau2rue7 from "../assets/img/ruelle/back_panneaux/panneau_7.jpg"; 
import atelierpanneau2rue8 from "../assets/img/ruelle/back_panneaux/panneau_8.jpg"; 
import atelierpanneau2rue9 from "../assets/img/ruelle/back_panneaux/panneau_9.jpg"; 
import atelierpanneau2rue10 from "../assets/img/ruelle/back_panneaux/panneau_10.jpg"; 
import atelierpanneau2rue11 from "../assets/img/ruelle/back_panneaux/panneau_11.jpg"; 
import atelierpanneau2rue12 from "../assets/img/ruelle/back_panneaux/panneau_12.jpg"; 
import atelierpanneau2rue13 from "../assets/img/ruelle/back_panneaux/panneau_13.jpg"; 
import atelierpanneau2rue14 from "../assets/img/ruelle/back_panneaux/panneau_14.jpg";

import idbaniere from "../assets/img/ruelle/idbannire.jpg";
import credits from "../assets/img/ruelle/credits.jpg";

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

import rpzImport from "../assets/sound/rpz.mp3"
import bgMusicImport from "../assets/sound/bg.mp3"
import bgLoopMusicImport from "../assets/sound/bgLoop.mp3"
import soundHoverPlaneImport from "../assets/sound/soundHoverPlane.mp3"
import soundOutPlaneImport from "../assets/sound/soundOutPlane.mp3"
import soundHoverImport from "../assets/sound/soundHover.mp3"

////////// MAIN LOADER //////////

let indicGoDesktop = document.querySelector('.indicGoDesktop');
let progress = document.querySelector('.progress');

let volume = 1;
let volumeBg = .04;
let volumePlane = .025;
let volumeBtn = .5;

let bgMusic = document.createElement("audio"); 
bgMusic.src = bgMusicImport; 
bgMusic.loop = false;
bgMusic.volume = volume;

let bgLoopMusic = document.createElement("audio"); 
bgLoopMusic.src = bgLoopMusicImport; 
bgLoopMusic.loop = true;
bgLoopMusic.volume = volumeBg;

let rpzMusic = document.createElement("audio"); 
rpzMusic.src = rpzImport; 
rpzMusic.loop = false;
rpzMusic.volume = 0.05;

let soundHover = document.createElement("audio"); 
soundHover.src = soundHoverImport; 
soundHover.loop = false;
soundHover.volume = volumeBtn; 

let soundHoverPlane = document.createElement("audio"); 
soundHoverPlane.src = soundHoverPlaneImport; 
soundHoverPlane.loop = false;
soundHoverPlane.volume = volumePlane; 

let soundOutPlane = document.createElement("audio"); 
soundOutPlane.src = soundOutPlaneImport; 
soundOutPlane.loop = false;
soundOutPlane.volume = volumePlane; 


////////// SCENE //////////
var scene = new THREE.Scene();

////////// CAMERA //////////
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

/////// CLOCK ///////
var clock = new THREE.Clock();

if (window.matchMedia("(max-width: 600px)").matches) {
camera.position.set(0, 0, 4.3);
}else{
    camera.position.set(0, 0, 3.7);
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
let customPass = new POSTPROCESSING.ShaderPass({ vertexShader, fragmentShader });
customPass.renderToScreen = true;
composer.addPass(customPass);

let rotateZ = -.2; // PLANES ROTATION

/////// LIGHTS ///////
var targetLogo = new THREE.Object3D();
targetLogo.position.set(0, 0, 0)
scene.add(targetLogo);

let light1 = new THREE.PointLight(0x4cc9f0, .15);
light1.position.set(-2000, -.1, -2000);
scene.add(light1);
let light2 = new THREE.PointLight(0x4cc9f0, .3);
light2.position.set(2000, 0, 0);
scene.add(light2);
let light3 = new THREE.PointLight(0x4cc9f0, .3);
light3.position.set(-2000, 0, 0);
scene.add(light3);
let light4 = new THREE.PointLight(0x4cc9f0, .15);
light4.position.set(2000, -.1, -2000);
scene.add(light4);

let light5 = new THREE.PointLight(0xf72585, .2);
light5.position.set(0, 2000, 2000);
scene.add(light5);

let lightCenter = new THREE.PointLight(0x000000, 30, 2.6);
lightCenter.position.set(0, 1.5, 0)
scene.add(lightCenter);

let lightCenter2 = new THREE.DirectionalLight(0x4cc9f0, 1.5);
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
        home.position.set(20, -10, 105)
        home.scale.set(100, 100, 100);
        home.rotation.y = -Math.PI;
        home.rotation.z = Math.PI;

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
        enceinte.name = 'enceinte';
        enceinte.position.set(-9.2, 5.2,-5)
        enceinte.scale.set(0.0001, 0.0001, 0.0001);
        enceinte.rotation.y = .3*Math.PI;

        enceinte.on('click', function() {
            rpzMusic.play();                  
        })
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
var plane = new THREE.PlaneGeometry(1.6 / 1.2, 0.9 / 1.2, 30, 30);
var planePanneau = new THREE.PlaneGeometry(1.75, 3.459, 1, 1);
var planePanneauRue1 = new THREE.PlaneGeometry(11.92, 3.6, 1, 1);
var planePanneauRue2 = new THREE.PlaneGeometry(2.75, 5.9, 1, 1);
var planePanneauRue3 = new THREE.PlaneGeometry(34.75, 3.2, 1, 1);
var planePanneauRue4 = new THREE.PlaneGeometry(6.7, 9, 1, 1);
// var planePanneauRue6 = new THREE.PlaneGeometry(2.399, 7.8, 1);
var planePanneauRue7 = new THREE.PlaneGeometry(6.584, 2.775, 1);
var planePanneauRueRond = new THREE.PlaneGeometry(2.05, 2.05, 1);

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

var texturebaniere14 = new THREE.TextureLoader().load(atelierbaniere1);
var texturebaniere13 = new THREE.TextureLoader().load(atelierbaniere2);
var texturebaniere12 = new THREE.TextureLoader().load(atelierbaniere3);
var texturebaniere11 = new THREE.TextureLoader().load(atelierbaniere4);
var texturebaniere10 = new THREE.TextureLoader().load(atelierbaniere5);
var texturebaniere9 = new THREE.TextureLoader().load(atelierbaniere6);
var texturebaniere8 = new THREE.TextureLoader().load(atelierbaniere7);
var texturebaniere7 = new THREE.TextureLoader().load(atelierbaniere8);
var texturebaniere6 = new THREE.TextureLoader().load(atelierbaniere9);
var texturebaniere5 = new THREE.TextureLoader().load(atelierbaniere10);
var texturebaniere4 = new THREE.TextureLoader().load(atelierbaniere11);
var texturebaniere3 = new THREE.TextureLoader().load(atelierbaniere12);
var texturebaniere2 = new THREE.TextureLoader().load(atelierbaniere13);
var texturebaniere1 = new THREE.TextureLoader().load(atelierbaniere14);

var texturechiffre1 = new THREE.TextureLoader().load(atelierchiffre1);
var texturechiffre2 = new THREE.TextureLoader().load(atelierchiffre2);
var texturechiffre3 = new THREE.TextureLoader().load(atelierchiffre3);
var texturechiffre4 = new THREE.TextureLoader().load(atelierchiffre4);
var texturechiffre5 = new THREE.TextureLoader().load(atelierchiffre5);
var texturechiffre6 = new THREE.TextureLoader().load(atelierchiffre6);
var texturechiffre7 = new THREE.TextureLoader().load(atelierchiffre7);
var texturechiffre8 = new THREE.TextureLoader().load(atelierchiffre8);
var texturechiffre9 = new THREE.TextureLoader().load(atelierchiffre9);
var texturechiffre10 = new THREE.TextureLoader().load(atelierchiffre10);
var texturechiffre11 = new THREE.TextureLoader().load(atelierchiffre11);
var texturechiffre12 = new THREE.TextureLoader().load(atelierchiffre12);
var texturechiffre13 = new THREE.TextureLoader().load(atelierchiffre13);
var texturechiffre14 = new THREE.TextureLoader().load(atelierchiffre14);

var texturepanneaurue1 = new THREE.TextureLoader().load(atelierpanneaurue1);
var texturepanneaurue2 = new THREE.TextureLoader().load(atelierpanneaurue2);
var texturepanneaurue3 = new THREE.TextureLoader().load(atelierpanneaurue3);
var texturepanneaurue4 = new THREE.TextureLoader().load(atelierpanneaurue4);
var texturepanneaurue5 = new THREE.TextureLoader().load(atelierpanneaurue5);
var texturepanneaurue6 = new THREE.TextureLoader().load(atelierpanneaurue6);
var texturepanneaurue7 = new THREE.TextureLoader().load(atelierpanneaurue7);
var texturepanneaurue8 = new THREE.TextureLoader().load(atelierpanneaurue8);
var texturepanneaurue9 = new THREE.TextureLoader().load(atelierpanneaurue9);
var texturepanneaurue10 = new THREE.TextureLoader().load(atelierpanneaurue10);
var texturepanneaurue11 = new THREE.TextureLoader().load(atelierpanneaurue11);
var texturepanneaurue12 = new THREE.TextureLoader().load(atelierpanneaurue12);
var texturepanneaurue13 = new THREE.TextureLoader().load(atelierpanneaurue13);
var texturepanneaurue14 = new THREE.TextureLoader().load(atelierpanneaurue14);

var texturepanneau1 = new THREE.TextureLoader().load(atelierpanneau1);
var texturepanneau2 = new THREE.TextureLoader().load(atelierpanneau2);
var texturepanneau3 = new THREE.TextureLoader().load(atelierpanneau3);
var texturepanneau4 = new THREE.TextureLoader().load(atelierpanneau4);
var texturepanneau5 = new THREE.TextureLoader().load(atelierpanneau5);
var texturepanneau6 = new THREE.TextureLoader().load(atelierpanneau6);
var texturepanneau7 = new THREE.TextureLoader().load(atelierpanneau7);
var texturepanneau8 = new THREE.TextureLoader().load(atelierpanneau8);
var texturepanneau9 = new THREE.TextureLoader().load(atelierpanneau9);
var texturepanneau10 = new THREE.TextureLoader().load(atelierpanneau10);
var texturepanneau11 = new THREE.TextureLoader().load(atelierpanneau11);
var texturepanneau12 = new THREE.TextureLoader().load(atelierpanneau12);
var texturepanneau13 = new THREE.TextureLoader().load(atelierpanneau13);
var texturepanneau14 = new THREE.TextureLoader().load(atelierpanneau14);

var texturepanneau2rue1 = new THREE.TextureLoader().load(atelierpanneau2rue1);
var texturepanneau2rue2 = new THREE.TextureLoader().load(atelierpanneau2rue2);
var texturepanneau2rue3 = new THREE.TextureLoader().load(atelierpanneau2rue3);
var texturepanneau2rue4 = new THREE.TextureLoader().load(atelierpanneau2rue4);
var texturepanneau2rue5 = new THREE.TextureLoader().load(atelierpanneau2rue5);
var texturepanneau2rue6 = new THREE.TextureLoader().load(atelierpanneau2rue6);
var texturepanneau2rue7 = new THREE.TextureLoader().load(atelierpanneau2rue7);
var texturepanneau2rue8 = new THREE.TextureLoader().load(atelierpanneau2rue8);
var texturepanneau2rue9 = new THREE.TextureLoader().load(atelierpanneau2rue9);
var texturepanneau2rue10 = new THREE.TextureLoader().load(atelierpanneau2rue10);
var texturepanneau2rue11 = new THREE.TextureLoader().load(atelierpanneau2rue11);
var texturepanneau2rue12 = new THREE.TextureLoader().load(atelierpanneau2rue12);
var texturepanneau2rue13 = new THREE.TextureLoader().load(atelierpanneau2rue13);
var texturepanneau2rue14 = new THREE.TextureLoader().load(atelierpanneau2rue14);

var textureidbaniere = new THREE.TextureLoader().load(idbaniere);
var texturecredits = new THREE.TextureLoader().load(credits);

/////// PLANES MATERIALS ///////
let planeOpacityDefault;

if (window.matchMedia("(max-width: 1024px)").matches) {
    planeOpacityDefault = 0.95;
} else {
    planeOpacityDefault = 0.9;
}

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

        imagebw: { type: "t", value: texturepanneau1 },
        imagergb: { type: "t", value: texturepanneau2 },
        displacement: { type: "t", value: new THREE.TextureLoader().load(displacement2) },
        dispFactor: { type: "f", value: 0.0 }, //transition
        effectFactor: { type: "f", value: 1 }, //intensity
    },
    side: THREE.DoubleSide,
    transparent: true,
    opacity: 1.0
});

/////// PLANE RUELLE ///////
var materialPlaneRue7 = new THREE.MeshBasicMaterial( { map: texturecredits } );
var planeMeshPanneauRue7 = new THREE.Mesh(planePanneauRue7, materialPlaneRue7);
planeMeshPanneauRue7.position.set(5.975, 3.967, -133.6);
planeMeshPanneauRue7.rotation.set(0, 0, 0);
planeMeshPanneauRue7.scale.set(0.0001, 0.0001, 0.0001);

var materialPlaneRue4 = new THREE.MeshBasicMaterial( { map: texturepanneau2rue1 } );
var planeMeshPanneauRue4 = new THREE.Mesh(planePanneauRue4, materialPlaneRue4);
planeMeshPanneauRue4.position.set(-20.5, 18.5, -71.75);
planeMeshPanneauRue4.rotation.set(0, 0, 0);
planeMeshPanneauRue4.scale.set(0.0001, 0.0001, 0.0001);

var materialPlaneRue3 = new THREE.MeshBasicMaterial( { map: texturebaniere1 } );
var planeMeshPanneauRue3 = new THREE.Mesh(planePanneauRue3, materialPlaneRue3);
planeMeshPanneauRue3.position.set(-.60, 14.3, -71.1);
planeMeshPanneauRue3.rotation.set(0, 0, 0);
planeMeshPanneauRue3.scale.set(0.0001, 0.0001, 0.0001);

var materialPlaneRue2 = new THREE.MeshBasicMaterial( { map: texturepanneaurue1 } );
var planeMeshPanneauRue2 = new THREE.Mesh(planePanneauRue2, materialPlaneRue2);
planeMeshPanneauRue2.position.set(-6.841, 6.125, -45.05);
planeMeshPanneauRue2.rotation.set(0, 0, 0);
planeMeshPanneauRue2.scale.set(0.0001, 0.0001, 0.0001);

var materialPlaneRue1 = new THREE.MeshBasicMaterial( { map: textureidbaniere } );
var planeMeshPanneauRue1 = new THREE.Mesh(planePanneauRue1, materialPlaneRue1);
planeMeshPanneauRue1.position.set(9.139, 6.048, -36.55);
planeMeshPanneauRue1.rotation.set(0, -1.571, 0);
planeMeshPanneauRue1.scale.set(0.0001, 0.0001, 0.0001);

var materialPlaneRond = new THREE.MeshBasicMaterial( { map: texturechiffre1 } );
var planeMeshPanneauRueRond = new THREE.Mesh(planePanneauRueRond, materialPlaneRond);
planeMeshPanneauRueRond.position.set(6.75, 6.15, -43.0);
planeMeshPanneauRueRond.rotation.set(0, 0, 0);
planeMeshPanneauRueRond.scale.set(0.0001, 0.0001, 0.0001);

var planeMeshPanneau = new THREE.Mesh(planePanneau, materialPlanePanneau);
planeMeshPanneau.position.set(7.575, -2.998, -3.755);
planeMeshPanneau.rotation.set(-.035, -.74, -.07);
planeMeshPanneau.scale.set(0.0001, 0.0001, 0.0001);

if (!window.matchMedia("(max-width: 1024px)").matches) {
    scene.add(planeMeshPanneauRue7);
    scene.add(planeMeshPanneauRue4);
    scene.add(planeMeshPanneauRue3);
    scene.add(planeMeshPanneauRue2);
    scene.add(planeMeshPanneauRue1);
    scene.add(planeMeshPanneauRueRond);
    scene.add(planeMeshPanneau);
}

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

scene.add(planeMeshPanneau)
planeMeshPanneau.position.set(7.575, -2.998, -3.755);
planeMeshPanneau.rotation.set(-.035, -.74, -.07);
planeMeshPanneau.scale.set(0.0001,0.0001,0.0001);

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
particleMesh.scale.set(8,8,8);
scene.remove(scene.getObjectByName("ParticleObjects"));


/////// VARIABLES EVENTS ///////
let homeContainer = document.querySelector('.homeContainer');
let homeMask = document.querySelector('.homeMask');
let titleSvg = document.querySelector('.title');
let titleSvgPath = document.querySelectorAll('.title path');
let titleSvgLine = document.querySelector('.title line');
let littleTitleSvg = document.querySelector('.littleTitle');
let littleTitleSvgPath = document.querySelectorAll('.littleTitle path');
let littleTitleSvgLine = document.querySelector('.littleTitle line');
let btnMainStart = document.querySelector('.btn__mainStart');
let spanContainerMainStart = document.querySelector('.spanContainerMainStart')
let spanContainerFirstSlogan = document.querySelector('.firstSlogan')
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
let cursorSize = document.querySelector('.cursorSize');
let containerTimeline = document.querySelector('.containerTimeline');
let containerTimelineMobile = document.querySelector('.containerTimelineMobile');
let hamburgerContainer = document.querySelector('.hamburgerContainer');
let hamburgerContainerLine = document.querySelector('.hamburgerContainer .line');
let hamburgerContainerLine2 = document.querySelector('.hamburgerContainer .line2');
let hamburgerContainerCroix = document.querySelector('.hamburgerContainer .croix');
let hamburgerContainerCroix2 = document.querySelector('.hamburgerContainer .croix2');
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
let iframe = document.querySelectorAll('iframe');
let contenu = document.querySelectorAll('.contenu');
let contenu_link = document.querySelectorAll('.contenu__link');
let greta = document.querySelector('.greta');

let contenu_vr = document.querySelectorAll('.vr');

let mobileWorkShopButton = document.querySelectorAll('.mobileWorkShopButton');
let mobileWorkShopButton1 = document.querySelector('.mobileWorkShopButton__1');
let mobileWorkShopButton2 = document.querySelector('.mobileWorkShopButton__2');
let mobileWorkShopButton3 = document.querySelector('.mobileWorkShopButton__3');
let mobileWorkShopButton4 = document.querySelector('.mobileWorkShopButton__4');
let mobileWorkShopButton5 = document.querySelector('.mobileWorkShopButton__5');
let mobileWorkShopButton6 = document.querySelector('.mobileWorkShopButton__6');
let mobileWorkShopButton7 = document.querySelector('.mobileWorkShopButton__7');
let mobileWorkShopButton8 = document.querySelector('.mobileWorkShopButton__8');
let mobileWorkShopButton9 = document.querySelector('.mobileWorkShopButton__9');
let mobileWorkShopButton10 = document.querySelector('.mobileWorkShopButton__10');
let mobileWorkShopButton11 = document.querySelector('.mobileWorkShopButton__11');
let mobileWorkShopButton12 = document.querySelector('.mobileWorkShopButton__12');
let mobileWorkShopButton13 = document.querySelector('.mobileWorkShopButton__13');
let mobileWorkShopButton14 = document.querySelector('.mobileWorkShopButton__14');

let indicClickOnPlane = document.querySelector('.indicClickOnPlane');
let timelineIndication = document.querySelector('.indication');
let cursorIndication = document.querySelector('.cursorIndication');
let mobileIndication = document.querySelector('.mobileIndication');

let workShopContainer = document.querySelector('.workShopContainer');
let creditContainer = document.querySelector('.creditContainer');

let faceImg = document.querySelectorAll('.faceImg');

let contentContainer__14 = document.querySelector('.contentContainer__14');
let scrollContainer__14 = document.querySelector('.scrollContainer__14');
let scrollContainerContentImg__14 = document.querySelectorAll('.scrollContainer__14 .contentImg');

let contentContainer__13 = document.querySelector('.contentContainer__13');
let scrollContainer__13 = document.querySelector('.scrollContainer__13');
let scrollContainerContentImg__13 = document.querySelectorAll('.scrollContainer__13 .contentImg');

let contentContainer__12 = document.querySelector('.contentContainer__12');
let scrollContainer__12 = document.querySelector('.scrollContainer__12');
let scrollContainerContentImg__12 = document.querySelectorAll('.scrollContainer__12 .contentImg');

let contentContainer__11 = document.querySelector('.contentContainer__11');
let scrollContainer__11 = document.querySelector('.scrollContainer__11');
let scrollContainerContentImg__11 = document.querySelectorAll('.scrollContainer__11 .contentImg');

let contentContainer__10 = document.querySelector('.contentContainer__10');
let scrollContainer__10 = document.querySelector('.scrollContainer__10');
let scrollContainerContentImg__10 = document.querySelectorAll('.scrollContainer__10 .contentImg');

let contentContainer__9 = document.querySelector('.contentContainer__9');
let scrollContainer__9 = document.querySelector('.scrollContainer__9');
let scrollContainerContentImg__9 = document.querySelectorAll('.scrollContainer__9 .contentImg');

let contentContainer__8 = document.querySelector('.contentContainer__8');
let scrollContainer__8 = document.querySelector('.scrollContainer__8');
let scrollContainerContentImg__8 = document.querySelectorAll('.scrollContainer__8 .contentImg');

let contentContainer__7 = document.querySelector('.contentContainer__7');
let scrollContainer__7 = document.querySelector('.scrollContainer__7');
let scrollContainerContentImg__7 = document.querySelectorAll('.scrollContainer__7 .contentImg');

let contentContainer__6 = document.querySelector('.contentContainer__6');
let scrollContainer__6 = document.querySelector('.scrollContainer__6');
let scrollContainerContentImg__6 = document.querySelectorAll('.scrollContainer__6 .contentImg');

let contentContainer__5 = document.querySelector('.contentContainer__5');
let scrollContainer__5 = document.querySelector('.scrollContainer__5');
let scrollContainerContentImg__5 = document.querySelectorAll('.scrollContainer__5 .contentImg');

let contentContainer__4 = document.querySelector('.contentContainer__4');
let scrollContainer__4 = document.querySelector('.scrollContainer__4');
let scrollContainerContentImg__4 = document.querySelectorAll('.scrollContainer__4 .contentImg');

let contentContainer__3 = document.querySelector('.contentContainer__3');
let scrollContainer__3 = document.querySelector('.scrollContainer__3');
let scrollContainerContentImg__3 = document.querySelectorAll('.scrollContainer__3 .contentImg');

let contentContainer__2 = document.querySelector('.contentContainer__2');
let scrollContainer__2 = document.querySelector('.scrollContainer__2');
let scrollContainerContentImg__2 = document.querySelectorAll('.scrollContainer__2 .contentImg');

let contentContainer__1 = document.querySelector('.contentContainer__1');
let scrollContainer__1 = document.querySelector('.scrollContainer__1');
let scrollContainerContentImg__1 = document.querySelectorAll('.scrollContainer__1 .contentImg');


hamburgerContainer.addEventListener('click', function(){
    if( switchHamburger == false){
        if (window.matchMedia("(max-width: 1024px)").matches) {
            soundHover.play();
        }
    hamburgerContainerLine.classList.toggle('switch')
    hamburgerContainerLine2.classList.toggle('switch')
    switchHamburger = true;
    setTimeout(function(){
    gsap.to('.mobileWorkShopButton', .5, {  opacity: 1, stagger: { each: .05, from: 'edges'}, ease: "power3.easeOut"}) 
    containerTimelineMobile.classList.toggle('switch');
    },100)
    containerTimelineMobile.style.zIndex = 4;
    setTimeout(function(){
    hamburgerContainerCroix.classList.toggle('switch')
    hamburgerContainerCroix2.classList.toggle('switch')
    },350)      
    }
    else{
        if (window.matchMedia("(max-width: 1024px)").matches) {
            soundHover.play();
        }
            hamburgerContainerCroix.classList.toggle('switch')
            hamburgerContainerCroix2.classList.toggle('switch')
            switchHamburger = false; 
          
            gsap.to('.mobileWorkShopButton', .5, {  opacity: 0, stagger: { each: .03, from: 'center'}, ease: "power3.easeOut"})
            setTimeout(function(){
            hamburgerContainerLine.classList.toggle('switch')
            hamburgerContainerLine2.classList.toggle('switch')
            },350)  
            setTimeout(function(){
                containerTimelineMobile.classList.toggle('switch');
                containerTimelineMobile.style.zIndex = -1;
                },700)
    }
})

/////// IMAGES HOVER ///////
scrollContainerContentImg__14.forEach(e => {
    e.children[2].children[0].addEventListener('mouseenter', function () {
        e.children[0].classList.add('switch')
        e.children[1].classList.add('switch')
        e.children[2].classList.add('switch')
        e.children[2].children[0].classList.add('switch')
    })
    e.children[2].children[0].addEventListener('mouseleave', function () {
        e.children[0].classList.remove('switch')
        e.children[1].classList.remove('switch')
        e.children[2].classList.remove('switch')
        e.children[2].children[0].classList.remove('switch')
    })
});

scrollContainerContentImg__13.forEach(e => {
    e.children[2].children[0].addEventListener('mouseenter', function () {
        e.children[0].classList.add('switch')
        e.children[1].classList.add('switch')
        e.children[2].classList.add('switch')
        e.children[2].children[0].classList.add('switch')
    })
    e.children[2].children[0].addEventListener('mouseleave', function () {
        e.children[0].classList.remove('switch')
        e.children[1].classList.remove('switch')
        e.children[2].classList.remove('switch')
        e.children[2].children[0].classList.remove('switch')
    })
});

scrollContainerContentImg__12.forEach(e => {
    e.children[2].children[0].addEventListener('mouseenter', function () {
        e.children[0].classList.add('switch')
        e.children[1].classList.add('switch')
        e.children[2].classList.add('switch')
        e.children[2].children[0].classList.add('switch')
    })
    e.children[2].children[0].addEventListener('mouseleave', function () {
        e.children[0].classList.remove('switch')
        e.children[1].classList.remove('switch')
        e.children[2].classList.remove('switch')
        e.children[2].children[0].classList.remove('switch')
    })
});

scrollContainerContentImg__11.forEach(e => {
    e.children[2].children[0].addEventListener('mouseenter', function () {
        e.children[0].classList.add('switch')
        e.children[1].classList.add('switch')
        e.children[2].classList.add('switch')
        e.children[2].children[0].classList.add('switch')
    })
    e.children[2].children[0].addEventListener('mouseleave', function () {
        e.children[0].classList.remove('switch')
        e.children[1].classList.remove('switch')
        e.children[2].classList.remove('switch')
        e.children[2].children[0].classList.remove('switch')
    })
});

scrollContainerContentImg__10.forEach(e => {
    e.children[2].children[0].addEventListener('mouseenter', function () {
        e.children[0].classList.add('switch')
        e.children[1].classList.add('switch')
        e.children[2].classList.add('switch')
        e.children[2].children[0].classList.add('switch')
    })
    e.children[2].children[0].addEventListener('mouseleave', function () {
        e.children[0].classList.remove('switch')
        e.children[1].classList.remove('switch')
        e.children[2].classList.remove('switch')
        e.children[2].children[0].classList.remove('switch')
    })
});

scrollContainerContentImg__9.forEach(e => {
    e.children[2].children[0].addEventListener('mouseenter', function () {
        e.children[0].classList.add('switch')
        e.children[1].classList.add('switch')
        e.children[2].classList.add('switch')
        e.children[2].children[0].classList.add('switch')
    })
    e.children[2].children[0].addEventListener('mouseleave', function () {
        e.children[0].classList.remove('switch')
        e.children[1].classList.remove('switch')
        e.children[2].classList.remove('switch')
        e.children[2].children[0].classList.remove('switch')
    })
});

scrollContainerContentImg__8.forEach(e => {
    e.children[2].children[0].addEventListener('mouseenter', function () {
        e.children[0].classList.add('switch')
        e.children[1].classList.add('switch')
        e.children[2].classList.add('switch')
        e.children[2].children[0].classList.add('switch')
    })
    e.children[2].children[0].addEventListener('mouseleave', function () {
        e.children[0].classList.remove('switch')
        e.children[1].classList.remove('switch')
        e.children[2].classList.remove('switch')
        e.children[2].children[0].classList.remove('switch')
    })
});

scrollContainerContentImg__7.forEach(e => {
    e.children[2].children[0].addEventListener('mouseenter', function () {
        e.children[0].classList.add('switch')
        e.children[1].classList.add('switch')
        e.children[2].classList.add('switch')
        e.children[2].children[0].classList.add('switch')
    })
    e.children[2].children[0].addEventListener('mouseleave', function () {
        e.children[0].classList.remove('switch')
        e.children[1].classList.remove('switch')
        e.children[2].classList.remove('switch')
        e.children[2].children[0].classList.remove('switch')
    })
});

scrollContainerContentImg__6.forEach(e => {
    e.children[2].children[0].addEventListener('mouseenter', function () {
        e.children[0].classList.add('switch')
        e.children[1].classList.add('switch')
        e.children[2].classList.add('switch')
        e.children[2].children[0].classList.add('switch')
    })
    e.children[2].children[0].addEventListener('mouseleave', function () {
        e.children[0].classList.remove('switch')
        e.children[1].classList.remove('switch')
        e.children[2].classList.remove('switch')
        e.children[2].children[0].classList.remove('switch')
    })
});

scrollContainerContentImg__5.forEach(e => {
    e.children[2].children[0].addEventListener('mouseenter', function () {
        e.children[0].classList.add('switch')
        e.children[1].classList.add('switch')
        e.children[2].classList.add('switch')
        e.children[2].children[0].classList.add('switch')
    })
    e.children[2].children[0].addEventListener('mouseleave', function () {
        e.children[0].classList.remove('switch')
        e.children[1].classList.remove('switch')
        e.children[2].classList.remove('switch')
        e.children[2].children[0].classList.remove('switch')
    })
});

scrollContainerContentImg__4.forEach(e => {
    e.children[2].children[0].addEventListener('mouseenter', function () {
        e.children[0].classList.add('switch')
        e.children[1].classList.add('switch')
        e.children[2].classList.add('switch')
        e.children[2].children[0].classList.add('switch')
    })
    e.children[2].children[0].addEventListener('mouseleave', function () {
        e.children[0].classList.remove('switch')
        e.children[1].classList.remove('switch')
        e.children[2].classList.remove('switch')
        e.children[2].children[0].classList.remove('switch')
    })
});

scrollContainerContentImg__3.forEach(e => {
    e.children[2].children[0].addEventListener('mouseenter', function () {
        e.children[0].classList.add('switch')
        e.children[1].classList.add('switch')
        e.children[2].classList.add('switch')
        e.children[2].children[0].classList.add('switch')
    })
    e.children[2].children[0].addEventListener('mouseleave', function () {
        e.children[0].classList.remove('switch')
        e.children[1].classList.remove('switch')
        e.children[2].classList.remove('switch')
        e.children[2].children[0].classList.remove('switch')
    })
});

scrollContainerContentImg__2.forEach(e => {
    e.children[2].children[0].addEventListener('mouseenter', function () {
        e.children[0].classList.add('switch')
        e.children[1].classList.add('switch')
        e.children[2].classList.add('switch')
        e.children[2].children[0].classList.add('switch')
    })
    e.children[2].children[0].addEventListener('mouseleave', function () {
        e.children[0].classList.remove('switch')
        e.children[1].classList.remove('switch')
        e.children[2].classList.remove('switch')
        e.children[2].children[0].classList.remove('switch')
    })
});

scrollContainerContentImg__1.forEach(e => {
    e.children[2].children[0].addEventListener('mouseenter', function () {
        e.children[0].classList.add('switch')
        e.children[1].classList.add('switch')
        e.children[2].classList.add('switch')
        e.children[2].children[0].classList.add('switch')
    })
    e.children[2].children[0].addEventListener('mouseleave', function () {
        e.children[0].classList.remove('switch')
        e.children[1].classList.remove('switch')
        e.children[2].classList.remove('switch')
        e.children[2].children[0].classList.remove('switch')
    })
});

let homeActive = false;
let startMenuActive = true;
let hoverPlane = true;
let workshopActive = false;
let creditActive = false;
let switchBtn = true;
let stopMusic = false;
let cursorOnVideo = false;
let switchHamburger = false;
let fisrtStart = true;

let backPossible = true;
let clickPossible = true;
let scrollPossible = false;
let planeScrollPossible = true;
let btnPressed = false;

let isScrollDown = false;
let isScrollUp = false;

let idPlane = [
    false, false, false, false, false, false, false, false, false, false, false, false, false, false
]

let varDelay = .0;
let scrollPos = 0;
let direction = "";
let indicHover = "";

let queue = new createjs.LoadQueue(false);

queue.on("progress", event => {
    let increment = Math.floor(event.progress*100);
    progress.innerHTML = increment;
    indicGoDesktop.classList.add('switch')
});

queue.on("complete", event => {
    indicGoDesktop.classList.remove('switch')
    progress.classList.add('switch')

    if (!window.matchMedia("(max-width: 1024px)").matches) {
        const _cursorIn = new Cursor(cursorShapeIn);
        updateCursor();
        setTimeout(function(){
            cursor.style.opacity = 1
            cursorShapeOut.style.opacity = 1
            cursor.classList.remove('startHidden')
            cursorShapeOut.classList.remove('startHidden')
        },50)
    }

    TweenMax.to(".spanContainerMainStart span", { duration: 1, opacity: 1, stagger: { each: 0.04, from: 'random' }, ease: "power3.inOut", delay: .75 })
    TweenMax.to(".borderLeft", { duration: 1, opacity: 1, clipPath: 'inset(0% 0% 0% 0%)', ease: "power3.inOut", delay: .75 })
    TweenMax.to(".borderRight", { duration: 1, opacity: 1, clipPath: 'inset(0% 0% 0% 0%)', ease: "power3.inOut", delay: .75 })
    TweenMax.to(".borderTop", { duration: 1, opacity: 1, clipPath: 'inset(0% 0% 0% 0%)', ease: "power3.inOut", delay: 1.25 })
    TweenMax.to(".borderBottom", { duration: 1, opacity: 1, clipPath: 'inset(0% 0% 0% 0%)', ease: "power3.inOut", delay: 1.25 })

    setTimeout(function(){
    btnMainStart.addEventListener("pointerenter", function() {
        if (!homeActive && startMenuActive) {
            handleMouseEnterBtn(btnMainStart);
        }
        btnMainStart.addEventListener("pointerleave", handleMouseLeave)
    })

        btnMainStart.addEventListener('mouseenter', function(){
            spanContainerMainStart.classList.add('neonText');
            cursorShapeIn.classList.add('mouseover');
            TweenMax.to(btnMainStart, .5, { color: "#09021e", background: "#4cc9f0", ease: "power3.inOut" });
            spanContainerMainStart.classList.add('neonText');
        })
        
        btnMainStart.addEventListener('mouseleave', function() {
            TweenMax.to(btnMainStart, .5, { color: "#4cc9f0", background: "#09021e", ease: "power3.inOut" });
            cursorShapeIn.classList.remove('mouseover');
            spanContainerMainStart.classList.remove('neonText');
        })

        btnMainStart.addEventListener('click', function() {
            startImmersion()
        })
    }, 750)
})

////////// LOAD FILES //////////
queue.on("fileload", handleFileComplete);

queue.loadFile(atelier1Default);
queue.loadFile(atelier2Default);
queue.loadFile(atelier3Default);
queue.loadFile(atelier4Default);
queue.loadFile(atelier5Default);
queue.loadFile(atelier6Default);
queue.loadFile(atelier7Default);
queue.loadFile(atelier8Default);
queue.loadFile(atelier9Default);
queue.loadFile(atelier10Default);
queue.loadFile(atelier11Default);
queue.loadFile(atelier12Default);
queue.loadFile(atelier13Default);
queue.loadFile(atelier14Default);

queue.loadFile(atelier1Hover);
queue.loadFile(atelier2Hover);
queue.loadFile(atelier3Hover);
queue.loadFile(atelier4Hover);
queue.loadFile(atelier5Hover);
queue.loadFile(atelier6Hover);
queue.loadFile(atelier7Hover);
queue.loadFile(atelier8Hover);
queue.loadFile(atelier9Hover);
queue.loadFile(atelier10Hover);
queue.loadFile(atelier11Hover);
queue.loadFile(atelier12Hover);
queue.loadFile(atelier13Hover);
queue.loadFile(atelier14Hover);

queue.loadFile(displacement2);
queue.loadFile(displacement4);

queue.loadFile(particle);
queue.loadFile(socleModel);
queue.loadFile(logoModel);
queue.loadFile(homeModel);
queue.loadFile(streetModel);
queue.loadFile(rightDoorModel);
queue.loadFile(rightDoor2Model);
queue.loadFile(leftDoorModel);
queue.loadFile(leftDoor2Model);
queue.loadFile(pyloneModel);
queue.loadFile(gridModel);
queue.loadFile(tableModel);
queue.loadFile(poutreModel);
queue.loadFile(leftWallModel);
queue.loadFile(rightWallModel);
queue.loadFile(fieldModel);
queue.loadFile(signModel);
queue.loadFile(vr2Model);
queue.loadFile(tabProgModel);
queue.loadFile(tvModel);
queue.loadFile(camModel);
queue.loadFile(enceinteModel);

queue.loadFile(fragmentShaderVertical);
queue.loadFile(fragmentShader);
queue.loadFile(vertexShader);

queue.loadFile(rpzImport);
queue.loadFile(bgMusicImport);
queue.loadFile(bgLoopMusicImport);
queue.loadFile(rpzImport);
queue.loadFile(soundHoverImport);
queue.loadFile(soundHoverPlaneImport);
queue.loadFile(soundOutPlaneImport);

queue.loadFile(GLTFLoader);
queue.loadFile(THREE);
queue.loadFile(POSTPROCESSING);
queue.loadFile(Interaction);
queue.loadFile(createjs);
queue.loadFile(TouchSweep);

function handleFileComplete(){}

function startImmersion() {

        cursorIndication.classList.remove('startHidden')
        mobileIndication.classList.remove('startHidden')
        containerTimeline.classList.remove('startHidden')
        hamburgerContainer.classList.remove('startHidden')

        startMenuActive = false;
        bgMusic.play();

        TweenMax.to(maskMusicBtn, { duration: .35, clipPath: "inset(100% 0% 0% 0%)",ease: "power3.easeOut" });
        TweenMax.to(maskMusicBtn, { duration: .25, clipPath: "inset(0% 0% 0% 0%)",ease: "power3.easeOut", delay: .15 });
        TweenMax.to(maskMusicBtn, { duration: .25, clipPath: "inset(0% 0% 100% 0%)",ease: "power3.easeOut", delay: .5 });   
        switchBtn = true; 
        onMusic.classList.toggle('switch');
        offMusic.classList.toggle('switch')
    
        setTimeout(function(){
            lineMusicBtn.forEach(line=>{
                line.classList.toggle('switch');
            })
        },350) 

        if (window.matchMedia("(max-width: 1024px)").matches) {
            let html = document.querySelector('html');
                if (html.requestFullscreen) {
                    html.requestFullscreen();
                } else if (html.mozRequestFullScreen) {
                    html.mozRequestFullScreen();
                } else if (html.webkitRequestFullscreen) {
                    html.webkitRequestFullscreen();
                } else if (html.msRequestFullscreen) {
                    html.msRequestFullscreen();
                }
            }
        
        handleMouseLeave();
        TweenMax.to(".spanContainerMainStart span", { duration: .5, opacity: 0, stagger: { each: 0.04, from: 'random' }, ease: "power3.inOut" })
        TweenMax.to(btnMainStart, { duration: 1.5, opacity: 0, ease: "power3.inOut" })

        titleSvgPath.forEach(e => {
            e.classList.remove("pathTitleOut")
            e.classList.remove("pathTitleIn")
        });
            titleSvgLine.classList.remove("pathLineOut")
            titleSvgLine.classList.remove("pathLineIn")

        setTimeout(function() {
        TweenMax.to(bgCol, { duration: 1, clipPath: "inset(0% 0% 0% 0%)", stagger: 0.02 });
        TweenMax.to(bgCol, { duration: .5, background: '#f72585', opacity: .325, stagger: 0.02 });
        TweenMax.to(bgCol, { duration: .5, background: '#0d0437', opacity: .65, stagger: 0.02 });
        TweenMax.to(bgRow, { duration: 1, clipPath: "inset(0% 0% 0% 0%)", stagger: 0.0355555 });
        TweenMax.to(bgRow, { duration: .5, background: '#f72585', opacity: .325, stagger: 0.0355555 });
        TweenMax.to(bgRow, { duration: .5, background: '#0d0437', opacity: .65, stagger: 0.0355555 });
        TweenMax.to(bgCol, { duration: .5, background: '#f72585', opacity: .05, stagger: 0.02, delay: 2 });
        TweenMax.to(bgRow, { duration: .5, background: '#f72585', opacity: .05, stagger: 0.0355555, delay: 2 });
        TweenMax.to(".firstSlogan span", { duration: 2, opacity: 1, stagger: { each: 0.02, from: 'random' }, ease: "expo.inOut", delay: .25 })
        TweenMax.to(".firstSlogan span", { duration: 2, opacity: 0, stagger: { each: 0.02, from: 'random' }, ease: "expo.inOut", delay: 3.5 })

        setTimeout(function(){
        canvas.classList.add('hologramActive')
        //CAMERA ANIM
         gsap.to(camera.position, 3.75, { z: 10, ease: "power3.inOut" })

        //RAJOUT DES PARTICULES
        setTimeout(function(){
         scene.add(particleMesh);
        },1000)
        gsap.to(particleMesh.scale, 3.75, { x: 1, y: 1, z: 1, ease: "power3.inOut", })
        if (!window.matchMedia("(max-width: 1024px)").matches) {
         gsap.to(home.position, 3.75, { z: 0, x: -1.45, ease: "power3.inOut" })
         gsap.to(home.rotation, 3.75, { y: -.35, z: 0, ease: "power3.inOut" })
         TweenMax.to(homeMask, 3.75, { opacity: 1, ease: "power3.inOut" })
         }
        },4000);

        setTimeout(function(){

            titleSvg.classList.add('switchTitle')
            titleSvgPath.forEach(e => {
                e.classList.remove("pathTitleOut")
                e.classList.add("pathTitleIn")
            });
            titleSvgLine.classList.remove("pathLineOut")
            titleSvgLine.classList.add("pathLineIn")

            setTimeout(function(){
            TweenMax.to(".spanContainerDiscord span", { duration: 0.75, opacity: .6, stagger: { each: 0.06, from: 'random' }, ease: "power3.inOut" })
            TweenMax.to(".spanContainerIut span", { duration: 0.75, opacity: .6, stagger: { each: 0.04, from: 'random' }, ease: "power3.inOut" })
            gsap.to(sm1, 0.75, {opacity: 1,  ease: "Power3.easeOut"})
            gsap.to(sm2, 0.75, {opacity: 1,  ease: "Power3.easeOut", delay: .15})
            gsap.to(sm3, 0.75, {opacity: 1,  ease: "Power3.easeOut", delay: .3})
            gsap.to(musicBtn, 0.75, {opacity: 1, ease: "Power3.easeOut"})
            TweenMax.to(btnStart, .75, { opacity: 1, clipPath: "inset(0% 0% 0% 0%)",ease: "power3.inOut" })

            setTimeout(function(){
                homeActive = true;
                discordContainer.classList.add('switchPointer')
                iutContainer.classList.add('switchPointer')
                sm1.classList.add('switchPointer')
                sm2.classList.add('switchPointer')
                sm3.classList.add('switchPointer')
                musicBtn.classList.add('switchPointer')
            }, 550)
            }, 3200)
                            
        }, 4500)

        if (!window.matchMedia("(max-width: 1024px)").matches) {
            TweenMax.to(bgCol, { duration: 1.5, background: '#f72585', opacity: .05, stagger: 0.02, repeat: -1, yoyo: true, delay: 2 });
            TweenMax.to(bgRow, { duration: 1.5, background: '#f72585', opacity: .05, stagger: 0.0355555, repeat: -1, yoyo: true, delay: 2 });
        }
    }, 200)

        btnMainStart.classList.add('close');
        btnBackHome.classList.remove('hover')
        cursorShapeIn.classList.remove('mouseover')
        setTimeout(function() {
            spanContainerBackMouseOut.classList.remove('neonText');
        }, 750)
}

function switchMusic() {
    if (switchBtn == false) {
        TweenMax.to(maskMusicBtn, { duration: .35, clipPath: "inset(100% 0% 0% 0%)",ease: "power3.easeOut" });
        TweenMax.to(maskMusicBtn, { duration: .25, clipPath: "inset(0% 0% 0% 0%)",ease: "power3.easeOut", delay: .15 });
        TweenMax.to(maskMusicBtn, { duration: .25, clipPath: "inset(0% 0% 100% 0%)",ease: "power3.easeOut", delay: .5 }); 
        if (window.matchMedia("(max-width: 1024px)").matches) {
            soundHover.play();
        }
        if (fisrtStart) {
            bgMusic.play();
            var fadeAudio = setInterval(function () {
                if (bgMusic.volume >= volume) {
                    clearInterval(fadeAudio);
                } else if (bgMusic.volume < volume) {
                    bgMusic.volume += 0.1;
                }
            }, 500);
        } else {
            fadeInAudio(bgLoopMusic)
        }
        switchBtn = true;
        rpzMusic.volume = volume; 
        soundHover.volume = volumeBtn;
        soundHoverPlane.volume = volumePlane;
        soundOutPlane.volume = volumePlane;
    } else {
        TweenMax.to(maskMusicBtn, { duration: .35, clipPath: "inset(0% 0% 100% 0%)",ease: "power3.easeOut" });
        TweenMax.to(maskMusicBtn, { duration: .25, clipPath: "inset(0% 0% 0% 0%)",ease: "power3.easeOut", delay: .15 });
        TweenMax.to(maskMusicBtn, { duration: .25, clipPath: "inset(100% 0% 0% 0%)",ease: "power3.easeOut", delay: .5 });
     
        if (fisrtStart) {
            var fadeAudio = setInterval(function () {
                if (bgMusic.volume < 0.1) {
                    clearInterval(fadeAudio);
                    bgMusic.pause();
                } else if (bgMusic.volume >= .1) {
                    bgMusic.volume -= .1;
                }
            }, 300);
        } else {
            fadeOutAudio(bgLoopMusic)
        }
        switchBtn = false;
        rpzMusic.volume = 0; 
        soundHover.volume = 0;
        soundHoverPlane.volume = 0;
        soundOutPlane.volume = 0;
        }

        onMusic.classList.toggle('switch');
        offMusic.classList.toggle('switch')

    setTimeout(function(){
        lineMusicBtn.forEach(line=>{
            line.classList.toggle('switch');
        })
    }, 350)   
}

musicBtn.addEventListener('click', function(){
    switchMusic() 
    if (!stopMusic) {
        stopMusic = true
    } else {
        stopMusic = false
    }
})

musicBtn.addEventListener('mouseenter', function(){
    if (!window.matchMedia("(max-width: 1024px)").matches) {
    soundHover.play();
    }
})

function cursorHoverIn() {
    if (!window.matchMedia("(max-width: 1024px)").matches) {
        gsap.to(cursorShapeOut, 0.50, { opacity: 0, ease: "Power3.easeOut"})
        if (indicHover == "plane") {
            soundHoverPlane.play(); 
        }
        if (indicHover == "plane" || indicHover == "content") {
            indicClickOnPlane.classList.add("planeHover")
            gsap.to(cursorShapeIn, 0.75, { background: colorCursorHover, padding: 50, ease: "Power3.easeOut"})
            gsap.to(cursorSize, 0.75, { padding: 50, ease: "Power3.easeOut"})
            gsap.to(indicClickOnPlane, .75, { scale: 1, ease: "Power3.easeOut", delay: .05})
        } else if (indicHover == "ID") {
            gsap.to(cursorShapeIn, 0.75, { background: colorCursorDefault, padding: 25, ease: "Power3.easeOut"})
            gsap.to(cursorSize, 0.75, { padding: 25, ease: "Power3.easeOut"})
        }
    }
}

function cursorHoverOut() {
    if (!window.matchMedia("(max-width: 1024px)").matches) {
        gsap.to(cursorSize, 0.75, {padding: 0, ease: "Power3.easeOut"})
        gsap.to(cursorShapeIn, 0.75, { background: colorCursorDefault, padding: 0, ease: "Power3.easeOut"})
        gsap.to(cursorShapeOut, 0.25, { opacity: 1,  delay: 0.25, ease: "Power3.easeOut"})
        gsap.to(indicClickOnPlane, 0.75, { scale: 0, ease: "Power3.easeOut"})
        indicClickOnPlane.classList.remove("planeHover")
        if (indicHover == "plane") { 
            soundOutPlane.play(); 
        }
        // indicClickOnID.classList.remove("planeHover")
        indicHover = ""
    }
}

/////// PLANE HOVER SHADERS EFFECT ///////
let colorCursorHover = "#f72585";
let colorCursorDefault = "#4cc9f0";

planeMesh14.on('mouseover', function(ev) {
    if (ev && (hoverPlane && !workshopActive && (planeAxe.position.y <= -17 && planeAxe.position.y >= -25.5 || planeAxe.position.y <= -16.5 && planeAxe.position.y >= -17))) {
        indicHover = "plane"
        cursorHoverIn()
        if (!window.matchMedia("(max-width: 1024px)").matches) {
            gsap.to(materialPlane14.uniforms.alpha, 0.75, { value: 1.0, ease: "Power3.easeOut" })
            gsap.to(materialPlane14.uniforms.dispFactor, 0.75, { value: 1.0, ease: "Power3.easeOut" });
        }
    }
});
planeMesh14.on('mouseout', function(ev) {
    if (ev && !workshopActive) {
        
        cursorHoverOut()
        if (!window.matchMedia("(max-width: 1024px)").matches) {
            gsap.to(materialPlane14.uniforms.alpha, 0.75, { value: planeOpacityDefault, ease: "Power3.easeOut" })
            gsap.to(materialPlane14.uniforms.dispFactor, 0.75, { value: 0.0, ease: "Power3.easeOut" });
        }
    }
});

planeMesh13.on('mouseover', function(ev) {
    if (ev && (hoverPlane && !workshopActive && (planeAxe.position.y <= -16 && planeAxe.position.y >= -16.5 || planeAxe.position.y <= -15.5 && planeAxe.position.y >= -16))) {
        indicHover = "plane"
        cursorHoverIn()
        if (!window.matchMedia("(max-width: 1024px)").matches) {
            gsap.to(materialPlane13.uniforms.alpha, 0.75, { value: 1.0, ease: "Power3.easeOut" })
            gsap.to(materialPlane13.uniforms.dispFactor, 0.75, { value: 1.0, ease: "Power3.easeOut" });
        }
    }
});
planeMesh13.on('mouseout', function(ev) {
    if (ev && !workshopActive) {
        
        cursorHoverOut()
        if (!window.matchMedia("(max-width: 1024px)").matches) {
            gsap.to(materialPlane13.uniforms.alpha, 0.75, { value: planeOpacityDefault, ease: "Power3.easeOut" })
            gsap.to(materialPlane13.uniforms.dispFactor, 0.75, { value: 0.0, ease: "Power3.easeOut" });
        }
    }
});

planeMesh12.on('mouseover', function(ev) {
    if (ev && (hoverPlane && !workshopActive && (planeAxe.position.y <= -15 && planeAxe.position.y >= -15.5 || planeAxe.position.y <= -14.5 && planeAxe.position.y >= -15))) {
        indicHover = "plane"
        cursorHoverIn()
        if (!window.matchMedia("(max-width: 1024px)").matches) {
            gsap.to(materialPlane12.uniforms.alpha, 0.75, { value: 1.0, ease: "Power3.easeOut" })
            gsap.to(materialPlane12.uniforms.dispFactor, 0.75, { value: 1.0, ease: "Power3.easeOut" });
        }
    }
});
planeMesh12.on('mouseout', function(ev) {
    if (ev && !workshopActive) {
        
        cursorHoverOut()
        if (!window.matchMedia("(max-width: 1024px)").matches) {
            gsap.to(materialPlane12.uniforms.alpha, 0.75, { value: planeOpacityDefault, ease: "Power3.easeOut" })
            gsap.to(materialPlane12.uniforms.dispFactor, 0.75, { value: 0.0, ease: "Power3.easeOut" });
        }
    }
});

planeMesh11.on('mouseover', function(ev) {
    if (ev && (hoverPlane && !workshopActive && (planeAxe.position.y <= -14 && planeAxe.position.y >= -14.5 || planeAxe.position.y <= -13.5 && planeAxe.position.y >= -14))) {
        indicHover = "plane"
        cursorHoverIn()
        if (!window.matchMedia("(max-width: 1024px)").matches) {
            gsap.to(materialPlane11.uniforms.alpha, 0.75, { value: 1.0, ease: "Power3.easeOut" })
            gsap.to(materialPlane11.uniforms.dispFactor, 0.75, { value: 1.0, ease: "Power3.easeOut" });
        }
    }
});
planeMesh11.on('mouseout', function(ev) {
    if (ev && !workshopActive) {
        
        cursorHoverOut()
        if (!window.matchMedia("(max-width: 1024px)").matches) {
            gsap.to(materialPlane11.uniforms.alpha, 0.75, { value: planeOpacityDefault, ease: "Power3.easeOut" })
            gsap.to(materialPlane11.uniforms.dispFactor, 0.75, { value: 0.0, ease: "Power3.easeOut" });
        }
    }
});

planeMesh10.on('mouseover', function(ev) {
    if (ev && (hoverPlane && !workshopActive && (planeAxe.position.y <= -13 && planeAxe.position.y >= -13.5 || planeAxe.position.y <= -12.5 && planeAxe.position.y >= -13))) {
        indicHover = "plane"
        cursorHoverIn()
        if (!window.matchMedia("(max-width: 1024px)").matches) {
            gsap.to(materialPlane10.uniforms.alpha, 0.75, { value: 1.0, ease: "Power3.easeOut" })
            gsap.to(materialPlane10.uniforms.dispFactor, 0.75, { value: 1.0, ease: "Power3.easeOut" });
        }
    }
});
planeMesh10.on('mouseout', function(ev) {
    if (ev && !workshopActive) {
        
        cursorHoverOut()
        if (!window.matchMedia("(max-width: 1024px)").matches) {
            gsap.to(materialPlane10.uniforms.alpha, 0.75, { value: planeOpacityDefault, ease: "Power3.easeOut" })
            gsap.to(materialPlane10.uniforms.dispFactor, 0.75, { value: 0.0, ease: "Power3.easeOut" });
        }
    }
});

planeMesh9.on('mouseover', function(ev) {
    if (ev && (hoverPlane && !workshopActive && (planeAxe.position.y <= -12 && planeAxe.position.y >= -12.5 || planeAxe.position.y <= -11.5 && planeAxe.position.y >= -12))) {
        indicHover = "plane"
        cursorHoverIn()
        if (!window.matchMedia("(max-width: 1024px)").matches) {
            gsap.to(materialPlane9.uniforms.alpha, 0.75, { value: 1.0, ease: "Power3.easeOut" })
            gsap.to(materialPlane9.uniforms.dispFactor, 0.75, { value: 1.0, ease: "Power3.easeOut" });
        }
    }
});
planeMesh9.on('mouseout', function(ev) {
    if (ev && !workshopActive) {
        
        cursorHoverOut()
        if (!window.matchMedia("(max-width: 1024px)").matches) {
            gsap.to(materialPlane9.uniforms.alpha, 0.75, { value: planeOpacityDefault, ease: "Power3.easeOut" })
            gsap.to(materialPlane9.uniforms.dispFactor, 0.75, { value: 0.0, ease: "Power3.easeOut" });
        }
    }   
});

planeMesh8.on('mouseover', function(ev) {
    if (ev && (hoverPlane && !workshopActive && (planeAxe.position.y <= -11 && planeAxe.position.y >= -11.5 || planeAxe.position.y <= -10.5 && planeAxe.position.y >= -11))) {
        indicHover = "plane"
        cursorHoverIn()
        if (!window.matchMedia("(max-width: 1024px)").matches) {
            gsap.to(materialPlane8.uniforms.alpha, 0.75, { value: 1.0, ease: "Power3.easeOut" })
            gsap.to(materialPlane8.uniforms.dispFactor, 0.75, { value: 1.0, ease: "Power3.easeOut" });
        }
    }
});
planeMesh8.on('mouseout', function(ev) {
    if (ev && !workshopActive) {
        
        cursorHoverOut()
        if (!window.matchMedia("(max-width: 1024px)").matches) {
            gsap.to(materialPlane8.uniforms.alpha, 0.75, { value: planeOpacityDefault, ease: "Power3.easeOut" })
            gsap.to(materialPlane8.uniforms.dispFactor, 0.75, { value: 0.0, ease: "Power3.easeOut" });
        }
    }
});

planeMesh7.on('mouseover', function(ev) {
    if (ev && (hoverPlane && !workshopActive && (planeAxe.position.y <= -10 && planeAxe.position.y >= -10.5 || planeAxe.position.y <= -9.5 && planeAxe.position.y >= -10))) {
        indicHover = "plane"
        cursorHoverIn()
        if (!window.matchMedia("(max-width: 1024px)").matches) {
            gsap.to(materialPlane7.uniforms.alpha, 0.75, { value: 1.0, ease: "Power3.easeOut" })
            gsap.to(materialPlane7.uniforms.dispFactor, 0.75, { value: 1.0, ease: "Power3.easeOut" });
        }
    }
});
planeMesh7.on('mouseout', function(ev) {
    if (ev && !workshopActive) {
        
        cursorHoverOut()
        if (!window.matchMedia("(max-width: 1024px)").matches) {
            gsap.to(materialPlane7.uniforms.alpha, 0.75, { value: planeOpacityDefault, ease: "Power3.easeOut" })
            gsap.to(materialPlane7.uniforms.dispFactor, 0.75, { value: 0.0, ease: "Power3.easeOut" });
        }
    }
});

planeMesh6.on('mouseover', function(ev) {
    if (ev && (hoverPlane && !workshopActive && (planeAxe.position.y <= -9 && planeAxe.position.y >= -9.5 || planeAxe.position.y <= -8.5 && planeAxe.position.y >= -9))) {
        indicHover = "plane"
        cursorHoverIn()
        if (!window.matchMedia("(max-width: 1024px)").matches) {
            gsap.to(materialPlane6.uniforms.alpha, 0.75, { value: 1.0, ease: "Power3.easeOut" })
            gsap.to(materialPlane6.uniforms.dispFactor, 0.75, { value: 1.0, ease: "Power3.easeOut" });
        }
    }
});
planeMesh6.on('mouseout', function(ev) {
    if (ev && !workshopActive) {
        
        cursorHoverOut()
        if (!window.matchMedia("(max-width: 1024px)").matches) {
            gsap.to(materialPlane6.uniforms.alpha, 0.75, { value: planeOpacityDefault, ease: "Power3.easeOut" })
            gsap.to(materialPlane6.uniforms.dispFactor, 0.75, { value: 0.0, ease: "Power3.easeOut" });
        }
    }
});

planeMesh5.on('mouseover', function(ev) {
    if (ev && (hoverPlane && !workshopActive && (planeAxe.position.y <= -8 && planeAxe.position.y >= -8.5 || planeAxe.position.y <= -7.5 && planeAxe.position.y >= -8))) {
        indicHover = "plane"
        cursorHoverIn()
        if (!window.matchMedia("(max-width: 1024px)").matches) {
            gsap.to(materialPlane5.uniforms.alpha, 0.75, { value: 1.0, ease: "Power3.easeOut" })
            gsap.to(materialPlane5.uniforms.dispFactor, 0.75, { value: 1.0, ease: "Power3.easeOut" });
        }
    }
});
planeMesh5.on('mouseout', function(ev) {
    if (ev && !workshopActive) {
        cursorHoverOut()
        if (!window.matchMedia("(max-width: 1024px)").matches) {
            gsap.to(materialPlane5.uniforms.alpha, 0.75, { value: planeOpacityDefault, ease: "Power3.easeOut" })
            gsap.to(materialPlane5.uniforms.dispFactor, 0.75, { value: 0.0, ease: "Power3.easeOut" });
        }
    }
});

planeMesh4.on('mouseover', function(ev) {
    if (ev && (hoverPlane && !workshopActive && (planeAxe.position.y <= -7 && planeAxe.position.y >= -7.5 || planeAxe.position.y <= -6.5 && planeAxe.position.y >= -7))) {
        indicHover = "plane"
        cursorHoverIn()
        if (!window.matchMedia("(max-width: 1024px)").matches) {
            gsap.to(materialPlane4.uniforms.alpha, 0.75, { value: 1.0, ease: "Power3.easeOut" })
            gsap.to(materialPlane4.uniforms.dispFactor, 0.75, { value: 1.0, ease: "Power3.easeOut" });
        }
    }
});
planeMesh4.on('mouseout', function(ev) {
    if (ev && !workshopActive) {
        
        cursorHoverOut()
        if (!window.matchMedia("(max-width: 1024px)").matches) {
            gsap.to(materialPlane4.uniforms.alpha, 0.75, { value: planeOpacityDefault, ease: "Power3.easeOut" })
            gsap.to(materialPlane4.uniforms.dispFactor, 0.75, { value: 0.0, ease: "Power3.easeOut" });
        }
    }
});

planeMesh3.on('mouseover', function(ev) {
    if (ev && (hoverPlane && !workshopActive && (planeAxe.position.y <= -6 && planeAxe.position.y >= -6.5 || planeAxe.position.y <= -5.5 && planeAxe.position.y >= -6))) {
        indicHover = "plane"
        cursorHoverIn()
        if (!window.matchMedia("(max-width: 1024px)").matches) {
            gsap.to(materialPlane3.uniforms.alpha, 0.75, { value: 1.0, ease: "Power3.easeOut" })
            gsap.to(materialPlane3.uniforms.dispFactor, 0.75, { value: 1.0, ease: "Power3.easeOut" });
        }
    }
});
planeMesh3.on('mouseout', function(ev) {
    if (ev && !workshopActive) {
        
        cursorHoverOut()
        if (!window.matchMedia("(max-width: 1024px)").matches) {
            gsap.to(materialPlane3.uniforms.alpha, 0.75, { value: planeOpacityDefault, ease: "Power3.easeOut" })
            gsap.to(materialPlane3.uniforms.dispFactor, 0.75, { value: 0.0, ease: "Power3.easeOut" });
        }
    }
});

planeMesh2.on('mouseover', function(ev) {
    if (ev && (hoverPlane && !workshopActive && (planeAxe.position.y <= -5 && planeAxe.position.y >= -5.5 || planeAxe.position.y <= -4.5 && planeAxe.position.y >= -5))) {
        indicHover = "plane"
        cursorHoverIn()
        if (!window.matchMedia("(max-width: 1024px)").matches) {
            gsap.to(materialPlane2.uniforms.alpha, 0.75, { value: 1.0, ease: "Power3.easeOut" })
            gsap.to(materialPlane2.uniforms.dispFactor, 0.75, { value: 1.0, ease: "Power3.easeOut" });
        }
    }
});
planeMesh2.on('mouseout', function(ev) {
    if (ev && !workshopActive) {
        
        cursorHoverOut()
        if (!window.matchMedia("(max-width: 1024px)").matches) {
            gsap.to(materialPlane2.uniforms.alpha, 0.75, { value: planeOpacityDefault, ease: "Power3.easeOut" })
            gsap.to(materialPlane2.uniforms.dispFactor, 0.75, { value: 0.0, ease: "Power3.easeOut" });
        }
    }
});

planeMesh1.on('mouseover', function(ev) {
    if (ev && (hoverPlane && !workshopActive && (planeAxe.position.y <= -4 && planeAxe.position.y >= -4.5 || planeAxe.position.y <= -3.5 && planeAxe.position.y >= -4))) {
        indicHover = "plane"
        cursorHoverIn()
        if (!window.matchMedia("(max-width: 1024px)").matches) {
            gsap.to(materialPlane1.uniforms.alpha, 0.75, { value: 1.0, ease: "Power3.easeOut" })
            gsap.to(materialPlane1.uniforms.dispFactor, 0.75, { value: 1.0, ease: "Power3.easeOut" });
        }
    }
});
planeMesh1.on('mouseout', function(ev) {
    if (ev && !workshopActive) {
        
        cursorHoverOut()
        if (!window.matchMedia("(max-width: 1024px)").matches) {
            gsap.to(materialPlane1.uniforms.alpha, 0.75, { value: planeOpacityDefault, ease: "Power3.easeOut" })
            gsap.to(materialPlane1.uniforms.dispFactor, 0.75, { value: 0.0, ease: "Power3.easeOut" });
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
    if (!workshopActive)
        scrollDown();
});

el.addEventListener('swiperight', () => {
    if (!workshopActive)
        scrollUp();
});

function animationEnterWorkshop() {
    if (idPlane[14]) {
        contentContainer__14.style.display = "block"
        scrollContainer__14.style.display = "flex"
        contentContainer__14.children[2].children[0].children[1].src = "https://www.youtube.com/embed/Q0gk3DylOsM"
    } else if (idPlane[13]) {
        contentContainer__13.style.display = "block"
        scrollContainer__13.style.display = "flex"
        contentContainer__13.children[2].children[0].children[1].src = "https://www.youtube.com/embed/kmIgKwUH4kU"
        contentContainer__13.children[4].children[0].children[1].src = "https://www.youtube.com/embed/KaS6BTJNLUQ"
    } else if (idPlane[12]) {
        contentContainer__12.style.display = "block"
        scrollContainer__12.style.display = "flex"
        contentContainer__12.children[2].children[0].children[1].src = "https://www.youtube.com/embed/8tyYcjwssfA"
        contentContainer__12.children[4].children[0].children[1].src = "https://www.youtube.com/embed/bkc_MHKCavg"
    } else if (idPlane[11]) {
        contentContainer__11.style.display = "block"
        scrollContainer__11.style.display = "flex"
        contentContainer__11.children[2].children[0].children[1].src = "https://www.youtube.com/embed/xHP28qFL7pM"
        // contentContainer__11.children[4].children[0].children[1].src = "https://player.twitch.tv/?channel=immersionsdigitales&parent=www.id.dakumisu.fr"
    } else if (idPlane[10]) {
        contentContainer__10.style.display = "block"
        scrollContainer__10.style.display = "flex"
        contentContainer__10.children[2].children[0].children[1].src = "https://www.youtube.com/embed/FjhhMMxQyzA"
        // contentContainer__10.children[4].children[0].children[1].src = "https://player.twitch.tv/?channel=digisoundr&parent=www.id.dakumisu.fr"
    } else if (idPlane[9]) {
        contentContainer__9.style.display = "block"
        scrollContainer__9.style.display = "flex"
        contentContainer__9.children[2].children[0].children[1].src = "https://www.youtube.com/embed/0Aa3iRMg8-E"
        contentContainer__9.children[4].children[0].children[1].src = "https://www.youtube.com/embed/N6c2qao9yaM"
    } else if (idPlane[8]) {
        contentContainer__8.style.display = "block"
        scrollContainer__8.style.display = "flex"
        contentContainer__8.children[2].children[0].children[1].src = "https://www.youtube.com/embed/-byRWG9-gjw"
    } else if (idPlane[7]) {
        contentContainer__7.style.display = "block"
        scrollContainer__7.style.display = "flex"
        contentContainer__7.children[2].children[0].children[1].src = "https://www.youtube.com/embed/RWY2GGa58xY"
    
    } else if (idPlane[6]) {
        contentContainer__6.style.display = "block"
        scrollContainer__6.style.display = "flex"
        contentContainer__6.children[2].children[0].children[1].src = "https://www.youtube.com/embed/xbaN_JEq_vQ"
    
    } else if (idPlane[5]) {
        contentContainer__5.style.display = "block"
        scrollContainer__5.style.display = "flex"
        contentContainer__5.children[2].children[0].children[1].src = "https://www.youtube.com/embed/iapdW3VRF0Y"
    
    } else if (idPlane[4]) {
        contentContainer__4.style.display = "block"
        scrollContainer__4.style.display = "flex"
        contentContainer__4.children[2].children[0].children[1].src = "https://www.youtube.com/embed/WvFpLchljjM"
    
    } else if (idPlane[3]) {
        contentContainer__3.style.display = "block"
        scrollContainer__3.style.display = "flex"
        contentContainer__3.children[2].children[0].children[1].src = "https://www.youtube.com/embed/qSXsdwp5mMI"
    
    } else if (idPlane[2]) {
        contentContainer__2.style.display = "block"
        scrollContainer__2.style.display = "flex"
        contentContainer__2.children[2].children[0].children[1].src = "https://www.youtube.com/embed/4RtlTcbE14g"
    
    } else if (idPlane[1]) {
        contentContainer__1.style.display = "block"
        scrollContainer__1.style.display = "flex"
        contentContainer__12.children[2].children[0].children[1].src = "https://www.youtube.com/embed/kmIgKwUH4kU"
    
    }

    if (window.matchMedia("(max-width: 1024px)").matches) {
    gsap.to(camera.position, 3, { z: -20, ease: "power3.inOut"})
    gsap.to(logo.rotation, 1.5, { z: -.725, y: 0, ease: "power3.inOut" })
    gsap.to(logo.scale, 1.5, { z:0, y:0, x: 0,ease: "power3.inOut" })
    gsap.to(logo.position, 1.5, { z: -15, y: .35, ease: "power3.inOut" })
    }

    
    TweenMax.to(btnBackHome, 1, { opacity: 0, clipPath: "inset(0% 100% 0% 0%)", ease: "power3.inOut" })
    TweenMax.to(btnBackWorkshop, .75, { opacity: 1, clipPath: "inset(0% 0% 0% 0%)", delay: 2.5, ease: "power3.inOut" })

    cursorIndication.classList.remove('switch')
    mobileIndication.classList.remove('switch')

    hideTimeline()

    if (!window.matchMedia("(max-width: 1024px)").matches) {
        gsap.to(camera.position, 3, { z: -20, ease: "power3.inOut", delay: .75 })
        gsap.to(logo.rotation, 1.5, { z: -.725, y: 0, ease: "power3.inOut" })
        gsap.to(logo.position, 1.5, { z: -15, y: .35, ease: "power3.inOut" })
        gsap.to(logo.position, 1.5, { x: 15, ease: "power3.inOut", delay: 1.5 })
        gsap.to(cursorSize, 0.75, {padding: 0, ease: "Power3.easeOut"})
        gsap.to(leftDoor.position, 1.5, { x: -15, ease: "power3.inOut", delay: 1.5 })
        gsap.to(rightDoor.position, 1.5, { x: 15, ease: "power3.inOut", delay: 1.5 })
        gsap.to(cursorShapeIn, 0.75, { background: colorCursorDefault, padding: 0, ease: "Power3.easeOut"})
        gsap.to(cursorShapeOut, 0.25, { opacity: 1,  delay: 0.25, ease: "Power3.easeOut"})
        gsap.to(indicClickOnPlane, 0.75, { scale: 0, ease: "Power3.easeOut"})
        indicClickOnPlane.classList.remove("planeHover")

    }

    gsap.to(workShopContainer, 1.5, { opacity: 1, ease: "Power3.easeOut", delay: 2 })

    btnBackWorkshop.classList.add('close')
    btnBackWorkshop.disabled = true
    
    setTimeout(function() {
        btnBackWorkshop.classList.remove('close')
        btnBackWorkshop.disabled = false
        clickPossible = true
    }, 3000)

    setTimeout(function() {
        if(workshopActive) {
            workShopContainer.classList.add('switchPlane');
            scrollPossible = true
        }
    }, 3750)
    
    planeScrollPossible = false
    workshopActive = true
    hoverPlane = false
    clickPossible = false
}

///// PLANES CLICK /////
function plane14Click() {
    if (clickPossible && (planeAxe.position.y <= -17 && planeAxe.position.y >= -17.5 || planeAxe.position.y <= -16.5 && planeAxe.position.y >= -17)) {
        idPlane[14] = true
        animationEnterWorkshop();
        gsap.to(materialPlane14.uniforms.alpha, 0.75, { value: 0.0, ease: "power3.inOut" });
        gsap.to(planeMesh14.scale, 0.75, { x: 1.2, y: 1.2, ease: "power3.inOut" });
        gsap.to(contentContainer__14, 1.5, { opacity: 1, ease: "Power3.easeOut", delay: 2}) 
    }
}
planeMesh14.on('click', function() {
    plane14Click();
})

function plane13Click() {
    if (clickPossible && (planeAxe.position.y <= -16 && planeAxe.position.y >= -16.5 || planeAxe.position.y <= -15.5 && planeAxe.position.y >= -16)) {
        idPlane[13] = true
        animationEnterWorkshop();
        gsap.to(materialPlane13.uniforms.alpha, 0.75, { value: 0.0, ease: "power3.inOut" });
        gsap.to(planeMesh13.scale, 0.75, { x: 1.2, y: 1.2, ease: "power3.inOut" });
        gsap.to(contentContainer__13, 1.5, { opacity: 1, ease: "Power3.easeOut", delay: 2})  
    }
}
planeMesh13.on('click', function() {
    plane13Click();
})

function plane12Click() {
    if (clickPossible && (planeAxe.position.y <= -15 && planeAxe.position.y >= -15.5 || planeAxe.position.y <= -14.5 && planeAxe.position.y >= -15)) {
        idPlane[12] = true
        animationEnterWorkshop();
        gsap.to(materialPlane12.uniforms.alpha, 0.75, { value: 0.0, ease: "power3.inOut" });
        gsap.to(planeMesh12.scale, 0.75, { x: 1.2, y: 1.2, ease: "power3.inOut" });
        gsap.to(contentContainer__12, 1.5, { opacity: 1, ease: "Power3.easeOut", delay: 2})  
    }
}
planeMesh12.on('click', function() {
    plane12Click();
})

function plane11Click() {
    if (clickPossible && (planeAxe.position.y <= -14 && planeAxe.position.y >= -14.5 || planeAxe.position.y <= -13.5 && planeAxe.position.y >= -14)) {
        idPlane[11] = true
        animationEnterWorkshop();
        gsap.to(materialPlane11.uniforms.alpha, 0.75, { value: 0.0, ease: "power3.inOut" });
        gsap.to(planeMesh11.scale, 0.75, { x: 1.2, y: 1.2, ease: "power3.inOut" });
        gsap.to(contentContainer__11, 1.5, { opacity: 1, ease: "Power3.easeOut", delay: 2})
    }
}
planeMesh11.on('click', function() {
    plane11Click();
})

function plane10Click() {
    if (clickPossible && (planeAxe.position.y <= -13 && planeAxe.position.y >= -13.5 || planeAxe.position.y <= -12.5 && planeAxe.position.y >= -13)) {
        idPlane[10] = true
        animationEnterWorkshop();
        gsap.to(materialPlane10.uniforms.alpha, 0.75, { value: 0.0, ease: "power3.inOut" });
        gsap.to(planeMesh10.scale, 0.75, { x: 1.2, y: 1.2, ease: "power3.inOut" });
        gsap.to(contentContainer__10, 1.5, { opacity: 1, ease: "Power3.easeOut", delay: 2})
    }
}
planeMesh10.on('click', function() {
    plane10Click();
})

function plane9Click() {
    if (clickPossible && (planeAxe.position.y <= -12 && planeAxe.position.y >= -12.5 || planeAxe.position.y <= -11.5 && planeAxe.position.y >= -12)) {
        idPlane[9] = true
        animationEnterWorkshop();
        gsap.to(materialPlane9.uniforms.alpha, 0.75, { value: 0.0, ease: "power3.inOut" });
        gsap.to(planeMesh9.scale, 0.75, { x: 1.2, y: 1.2, ease: "power3.inOut" });
        gsap.to(contentContainer__9, 1.5, { opacity: 1, ease: "Power3.easeOut", delay: 2})
    }
}
planeMesh9.on('click', function() {
    plane9Click();
})

function plane8Click() {
    if (clickPossible && (planeAxe.position.y <= -11 && planeAxe.position.y >= -11.5 || planeAxe.position.y <= -11.5 && planeAxe.position.y >= -11)) {
        idPlane[8] = true
        animationEnterWorkshop();
        gsap.to(materialPlane8.uniforms.alpha, 0.75, { value: 0.0, ease: "power3.inOut" });
        gsap.to(planeMesh8.scale, 0.75, { x: 1.2, y: 1.2, ease: "power3.inOut" });
        gsap.to(contentContainer__8, 1.5, { opacity: 1, ease: "Power3.easeOut", delay: 2})
    }
}
planeMesh8.on('click', function() {
    plane8Click();
})

function plane7Click() {
    if (clickPossible && (planeAxe.position.y <= -10 && planeAxe.position.y >= -10.5 || planeAxe.position.y <= -9.5 && planeAxe.position.y >= -10)) {
        idPlane[7] = true
        animationEnterWorkshop();
        gsap.to(materialPlane7.uniforms.alpha, 0.75, { value: 0.0, ease: "power3.inOut" });
        gsap.to(planeMesh7.scale, 0.75, { x: 1.2, y: 1.2, ease: "power3.inOut" });
        gsap.to(contentContainer__7, 1.5, { opacity: 1, ease: "Power3.easeOut", delay: 2})
    }
}
planeMesh7.on('click', function() {
    plane7Click();
})

function plane6Click() {
    if (clickPossible && (planeAxe.position.y <= -9 && planeAxe.position.y >= -9.5 || planeAxe.position.y <= -8.5 && planeAxe.position.y >= -9)) {
        idPlane[6] = true
        animationEnterWorkshop();
        gsap.to(materialPlane6.uniforms.alpha, 0.75, { value: 0.0, ease: "power3.inOut" });
        gsap.to(planeMesh6.scale, 0.75, { x: 1.2, y: 1.2, ease: "power3.inOut" });
        gsap.to(contentContainer__6, 1.5, { opacity: 1, ease: "Power3.easeOut", delay: 2})
    }
}
planeMesh6.on('click', function() {
    plane6Click();
})

function plane5Click() {
    if (clickPossible && (planeAxe.position.y <= -8 && planeAxe.position.y >= -8.5 || planeAxe.position.y <= -7.5 && planeAxe.position.y >= -8)) {
        idPlane[5] = true
        animationEnterWorkshop();
        gsap.to(materialPlane5.uniforms.alpha, 0.75, { value: 0.0, ease: "power3.inOut" });
        gsap.to(planeMesh5.scale, 0.75, { x: 1.2, y: 1.2, ease: "power3.inOut" });
        gsap.to(contentContainer__5, 1.5, { opacity: 1, ease: "Power3.easeOut", delay: 2})
    }
}
planeMesh5.on('click', function() {
    plane5Click();
})

function plane4Click() {
    if (clickPossible && (planeAxe.position.y <= -7 && planeAxe.position.y >= -7.5 || planeAxe.position.y <= -6.5 && planeAxe.position.y >= -7)) {
        idPlane[4] = true
        animationEnterWorkshop();
        gsap.to(materialPlane4.uniforms.alpha, 0.75, { value: 0.0, ease: "power3.inOut" });
        gsap.to(planeMesh4.scale, 0.75, { x: 1.2, y: 1.2, ease: "power3.inOut" });
        gsap.to(contentContainer__4, 1.5, { opacity: 1, ease: "Power3.easeOut", delay: 2})
    }
}
planeMesh4.on('click', function() {
    plane4Click();
})

function plane3Click() {
    if (clickPossible && (planeAxe.position.y <= -6 && planeAxe.position.y >= -6.5 || planeAxe.position.y <= -5.5 && planeAxe.position.y >= -6)) {
        idPlane[3] = true
        animationEnterWorkshop();
        gsap.to(materialPlane3.uniforms.alpha, 0.75, { value: 0.0, ease: "power3.inOut" });
        gsap.to(planeMesh3.scale, 0.75, { x: 1.2, y: 1.2, ease: "power3.inOut" });
        gsap.to(contentContainer__3, 1.5, { opacity: 1, ease: "Power3.easeOut", delay: 2})
    }
}
planeMesh3.on('click', function() {
    plane3Click();
})

function plane2Click() {
    if (clickPossible && (planeAxe.position.y <= -5 && planeAxe.position.y >= -5.5 || planeAxe.position.y <= -4.5 && planeAxe.position.y >= -5)) {
        idPlane[2] = true
        animationEnterWorkshop();
        gsap.to(materialPlane2.uniforms.alpha, 0.75, { value: 0.0, ease: "power3.inOut" });
        gsap.to(planeMesh2.scale, 0.75, { x: 1.2, y: 1.2, ease: "power3.inOut" });
        gsap.to(contentContainer__2, 1.5, { opacity: 1, ease: "Power3.easeOut", delay: 2})
    }
}
planeMesh2.on('click', function() {
    plane2Click();
})

function plane1Click() {
    if (clickPossible && (planeAxe.position.y <= -4 && planeAxe.position.y >= -4.5 || planeAxe.position.y <= -3.5 && planeAxe.position.y >= -4)) {
        idPlane[1] = true
        animationEnterWorkshop();
        gsap.to(materialPlane1.uniforms.alpha, 0.75, { value: 0.0, ease: "power3.inOut" });
        gsap.to(planeMesh1.scale, 0.75, { x: 1.2, y: 1.2, ease: "power3.inOut" });
        gsap.to(contentContainer__1, 1.5, { opacity: 1, ease: "Power3.easeOut", delay: 2})
    }
}
planeMesh1.on('click', function() {
    plane1Click();
})


/////// BACKHOME BUTTON EVENTS ///////
function functionBtnBackHome() {
    
    workshopActive = false
    homeActive = true;

    // fadeInAudio(bgLoopMusic)

    cursorOnVideo = false
    if (!cursorOnVideo) {
        gsap.to(cursor, 0.50, { opacity: 1, ease: "Power3.easeOut"})
        gsap.to(cursorShapeOut, 0.50, { opacity: 1, ease: "Power3.easeOut"})
    }

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

    TweenMax.to(".spanContainerDiscord span", { duration: 0.75, opacity: .6, stagger: { each: 0.07, from: 'random' }, ease: "power3.inOut", delay: 1.5 })
    TweenMax.to(".spanContainerIut span", { duration: 0.75, opacity: .6, stagger: { each: 0.05, from: 'random' }, ease: "power3.inOut", delay: 1.5 })

    canvas.classList.remove('hologramDefault')
    canvas.classList.add('hologramActive')
    btnBackHome.classList.add('close')
    btnBackHome.disabled = true;
    
    littleTitleSvg.classList.add('close')
    setTimeout(function(){
        discordContainer.classList.add('switchPointer')
        iutContainer.classList.add('switchPointer')
        btnStart.disabled = false;
        btnStart.classList.remove('close')
    }, 2800)

    setTimeout(() => {
        if (materialPlanePanneau.uniforms.dispFactor.value >= .0 && materialPlanePanneau.uniforms.dispFactor.value <= .2) {
            materialPlanePanneau.uniforms.imagergb.value = texturepanneau1
            gsap.to(materialPlanePanneau.uniforms.dispFactor, { value: 1.0 });
        } else {
            materialPlanePanneau.uniforms.imagebw.value = texturepanneau1
            gsap.to(materialPlanePanneau.uniforms.dispFactor, { value: .0 });
        }
    }, 3000)

    cursorHoverOut()
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
    gsap.to(camera.position, 2.95, { z: 10, ease: "power3.inOut" })

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
    mobileIndication.classList.remove('switch')
    

    TweenMax.to(btnStart, 1.5, { opacity: 1, clipPath: "inset(0% 0% 0% 0%)", delay: 1.75, ease: "power3.inOut" })
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
        gsap.to(sign.scale, 1.25, { x: 0.0001, y: 0.0001, z: 0.0001, ease: "power3.inOut" })
        gsap.to(planeMeshPanneau.scale, 1.25, { x: 0.0001, y: 0.0001, z: 0.0001, ease: "power3.inOut" })
        gsap.to(table.scale, 1.25, { x: 0.0001, y: 0.0001, z: 0.0001, ease: "power3.inOut" })
        gsap.to(pylone5.scale, 1.25, { x: 0.0001, y: 0.0001, z: 0.0001, ease: "power3.inOut" })
        gsap.to(pylone4.scale, 1.1, { x: 0.0001, y: 0.0001, z: 0.0001, ease: "power3.inOut", delay: .15 })
        gsap.to(pylone3.scale, .95, { x: 0.0001, y: 0.0001, z: 0.0001, ease: "power3.inOut", delay: .3 })
        gsap.to(pylone2.scale, .8, { x: 0.0001, y: 0.0001, z: 0.0001, ease: "power3.inOut", delay: .45 })
        gsap.to(pylone.scale, .65, { x: 0.0001, y: 0.0001, z: 0.0001, ease: "power3.inOut", delay: .6 })
        gsap.to(grid.scale, 1.25, { x: 0.0001, y: 0.0001, z: 0.0001, ease: "power3.inOut" })
        gsap.to(grid2.scale, 1.1, { x: 0.0001, y: 0.0001, z: 0.0001, ease: "power3.inOut", delay: .15 })
        gsap.to(grid3.scale, .95, { x: 0.0001, y: 0.0001, z: 0.0001, ease: "power3.inOut", delay: .3 })
        gsap.to(grid4.scale, .8, { x: 0.0001, y: 0.0001, z: 0.0001, ease: "power3.inOut", delay: .45 })
        gsap.to(grid5.scale, .65, { x: 0.0001, y: 0.0001, z: 0.0001, ease: "power3.inOut", delay: .6 })
        gsap.to(poutre.scale, 1.25, { x: 0.0001, y: 0.0001, z: 0.0001, ease: "power3.inOut" })
        gsap.to(street.scale, 0, { x: 0.0001, y: 0.0001, z: 0.0001})
        gsap.to(leftDoor2.scale, 0, { x: 0.0001, y: 0.0001, z: 0.0001})
        gsap.to(rightDoor2.scale, 0, { x: 0.0001, y: 0.0001, z: 0.0001})
        gsap.to(planeMeshPanneauRue1.scale, 0, { x: 0.0001, y: 0.0001, z: 0.0001})
        gsap.to(planeMeshPanneauRue2.scale, 0, { x: 0.0001, y: 0.0001, z: 0.0001})
        gsap.to(planeMeshPanneauRue3.scale, 0, { x: 0.0001, y: 0.0001, z: 0.0001})
        gsap.to(planeMeshPanneauRue4.scale, 0, { x: 0.0001, y: 0.0001, z: 0.0001})
        gsap.to(planeMeshPanneauRue7.scale, 0, { x: 0.0001, y: 0.0001, z: 0.0001})
        gsap.to(planeMeshPanneauRueRond.scale, 0, { x: 0.0001, y: 0.0001, z: 0.0001})
        gsap.to(cam.scale, .65, { x: 0.0001, y: 0.0001, z: 0.0001, ease: "power3.inOut", delay: .6 })
        gsap.to(vr2.scale, .95, { x: 0.0001, y: 0.0001, z: 0.0001, ease: "power3.inOut", delay: .3 })
        gsap.to(enceinte.scale, 1.25, { x: 0.0001, y: 0.0001, z: 0.0001, ease: "power3.inOut" })
        gsap.to(tv2.scale, .65, { x: 0.0001, y: 0.0001, z: 0.0001, ease: "power3.inOut", delay: .6})
        gsap.to(tabProg.scale, .95, { x: 0.0001, y: 0.0001, z: 0.0001, ease: "power3.inOut", delay: .3})
        gsap.to(tv.scale, 1.25, { x: 0.0001, y: 0.0001, z: 0.0001, ease: "power3.inOut"})
    }
        //LIGHTS ANIM
    TweenMax.to(lightCenterSocle.color, .75, { r: cyanColorReset.r, g: cyanColorReset.g, b: cyanColorReset.b, delay: .75 });
    TweenMax.to(lightCenter.color, .75, { r: cyanColorReset.r, g: cyanColorReset.g, b: cyanColorReset.b, delay: .75 });
    //SWITCH ELEMENTS ON CLICK
    canvas.style.zIndex = -1;
    homeContainer.style.zIndex = 3;
    homeMask.style.zIndex = 2;
}

function revealTimeline(){
    TweenMax.to(workShopButton, 1, {  x: 0, opacity: 1, stagger: { each: 0.03, from: "edges" }, ease: "power3.inOut", delay: 1.5 })
    TweenMax.to(timelineIndication,1, { opacity: 1, ease: "power3.inOut", delay: 2 });
    setTimeout(function(){
        containerTimeline.classList.add('switch');
        hamburgerContainer.classList.add('switchPointer');
    }, 3500)
    gsap.to(hamburgerContainer, 1, {opacity: 1, ease: "Power3.easeOut", delay: 3})

}

function hideTimeline(){
    TweenMax.to(workShopButton, 1, {  x: '25%', opacity: 0,  stagger: { each: 0.03, from: "center" }, ease: "power3.inOut" })
    TweenMax.to(timelineIndication,1, { opacity: 0, ease: "power3.inOut" });
    setTimeout(function(){
        containerTimeline.classList.remove('switch');
        hamburgerContainer.classList.remove('switchPointer')
    }, 1000)
    gsap.to(hamburgerContainer, 1, {opacity: 0, ease: "Power3.easeOut"})

}


function fadeOutAudio(elementMusic) {
        var sound = elementMusic
        var fadeAudio = setInterval(function () {
            if (sound.volume < .005) {
                clearInterval(fadeAudio);
                sound.pause();
            } else if (sound.volume >= .002) {
                sound.volume -= .002;
            }
        }, 100);
}

function fadeInAudio(elementMusic) {
        var sound = elementMusic
        sound.play();
        var fadeAudio = setInterval(function () {
            if (sound.volume >= volumeBg) {
                clearInterval(fadeAudio);
            } else if (sound.volume < volumeBg) {
                sound.volume += 0.01;
            }
        }, 500);
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
    backPossible = false

    setTimeout(function(){
        btnBackHome.disabled = false;
        btnBackHome.classList.remove('close')
        littleTitleSvg.classList.remove('close')
        setTimeout(function() {
            backPossible = true
        }, 500)
    }, 4000)

    if (switchBtn && fisrtStart) {
        var fadeAudio = setInterval(function () {
            if (bgMusic.volume < 0.1) {
                clearInterval(fadeAudio);
                bgMusic.pause();
            } else if (bgMusic.volume >= .1) {
                bgMusic.volume -= .1;
            }
        }, 300);
    }
    fisrtStart = false

    if (switchBtn) {
        bgLoopMusic.play();
    }

    // fadeInAudio(bgLoopMusic)


    TweenMax.to(btnStart, 1.7, { opacity: 0, clipPath: "inset(0% 0% 0% 100%)", ease: "power3.inOut" })
    TweenMax.to(homeMask, 3, { opacity: 0, ease: "power3.inOut" })

    revealTimeline()

    TweenMax.to(".spanContainerDiscord span", { duration: 0.75, opacity: .0, stagger: { each: 0.07, from: 'random' }, ease: "power3.inOut" })
    TweenMax.to(".spanContainerIut span", { duration: 0.75, opacity: .0, stagger: { each: 0.05, from: 'random' }, ease: "power3.inOut" })

    discordContainer.classList.remove('switchPointer')
    iutContainer.classList.remove('switchPointer')

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
            gsap.to(camera.position, 3, { z: 4.3, ease: "power3.inOut" })
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
            gsap.to(planeMeshPanneau.scale, 3,{ x: 1, y: 1, z: 1, ease: "power3.inOut"})
            gsap.to(table.scale, 2, { x: 110, y: 110, z: 110, ease: "power3.inOut", delay: 1 })
            gsap.to(cam.scale, 2, { x: 14, y: 14, z: 14, ease: "power3.inOut", delay: 1})
            gsap.to(vr2.scale, 1.7, { x: 75, y: 75, z: 75, ease: "power3.inOut", delay: 1.3 })
            gsap.to(enceinte.scale, 1.4, { x: 1, y: 1, z: 1, ease: "power3.inOut", delay: 1.6 })
            gsap.to(tv2.scale, 2, { x: 95, y: 95, z: 65, ease: "power3.inOut", delay: 1})
            gsap.to(tabProg.scale, 1.7, { x: 95, y: 95, z: 95, ease: "power3.inOut", delay: 1.3})
            gsap.to(tv.scale, 1.4, { x: 95, y: 95, z: 95, ease: "power3.inOut", delay: 1.6})
            gsap.to(pylone.scale, 2, { x: 110, y: 80, z: 110, ease: "power3.inOut", delay: 1 })
            gsap.to(pylone2.scale, 1.85, { x: 110, y: 80, z: 110, ease: "power3.inOut", delay: 1.15 })
            gsap.to(pylone3.scale, 1.7, { x: 110, y: 80, z: 110, ease: "power3.inOut", delay: 1.3 })
            gsap.to(pylone4.scale, 1.55, { x: 110, y: 80, z: 110, ease: "power3.inOut", delay: 1.45 })
            gsap.to(pylone5.scale, 1.4, { x: 110, y: 80, z: 110, ease: "power3.inOut", delay: 1.6 })
            gsap.to(grid5.scale, 2, { x: 110, y: 80, z: 110, ease: "power3.inOut", delay: 1 })
            gsap.to(grid4.scale, 1.85, { x: 110, y: 80, z: 110, ease: "power3.inOut", delay: 1.15 })
            gsap.to(grid3.scale, 1.7, { x: 110, y: 80, z: 110, ease: "power3.inOut", delay: 1.3 })
            gsap.to(grid2.scale, 1.55, { x: 110, y: 80, z: 110, ease: "power3.inOut", delay: 1.45 })
            gsap.to(grid.scale, 1.4, { x: 110, y: 80, z: 110, ease: "power3.inOut", delay: 1.6 })
            gsap.to(poutre.scale, 2, { x: 90, y: 100, z: 100, ease: "power3.inOut", delay: 1 })
            gsap.to(street.scale, 0, { x: 110, y: 110, z: 110, delay: 3.1 })
            gsap.to(leftDoor2.scale, 0, { x: 110, y: 110, z: 110, delay: 3.1 })
            gsap.to(rightDoor2.scale, 0, { x: 110, y: 110, z: 110, delay: 3.1 })
            gsap.to(planeMeshPanneauRue1.scale, 0, { x: 1, y: 1, z: 1, delay: 3.1 })
            gsap.to(planeMeshPanneauRue2.scale, 0, { x: 1, y: 1, z: 1, delay: 3.1 })
            gsap.to(planeMeshPanneauRue3.scale, 0, { x: 1, y: 1, z: 1, delay: 3.1 })
            gsap.to(planeMeshPanneauRue4.scale, 0, { x: 1, y: 1, z: 1, delay: 3.1 })
            gsap.to(planeMeshPanneauRue7.scale, 0, { x: 1, y: 1, z: 1, delay: 3.1 })
            gsap.to(planeMeshPanneauRueRond.scale, 0, { x: 1, y: 1, z: 1, delay: 3.1 })
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
                mobileIndication.classList.add('switch')
            },1000)
        }, 1500)
    }, 1000)
}

btnStart.addEventListener('click', function() {
    functionBtnStart();
    if (window.matchMedia("(max-width: 1024px)").matches) {
        soundHover.play();
    }
    if (!window.matchMedia("(max-width: 1024px)").matches) {
    TweenMax.to(".spanContainerStartMouseover span", { duration: .5, translateY: 0, stagger: { each: 0.01, from: "center" }, ease: "power3.inOut" });
    TweenMax.to(".spanContainerStartMouseout span", { duration: .5, translateY: 40, stagger: { each: 0.01, from: "center" }, ease: "power3.inOut" });
    TweenMax.to(btnStart, .5, { color: "#4cc9f0", background: "#09021e", ease: "power3.inOut" });
    setTimeout(function() {
        spanContainerStartMouseOut.classList.remove('neonText');
    }, 750)
    handleMouseLeave();
    btnStart.classList.remove('hover')
    cursorShapeIn.classList.remove('mouseover');
    }
})

btnStart.addEventListener('mouseenter', function() {
    if (!window.matchMedia("(max-width: 1024px)").matches) {
    TweenMax.to(".spanContainerStartMouseover span", { duration: .5, translateY: -40, stagger: { each: 0.01, from: "center" }, ease: "power3.inOut" });
    TweenMax.to(".spanContainerStartMouseout span", { duration: .5, translateY: 0, stagger: { each: 0.01, from: "center" }, ease: "power3.inOut" });
    TweenMax.to(btnStart, .5, { color: "#09021e", background: "#4cc9f0", ease: "power3.inOut" });
    btnStart.classList.add('hover')
    spanContainerStartMouseOut.classList.add('neonText');
    cursorShapeIn.classList.add('mouseover');
    soundHover.play();
    }
})

btnStart.addEventListener('mouseleave', function() {
    if (!window.matchMedia("(max-width: 1024px)").matches) {
    TweenMax.to(".spanContainerStartMouseover span", { duration: .5, translateY: 0, stagger: { each: 0.01, from: "center" }, ease: "power3.inOut" });
    TweenMax.to(".spanContainerStartMouseout span", { duration: .5, translateY: 40, stagger: { each: 0.01, from: "center" }, ease: "power3.inOut" });
    TweenMax.to(btnStart, .5, { color: "#4cc9f0", background: "#09021e", ease: "power3.inOut" });
    btnStart.classList.remove('hover')
    spanContainerStartMouseOut.classList.remove('neonText');
    cursorShapeIn.classList.remove('mouseover');
    }
})

btnBackHome.addEventListener('click', function() {
    functionBtnBackHome();
    if (window.matchMedia("(max-width: 1024px)").matches) {
        soundHover.play();
    }
    if (!window.matchMedia("(max-width: 1024px)").matches) {
    TweenMax.to(".spanContainerBackMouseover span", { duration: .5, translateY: 0, stagger: { each: 0.027, from: "center" }, ease: "power3.inOut" });
    TweenMax.to(".spanContainerBackMouseout span", { duration: .5, translateY: 40, stagger: { each: 0.027, from: "center" }, ease: "power3.inOut" });
    TweenMax.to(btnBackHome, .5, { color: "#4cc9f0", background: "#09021e", ease: "power3.inOut" });
    setTimeout(function() {
        spanContainerBackMouseOut.classList.remove('neonText');
    }, 750)
    handleMouseLeave();
    btnBackHome.classList.remove('hover')
    cursorShapeIn.classList.remove('mouseover')
    }
})

btnBackHome.addEventListener('mouseenter', function() {
    if (!window.matchMedia("(max-width: 1024px)").matches) {
    TweenMax.to(".spanContainerBackMouseover span", { duration: .5, translateY: -40, stagger: .027, ease: "power3.inOut" });
    TweenMax.to(".spanContainerBackMouseout span", { duration: .5, translateY: 0, stagger: .027, ease: "power3.inOut" });
    TweenMax.to(btnBackHome, .5, { color: "#09021e", background: "#4cc9f0", ease: "power3.inOut" });
    btnBackHome.classList.add('hover')
    spanContainerBackMouseOut.classList.add('neonText');
    cursorShapeIn.classList.add('mouseover');
    soundHover.play();
    }
})

btnBackHome.addEventListener('mouseleave', function() {
    if (!window.matchMedia("(max-width: 1024px)").matches) {
    TweenMax.to(".spanContainerBackMouseover span", { duration: .5, translateY: 0, stagger: .027, ease: "power3.inOut" });
    TweenMax.to(".spanContainerBackMouseout span", { duration: .5, translateY: 40, stagger: .027, ease: "power3.inOut" });
    TweenMax.to(btnBackHome, .5, { color: "#4cc9f0", background: "#09021e", ease: "power3.inOut" });
    btnBackHome.classList.remove('hover')
    spanContainerBackMouseOut.classList.remove('neonText');
    cursorShapeIn.classList.remove('mouseover');
    }
})

btnBackWorkshop.addEventListener('click', function() {
    if (workshopActive && !creditActive && backPossible && !btnPressed) {
        btnPressed = true
        backToPlane();
    } else if (workshopActive && creditActive && !btnPressed) {
        btnPressed = true
        backToWorkshop();
    }
    if (window.matchMedia("(max-width: 1024px)").matches) {
        soundHover.play();
    }
    if (!window.matchMedia("(max-width: 1024px)").matches) {
        TweenMax.to(btnBackWorkshop, { color: "#4cc9f0", background: "#09021e", ease: "power3.inOut" });
        handleMouseLeave();
        btnBackWorkshop.classList.remove('hover')
        cursorShapeIn.classList.remove('mouseover')
        setTimeout(function() {
            spanContainerBackMouseOut.classList.remove('neonText');
        }, 750)    
    }
    setTimeout(function() {
        btnPressed = false
    }, 3000)
})

btnBackWorkshop.addEventListener('mouseenter', function() {
    if (!window.matchMedia("(max-width: 1024px)").matches) {
    TweenMax.to(".spanContainerBackWorkshopMouseover span", { duration: .5, translateY: -40, stagger: .027, ease: "power3.inOut" });
    TweenMax.to(".spanContainerBackWorkshopMouseout span", { duration: .5, translateY: 0, stagger: .027, ease: "power3.inOut" });
    TweenMax.to(btnBackWorkshop, { color: "#09021e", background: "#4cc9f0", ease: "power3.inOut" });
    btnBackWorkshop.classList.add('hover')
    if (workshopActive) {
        spanContainerBackWorkshopMouseOut.classList.add('neonText');
    } else {
        spanContainerBackMouseOut.classList.add('neonText');
    }
    cursorShapeIn.classList.add('mouseover');
    soundHover.play();
    }
})

btnBackWorkshop.addEventListener('mouseleave', function() {
    if (!window.matchMedia("(max-width: 1024px)").matches) {
    TweenMax.to(".spanContainerBackWorkshopMouseover span", { duration: .5, translateY: 0, stagger: .027, ease: "power3.inOut" });
    TweenMax.to(".spanContainerBackWorkshopMouseout span", { duration: .5, translateY: 40, stagger: .027, ease: "power3.inOut" });
    TweenMax.to(btnBackWorkshop, { color: "#4cc9f0", background: "#09021e", ease: "power3.inOut" });
    btnBackWorkshop.classList.remove('hover')
    spanContainerBackMouseOut.classList.remove('neonText');
    cursorShapeIn.classList.remove('mouseover');
    }
})

function posComparedToElementHeight(el) {
    let taillePopUpSplit = el.scrollHeight / 4

    if (camera.position.z >= -106 && el.scrollTop >= taillePopUpSplit * 2 && el.scrollTop < taillePopUpSplit * 3) {
        varDelay = 1
        gsap.to(el, 3, { opacity: 0, ease: "Power3.easeOut", delay: 0.25})
    } else if (el.scrollTop < taillePopUpSplit * 2 && el.scrollTop >= taillePopUpSplit) {
        varDelay = .50
        gsap.to(el, 3, { opacity: 0, ease: "Power3.easeOut", delay: 0.25})
    } else {
        gsap.to(el, 3, { opacity: 0, ease: "Power3.easeOut", delay: 0.25})
    }

    return varDelay
}

function backToPlane() {
    if (idPlane[14]) {
        if (!window.matchMedia("(max-width: 1024px)").matches) {
            varDelay = posComparedToElementHeight(contentContainer__14)
        }
        setTimeout(function() {
            contentContainer__14.style.display = "none"
            scrollContainer__14.style.display = "none"
        }, 2700)
    } else if (idPlane[13]) {
        if (!window.matchMedia("(max-width: 1024px)").matches) {
            varDelay = posComparedToElementHeight(contentContainer__13)
        }
        setTimeout(function() {
            contentContainer__13.style.display = "none"
            scrollContainer__13.style.display = "none"
        }, 2700)
    } else if (idPlane[12]) {
        if (!window.matchMedia("(max-width: 1024px)").matches) {
            varDelay = posComparedToElementHeight(contentContainer__12)
        }
        setTimeout(function() {
            contentContainer__12.style.display = "none"
            scrollContainer__12.style.display = "none"
        }, 2700)
    } else if (idPlane[11]) {
        if (!window.matchMedia("(max-width: 1024px)").matches) {
            varDelay = posComparedToElementHeight(contentContainer__11)
        }
        setTimeout(function() {
            contentContainer__11.style.display = "none"
            scrollContainer__11.style.display = "none"
        }, 2700)
    } else if (idPlane[10]) {
        if (!window.matchMedia("(max-width: 1024px)").matches) {
            varDelay = posComparedToElementHeight(contentContainer__10)
        }
        setTimeout(function() {
            contentContainer__10.style.display = "none"
            scrollContainer__10.style.display = "none"
        }, 2700)
    } else if (idPlane[9]) {
        if (!window.matchMedia("(max-width: 1024px)").matches) {
            varDelay = posComparedToElementHeight(contentContainer__9)
        }
        setTimeout(function() {
            contentContainer__9.style.display = "none"
            scrollContainer__9.style.display = "none"
        }, 2700)
    } else if (idPlane[8]) {
        if (!window.matchMedia("(max-width: 1024px)").matches) {
            varDelay = posComparedToElementHeight(contentContainer__8)
        }
        setTimeout(function() {
            contentContainer__8.style.display = "none"
            scrollContainer__8.style.display = "none"
        }, 2700)
    } else if (idPlane[7]) {
        if (!window.matchMedia("(max-width: 1024px)").matches) {
            varDelay = posComparedToElementHeight(contentContainer__7)
        }
        setTimeout(function() {
            contentContainer__7.style.display = "none"
            scrollContainer__7.style.display = "none"
        }, 2700)
    } else if (idPlane[6]) {
        if (!window.matchMedia("(max-width: 1024px)").matches) {
            varDelay = posComparedToElementHeight(contentContainer__6)
        }
        setTimeout(function() {
            contentContainer__6.style.display = "none"
            scrollContainer__6.style.display = "none"
        }, 2700)
    } else if (idPlane[5]) {
        if (!window.matchMedia("(max-width: 1024px)").matches) {
            varDelay = posComparedToElementHeight(contentContainer__5)
        }
        setTimeout(function() {
            contentContainer__5.style.display = "none"
            scrollContainer__5.style.display = "none"
        }, 2700)
    } else if (idPlane[4]) {
        if (!window.matchMedia("(max-width: 1024px)").matches) {
            varDelay = posComparedToElementHeight(contentContainer__4)
        }
        setTimeout(function() {
            contentContainer__4.style.display = "none"
            scrollContainer__4.style.display = "none"
        }, 2700)
    } else if (idPlane[3]) {
        if (!window.matchMedia("(max-width: 1024px)").matches) {
            varDelay = posComparedToElementHeight(contentContainer__3)
        }
        setTimeout(function() {
            contentContainer__3.style.display = "none"
            scrollContainer__3.style.display = "none"
        }, 2700)
    } else if (idPlane[2]) {
        if (!window.matchMedia("(max-width: 1024px)").matches) {
            varDelay = posComparedToElementHeight(contentContainer__2)
        }
        setTimeout(function() {
            contentContainer__2.style.display = "none"
            scrollContainer__2.style.display = "none"
        }, 2700)
    } else if (idPlane[1]) {
        if (!window.matchMedia("(max-width: 1024px)").matches) {
            varDelay = posComparedToElementHeight(contentContainer__1)
        }
        setTimeout(function() {
            contentContainer__1.style.display = "none"
            scrollContainer__1.style.display = "none"
        }, 2700)
    }

    if (!window.matchMedia("(max-width: 1024px)").matches) {
        gsap.to(leftDoor.position, 1.5, { x: .3, ease: "power3.inOut", delay: 0.75 + varDelay })
        gsap.to(rightDoor.position, 1.5, { x: .3, ease: "power3.inOut", delay: 0.75 + varDelay })
        gsap.to(camera.position, 3 , { z: 3.7, ease: "power3.inOut" })
        gsap.to(logo.position, 1.5, { x: 0, ease: "power3.inOut", delay: 0.75 + varDelay })
        gsap.to(logo.rotation, 1.5, { z: .25, ease: "power3.inOut", delay: 1.5 + varDelay })
        gsap.to(logo.position, 1.5, { z: 0, y: 0, ease: "power3.inOut", delay: 1.5 + varDelay })
        setTimeout(function() {
            creditContainer.classList.remove('switchStreet')
            scrollPossible = false
        }, 1500)
    } else if (window.matchMedia("(max-width: 600px)").matches){
        gsap.to(camera.position, 3, { z: 4.3, ease: "power3.inOut" })
        gsap.to(logo.rotation, 1.5, { z: .25, y: 0, ease: "power3.inOut", delay: 1.75})
        gsap.to(logo.scale, 1.5, { z:.95, y:.95, x: .95,ease: "power3.inOut", delay: 1.75 })
        gsap.to(logo.position, 1.5, { z: 0, y: 0, ease: "power3.inOut", delay: 1.75 })
    }

    revealTimeline()

    setTimeout(function(){
        cursorIndication.classList.add('switch')
        mobileIndication.classList.add('switch')
    },3250)

    if (window.matchMedia("(max-width: 1024px)").matches && window.matchMedia("(min-width: 601px)").matches) {
        gsap.to(camera.position, 3, { z: 3.7, ease: "power3.inOut" })
        gsap.to(logo.rotation, 1.5, { z: .25, y: 0, ease: "power3.inOut", delay: 1.75})
        gsap.to(logo.scale, 1.5, { z:.95, y:.95, x: .95,ease: "power3.inOut", delay: 1.75 })
        gsap.to(logo.position, 1.5, { z: 0, y: 0, ease: "power3.inOut", delay: 1.75 })
    }
    
    if (materialPlane14.uniforms.alpha.value == 0) {
        gsap.to(materialPlane14.uniforms.dispFactor, .0, { value: 0.0, ease: "Power3.easeOut" , delay: 0 + varDelay });
        gsap.to(materialPlane14.uniforms.alpha, 0.75, { value: 1.0, ease: "power3.inOut", delay: 2.75 + varDelay });
        gsap.to(planeMesh14.scale, 0.75, { x: 1, y: 1, ease: "power3.inOut", delay: 0 + varDelay });
    } 
    else if (materialPlane13.uniforms.alpha.value == 0) {
        gsap.to(materialPlane13.uniforms.dispFactor, .0, { value: 0.0, ease: "Power3.easeOut" , delay: 0 + varDelay });
        gsap.to(materialPlane13.uniforms.alpha, 0.75, { value: 1.0, ease: "power3.inOut", delay: 2.75 + varDelay });
        gsap.to(planeMesh13.scale, 0.75, { x: 1, y: 1, ease: "power3.inOut", delay: 0 + varDelay });
    } 
    else if (materialPlane12.uniforms.alpha.value == 0) {
        gsap.to(materialPlane12.uniforms.dispFactor, .0, { value: 0.0, ease: "Power3.easeOut" , delay: 0 + varDelay });
        gsap.to(materialPlane12.uniforms.alpha, 0.75, { value: 1.0, ease: "power3.inOut", delay: 2.75 + varDelay });
        gsap.to(planeMesh12.scale, 0.75, { x: 1, y: 1, ease: "power3.inOut", delay: 0 + varDelay });
    } 
    else if (materialPlane11.uniforms.alpha.value == 0) {
        gsap.to(materialPlane11.uniforms.dispFactor, .0, { value: 0.0, ease: "Power3.easeOut" , delay: 0 + varDelay });
        gsap.to(materialPlane11.uniforms.alpha, 0.75, { value: 1.0, ease: "power3.inOut", delay: 2.75 + varDelay });
        gsap.to(planeMesh11.scale, 0.75, { x: 1, y: 1, ease: "power3.inOut", delay: 0 + varDelay });
    } 
    else if (materialPlane10.uniforms.alpha.value == 0) {
        gsap.to(materialPlane10.uniforms.dispFactor, .0, { value: 0.0, ease: "Power3.easeOut" , delay: 0 + varDelay });
        gsap.to(materialPlane10.uniforms.alpha, 0.75, { value: 1.0, ease: "power3.inOut", delay: 2.75 + varDelay });
        gsap.to(planeMesh10.scale, 0.75, { x: 1, y: 1, ease: "power3.inOut", delay: 0 + varDelay });
    } 
    else if (materialPlane9.uniforms.alpha.value == 0) {
        gsap.to(materialPlane9.uniforms.dispFactor, .0, { value: 0.0, ease: "Power3.easeOut" , delay: 0 + varDelay });
        gsap.to(materialPlane9.uniforms.alpha, 0.75, { value: 1.0, ease: "power3.inOut", delay: 2.75 + varDelay });
        gsap.to(planeMesh9.scale, 0.75, { x: 1, y: 1, ease: "power3.inOut", delay: 0 + varDelay });
    } 
    else if (materialPlane8.uniforms.alpha.value == 0) {
        gsap.to(materialPlane8.uniforms.dispFactor, .0, { value: 0.0, ease: "Power3.easeOut" , delay: 0 + varDelay });
        gsap.to(materialPlane8.uniforms.alpha, 0.75, { value: 1.0, ease: "power3.inOut", delay: 2.75 + varDelay });
        gsap.to(planeMesh8.scale, 0.75, { x: 1, y: 1, ease: "power3.inOut", delay: 0 + varDelay });
    } 
    else if (materialPlane7.uniforms.alpha.value == 0) {
        gsap.to(materialPlane7.uniforms.dispFactor, .0, { value: 0.0, ease: "Power3.easeOut" , delay: 0 + varDelay });
        gsap.to(materialPlane7.uniforms.alpha, 0.75, { value: 1.0, ease: "power3.inOut", delay: 2.75 + varDelay });
        gsap.to(planeMesh7.scale, 0.75, { x: 1, y: 1, ease: "power3.inOut", delay: 0 + varDelay });
    } 
    else if (materialPlane6.uniforms.alpha.value == 0) {
        gsap.to(materialPlane6.uniforms.dispFactor, .0, { value: 0.0, ease: "Power3.easeOut" , delay: 0 + varDelay });
        gsap.to(materialPlane6.uniforms.alpha, 0.75, { value: 1.0, ease: "power3.inOut", delay: 2.75 + varDelay });
        gsap.to(planeMesh6.scale, 0.75, { x: 1, y: 1, ease: "power3.inOut", delay: 0 + varDelay });
    } 
    else if (materialPlane5.uniforms.alpha.value == 0) {
        gsap.to(materialPlane5.uniforms.dispFactor, .0, { value: 0.0, ease: "Power3.easeOut" , delay: 0 + varDelay });
        gsap.to(materialPlane5.uniforms.alpha, 0.75, { value: 1.0, ease: "power3.inOut", delay: 2.75 + varDelay });
        gsap.to(planeMesh5.scale, 0.75, { x: 1, y: 1, ease: "power3.inOut", delay: 0 + varDelay });
    } 
    else if (materialPlane4.uniforms.alpha.value == 0) {
        gsap.to(materialPlane4.uniforms.dispFactor, .0, { value: 0.0, ease: "Power3.easeOut" , delay: 0 + varDelay });
        gsap.to(materialPlane4.uniforms.alpha, 0.75, { value: 1.0, ease: "power3.inOut", delay: 2.75 + varDelay });
        gsap.to(planeMesh4.scale, 0.75, { x: 1, y: 1, ease: "power3.inOut", delay: 0 + varDelay });
    } 
    else if (materialPlane3.uniforms.alpha.value == 0) {
        gsap.to(materialPlane3.uniforms.dispFactor, .0, { value: 0.0, ease: "Power3.easeOut" , delay: 0 + varDelay });
        gsap.to(materialPlane3.uniforms.alpha, 0.75, { value: 1.0, ease: "power3.inOut", delay: 2.75 + varDelay });
        gsap.to(planeMesh3.scale, 0.75, { x: 1, y: 1, ease: "power3.inOut", delay: 0 + varDelay });
    } 
    else if (materialPlane2.uniforms.alpha.value == 0) {
        gsap.to(materialPlane2.uniforms.dispFactor, .0, { value: 0.0, ease: "Power3.easeOut" , delay: 0 + varDelay });
        gsap.to(materialPlane2.uniforms.alpha, 0.75, { value: 1.0, ease: "power3.inOut", delay: 2.75 + varDelay });
        gsap.to(planeMesh2.scale, 0.75, { x: 1, y: 1, ease: "power3.inOut", delay: 0 + varDelay });
    } 
    else if (materialPlane1.uniforms.alpha.value == 0) {
        gsap.to(materialPlane1.uniforms.dispFactor, .0, { value: 0.0, ease: "Power3.easeOut" , delay: 0 + varDelay });
        gsap.to(materialPlane1.uniforms.alpha, 0.75, { value: 1.0, ease: "power3.inOut", delay: 2.75 + varDelay });
        gsap.to(planeMesh1.scale, 0.75, { x: 1, y: 1, ease: "power3.inOut", delay: 0 + varDelay });
    } 

    TweenMax.to(btnBackHome, 0.75, { opacity: 1, clipPath: "inset(0% 0% 0% 0%)", delay: 2.5, ease: "power3.inOut" })
    TweenMax.to(btnBackWorkshop, 1, { opacity: 0, clipPath: "inset(0% 100% 0% 0%)", ease: "power3.inOut" })
    gsap.to(workShopContainer, 1.5, { opacity: 0, ease: "Power3.easeOut", delay: 0.5 })
    
    clickPossible = false
    
    setTimeout(function() {
        clickPossible = true
    }, 3500)
    
    setTimeout(function() {
        idPlane = [
            false, false, false, false, false, false, false, false, false, false, false, false, false, false
        ]
        btnPressed = false
        planeScrollPossible = true
        contentContainer__14.scrollTop = 0
        contentContainer__13.scrollTop = 0
        contentContainer__12.scrollTop = 0
        contentContainer__11.scrollTop = 0
        contentContainer__10.scrollTop = 0
        contentContainer__9.scrollTop = 0
        contentContainer__8.scrollTop = 0
        contentContainer__7.scrollTop = 0
        contentContainer__6.scrollTop = 0
        contentContainer__5.scrollTop = 0
        contentContainer__4.scrollTop = 0
        contentContainer__3.scrollTop = 0
        contentContainer__2.scrollTop = 0
        contentContainer__1.scrollTop = 0
    }, 2500)

    setTimeout(() => {
        hoverPlane = true
    }, 2100);

    workShopContainer.classList.remove('switchPlane');
    setTimeout(function() {
        workshopActive = false;
        if (idPlane[14]) {
            contentContainer__14.children[2].children[0].children[1].src = ""
        } else if (idPlane[13]) {
            contentContainer__13.children[2].children[0].children[1].src = ""
            contentContainer__13.children[4].children[0].children[1].src = ""
        } else if (idPlane[12]) {
            contentContainer__12.children[2].children[0].children[1].src = ""
            contentContainer__12.children[4].children[0].children[1].src = ""
        } else if (idPlane[11]) {
            contentContainer__11.children[2].children[0].children[1].src = ""
            // contentContainer__11.children[4].children[0].children[1].src = ""
        } else if (idPlane[10]) {
            contentContainer__10.children[2].children[0].children[1].src = ""
            // contentContainer__10.children[4].children[0].children[1].src = ""
        } else if (idPlane[9]) {
            contentContainer__9.children[2].children[0].children[1].src = ""
            contentContainer__9.children[4].children[0].children[1].src = ""
        } else if (idPlane[8]) {
            contentContainer__8.children[2].children[0].children[1].src = ""
            contentContainer__8.children[4].children[0].children[1].src = ""
        } else if (idPlane[7]) {
            contentContainer__7.children[2].children[0].children[1].src = ""
            
        } else if (idPlane[6]) {
            contentContainer__6.children[2].children[0].children[1].src = ""
            
        } else if (idPlane[5]) {
            contentContainer__5.children[2].children[0].children[1].src = ""
            
        } else if (idPlane[4]) {
            contentContainer__4.children[2].children[0].children[1].src = ""
            
        } else if (idPlane[3]) {
            contentContainer__3.children[2].children[0].children[1].src = ""
            
        } else if (idPlane[2]) {
            contentContainer__2.children[2].children[0].children[1].src = ""
            
        } else if (idPlane[1]) {
            contentContainer__1.children[2].children[0].children[1].src = ""
            
        }
    }, 2000)
}

let decalage = 100

function backToWorkshop() {
    if (camera.position.z <= -185) {
        if (idPlane[14]) {
            let lastPosScroll__14 = contentContainer__14.scrollTop
            contentContainer__14.scrollTop = lastPosScroll__14 - decalage
            gsap.to(camera.position, 3, { z: scrollWorkshop(contentContainer__14), ease: "power3.inOut" })
        } else if (idPlane[13]) {
            let lastPosScroll__13 = contentContainer__13.scrollTop
            contentContainer__13.scrollTop = lastPosScroll__13 - decalage
            gsap.to(camera.position, 3, { z: scrollWorkshop(contentContainer__13), ease: "power3.inOut" })
        } else if (idPlane[12]) {
            let lastPosScroll__12 = contentContainer__12.scrollTop
            contentContainer__12.scrollTop = lastPosScroll__12 - decalage
            gsap.to(camera.position, 3, { z: scrollWorkshop(contentContainer__12), ease: "power3.inOut" })
        } else if (idPlane[11]) {
            let lastPosScroll__11 = contentContainer__11.scrollTop
            contentContainer__11.scrollTop = lastPosScroll__11 - decalage
            gsap.to(camera.position, 3, { z: scrollWorkshop(contentContainer__11), ease: "power3.inOut" })
        } else if (idPlane[10]) {
            let lastPosScroll__10 = contentContainer__10.scrollTop
            contentContainer__10.scrollTop = lastPosScroll__10 - decalage
            gsap.to(camera.position, 3, { z: scrollWorkshop(contentContainer__10), ease: "power3.inOut" })
        } else if (idPlane[9]) {
            let lastPosScroll__9 = contentContainer__9.scrollTop
            contentContainer__9.scrollTop = lastPosScroll__9 - decalage
            gsap.to(camera.position, 3, { z: scrollWorkshop(contentContainer__9), ease: "power3.inOut" })
        } else if (idPlane[8]) {
            let lastPosScroll__8 = contentContainer__8.scrollTop
            contentContainer__8.scrollTop = lastPosScroll__8 - decalage
            gsap.to(camera.position, 3, { z: scrollWorkshop(contentContainer__8), ease: "power3.inOut" })
        } else if (idPlane[7]) {
            let lastPosScroll__7 = contentContainer__7.scrollTop
            contentContainer__7.scrollTop = lastPosScroll__7 - decalage
            gsap.to(camera.position, 3, { z: scrollWorkshop(contentContainer__7), ease: "power3.inOut" })
        } else if (idPlane[6]) {
            let lastPosScroll__6 = contentContainer__6.scrollTop
            contentContainer__6.scrollTop = lastPosScroll__6 - decalage
            gsap.to(camera.position, 3, { z: scrollWorkshop(contentContainer__6), ease: "power3.inOut" })
        } else if (idPlane[5]) {
            let lastPosScroll__5 = contentContainer__5.scrollTop
            contentContainer__5.scrollTop = lastPosScroll__5 - decalage
            gsap.to(camera.position, 3, { z: scrollWorkshop(contentContainer__5), ease: "power3.inOut" })
        } else if (idPlane[4]) {
            let lastPosScroll__4 = contentContainer__4.scrollTop
            contentContainer__4.scrollTop = lastPosScroll__4 - decalage
            gsap.to(camera.position, 3, { z: scrollWorkshop(contentContainer__4), ease: "power3.inOut" })
        } else if (idPlane[3]) {
            let lastPosScroll__3 = contentContainer__3.scrollTop
            contentContainer__3.scrollTop = lastPosScroll__3 - decalage
            gsap.to(camera.position, 3, { z: scrollWorkshop(contentContainer__3), ease: "power3.inOut" })
        } else if (idPlane[2]) {
            let lastPosScroll__2 = contentContainer__2.scrollTop
            contentContainer__2.scrollTop = lastPosScroll__2 - decalage
            gsap.to(camera.position, 3, { z: scrollWorkshop(contentContainer__2), ease: "power3.inOut" })
        } else if (idPlane[1]) {
            let lastPosScroll__1 = contentContainer__1.scrollTop
            contentContainer__1.scrollTop = lastPosScroll__1 - decalage
            gsap.to(camera.position, 3, { z: scrollWorkshop(contentContainer__1), ease: "power3.inOut" })
        }

        gsap.to(leftDoor2.position, 1.5, { x: .3, ease: "power3.inOut", delay: .75 })
        gsap.to(rightDoor2.position, 1.5, { x: .3, ease: "power3.inOut", delay: .75 })
        gsap.to(creditContainer, 2, { opacity: 0, ease: "Power3.easeOut" })

        TweenMax.to(btnBackWorkshop, 1, { opacity: 0, clipPath: "inset(0% 100% 0% 0%)", ease: "power3.inOut" })
        TweenMax.to(btnBackWorkshop, .75, { opacity: 1, clipPath: "inset(0% 0% 0% 0%)", delay: 2.5, ease: "power3.inOut" })
        
        gsap.to(workShopContainer, 1.5, { opacity: 1, ease: "Power3.easeOut", delay: 2 })
        
        setTimeout(function() {
            creditActive = false;
        }, 3000)
        setTimeout(function() {
            workShopContainer.classList.add('switchPlane');
            creditContainer.classList.remove('switchStreet')
        }, 3000);
    }

}

///// BUTTON MAIN START REVEAL /////
let btnMainStartText = "Commencer l'immersion"
let charsTextBtnMainStart = btnMainStartText.split('')

charsTextBtnMainStart.forEach(letter => {
    let btnChar = document.createElement('span')
    btnChar.innerHTML = letter
    spanContainerMainStart.append(btnChar)
});

///// REVEAL FIRST SLOGAN /////
let FirstSloganText = "Le département MMI Tarbes présente"
let charsTextFirstSlogan = FirstSloganText.split('')

charsTextFirstSlogan.forEach(letter => {
    let btnChar = document.createElement('span')
    btnChar.innerHTML = letter
    spanContainerFirstSlogan.append(btnChar)
});


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
let btnIutText = "Site MMI Tarbes"
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
        TweenMax.to(timelineIndication, { duration: .25, opacity: 0, ease: "power4.inOut" });
})

containerTimeline.addEventListener('mouseleave', function() {
    TweenMax.to(workShopButton, { duration: .25, clipPath: "inset(0% 0% 0% 99%)", stagger: 0.013, ease: "power3.inOut" });
    TweenMax.to(workShopButtonMask, { duration: .25, width: "100%", stagger: 0.013, ease: "power3.inOut" });
    TweenMax.to(workShopButtonMask, { duration: .25, width: "2px", stagger: 0.013, ease: "power3.inOut", delay: .4 });
    TweenMax.to(containerTimeline, { duration: .25, clipPath: "inset(0% 0% 0% 70%)", ease: "power3.inOut" });
    if(camera.position.z == 3.7){
    TweenMax.to(timelineIndication, { duration: .4, opacity: 1,  ease: "power4.inOut" });
    }
})

/////// SM HOVER ///////
sm1.classList.add('mouseout')
sm2.classList.add('mouseout')
sm3.classList.add('mouseout')

sm1.addEventListener('mouseenter', function() { // POINTER SOCIAL MEDIA 6
    if (!window.matchMedia("(max-width: 1024px)").matches) {
    sm1.classList.add('mouseover')
    sm1.classList.remove('mouseout')
    sm1.classList.add('neonText')
    soundHover.play();
    }
})

sm1.addEventListener('mouseleave', function() {
    if (!window.matchMedia("(max-width: 1024px)").matches) {
    sm1.classList.add('mouseout')
    sm1.classList.remove('mouseover')
    sm1.classList.remove('neonText')
    }
})

sm1.addEventListener('click', function() {
    if (window.matchMedia("(max-width: 1024px)").matches) {
        soundHover.play();
    }
    window.open('https://www.facebook.com/mmi.tarbes.jpo');
})

sm2.addEventListener('mouseenter', function() { // POINTER SOCIAL MEDIA 2
    if (!window.matchMedia("(max-width: 1024px)").matches) {
    sm2.classList.add('mouseover')
    sm2.classList.remove('mouseout')
    sm2.classList.add('neonText')
    soundHover.play();
    }
})

sm2.addEventListener('mouseleave', function() {
    if (!window.matchMedia("(max-width: 1024px)").matches) {
    sm2.classList.add('mouseout')
    sm2.classList.remove('mouseover')
    sm2.classList.remove('neonText')
    }
})

sm2.addEventListener('click', function() {
    if (window.matchMedia("(max-width: 1024px)").matches) {
        soundHover.play();
    }
    window.open('https://www.instagram.com/immersions_digitales_tarbes/');
})

sm3.addEventListener('mouseenter', function() { // POINTER SOCIAL MEDIA 3
    if (!window.matchMedia("(max-width: 1024px)").matches) {
    sm3.classList.add('mouseover')
    sm3.classList.remove('mouseout')
    sm3.classList.add('neonText')
    soundHover.play();
    }
})

sm3.addEventListener('mouseleave', function() {
    if (!window.matchMedia("(max-width: 1024px)").matches) {
    sm3.classList.add('mouseout')
    sm3.classList.remove('mouseover')
    sm3.classList.remove('neonText')
    }
})

sm3.addEventListener('click', function() {
    if (window.matchMedia("(max-width: 1024px)").matches) {
        soundHover.play();
    }
    window.open('https://www.linkedin.com/in/immersions-digitales/');
})

discordContainer.addEventListener('mouseenter', function() { // POINTER DISCORD
    if (!window.matchMedia("(max-width: 1024px)").matches) {
        TweenMax.to(".spanContainerDiscord span", { duration: 0.5, opacity: 1, stagger: { each: 0.05, from: 'end' }, ease: "power3.inOut" })
        TweenMax.to(".containerAlertDiscord", { duration: 0.65, clipPath: 'inset(0% 0% 0% 0%)', ease: "power3.inOut" })
        TweenMax.to(".containerAlertDiscord h3", { duration: 0.65, opacity: 1, ease: "power3.inOut" })
        soundHover.play();
    }
})

discordContainer.addEventListener('mouseleave', function() {
    if (!window.matchMedia("(max-width: 1024px)").matches) {
        TweenMax.to(".spanContainerDiscord span", { duration: 0.5, opacity: .6, stagger: { each: 0.05, from: 'end' }, ease: "power3.inOut" })
        TweenMax.to(".containerAlertDiscord", { duration: 0.65, clipPath: 'inset(0% 100% 0% 0%)', ease: "power3.inOut" })
        TweenMax.to(".containerAlertDiscord h3", { duration: 0.65, opacity: 0, ease: "power3.inOut" })
        TweenMax.to(".containerAlertDiscord", { duration: 0, clipPath: 'inset(0% 0% 0% 100%)', ease: "power3.inOut", delay: 0.65 })
    }
})

discordContainer.addEventListener('click', function() {
    if (window.matchMedia("(max-width: 1024px)").matches) {
        soundHover.play();
    }
    window.open('https://discord.com/invite/QSTbcG7PeJ');
})

iutContainer.addEventListener('mouseenter', function() { // POINTER IUT
    if (!window.matchMedia("(max-width: 1024px)").matches) {
        TweenMax.to(".spanContainerIut span", { duration: 0.5, opacity: 1, stagger: { each: 0.037, from: 'start' }, ease: "power3.inOut" })
        TweenMax.to(".containerAlertIut", { duration: 0.65, clipPath: 'inset(0% 0% 0% 0%)', ease: "power3.inOut" })
        TweenMax.to(".containerAlertIut h3", { duration: 0.65, opacity: 1, ease: "power3.inOut" })
        soundHover.play();
    }
})

iutContainer.addEventListener('mouseleave', function() {
    if (!window.matchMedia("(max-width: 1024px)").matches) {
        TweenMax.to(".spanContainerIut span", { duration: 0.5, opacity: .6, stagger: { each: 0.037, from: 'start' }, ease: "power3.inOut" })
        TweenMax.to(".containerAlertIut", { duration: 0.65, clipPath: 'inset(0% 0% 0% 100%)', ease: "power3.inOut" })
        TweenMax.to(".containerAlertIut h3", { duration: 0.65, opacity: 0, ease: "power3.inOut" })
        TweenMax.to(".containerAlertIut", { duration: 0, clipPath: 'inset(0% 100% 0% 0%)', ease: "power3.inOut", delay: 0.65 })
    }
})

iutContainer.addEventListener('click', function() {
    if (window.matchMedia("(max-width: 1024px)").matches) {
        soundHover.play();
    }
    window.open('https://www.iut-tarbes.fr/');
})

littleTitleSvg.addEventListener('click', function() {
    window.location.replace('https://www.immersions-digitales.fr/');
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

workShopButton.forEach(e=>{
    e.addEventListener('mouseenter', function(){
        soundHover.play();
    })
})

contenu.forEach(e => {
    e.addEventListener("pointerenter", function() {
        indicHover = "content";
        cursorHoverIn();
    });
    e.addEventListener("pointerleave", function() {
        cursorHoverOut();
    });
})

contenu_link.forEach(e => {
    e.addEventListener("pointerenter", function() {
        indicHover = "ID";
        cursorHoverIn();
    });
    e.addEventListener("pointerleave", function() {
        cursorHoverOut();
    });
})

greta.addEventListener('pointerenter', function(){
    indicHover = "ID";
    cursorHoverIn();
})

greta.addEventListener('pointerleave', function(){
    cursorHoverOut();
})

faceImg.forEach(e => {
    e.addEventListener("pointerenter", function() {
        indicHover = "ID";
        cursorHoverIn();
    });
    e.addEventListener("pointerleave", function() {
        cursorHoverOut();
    });
})

littleTitleSvg.addEventListener("pointerenter", function() {
    indicHover = "ID";
    cursorHoverIn();
});
littleTitleSvg.addEventListener("pointerleave", function() {
    cursorHoverOut();
});

iframe.forEach(e => {
    e.addEventListener("pointerenter", function() {
        gsap.to(cursor, 0.50, { opacity: 0, ease: "Power3.easeOut"})
        gsap.to(cursorShapeOut, 0.50, { opacity: 0, ease: "Power3.easeOut"})
        cursorOnVideo = true
    });
    e.addEventListener("pointerleave", function() {
        cursorOnVideo = false
        if (!cursorOnVideo) {
            gsap.to(cursor, 0.50, { opacity: 1, ease: "Power3.easeOut"})
            gsap.to(cursorShapeOut, 0.50, { opacity: 1, ease: "Power3.easeOut"})
        }

    });
});

contenu_vr.forEach(e => {
    e.addEventListener("pointerenter", function() {
        e.children[1].style.opacity = 1
    })
    e.addEventListener("pointerleave", function() {
        e.children[1].style.opacity = 0
    })
});

discordContainer.addEventListener("pointerenter", handleMouseEnter);
discordContainer.addEventListener("pointerleave", handleMouseLeave);

iutContainer.addEventListener("pointerenter", handleMouseEnter);
iutContainer.addEventListener("pointerleave", handleMouseLeave);

musicBtn.addEventListener("pointerenter", handleMouseEnter);
musicBtn.addEventListener("pointerleave", handleMouseLeave);

document.body.addEventListener("pointermove", updateCursorPosition);

function updateCursorPosition(e) {
    mouse.x = e.pageX;
    mouse.y = e.pageY;
}

function updateCursor() {
    let cursorInnerOriginalState = {
        width: cursorSize.getBoundingClientRect().width,
        height: cursorSize.getBoundingClientRect().height,
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
        materialPlanePanneau.uniforms.imagergb.value = texturepanneau14
        gsap.to(materialPlanePanneau.uniforms.dispFactor, 1.5, { value: 1.0, ease: "Power3.easeOut" });
    } else {
        materialPlanePanneau.uniforms.imagebw.value = texturepanneau14
        gsap.to(materialPlanePanneau.uniforms.dispFactor, 1.5, { value: .0, ease: "Power3.easeOut" });
    }
})

workShopButton2.addEventListener('click', function() { // WORKSHOP 2
    scrollPlane2();
    if (materialPlanePanneau.uniforms.dispFactor.value >= .0 && materialPlanePanneau.uniforms.dispFactor.value <= .2) {
        materialPlanePanneau.uniforms.imagergb.value = texturepanneau13
        gsap.to(materialPlanePanneau.uniforms.dispFactor, 1.5, { value: 1.0, ease: "Power3.easeOut" });
    } else {
        materialPlanePanneau.uniforms.imagebw.value = texturepanneau13
        gsap.to(materialPlanePanneau.uniforms.dispFactor, 1.5, { value: .0, ease: "Power3.easeOut" });
    }
})

workShopButton3.addEventListener('click', function() { // WORKSHOP 3
    scrollPlane3();
    if (materialPlanePanneau.uniforms.dispFactor.value >= .0 && materialPlanePanneau.uniforms.dispFactor.value <= .2) {
        materialPlanePanneau.uniforms.imagergb.value = texturepanneau12
        gsap.to(materialPlanePanneau.uniforms.dispFactor, 1.5, { value: 1.0, ease: "Power3.easeOut" });
    } else {
        materialPlanePanneau.uniforms.imagebw.value = texturepanneau12
        gsap.to(materialPlanePanneau.uniforms.dispFactor, 1.5, { value: .0, ease: "Power3.easeOut" });
    }
})

workShopButton4.addEventListener('click', function() { // WORKSHOP 4
    scrollPlane4();
    if (materialPlanePanneau.uniforms.dispFactor.value >= .0 && materialPlanePanneau.uniforms.dispFactor.value <= .2) {
        materialPlanePanneau.uniforms.imagergb.value = texturepanneau11
        gsap.to(materialPlanePanneau.uniforms.dispFactor, 1.5, { value: 1.0, ease: "Power3.easeOut" });
    } else {
        materialPlanePanneau.uniforms.imagebw.value = texturepanneau11
        gsap.to(materialPlanePanneau.uniforms.dispFactor, 1.5, { value: .0, ease: "Power3.easeOut" });
    }
})

workShopButton5.addEventListener('click', function() { // WORKSHOP 5
    scrollPlane5();
    if (materialPlanePanneau.uniforms.dispFactor.value >= .0 && materialPlanePanneau.uniforms.dispFactor.value <= .2) {
        materialPlanePanneau.uniforms.imagergb.value = texturepanneau10
        gsap.to(materialPlanePanneau.uniforms.dispFactor, 1.5, { value: 1.0, ease: "Power3.easeOut" });
    } else {
        materialPlanePanneau.uniforms.imagebw.value = texturepanneau10
        gsap.to(materialPlanePanneau.uniforms.dispFactor, 1.5, { value: .0, ease: "Power3.easeOut" });
    }
})

workShopButton6.addEventListener('click', function() { // WORKSHOP 6
    scrollPlane6();
    if (materialPlanePanneau.uniforms.dispFactor.value >= .0 && materialPlanePanneau.uniforms.dispFactor.value <= .2) {
        materialPlanePanneau.uniforms.imagergb.value = texturepanneau9
        gsap.to(materialPlanePanneau.uniforms.dispFactor, 1.5, { value: 1.0, ease: "Power3.easeOut" });
    } else {
        materialPlanePanneau.uniforms.imagebw.value = texturepanneau9
        gsap.to(materialPlanePanneau.uniforms.dispFactor, 1.5, { value: .0, ease: "Power3.easeOut" });
    }
})

workShopButton7.addEventListener('click', function() { // WORKSHOP 7
    scrollPlane7();
    if (materialPlanePanneau.uniforms.dispFactor.value >= .0 && materialPlanePanneau.uniforms.dispFactor.value <= .2) {
        materialPlanePanneau.uniforms.imagergb.value = texturepanneau8
        gsap.to(materialPlanePanneau.uniforms.dispFactor, 1.5, { value: 1.0, ease: "Power3.easeOut" });
    } else {
        materialPlanePanneau.uniforms.imagebw.value = texturepanneau8
        gsap.to(materialPlanePanneau.uniforms.dispFactor, 1.5, { value: .0, ease: "Power3.easeOut" });
    }
})

workShopButton8.addEventListener('click', function() { // WORKSHOP 8
    scrollPlane8();
    if (materialPlanePanneau.uniforms.dispFactor.value >= .0 && materialPlanePanneau.uniforms.dispFactor.value <= .2) {
        materialPlanePanneau.uniforms.imagergb.value = texturepanneau7
        gsap.to(materialPlanePanneau.uniforms.dispFactor, 1.5, { value: 1.0, ease: "Power3.easeOut" });
    } else {
        materialPlanePanneau.uniforms.imagebw.value = texturepanneau7
        gsap.to(materialPlanePanneau.uniforms.dispFactor, 1.5, { value: .0, ease: "Power3.easeOut" });
    }
})

workShopButton9.addEventListener('click', function() { // WORKSHOP 9
    scrollPlane9();
    if (materialPlanePanneau.uniforms.dispFactor.value >= .0 && materialPlanePanneau.uniforms.dispFactor.value <= .2) {
        materialPlanePanneau.uniforms.imagergb.value = texturepanneau6
        gsap.to(materialPlanePanneau.uniforms.dispFactor, 1.5, { value: 1.0, ease: "Power3.easeOut" });
    } else {
        materialPlanePanneau.uniforms.imagebw.value = texturepanneau6
        gsap.to(materialPlanePanneau.uniforms.dispFactor, 1.5, { value: .0, ease: "Power3.easeOut" });
    }
})

workShopButton10.addEventListener('click', function() { // WORKSHOP 10
    scrollPlane10();
    if (materialPlanePanneau.uniforms.dispFactor.value >= .0 && materialPlanePanneau.uniforms.dispFactor.value <= .2) {
        materialPlanePanneau.uniforms.imagergb.value = texturepanneau5
        gsap.to(materialPlanePanneau.uniforms.dispFactor, 1.5, { value: 1.0, ease: "Power3.easeOut" });
    } else {
        materialPlanePanneau.uniforms.imagebw.value = texturepanneau5
        gsap.to(materialPlanePanneau.uniforms.dispFactor, 1.5, { value: .0, ease: "Power3.easeOut" });
    }
})

workShopButton11.addEventListener('click', function() { // WORKSHOP 11
    scrollPlane11();
    if (materialPlanePanneau.uniforms.dispFactor.value >= .0 && materialPlanePanneau.uniforms.dispFactor.value <= .2) {
        materialPlanePanneau.uniforms.imagergb.value = texturepanneau4
        gsap.to(materialPlanePanneau.uniforms.dispFactor, 1.5, { value: 1.0, ease: "Power3.easeOut" });
    } else {
        materialPlanePanneau.uniforms.imagebw.value = texturepanneau4
        gsap.to(materialPlanePanneau.uniforms.dispFactor, 1.5, { value: .0, ease: "Power3.easeOut" });
    }
})

workShopButton12.addEventListener('click', function() { // WORKSHOP 12
    scrollPlane12();
    if (materialPlanePanneau.uniforms.dispFactor.value >= .0 && materialPlanePanneau.uniforms.dispFactor.value <= .2) {
        materialPlanePanneau.uniforms.imagergb.value = texturepanneau3
        gsap.to(materialPlanePanneau.uniforms.dispFactor, 1.5, { value: 1.0, ease: "Power3.easeOut" });
    } else {
        materialPlanePanneau.uniforms.imagebw.value = texturepanneau3
        gsap.to(materialPlanePanneau.uniforms.dispFactor, 1.5, { value: .0, ease: "Power3.easeOut" });
    }
})

workShopButton13.addEventListener('click', function() { // WORKSHOP 13
    scrollPlane13();
    if (materialPlanePanneau.uniforms.dispFactor.value >= .0 && materialPlanePanneau.uniforms.dispFactor.value <= .2) {
        materialPlanePanneau.uniforms.imagergb.value = texturepanneau2
        gsap.to(materialPlanePanneau.uniforms.dispFactor, 1.5, { value: 1.0, ease: "Power3.easeOut" });
    } else {
        materialPlanePanneau.uniforms.imagebw.value = texturepanneau2
        gsap.to(materialPlanePanneau.uniforms.dispFactor, 1.5, { value: .0, ease: "Power3.easeOut" });
    }
})

workShopButton14.addEventListener('click', function() { // WORKSHOP 14
    scrollPlane14();
    if (materialPlanePanneau.uniforms.dispFactor.value >= .0 && materialPlanePanneau.uniforms.dispFactor.value <= .2) {
        materialPlanePanneau.uniforms.imagergb.value = texturepanneau1
        gsap.to(materialPlanePanneau.uniforms.dispFactor, 1.5, { value: 1.0, ease: "Power3.easeOut" });
    } else {
        materialPlanePanneau.uniforms.imagebw.value = texturepanneau1
        gsap.to(materialPlanePanneau.uniforms.dispFactor, 1.5, { value: .0, ease: "Power3.easeOut" });
    }
})


/////// TIMELINE MOBILE REDIRECTION ///////

mobileWorkShopButton.forEach(btn=>{
    btn.addEventListener('click', function(){
            soundHover.play();
    })
})

mobileWorkShopButton1.addEventListener('click', function() { // WORKSHOP 1
    scrollPlane1();
    setTimeout(function(){
        hamburgerContainerCroix.classList.toggle('switch')
        hamburgerContainerCroix2.classList.toggle('switch')
        switchHamburger = false; 
        },350) 
      
        gsap.to('.mobileWorkShopButton', .5, {  opacity: 0, stagger: { each: .03, from: 'center'}, ease: "power3.easeOut"})
        setTimeout(function(){
        hamburgerContainerLine.classList.toggle('switch')
        hamburgerContainerLine2.classList.toggle('switch')
        },700)  
        setTimeout(function(){
            containerTimelineMobile.classList.toggle('switch');
            containerTimelineMobile.style.zIndex = -1;
            },700)
    if (materialPlanePanneau.uniforms.dispFactor.value >= .0 && materialPlanePanneau.uniforms.dispFactor.value <= .2) {
        materialPlanePanneau.uniforms.imagergb.value = texture14Hover
        gsap.to(materialPlanePanneau.uniforms.dispFactor, 1.5, { value: 1.0, ease: "Power3.easeOut" });
    } else {
        materialPlanePanneau.uniforms.imagebw.value = texture14Hover
        gsap.to(materialPlanePanneau.uniforms.dispFactor, 1.5, { value: .0, ease: "Power3.easeOut" });
    }
})

mobileWorkShopButton2.addEventListener('click', function() { // WORKSHOP 2
    scrollPlane2();
    setTimeout(function(){
        hamburgerContainerCroix.classList.toggle('switch')
        hamburgerContainerCroix2.classList.toggle('switch')
        switchHamburger = false; 
        },350) 
      
        gsap.to('.mobileWorkShopButton', .5, {  opacity: 0, stagger: { each: .03, from: 'center'}, ease: "power3.easeOut"})
        setTimeout(function(){
        hamburgerContainerLine.classList.toggle('switch')
        hamburgerContainerLine2.classList.toggle('switch')
        },700)  
        setTimeout(function(){
            containerTimelineMobile.classList.toggle('switch');
            containerTimelineMobile.style.zIndex = -1;
            },700)
    if (materialPlanePanneau.uniforms.dispFactor.value >= .0 && materialPlanePanneau.uniforms.dispFactor.value <= .2) {
        materialPlanePanneau.uniforms.imagergb.value = texture13Hover
        gsap.to(materialPlanePanneau.uniforms.dispFactor, 1.5, { value: 1.0, ease: "Power3.easeOut" });
    } else {
        materialPlanePanneau.uniforms.imagebw.value = texture13Hover
        gsap.to(materialPlanePanneau.uniforms.dispFactor, 1.5, { value: .0, ease: "Power3.easeOut" });
    }
})

mobileWorkShopButton3.addEventListener('click', function() { // WORKSHOP 3
    scrollPlane3();
    setTimeout(function(){
        hamburgerContainerCroix.classList.toggle('switch')
        hamburgerContainerCroix2.classList.toggle('switch')
        switchHamburger = false; 
        },350) 
      
        gsap.to('.mobileWorkShopButton', .5, {  opacity: 0, stagger: { each: .03, from: 'center'}, ease: "power3.easeOut"})
        setTimeout(function(){
        hamburgerContainerLine.classList.toggle('switch')
        hamburgerContainerLine2.classList.toggle('switch')
        },700)  
        setTimeout(function(){
            containerTimelineMobile.classList.toggle('switch');
            containerTimelineMobile.style.zIndex = -1;
            },700) 
    if (materialPlanePanneau.uniforms.dispFactor.value >= .0 && materialPlanePanneau.uniforms.dispFactor.value <= .2) {
        materialPlanePanneau.uniforms.imagergb.value = texture12Hover
        gsap.to(materialPlanePanneau.uniforms.dispFactor, 1.5, { value: 1.0, ease: "Power3.easeOut" });
    } else {
        materialPlanePanneau.uniforms.imagebw.value = texture12Hover
        gsap.to(materialPlanePanneau.uniforms.dispFactor, 1.5, { value: .0, ease: "Power3.easeOut" });
    }
})

mobileWorkShopButton4.addEventListener('click', function() { // WORKSHOP 4
    scrollPlane4();
    setTimeout(function(){
        hamburgerContainerCroix.classList.toggle('switch')
        hamburgerContainerCroix2.classList.toggle('switch')
        switchHamburger = false; 
        },350) 
      
        gsap.to('.mobileWorkShopButton', .5, {  opacity: 0, stagger: { each: .03, from: 'center'}, ease: "power3.easeOut"})
        setTimeout(function(){
        hamburgerContainerLine.classList.toggle('switch')
        hamburgerContainerLine2.classList.toggle('switch')
        },700)  
        setTimeout(function(){
            containerTimelineMobile.classList.toggle('switch');
            containerTimelineMobile.style.zIndex = -1;
            },700)
    if (materialPlanePanneau.uniforms.dispFactor.value >= .0 && materialPlanePanneau.uniforms.dispFactor.value <= .2) {
        materialPlanePanneau.uniforms.imagergb.value = texture11Hover
        gsap.to(materialPlanePanneau.uniforms.dispFactor, 1.5, { value: 1.0, ease: "Power3.easeOut" });
    } else {
        materialPlanePanneau.uniforms.imagebw.value = texture11Hover
        gsap.to(materialPlanePanneau.uniforms.dispFactor, 1.5, { value: .0, ease: "Power3.easeOut" });
    }
})

mobileWorkShopButton5.addEventListener('click', function() { // WORKSHOP 5
    scrollPlane5();
    setTimeout(function(){
        hamburgerContainerCroix.classList.toggle('switch')
        hamburgerContainerCroix2.classList.toggle('switch')
        switchHamburger = false; 
        },350) 
      
        gsap.to('.mobileWorkShopButton', .5, {  opacity: 0, stagger: { each: .03, from: 'center'}, ease: "power3.easeOut"})
        setTimeout(function(){
        hamburgerContainerLine.classList.toggle('switch')
        hamburgerContainerLine2.classList.toggle('switch')
        },700)  
        setTimeout(function(){
            containerTimelineMobile.classList.toggle('switch');
            containerTimelineMobile.style.zIndex = -1;
            },700)
    if (materialPlanePanneau.uniforms.dispFactor.value >= .0 && materialPlanePanneau.uniforms.dispFactor.value <= .2) {
        materialPlanePanneau.uniforms.imagergb.value = texture10Hover
        gsap.to(materialPlanePanneau.uniforms.dispFactor, 1.5, { value: 1.0, ease: "Power3.easeOut" });
    } else {
        materialPlanePanneau.uniforms.imagebw.value = texture10Hover
        gsap.to(materialPlanePanneau.uniforms.dispFactor, 1.5, { value: .0, ease: "Power3.easeOut" });
    }
})

mobileWorkShopButton6.addEventListener('click', function() { // WORKSHOP 6
    scrollPlane6();
    setTimeout(function(){
        hamburgerContainerCroix.classList.toggle('switch')
        hamburgerContainerCroix2.classList.toggle('switch')
        switchHamburger = false; 
        },350) 
      
        gsap.to('.mobileWorkShopButton', .5, {  opacity: 0, stagger: { each: .03, from: 'center'}, ease: "power3.easeOut"})
        setTimeout(function(){
        hamburgerContainerLine.classList.toggle('switch')
        hamburgerContainerLine2.classList.toggle('switch')
        },700)  
        setTimeout(function(){
            containerTimelineMobile.classList.toggle('switch');
            containerTimelineMobile.style.zIndex = -1;
            },700)
    if (materialPlanePanneau.uniforms.dispFactor.value >= .0 && materialPlanePanneau.uniforms.dispFactor.value <= .2) {
        materialPlanePanneau.uniforms.imagergb.value = texture9Hover
        gsap.to(materialPlanePanneau.uniforms.dispFactor, 1.5, { value: 1.0, ease: "Power3.easeOut" });
    } else {
        materialPlanePanneau.uniforms.imagebw.value = texture9Hover
        gsap.to(materialPlanePanneau.uniforms.dispFactor, 1.5, { value: .0, ease: "Power3.easeOut" });
    }
})

mobileWorkShopButton7.addEventListener('click', function() { // WORKSHOP 7
    scrollPlane7();
    setTimeout(function(){
        hamburgerContainerCroix.classList.toggle('switch')
        hamburgerContainerCroix2.classList.toggle('switch')
        switchHamburger = false; 
        },350) 
      
        gsap.to('.mobileWorkShopButton', .5, {  opacity: 0, stagger: { each: .03, from: 'center'}, ease: "power3.easeOut"})
        setTimeout(function(){
        hamburgerContainerLine.classList.toggle('switch')
        hamburgerContainerLine2.classList.toggle('switch')
        },700)  
        setTimeout(function(){
            containerTimelineMobile.classList.toggle('switch');
            containerTimelineMobile.style.zIndex = -1;
            },700)
    if (materialPlanePanneau.uniforms.dispFactor.value >= .0 && materialPlanePanneau.uniforms.dispFactor.value <= .2) {
        materialPlanePanneau.uniforms.imagergb.value = texture8Hover
        gsap.to(materialPlanePanneau.uniforms.dispFactor, 1.5, { value: 1.0, ease: "Power3.easeOut" });
    } else {
        materialPlanePanneau.uniforms.imagebw.value = texture8Hover
        gsap.to(materialPlanePanneau.uniforms.dispFactor, 1.5, { value: .0, ease: "Power3.easeOut" });
    }
})

mobileWorkShopButton8.addEventListener('click', function() { // WORKSHOP 8
    scrollPlane8();
    setTimeout(function(){
        hamburgerContainerCroix.classList.toggle('switch')
        hamburgerContainerCroix2.classList.toggle('switch')
        switchHamburger = false; 
        },350) 
      
        gsap.to('.mobileWorkShopButton', .5, {  opacity: 0, stagger: { each: .03, from: 'center'}, ease: "power3.easeOut"})
        setTimeout(function(){
        hamburgerContainerLine.classList.toggle('switch')
        hamburgerContainerLine2.classList.toggle('switch')
        },700)  
        setTimeout(function(){
            containerTimelineMobile.classList.toggle('switch');
            containerTimelineMobile.style.zIndex = -1;
            },700) 
    if (materialPlanePanneau.uniforms.dispFactor.value >= .0 && materialPlanePanneau.uniforms.dispFactor.value <= .2) {
        materialPlanePanneau.uniforms.imagergb.value = texture7Hover
        gsap.to(materialPlanePanneau.uniforms.dispFactor, 1.5, { value: 1.0, ease: "Power3.easeOut" });
    } else {
        materialPlanePanneau.uniforms.imagebw.value = texture7Hover
        gsap.to(materialPlanePanneau.uniforms.dispFactor, 1.5, { value: .0, ease: "Power3.easeOut" });
    }
})

mobileWorkShopButton9.addEventListener('click', function() { // WORKSHOP 9
    scrollPlane9();
    setTimeout(function(){
        hamburgerContainerCroix.classList.toggle('switch')
        hamburgerContainerCroix2.classList.toggle('switch')
        switchHamburger = false; 
        },350) 
      
        gsap.to('.mobileWorkShopButton', .5, {  opacity: 0, stagger: { each: .03, from: 'center'}, ease: "power3.easeOut"})
        setTimeout(function(){
        hamburgerContainerLine.classList.toggle('switch')
        hamburgerContainerLine2.classList.toggle('switch')
        },700)  
        setTimeout(function(){
            containerTimelineMobile.classList.toggle('switch');
            containerTimelineMobile.style.zIndex = -1;
            },700)
    if (materialPlanePanneau.uniforms.dispFactor.value >= .0 && materialPlanePanneau.uniforms.dispFactor.value <= .2) {
        materialPlanePanneau.uniforms.imagergb.value = texture6Hover
        gsap.to(materialPlanePanneau.uniforms.dispFactor, 1.5, { value: 1.0, ease: "Power3.easeOut" });
    } else {
        materialPlanePanneau.uniforms.imagebw.value = texture6Hover
        gsap.to(materialPlanePanneau.uniforms.dispFactor, 1.5, { value: .0, ease: "Power3.easeOut" });
    }
})

mobileWorkShopButton10.addEventListener('click', function() { // WORKSHOP 10
    scrollPlane10();
    setTimeout(function(){
        hamburgerContainerCroix.classList.toggle('switch')
        hamburgerContainerCroix2.classList.toggle('switch')
        switchHamburger = false; 
        },350) 
      
        gsap.to('.mobileWorkShopButton', .5, {  opacity: 0, stagger: { each: .03, from: 'center'}, ease: "power3.easeOut"})
        setTimeout(function(){
        hamburgerContainerLine.classList.toggle('switch')
        hamburgerContainerLine2.classList.toggle('switch')
        },700)  
        setTimeout(function(){
            containerTimelineMobile.classList.toggle('switch');
            containerTimelineMobile.style.zIndex = -1;
            },700)
    if (materialPlanePanneau.uniforms.dispFactor.value >= .0 && materialPlanePanneau.uniforms.dispFactor.value <= .2) {
        materialPlanePanneau.uniforms.imagergb.value = texture5Hover
        gsap.to(materialPlanePanneau.uniforms.dispFactor, 1.5, { value: 1.0, ease: "Power3.easeOut" });
    } else {
        materialPlanePanneau.uniforms.imagebw.value = texture5Hover
        gsap.to(materialPlanePanneau.uniforms.dispFactor, 1.5, { value: .0, ease: "Power3.easeOut" });
    }
})

mobileWorkShopButton11.addEventListener('click', function() { // WORKSHOP 11
    scrollPlane11();
    setTimeout(function(){
        hamburgerContainerCroix.classList.toggle('switch')
        hamburgerContainerCroix2.classList.toggle('switch')
        switchHamburger = false; 
        },350) 
      
        gsap.to('.mobileWorkShopButton', .5, {  opacity: 0, stagger: { each: .03, from: 'center'}, ease: "power3.easeOut"})
        setTimeout(function(){
        hamburgerContainerLine.classList.toggle('switch')
        hamburgerContainerLine2.classList.toggle('switch')
        },700)  
        setTimeout(function(){
            containerTimelineMobile.classList.toggle('switch');
            containerTimelineMobile.style.zIndex = -1;
            },700)
    if (materialPlanePanneau.uniforms.dispFactor.value >= .0 && materialPlanePanneau.uniforms.dispFactor.value <= .2) {
        materialPlanePanneau.uniforms.imagergb.value = texture4Hover
        gsap.to(materialPlanePanneau.uniforms.dispFactor, 1.5, { value: 1.0, ease: "Power3.easeOut" });
    } else {
        materialPlanePanneau.uniforms.imagebw.value = texture4Hover
        gsap.to(materialPlanePanneau.uniforms.dispFactor, 1.5, { value: .0, ease: "Power3.easeOut" });
    }
})

mobileWorkShopButton12.addEventListener('click', function() { // WORKSHOP 12
    scrollPlane12();
    setTimeout(function(){
        hamburgerContainerCroix.classList.toggle('switch')
        hamburgerContainerCroix2.classList.toggle('switch')
        switchHamburger = false; 
        },350) 
      
        gsap.to('.mobileWorkShopButton', .5, {  opacity: 0, stagger: { each: .03, from: 'center'}, ease: "power3.easeOut"})
        setTimeout(function(){
        hamburgerContainerLine.classList.toggle('switch')
        hamburgerContainerLine2.classList.toggle('switch')
        },700)  
        setTimeout(function(){
            containerTimelineMobile.classList.toggle('switch');
            containerTimelineMobile.style.zIndex = -1;
            },700)
    if (materialPlanePanneau.uniforms.dispFactor.value >= .0 && materialPlanePanneau.uniforms.dispFactor.value <= .2) {
        materialPlanePanneau.uniforms.imagergb.value = texture3Hover
        gsap.to(materialPlanePanneau.uniforms.dispFactor, 1.5, { value: 1.0, ease: "Power3.easeOut" });
    } else {
        materialPlanePanneau.uniforms.imagebw.value = texture3Hover
        gsap.to(materialPlanePanneau.uniforms.dispFactor, 1.5, { value: .0, ease: "Power3.easeOut" });
    }
})

mobileWorkShopButton13.addEventListener('click', function() { // WORKSHOP 13
    scrollPlane13();
    setTimeout(function(){
        hamburgerContainerCroix.classList.toggle('switch')
        hamburgerContainerCroix2.classList.toggle('switch')
        switchHamburger = false; 
        },350) 
      
        gsap.to('.mobileWorkShopButton', .5, {  opacity: 0, stagger: { each: .03, from: 'center'}, ease: "power3.easeOut"})
        setTimeout(function(){
        hamburgerContainerLine.classList.toggle('switch')
        hamburgerContainerLine2.classList.toggle('switch')
        },700)  
        setTimeout(function(){
            containerTimelineMobile.classList.toggle('switch');
            containerTimelineMobile.style.zIndex = -1;
            },700)
    if (materialPlanePanneau.uniforms.dispFactor.value >= .0 && materialPlanePanneau.uniforms.dispFactor.value <= .2) {
        materialPlanePanneau.uniforms.imagergb.value = texture2Hover
        gsap.to(materialPlanePanneau.uniforms.dispFactor, 1.5, { value: 1.0, ease: "Power3.easeOut" });
    } else {
        materialPlanePanneau.uniforms.imagebw.value = texture2Hover
        gsap.to(materialPlanePanneau.uniforms.dispFactor, 1.5, { value: .0, ease: "Power3.easeOut" });
    }
})

mobileWorkShopButton14.addEventListener('click', function() { // WORKSHOP 14
    scrollPlane14();
    setTimeout(function(){
    hamburgerContainerCroix.classList.toggle('switch')
    hamburgerContainerCroix2.classList.toggle('switch')
    switchHamburger = false; 
    },350) 
  
    gsap.to('.mobileWorkShopButton', .5, {  opacity: 0, stagger: { each: .03, from: 'center'}, ease: "power3.easeOut"})
    setTimeout(function(){
    hamburgerContainerLine.classList.toggle('switch')
    hamburgerContainerLine2.classList.toggle('switch')
    },700)  
    setTimeout(function(){
        containerTimelineMobile.classList.toggle('switch');
        containerTimelineMobile.style.zIndex = -1;
        },700) 
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
    materialPlaneRue3.map=texturebaniere1;
    materialPlaneRond.map=texturechiffre1;
    materialPlaneRue2.map=texturepanneaurue1;
    materialPlaneRue4.map=texturepanneau2rue1;
}

function scrollPlane13() {
    // if (planeAxe.position.y <= -16.01 && planeAxe.position.y >= -17) {
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
        // }
    materialPlaneRue3.map=texturebaniere2;
    materialPlaneRond.map=texturechiffre2;
    materialPlaneRue2.map=texturepanneaurue2;
    materialPlaneRue4.map=texturepanneau2rue2;
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
    materialPlaneRue3.map=texturebaniere3;
    materialPlaneRond.map=texturechiffre3;
    materialPlaneRue2.map=texturepanneaurue3;
    materialPlaneRue4.map=texturepanneau2rue3;
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
    materialPlaneRue3.map=texturebaniere4;
    materialPlaneRond.map=texturechiffre4;
    materialPlaneRue2.map=texturepanneaurue4;
    materialPlaneRue4.map=texturepanneau2rue4;
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
    materialPlaneRue3.map=texturebaniere5;
    materialPlaneRond.map=texturechiffre5;
    materialPlaneRue2.map=texturepanneaurue5;
    materialPlaneRue4.map=texturepanneau2rue5;
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
    materialPlaneRue3.map=texturebaniere6;
    materialPlaneRond.map=texturechiffre6;
    materialPlaneRue2.map=texturepanneaurue6;
    materialPlaneRue4.map=texturepanneau2rue6;
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
    materialPlaneRue3.map=texturebaniere7;
    materialPlaneRond.map=texturechiffre7;
    materialPlaneRue2.map=texturepanneaurue7;
    materialPlaneRue4.map=texturepanneau2rue7;
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
    materialPlaneRue3.map=texturebaniere8;
    materialPlaneRond.map=texturechiffre8;
    materialPlaneRue2.map=texturepanneaurue8;
    materialPlaneRue4.map=texturepanneau2rue8;
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
    materialPlaneRue3.map=texturebaniere9;
    materialPlaneRond.map=texturechiffre9;
    materialPlaneRue2.map=texturepanneaurue9;
    materialPlaneRue4.map=texturepanneau2rue9;
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
    materialPlaneRue3.map=texturebaniere10;
    materialPlaneRond.map=texturechiffre10;
    materialPlaneRue2.map=texturepanneaurue10;
    materialPlaneRue4.map=texturepanneau2rue10;
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
    materialPlaneRue3.map=texturebaniere11;
    materialPlaneRond.map=texturechiffre11;
    materialPlaneRue2.map=texturepanneaurue11;
    materialPlaneRue4.map=texturepanneau2rue11;
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
    materialPlaneRue3.map=texturebaniere12;
    materialPlaneRond.map=texturechiffre12;
    materialPlaneRue2.map=texturepanneaurue12;
    materialPlaneRue4.map=texturepanneau2rue12;
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
    materialPlaneRue3.map=texturebaniere13;
    materialPlaneRond.map=texturechiffre13;
    materialPlaneRue2.map=texturepanneaurue13;
    materialPlaneRue4.map=texturepanneau2rue13;
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
    materialPlaneRue3.map=texturebaniere14;
    materialPlaneRond.map=texturechiffre14;
    materialPlaneRue2.map=texturepanneaurue14;
    materialPlaneRue4.map=texturepanneau2rue14;
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
            gsap.to(camera.position, 2.95, { z: 10, ease: "power3.inOut" })
        //HTML ELEMENTS ANIM
        cursorIndication.classList.remove('switch')
        mobileIndication.classList.add('switch')
        canvas.classList.remove('hologramDefault')
        canvas.classList.add('hologramActive')
        btnBackHome.disabled = true;
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

        TweenMax.to(btnStart, 1.5, { opacity: 1, clipPath: "inset(0% 0% 0% 0%)", delay: 1.75, ease: "power3.inOut" })
        TweenMax.to(homeMask, 2.95, { opacity: 1, ease: "power3.inOut" })
        TweenMax.to(btnBackHome, 1, { opacity: 0, clipPath: "inset(0% 100% 0% 0%)", ease: "power3.inOut" })

        TweenMax.to(".spanContainerDiscord span", { duration: 0.75, opacity: .6, stagger: { each: 0.07, from: 'random' }, ease: "power3.inOut", delay: 1.25 })
        TweenMax.to(".spanContainerIut span", { duration: 0.75, opacity: .6, stagger: { each: 0.05, from: 'random' }, ease: "power3.inOut", delay: 1.25 })

        setTimeout(function(){
            discordContainer.classList.remove('close')
            iutContainer.classList.remove('close')
            btnStart.disabled = false;
            btnStart.classList.remove('close')
            littleTitleSvg.classList.add('close')
        }, 2800)

        setTimeout(() => {
            if (materialPlanePanneau.uniforms.dispFactor.value >= .0 && materialPlanePanneau.uniforms.dispFactor.value <= .2) {
                materialPlanePanneau.uniforms.imagergb.value = texturepanneau1
                gsap.to(materialPlanePanneau.uniforms.dispFactor, { value: 1.0 });
            } else {
                materialPlanePanneau.uniforms.imagebw.value = texturepanneau1
                gsap.to(materialPlanePanneau.uniforms.dispFactor, { value: .0 });
            }
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
            gsap.to(sign.scale, 1.25, { x: 0.0001, y: 0.0001, z: 0.0001, ease: "power3.inOut" })
            gsap.to(planeMeshPanneau.scale, 1.25, { x: 0.0001, y: 0.0001, z: 0.0001, ease: "power3.inOut" })
            gsap.to(table.scale, 1.25, { x: 0.0001, y: 0.0001, z: 0.0001, ease: "power3.inOut" })
            gsap.to(pylone5.scale, 1.25, { x: 0.0001, y: 0.0001, z: 0.0001, ease: "power3.inOut" })
            gsap.to(pylone4.scale, 1.1, { x: 0.0001, y: 0.0001, z: 0.0001, ease: "power3.inOut", delay: .15 })
            gsap.to(pylone3.scale, .95, { x: 0.0001, y: 0.0001, z: 0.0001, ease: "power3.inOut", delay: .3 })
            gsap.to(pylone2.scale, .8, { x: 0.0001, y: 0.0001, z: 0.0001, ease: "power3.inOut", delay: .45 })
            gsap.to(pylone.scale, .65, { x: 0.0001, y: 0.0001, z: 0.0001, ease: "power3.inOut", delay: .6 })
            gsap.to(grid.scale, 1.25, { x: 0.0001, y: 0.0001, z: 0.0001, ease: "power3.inOut" })
            gsap.to(grid2.scale, 1.1, { x: 0.0001, y: 0.0001, z: 0.0001, ease: "power3.inOut", delay: .15 })
            gsap.to(grid3.scale, .95, { x: 0.0001, y: 0.0001, z: 0.0001, ease: "power3.inOut", delay: .3 })
            gsap.to(grid4.scale, .8, { x: 0.0001, y: 0.0001, z: 0.0001, ease: "power3.inOut", delay: .45 })
            gsap.to(grid5.scale, .65, { x: 0.0001, y: 0.0001, z: 0.0001, ease: "power3.inOut", delay: .6 })
            gsap.to(poutre.scale, 1.25, { x: 0.0001, y: 0.0001, z: 0.0001, ease: "power3.inOut" })
            gsap.to(cam.scale, .65, { x: 0.0001, y: 0.0001, z: 0.0001, ease: "power3.inOut", delay: .6 })
            gsap.to(vr2.scale, .95, { x: 0.0001, y: 0.0001, z: 0.0001, ease: "power3.inOut", delay: .3 })
            gsap.to(enceinte.scale, 1.25, { x: 0.0001, y: 0.0001, z: 0.0001, ease: "power3.inOut" })
            gsap.to(tv2.scale, .65, { x: 0.0001, y: 0.0001, z: 0.0001, ease: "power3.inOut", delay: .6})
            gsap.to(tabProg.scale, .95, { x: 0.0001, y: 0.0001, z: 0.0001, ease: "power3.inOut", delay: .3})
            gsap.to(tv.scale, 1.25, { x: 0.0001, y: 0.0001, z: 0.0001, ease: "power3.inOut"})
            gsap.to(leftDoor2.scale, 0, { x: 0.0001, y: 0.0001, z: 0.0001})
            gsap.to(rightDoor2.scale, 0, { x: 0.0001, y: 0.0001, z: 0.0001})
            gsap.to(street.scale, 0, { x: 0.0001, y: 0.0001, z: 0.0001 })
            gsap.to(planeMeshPanneauRue1.scale, 0, { x: 0.0001, y: 0.0001, z: 0.0001})
            gsap.to(planeMeshPanneauRue2.scale, 0, { x: 0.0001, y: 0.0001, z: 0.0001})
            gsap.to(planeMeshPanneauRue3.scale, 0, { x: 0.0001, y: 0.0001, z: 0.0001})
            gsap.to(planeMeshPanneauRue4.scale, 0, { x: 0.0001, y: 0.0001, z: 0.0001})
            gsap.to(planeMeshPanneauRue7.scale, 0, { x: 0.0001, y: 0.0001, z: 0.0001})
            gsap.to(planeMeshPanneauRueRond.scale, 0, { x: 0.0001, y: 0.0001, z: 0.0001})
        }
            //LIGHTS ANIM
        TweenMax.to(lightCenterSocle.color, .75, { r: cyanColorReset.r, g: cyanColorReset.g, b: cyanColorReset.b, delay: .75 });
        TweenMax.to(lightCenter.color, .75, { r: cyanColorReset.r, g: cyanColorReset.g, b: cyanColorReset.b, delay: .75 });
        //SWITCH ELEMENTS ON CLICK
        canvas.style.zIndex = -1;
        homeContainer.style.zIndex = 3;
        homeMask.style.zIndex = 2;
    } else if (planeAxe.position.y <= -16 && planeAxe.position.y >= -17.1) {
            scrollPlane14();
            if (materialPlanePanneau.uniforms.dispFactor.value >= .0 && materialPlanePanneau.uniforms.dispFactor.value <= .2) {
                materialPlanePanneau.uniforms.imagergb.value = texturepanneau1
                gsap.to(materialPlanePanneau.uniforms.dispFactor, 1.5, { value: 1.0, ease: "Power3.easeOut" });
            } else {
                materialPlanePanneau.uniforms.imagebw.value = texturepanneau1
                gsap.to(materialPlanePanneau.uniforms.dispFactor, 1.5, { value: .0, ease: "Power3.easeOut" });
            }
    } else if (planeAxe.position.y <= -15 && planeAxe.position.y >= -16.1) {
            scrollPlane13();
            if (materialPlanePanneau.uniforms.dispFactor.value >= .0 && materialPlanePanneau.uniforms.dispFactor.value <= .2) {
                materialPlanePanneau.uniforms.imagergb.value = texturepanneau2
                gsap.to(materialPlanePanneau.uniforms.dispFactor, 1.5, { value: 1.0, ease: "Power3.easeOut" });
            } else {
                materialPlanePanneau.uniforms.imagebw.value = texturepanneau2
                gsap.to(materialPlanePanneau.uniforms.dispFactor, 1.5, { value: .0, ease: "Power3.easeOut" });
            }
    } else if (planeAxe.position.y <= -14 && planeAxe.position.y >= -15.1) {
            scrollPlane12();
            if (materialPlanePanneau.uniforms.dispFactor.value >= .0 && materialPlanePanneau.uniforms.dispFactor.value <= .2) {
                materialPlanePanneau.uniforms.imagergb.value = texturepanneau3
                gsap.to(materialPlanePanneau.uniforms.dispFactor, 1.5, { value: 1.0, ease: "Power3.easeOut" });
            } else {
                materialPlanePanneau.uniforms.imagebw.value = texturepanneau3
                gsap.to(materialPlanePanneau.uniforms.dispFactor, 1.5, { value: .0, ease: "Power3.easeOut" });
            }
    } else if (planeAxe.position.y <= -13 && planeAxe.position.y >= -14.1) {
            scrollPlane11();
            if (materialPlanePanneau.uniforms.dispFactor.value >= .0 && materialPlanePanneau.uniforms.dispFactor.value <= .2) {
                materialPlanePanneau.uniforms.imagergb.value = texturepanneau4
                gsap.to(materialPlanePanneau.uniforms.dispFactor, 1.5, { value: 1.0, ease: "Power3.easeOut" });
            } else {
                materialPlanePanneau.uniforms.imagebw.value = texturepanneau4
                gsap.to(materialPlanePanneau.uniforms.dispFactor, 1.5, { value: .0, ease: "Power3.easeOut" });
            }
    } else if (planeAxe.position.y <= -12 && planeAxe.position.y >= -13.1) {
            scrollPlane10();
            if (materialPlanePanneau.uniforms.dispFactor.value >= .0 && materialPlanePanneau.uniforms.dispFactor.value <= .2) {
                materialPlanePanneau.uniforms.imagergb.value = texturepanneau5
                gsap.to(materialPlanePanneau.uniforms.dispFactor, 1.5, { value: 1.0, ease: "Power3.easeOut" });
            } else {
                materialPlanePanneau.uniforms.imagebw.value = texturepanneau5
                gsap.to(materialPlanePanneau.uniforms.dispFactor, 1.5, { value: .0, ease: "Power3.easeOut" });
            }
    } else if (planeAxe.position.y <= -11 && planeAxe.position.y >= -12.1) {
            scrollPlane9();
            if (materialPlanePanneau.uniforms.dispFactor.value >= .0 && materialPlanePanneau.uniforms.dispFactor.value <= .2) {
                materialPlanePanneau.uniforms.imagergb.value = texturepanneau6
                gsap.to(materialPlanePanneau.uniforms.dispFactor, 1.5, { value: 1.0, ease: "Power3.easeOut" });
            } else {
                materialPlanePanneau.uniforms.imagebw.value = texturepanneau6
                gsap.to(materialPlanePanneau.uniforms.dispFactor, 1.5, { value: .0, ease: "Power3.easeOut" });
            }
    } else if (planeAxe.position.y <= -10 && planeAxe.position.y >= -11.1) {
            scrollPlane8();
            if (materialPlanePanneau.uniforms.dispFactor.value >= .0 && materialPlanePanneau.uniforms.dispFactor.value <= .2) {
                materialPlanePanneau.uniforms.imagergb.value = texturepanneau7
                gsap.to(materialPlanePanneau.uniforms.dispFactor, 1.5, { value: 1.0, ease: "Power3.easeOut" });
            } else {
                materialPlanePanneau.uniforms.imagebw.value = texturepanneau7
                gsap.to(materialPlanePanneau.uniforms.dispFactor, 1.5, { value: .0, ease: "Power3.easeOut" });
            }
    } else if (planeAxe.position.y <= -9 && planeAxe.position.y >= -10.1) {
            scrollPlane7();
            if (materialPlanePanneau.uniforms.dispFactor.value >= .0 && materialPlanePanneau.uniforms.dispFactor.value <= .2) {
                materialPlanePanneau.uniforms.imagergb.value = texturepanneau8
                gsap.to(materialPlanePanneau.uniforms.dispFactor, 1.5, { value: 1.0, ease: "Power3.easeOut" });
            } else {
                materialPlanePanneau.uniforms.imagebw.value = texturepanneau8
                gsap.to(materialPlanePanneau.uniforms.dispFactor, 1.5, { value: .0, ease: "Power3.easeOut" });
            }
    } else if (planeAxe.position.y <= -8 && planeAxe.position.y >= -9.1) {
            scrollPlane6();
            if (materialPlanePanneau.uniforms.dispFactor.value >= .0 && materialPlanePanneau.uniforms.dispFactor.value <= .2) {
                materialPlanePanneau.uniforms.imagergb.value = texturepanneau9
                gsap.to(materialPlanePanneau.uniforms.dispFactor, 1.5, { value: 1.0, ease: "Power3.easeOut" });
            } else {
                materialPlanePanneau.uniforms.imagebw.value = texturepanneau9
                gsap.to(materialPlanePanneau.uniforms.dispFactor, 1.5, { value: .0, ease: "Power3.easeOut" });
            }
    } else if (planeAxe.position.y <= -7 && planeAxe.position.y >= -8.1) {
            scrollPlane5();
            if (materialPlanePanneau.uniforms.dispFactor.value >= .0 && materialPlanePanneau.uniforms.dispFactor.value <= .2) {
                materialPlanePanneau.uniforms.imagergb.value = texturepanneau10
                gsap.to(materialPlanePanneau.uniforms.dispFactor, 1.5, { value: 1.0, ease: "Power3.easeOut" });
            } else {
                materialPlanePanneau.uniforms.imagebw.value = texturepanneau10
                gsap.to(materialPlanePanneau.uniforms.dispFactor, 1.5, { value: .0, ease: "Power3.easeOut" });
            }
    } else if (planeAxe.position.y <= -6 && planeAxe.position.y >= -7.1) {
            scrollPlane4();
            if (materialPlanePanneau.uniforms.dispFactor.value >= .0 && materialPlanePanneau.uniforms.dispFactor.value <= .2) {
                materialPlanePanneau.uniforms.imagergb.value = texturepanneau11
                gsap.to(materialPlanePanneau.uniforms.dispFactor, 1.5, { value: 1.0, ease: "Power3.easeOut" });
            } else {
                materialPlanePanneau.uniforms.imagebw.value = texturepanneau11
                gsap.to(materialPlanePanneau.uniforms.dispFactor, 1.5, { value: .0, ease: "Power3.easeOut" });
            }
    } else if (planeAxe.position.y <= -5 && planeAxe.position.y >= -6.1) {
            scrollPlane3();
            if (materialPlanePanneau.uniforms.dispFactor.value >= .0 && materialPlanePanneau.uniforms.dispFactor.value <= .2) {
                materialPlanePanneau.uniforms.imagergb.value = texturepanneau12
                gsap.to(materialPlanePanneau.uniforms.dispFactor, 1.5, { value: 1.0, ease: "Power3.easeOut" });
            } else {
                materialPlanePanneau.uniforms.imagebw.value = texturepanneau12
                gsap.to(materialPlanePanneau.uniforms.dispFactor, 1.5, { value: .0, ease: "Power3.easeOut" });
            }
    } else if (planeAxe.position.y <= -4 && planeAxe.position.y >= -5.1) {
            scrollPlane2();
            if (materialPlanePanneau.uniforms.dispFactor.value >= .0 && materialPlanePanneau.uniforms.dispFactor.value <= .2) {
                materialPlanePanneau.uniforms.imagergb.value = texturepanneau13
                gsap.to(materialPlanePanneau.uniforms.dispFactor, 1.5, { value: 1.0, ease: "Power3.easeOut" });
            } else {
                materialPlanePanneau.uniforms.imagebw.value = texturepanneau13
                gsap.to(materialPlanePanneau.uniforms.dispFactor, 1.5, { value: .0, ease: "Power3.easeOut" });
            }
    }
}

function scrollDown() {
    if (planeAxe.position.y <= -16.01 && planeAxe.position.y >= -17) {
            scrollPlane13();
            if (materialPlanePanneau.uniforms.dispFactor.value >= .0 && materialPlanePanneau.uniforms.dispFactor.value <= .2) {
                materialPlanePanneau.uniforms.imagergb.value = texturepanneau2
                gsap.to(materialPlanePanneau.uniforms.dispFactor, 1.5, { value: 1.0, ease: "Power3.easeOut" });
            } else {
                materialPlanePanneau.uniforms.imagebw.value = texturepanneau2
                gsap.to(materialPlanePanneau.uniforms.dispFactor, 1.5, { value: .0, ease: "Power3.easeOut" });
            }
    } else if (planeAxe.position.y <= -15.01 && planeAxe.position.y >= -16) {
            scrollPlane12();
            if (materialPlanePanneau.uniforms.dispFactor.value >= .0 && materialPlanePanneau.uniforms.dispFactor.value <= .2) {
                materialPlanePanneau.uniforms.imagergb.value = texturepanneau3
                gsap.to(materialPlanePanneau.uniforms.dispFactor, 1.5, { value: 1.0, ease: "Power3.easeOut" });
            } else {
                materialPlanePanneau.uniforms.imagebw.value = texturepanneau3
                gsap.to(materialPlanePanneau.uniforms.dispFactor, 1.5, { value: .0, ease: "Power3.easeOut" });
            }
    } else if (planeAxe.position.y <= -14.01 && planeAxe.position.y >= -15) {
            scrollPlane11();
            if (materialPlanePanneau.uniforms.dispFactor.value >= .0 && materialPlanePanneau.uniforms.dispFactor.value <= .2) {
                materialPlanePanneau.uniforms.imagergb.value = texturepanneau4
                gsap.to(materialPlanePanneau.uniforms.dispFactor, 1.5, { value: 1.0, ease: "Power3.easeOut" });
            } else {
                materialPlanePanneau.uniforms.imagebw.value = texturepanneau4
                gsap.to(materialPlanePanneau.uniforms.dispFactor, 1.5, { value: .0, ease: "Power3.easeOut" });
            }
    } else if (planeAxe.position.y <= -13.01 && planeAxe.position.y >= -14) {
            scrollPlane10();
            if (materialPlanePanneau.uniforms.dispFactor.value >= .0 && materialPlanePanneau.uniforms.dispFactor.value <= .2) {
                materialPlanePanneau.uniforms.imagergb.value = texturepanneau5
                gsap.to(materialPlanePanneau.uniforms.dispFactor, 1.5, { value: 1.0, ease: "Power3.easeOut" });
            } else {
                materialPlanePanneau.uniforms.imagebw.value = texturepanneau5
                gsap.to(materialPlanePanneau.uniforms.dispFactor, 1.5, { value: .0, ease: "Power3.easeOut" });
            }
    } else if (planeAxe.position.y <= -12.01 && planeAxe.position.y >= -13) {
            scrollPlane9();
            if (materialPlanePanneau.uniforms.dispFactor.value >= .0 && materialPlanePanneau.uniforms.dispFactor.value <= .2) {
                materialPlanePanneau.uniforms.imagergb.value = texturepanneau6
                gsap.to(materialPlanePanneau.uniforms.dispFactor, 1.5, { value: 1.0, ease: "Power3.easeOut" });
            } else {
                materialPlanePanneau.uniforms.imagebw.value = texturepanneau6
                gsap.to(materialPlanePanneau.uniforms.dispFactor, 1.5, { value: .0, ease: "Power3.easeOut" });
            }
    } else if (planeAxe.position.y <= -11.01 && planeAxe.position.y >= -12) {
            scrollPlane8();
            if (materialPlanePanneau.uniforms.dispFactor.value >= .0 && materialPlanePanneau.uniforms.dispFactor.value <= .2) {
                materialPlanePanneau.uniforms.imagergb.value = texturepanneau7
                gsap.to(materialPlanePanneau.uniforms.dispFactor, 1.5, { value: 1.0, ease: "Power3.easeOut" });
            } else {
                materialPlanePanneau.uniforms.imagebw.value = texturepanneau7
                gsap.to(materialPlanePanneau.uniforms.dispFactor, 1.5, { value: .0, ease: "Power3.easeOut" });
            }
    } else if (planeAxe.position.y <= -10.01 && planeAxe.position.y >= -11) {
            scrollPlane7();
            if (materialPlanePanneau.uniforms.dispFactor.value >= .0 && materialPlanePanneau.uniforms.dispFactor.value <= .2) {
                materialPlanePanneau.uniforms.imagergb.value = texturepanneau8
                gsap.to(materialPlanePanneau.uniforms.dispFactor, 1.5, { value: 1.0, ease: "Power3.easeOut" });
            } else {
                materialPlanePanneau.uniforms.imagebw.value = texturepanneau8
                gsap.to(materialPlanePanneau.uniforms.dispFactor, 1.5, { value: .0, ease: "Power3.easeOut" });
            }
    } else if (planeAxe.position.y <= -9.01 && planeAxe.position.y >= -10) {
            scrollPlane6();
            if (materialPlanePanneau.uniforms.dispFactor.value >= .0 && materialPlanePanneau.uniforms.dispFactor.value <= .2) {
                materialPlanePanneau.uniforms.imagergb.value = texturepanneau9
                gsap.to(materialPlanePanneau.uniforms.dispFactor, 1.5, { value: 1.0, ease: "Power3.easeOut" });
            } else {
                materialPlanePanneau.uniforms.imagebw.value = texturepanneau9
                gsap.to(materialPlanePanneau.uniforms.dispFactor, 1.5, { value: .0, ease: "Power3.easeOut" });
            }
    } else if (planeAxe.position.y <= -8.01 && planeAxe.position.y >= -9) {
            scrollPlane5();
            if (materialPlanePanneau.uniforms.dispFactor.value >= .0 && materialPlanePanneau.uniforms.dispFactor.value <= .2) {
                materialPlanePanneau.uniforms.imagergb.value = texturepanneau10
                gsap.to(materialPlanePanneau.uniforms.dispFactor, 1.5, { value: 1.0, ease: "Power3.easeOut" });
            } else {
                materialPlanePanneau.uniforms.imagebw.value = texturepanneau10
                gsap.to(materialPlanePanneau.uniforms.dispFactor, 1.5, { value: .0, ease: "Power3.easeOut" });
            }
    } else if (planeAxe.position.y <= -7.01 && planeAxe.position.y >= -8) {
            scrollPlane4();
            if (materialPlanePanneau.uniforms.dispFactor.value >= .0 && materialPlanePanneau.uniforms.dispFactor.value <= .2) {
                materialPlanePanneau.uniforms.imagergb.value = texturepanneau11
                gsap.to(materialPlanePanneau.uniforms.dispFactor, 1.5, { value: 1.0, ease: "Power3.easeOut" });
            } else {
                materialPlanePanneau.uniforms.imagebw.value = texturepanneau11
                gsap.to(materialPlanePanneau.uniforms.dispFactor, 1.5, { value: .0, ease: "Power3.easeOut" });
            }
    } else if (planeAxe.position.y <= -6.01 && planeAxe.position.y >= -7) {
            scrollPlane3();
            if (materialPlanePanneau.uniforms.dispFactor.value >= .0 && materialPlanePanneau.uniforms.dispFactor.value <= .2) {
                materialPlanePanneau.uniforms.imagergb.value = texturepanneau12
                gsap.to(materialPlanePanneau.uniforms.dispFactor, 1.5, { value: 1.0, ease: "Power3.easeOut" });
            } else {
                materialPlanePanneau.uniforms.imagebw.value = texturepanneau12
                gsap.to(materialPlanePanneau.uniforms.dispFactor, 1.5, { value: .0, ease: "Power3.easeOut" });
            }
    } else if (planeAxe.position.y <= -5.01 && planeAxe.position.y >= -6) {
            scrollPlane2();
            if (materialPlanePanneau.uniforms.dispFactor.value >= .0 && materialPlanePanneau.uniforms.dispFactor.value <= .2) {
                materialPlanePanneau.uniforms.imagergb.value = texturepanneau13
                gsap.to(materialPlanePanneau.uniforms.dispFactor, 1.5, { value: 1.0, ease: "Power3.easeOut" });
            } else {
                materialPlanePanneau.uniforms.imagebw.value = texturepanneau13
                gsap.to(materialPlanePanneau.uniforms.dispFactor, 1.5, { value: .0, ease: "Power3.easeOut" });
            }
    } else if (planeAxe.position.y <= -4.01 && planeAxe.position.y >= -5) {
        scrollPlane1();
        if (materialPlanePanneau.uniforms.dispFactor.value >= .0 && materialPlanePanneau.uniforms.dispFactor.value <= .2) {
            materialPlanePanneau.uniforms.imagergb.value = texturepanneau14
            gsap.to(materialPlanePanneau.uniforms.dispFactor, 1.5, { value: 1.0, ease: "Power3.easeOut" });
        } else {
            materialPlanePanneau.uniforms.imagebw.value = texturepanneau14
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
            gsap.to(camera.position, 2.95, { z: 10, ease: "power3.inOut" })
        //HTML ELEMENTS ANIM
        cursorIndication.classList.remove('switch')
        mobileIndication.classList.remove('switch')
        canvas.classList.remove('hologramDefault')
        canvas.classList.add('hologramActive')
        btnBackHome.disabled = true;
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

        TweenMax.to(btnStart, 1.5, { opacity: 1, clipPath: "inset(0% 0% 0% 0%)", delay: 1.75, ease: "power3.inOut" })
        TweenMax.to(homeMask, 2.95, { opacity: 1, ease: "power3.inOut"})
        TweenMax.to(btnBackHome, 1, { opacity: 0, clipPath: "inset(0% 100% 0% 0%)", ease: "power3.inOut" })

        TweenMax.to(".spanContainerDiscord span", { duration: 0.75, opacity: .6, stagger: { each: 0.07, from: 'random' }, ease: "power3.inOut", delay: 1.25 })
        TweenMax.to(".spanContainerIut span", { duration: 0.75, opacity: .6, stagger: { each: 0.05, from: 'random' }, ease: "power3.inOut", delay: 1.25 })

        setTimeout(function(){
            discordContainer.classList.remove('close')
            iutContainer.classList.remove('close')
            btnStart.disabled = false;
            btnStart.classList.remove('close')
            littleTitleSvg.classList.add('close')
        }, 2800)

        setTimeout(() => {
            if (materialPlanePanneau.uniforms.dispFactor.value >= .0 && materialPlanePanneau.uniforms.dispFactor.value <= .2) {
                materialPlanePanneau.uniforms.imagergb.value = texturepanneau1
                gsap.to(materialPlanePanneau.uniforms.dispFactor, { value: 1.0 });
            } else {
                materialPlanePanneau.uniforms.imagebw.value = texturepanneau1
                gsap.to(materialPlanePanneau.uniforms.dispFactor, { value: .0 });
            }
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
            gsap.to(sign.scale, 1.25, { x: 0.0001, y: 0.0001, z: 0.0001, ease: "power3.inOut" })
            gsap.to(planeMeshPanneau.scale, 1.25, { x: 0.0001, y: 0.0001, z: 0.0001, ease: "power3.inOut" })
            gsap.to(table.scale, 1.25, { x: 0.0001, y: 0.0001, z: 0.0001, ease: "power3.inOut" })
            gsap.to(pylone5.scale, 1.25, { x: 0.0001, y: 0.0001, z: 0.0001, ease: "power3.inOut" })
            gsap.to(pylone4.scale, 1.1, { x: 0.0001, y: 0.0001, z: 0.0001, ease: "power3.inOut", delay: .15 })
            gsap.to(pylone3.scale, .95, { x: 0.0001, y: 0.0001, z: 0.0001, ease: "power3.inOut", delay: .3 })
            gsap.to(pylone2.scale, .8, { x: 0.0001, y: 0.0001, z: 0.0001, ease: "power3.inOut", delay: .45 })
            gsap.to(pylone.scale, .65, { x: 0.0001, y: 0.0001, z: 0.0001, ease: "power3.inOut", delay: .6 })
            gsap.to(grid.scale, 1.25, { x: 0.0001, y: 0.0001, z: 0.0001, ease: "power3.inOut" })
            gsap.to(grid2.scale, 1.1, { x: 0.0001, y: 0.0001, z: 0.0001, ease: "power3.inOut", delay: .15 })
            gsap.to(grid3.scale, .95, { x: 0.0001, y: 0.0001, z: 0.0001, ease: "power3.inOut", delay: .3 })
            gsap.to(grid4.scale, .8, { x: 0.0001, y: 0.0001, z: 0.0001, ease: "power3.inOut", delay: .45 })
            gsap.to(grid5.scale, .65, { x: 0.0001, y: 0.0001, z: 0.0001, ease: "power3.inOut", delay: .6 })
            gsap.to(poutre.scale, 1.25, { x: 0.0001, y: 0.0001, z: 0.0001, ease: "power3.inOut" })
            gsap.to(cam.scale, .65, { x: 0.0001, y: 0.0001, z: 0.0001, ease: "power3.inOut", delay: .6 })
            gsap.to(vr2.scale, .95, { x: 0.0001, y: 0.0001, z: 0.0001, ease: "power3.inOut", delay: .3 })
            gsap.to(enceinte.scale, 1.25, { x: 0.0001, y: 0.0001, z: 0.0001, ease: "power3.inOut" })
            gsap.to(tv2.scale, .65, { x: 0.0001, y: 0.0001, z: 0.0001, ease: "power3.inOut", delay: .6})
            gsap.to(tabProg.scale, .95, { x: 0.0001, y: 0.0001, z: 0.0001, ease: "power3.inOut", delay: .3})
            gsap.to(tv.scale, 1.25, { x: 0.0001, y: 0.0001, z: 0.0001, ease: "power3.inOut"})
            gsap.to(leftDoor2.scale, 0, { x: 0.0001, y: 0.0001, z: 0.0001})
            gsap.to(rightDoor2.scale, 0, { x: 0.0001, y: 0.0001, z: 0.0001})
            gsap.to(street.scale, 0, { x: 0.0001, y: 0.0001, z: 0.0001 })
            gsap.to(planeMeshPanneauRue1.scale, 0, { x: 0.0001, y: 0.0001, z: 0.0001})
            gsap.to(planeMeshPanneauRue2.scale, 0, { x: 0.0001, y: 0.0001, z: 0.0001})
            gsap.to(planeMeshPanneauRue3.scale, 0, { x: 0.0001, y: 0.0001, z: 0.0001})
            gsap.to(planeMeshPanneauRue4.scale, 0, { x: 0.0001, y: 0.0001, z: 0.0001})
            gsap.to(planeMeshPanneauRue7.scale, 0, { x: 0.0001, y: 0.0001, z: 0.0001})
            gsap.to(planeMeshPanneauRueRond.scale, 0, { x: 0.0001, y: 0.0001, z: 0.0001})
        }
            //LIGHTS ANIM
        TweenMax.to(lightCenterSocle.color, .75, { r: cyanColorReset.r, g: cyanColorReset.g, b: cyanColorReset.b, delay: .75 });
        TweenMax.to(lightCenter.color, .75, { r: cyanColorReset.r, g: cyanColorReset.g, b: cyanColorReset.b, delay: .75 });
        //SWITCH ELEMENTS ON CLICK
        canvas.style.zIndex = -1;
        homeContainer.style.zIndex = 3;
        homeMask.style.zIndex = 2;
        //RESET AXES POSITION 
        gsap.to(planeAxe.position, 0, { y: -26.5, delay: 3 })
        gsap.to(planeAxe.rotation, 0, { y: 0, delay: 3 })
        gsap.to(planeAxe.scale, 0, { y: 0.0001, x: 0.0001, z: 0.0001, delay: 2 })
        gsap.to(planeAxe.scale, 0, { y: 1, x: 1, z: 1, delay: 3.1 })
    }
}

let tl = gsap.timeline()
///// MOUSE SCROLL /////
document.body.addEventListener('wheel', scrollWheel);

function scrollWheel(event) {
    if (!workshopActive) {
        if (!isScrollUp && planeScrollPossible) {
            if (checkScrollDirectionIsUp(event)) { // SCROLL UP
                if (backPossible) {
                    scrollUp();
                    isScrollUp = true
                    setTimeout(function () {
                        isScrollUp = false
                    }, 750)
                }
            }
        }
        if (!isScrollDown && planeScrollPossible) {
            if (checkScrollDirectionIsUp(event)) { // SCROLL DOWN
            } else {
                scrollDown();
                isScrollDown = true
                setTimeout(function () {
                    isScrollDown = false
                }, 750)
            }
        }
    }
    
    else if (workshopActive) {
        if (checkScrollDirectionIsUp(event) && clickPossible && scrollPossible) { // SCROLL UP
            if (idPlane[14]) {
                if (contentContainer__14.scrollTop == 0) {
                    backToPlane();
                    scrollPossible = false
                }
            } else if (idPlane[13]) {
                if (contentContainer__13.scrollTop == 0) {
                    backToPlane();
                    scrollPossible = false
                }
            } else if (idPlane[12]) {
                if (contentContainer__12.scrollTop == 0) {
                    backToPlane();
                    scrollPossible = false
                }
            } else if (idPlane[11]) {
                if (contentContainer__11.scrollTop == 0) {
                    backToPlane();
                    scrollPossible = false
                }
            } else if (idPlane[10]) {
                if (contentContainer__10.scrollTop == 0) {
                    backToPlane();
                    scrollPossible = false
                }
            } else if (idPlane[9]) {
                if (contentContainer__9.scrollTop == 0) {
                    backToPlane();
                    scrollPossible = false
                }
            } else if (idPlane[8]) {
                if (contentContainer__8.scrollTop == 0) {
                    backToPlane();
                    scrollPossible = false
                }
            } else if (idPlane[7]) {
                if (contentContainer__7.scrollTop == 0) {
                    backToPlane();
                    scrollPossible = false
                }
            } else if (idPlane[6]) {
                if (contentContainer__6.scrollTop == 0) {
                    backToPlane();
                    scrollPossible = false
                }
            } else if (idPlane[5]) {
                if (contentContainer__5.scrollTop == 0) {
                    backToPlane();
                    scrollPossible = false
                }
            } else if (idPlane[4]) {
                if (contentContainer__4.scrollTop == 0) {
                    backToPlane();
                    scrollPossible = false
                }
            } else if (idPlane[3]) {
                if (contentContainer__3.scrollTop == 0) {
                    backToPlane();
                    scrollPossible = false
                }
            } else if (idPlane[2]) {
                if (contentContainer__2.scrollTop == 0) {
                    backToPlane();
                    scrollPossible = false
                }
            } else if (idPlane[1]) {
                if (contentContainer__1.scrollTop == 0) {
                    backToPlane();
                    scrollPossible = false
                }
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

function checkScrollDirection(elContent) {
        if (elContent.scrollTop > scrollPos) {
            direction = "down"
        } else {
            direction = "up"
        }
        scrollPos = elContent.scrollTop;
    // })
    return direction
}

function scrollIntoWorkshop(elContent, elCredit) {
    if (!window.matchMedia("(max-width: 1024px)").matches) {
        camera.position.z = scrollWorkshop(elContent)
        if (window.matchMedia("(max-width: 1440px)").matches) {
            if (checkScrollDirection(elContent) == "down") {
                if (camera.position.z <= -108) {
                    if (idPlane[14]) {
                        contentContainer__14.children[2].children[0].children[1].src = contentContainer__14.children[2].children[0].children[1].src
                            } else if (idPlane[13]) {
                                contentContainer__13.children[2].children[0].children[1].src = contentContainer__13.children[2].children[0].children[1].src
                                contentContainer__13.children[4].children[0].children[1].src = contentContainer__13.children[4].children[0].children[1].src
                            } else if (idPlane[12]) {
                                contentContainer__12.children[2].children[0].children[1].src = contentContainer__12.children[2].children[0].children[1].src
                                contentContainer__12.children[4].children[0].children[1].src = contentContainer__12.children[4].children[0].children[1].src
                            } else if (idPlane[11]) {
                                contentContainer__11.children[2].children[0].children[1].src = contentContainer__11.children[2].children[0].children[1].src
                                // contentContainer__11.children[4].children[0].children[1].src = contentContainer__11.children[4].children[0].children[1].src
                            } else if (idPlane[10]) {
                                contentContainer__10.children[2].children[0].children[1].src = contentContainer__10.children[2].children[0].children[1].src
                                // contentContainer__10.children[4].children[0].children[1].src = contentContainer__10.children[4].children[0].children[1].src
                            } else if (idPlane[9]) {
                                contentContainer__9.children[2].children[0].children[1].src = contentContainer__9.children[2].children[0].children[1].src
                                contentContainer__9.children[4].children[0].children[1].src = contentContainer__9.children[4].children[0].children[1].src
                            } else if (idPlane[8]) {
                                contentContainer__8.children[2].children[0].children[1].src = contentContainer__8.children[2].children[0].children[1].src
                            } else if (idPlane[7]) {
                                contentContainer__7.children[2].children[0].children[1].src = contentContainer__7.children[2].children[0].children[1].src
                                // contentContainer__7.children[4].children[0].children[1].src = contentContainer__7.children[4].children[0].children[1].src
                            } else if (idPlane[6]) {
                                contentContainer__6.children[2].children[0].children[1].src = contentContainer__6.children[2].children[0].children[1].src
                                // contentContainer__6.children[4].children[0].children[1].src = contentContainer__6.children[4].children[0].children[1].src
                            } else if (idPlane[5]) {
                                contentContainer__5.children[2].children[0].children[1].src = contentContainer__5.children[2].children[0].children[1].src
                                // contentContainer__5.children[4].children[0].children[1].src = contentContainer__5.children[4].children[0].children[1].src
                            } else if (idPlane[4]) {
                                contentContainer__4.children[2].children[0].children[1].src = contentContainer__4.children[2].children[0].children[1].src
                                // contentContainer__4.children[4].children[0].children[1].src = contentContainer__4.children[4].children[0].children[1].src
                            } else if (idPlane[3]) {
                                contentContainer__3.children[2].children[0].children[1].src = contentContainer__3.children[2].children[0].children[1].src
                                // contentContainer__3.children[4].children[0].children[1].src = contentContainer__3.children[4].children[0].children[1].src
                            } else if (idPlane[2]) {
                                contentContainer__2.children[2].children[0].children[1].src = contentContainer__2.children[2].children[0].children[1].src
                                // contentContainer__2.children[4].children[0].children[1].src = contentContainer__2.children[4].children[0].children[1].src
                            } else if (idPlane[1]) {
                                contentContainer__1.children[2].children[0].children[1].src = contentContainer__1.children[2].children[0].children[1].src
                                // contentContainer__1.children[4].children[0].children[1].src = contentContainer__1.children[4].children[0].children[1].src
                            }
    
                            cursorOnVideo = false
                            if (!cursorOnVideo) {
                                gsap.to(cursor, 0.50, { opacity: 1, ease: "Power3.easeOut"})
                                gsap.to(cursorShapeOut, 0.50, { opacity: 1, ease: "Power3.easeOut"})
                            }
                            workShopContainer.classList.remove('switchPlane')
                            btnBackWorkshop.classList.add('close')
                            gsap.to(workShopContainer, 1.5, { opacity: 0, ease: "Power3.easeOut" })
                            gsap.to(camera.position, 3, { z: -185, ease: "power3.inOut" })
                            gsap.to(leftDoor2.position, 1.5, { x: -20, ease: "power3.inOut", delay: .75 })
                            gsap.to(rightDoor2.position, 1.5, { x: 20, ease: "power3.inOut", delay: .75 })
                            gsap.to(creditContainer, 2, { opacity: 1, ease: "Power1.easeOut", delay: 2 })
                
                            TweenMax.to(btnBackWorkshop, 1, { opacity: 0, clipPath: "inset(0% 100% 0% 0%)", ease: "power3.inOut" })
                            TweenMax.to(btnBackWorkshop, .75, { opacity: 1, clipPath: "inset(0% 0% 0% 0%)", delay: 2.5, ease: "power3.inOut" })
                
                            backPossible = false;
                            clickPossible = false;
                            setTimeout(function() {
                                creditActive = true
                                creditContainer.classList.add('switchStreet')
                                elCredit.scrollTop = 0
                            }, 1000)
                            setTimeout(function() {
                                backPossible = true
                                clickPossible = true;
                                btnBackWorkshop.classList.remove('close')
                            }, 3000)
                        } 
            } 
        } else {
            if (checkScrollDirection(elContent) == "down") {
                        if (camera.position.z <= -106) {
                            if (idPlane[14]) {
                                contentContainer__14.children[2].children[0].children[1].src = contentContainer__14.children[2].children[0].children[1].src
                            } else if (idPlane[13]) {
                                contentContainer__13.children[2].children[0].children[1].src = contentContainer__13.children[2].children[0].children[1].src
                                contentContainer__13.children[4].children[0].children[1].src = contentContainer__13.children[4].children[0].children[1].src
                            } else if (idPlane[12]) {
                                contentContainer__12.children[2].children[0].children[1].src = contentContainer__12.children[2].children[0].children[1].src
                                contentContainer__12.children[4].children[0].children[1].src = contentContainer__12.children[4].children[0].children[1].src
                            } else if (idPlane[11]) {
                                contentContainer__11.children[2].children[0].children[1].src = contentContainer__11.children[2].children[0].children[1].src
                                // contentContainer__11.children[4].children[0].children[1].src = contentContainer__11.children[4].children[0].children[1].src
                            } else if (idPlane[10]) {
                                contentContainer__10.children[2].children[0].children[1].src = contentContainer__10.children[2].children[0].children[1].src
                                // contentContainer__10.children[4].children[0].children[1].src = contentContainer__10.children[4].children[0].children[1].src
                            } else if (idPlane[9]) {
                                contentContainer__9.children[2].children[0].children[1].src = contentContainer__9.children[2].children[0].children[1].src
                                contentContainer__9.children[4].children[0].children[1].src = contentContainer__9.children[4].children[0].children[1].src
                            } else if (idPlane[8]) {
                                contentContainer__8.children[2].children[0].children[1].src = contentContainer__8.children[2].children[0].children[1].src
                            } else if (idPlane[7]) {
                                contentContainer__7.children[2].children[0].children[1].src = contentContainer__7.children[2].children[0].children[1].src
                                // contentContainer__7.children[4].children[0].children[1].src = contentContainer__7.children[4].children[0].children[1].src
                            } else if (idPlane[6]) {
                                contentContainer__6.children[2].children[0].children[1].src = contentContainer__6.children[2].children[0].children[1].src
                                // contentContainer__6.children[4].children[0].children[1].src = contentContainer__6.children[4].children[0].children[1].src
                            } else if (idPlane[5]) {
                                contentContainer__5.children[2].children[0].children[1].src = contentContainer__5.children[2].children[0].children[1].src
                                // contentContainer__5.children[4].children[0].children[1].src = contentContainer__5.children[4].children[0].children[1].src
                            } else if (idPlane[4]) {
                                contentContainer__4.children[2].children[0].children[1].src = contentContainer__4.children[2].children[0].children[1].src
                                // contentContainer__4.children[4].children[0].children[1].src = contentContainer__4.children[4].children[0].children[1].src
                            } else if (idPlane[3]) {
                                contentContainer__3.children[2].children[0].children[1].src = contentContainer__3.children[2].children[0].children[1].src
                                // contentContainer__3.children[4].children[0].children[1].src = contentContainer__3.children[4].children[0].children[1].src
                            } else if (idPlane[2]) {
                                contentContainer__2.children[2].children[0].children[1].src = contentContainer__2.children[2].children[0].children[1].src
                                // contentContainer__2.children[4].children[0].children[1].src = contentContainer__2.children[4].children[0].children[1].src
                            } else if (idPlane[1]) {
                                contentContainer__1.children[2].children[0].children[1].src = contentContainer__1.children[2].children[0].children[1].src
                                // contentContainer__1.children[4].children[0].children[1].src = contentContainer__1.children[4].children[0].children[1].src
                            }
                            
                            cursorOnVideo = false
                            if (!cursorOnVideo) {
                                gsap.to(cursor, 0.50, { opacity: 1, ease: "Power3.easeOut"})
                                gsap.to(cursorShapeOut, 0.50, { opacity: 1, ease: "Power3.easeOut"})
                            }
                            workShopContainer.classList.remove('switchPlane')
                            btnBackWorkshop.classList.add('close')
                            gsap.to(workShopContainer, 1.5, { opacity: 0, ease: "Power3.easeOut" })
                            gsap.to(camera.position, 3, { z: -185, ease: "power3.inOut" })
                            gsap.to(leftDoor2.position, 1.5, { x: -20, ease: "power3.inOut", delay: .75 })
                            gsap.to(rightDoor2.position, 1.5, { x: 20, ease: "power3.inOut", delay: .75 })
                            gsap.to(creditContainer, 2, { opacity: 1, ease: "Power1.easeOut", delay: 2 })
                            
                            TweenMax.to(btnBackWorkshop, 1, { opacity: 0, clipPath: "inset(0% 100% 0% 0%)", ease: "power3.inOut" })
                            TweenMax.to(btnBackWorkshop, .75, { opacity: 1, clipPath: "inset(0% 0% 0% 0%)", delay: 2.5, ease: "power3.inOut" })
                            
                            backPossible = false;
                            clickPossible = false;
                            setTimeout(function() {
                                creditContainer.classList.add('switchStreet')
                                creditActive = true
                                elCredit.scrollTop = 0
                            }, 1000)
                            setTimeout(function() {
                                backPossible = true
                                clickPossible = true;
                                btnBackWorkshop.classList.remove('close')
                            }, 3000)
                        } 
            }
        }
    }
}

///// WORKSHOP SCROLL + CREDIT ENTER /////
contentContainer__14.addEventListener('scroll', function() {
    if (!creditActive) {
        if (idPlane[14]) {
            scrollIntoWorkshop(contentContainer__14, scrollContainer__14);
        }
    }
})

contentContainer__13.addEventListener('scroll', function() {
    if (!creditActive) {
        if (idPlane[13]) {
            scrollIntoWorkshop(contentContainer__13, scrollContainer__13);
        }
    }
})

contentContainer__12.addEventListener('scroll', function() {
    if (!creditActive) {
        if (idPlane[12]) {
            scrollIntoWorkshop(contentContainer__12, scrollContainer__12);
        }
    }
})

contentContainer__11.addEventListener('scroll', function() {
    if (!creditActive) {
        if (idPlane[11]) {
            scrollIntoWorkshop(contentContainer__11, scrollContainer__11);
        }
    }
})

contentContainer__10.addEventListener('scroll', function() {
    if (!creditActive) {
        if (idPlane[10]) {
            scrollIntoWorkshop(contentContainer__10, scrollContainer__10);
        }
    }
})

contentContainer__9.addEventListener('scroll', function() {
    if (!creditActive) {
        if (idPlane[9]) {
            scrollIntoWorkshop(contentContainer__9, scrollContainer__9);
        }
    }
})

contentContainer__8.addEventListener('scroll', function() {
    if (!creditActive) {
        if (idPlane[8]) {
            scrollIntoWorkshop(contentContainer__8, scrollContainer__8);
        }
    }
})

contentContainer__7.addEventListener('scroll', function() {
    if (!creditActive) {
        if (idPlane[7]) {
            scrollIntoWorkshop(contentContainer__7, scrollContainer__7);
        }
    }
})

contentContainer__6.addEventListener('scroll', function() {
    if (!creditActive) {
        if (idPlane[6]) {
            scrollIntoWorkshop(contentContainer__6, scrollContainer__6);
        }
    }
})

contentContainer__5.addEventListener('scroll', function() {
    if (!creditActive) {
        if (idPlane[5]) {
            scrollIntoWorkshop(contentContainer__5, scrollContainer__5);
        }
    }
})

contentContainer__4.addEventListener('scroll', function() {
    if (!creditActive) {
        if (idPlane[4]) {
            scrollIntoWorkshop(contentContainer__4, scrollContainer__4);
        }
    }
})

contentContainer__3.addEventListener('scroll', function() {
    if (!creditActive) {
        if (idPlane[3]) {
            scrollIntoWorkshop(contentContainer__3, scrollContainer__3);
        }
    }
})

contentContainer__2.addEventListener('scroll', function() {
    if (!creditActive) {
        if (idPlane[2]) {
            scrollIntoWorkshop(contentContainer__2, scrollContainer__2);
        }
    }
})

contentContainer__1.addEventListener('scroll', function() {
    if (!creditActive) {
        if (idPlane[1]) {
            scrollIntoWorkshop(contentContainer__1, scrollContainer__1);
        }
    }
})

///// SYNCHRO CAM TO SCROLL /////
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
            break;
        case 38: // SCROLL UP
            if (!workshopActive) {
                scrollUp();
            }
            break;
        case 39:
            if (!workshopActive) {
                scrollDown();
            }
            break;
        case 40: // SCROLL DOWN
            if (!workshopActive) {
                scrollDown();
            }
            break;
        case 27:
            if (camera.position.z == 3.7 && !workshopActive && backPossible && !homeActive && !startMenuActive) {
                functionBtnBackHome();
            }
            if (workshopActive && !creditActive && scrollPossible && !btnPressed) {
                backToPlane();
                btnPressed = true;
            } else if (workshopActive && creditActive && !btnPressed) {
                backToWorkshop();
                btnPressed = true;
            }
            break;
        case 13:
            if (!homeActive && startMenuActive) {
                startImmersion();
            }
            if (camera.position.z == 10 && homeActive && !startMenuActive) {
                functionBtnStart();
            }
            if (!homeActive && clickPossible) {
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
            break;
    }
};

let variation = 0;
let variationShaders = 0;

var render = function() {
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
    

    materialPlane1.uniforms.time.value = clock.running = false;
    materialPlane2.uniforms.time.value = clock.running = false;
    materialPlane3.uniforms.time.value = clock.running = false;
    materialPlane4.uniforms.time.value = clock.running = false;
    materialPlane5.uniforms.time.value = clock.running = false;
    materialPlane6.uniforms.time.value = clock.running = false;
    materialPlane7.uniforms.time.value = clock.running = false;
    materialPlane8.uniforms.time.value = clock.running = false;
    materialPlane9.uniforms.time.value = clock.running = false;
    materialPlane10.uniforms.time.value = clock.running = false;
    materialPlane11.uniforms.time.value = clock.running = false;
    materialPlane12.uniforms.time.value = clock.running = false;
    materialPlane13.uniforms.time.value = clock.running = false;
    materialPlane14.uniforms.time.value = clock.running = false;

        if (camera.position.z >= 0 && camera.position.z <= 3.9 || camera.position.z == 4.5) {
            materialPlane1.uniforms.time.value = clock.running = true;
            materialPlane2.uniforms.time.value = clock.running = true;
            materialPlane3.uniforms.time.value = clock.running = true;
            materialPlane4.uniforms.time.value = clock.running = true;
            materialPlane5.uniforms.time.value = clock.running = true;
            materialPlane6.uniforms.time.value = clock.running = true;
            materialPlane7.uniforms.time.value = clock.running = true;
            materialPlane8.uniforms.time.value = clock.running = true;
            materialPlane9.uniforms.time.value = clock.running = true;
            materialPlane10.uniforms.time.value = clock.running = true;
            materialPlane11.uniforms.time.value = clock.running = true;
            materialPlane12.uniforms.time.value = clock.running = true;
            materialPlane13.uniforms.time.value = clock.running = true;
            materialPlane14.uniforms.time.value = clock.running = true;
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

    composer.render();

    requestAnimationFrame(render);

    renderer.render(scene, camera);
};

render();