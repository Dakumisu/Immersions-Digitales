import * as THREE from "three";
import vertexShader from "./glsl/vertex.glsl";
import fragmentShader from "./glsl/fragment.glsl";
import img from "../assets/img/atelier1.png";


////////// SCENE //////////
var scene = new THREE.Scene();
// var cssScene = new THREE.Scene();

////////// CAMERA //////////
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 2000);
camera.position.set(0, 0, 280);

/////// MAIN RENDERER ///////
var renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setClearColor("#020659");
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
document.body.appendChild(renderer.domElement);

var clock = new THREE.Clock();

/////// RESIZE EVENT ///////
window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

})

/////// CENTRAL MODEL ///////
var geometry = new THREE.BoxGeometry(200, 200, 200);
var material = new THREE.MeshLambertMaterial({ color: 0x0142AC });
var mesh = new THREE.Mesh(geometry, material);

scene.add(mesh);


/////// PLANES ///////
var plane = new THREE.PlaneGeometry(16, 9, 25, 25);

/////// PLANES MATERIALS ///////
var materialPlane1 = new THREE.ShaderMaterial({
    vertexShader,
    fragmentShader,
    uniforms: {
        uTime: { value: 0.0 },
        uTexture: { value: new THREE.TextureLoader().load(img) }
    },
    side: THREE.DoubleSide
});
var materialPlane2 = new THREE.MeshLambertMaterial({
    map: new THREE.TextureLoader().load('./assets/img/atelier2.png'),
    side: THREE.DoubleSide
});
var materialPlane3 = new THREE.MeshLambertMaterial({
    map: new THREE.TextureLoader().load('./assets/img/atelier3.png'),
    side: THREE.DoubleSide
});
var materialPlane4 = new THREE.MeshLambertMaterial({
    map: new THREE.TextureLoader().load('./assets/img/atelier4.png'),
    side: THREE.DoubleSide
});
var materialPlane5 = new THREE.MeshLambertMaterial({
    map: new THREE.TextureLoader().load('./assets/img/atelier5.png'),
    side: THREE.DoubleSide
});
var materialPlane6 = new THREE.MeshLambertMaterial({
    map: new THREE.TextureLoader().load('./assets/img/atelier6.png'),
    side: THREE.DoubleSide
});
var materialPlane7 = new THREE.MeshLambertMaterial({
    map: new THREE.TextureLoader().load('./assets/img/atelier7.png'),
    side: THREE.DoubleSide
});
var materialPlane8 = new THREE.MeshLambertMaterial({
    map: new THREE.TextureLoader().load('./assets/img/atelier8.png'),
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

pivot1.position.z = 200;
pivot2.position.x = -200;
pivot3.position.z = -200;
pivot4.position.x = 200;
pivot5.position.z = 200;
pivot6.position.x = -200;
pivot7.position.z = -200;
pivot8.position.x = 200;

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

planeMesh1.position.y = 400;
planeMesh2.position.y = 500;
planeMesh3.position.y = 600;
planeMesh4.position.y = 700;
planeMesh5.position.y = 800;
planeMesh6.position.y = 900;
planeMesh7.position.y = 1000;
planeMesh8.position.y = 1100;

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

/////// LIGHT ///////
const lightBottom = new THREE.PointLight(0xffffff, .5, 500);
lightBottom.position.set(0, -15, 0);

const lightTop = new THREE.PointLight(0xffffff, .5, 500);
lightTop.position.set(0, 15, 0);

const lightRight = new THREE.PointLight(0xffffff, 1, 500);
lightRight.position.set(3, 0, 400);

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

/////// CLICS EVENTS ///////
btnBackHome.addEventListener('click', function() {
    gsap.to(planeAxe.position, 1.5, { y: 0, ease: "power3.inOut" })
    gsap.to(planeAxe.rotation, 1.5, { y: -.5 * Math.PI, ease: "power3.inOut" })
    // gsap.to(mesh.rotation, 1.5, { y: 2 * Math.PI, ease: "power1.inOut" })
    gsap.to(camera.position, 1.5, { z: 280, ease: "power3.inOut" })
    TweenMax.to("h1", .75, { opacity: 1, scale: 1, letterSpacing: '0', delay: .75, ease: "power3.inOut" })
    TweenMax.to(".btnWorkShopStart", .75, { opacity: 1, clipPath: "inset(0% 0% 0% 0%)", delay: .75, ease: "power3.inOut" })
    TweenMax.to(".btnStoryStart", .75, { opacity: 1, clipPath: "inset(0% 0% 0% 0%)", delay: .75, ease: "power3.inOut" })
    TweenMax.to(".btnBackHome", 1, { opacity: 0, clipPath: "inset(0% 100% 0% 0%)", ease: "power3.inOut" })
    homeContainer.classList.add('close');
    homeContainer.classList.remove('open');
    btnBackHome.classList.add('close');
    btnBackHome.classList.remove('open');
})

btnWorkShopStart.addEventListener('click', function() {
    gsap.to(planeAxe.position, 1.5, { y: -400, ease: "power3.inOut" })
    gsap.to(planeAxe.rotation, 1.5, { y: 2 * Math.PI, ease: "power3.inOut" })
    // gsap.to(mesh.rotation, 1.5, { y: .5 * Math.PI, ease: "power1.inOut" })
    gsap.to(camera.position, 1.5, { z: 380, ease: "power3.inOut" })
    TweenMax.to("h1", 1, { opacity: 0, scale: 1.3, letterSpacing: '1vw', ease: "power3.inOut" })
    TweenMax.to(".btnWorkShopStart", 1, { opacity: 0, clipPath: "inset(0% 0% 0% 100%)", ease: "power3.inOut" })
    TweenMax.to(".btnStoryStart", 1, { opacity: 0, clipPath: "inset(0% 100% 0% 0%)", ease: "power3.inOut" })
    TweenMax.to(".btnBackHome", .75, { opacity: 1, clipPath: "inset(0% 0% 0% 0%)", delay: .75, ease: "power3.inOut" })
    setTimeout(function() {
        btnBackHome.classList.add('open');
        btnBackHome.classList.remove('close');
        homeContainer.classList.add('open');
        homeContainer.classList.remove('close');
    }, 1500)
})

btnWorkShop1.addEventListener('click', function() {
    gsap.to(planeAxe.position, 1, { y: -400, ease: "power3.inOut" })
    gsap.to(planeAxe.rotation, 1, { y: 2 * Math.PI, ease: "power3.inOut" })
})

btnWorkShop2.addEventListener('click', function() {
    gsap.to(planeAxe.position, 1, { y: -500, ease: "power3.inOut" })
    gsap.to(planeAxe.rotation, 1, { y: 2.5 * Math.PI, ease: "power3.inOut" })
})

btnWorkShop3.addEventListener('click', function() {
    gsap.to(planeAxe.position, 1, { y: -600, ease: "power3.inOut" })
    gsap.to(planeAxe.rotation, 1, { y: 3 * Math.PI, ease: "power3.inOut" })
})

btnWorkShop4.addEventListener('click', function() {
    gsap.to(planeAxe.position, 1, { y: -700, ease: "power3.inOut" })
    gsap.to(planeAxe.rotation, 1, { y: 3.5 * Math.PI, ease: "power3.inOut" })
})

btnWorkShop5.addEventListener('click', function() {
    gsap.to(planeAxe.position, 1, { y: -800, ease: "power3.inOut" })
    gsap.to(planeAxe.rotation, 1, { y: 4 * Math.PI, ease: "power3.inOut" })
})

btnWorkShop6.addEventListener('click', function() {
    gsap.to(planeAxe.position, 1, { y: -900, ease: "power3.inOut" })
    gsap.to(planeAxe.rotation, 1, { y: 4.5 * Math.PI, ease: "power3.inOut" })
})

btnWorkShop7.addEventListener('click', function() {
    gsap.to(planeAxe.position, 1, { y: -1000, ease: "power3.inOut" })
    gsap.to(planeAxe.rotation, 1, { y: 5 * Math.PI, ease: "power3.inOut" })
})

btnWorkShop8.addEventListener('click', function() {
    gsap.to(planeAxe.position, 1, { y: -1100, ease: "power3.inOut" })
    gsap.to(planeAxe.rotation, 1, { y: 5.5 * Math.PI, ease: "power3.inOut" })
})

///// SCROLL EVENT ///////
document.body.addEventListener('wheel', checkScrollDirection);

function checkScrollDirection(event) {
    if (checkScrollDirectionIsUp(event)) { // SCROLL UP
        
        console.log("position:" + planeAxe.position.y)
        console.log("rotation:" + planeAxe.rotation.y)
        
        if (planeAxe.position.y == -400) {
            gsap.to(planeAxe.position, 1.5, { y: 0, ease: "power3.inOut" })
            gsap.to(planeAxe.rotation, 1.5, { y: .5 * Math.PI, ease: "power3.inOut" })
        } else if (planeAxe.position.y <= -400 && planeAxe.position.y >= -501) {
            gsap.to(planeAxe.position, .75, { y: -400, ease: "power3.inOut" })
            gsap.to(planeAxe.rotation, .75, { y: 2 * Math.PI, ease: "power3.inOut" })
        } else if (planeAxe.position.y <= -500 && planeAxe.position.y >= -601) {
            gsap.to(planeAxe.position, .75, { y: -500, ease: "power3.inOut" })
            gsap.to(planeAxe.rotation, .75, { y: 2.5 * Math.PI, ease: "power3.inOut" })
        } else if (planeAxe.position.y <= -600 && planeAxe.position.y >= -701) {
            gsap.to(planeAxe.position, .75, { y: -600, ease: "power3.inOut" })
            gsap.to(planeAxe.rotation, .75, { y: 3 * Math.PI, ease: "power3.inOut" })
        } else if (planeAxe.position.y <= -700 && planeAxe.position.y >= -801) {
            gsap.to(planeAxe.position, .75, { y: -700, ease: "power3.inOut" })
            gsap.to(planeAxe.rotation, .75, { y: 3.5 * Math.PI, ease: "power3.inOut" })
        } else if (planeAxe.position.y <= -800 && planeAxe.position.y >= -901) {
            gsap.to(planeAxe.position, .75, { y: -800, ease: "power3.inOut" })
            gsap.to(planeAxe.rotation, .75, { y: 4 * Math.PI, ease: "power3.inOut" })
        } else if (planeAxe.position.y <= -900 && planeAxe.position.y >= -1001) {
            gsap.to(planeAxe.position, .75, { y: -900, ease: "power3.inOut" })
            gsap.to(planeAxe.rotation, .75, { y: 4.5 * Math.PI, ease: "power3.inOut" })
        } else if (planeAxe.position.y <= -1000 && planeAxe.position.y >= -1101) {
            gsap.to(planeAxe.position, .75, { y: -1000, ease: "power3.inOut" })
            gsap.to(planeAxe.rotation, .75, { y: 5 * Math.PI, ease: "power3.inOut" })
        }
        
        // if (planeAxe.position.y <= 0) {
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
                
            } else { // SCROLL DOWN
                
                if (planeAxe.position.y == 0 && camera.position.z == 380) {
                    gsap.to(planeAxe.position, 1.5, { y: -400, ease: "power3.inOut" })
                    gsap.to(planeAxe.rotation, 1.5, { y: 2 * Math.PI, ease: "power3.inOut" })
        } else if (planeAxe.position.y <= -400 && planeAxe.position.y >= -499) {
            gsap.to(planeAxe.position, .75, { y: -500, ease: "power3.inOut" })
            gsap.to(planeAxe.rotation, .75, { y: 2.5 * Math.PI, ease: "power3.inOut" })
        } else if (planeAxe.position.y <= -500 && planeAxe.position.y >= -599) {
            gsap.to(planeAxe.position, .75, { y: -600, ease: "power3.inOut" })
            gsap.to(planeAxe.rotation, .75, { y: 3 * Math.PI, ease: "power3.inOut" })
        } else if (planeAxe.position.y <= -600 && planeAxe.position.y >= -699) {
            gsap.to(planeAxe.position, .75, { y: -700, ease: "power3.inOut" })
            gsap.to(planeAxe.rotation, .75, { y: 3.5 * Math.PI, ease: "power3.inOut" })
        } else if (planeAxe.position.y <= -700 && planeAxe.position.y >= -799) {
            gsap.to(planeAxe.position, .75, { y: -800, ease: "power3.inOut" })
            gsap.to(planeAxe.rotation, .75, { y: 4 * Math.PI, ease: "power3.inOut" })
        } else if (planeAxe.position.y <= -800 && planeAxe.position.y >= -899) {
            gsap.to(planeAxe.position, .75, { y: -900, ease: "power3.inOut" })
            gsap.to(planeAxe.rotation, .75, { y: 4.5 * Math.PI, ease: "power3.inOut" })
        } else if (planeAxe.position.y <= -900 && planeAxe.position.y >= -999) {
            gsap.to(planeAxe.position, .75, { y: -1000, ease: "power3.inOut" })
            gsap.to(planeAxe.rotation, .75, { y: 5 * Math.PI, ease: "power3.inOut" })
        } else if (planeAxe.position.y <= -1000 && planeAxe.position.y >= -1099) {
            gsap.to(planeAxe.position, .75, { y: -1100, ease: "power3.inOut" })
            gsap.to(planeAxe.rotation, .75, { y: 5.5 * Math.PI, ease: "power3.inOut" })
        } else if (planeAxe.position.y <= -1100 && planeAxe.position.y >= -1199) {
            gsap.to(planeAxe.position, 1.5, { y: -1500, ease: "power3.inOut" })
            gsap.to(planeAxe.rotation, 1.5, { y: 7 * Math.PI, ease: "power3.inOut" })
        }
        
        console.log("position:" + planeAxe.position.y)
        console.log("rotation:" + planeAxe.rotation.y)
        
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

var render = function () {
    requestAnimationFrame(render);

    mesh.rotation.y += 0.004;

    renderer.render(scene, camera);

    materialPlane1.uniforms.uTime.value = clock.getElapsedTime();

    // console.log(clock);

};

render();