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

let volume = .1;
let volumePlane = .075;
let volumeBtn = .9;

let bgMusic = document.createElement("audio"); 
bgMusic.src = bgMusicImport; 
bgMusic.loop = false;
bgMusic.volume = volume;

let bgLoopMusic = document.createElement("audio"); 
bgLoopMusic.src = bgLoopMusicImport; 
bgLoopMusic.loop = false;
bgLoopMusic.volume = volume;

let rpzMusic = document.createElement("audio"); 
rpzMusic.src = rpzImport; 
rpzMusic.loop = false;
rpzMusic.volume = volume;

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

let queue = new createjs.LoadQueue(false);

queue.on("progress", event => {
    let increment = Math.floor(event.progress*100);
    progress.innerHTML = increment;
    indicGoDesktop.classList.add('switch')
});

queue.on("complete", event =>{
    indicGoDesktop.classList.remove('switch')
    progress.classList.add('switch')

    if (!window.matchMedia("(max-width: 1024px)").matches) {
        const _cursorIn = new Cursor(cursorShapeIn);
        updateCursor();
        setTimeout(function(){
            cursor.style.opacity = 1
            cursorShapeOut.style.opacity = 1          
        },50)
    }

    TweenMax.to(".spanContainerMainStart span", { duration: 1, opacity: 1, stagger: { each: 0.04, from: 'random' }, ease: "power3.inOut", delay: .75 })
    TweenMax.to(".borderLeft", { duration: 1, opacity: 1, clipPath: 'inset(0% 0% 0% 0%)', ease: "power3.inOut", delay: .75 })
    TweenMax.to(".borderRight", { duration: 1, opacity: 1, clipPath: 'inset(0% 0% 0% 0%)', ease: "power3.inOut", delay: .75 })
    TweenMax.to(".borderTop", { duration: 1, opacity: 1, clipPath: 'inset(0% 0% 0% 0%)', ease: "power3.inOut", delay: 1.25 })
    TweenMax.to(".borderBottom", { duration: 1, opacity: 1, clipPath: 'inset(0% 0% 0% 0%)', ease: "power3.inOut", delay: 1.25 })

    setTimeout(function(){
    btnMainStart.addEventListener("pointerenter", function() {
        if (homeActive) {
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
                    discordContainer.classList.add('switchPointer')
                    iutContainer.classList.add('switchPointer')
                    sm1.classList.add('switchPointer')
                    sm2.classList.add('switchPointer')
                    sm3.classList.add('switchPointer')
                    musicBtn.classList.add('switchPointer')
                },550)
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

queue.loadFile(displacement);
queue.loadFile(displacement1);
queue.loadFile(displacement2);
queue.loadFile(displacement3);
queue.loadFile(displacement4);
queue.loadFile(displacement5);
queue.loadFile(displacement6);
queue.loadFile(displacement7);
queue.loadFile(displacement8);
queue.loadFile(displacement9);

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
        enceinte.name = 'enceinte';
        enceinte.position.set(-9.2, 5.2,-5)
        enceinte.scale.set(0.0001, 0.0001, 0.0001);
        enceinte.rotation.y = .3*Math.PI;

        enceinte.on('click', function() {
            rpzMusic.play();                  
        })
    });
}

// c'est un test pour l'interaction sinon c'était "undefind"
// let enceinteMaterial = new THREE.MeshBasicMaterial({
//     map: null
// });

// let enceinteMesh = new THREE.Mesh(enceinte, enceinteMaterial);
// scene.add(enceinteMesh)



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

let switchHamburger = false;

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
    e.children[2].children[2].addEventListener('mouseenter', function () {
        e.children[0].classList.add('switch')
        e.children[1].classList.add('switch')
        e.children[2].classList.add('switch')
        e.children[2].children[0].classList.add('switch')
        e.children[2].children[1].classList.add('switch')
        e.children[2].children[2].classList.add('switch')
    })
    e.children[2].children[2].addEventListener('mouseleave', function () {
        e.children[0].classList.remove('switch')
        e.children[1].classList.remove('switch')
        e.children[2].classList.remove('switch')
        e.children[2].children[0].classList.remove('switch')
        e.children[2].children[1].classList.remove('switch')
        e.children[2].children[2].classList.remove('switch')
    })
});

scrollContainerContentImg__13.forEach(e => {
    e.children[2].children[2].addEventListener('mouseenter', function () {
        e.children[0].classList.add('switch')
        e.children[1].classList.add('switch')
        e.children[2].classList.add('switch')
        e.children[2].children[0].classList.add('switch')
        e.children[2].children[1].classList.add('switch')
        e.children[2].children[2].classList.add('switch')
    })
    e.children[2].children[2].addEventListener('mouseleave', function () {
        e.children[0].classList.remove('switch')
        e.children[1].classList.remove('switch')
        e.children[2].classList.remove('switch')
        e.children[2].children[0].classList.remove('switch')
        e.children[2].children[1].classList.remove('switch')
        e.children[2].children[2].classList.remove('switch')
    })
});

scrollContainerContentImg__12.forEach(e => {
    e.children[2].children[2].addEventListener('mouseenter', function () {
        e.children[0].classList.add('switch')
        e.children[1].classList.add('switch')
        e.children[2].classList.add('switch')
        e.children[2].children[0].classList.add('switch')
        e.children[2].children[1].classList.add('switch')
        e.children[2].children[2].classList.add('switch')
    })
    e.children[2].children[2].addEventListener('mouseleave', function () {
        e.children[0].classList.remove('switch')
        e.children[1].classList.remove('switch')
        e.children[2].classList.remove('switch')
        e.children[2].children[0].classList.remove('switch')
        e.children[2].children[1].classList.remove('switch')
        e.children[2].children[2].classList.remove('switch')
    })
});

scrollContainerContentImg__11.forEach(e => {
    e.children[2].children[2].addEventListener('mouseenter', function () {
        e.children[0].classList.add('switch')
        e.children[1].classList.add('switch')
        e.children[2].classList.add('switch')
        e.children[2].children[0].classList.add('switch')
        e.children[2].children[1].classList.add('switch')
        e.children[2].children[2].classList.add('switch')
    })
    e.children[2].children[2].addEventListener('mouseleave', function () {
        e.children[0].classList.remove('switch')
        e.children[1].classList.remove('switch')
        e.children[2].classList.remove('switch')
        e.children[2].children[0].classList.remove('switch')
        e.children[2].children[1].classList.remove('switch')
        e.children[2].children[2].classList.remove('switch')
    })
});

scrollContainerContentImg__10.forEach(e => {
    e.children[2].children[2].addEventListener('mouseenter', function () {
        e.children[0].classList.add('switch')
        e.children[1].classList.add('switch')
        e.children[2].classList.add('switch')
        e.children[2].children[0].classList.add('switch')
        e.children[2].children[1].classList.add('switch')
        e.children[2].children[2].classList.add('switch')
    })
    e.children[2].children[2].addEventListener('mouseleave', function () {
        e.children[0].classList.remove('switch')
        e.children[1].classList.remove('switch')
        e.children[2].classList.remove('switch')
        e.children[2].children[0].classList.remove('switch')
        e.children[2].children[1].classList.remove('switch')
        e.children[2].children[2].classList.remove('switch')
    })
});

scrollContainerContentImg__9.forEach(e => {
    e.children[2].children[2].addEventListener('mouseenter', function () {
        e.children[0].classList.add('switch')
        e.children[1].classList.add('switch')
        e.children[2].classList.add('switch')
        e.children[2].children[0].classList.add('switch')
        e.children[2].children[1].classList.add('switch')
        e.children[2].children[2].classList.add('switch')
    })
    e.children[2].children[2].addEventListener('mouseleave', function () {
        e.children[0].classList.remove('switch')
        e.children[1].classList.remove('switch')
        e.children[2].classList.remove('switch')
        e.children[2].children[0].classList.remove('switch')
        e.children[2].children[1].classList.remove('switch')
        e.children[2].children[2].classList.remove('switch')
    })
});

scrollContainerContentImg__8.forEach(e => {
    e.children[2].children[2].addEventListener('mouseenter', function () {
        e.children[0].classList.add('switch')
        e.children[1].classList.add('switch')
        e.children[2].classList.add('switch')
        e.children[2].children[0].classList.add('switch')
        e.children[2].children[1].classList.add('switch')
        e.children[2].children[2].classList.add('switch')
    })
    e.children[2].children[2].addEventListener('mouseleave', function () {
        e.children[0].classList.remove('switch')
        e.children[1].classList.remove('switch')
        e.children[2].classList.remove('switch')
        e.children[2].children[0].classList.remove('switch')
        e.children[2].children[1].classList.remove('switch')
        e.children[2].children[2].classList.remove('switch')
    })
});

scrollContainerContentImg__7.forEach(e => {
    e.children[2].children[2].addEventListener('mouseenter', function () {
        e.children[0].classList.add('switch')
        e.children[1].classList.add('switch')
        e.children[2].classList.add('switch')
        e.children[2].children[0].classList.add('switch')
        e.children[2].children[1].classList.add('switch')
        e.children[2].children[2].classList.add('switch')
    })
    e.children[2].children[2].addEventListener('mouseleave', function () {
        e.children[0].classList.remove('switch')
        e.children[1].classList.remove('switch')
        e.children[2].classList.remove('switch')
        e.children[2].children[0].classList.remove('switch')
        e.children[2].children[1].classList.remove('switch')
        e.children[2].children[2].classList.remove('switch')
    })
});

scrollContainerContentImg__6.forEach(e => {
    e.children[2].children[2].addEventListener('mouseenter', function () {
        e.children[0].classList.add('switch')
        e.children[1].classList.add('switch')
        e.children[2].classList.add('switch')
        e.children[2].children[0].classList.add('switch')
        e.children[2].children[1].classList.add('switch')
        e.children[2].children[2].classList.add('switch')
    })
    e.children[2].children[2].addEventListener('mouseleave', function () {
        e.children[0].classList.remove('switch')
        e.children[1].classList.remove('switch')
        e.children[2].classList.remove('switch')
        e.children[2].children[0].classList.remove('switch')
        e.children[2].children[1].classList.remove('switch')
        e.children[2].children[2].classList.remove('switch')
    })
});

scrollContainerContentImg__5.forEach(e => {
    e.children[2].children[2].addEventListener('mouseenter', function () {
        e.children[0].classList.add('switch')
        e.children[1].classList.add('switch')
        e.children[2].classList.add('switch')
        e.children[2].children[0].classList.add('switch')
        e.children[2].children[1].classList.add('switch')
        e.children[2].children[2].classList.add('switch')
    })
    e.children[2].children[2].addEventListener('mouseleave', function () {
        e.children[0].classList.remove('switch')
        e.children[1].classList.remove('switch')
        e.children[2].classList.remove('switch')
        e.children[2].children[0].classList.remove('switch')
        e.children[2].children[1].classList.remove('switch')
        e.children[2].children[2].classList.remove('switch')
    })
});

scrollContainerContentImg__4.forEach(e => {
    e.children[2].children[2].addEventListener('mouseenter', function () {
        e.children[0].classList.add('switch')
        e.children[1].classList.add('switch')
        e.children[2].classList.add('switch')
        e.children[2].children[0].classList.add('switch')
        e.children[2].children[1].classList.add('switch')
        e.children[2].children[2].classList.add('switch')
    })
    e.children[2].children[2].addEventListener('mouseleave', function () {
        e.children[0].classList.remove('switch')
        e.children[1].classList.remove('switch')
        e.children[2].classList.remove('switch')
        e.children[2].children[0].classList.remove('switch')
        e.children[2].children[1].classList.remove('switch')
        e.children[2].children[2].classList.remove('switch')
    })
});

scrollContainerContentImg__3.forEach(e => {
    e.children[2].children[2].addEventListener('mouseenter', function () {
        e.children[0].classList.add('switch')
        e.children[1].classList.add('switch')
        e.children[2].classList.add('switch')
        e.children[2].children[0].classList.add('switch')
        e.children[2].children[1].classList.add('switch')
        e.children[2].children[2].classList.add('switch')
    })
    e.children[2].children[2].addEventListener('mouseleave', function () {
        e.children[0].classList.remove('switch')
        e.children[1].classList.remove('switch')
        e.children[2].classList.remove('switch')
        e.children[2].children[0].classList.remove('switch')
        e.children[2].children[1].classList.remove('switch')
        e.children[2].children[2].classList.remove('switch')
    })
});

scrollContainerContentImg__2.forEach(e => {
    e.children[2].children[2].addEventListener('mouseenter', function () {
        e.children[0].classList.add('switch')
        e.children[1].classList.add('switch')
        e.children[2].classList.add('switch')
        e.children[2].children[0].classList.add('switch')
        e.children[2].children[1].classList.add('switch')
        e.children[2].children[2].classList.add('switch')
    })
    e.children[2].children[2].addEventListener('mouseleave', function () {
        e.children[0].classList.remove('switch')
        e.children[1].classList.remove('switch')
        e.children[2].classList.remove('switch')
        e.children[2].children[0].classList.remove('switch')
        e.children[2].children[1].classList.remove('switch')
        e.children[2].children[2].classList.remove('switch')
    })
});

scrollContainerContentImg__1.forEach(e => {
    e.children[2].children[2].addEventListener('mouseenter', function () {
        e.children[0].classList.add('switch')
        e.children[1].classList.add('switch')
        e.children[2].classList.add('switch')
        e.children[2].children[0].classList.add('switch')
        e.children[2].children[1].classList.add('switch')
        e.children[2].children[2].classList.add('switch')
    })
    e.children[2].children[2].addEventListener('mouseleave', function () {
        e.children[0].classList.remove('switch')
        e.children[1].classList.remove('switch')
        e.children[2].classList.remove('switch')
        e.children[2].children[0].classList.remove('switch')
        e.children[2].children[1].classList.remove('switch')
        e.children[2].children[2].classList.remove('switch')
    })
});

let homeActive = true;
let hoverPlane = true;
let workshopActive = false;
let creditActive = false;
let switchBtn = false;

let backPossible = true;
let clickPossible = true;
let scrollPossible = false;
let btnPressed = false;

let isScrollDown = false;
let isScrollUp = false;

let idPlane = [
    false, false, false, false, false, false, false, false, false, false, false, false, false, false
]

let varDelay = .0

musicBtn.addEventListener('click', function(){
    if(switchBtn == false){
    TweenMax.to(maskMusicBtn, { duration: .35, clipPath: "inset(100% 0% 0% 0%)",ease: "power3.easeOut" });
    TweenMax.to(maskMusicBtn, { duration: .25, clipPath: "inset(0% 0% 0% 0%)",ease: "power3.easeOut", delay: .15 });
    TweenMax.to(maskMusicBtn, { duration: .25, clipPath: "inset(0% 0% 100% 0%)",ease: "power3.easeOut", delay: .5 }); 
    if (window.matchMedia("(max-width: 1024px)").matches) {
        soundHover.play();
    }
    bgMusic.play();
    rpzMusic.volume = volume; 
    soundHover.volume = volumeBtn;
    soundHoverPlane.volume = volumePlane;
    soundOutPlane.volume = volumePlane;  
    switchBtn = true;    
    } else {
    TweenMax.to(maskMusicBtn, { duration: .35, clipPath: "inset(0% 0% 100% 0%)",ease: "power3.easeOut" });
    TweenMax.to(maskMusicBtn, { duration: .25, clipPath: "inset(0% 0% 0% 0%)",ease: "power3.easeOut", delay: .15 });
    TweenMax.to(maskMusicBtn, { duration: .25, clipPath: "inset(100% 0% 0% 0%)",ease: "power3.easeOut", delay: .5 });

    // test pour le easing du son
    // var i = setInterval(function () {
    
    //   volume-= 0.1
    //   bgMusic.volume = volume;

    //   console.log(volume)

    
    //   if (volume <=0) {
    //     clearInterval(i);
    //     bgMusic.pause();
    //   }
    // }, 200);
                
    bgMusic.pause(); 
    rpzMusic.volume = 0; 
    soundHover.volume = 0;
    soundHoverPlane.volume = 0;
    soundOutPlane.volume = 0;
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

musicBtn.addEventListener('mouseenter', function(){
    if (!window.matchMedia("(max-width: 1024px)").matches) {
    soundHover.play();
    }
})

function cursorHoverIn() {
    if (!window.matchMedia("(max-width: 1024px)").matches) {
        gsap.to(cursorSize, 0.75, { padding: 50, ease: "Power3.easeOut"})
        gsap.to(cursorShapeIn, 0.75, { background: colorCursorHover, padding: 50, ease: "Power3.easeOut"})
        gsap.to(cursorShapeOut, 0.50, { opacity: 0, ease: "Power3.easeOut"})
        gsap.to(indicClickOnPlane, .75, { scale: 1, ease: "Power3.easeOut", delay: .05})
        indicClickOnPlane.classList.add("planeHover")
        soundHoverPlane.play(); 
    }
}

function cursorHoverOut() {
    if (!window.matchMedia("(max-width: 1024px)").matches) {
        gsap.to(cursorSize, 0.75, {padding: 0, ease: "Power3.easeOut"})
        gsap.to(cursorShapeIn, 0.75, { background: colorCursorDefault, padding: 0, ease: "Power3.easeOut"})
        gsap.to(cursorShapeOut, 0.25, { opacity: 1,  delay: 0.25, ease: "Power3.easeOut"})
        gsap.to(indicClickOnPlane, 0.75, { scale: 0, ease: "Power3.easeOut"})
        indicClickOnPlane.classList.remove("planeHover")
        soundOutPlane.play(); 
    }
}

/////// PLANE HOVER SHADERS EFFECT ///////
let colorCursorHover = "#f72585";
let colorCursorDefault = "#4cc9f0";

planeMesh14.on('mouseover', function(ev) {
    if (ev && (hoverPlane && !workshopActive && (planeAxe.position.y <= -17 && planeAxe.position.y >= -17.5 || planeAxe.position.y <= -16.5 && planeAxe.position.y >= -17))) {
        gsap.to(materialPlane14.uniforms.alpha, 0.75, { value: 1.0, ease: "Power3.easeOut" })
        gsap.to(materialPlane14.uniforms.dispFactor, 0.75, { value: 1.0, ease: "Power3.easeOut" });
        cursorHoverIn()
    }
});
planeMesh14.on('mouseout', function(ev) {
    if (ev && !workshopActive) {
        gsap.to(materialPlane14.uniforms.alpha, 0.75, { value: planeOpacityDefault, ease: "Power3.easeOut" })
        gsap.to(materialPlane14.uniforms.dispFactor, 0.75, { value: 0.0, ease: "Power3.easeOut" });
        cursorHoverOut()
    }
});

planeMesh13.on('mouseover', function(ev) {
    if (ev && (hoverPlane && !workshopActive && (planeAxe.position.y <= -16 && planeAxe.position.y >= -16.5 || planeAxe.position.y <= -15.5 && planeAxe.position.y >= -16))) {
        console.log(ev)
        gsap.to(materialPlane13.uniforms.alpha, 0.75, { value: 1.0, ease: "Power3.easeOut" })
        gsap.to(materialPlane13.uniforms.dispFactor, 0.75, { value: 1.0, ease: "Power3.easeOut" });
        cursorHoverIn()
    }
});
planeMesh13.on('mouseout', function(ev) {
    if (ev && !workshopActive) {
        gsap.to(materialPlane13.uniforms.alpha, 0.75, { value: planeOpacityDefault, ease: "Power3.easeOut" })
        gsap.to(materialPlane13.uniforms.dispFactor, 0.75, { value: 0.0, ease: "Power3.easeOut" });
        cursorHoverOut()
    }
});

planeMesh12.on('mouseover', function(ev) {
    if (ev && (hoverPlane && !workshopActive && (planeAxe.position.y <= -15 && planeAxe.position.y >= -15.5 || planeAxe.position.y <= -14.5 && planeAxe.position.y >= -15))) {
        console.log(ev)
        gsap.to(materialPlane12.uniforms.alpha, 0.75, { value: 1.0, ease: "Power3.easeOut" })
        gsap.to(materialPlane12.uniforms.dispFactor, 0.75, { value: 1.0, ease: "Power3.easeOut" });
        cursorHoverIn()
    }
});
planeMesh12.on('mouseout', function(ev) {
    if (ev && !workshopActive) {
        gsap.to(materialPlane12.uniforms.alpha, 0.75, { value: planeOpacityDefault, ease: "Power3.easeOut" })
        gsap.to(materialPlane12.uniforms.dispFactor, 0.75, { value: 0.0, ease: "Power3.easeOut" });
        cursorHoverOut()
    }
});

planeMesh11.on('mouseover', function(ev) {
    if (ev && (hoverPlane && !workshopActive && (planeAxe.position.y <= -14 && planeAxe.position.y >= -14.5 || planeAxe.position.y <= -13.5 && planeAxe.position.y >= -14))) {
        console.log(ev)
        gsap.to(materialPlane11.uniforms.alpha, 0.75, { value: 1.0, ease: "Power3.easeOut" })
        gsap.to(materialPlane11.uniforms.dispFactor, 0.75, { value: 1.0, ease: "Power3.easeOut" });
        cursorHoverIn()
    }
});
planeMesh11.on('mouseout', function(ev) {
    if (ev && !workshopActive) {
        gsap.to(materialPlane11.uniforms.alpha, 0.75, { value: planeOpacityDefault, ease: "Power3.easeOut" })
        gsap.to(materialPlane11.uniforms.dispFactor, 0.75, { value: 0.0, ease: "Power3.easeOut" });
        cursorHoverOut()
    }
});

planeMesh10.on('mouseover', function(ev) {
    if (ev && (hoverPlane && !workshopActive && (planeAxe.position.y <= -13 && planeAxe.position.y >= -13.5 || planeAxe.position.y <= -12.5 && planeAxe.position.y >= -13))) {
        console.log(ev)
        gsap.to(materialPlane10.uniforms.alpha, 0.75, { value: 1.0, ease: "Power3.easeOut" })
        gsap.to(materialPlane10.uniforms.dispFactor, 0.75, { value: 1.0, ease: "Power3.easeOut" });
        cursorHoverIn()
    }
});
planeMesh10.on('mouseout', function(ev) {
    if (ev && !workshopActive) {
        gsap.to(materialPlane10.uniforms.alpha, 0.75, { value: planeOpacityDefault, ease: "Power3.easeOut" })
        gsap.to(materialPlane10.uniforms.dispFactor, 0.75, { value: 0.0, ease: "Power3.easeOut" });
        cursorHoverOut()
    }
});

planeMesh9.on('mouseover', function(ev) {
    if (ev && (hoverPlane && !workshopActive && (planeAxe.position.y <= -12 && planeAxe.position.y >= -12.5 || planeAxe.position.y <= -11.5 && planeAxe.position.y >= -12))) {
        console.log(ev)
        gsap.to(materialPlane9.uniforms.alpha, 0.75, { value: 1.0, ease: "Power3.easeOut" })
        gsap.to(materialPlane9.uniforms.dispFactor, 0.75, { value: 1.0, ease: "Power3.easeOut" });
        cursorHoverIn()
    }
});
planeMesh9.on('mouseout', function(ev) {
    if (ev && !workshopActive) {
        gsap.to(materialPlane9.uniforms.alpha, 0.75, { value: planeOpacityDefault, ease: "Power3.easeOut" })
        gsap.to(materialPlane9.uniforms.dispFactor, 0.75, { value: 0.0, ease: "Power3.easeOut" });
        cursorHoverOut()
    }   
});

planeMesh8.on('mouseover', function(ev) {
    if (ev && (hoverPlane && !workshopActive && (planeAxe.position.y <= -11 && planeAxe.position.y >= -11.5 || planeAxe.position.y <= -10.5 && planeAxe.position.y >= -11))) {
        gsap.to(materialPlane8.uniforms.alpha, 0.75, { value: 1.0, ease: "Power3.easeOut" })
        gsap.to(materialPlane8.uniforms.dispFactor, 0.75, { value: 1.0, ease: "Power3.easeOut" });
        cursorHoverIn()
    }
});
planeMesh8.on('mouseout', function(ev) {
    if (ev && !workshopActive) {
        gsap.to(materialPlane8.uniforms.alpha, 0.75, { value: planeOpacityDefault, ease: "Power3.easeOut" })
        gsap.to(materialPlane8.uniforms.dispFactor, 0.75, { value: 0.0, ease: "Power3.easeOut" });
        cursorHoverOut()
    }
});

planeMesh7.on('mouseover', function(ev) {
    if (ev && (hoverPlane && !workshopActive && (planeAxe.position.y <= -10 && planeAxe.position.y >= -10.5 || planeAxe.position.y <= -9.5 && planeAxe.position.y >= -10))) {
        console.log(ev)
        gsap.to(materialPlane7.uniforms.alpha, 0.75, { value: 1.0, ease: "Power3.easeOut" })
        gsap.to(materialPlane7.uniforms.dispFactor, 0.75, { value: 1.0, ease: "Power3.easeOut" });
        cursorHoverIn()
    }
});
planeMesh7.on('mouseout', function(ev) {
    if (ev && !workshopActive) {
        gsap.to(materialPlane7.uniforms.alpha, 0.75, { value: planeOpacityDefault, ease: "Power3.easeOut" })
        gsap.to(materialPlane7.uniforms.dispFactor, 0.75, { value: 0.0, ease: "Power3.easeOut" });
        cursorHoverOut()
    }
});

planeMesh6.on('mouseover', function(ev) {
    if (ev && (hoverPlane && !workshopActive && (planeAxe.position.y <= -9 && planeAxe.position.y >= -9.5 || planeAxe.position.y <= -8.5 && planeAxe.position.y >= -9))) {
        console.log(ev)
        gsap.to(materialPlane6.uniforms.alpha, 0.75, { value: 1.0, ease: "Power3.easeOut" })
        gsap.to(materialPlane6.uniforms.dispFactor, 0.75, { value: 1.0, ease: "Power3.easeOut" });
        cursorHoverIn()
    }
});
planeMesh6.on('mouseout', function(ev) {
    if (ev && !workshopActive) {
        gsap.to(materialPlane6.uniforms.alpha, 0.75, { value: planeOpacityDefault, ease: "Power3.easeOut" })
        gsap.to(materialPlane6.uniforms.dispFactor, 0.75, { value: 0.0, ease: "Power3.easeOut" });
        cursorHoverOut()
    }
});

planeMesh5.on('mouseover', function(ev) {
    if (ev && (hoverPlane && !workshopActive && (planeAxe.position.y <= -8 && planeAxe.position.y >= -8.5 || planeAxe.position.y <= -7.5 && planeAxe.position.y >= -8))) {
        console.log(ev)
        gsap.to(materialPlane5.uniforms.alpha, 0.75, { value: 1.0, ease: "Power3.easeOut" })
        gsap.to(materialPlane5.uniforms.dispFactor, 0.75, { value: 1.0, ease: "Power3.easeOut" });
        cursorHoverIn()
    }
});
planeMesh5.on('mouseout', function(ev) {
    if (ev && !workshopActive) {
        gsap.to(materialPlane5.uniforms.alpha, 0.75, { value: planeOpacityDefault, ease: "Power3.easeOut" })
        gsap.to(materialPlane5.uniforms.dispFactor, 0.75, { value: 0.0, ease: "Power3.easeOut" });
        cursorHoverOut()
    }
});

planeMesh4.on('mouseover', function(ev) {
    if (ev && (hoverPlane && !workshopActive && (planeAxe.position.y <= -7 && planeAxe.position.y >= -7.5 || planeAxe.position.y <= -6.5 && planeAxe.position.y >= -7))) {
        console.log(ev)
        gsap.to(materialPlane4.uniforms.alpha, 0.75, { value: 1.0, ease: "Power3.easeOut" })
        gsap.to(materialPlane4.uniforms.dispFactor, 0.75, { value: 1.0, ease: "Power3.easeOut" });
        cursorHoverIn()
    }
});
planeMesh4.on('mouseout', function(ev) {
    if (ev && !workshopActive) {
        gsap.to(materialPlane4.uniforms.alpha, 0.75, { value: planeOpacityDefault, ease: "Power3.easeOut" })
        gsap.to(materialPlane4.uniforms.dispFactor, 0.75, { value: 0.0, ease: "Power3.easeOut" });
        cursorHoverOut()
    }
});

planeMesh3.on('mouseover', function(ev) {
    if (ev && (hoverPlane && !workshopActive && (planeAxe.position.y <= -6 && planeAxe.position.y >= -6.5 || planeAxe.position.y <= -5.5 && planeAxe.position.y >= -6))) {
        console.log(ev)
        gsap.to(materialPlane3.uniforms.alpha, 0.75, { value: 1.0, ease: "Power3.easeOut" })
        gsap.to(materialPlane3.uniforms.dispFactor, 0.75, { value: 1.0, ease: "Power3.easeOut" });
        cursorHoverIn()
    }
});
planeMesh3.on('mouseout', function(ev) {
    if (ev && !workshopActive) {
        gsap.to(materialPlane3.uniforms.alpha, 0.75, { value: planeOpacityDefault, ease: "Power3.easeOut" })
        gsap.to(materialPlane3.uniforms.dispFactor, 0.75, { value: 0.0, ease: "Power3.easeOut" });
        cursorHoverOut()
    }
});

planeMesh2.on('mouseover', function(ev) {
    if (ev && (hoverPlane && !workshopActive && (planeAxe.position.y <= -5 && planeAxe.position.y >= -5.5 || planeAxe.position.y <= -4.5 && planeAxe.position.y >= -5))) {
        console.log(ev)
        gsap.to(materialPlane2.uniforms.alpha, 0.75, { value: 1.0, ease: "Power3.easeOut" })
        gsap.to(materialPlane2.uniforms.dispFactor, 0.75, { value: 1.0, ease: "Power3.easeOut" });
        cursorHoverIn()
    }
});
planeMesh2.on('mouseout', function(ev) {
    if (ev && !workshopActive) {
        gsap.to(materialPlane2.uniforms.alpha, 0.75, { value: planeOpacityDefault, ease: "Power3.easeOut" })
        gsap.to(materialPlane2.uniforms.dispFactor, 0.75, { value: 0.0, ease: "Power3.easeOut" });
        cursorHoverOut()
    }
});

planeMesh1.on('mouseover', function(ev) {
    if (ev && (hoverPlane && !workshopActive && (planeAxe.position.y <= -4 && planeAxe.position.y >= -4.5 || planeAxe.position.y <= -3.5 && planeAxe.position.y >= -4))) {
        gsap.to(materialPlane1.uniforms.alpha, 0.75, { value: 1.0, ease: "Power3.easeOut" })
        gsap.to(materialPlane1.uniforms.dispFactor, 0.75, { value: 1.0, ease: "Power3.easeOut" });
        cursorHoverIn()
    }
});
planeMesh1.on('mouseout', function(ev) {
    if (ev && !workshopActive) {
        gsap.to(materialPlane1.uniforms.alpha, 0.75, { value: planeOpacityDefault, ease: "Power3.easeOut" })
        gsap.to(materialPlane1.uniforms.dispFactor, 0.75, { value: 0.0, ease: "Power3.easeOut" });
        cursorHoverOut()
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

function animationEnterWorkshop() {
    if (idPlane[14]) {
        contentContainer__14.style.display = "block"
        scrollContainer__14.style.display = "flex"
    } else if (idPlane[13]) {
        contentContainer__13.style.display = "block"
        scrollContainer__13.style.display = "flex"
    } else if (idPlane[12]) {
        contentContainer__12.style.display = "block"
        scrollContainer__12.style.display = "flex"
    } else if (idPlane[11]) {
        contentContainer__11.style.display = "block"
        scrollContainer__11.style.display = "flex"
    } else if (idPlane[10]) {
        contentContainer__10.style.display = "block"
        scrollContainer__10.style.display = "flex"
    } else if (idPlane[9]) {
        contentContainer__9.style.display = "block"
        scrollContainer__9.style.display = "flex"
    } else if (idPlane[8]) {
        contentContainer__8.style.display = "block"
        scrollContainer__8.style.display = "flex"
    } else if (idPlane[7]) {
        contentContainer__7.style.display = "block"
        scrollContainer__7.style.display = "flex"
    } else if (idPlane[6]) {
        contentContainer__6.style.display = "block"
        scrollContainer__6.style.display = "flex"
    } else if (idPlane[5]) {
        contentContainer__5.style.display = "block"
        scrollContainer__5.style.display = "flex"
    } else if (idPlane[4]) {
        contentContainer__4.style.display = "block"
        scrollContainer__4.style.display = "flex"
    } else if (idPlane[3]) {
        contentContainer__3.style.display = "block"
        scrollContainer__3.style.display = "flex"
    } else if (idPlane[2]) {
        contentContainer__2.style.display = "block"
        scrollContainer__2.style.display = "flex"
    } else if (idPlane[1]) {
        contentContainer__1.style.display = "block"
        scrollContainer__1.style.display = "flex"
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

    setTimeout(function() {
        if(workshopActive) {
            workShopContainer.classList.add('switchPlane');
            scrollPossible = true
        }
    }, 3750)
    
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
    
    
    setTimeout(function(){
        discordContainer.classList.add('switchPointer')
        iutContainer.classList.add('switchPointer')
        btnStart.disabled = false;
        btnStart.classList.remove('close')
        littleTitleSvg.classList.add('close')
    }, 2800)

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
        gsap.to(street.scale, 0, { x: 0.0001, y: 0.0001, z: 0.0001 })
        gsap.to(leftDoor2.scale, 0, { x: 0.0001, y: 0.0001, z: 0.0001, ease: "power3.inOut" })
        gsap.to(rightDoor2.scale, 0, { x: 0.0001, y: 0.0001, z: 0.0001, ease: "power3.inOut" })
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
    if (workshopActive && !creditActive && backPossible) {
        backToPlane();
    } else if (workshopActive && creditActive) {
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
})

btnBackWorkshop.addEventListener('mouseenter', function() {
    if (!window.matchMedia("(max-width: 1024px)").matches) {
    TweenMax.to(".spanContainerBackWorkshopMouseover span", { duration: .5, translateY: -40, stagger: .027, ease: "power3.inOut" });
    TweenMax.to(".spanContainerBackWorkshopMouseout span", { duration: .5, translateY: 0, stagger: .027, ease: "power3.inOut" });
    TweenMax.to(btnBackWorkshop, { color: "#09021e", background: "#4cc9f0", ease: "power3.inOut" });
    btnBackWorkshop.classList.add('hover')
    spanContainerBackMouseOut.classList.add('neonText');
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
        varDelay = posComparedToElementHeight(contentContainer__14)
        setTimeout(function() {
            contentContainer__14.style.display = "none"
            scrollContainer__14.style.display = "none"
        }, 2700)
    } else if (idPlane[13]) {
        varDelay = posComparedToElementHeight(contentContainer__13)
        setTimeout(function() {
            contentContainer__13.style.display = "none"
            scrollContainer__13.style.display = "none"
        }, 2700)
    } else if (idPlane[12]) {
        varDelay = posComparedToElementHeight(contentContainer__12)
        setTimeout(function() {
            contentContainer__12.style.display = "none"
            scrollContainer__12.style.display = "none"
        }, 2700)
    } else if (idPlane[11]) {
        varDelay = posComparedToElementHeight(contentContainer__11)
        setTimeout(function() {
            contentContainer__11.style.display = "none"
            scrollContainer__11.style.display = "none"
        }, 2700)
    } else if (idPlane[10]) {
        varDelay = posComparedToElementHeight(contentContainer__10)
        setTimeout(function() {
            contentContainer__10.style.display = "none"
            scrollContainer__10.style.display = "none"
        }, 2700)
    } else if (idPlane[9]) {
        varDelay = posComparedToElementHeight(contentContainer__9)
        setTimeout(function() {
            contentContainer__9.style.display = "none"
            scrollContainer__9.style.display = "none"
        }, 2700)
    } else if (idPlane[8]) {
        varDelay = posComparedToElementHeight(contentContainer__8)
        setTimeout(function() {
            contentContainer__8.style.display = "none"
            scrollContainer__8.style.display = "none"
        }, 2700)
    } else if (idPlane[7]) {
        varDelay = posComparedToElementHeight(contentContainer__7)
        setTimeout(function() {
            contentContainer__7.style.display = "none"
            scrollContainer__7.style.display = "none"
        }, 2700)
    } else if (idPlane[6]) {
        varDelay = posComparedToElementHeight(contentContainer__6)
        setTimeout(function() {
            contentContainer__6.style.display = "none"
            scrollContainer__6.style.display = "none"
        }, 2700)
    } else if (idPlane[5]) {
        varDelay = posComparedToElementHeight(contentContainer__5)
        setTimeout(function() {
            contentContainer__5.style.display = "none"
            scrollContainer__5.style.display = "none"
        }, 2700)
    } else if (idPlane[4]) {
        varDelay = posComparedToElementHeight(contentContainer__4)
        setTimeout(function() {
            contentContainer__4.style.display = "none"
            scrollContainer__4.style.display = "none"
        }, 2700)
    } else if (idPlane[3]) {
        varDelay = posComparedToElementHeight(contentContainer__3)
        setTimeout(function() {
            contentContainer__3.style.display = "none"
            scrollContainer__3.style.display = "none"
        }, 2700)
    } else if (idPlane[2]) {
        varDelay = posComparedToElementHeight(contentContainer__2)
        setTimeout(function() {
            contentContainer__2.style.display = "none"
            scrollContainer__2.style.display = "none"
        }, 2700)
    } else if (idPlane[1]) {
        varDelay = posComparedToElementHeight(contentContainer__1)
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
    workShopContainer.classList.remove('switchPlane');

    setTimeout(function() {
        hoverPlane = true
        clickPossible = true
        idPlane = [
            false, false, false, false, false, false, false, false, false, false, false, false, false, false
        ]
    }, 2500)

    setTimeout(function() {
        workshopActive = false;
        btnPressed = false
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
}

function backToWorkshop() {
    if (camera.position.z <= -185) {
        if (idPlane[14]) {
            let lastPosScroll__14 = contentContainer__14.scrollTop
            contentContainer__14.scrollTop = lastPosScroll__14 - 50
            gsap.to(camera.position, 3, { z: scrollWorkshop(contentContainer__14), ease: "power3.inOut" })
        } else if (idPlane[13]) {
            let lastPosScroll__13 = contentContainer__13.scrollTop
            contentContainer__13.scrollTop = lastPosScroll__13 - 50
            gsap.to(camera.position, 3, { z: scrollWorkshop(contentContainer__13), ease: "power3.inOut" })
        } else if (idPlane[12]) {
            let lastPosScroll__12 = contentContainer__12.scrollTop
            contentContainer__12.scrollTop = lastPosScroll__12 - 50
            gsap.to(camera.position, 3, { z: scrollWorkshop(contentContainer__12), ease: "power3.inOut" })
        } else if (idPlane[11]) {
            let lastPosScroll__11 = contentContainer__11.scrollTop
            contentContainer__11.scrollTop = lastPosScroll__11 - 50
            gsap.to(camera.position, 3, { z: scrollWorkshop(contentContainer__11), ease: "power3.inOut" })
        } else if (idPlane[10]) {
            let lastPosScroll__10 = contentContainer__10.scrollTop
            contentContainer__10.scrollTop = lastPosScroll__10 - 50
            gsap.to(camera.position, 3, { z: scrollWorkshop(contentContainer__10), ease: "power3.inOut" })
        } else if (idPlane[9]) {
            let lastPosScroll__9 = contentContainer__9.scrollTop
            contentContainer__9.scrollTop = lastPosScroll__9 - 50
            gsap.to(camera.position, 3, { z: scrollWorkshop(contentContainer__9), ease: "power3.inOut" })
        } else if (idPlane[8]) {
            let lastPosScroll__8 = contentContainer__8.scrollTop
            contentContainer__8.scrollTop = lastPosScroll__8 - 50
            gsap.to(camera.position, 3, { z: scrollWorkshop(contentContainer__8), ease: "power3.inOut" })
        } else if (idPlane[7]) {
            let lastPosScroll__7 = contentContainer__7.scrollTop
            contentContainer__7.scrollTop = lastPosScroll__7 - 50
            gsap.to(camera.position, 3, { z: scrollWorkshop(contentContainer__7), ease: "power3.inOut" })
        } else if (idPlane[6]) {
            let lastPosScroll__6 = contentContainer__6.scrollTop
            contentContainer__6.scrollTop = lastPosScroll__6 - 50
            gsap.to(camera.position, 3, { z: scrollWorkshop(contentContainer__6), ease: "power3.inOut" })
        } else if (idPlane[5]) {
            let lastPosScroll__5 = contentContainer__5.scrollTop
            contentContainer__5.scrollTop = lastPosScroll__5 - 50
            gsap.to(camera.position, 3, { z: scrollWorkshop(contentContainer__5), ease: "power3.inOut" })
        } else if (idPlane[4]) {
            let lastPosScroll__4 = contentContainer__4.scrollTop
            contentContainer__4.scrollTop = lastPosScroll__4 - 50
            gsap.to(camera.position, 3, { z: scrollWorkshop(contentContainer__4), ease: "power3.inOut" })
        } else if (idPlane[3]) {
            let lastPosScroll__3 = contentContainer__3.scrollTop
            contentContainer__3.scrollTop = lastPosScroll__3 - 50
            gsap.to(camera.position, 3, { z: scrollWorkshop(contentContainer__3), ease: "power3.inOut" })
        } else if (idPlane[2]) {
            let lastPosScroll__2 = contentContainer__2.scrollTop
            contentContainer__2.scrollTop = lastPosScroll__2 - 50
            gsap.to(camera.position, 3, { z: scrollWorkshop(contentContainer__2), ease: "power3.inOut" })
        } else if (idPlane[1]) {
            let lastPosScroll__1 = contentContainer__1.scrollTop
            contentContainer__1.scrollTop = lastPosScroll__1 - 50
            gsap.to(camera.position, 3, { z: scrollWorkshop(contentContainer__1), ease: "power3.inOut" })
        }
        gsap.to(leftDoor2.position, 1.5, { x: .3, ease: "power3.inOut", delay: .75 })
        gsap.to(rightDoor2.position, 1.5, { x: .3, ease: "power3.inOut", delay: .75 })
        gsap.to(creditContainer, 2.5, { opacity: 0, ease: "Power4.easeOut" })

        for (let i=1; i <= 12; i++) {
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
    window.open('https://www.facebook.com/mmi.tarbes.jpo', '_blank');
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
    window.open('https://www.instagram.com/immersions_digitales_tarbes/', '_blank');
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
    window.open('https://www.linkedin.com/in/immersions-digitales/', '_blank');
})

discordContainer.addEventListener('mouseenter', function() { // POINTER DISCORD
    if (!window.matchMedia("(max-width: 1024px)").matches) {
    TweenMax.to(".spanContainerDiscord span", { duration: 0.5, opacity: 1, stagger: { each: 0.05, from: 'end' }, ease: "power3.inOut" })
    soundHover.play();
    }
})

discordContainer.addEventListener('mouseleave', function() {
    if (!window.matchMedia("(max-width: 1024px)").matches) {
    TweenMax.to(".spanContainerDiscord span", { duration: 0.5, opacity: .6, stagger: { each: 0.05, from: 'end' }, ease: "power3.inOut" })
    }
})

discordContainer.addEventListener('click', function() {
    window.open('https://discord.gg/RrT9Tv4n', '_blank');
})

iutContainer.addEventListener('mouseenter', function() { // POINTER IUT
    if (!window.matchMedia("(max-width: 1024px)").matches) {
    TweenMax.to(".spanContainerIut span", { duration: 0.5, opacity: 1, stagger: { each: 0.037, from: 'start' }, ease: "power3.inOut" })
    soundHover.play();
    }
})

iutContainer.addEventListener('mouseleave', function() {
    if (!window.matchMedia("(max-width: 1024px)").matches) {
    TweenMax.to(".spanContainerIut span", { duration: 0.5, opacity: .6, stagger: { each: 0.037, from: 'start' }, ease: "power3.inOut" })
    }
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

workShopButton.forEach(e=>{
    e.addEventListener('mouseenter', function(){
        soundHover.play();
    })
})

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
            gsap.to(camera.position, 2.95, { z: 10, ease: "power3.inOut" })
        //HTML ELEMENTS ANIM
        cursorIndication.classList.remove('switch')
        mobileIndication.classList.add('switch')
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
        gsap.to(street.scale, 0, { x: 0.0001, y: 0.0001, z: 0.0001 })
        gsap.to(leftDoor2.scale, 0, { x: 0.0001, y: 0.0001, z: 0.0001, ease: "power3.inOut" })
        gsap.to(rightDoor2.scale, 0, { x: 0.0001, y: 0.0001, z: 0.0001, ease: "power3.inOut" })
        gsap.to(cam.scale, .65, { x: 0.0001, y: 0.0001, z: 0.0001, ease: "power3.inOut", delay: .6 })
        gsap.to(vr2.scale, .95, { x: 0.0001, y: 0.0001, z: 0.0001, ease: "power3.inOut", delay: .3 })
        gsap.to(enceinte.scale, 1.25, { x: 0.0001, y: 0.0001, z: 0.0001, ease: "power3.inOut" })
        gsap.to(tv2.scale, .65, { x: 0.0001, y: 0.0001, z: 0.0001, ease: "power3.inOut", delay: .6})
        gsap.to(tabProg.scale, .95, { x: 0.0001, y: 0.0001, z: 0.0001, ease: "power3.inOut", delay: .3})
        gsap.to(tv.scale, 1.25, { x: 0.0001, y: 0.0001, z: 0.0001, ease: "power3.inOut"})
        gsap.to(street.scale, 0, { x: 0.0001, y: 0.0001, z: 0.0001 })
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
            gsap.to(camera.position, 2.95, { z: 10, ease: "power3.inOut" })
        //HTML ELEMENTS ANIM
        cursorIndication.classList.remove('switch')
        mobileIndication.classList.remove('switch')
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
        gsap.to(street.scale, 0, { x: 0.0001, y: 0.0001, z: 0.0001 })
        gsap.to(leftDoor2.scale, 0, { x: 0.0001, y: 0.0001, z: 0.0001, ease: "power3.inOut" })
        gsap.to(rightDoor2.scale, 0, { x: 0.0001, y: 0.0001, z: 0.0001, ease: "power3.inOut" })
        gsap.to(cam.scale, .65, { x: 0.0001, y: 0.0001, z: 0.0001, ease: "power3.inOut", delay: .6 })
        gsap.to(vr2.scale, .95, { x: 0.0001, y: 0.0001, z: 0.0001, ease: "power3.inOut", delay: .3 })
        gsap.to(enceinte.scale, 1.25, { x: 0.0001, y: 0.0001, z: 0.0001, ease: "power3.inOut" })
        gsap.to(tv2.scale, .65, { x: 0.0001, y: 0.0001, z: 0.0001, ease: "power3.inOut", delay: .6})
        gsap.to(tabProg.scale, .95, { x: 0.0001, y: 0.0001, z: 0.0001, ease: "power3.inOut", delay: .3})
        gsap.to(tv.scale, 1.25, { x: 0.0001, y: 0.0001, z: 0.0001, ease: "power3.inOut"})
        gsap.to(street.scale, 0, { x: 0.0001, y: 0.0001, z: 0.0001 })
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
            if (idPlane[14]) {
                if (camera.position.z <= -185 && scrollContainer__14.scrollTop == 0) {
                    backToWorkshop();
                }
            } else if (idPlane[13]) {
                if (camera.position.z <= -185 && scrollContainer__13.scrollTop == 0) {
                    backToWorkshop();
                }
            } else if (idPlane[12]) {
                if (camera.position.z <= -185 && scrollContainer__12.scrollTop == 0) {
                    backToWorkshop();
                }
            } else if (idPlane[11]) {
                if (camera.position.z <= -185 && scrollContainer__11.scrollTop == 0) {
                    backToWorkshop();
                }
            } else if (idPlane[10]) {
                if (camera.position.z <= -185 && scrollContainer__10.scrollTop == 0) {
                    backToWorkshop();
                }
            } else if (idPlane[9]) {
                if (camera.position.z <= -185 && scrollContainer__9.scrollTop == 0) {
                    backToWorkshop();
                }
            } else if (idPlane[8]) {
                if (camera.position.z <= -185 && scrollContainer__8.scrollTop == 0) {
                    backToWorkshop();
                }
            } else if (idPlane[7]) {
                if (camera.position.z <= -185 && scrollContainer__7.scrollTop == 0) {
                    backToWorkshop();
                }
            } else if (idPlane[6]) {
                if (camera.position.z <= -185 && scrollContainer__6.scrollTop == 0) {
                    backToWorkshop();
                }
            } else if (idPlane[5]) {
                if (camera.position.z <= -185 && scrollContainer__5.scrollTop == 0) {
                    backToWorkshop();
                }
            } else if (idPlane[4]) {
                if (camera.position.z <= -185 && scrollContainer__4.scrollTop == 0) {
                    backToWorkshop();
                }
            } else if (idPlane[3]) {
                if (camera.position.z <= -185 && scrollContainer__3.scrollTop == 0) {
                    backToWorkshop();
                }
            } else if (idPlane[2]) {
                if (camera.position.z <= -185 && scrollContainer__2.scrollTop == 0) {
                    backToWorkshop();
                }
            } else if (idPlane[1]) {
                if (camera.position.z <= -185 && scrollContainer__1.scrollTop == 0) {
                    backToWorkshop();
                }
            }
        }
    } else if (workshopActive) {
        if (checkScrollDirectionIsUp(event)) { // SCROLL UP
            if (idPlane[14]) {
                if (contentContainer__14.scrollTop == 0 && scrollPossible) {
                    backToPlane();
                    scrollPossible = false
                }
            } else if (idPlane[13]) {
                if (contentContainer__13.scrollTop == 0 && scrollPossible) {
                    backToPlane();
                    scrollPossible = false
                }
            } else if (idPlane[12]) {
                if (contentContainer__12.scrollTop == 0 && scrollPossible) {
                    backToPlane();
                    scrollPossible = false
                }
            } else if (idPlane[11]) {
                if (contentContainer__11.scrollTop == 0 && scrollPossible) {
                    backToPlane();
                    scrollPossible = false
                }
            } else if (idPlane[10]) {
                if (contentContainer__10.scrollTop == 0 && scrollPossible) {
                    backToPlane();
                    scrollPossible = false
                }
            } else if (idPlane[9]) {
                if (contentContainer__9.scrollTop == 0 && scrollPossible) {
                    backToPlane();
                    scrollPossible = false
                }
            } else if (idPlane[8]) {
                if (contentContainer__8.scrollTop == 0 && scrollPossible) {
                    backToPlane();
                    scrollPossible = false
                }
            } else if (idPlane[7]) {
                if (contentContainer__7.scrollTop == 0 && scrollPossible) {
                    backToPlane();
                    scrollPossible = false
                }
            } else if (idPlane[6]) {
                if (contentContainer__6.scrollTop == 0 && scrollPossible) {
                    backToPlane();
                    scrollPossible = false
                }
            } else if (idPlane[5]) {
                if (contentContainer__5.scrollTop == 0 && scrollPossible) {
                    backToPlane();
                    scrollPossible = false
                }
            } else if (idPlane[4]) {
                if (contentContainer__4.scrollTop == 0 && scrollPossible) {
                    backToPlane();
                    scrollPossible = false
                }
            } else if (idPlane[3]) {
                if (contentContainer__3.scrollTop == 0 && scrollPossible) {
                    backToPlane();
                    scrollPossible = false
                }
            } else if (idPlane[2]) {
                if (contentContainer__2.scrollTop == 0 && scrollPossible) {
                    backToPlane();
                    scrollPossible = false
                }
            } else if (idPlane[1]) {
                if (contentContainer__1.scrollTop == 0 && scrollPossible) {
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

function scrollIntoWorkshop(elContent, elCredit) {
    camera.position.z = scrollWorkshop(elContent)
    if (window.matchMedia("(max-width: 1440px)").matches) {
        if (camera.position.z <= -109) {
            elCredit.scrollTop = 0
            creditContainer.classList.add('switchStreet')
            workShopContainer.classList.remove('switchPlane');
            gsap.to(workShopContainer, 1.5, { opacity: 0, ease: "Power3.easeOut" })
            gsap.to(camera.position, 3, { z: -185, ease: "power3.inOut" })
            gsap.to(leftDoor2.position, 1.5, { x: -20, ease: "power3.inOut", delay: .75 })
            gsap.to(rightDoor2.position, 1.5, { x: 20, ease: "power3.inOut", delay: .75 })
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
            elCredit.scrollTop = 0
            creditContainer.classList.add('switchStreet')
            workShopContainer.classList.remove('switchPlane');
            gsap.to(workShopContainer, 1.5, { opacity: 0, ease: "Power3.easeOut" })
            gsap.to(camera.position, 3, { z: -185, ease: "power3.inOut" })
            gsap.to(leftDoor2.position, 1.5, { x: -20, ease: "power3.inOut", delay: .75 })
            gsap.to(rightDoor2.position, 1.5, { x: 20, ease: "power3.inOut", delay: .75 })
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

    ///// SMOOTH SCROLL /////
    // Scrollbar.init(document.querySelector('#my-scrollbar'));

///// CREDIT SCROLL TRIGGER /////
function scrollTrigger(elementContainer, elementContainerImg) {
    elementContainer.addEventListener("scroll", function() {
        if (creditActive) {

            elementContainerImg.forEach(e => {
                let tl = gsap.timeline({ defaults: { ease: "expo.InOut" }}).to(e, { opacity: 1,  duration: .5 })

                  ScrollTrigger.create({
                    trigger: e.children[2].children[2],
                    start: "top center",
                    scroller: elementContainer,
                    animation: tl,
                })
            })
        }
    })  
}

scrollTrigger(scrollContainer__14, scrollContainerContentImg__14);
scrollTrigger(scrollContainer__13, scrollContainerContentImg__13);
scrollTrigger(scrollContainer__12, scrollContainerContentImg__12);
scrollTrigger(scrollContainer__11, scrollContainerContentImg__11);
scrollTrigger(scrollContainer__10, scrollContainerContentImg__10);
scrollTrigger(scrollContainer__9, scrollContainerContentImg__9);
scrollTrigger(scrollContainer__8, scrollContainerContentImg__8);
scrollTrigger(scrollContainer__7, scrollContainerContentImg__7);
scrollTrigger(scrollContainer__6, scrollContainerContentImg__6);
scrollTrigger(scrollContainer__5, scrollContainerContentImg__5);
scrollTrigger(scrollContainer__4, scrollContainerContentImg__4);
scrollTrigger(scrollContainer__3, scrollContainerContentImg__3);
scrollTrigger(scrollContainer__2, scrollContainerContentImg__2);
scrollTrigger(scrollContainer__1, scrollContainerContentImg__1);

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
            if (workshopActive && !creditActive && scrollPossible && !btnPressed) {
                backToPlane();
                btnPressed = true;
            } else if (workshopActive && creditActive) {
                backToWorkshop();
            }
            console.log("echap")
            break;
        case 13:
            if (camera.position.z == 10 && homeActive) {
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
            // console.log("1/4 : " + contentContainer__14.scrollHeight / 4)
            // console.log("2/4 : " + contentContainer__14.scrollHeight / 4 * 2)
            // console.log("3/4 : " + contentContainer__14.scrollHeight / 4 * 3)
            // console.log("4/4 : " + contentContainer__14.scrollHeight / 4 * 4)
            console.log("pos Fiche Actuelle : " + contentContainer__14.scrollTop)
            console.log("pos Crédit Actuelle : " + scrollContainer__14.scrollTop)
            console.log("Crédit : " + creditActive)
            console.log("Workshop : " + workshopActive)
            console.log("Back : " + backPossible)
            console.log("Plane Alpha : " + materialPlane14.uniforms.alpha.value)
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

    // if (!window.matchMedia("(max-width: 1024px)").matches) {
        if (camera.position.z >= 3.4 && camera.position.z <= 3.9 || camera.position.z == 4.5) {
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
    // }
};

render();