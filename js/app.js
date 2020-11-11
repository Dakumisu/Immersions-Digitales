import * as THREE from "three";
// import * as THREEx from "threex.domevents";
import { Interaction } from 'three.interaction';
import vertexShader from "./libs/glsl/vertex.glsl";
import fragmentShader from "./libs/glsl/fragment.glsl";
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
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 2000);
camera.position.set(0, 0, 2.7);

/////// MAIN RENDERER ///////
var renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
// renderer.setClearColor("#020659");
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
document.body.appendChild(renderer.domElement);

/////// RESIZE EVENT ///////
window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

})

const interaction = new Interaction(renderer, scene, camera);

/////// CENTRAL MODEL ///////
var geometry = new THREE.BoxGeometry(.8, 2.5, .8);
var material = new THREE.MeshLambertMaterial({ color: 0x0142AC });
var mesh = new THREE.Mesh(geometry, material);

scene.add(mesh);

/////// PLANES ///////
var plane = new THREE.PlaneGeometry(1.6 / 1.1, .9 / 1.1, 10, 10);

/////// PLANES MATERIALS ///////
var materialPlane1 = new THREE.ShaderMaterial({
    vertexShader,
    fragmentShader,
    uniforms: {
        uTime: { value: 0.0 },
        uTexture: { value: new THREE.TextureLoader().load(atelier1) }
    },
    side: THREE.DoubleSide
});

var materialPlane2 = new THREE.ShaderMaterial({
    vertexShader,
    fragmentShader,
    uniforms: {
        uTime: { value: 0.0 },
        uTexture: { value: new THREE.TextureLoader().load(atelier2) }
    },
    side: THREE.DoubleSide
});
var materialPlane3 = new THREE.ShaderMaterial({
    vertexShader,
    fragmentShader,
    uniforms: {
        uTime: { value: 0.0 },
        uTexture: { value: new THREE.TextureLoader().load(atelier3) }
    },
    side: THREE.DoubleSide
});
var materialPlane4 = new THREE.ShaderMaterial({
    vertexShader,
    fragmentShader,
    uniforms: {
        uTime: { value: 0.0 },
        uTexture: { value: new THREE.TextureLoader().load(atelier4) }
    },
    side: THREE.DoubleSide
});
var materialPlane5 = new THREE.ShaderMaterial({
    vertexShader,
    fragmentShader,
    uniforms: {
        uTime: { value: 0.0 },
        uTexture: { value: new THREE.TextureLoader().load(atelier5) }
    },
    side: THREE.DoubleSide
});
var materialPlane6 = new THREE.ShaderMaterial({
    vertexShader,
    fragmentShader,
    uniforms: {
        uTime: { value: 0.0 },
        uTexture: { value: new THREE.TextureLoader().load(atelier6) }
    },
    side: THREE.DoubleSide
});
var materialPlane7 = new THREE.ShaderMaterial({
    vertexShader,
    fragmentShader,
    uniforms: {
        uTime: { value: 0.0 },
        uTexture: { value: new THREE.TextureLoader().load(atelier7) }
    },
    side: THREE.DoubleSide
});
var materialPlane8 = new THREE.ShaderMaterial({
    vertexShader,
    fragmentShader,
    uniforms: {
        uTime: { value: 0.0 },
        uTexture: { value: new THREE.TextureLoader().load(atelier8) }
    },
    side: THREE.DoubleSide
});

/////// PLANE AXES ///////
var planeAxe = new THREE.Object3D();
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

pivot1.position.z = 2.25;
pivot2.position.x = -2.25;
pivot3.position.z = -2.25;
pivot4.position.x = 2.25;
pivot5.position.z = 2.25;
pivot6.position.x = -2.25;
pivot7.position.z = -2.25;
pivot8.position.x = 2.25;

planeAxe.add(pivot1, pivot2, pivot3, pivot4, pivot5, pivot6, pivot7, pivot8);

/////// PLANES MESHS ///////
var planeMesh1 = new THREE.Mesh(plane, materialPlane1);
var planeMesh2 = new THREE.Mesh(plane, materialPlane2);
var planeMesh3 = new THREE.Mesh(plane, materialPlane3);
var planeMesh4 = new THREE.Mesh(plane, materialPlane4);
var planeMesh5 = new THREE.Mesh(plane, materialPlane5);
var planeMesh6 = new THREE.Mesh(plane, materialPlane6);
var planeMesh7 = new THREE.Mesh(plane, materialPlane7);
var planeMesh8 = new THREE.Mesh(plane, materialPlane8);

planeMesh1.position.y = 4;
planeMesh2.position.y = 5;
planeMesh3.position.y = 6;
planeMesh4.position.y = 7;
planeMesh5.position.y = 8;
planeMesh6.position.y = 9;
planeMesh7.position.y = 10;
planeMesh8.position.y = 11;

planeMesh2.rotation.y = -Math.PI / 2;
planeMesh3.rotation.y = -Math.PI;
planeMesh4.rotation.y = Math.PI / 2;
planeMesh6.rotation.y = -Math.PI / 2;
planeMesh7.rotation.y = -Math.PI;
planeMesh8.rotation.y = Math.PI / 2;

// planeMesh2.rotation.z = .24;
// planeMesh3.rotation.z = .24 * 2;
// planeMesh4.rotation.z = .24 * 3;
// planeMesh5.rotation.z = .24 * 4;
// planeMesh6.rotation.z = .24 * 5;
// planeMesh7.rotation.z = .24 * 6;
// planeMesh8.rotation.z = .24 * 7;

/////// ROTATION AROUND AXIS ///////
pivot1.add(planeMesh1);
pivot2.add(planeMesh2);
pivot3.add(planeMesh3);
pivot4.add(planeMesh4);
pivot5.add(planeMesh5);
pivot6.add(planeMesh6);
pivot7.add(planeMesh7);
pivot8.add(planeMesh8);

/////// PARTICLES ///////
// particle = new THREE.SphereGeometry(0.002, 0.99, 0.99);
let particleGeo = new THREE.Geometry();
for (let i = 0; i < 800; i++) {
    let particle = new THREE.Vector3(
        Math.random() * 8 - 2,
        Math.random() * 8 - 2,
        Math.random() * 3 - 2)
    particleGeo.vertices.push(particle);
}

let particleMaterial = new THREE.PointsMaterial({
    size: 0.01,
    map: new THREE.TextureLoader().load(particle)
});

let particleMesh = new THREE.Points(particleGeo, particleMaterial);
scene.add(particleMesh);

/////// LIGHT ///////
const lightBottom = new THREE.PointLight(0xffffff, .5, 500);
lightBottom.position.set(0, -15, 0);

const lightTop = new THREE.PointLight(0xffffff, .5, 500);
lightTop.position.set(0, 15, 0);

const lightRight = new THREE.PointLight(0xffffff, 1, 500);
lightRight.position.set(3, 0, 4);

scene.add(lightBottom, lightRight, lightTop);

/////// VARIABLES EVENTS ///////
let homeContainer = document.querySelector('.homeContainer');
let h1 = document.querySelector('h1');
let btnWorkShopStart = document.querySelector('.btnWorkShopStart');
let btnStoryStart = document.querySelector('.btnStoryStart');
let btnBackHome = document.querySelector('.btnBackHome');
let btnWorkShop1 = document.querySelector('.btnWorkShop1');
let btnWorkShop2 = document.querySelector('.btnWorkShop2');
let btnWorkShop3 = document.querySelector('.btnWorkShop3');
let btnWorkShop4 = document.querySelector('.btnWorkShop4');
let btnWorkShop5 = document.querySelector('.btnWorkShop5');
let btnWorkShop6 = document.querySelector('.btnWorkShop6');
let btnWorkShop7 = document.querySelector('.btnWorkShop7');
let btnWorkShop8 = document.querySelector('.btnWorkShop8');
let canvas = document.querySelector('canvas');

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

/////// CLICS EVENTS ///////
btnBackHome.addEventListener('click', function() {
    gsap.to(planeAxe.position, 1.5, { y: 0, ease: "power3.inOut" })
    gsap.to(planeAxe.rotation, 1.5, { y: -.5 * Math.PI, ease: "power3.inOut" })
        // gsap.to(mesh.rotation, 1.5, { y: 2 * Math.PI, ease: "power1.inOut" })
    gsap.to(camera.position, 1.5, { z: 2.7, delay: .25, ease: "power3.inOut" })
    TweenMax.to(h1, .75, { opacity: 1, scale: 1, letterSpacing: '0', delay: .75, ease: "power3.inOut" })
    TweenMax.to(btnWorkShopStart, .75, { opacity: 1, clipPath: "inset(0% 0% 0% 0%)", delay: .75, ease: "power3.inOut" })
    TweenMax.to(btnStoryStart, .75, { opacity: 1, clipPath: "inset(0% 0% 0% 0%)", delay: .75, ease: "power3.inOut" })
    TweenMax.to(btnBackHome, 1, { opacity: 0, clipPath: "inset(0% 100% 0% 0%)", ease: "power3.inOut" })
    homeContainer.classList.add('close');
    homeContainer.classList.remove('open');
    btnBackHome.classList.add('close');
    btnBackHome.classList.remove('open');
    canvas.style.zIndex = -1;
})

btnWorkShopStart.addEventListener('click', function() {
    gsap.to(planeAxe.position, 1.5, { y: -4, ease: "power3.inOut" })
    gsap.to(planeAxe.rotation, 1.5, { y: 2 * Math.PI, ease: "power3.inOut" })
    gsap.to(planeAxe.scale, 0, { y: 1, x: 1, z: 1 })
        // gsap.to(mesh.rotation, 1.5, { y: .5 * Math.PI, ease: "power1.inOut" })
    gsap.to(camera.position, 1.5, { z: 3.7, ease: "power3.inOut" })
    TweenMax.to(h1, 1, { opacity: 0, scale: 1.3, letterSpacing: '1vw', ease: "power3.inOut" })
    TweenMax.to(btnWorkShopStart, 1, { opacity: 0, clipPath: "inset(0% 0% 0% 100%)", ease: "power3.inOut" })
    TweenMax.to(btnStoryStart, 1, { opacity: 0, clipPath: "inset(0% 100% 0% 0%)", ease: "power3.inOut" })
    TweenMax.to(btnBackHome, .75, { opacity: 1, clipPath: "inset(0% 0% 0% 0%)", delay: .75, ease: "power3.inOut" })
    gsap.to(planeMesh1.rotation, .75, { z: 0, ease: "power3.inOut" })
    gsap.to(planeMesh2.rotation, .75, { z: -.25, ease: "power3.inOut" })
    gsap.to(planeMesh3.rotation, .75, { z: -.25, ease: "power3.inOut" })
    gsap.to(planeMesh4.rotation, .75, { z: -.25, ease: "power3.inOut" })
    gsap.to(planeMesh5.rotation, .75, { z: -.25, ease: "power3.inOut" })
    gsap.to(planeMesh6.rotation, .75, { z: -.25, ease: "power3.inOut" })
    gsap.to(planeMesh7.rotation, .75, { z: -.25, ease: "power3.inOut" })
    gsap.to(planeMesh8.rotation, .75, { z: -.25, ease: "power3.inOut" })
    setTimeout(function() {
        btnBackHome.classList.add('open');
        btnBackHome.classList.remove('close');
        homeContainer.classList.add('open');
        homeContainer.classList.remove('close');
        canvas.style.zIndex = 1;
    }, 1500)
})

btnWorkShop1.addEventListener('click', function() {
    gsap.to(planeAxe.position, 1, { y: -4, ease: "power3.inOut" })
    gsap.to(planeAxe.rotation, 1, { y: 2 * Math.PI, ease: "power3.inOut" })
    gsap.to(planeMesh1.rotation, .75, { z: 0, ease: "power3.inOut" })
    gsap.to(planeMesh2.rotation, .75, { z: -.25, ease: "power3.inOut" })
    gsap.to(planeMesh3.rotation, .75, { z: -.25, ease: "power3.inOut" })
    gsap.to(planeMesh4.rotation, .75, { z: -.25, ease: "power3.inOut" })
    gsap.to(planeMesh5.rotation, .75, { z: -.25, ease: "power3.inOut" })
    gsap.to(planeMesh6.rotation, .75, { z: -.25, ease: "power3.inOut" })
    gsap.to(planeMesh7.rotation, .75, { z: -.25, ease: "power3.inOut" })
    gsap.to(planeMesh8.rotation, .75, { z: -.25, ease: "power3.inOut" })
})

btnWorkShop2.addEventListener('click', function() {
    gsap.to(planeAxe.position, 1, { y: -5, ease: "power3.inOut" })
    gsap.to(planeAxe.rotation, 1, { y: 2.5 * Math.PI, ease: "power3.inOut" })
    gsap.to(planeMesh1.rotation, .75, { z: -.25, ease: "power3.inOut" })
    gsap.to(planeMesh2.rotation, .75, { z: 0, ease: "power3.inOut" })
    gsap.to(planeMesh3.rotation, .75, { z: -.25, ease: "power3.inOut" })
    gsap.to(planeMesh4.rotation, .75, { z: -.25, ease: "power3.inOut" })
    gsap.to(planeMesh5.rotation, .75, { z: -.25, ease: "power3.inOut" })
    gsap.to(planeMesh6.rotation, .75, { z: -.25, ease: "power3.inOut" })
    gsap.to(planeMesh7.rotation, .75, { z: -.25, ease: "power3.inOut" })
    gsap.to(planeMesh8.rotation, .75, { z: -.25, ease: "power3.inOut" })
})

btnWorkShop3.addEventListener('click', function() {
    gsap.to(planeAxe.position, 1, { y: -6, ease: "power3.inOut" })
    gsap.to(planeAxe.rotation, 1, { y: 3 * Math.PI, ease: "power3.inOut" })
    gsap.to(planeMesh1.rotation, .75, { z: -.25, ease: "power3.inOut" })
    gsap.to(planeMesh2.rotation, .75, { z: -.25, ease: "power3.inOut" })
    gsap.to(planeMesh3.rotation, .75, { z: 0, ease: "power3.inOut" })
    gsap.to(planeMesh4.rotation, .75, { z: -.25, ease: "power3.inOut" })
    gsap.to(planeMesh5.rotation, .75, { z: -.25, ease: "power3.inOut" })
    gsap.to(planeMesh6.rotation, .75, { z: -.25, ease: "power3.inOut" })
    gsap.to(planeMesh7.rotation, .75, { z: -.25, ease: "power3.inOut" })
    gsap.to(planeMesh8.rotation, .75, { z: -.25, ease: "power3.inOut" })
})

btnWorkShop4.addEventListener('click', function() {
    gsap.to(planeAxe.position, 1, { y: -7, ease: "power3.inOut" })
    gsap.to(planeAxe.rotation, 1, { y: 3.5 * Math.PI, ease: "power3.inOut" })
    gsap.to(planeMesh1.rotation, .75, { z: -.25, ease: "power3.inOut" })
    gsap.to(planeMesh2.rotation, .75, { z: -.25, ease: "power3.inOut" })
    gsap.to(planeMesh3.rotation, .75, { z: -.25, ease: "power3.inOut" })
    gsap.to(planeMesh4.rotation, .75, { z: 0, ease: "power3.inOut" })
    gsap.to(planeMesh5.rotation, .75, { z: -.25, ease: "power3.inOut" })
    gsap.to(planeMesh6.rotation, .75, { z: -.25, ease: "power3.inOut" })
    gsap.to(planeMesh7.rotation, .75, { z: -.25, ease: "power3.inOut" })
    gsap.to(planeMesh8.rotation, .75, { z: -.25, ease: "power3.inOut" })
})

btnWorkShop5.addEventListener('click', function() {
    gsap.to(planeAxe.position, 1, { y: -8, ease: "power3.inOut" })
    gsap.to(planeAxe.rotation, 1, { y: 4 * Math.PI, ease: "power3.inOut" })
    gsap.to(planeMesh1.rotation, .75, { z: -.25, ease: "power3.inOut" })
    gsap.to(planeMesh2.rotation, .75, { z: -.25, ease: "power3.inOut" })
    gsap.to(planeMesh3.rotation, .75, { z: -.25, ease: "power3.inOut" })
    gsap.to(planeMesh4.rotation, .75, { z: -.25, ease: "power3.inOut" })
    gsap.to(planeMesh5.rotation, .75, { z: 0, ease: "power3.inOut" })
    gsap.to(planeMesh6.rotation, .75, { z: -.25, ease: "power3.inOut" })
    gsap.to(planeMesh7.rotation, .75, { z: -.25, ease: "power3.inOut" })
    gsap.to(planeMesh8.rotation, .75, { z: -.25, ease: "power3.inOut" })
})

btnWorkShop6.addEventListener('click', function() {
    gsap.to(planeAxe.position, 1, { y: -9, ease: "power3.inOut" })
    gsap.to(planeAxe.rotation, 1, { y: 4.5 * Math.PI, ease: "power3.inOut" })
    gsap.to(planeMesh1.rotation, .75, { z: -.25, ease: "power3.inOut" })
    gsap.to(planeMesh2.rotation, .75, { z: -.25, ease: "power3.inOut" })
    gsap.to(planeMesh3.rotation, .75, { z: -.25, ease: "power3.inOut" })
    gsap.to(planeMesh4.rotation, .75, { z: -.25, ease: "power3.inOut" })
    gsap.to(planeMesh5.rotation, .75, { z: -.25, ease: "power3.inOut" })
    gsap.to(planeMesh6.rotation, .75, { z: 0, ease: "power3.inOut" })
    gsap.to(planeMesh7.rotation, .75, { z: -.25, ease: "power3.inOut" })
    gsap.to(planeMesh8.rotation, .75, { z: -.25, ease: "power3.inOut" })
})

btnWorkShop7.addEventListener('click', function() {
    gsap.to(planeAxe.position, 1, { y: -10, ease: "power3.inOut" })
    gsap.to(planeAxe.rotation, 1, { y: 5 * Math.PI, ease: "power3.inOut" })
    gsap.to(planeMesh1.rotation, .75, { z: -.25, ease: "power3.inOut" })
    gsap.to(planeMesh2.rotation, .75, { z: -.25, ease: "power3.inOut" })
    gsap.to(planeMesh3.rotation, .75, { z: -.25, ease: "power3.inOut" })
    gsap.to(planeMesh4.rotation, .75, { z: -.25, ease: "power3.inOut" })
    gsap.to(planeMesh5.rotation, .75, { z: -.25, ease: "power3.inOut" })
    gsap.to(planeMesh6.rotation, .75, { z: -.25, ease: "power3.inOut" })
    gsap.to(planeMesh7.rotation, .75, { z: 0, ease: "power3.inOut" })
    gsap.to(planeMesh8.rotation, .75, { z: -.25, ease: "power3.inOut" })
})

btnWorkShop8.addEventListener('click', function() {
    gsap.to(planeAxe.position, 1, { y: -11, ease: "power3.inOut" })
    gsap.to(planeAxe.rotation, 1, { y: 5.5 * Math.PI, ease: "power3.inOut" })
    gsap.to(planeMesh1.rotation, .75, { z: -.25, ease: "power3.inOut" })
    gsap.to(planeMesh2.rotation, .75, { z: -.25, ease: "power3.inOut" })
    gsap.to(planeMesh3.rotation, .75, { z: -.25, ease: "power3.inOut" })
    gsap.to(planeMesh4.rotation, .75, { z: -.25, ease: "power3.inOut" })
    gsap.to(planeMesh5.rotation, .75, { z: -.25, ease: "power3.inOut" })
    gsap.to(planeMesh6.rotation, .75, { z: -.25, ease: "power3.inOut" })
    gsap.to(planeMesh7.rotation, .75, { z: -.25, ease: "power3.inOut" })
    gsap.to(planeMesh8.rotation, .75, { z: 0, ease: "power3.inOut" })
})

///// SCROLL EVENT ///////
document.body.addEventListener('wheel', checkScrollDirection);

function checkScrollDirection(event) {
    if (checkScrollDirectionIsUp(event)) { // SCROLL UP

        console.log("position up:" + planeAxe.position.y)

        if (planeAxe.position.y == -4) {
            gsap.to(planeAxe.position, 1.5, { y: 0, ease: "power3.inOut" })
            gsap.to(planeAxe.rotation, 1.5, { y: -.5 * Math.PI, ease: "power3.inOut" })
                // gsap.to(mesh.rotation, 1.5, { y: 2 * Math.PI, ease: "power1.inOut" })
            gsap.to(camera.position, 1.5, { z: 2.7, ease: "power3.inOut" })
            TweenMax.to(h1, .75, { opacity: 1, scale: 1, letterSpacing: '0', delay: .75, ease: "power3.inOut" })
            TweenMax.to(btnWorkShopStart, .75, { opacity: 1, clipPath: "inset(0% 0% 0% 0%)", delay: .75, ease: "power3.inOut" })
            TweenMax.to(btnStoryStart, .75, { opacity: 1, clipPath: "inset(0% 0% 0% 0%)", delay: .75, ease: "power3.inOut" })
            TweenMax.to(btnBackHome, 1, { opacity: 0, clipPath: "inset(0% 100% 0% 0%)", ease: "power3.inOut" })
            gsap.to(planeMesh1.rotation, .75, { z: -.25, ease: "power3.inOut" })
            gsap.to(planeMesh2.rotation, .75, { z: -.25, ease: "power3.inOut" })
            gsap.to(planeMesh3.rotation, .75, { z: -.25, ease: "power3.inOut" })
            gsap.to(planeMesh4.rotation, .75, { z: -.25, ease: "power3.inOut" })
            gsap.to(planeMesh5.rotation, .75, { z: -.25, ease: "power3.inOut" })
            gsap.to(planeMesh6.rotation, .75, { z: -.25, ease: "power3.inOut" })
            gsap.to(planeMesh7.rotation, .75, { z: -.25, ease: "power3.inOut" })
            gsap.to(planeMesh8.rotation, .75, { z: -.25, ease: "power3.inOut" })
            homeContainer.classList.add('close');
            homeContainer.classList.remove('open');
            btnBackHome.classList.add('close');
            btnBackHome.classList.remove('open');
            canvas.style.zIndex = -1;
        } else if (planeAxe.position.y <= -4 && planeAxe.position.y >= -5.1) {
            gsap.to(planeAxe.position, .75, { y: -4, ease: "power3.inOut" })
            gsap.to(planeAxe.rotation, .75, { y: 2 * Math.PI, ease: "power3.inOut" })
            gsap.to(planeMesh1.rotation, .75, { z: 0, ease: "power3.inOut" })
            gsap.to(planeMesh2.rotation, .75, { z: -.25, ease: "power3.inOut" })
            gsap.to(planeMesh3.rotation, .75, { z: -.25, ease: "power3.inOut" })
            gsap.to(planeMesh4.rotation, .75, { z: -.25, ease: "power3.inOut" })
            gsap.to(planeMesh5.rotation, .75, { z: -.25, ease: "power3.inOut" })
            gsap.to(planeMesh6.rotation, .75, { z: -.25, ease: "power3.inOut" })
            gsap.to(planeMesh7.rotation, .75, { z: -.25, ease: "power3.inOut" })
            gsap.to(planeMesh8.rotation, .75, { z: -.25, ease: "power3.inOut" })
        } else if (planeAxe.position.y <= -5 && planeAxe.position.y >= -6.1) {
            gsap.to(planeAxe.position, .75, { y: -5, ease: "power3.inOut" })
            gsap.to(planeAxe.rotation, .75, { y: 2.5 * Math.PI, ease: "power3.inOut" })
            gsap.to(planeMesh1.rotation, .75, { z: -.25, ease: "power3.inOut" })
            gsap.to(planeMesh2.rotation, .75, { z: 0, ease: "power3.inOut" })
            gsap.to(planeMesh3.rotation, .75, { z: -.25, ease: "power3.inOut" })
            gsap.to(planeMesh4.rotation, .75, { z: -.25, ease: "power3.inOut" })
            gsap.to(planeMesh5.rotation, .75, { z: -.25, ease: "power3.inOut" })
            gsap.to(planeMesh6.rotation, .75, { z: -.25, ease: "power3.inOut" })
            gsap.to(planeMesh7.rotation, .75, { z: -.25, ease: "power3.inOut" })
            gsap.to(planeMesh8.rotation, .75, { z: -.25, ease: "power3.inOut" })
        } else if (planeAxe.position.y <= -6 && planeAxe.position.y >= -7.1) {
            gsap.to(planeAxe.position, .75, { y: -6, ease: "power3.inOut" })
            gsap.to(planeAxe.rotation, .75, { y: 3 * Math.PI, ease: "power3.inOut" })
            gsap.to(planeMesh1.rotation, .75, { z: -.25, ease: "power3.inOut" })
            gsap.to(planeMesh2.rotation, .75, { z: -.25, ease: "power3.inOut" })
            gsap.to(planeMesh3.rotation, .75, { z: 0, ease: "power3.inOut" })
            gsap.to(planeMesh4.rotation, .75, { z: -.25, ease: "power3.inOut" })
            gsap.to(planeMesh5.rotation, .75, { z: -.25, ease: "power3.inOut" })
            gsap.to(planeMesh6.rotation, .75, { z: -.25, ease: "power3.inOut" })
            gsap.to(planeMesh7.rotation, .75, { z: -.25, ease: "power3.inOut" })
            gsap.to(planeMesh8.rotation, .75, { z: -.25, ease: "power3.inOut" })
        } else if (planeAxe.position.y <= -7 && planeAxe.position.y >= -8.1) {
            gsap.to(planeAxe.position, .75, { y: -7, ease: "power3.inOut" })
            gsap.to(planeAxe.rotation, .75, { y: 3.5 * Math.PI, ease: "power3.inOut" })
            gsap.to(planeMesh1.rotation, .75, { z: -.25, ease: "power3.inOut" })
            gsap.to(planeMesh2.rotation, .75, { z: -.25, ease: "power3.inOut" })
            gsap.to(planeMesh3.rotation, .75, { z: -.25, ease: "power3.inOut" })
            gsap.to(planeMesh4.rotation, .75, { z: 0, ease: "power3.inOut" })
            gsap.to(planeMesh5.rotation, .75, { z: -.25, ease: "power3.inOut" })
            gsap.to(planeMesh6.rotation, .75, { z: -.25, ease: "power3.inOut" })
            gsap.to(planeMesh7.rotation, .75, { z: -.25, ease: "power3.inOut" })
            gsap.to(planeMesh8.rotation, .75, { z: -.25, ease: "power3.inOut" })
        } else if (planeAxe.position.y <= -8 && planeAxe.position.y >= -9.1) {
            gsap.to(planeAxe.position, .75, { y: -8, ease: "power3.inOut" })
            gsap.to(planeAxe.rotation, .75, { y: 4 * Math.PI, ease: "power3.inOut" })
            gsap.to(planeMesh1.rotation, .75, { z: -.25, ease: "power3.inOut" })
            gsap.to(planeMesh2.rotation, .75, { z: -.25, ease: "power3.inOut" })
            gsap.to(planeMesh3.rotation, .75, { z: -.25, ease: "power3.inOut" })
            gsap.to(planeMesh4.rotation, .75, { z: -.25, ease: "power3.inOut" })
            gsap.to(planeMesh5.rotation, .75, { z: 0, ease: "power3.inOut" })
            gsap.to(planeMesh6.rotation, .75, { z: -.25, ease: "power3.inOut" })
            gsap.to(planeMesh7.rotation, .75, { z: -.25, ease: "power3.inOut" })
            gsap.to(planeMesh8.rotation, .75, { z: -.25, ease: "power3.inOut" })
        } else if (planeAxe.position.y <= -9 && planeAxe.position.y >= -10.1) {
            gsap.to(planeAxe.position, .75, { y: -9, ease: "power3.inOut" })
            gsap.to(planeAxe.rotation, .75, { y: 4.5 * Math.PI, ease: "power3.inOut" })
            gsap.to(planeMesh1.rotation, .75, { z: -.25, ease: "power3.inOut" })
            gsap.to(planeMesh2.rotation, .75, { z: -.25, ease: "power3.inOut" })
            gsap.to(planeMesh3.rotation, .75, { z: -.25, ease: "power3.inOut" })
            gsap.to(planeMesh4.rotation, .75, { z: -.25, ease: "power3.inOut" })
            gsap.to(planeMesh5.rotation, .75, { z: -.25, ease: "power3.inOut" })
            gsap.to(planeMesh6.rotation, .75, { z: 0, ease: "power3.inOut" })
            gsap.to(planeMesh7.rotation, .75, { z: -.25, ease: "power3.inOut" })
            gsap.to(planeMesh8.rotation, .75, { z: -.25, ease: "power3.inOut" })
        } else if (planeAxe.position.y == -11) {
            gsap.to(planeAxe.position, .75, { y: -10, ease: "power3.inOut" })
            gsap.to(planeAxe.rotation, .75, { y: 5 * Math.PI, ease: "power3.inOut" })
            gsap.to(planeMesh1.rotation, .75, { z: -.25, ease: "power3.inOut" })
            gsap.to(planeMesh2.rotation, .75, { z: -.25, ease: "power3.inOut" })
            gsap.to(planeMesh3.rotation, .75, { z: -.25, ease: "power3.inOut" })
            gsap.to(planeMesh4.rotation, .75, { z: -.25, ease: "power3.inOut" })
            gsap.to(planeMesh5.rotation, .75, { z: -.25, ease: "power3.inOut" })
            gsap.to(planeMesh6.rotation, .75, { z: -.25, ease: "power3.inOut" })
            gsap.to(planeMesh7.rotation, .75, { z: 0, ease: "power3.inOut" })
            gsap.to(planeMesh8.rotation, .75, { z: -.25, ease: "power3.inOut" })
        }

        // if (planeAxe.position.y <= 0) {
        // planeMesh1.rotation.z += .03; // POSITION ROTATION Z
        // planeMesh2.rotation.z += .03; // POSITION ROTATION Z
        // planeMesh3.rotation.z += .03; // POSITION ROTATION Z
        // planeMesh4.rotation.z += .03; // POSITION ROTATION Z
        // planeMesh5.rotation.z += .03; // POSITION ROTATION Z
        // planeMesh6.rotation.z += .03; // POSITION ROTATION Z
        // planeMesh7.rotation.z += .03; // POSITION ROTATION Z
        // planeMesh8.rotation.z += .03; // POSITION ROTATION Z

        // } else {
        //     planeMesh1.rotation.z -= .03; // POSITION ROTATION Z
        //     planeMesh2.rotation.z -= .03; // POSITION ROTATION Z
        //     planeMesh3.rotation.z -= .03; // POSITION ROTATION Z
        //     planeMesh4.rotation.z -= .03; // POSITION ROTATION Z
        //     planeMesh5.rotation.z -= .03; // POSITION ROTATION Z
        //     planeMesh6.rotation.z -= .03; // POSITION ROTATION Z
        //     planeMesh7.rotation.z -= .03; // POSITION ROTATION Z
        //     planeMesh8.rotation.z -= .03; // POSITION ROTATION Z

        // }

    } else { // SCROLL DOWN

        if (planeAxe.position.y == 0 && camera.position.z == 3.8) {
            gsap.to(planeAxe.position, 1.5, { y: -4, ease: "power3.inOut" })
            gsap.to(planeAxe.rotation, 1.5, { y: 2 * Math.PI, ease: "power3.inOut" })

        } else if (planeAxe.position.y <= -4 && planeAxe.position.y >= -4.9) {
            gsap.to(planeAxe.position, .75, { y: -5, ease: "power3.inOut" })
            gsap.to(planeAxe.rotation, .75, { y: 2.5 * Math.PI, ease: "power3.inOut" })
            gsap.to(planeMesh1.rotation, .75, { z: -.25, ease: "power3.inOut" })
            gsap.to(planeMesh2.rotation, .75, { z: 0, ease: "power3.inOut" })
            gsap.to(planeMesh3.rotation, .75, { z: -.25, ease: "power3.inOut" })
            gsap.to(planeMesh4.rotation, .75, { z: -.25, ease: "power3.inOut" })
            gsap.to(planeMesh5.rotation, .75, { z: -.25, ease: "power3.inOut" })
            gsap.to(planeMesh6.rotation, .75, { z: -.25, ease: "power3.inOut" })
            gsap.to(planeMesh7.rotation, .75, { z: -.25, ease: "power3.inOut" })
            gsap.to(planeMesh8.rotation, .75, { z: -.25, ease: "power3.inOut" })
        } else if (planeAxe.position.y <= -5 && planeAxe.position.y >= -5.9) {
            gsap.to(planeAxe.position, .75, { y: -6, ease: "power3.inOut" })
            gsap.to(planeAxe.rotation, .75, { y: 3 * Math.PI, ease: "power3.inOut" })
            gsap.to(planeMesh1.rotation, .75, { z: -.25, ease: "power3.inOut" })
            gsap.to(planeMesh2.rotation, .75, { z: -.25, ease: "power3.inOut" })
            gsap.to(planeMesh3.rotation, .75, { z: 0, ease: "power3.inOut" })
            gsap.to(planeMesh4.rotation, .75, { z: -.25, ease: "power3.inOut" })
            gsap.to(planeMesh5.rotation, .75, { z: -.25, ease: "power3.inOut" })
            gsap.to(planeMesh6.rotation, .75, { z: -.25, ease: "power3.inOut" })
            gsap.to(planeMesh7.rotation, .75, { z: -.25, ease: "power3.inOut" })
            gsap.to(planeMesh8.rotation, .75, { z: -.25, ease: "power3.inOut" })
        } else if (planeAxe.position.y <= -6 && planeAxe.position.y >= -6.9) {
            gsap.to(planeAxe.position, .75, { y: -7, ease: "power3.inOut" })
            gsap.to(planeAxe.rotation, .75, { y: 3.5 * Math.PI, ease: "power3.inOut" })
            gsap.to(planeMesh1.rotation, .75, { z: -.25, ease: "power3.inOut" })
            gsap.to(planeMesh2.rotation, .75, { z: -.25, ease: "power3.inOut" })
            gsap.to(planeMesh3.rotation, .75, { z: -.25, ease: "power3.inOut" })
            gsap.to(planeMesh4.rotation, .75, { z: 0, ease: "power3.inOut" })
            gsap.to(planeMesh5.rotation, .75, { z: -.25, ease: "power3.inOut" })
            gsap.to(planeMesh6.rotation, .75, { z: -.25, ease: "power3.inOut" })
            gsap.to(planeMesh7.rotation, .75, { z: -.25, ease: "power3.inOut" })
            gsap.to(planeMesh8.rotation, .75, { z: -.25, ease: "power3.inOut" })
        } else if (planeAxe.position.y <= -7 && planeAxe.position.y >= -7.9) {
            gsap.to(planeAxe.position, .75, { y: -8, ease: "power3.inOut" })
            gsap.to(planeAxe.rotation, .75, { y: 4 * Math.PI, ease: "power3.inOut" })
            gsap.to(planeMesh1.rotation, .75, { z: -.25, ease: "power3.inOut" })
            gsap.to(planeMesh2.rotation, .75, { z: -.25, ease: "power3.inOut" })
            gsap.to(planeMesh3.rotation, .75, { z: -.25, ease: "power3.inOut" })
            gsap.to(planeMesh4.rotation, .75, { z: -.25, ease: "power3.inOut" })
            gsap.to(planeMesh5.rotation, .75, { z: 0, ease: "power3.inOut" })
            gsap.to(planeMesh6.rotation, .75, { z: -.25, ease: "power3.inOut" })
            gsap.to(planeMesh7.rotation, .75, { z: -.25, ease: "power3.inOut" })
            gsap.to(planeMesh8.rotation, .75, { z: -.25, ease: "power3.inOut" })
        } else if (planeAxe.position.y <= -8 && planeAxe.position.y >= -8.9) {
            gsap.to(planeAxe.position, .75, { y: -9, ease: "power3.inOut" })
            gsap.to(planeAxe.rotation, .75, { y: 4.5 * Math.PI, ease: "power3.inOut" })
            gsap.to(planeMesh1.rotation, .75, { z: -.25, ease: "power3.inOut" })
            gsap.to(planeMesh2.rotation, .75, { z: -.25, ease: "power3.inOut" })
            gsap.to(planeMesh3.rotation, .75, { z: -.25, ease: "power3.inOut" })
            gsap.to(planeMesh4.rotation, .75, { z: -.25, ease: "power3.inOut" })
            gsap.to(planeMesh5.rotation, .75, { z: -.25, ease: "power3.inOut" })
            gsap.to(planeMesh6.rotation, .75, { z: 0, ease: "power3.inOut" })
            gsap.to(planeMesh7.rotation, .75, { z: -.25, ease: "power3.inOut" })
            gsap.to(planeMesh8.rotation, .75, { z: -.25, ease: "power3.inOut" })
        } else if (planeAxe.position.y <= -9 && planeAxe.position.y >= -9.9) {
            gsap.to(planeAxe.position, .75, { y: -10, ease: "power3.inOut" })
            gsap.to(planeAxe.rotation, .75, { y: 5 * Math.PI, ease: "power3.inOut" })
            gsap.to(planeMesh1.rotation, .75, { z: -.25, ease: "power3.inOut" })
            gsap.to(planeMesh2.rotation, .75, { z: -.25, ease: "power3.inOut" })
            gsap.to(planeMesh3.rotation, .75, { z: -.25, ease: "power3.inOut" })
            gsap.to(planeMesh4.rotation, .75, { z: -.25, ease: "power3.inOut" })
            gsap.to(planeMesh5.rotation, .75, { z: -.25, ease: "power3.inOut" })
            gsap.to(planeMesh6.rotation, .75, { z: -.25, ease: "power3.inOut" })
            gsap.to(planeMesh7.rotation, .75, { z: 0, ease: "power3.inOut" })
            gsap.to(planeMesh8.rotation, .75, { z: -.25, ease: "power3.inOut" })
        } else if (planeAxe.position.y <= -10 && planeAxe.position.y >= -10.9) {
            gsap.to(planeAxe.position, .75, { y: -11, ease: "power3.inOut" })
            gsap.to(planeAxe.rotation, .75, { y: 5.5 * Math.PI, ease: "power3.inOut" })
            gsap.to(planeMesh1.rotation, .75, { z: -.25, ease: "power3.inOut" })
            gsap.to(planeMesh2.rotation, .75, { z: -.25, ease: "power3.inOut" })
            gsap.to(planeMesh3.rotation, .75, { z: -.25, ease: "power3.inOut" })
            gsap.to(planeMesh4.rotation, .75, { z: -.25, ease: "power3.inOut" })
            gsap.to(planeMesh5.rotation, .75, { z: -.25, ease: "power3.inOut" })
            gsap.to(planeMesh6.rotation, .75, { z: -.25, ease: "power3.inOut" })
            gsap.to(planeMesh7.rotation, .75, { z: -.25, ease: "power3.inOut" })
            gsap.to(planeMesh8.rotation, .75, { z: 0, ease: "power3.inOut" })
        } else if (planeAxe.position.y <= -11 && planeAxe.position.y >= -11.9) {
            gsap.to(planeAxe.position, 1.5, { y: -15, ease: "power3.inOut" })
            gsap.to(planeAxe.rotation, 1.5, { y: 7 * Math.PI, ease: "power3.inOut" })
            gsap.to(camera.position, 1.5, { z: 2.7, ease: "power3.inOut" })
            TweenMax.to(h1, .75, { opacity: 1, scale: 1, letterSpacing: '0', delay: .75, ease: "power3.inOut" })
            TweenMax.to(btnWorkShopStart, .75, { opacity: 1, clipPath: "inset(0% 0% 0% 0%)", delay: .75, ease: "power3.inOut" })
            TweenMax.to(btnStoryStart, .75, { opacity: 1, clipPath: "inset(0% 0% 0% 0%)", delay: .75, ease: "power3.inOut" })
            TweenMax.to(btnBackHome, 1, { opacity: 0, clipPath: "inset(0% 100% 0% 0%)", ease: "power3.inOut" })
            gsap.to(planeMesh1.rotation, .75, { z: -.25, ease: "power3.inOut" })
            gsap.to(planeMesh2.rotation, .75, { z: -.25, ease: "power3.inOut" })
            gsap.to(planeMesh3.rotation, .75, { z: -.25, ease: "power3.inOut" })
            gsap.to(planeMesh4.rotation, .75, { z: -.25, ease: "power3.inOut" })
            gsap.to(planeMesh5.rotation, .75, { z: -.25, ease: "power3.inOut" })
            gsap.to(planeMesh6.rotation, .75, { z: -.25, ease: "power3.inOut" })
            gsap.to(planeMesh7.rotation, .75, { z: -.25, ease: "power3.inOut" })
            gsap.to(planeMesh8.rotation, .75, { z: -.25, ease: "power3.inOut" })
            homeContainer.classList.add('close');
            homeContainer.classList.remove('open');
            btnBackHome.classList.add('close');
            btnBackHome.classList.remove('open');
            canvas.style.zIndex = -1;

            gsap.to(planeAxe.position, 0, { y: 0, delay: 1.5 })
            gsap.to(planeAxe.rotation, 0, { y: -.5 * Math.PI, delay: 1.5 })
            gsap.to(planeAxe.scale, 0, { y: 0.0001, x: 0.0001, z: 0.0001, delay: 1.5 })
        }

        console.log("position down:" + planeAxe.position.y)


        // if (planeAxe.position.y >= 0) {
        //     planeMesh1.rotation.z += .03; // POSITION ROTATION Z
        //     planeMesh2.rotation.z += .03; // POSITION ROTATION Z
        //     planeMesh3.rotation.z += .03; // POSITION ROTATION Z
        //     planeMesh4.rotation.z += .03; // POSITION ROTATION Z
        //     planeMesh5.rotation.z += .03; // POSITION ROTATION Z
        //     planeMesh6.rotation.z += .03; // POSITION ROTATION Z
        //     planeMesh7.rotation.z += .03; // POSITION ROTATION Z
        //     planeMesh8.rotation.z += .03; // POSITION ROTATION Z

        // } else {
        //     planeMesh1.rotation.z -= .03; // POSITION ROTATION Z
        //     planeMesh2.rotation.z -= .03; // POSITION ROTATION Z
        //     planeMesh3.rotation.z -= .03; // POSITION ROTATION Z
        //     planeMesh4.rotation.z -= .03; // POSITION ROTATION Z
        //     planeMesh5.rotation.z -= .03; // POSITION ROTATION Z
        //     planeMesh6.rotation.z -= .03; // POSITION ROTATION Z
        //     planeMesh7.rotation.z -= .03; // POSITION ROTATION Z
        //     planeMesh8.rotation.z -= .03; // POSITION ROTATION Z

        // }

    }
}

/////// REVERSE SCROLL ///////
function checkScrollDirectionIsUp(event) {
    if (event.wheelDeltaY) {
        return event.wheelDeltaY > 0;
    }
    return event.deltaY < 0;
}

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

var render = function() {
    requestAnimationFrame(render);

    mesh.rotation.y += 0.004;

    particleMesh.rotation.y += 0.001;

    renderer.render(scene, camera);

    if (materialPlane1.uniforms.uTime.value == 1) {
        materialPlane1.uniforms.uTime.value -= 0.02;
        materialPlane2.uniforms.uTime.value -= 0.02;
        materialPlane3.uniforms.uTime.value -= 0.02;
        materialPlane4.uniforms.uTime.value -= 0.02;
        materialPlane5.uniforms.uTime.value -= 0.02;
        materialPlane6.uniforms.uTime.value -= 0.02;
        materialPlane7.uniforms.uTime.value -= 0.02;
        materialPlane8.uniforms.uTime.value -= 0.02;
    } else {
        materialPlane1.uniforms.uTime.value += 0.02;
        materialPlane2.uniforms.uTime.value += 0.02;
        materialPlane3.uniforms.uTime.value += 0.02;
        materialPlane4.uniforms.uTime.value += 0.02;
        materialPlane5.uniforms.uTime.value += 0.02;
        materialPlane6.uniforms.uTime.value += 0.02;
        materialPlane7.uniforms.uTime.value += 0.02;
        materialPlane8.uniforms.uTime.value += 0.02;
    }
};

render();