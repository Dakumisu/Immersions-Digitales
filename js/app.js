import * as THREE from "three";

// import { GLTFLoader } from 'three-gltf-loader';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import * as POSTPROCESSING from "postprocessing";
import { TweenMax as TM } from "gsap";
import { Interaction } from 'three.interaction';

import vertexShader from "./libs/glsl/vertexShader.glsl";
import fragmentShader from "./libs/glsl/fragmentShader.glsl";

import socleModel from "../assets/model/base.gltf";
import logoModel from "../assets/model/logo.gltf";
import homeModel from "../assets/model/home.gltf";

import atelier1 from "../assets/img/atelier1.png";
import atelier2 from "../assets/img/atelier2.png";
import atelier3 from "../assets/img/atelier3.jpg";
import atelier4 from "../assets/img/atelier4.jpg";
import atelier5 from "../assets/img/atelier5.png";
import atelier6 from "../assets/img/atelier6.png";
import atelier7 from "../assets/img/atelier7.jpg";
import atelier8 from "../assets/img/atelier8.png";

import particle from "../assets/img/particle.png";

////////// SCENE //////////
var scene = new THREE.Scene();

////////// CAMERA //////////
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 0, 10);

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

// const interaction = new Interaction(renderer, scene, camera);

/////// POSTPROCESSING ///////
let composer = new POSTPROCESSING.EffectComposer(renderer);

composer.addPass(new POSTPROCESSING.RenderPass(scene, camera));

const effectPass = new POSTPROCESSING.EffectPass(
    camera,
    new POSTPROCESSING.RealisticBokehEffect()
);
effectPass.renderToScreen = true;

composer.addPass(effectPass);

let rotateZ = -.2; // PLANES ROTATION

/////// LIGHTS ///////
var targetLogo = new THREE.Object3D();
targetLogo.position.set(0, 0, 0)
scene.add(targetLogo);

let light1 = new THREE.PointLight(0x4cc9f0, .1);
light1.position.set(0, 1000, 1000);
scene.add(light1);
let light2 = new THREE.PointLight(0x4cc9f0, .6);
light2.position.set(1000, 0, 0);
scene.add(light2);
let light3 = new THREE.PointLight(0x4cc9f0, .1);
light3.position.set(0, 0, -1000);
scene.add(light3);
let light4 = new THREE.PointLight(0x4cc9f0, .1);
light4.position.set(-1000, 1000, 0);
scene.add(light4);

let lightCenterPlane = new THREE.PointLight(0x4cc9f0, 1.5, 14);
lightCenterPlane.position.set(0, 0, 10)
scene.add(lightCenterPlane);

let lightCenter = new THREE.DirectionalLight(0x000000, 15);
lightCenter.position.set(0, -1.5, 0)
lightCenter.target = targetLogo;
scene.add(lightCenter);

let lightCenterSocle = new THREE.PointLight(0x000000, 120, .75);
lightCenterSocle.position.set(0, -1.5, 0)
scene.add(lightCenterSocle);

const cyanColor = new THREE.Color(0x4cc9f0);
const cyanColorReset = new THREE.Color(0x000000);

let ambientLight = new THREE.AmbientLight(0x09021e, 9);
ambientLight.position.set(0, -1000, 0)
scene.add(ambientLight);

/////// 3D MODEL ///////
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

var socle;

var loaderSocle = new GLTFLoader;
loaderSocle.crossOrigin = true

loaderSocle.load(socleModel, function (addSocle) {
    socle = addSocle.scene;
    scene.add(socle);
    socle.position.set(0, -10.7, 0)
    socle.scale.set(.7, .7, .7)
    socle.rotation.y = 0;
});

var logo;

var loaderLogo = new GLTFLoader;
loaderLogo.crossOrigin = true;

loaderLogo.load(logoModel, function (addLogo) {
    logo = addLogo.scene;
    scene.add(logo);
    logo.position.set(0, -9.8, 0)
    logo.rotation.z = -.725;
    logo.scale.set(0, 0, 0)

});

/////// PLANES ///////
var plane = new THREE.PlaneGeometry(1.6 / 1.2, .9 / 1.2);
plane.receiveShadow = true;

var materialPlane1 = new THREE.MeshPhongMaterial({
    side: THREE.DoubleSide,
    map: new THREE.TextureLoader().load(atelier1)
    // transparency: true, // TweenLite.to(mesh.material, 2, {opacity: 0}); suppr pas stp
});
var materialPlane2 = new THREE.MeshPhongMaterial({
    side: THREE.DoubleSide,
    map: new THREE.TextureLoader().load(atelier2)
});
var materialPlane3 = new THREE.MeshPhongMaterial({
    side: THREE.DoubleSide,
    map: new THREE.TextureLoader().load(atelier3)
});
var materialPlane4 = new THREE.MeshPhongMaterial({
    side: THREE.DoubleSide,
    map: new THREE.TextureLoader().load(atelier4)
});
var materialPlane5 = new THREE.MeshPhongMaterial({
    side: THREE.DoubleSide,
    map: new THREE.TextureLoader().load(atelier5)
});
var materialPlane6 = new THREE.MeshPhongMaterial({
    side: THREE.DoubleSide,
    map: new THREE.TextureLoader().load(atelier6)
});
var materialPlane7 = new THREE.MeshPhongMaterial({
    side: THREE.DoubleSide,
    map: new THREE.TextureLoader().load(atelier7)
});
var materialPlane8 = new THREE.MeshPhongMaterial({
    side: THREE.DoubleSide,
    map: new THREE.TextureLoader().load(atelier8)
});
var materialPlane9 = new THREE.MeshPhongMaterial({
    side: THREE.DoubleSide,
    map: new THREE.TextureLoader().load(atelier8)
});
var materialPlane10 = new THREE.MeshPhongMaterial({
    side: THREE.DoubleSide,
    map: new THREE.TextureLoader().load(atelier8)
});
var materialPlane11 = new THREE.MeshPhongMaterial({
    side: THREE.DoubleSide,
    map: new THREE.TextureLoader().load(atelier8)
});
var materialPlane12 = new THREE.MeshPhongMaterial({
    side: THREE.DoubleSide,
    map: new THREE.TextureLoader().load(atelier8)
});
var materialPlane13 = new THREE.MeshPhongMaterial({
    side: THREE.DoubleSide,
    map: new THREE.TextureLoader().load(atelier8)
});
var materialPlane14 = new THREE.MeshPhongMaterial({
    side: THREE.DoubleSide,
    map: new THREE.TextureLoader().load(atelier8)
});


/////// PLANES MATERIALS ///////
// var materialPlane1 = new THREE.ShaderMaterial({
//     vertexShader,
//     fragmentShader,
//     uniforms: {
//         uTime: { value: 0.0 },
//         uTexture: { value: new THREE.TextureLoader().load(atelier1) }
//     },
//     side: THREE.DoubleSide
// });
// var materialPlane2 = new THREE.ShaderMaterial({
//     vertexShader,
//     fragmentShader,
//     uniforms: {
//         uTime: {
//             value: 0.0
//         },
//         uTexture: {
//             value: new THREE.TextureLoader().load(atelier2)
//         }
//     },
//     side: THREE.DoubleSide
// });
// var materialPlane3 = new THREE.ShaderMaterial({
//     vertexShader,
//     fragmentShader,
//     uniforms: {
//         uTime: {
//             value: 0.0
//         },
//         uTexture: {
//             value: new THREE.TextureLoader().load(atelier3)
//         }
//     },
//     side: THREE.DoubleSide
// });
// var materialPlane4 = new THREE.ShaderMaterial({
//     vertexShader,
//     fragmentShader,
//     uniforms: {
//         uTime: {
//             value: 0.0
//         },
//         uTexture: {
//             value: new THREE.TextureLoader().load(atelier4)
//         }
//     },
//     side: THREE.DoubleSide
// });
// var materialPlane5 = new THREE.ShaderMaterial({
//     vertexShader,
//     fragmentShader,
//     uniforms: {
//         uTime: {
//             value: 0.0
//         },
//         uTexture: {
//             value: new THREE.TextureLoader().load(atelier5)
//         }
//     },
//     side: THREE.DoubleSide
// });
// var materialPlane6 = new THREE.ShaderMaterial({
//     vertexShader,
//     fragmentShader,
//     uniforms: {
//         uTime: {
//             value: 0.0
//         },
//         uTexture: {
//             value: new THREE.TextureLoader().load(atelier6)
//         }
//     },
//     side: THREE.DoubleSide
// });
// var materialPlane7 = new THREE.ShaderMaterial({
//     vertexShader,
//     fragmentShader,
//     uniforms: {
//         uTime: {
//             value: 0.0
//         },
//         uTexture: {
//             value: new THREE.TextureLoader().load(atelier7)
//         }
//     },
//     side: THREE.DoubleSide
// });
// var materialPlane8 = new THREE.ShaderMaterial({
//     vertexShader,
//     fragmentShader,
//     uniforms: {
//         uTime: {
//             value: 0.0
//         },
//         uTexture: {
//             value: new THREE.TextureLoader().load(atelier8)
//         }
//     },
//     side: THREE.DoubleSide
// });
// var materialPlane9 = new THREE.ShaderMaterial({
//     vertexShader,
//     fragmentShader,
//     uniforms: {
//         uTime: {
//             value: 0.0
//         },
//         uTexture: {
//             value: new THREE.TextureLoader().load(atelier8)
//         }
//     },
//     side: THREE.DoubleSide
// });
// var materialPlane10 = new THREE.ShaderMaterial({
//     vertexShader,
//     fragmentShader,
//     uniforms: {
//         uTime: {
//             value: 0.0
//         },
//         uTexture: {
//             value: new THREE.TextureLoader().load(atelier8)
//         }
//     },
//     side: THREE.DoubleSide
// });
// var materialPlane11 = new THREE.ShaderMaterial({
//     vertexShader,
//     fragmentShader,
//     uniforms: {
//         uTime: {
//             value: 0.0
//         },
//         uTexture: {
//             value: new THREE.TextureLoader().load(atelier8)
//         }
//     },
//     side: THREE.DoubleSide
// });
// var materialPlane12 = new THREE.ShaderMaterial({
//     vertexShader,
//     fragmentShader,
//     uniforms: {
//         uTime: {
//             value: 0.0
//         },
//         uTexture: {
//             value: new THREE.TextureLoader().load(atelier8)
//         }
//     },
//     side: THREE.DoubleSide
// });
// var materialPlane13 = new THREE.ShaderMaterial({
//     vertexShader,
//     fragmentShader,
//     uniforms: {
//         uTime: {
//             value: 0.0
//         },
//         uTexture: {
//             value: new THREE.TextureLoader().load(atelier8)
//         }
//     },
//     side: THREE.DoubleSide
// });
// var materialPlane14 = new THREE.ShaderMaterial({
//     vertexShader,
//     fragmentShader,
//     uniforms: {
//         uTime: {
//             value: 0.0
//         },
//         uTexture: {
//             value: new THREE.TextureLoader().load(atelier8)
//         }
//     },
//     side: THREE.DoubleSide
// });

// let loader1 = new THREE.TextureLoader();
// var image = loader1.load(atelier1, () => {
//     start();
// });
// var hover = loader1.load(atelier2);
// atelier1.style.opacity = 0;
// sizes = new THREE.Vector2(0, 0);
// offset = new THREE.Vector2(0, 0);

// var mouse = new THREE.Vector2(0, 0);
// window.addEventListener("mousemove", (ev) => {
//     onMouseMove(ev);
// });

// function start() {
//     getSizes();
//     createMesh();
// }

// function getSizes() {
//     const { width, height, top, left } = atelier1.getBoundingClientRect();

//     sizes.set(width, height);

//     offset.set(
//       left - window.innerWidth / 2 + width / 2,
//       -top + window.innerHeight / 2 - height / 2
//     );
//   }

// function createMesh() {
//     var uniforms = {
//         u_image: {
//             type: "t",
//             value: image
//         },
//         u_imagehover: {
//             type: "t",
//             value: hover
//         },
//         u_mouse: {
//             value: mouse
//         },
//         u_time: {
//             value: 0
//         },
//         u_res: {
//             value: new THREE.Vector2(window.innerWidth, window.innerHeight)
//         }
//     };

//     var materialPlane1 = new THREE.ShaderMaterial({
//         uniforms: uniforms,
//         vertexShader: vertexShader,
//         fragmentShader: fragmentShader,
//         //   defines: {
//         //     PR: window.devicePixelRatio.toFixed(1)
//         //   },
//         side: THREE.DoubleSide
//     });

//     // mesh = new THREE.Mesh(geometry, material);

//     // mesh.position.set(offset.x, offset.y, 0);
//     // mesh.scale.set(sizes.x, sizes.y, 1);

//     // scene.add(mesh);
// }

// function onMouseMove(event) {
//     TM.to(mouse, 0.5, {
//         x: (event.clientX / window.innerWidth) * 2 - 1,
//         y: -(event.clientY / window.innerHeight) * 2 + 1
//     });

//     TM.to(mesh.rotation, 0.2, {
//         x: -mouse.y * 0.1,
//         y: mouse.x * (Math.PI / 15)
//     });
// }






// let figure = new PlaneWorkshop(scene, () => {
//     this.update()
// })

// console.log(PlaneWorkshop.$image, PlaneWorkshop.$image2)

// let image = document.querySelector(".tile__image");
// let image2 = document.querySelector(".tile__image2");

// console.log(image.src, image2.src)






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
            Math.random() * 50 - 25,
            Math.random() * 50 - 40,
            Math.random() * 40 - 20) //3.4 - 1.7
    particleGeo.vertices.push(particle);
}

let particleMaterial = new THREE.PointsMaterial({
    size: 0.05, //0.018
    map: new THREE.TextureLoader().load(particle),
    blending: THREE.AdditiveBlending,
    transparent: true,
    opacity: .5
});

let particleMesh = new THREE.Points(particleGeo, particleMaterial);
scene.add(particleMesh);

/////// VARIABLES EVENTS ///////
let homeContainer = document.querySelector('.homeContainer');
let titleSvg = document.querySelector('.title');
let titleSvgPath = document.querySelectorAll('.title path');
let titleSvgCircle = document.querySelector('.title circle');
let titleSvgLine = document.querySelector('.title line');
let littleTitleSvg = document.querySelector('.littleTitle');
let littleTitleSvgPath = document.querySelectorAll('.littleTitle path');
let littleTitleSvgCircle = document.querySelector('.littleTitle circle');
let littleTitleSvgLine = document.querySelector('.littleTitle line');
let btnStart = document.querySelector('.btn__start');
let spanContainerMouseOver = document.querySelector('.spanContainerMouseover')
let spanContainerMouseOut = document.querySelector('.spanContainerMouseout')
let btnBackHome = document.querySelector('.btn__backHome');
let canvas = document.querySelector('canvas');
let sm = document.querySelectorAll('.sm');
let sm1 = document.querySelector('.sm__1');
let sm2 = document.querySelector('.sm__2');
let sm3 = document.querySelector('.sm__3');
let musicBtn = document.querySelector('.musicBtn');
let bgCol = document.querySelectorAll('.colContainer .col');
let bgRow = document.querySelectorAll('.rowContainer .row');
let cursorShape = document.querySelector('#cursor-shape');

// materialPlane1.cursor = 'pointer';
// materialPlane1.on('click', function(ev) {});
// materialPlane1.on('touchstart', function(ev) {});
// materialPlane1.on('touchend', function(ev) {});
// materialPlane1.on('mousedown', function(ev) {});
// materialPlane1.on('mouseout', function(ev) {});
// materialPlane1.on('mouseover', function(ev) {});
// materialPlane1.on('mousemove', function(ev) {});
// materialPlane1.on('mouseup', function(ev) {});

// planeMesh1.on('mouseover', function() {

// })
// planeMesh1.on('mouseout', function() {

// })

window.addEventListener('load', function() {
    TweenMax.to(bgCol, { duration: 1, clipPath: "inset(0% 0% 0% 0%)", stagger: 0.02 });
    TweenMax.to(bgCol, { duration: .5, background: '#f72585', opacity: .325, stagger: 0.02 });
    TweenMax.to(bgCol, { duration: .5, background: '#0d0437', opacity: .65, stagger: 0.02 });
    TweenMax.to(bgRow, { duration: 1, clipPath: "inset(0% 0% 0% 0%)", stagger: 0.0355555 });
    TweenMax.to(bgRow, { duration: .5, background: '#f72585', opacity: .325, stagger: 0.0355555 });
    TweenMax.to(bgRow, { duration: .5, background: '#0d0437', opacity: .65, stagger: 0.0355555 });
    TweenMax.to(bgCol, { duration: .5, background: '#f72585', opacity: .05, stagger: 0.02, repeat: -1, yoyo: true, delay: 2 });
    TweenMax.to(bgRow, { duration: .5, background: '#f72585', opacity: .05, stagger: 0.0355555, repeat: -1, yoyo: true, delay: 2 });
})

/////// BACKHOME BUTTON EVENTS ///////
function functionBtnBackHome() {

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
    gsap.to(camera.position, 3, { z: 10, ease: "power3.inOut" })
        //HTML ELEMENTS ANIM
    titleSvgPath.forEach(e => {
        e.classList.add("pathTitleIn")
        e.classList.remove("pathTitleOut")
    });
    titleSvgCircle.classList.add("pathTitleIn")
    titleSvgCircle.classList.remove("pathTitleOut")
    titleSvgLine.classList.add("pathLineIn")
    titleSvgLine.classList.remove("pathLineOut")

    littleTitleSvgPath.forEach(e => {
        e.classList.remove("pathTitleIn")
        e.classList.add("pathTitleOut")
    });
    littleTitleSvgCircle.classList.remove("pathTitleIn")
    littleTitleSvgCircle.classList.add("pathTitleOut")
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
}

btnBackHome.addEventListener('click', function () {
    functionBtnBackHome();
})

///// START BUTTON EVENTS /////
function functionBtnStart() {
    //AXES ANIM
    gsap.to(planeAxe.position, 1.5, { y: -17, ease: "power3.inOut", delay: 1.25 })
    gsap.to(planeAxe.rotation, 1.5, { y: -3.5 * Math.PI, ease: "power3.inOut", delay: 1.25 })
        //CAMERA ANIM
    gsap.to(camera.position, 3, { z: 3.7, ease: "power3.inOut" })
        //HTML ELEMENTS ANIM
    titleSvgPath.forEach(e => {
        e.classList.remove("pathTitleIn")
        e.classList.add("pathTitleOut")
    });
    titleSvgCircle.classList.remove("pathTitleIn")
    titleSvgCircle.classList.add("pathTitleOut")
    titleSvgLine.classList.remove("pathLineIn")
    titleSvgLine.classList.add("pathLineOut")

    littleTitleSvgPath.forEach(e => {
        e.classList.add("pathTitleIn")
        e.classList.remove("pathTitleOut")
    });
    littleTitleSvgCircle.classList.add("pathTitleIn")
    littleTitleSvgCircle.classList.remove("pathTitleOut")
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
    setTimeout(function () {
        btnBackHome.classList.add('open');
        btnBackHome.classList.remove('close');
        homeContainer.classList.add('open');
        homeContainer.classList.remove('close');
        canvas.style.zIndex = 1;
    }, 1500)
}

btnStart.addEventListener('click', function () {
    functionBtnStart();
})

btnStart.addEventListener('mouseover', function () {
    TweenMax.to(".spanContainerMouseover span", {
        duration: .5,
        translateY: -40,
        stagger: {
            each: 0.01,
            from: "center"
        },
        ease: "power2.inOut"
    });
    TweenMax.to(".spanContainerMouseout span", {
        duration: .5,
        translateY: 0,
        stagger: {
            each: 0.01,
            from: "center"
        },
        ease: "power2.inOut"
    });
    spanContainerMouseOut.classList.add('neonText');
    cursorShape.classList.add('mouseover');
})

btnStart.addEventListener('mouseout', function () {
    TweenMax.to(".spanContainerMouseover span", {
        duration: .5,
        translateY: 0,
        stagger: {
            each: 0.01,
            from: "center"
        },
        ease: "power2.inOut"
    });
    TweenMax.to(".spanContainerMouseout span", {
        duration: .5,
        translateY: 40,
        stagger: {
            each: 0.01,
            from: "center"
        },
        ease: "power2.inOut"
    });
    spanContainerMouseOut.classList.remove('neonText');
    cursorShape.classList.remove('mouseover');
})

document.addEventListener("keypress", function(event) {
    if (event.keyCode === 13 && camera.position.z == 20) {
        functionBtnStart();
    }
});


///// BUTTON START HOVER /////
let btnStartText = "Découvrir les ateliers"
let charsTextBtnStart = btnStartText.split('')

charsTextBtnStart.forEach(letter => {
    let btnStartchar = document.createElement('span')
    btnStartchar.innerHTML = letter
    spanContainerMouseOver.append(btnStartchar)
});

charsTextBtnStart.forEach(letter => {
    let btnStartchar = document.createElement('span')
    btnStartchar.innerHTML = letter
    spanContainerMouseOut.append(btnStartchar)
});


/////// SM HOVER ///////
sm1.classList.add('mouseout')
sm2.classList.add('mouseout')
sm3.classList.add('mouseout')

sm1.addEventListener('mouseover', function() { // POINTER SOCIAL MEDIA 1
    sm1.classList.add('mouseover')
    sm1.classList.remove('mouseout')
    sm1.classList.add('neonText')
})

sm1.addEventListener('mouseout', function() {
    sm1.classList.add('mouseout')
    sm1.classList.remove('mouseover')
    sm1.classList.remove('neonText')
})

sm2.addEventListener('mouseover', function() { // POINTER SOCIAL MEDIA 2
    sm2.classList.add('mouseover')
    sm2.classList.remove('mouseout')
    sm2.classList.add('neonText')
})

sm2.addEventListener('mouseout', function() {
    sm2.classList.add('mouseout')
    sm2.classList.remove('mouseover')
    sm2.classList.remove('neonText')
})

sm3.addEventListener('mouseover', function() { // POINTER SOCIAL MEDIA 3
    sm3.classList.add('mouseover')
    sm3.classList.remove('mouseout')
    sm3.classList.add('neonText')
})

sm3.addEventListener('mouseout', function() {
    sm3.classList.add('mouseout')
    sm3.classList.remove('mouseover')
    sm3.classList.remove('neonText')
})

///// CUSTOM CURSOR /////
const pixelRatio = window.devicePixelRatio;

Math.dist = (dx, dy) => {
    return Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2))
}

class Cursor {
    constructor() {
        this.container = window["cursor"];
        this.shape = window["cursor-shape"];
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
        this.friction = .200;
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
        this.container.style.transform = 'translate3d(' + this.translation.x.toFixed(this.precision) + 'px ,' + this.translation.y.toFixed(this.precision) + 'px, 0)';
        this.shape.style.transform = 'rotate(' + this.rotation.toFixed(this.precision) + 'deg) ' + 'scale(' + (1 + this.scale) + ', ' + (1 - this.scale) + ')';
    }

    get dx() {
        return this.mouse.x - this.translation.x;
    }

    get dy() {
        return this.mouse.y - this.translation.y;
    }
}

const _cursor = new Cursor();


///// SCROLL FUNCTIONS /////
function scrollUp() {
    if (planeAxe.position.y <= -17 && planeAxe.position.y >= -17.1) {
        //AXES ANIM
        gsap.to(planeAxe.position, 2.25, { y: -26.5, ease: "power3.inOut" })
        gsap.to(planeAxe.rotation, 2.25, { y: 0, ease: "power3.inOut" })
            //CAMERA ANIM
        gsap.to(camera.position, 3, { z: 10, ease: "power3.inOut" })
            //HTML ELEMENTS ANIM
        titleSvgPath.forEach(e => {
            e.classList.add("pathTitleIn")
            e.classList.remove("pathTitleOut")
        });
        titleSvgCircle.classList.add("pathTitleIn")
        titleSvgCircle.classList.remove("pathTitleOut")
        titleSvgLine.classList.add("pathLineIn")
        titleSvgLine.classList.remove("pathLineOut")

        littleTitleSvgPath.forEach(e => {
            e.classList.remove("pathTitleIn")
            e.classList.add("pathTitleOut")
        });
        littleTitleSvgCircle.classList.remove("pathTitleIn")
        littleTitleSvgCircle.classList.add("pathTitleOut")
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
        //AXES ANIM
        gsap.to(planeAxe.position, 2.25, { y: 4.2, ease: "power3.inOut" })
        gsap.to(planeAxe.rotation, 2.25, { y: -13.5 * Math.PI, ease: "power3.inOut" })
            //CAMERA ANIM
        gsap.to(camera.position, 3, { z: 10, ease: "power3.inOut" })
            //HTML ELEMENTS ANIM
        titleSvgPath.forEach(e => {
            e.classList.add("pathTitleIn")
            e.classList.remove("pathTitleOut")
        });
        titleSvgCircle.classList.add("pathTitleIn")
        titleSvgCircle.classList.remove("pathTitleOut")
        titleSvgLine.classList.add("pathLineIn")
        titleSvgLine.classList.remove("pathLineOut")

        littleTitleSvgPath.forEach(e => {
            e.classList.remove("pathTitleIn")
            e.classList.add("pathTitleOut")
        });
        littleTitleSvgCircle.classList.remove("pathTitleIn")
        littleTitleSvgCircle.classList.add("pathTitleOut")
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

    // PlaneWorkshop.materialPlane1.uniforms.u_time.value += 0.02;
    // materialPlane2.uniforms.uTime.value += 0.02;
    // materialPlane3.uniforms.uTime.value += 0.02;
    // materialPlane4.uniforms.uTime.value += 0.02;
    // materialPlane5.uniforms.uTime.value += 0.02;
    // materialPlane6.uniforms.uTime.value += 0.02;
    // materialPlane7.uniforms.uTime.value += 0.02;
    // materialPlane8.uniforms.uTime.value += 0.02;
    // materialPlane9.uniforms.uTime.value += 0.02;
    // materialPlane10.uniforms.uTime.value += 0.02;
    // materialPlane11.uniforms.uTime.value += 0.02;
    // materialPlane12.uniforms.uTime.value += 0.02;
    // materialPlane13.uniforms.uTime.value += 0.02;
    // materialPlane14.uniforms.uTime.value += 0.02;

};

render();