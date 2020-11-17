// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"js/app.js":[function(require,module,exports) {
// import * as THREE from "three";
// // import * as THREEx from "threex.domevents";
// import { Interaction } from 'three.interaction';
// import vertexShader from "./libs/glsl/vertex.glsl";
// import fragmentShader from "./libs/glsl/fragment.glsl";
// import atelier1 from "../assets/img/atelier1.png";
// import atelier2 from "../assets/img/atelier2.png";
// import atelier3 from "../assets/img/atelier3.jpg";
// import atelier4 from "../assets/img/atelier4.jpg";
// import atelier5 from "../assets/img/atelier5.png";
// import atelier6 from "../assets/img/atelier6.png";
// import atelier7 from "../assets/img/atelier7.jpg";
// import atelier8 from "../assets/img/atelier8.png";
// import particle from "../assets/img/particle.png";
////////// SCENE //////////
var scene = new THREE.Scene(); ////////// CAMERA //////////

var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 0, 2.7); /////// MAIN RENDERER ///////

var renderer = new THREE.WebGLRenderer({
  antialias: true,
  alpha: true
}); // renderer.setClearColor("#09021e");

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
document.body.appendChild(renderer.domElement); /////// RESIZE EVENT ///////

window.addEventListener('resize', function () {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
}); // const interaction = new Interaction(renderer, scene, camera);
/////// LIGHTS ///////

var targetLogo = new THREE.Object3D();
targetLogo.position.set(0, 0, 0);
scene.add(targetLogo);
lightRight = new THREE.DirectionalLight(0x33081b, .75);
lightRight.position.set(7, .5, 7);
lightRight.target = targetLogo;
scene.add(lightRight);
lightLeft = new THREE.DirectionalLight(0x33081b, .75);
lightLeft.position.set(-7, .5, 7);
lightLeft.target = targetLogo;
scene.add(lightLeft);
lightCenter = new THREE.DirectionalLight(0x18404d, 8);
lightCenter.position.set(0, -1.5, 0);
lightCenter.target = targetLogo;
scene.add(lightCenter);
lightCenterSocle = new THREE.PointLight(0x18404d, 18, .75);
lightCenterSocle.position.set(0, -1.5, 0);
scene.add(lightCenterSocle);
var magentaColor = new THREE.Color(0xf72585);
var cyanColor = new THREE.Color(0x4cc9f0);
var magentaColorReset = new THREE.Color(0x33081b);
var cyanColorReset = new THREE.Color(0x18404d); /////// 3D MODEL ///////

var socle;
var loaderSocle = new THREE.GLTFLoader();
loaderSocle.crossOrigin = true;
loaderSocle.load('../assets/model/base.gltf', function (addSocle) {
  socle = addSocle.scene;
  scene.add(socle);
  socle.position.set(0, -4.7, 0);
  socle.scale.set(.7, .7, .7);
  socle.rotation.y = 0;
});
var logo;
var loaderLogo = new THREE.GLTFLoader();
loaderLogo.crossOrigin = true;
loaderLogo.load('../assets/model/logo.gltf', function (addLogo) {
  logo = addLogo.scene;
  scene.add(logo);
  logo.position.set(0, .2, 0);
  logo.rotation.z = -.725;
  logo.scale.set(1.2, 1.2, 1.2);
}); /////// PLANES ///////

var plane = new THREE.PlaneGeometry(1.6 / 1.2, .9 / 1.2);
var materialPlane1 = new THREE.MeshBasicMaterial({
  side: THREE.DoubleSide,
  map: new THREE.TextureLoader().load('../assets/img/atelier1.png'),
  transparency: true // TweenLite.to(mesh.material, 2, {opacity: 0}); suppr pas stp

});
var materialPlane2 = new THREE.MeshBasicMaterial({
  side: THREE.DoubleSide,
  map: new THREE.TextureLoader().load('../assets/img/atelier2.png')
});
var materialPlane3 = new THREE.MeshBasicMaterial({
  side: THREE.DoubleSide,
  map: new THREE.TextureLoader().load('../assets/img/atelier3.jpg')
});
var materialPlane4 = new THREE.MeshBasicMaterial({
  side: THREE.DoubleSide,
  map: new THREE.TextureLoader().load('../assets/img/atelier4.jpg')
});
var materialPlane5 = new THREE.MeshBasicMaterial({
  side: THREE.DoubleSide,
  map: new THREE.TextureLoader().load('../assets/img/atelier5.png')
});
var materialPlane6 = new THREE.MeshBasicMaterial({
  side: THREE.DoubleSide,
  map: new THREE.TextureLoader().load('../assets/img/atelier6.png')
});
var materialPlane7 = new THREE.MeshBasicMaterial({
  side: THREE.DoubleSide,
  map: new THREE.TextureLoader().load('../assets/img/atelier7.jpg')
});
var materialPlane8 = new THREE.MeshBasicMaterial({
  side: THREE.DoubleSide,
  map: new THREE.TextureLoader().load('../assets/img/atelier8.png')
}); /////// PLANES MATERIALS ///////
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
//         uTime: { value: 0.0 },
//         uTexture: { value: new THREE.TextureLoader().load(atelier2) }
//     },
//     side: THREE.DoubleSide
// });
// var materialPlane3 = new THREE.ShaderMaterial({
//     vertexShader,
//     fragmentShader,
//     uniforms: {
//         uTime: { value: 0.0 },
//         uTexture: { value: new THREE.TextureLoader().load(atelier3) }
//     },
//     side: THREE.DoubleSide
// });
// var materialPlane4 = new THREE.ShaderMaterial({
//     vertexShader,
//     fragmentShader,
//     uniforms: {
//         uTime: { value: 0.0 },
//         uTexture: { value: new THREE.TextureLoader().load(atelier4) }
//     },
//     side: THREE.DoubleSide
// });
// var materialPlane5 = new THREE.ShaderMaterial({
//     vertexShader,
//     fragmentShader,
//     uniforms: {
//         uTime: { value: 0.0 },
//         uTexture: { value: new THREE.TextureLoader().load(atelier5) }
//     },
//     side: THREE.DoubleSide
// });
// var materialPlane6 = new THREE.ShaderMaterial({
//     vertexShader,
//     fragmentShader,
//     uniforms: {
//         uTime: { value: 0.0 },
//         uTexture: { value: new THREE.TextureLoader().load(atelier6) }
//     },
//     side: THREE.DoubleSide
// });
// var materialPlane7 = new THREE.ShaderMaterial({
//     vertexShader,
//     fragmentShader,
//     uniforms: {
//         uTime: { value: 0.0 },
//         uTexture: { value: new THREE.TextureLoader().load(atelier7) }
//     },
//     side: THREE.DoubleSide
// });
// var materialPlane8 = new THREE.ShaderMaterial({
//     vertexShader,
//     fragmentShader,
//     uniforms: {
//         uTime: { value: 0.0 },
//         uTexture: { value: new THREE.TextureLoader().load(atelier8) }
//     },
//     side: THREE.DoubleSide
// });
/////// PLANE AXES ///////

var planeAxe = new THREE.Object3D();
planeAxe.position.y = .2;
scene.add(planeAxe); /////// PLANES PIVOTS ///////

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
planeAxe.add(pivot1, pivot2, pivot3, pivot4, pivot5, pivot6, pivot7, pivot8); /////// PLANES MESHS ///////

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
planeMesh8.rotation.y = Math.PI / 2; /////// ROTATION AROUND AXIS ///////

pivot1.add(planeMesh1);
pivot2.add(planeMesh2);
pivot3.add(planeMesh3);
pivot4.add(planeMesh4);
pivot5.add(planeMesh5);
pivot6.add(planeMesh6);
pivot7.add(planeMesh7);
pivot8.add(planeMesh8); /////// 3D TEXT ///////
// const loader = new THREE.FontLoader();
// loader.load('../assets/font/helvetiker_bold.typeface.json', function(font) {
//     const textGeo1 = new THREE.TextGeometry('Hello three.js!', {
//         font: font,
//         size: 80,
//         height: 5,
//         curveSegments: 12,
//         bevelEnabled: true,
//         bevelThickness: 10,
//         bevelSize: 8,
//         bevelOffset: 0,
//         bevelSegments: 5
//     });
//     var textMaterial1 = new THREE.MeshPhongMaterial({ color: 0xffffff });
//     var textMesh1 = new THREE.Mesh(textGeo1, textMaterial1);
//     scene.add(textMesh1);
// });
/////// GRID ///////

var screenWidth = window.innerWidth;
var ScreenHeigth = window.innerHeight;
colContainer = document.querySelector('.colContainer');
rowContainer = document.querySelector('.rowContainer');

for (var col = 0; col < innerWidth; col++) {
  var drawCol = document.createElement("div");
  colContainer.appendChild(drawCol).className = "col";
}

;

for (var row = 0; row < innerHeight; row++) {
  var drawRaw = document.createElement("div");
  rowContainer.appendChild(drawRaw).className = "row";
}

; // var points = [];
// points.push(new THREE.Vector3(20, 0, 0));
// points.push(new THREE.Vector3(-20, 0, 0));
// var verticalLineGeo = new THREE.BufferGeometry().setFromPoints(points);
// var verticalLineMaterial = new THREE.LineBasicMaterial({
//     color: 0x0d0437
// });
// for (let i = -46; i <= 46; i++) {
//     var verticalLine = new THREE.Line(verticalLineGeo, verticalLineMaterial);
//     verticalLine.position.z = -10;
//     verticalLine.position.x = i / 2;
//     verticalLine.rotation.z = 1.5 * Math.PI;
//     scene.add(verticalLine)
// }
// var horizontalLineGeo = new THREE.BufferGeometry().setFromPoints(points);
// var horizontalLineMaterial = new THREE.LineBasicMaterial({
//     color: 0x0d0437
// });
// for (let i = -24; i <= 24; i++) {
//     var horizontalLine = new THREE.Line(horizontalLineGeo, horizontalLineMaterial);
//     horizontalLine.position.z = -10;
//     horizontalLine.position.y = i / 2;
//     scene.add(horizontalLine)
// }
// //SOCIAL MEDIA CURSOR
// var socialMediaLineGeo = new THREE.BufferGeometry().setFromPoints(points);
// var socialMediaLineMaterial = new THREE.LineBasicMaterial({
//     color: 0xffffff //0xf72585
// });
// var socialMediaLine = new THREE.Line(socialMediaLineGeo, socialMediaLineMaterial);
// socialMediaLine.position.z = -10;
// socialMediaLine.position.x = 20;
// socialMediaLine.rotation.z = 1.5 * Math.PI;
// scene.add(socialMediaLine)
// var socialMediaLine2 = new THREE.Line(socialMediaLineGeo, socialMediaLineMaterial);
// socialMediaLine2.position.z = -10;
// socialMediaLine2.position.x = 19;
// socialMediaLine2.rotation.z = 1.5 * Math.PI;
// scene.add(socialMediaLine2)
// var socialMediaLine3 = new THREE.Line(socialMediaLineGeo, socialMediaLineMaterial);
// socialMediaLine3.position.z = -10;
// socialMediaLine3.position.y = -9;
// scene.add(socialMediaLine3)
// var socialMediaLine4 = new THREE.Line(socialMediaLineGeo, socialMediaLineMaterial);
// socialMediaLine4.position.z = -10;
// socialMediaLine4.position.y = -10;
// scene.add(socialMediaLine4)
/////// PARTICLES ///////

var particleGeo = new THREE.Geometry();

for (var i = 0; i < 1000; i++) {
  var particle = new THREE.Vector3(Math.random() * 18 - 9, Math.random() * 18 - 9, Math.random() * 3.4 - 1.7);
  particleGeo.vertices.push(particle);
}

var particleMaterial = new THREE.PointsMaterial({
  size: 0.018,
  map: new THREE.TextureLoader().load('../assets/img/particle.png'),
  blending: THREE.AdditiveBlending,
  transparent: true,
  opacity: .5
});
var particleMesh = new THREE.Points(particleGeo, particleMaterial);
scene.add(particleMesh); /////// VARIABLES EVENTS ///////

var homeContainer = document.querySelector('.homeContainer');
var h1 = document.querySelector('h1');
var btnWorkShopStart = document.querySelector('.btnWorkShopStart');
var btnStoryStart = document.querySelector('.btnStoryStart');
var btnBackHome = document.querySelector('.btnBackHome');
var btnWorkShop1 = document.querySelector('.btnWorkShop1');
var btnWorkShop2 = document.querySelector('.btnWorkShop2');
var btnWorkShop3 = document.querySelector('.btnWorkShop3');
var btnWorkShop4 = document.querySelector('.btnWorkShop4');
var btnWorkShop5 = document.querySelector('.btnWorkShop5');
var btnWorkShop6 = document.querySelector('.btnWorkShop6');
var btnWorkShop7 = document.querySelector('.btnWorkShop7');
var btnWorkShop8 = document.querySelector('.btnWorkShop8');
var canvas = document.querySelector('canvas');
var sm1 = document.querySelector('.sm1');
var sm2 = document.querySelector('.sm2');
var sm3 = document.querySelector('.sm3'); // materialPlane1.cursor = 'pointer';
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
/////// GRID INTERACTION ///////

sm1.addEventListener('mouseover', function () {
  //POINTER SOCIAL MEDIA 1
  TweenMax.to(".colLine", 1, {
    height: '98.2vh',
    ease: "power3.inOut"
  });
  TweenMax.to(".colLine2", 1, {
    height: '98.2vh',
    ease: "power3.inOut"
  });
  TweenMax.to(".rowLine", 1, {
    width: '99%',
    bottom: "6.1%",
    ease: "power3.inOut"
  });
  TweenMax.to(".rowLine2", 1, {
    width: '99%',
    bottom: "1.8%",
    ease: "power3.inOut"
  });
});
sm1.addEventListener('mouseout', function () {
  TweenMax.to(".colLine", 1, {
    height: '0',
    ease: "power3.inOut"
  });
  TweenMax.to(".colLine2", 1, {
    height: '0',
    ease: "power3.inOut"
  });
  TweenMax.to(".rowLine", 1, {
    width: '0',
    bottom: "6.1%",
    ease: "power3.inOut"
  });
  TweenMax.to(".rowLine2", 1, {
    width: '0',
    bottom: "1.8%",
    ease: "power3.inOut"
  });
});
sm2.addEventListener('mouseover', function () {
  //POINTER SOCIAL MEDIA 2
  TweenMax.to(".colLine", 1, {
    height: '93.9vh',
    ease: "power3.inOut"
  });
  TweenMax.to(".colLine2", 1, {
    height: '93.9vh',
    ease: "power3.inOut"
  });
  TweenMax.to(".rowLine", 1, {
    width: '99%',
    bottom: "10.4%",
    ease: "power3.inOut"
  });
  TweenMax.to(".rowLine2", 1, {
    width: '99%',
    bottom: "6.1%",
    ease: "power3.inOut"
  });
});
sm2.addEventListener('mouseout', function () {
  TweenMax.to(".colLine", 1, {
    height: '0',
    ease: "power3.inOut"
  });
  TweenMax.to(".colLine2", 1, {
    height: '0',
    ease: "power3.inOut"
  });
  TweenMax.to(".rowLine", 1, {
    width: '0',
    bottom: "10.4%",
    ease: "power3.inOut"
  });
  TweenMax.to(".rowLine2", 1, {
    width: '0',
    bottom: "6.1%",
    ease: "power3.inOut"
  });
});
sm3.addEventListener('mouseover', function () {
  //POINTER SOCIAL MEDIA 3
  TweenMax.to(".colLine", 1, {
    height: '89.6vh',
    ease: "power3.inOut"
  });
  TweenMax.to(".colLine2", 1, {
    height: '89.6vh',
    ease: "power3.inOut"
  });
  TweenMax.to(".rowLine", 1, {
    width: '99%',
    bottom: "14.7%",
    ease: "power3.inOut"
  });
  TweenMax.to(".rowLine2", 1, {
    width: '99%',
    bottom: "10.4%",
    ease: "power3.inOut"
  });
});
sm3.addEventListener('mouseout', function () {
  TweenMax.to(".colLine", 1, {
    height: '0',
    ease: "power3.inOut"
  });
  TweenMax.to(".colLine2", 1, {
    height: '0',
    ease: "power3.inOut"
  });
  TweenMax.to(".rowLine", 1, {
    width: '0',
    bottom: "14.7%",
    ease: "power3.inOut"
  });
  TweenMax.to(".rowLine2", 1, {
    width: '0',
    bottom: "10.4%",
    ease: "power3.inOut"
  });
}); /////// CLICS EVENTS ///////

btnBackHome.addEventListener('click', function () {
  //AXES ANIM
  gsap.to(planeAxe.position, 1.5, {
    y: .2,
    ease: "power3.inOut"
  });
  gsap.to(planeAxe.rotation, 1.5, {
    y: -.5 * Math.PI,
    ease: "power3.inOut"
  });
  gsap.to(camera.position, 1.5, {
    z: 2.7,
    delay: .25,
    ease: "power3.inOut"
  }); //HTML ELEMENTS ANIM

  TweenMax.to(h1, .75, {
    opacity: 1,
    scale: 1,
    letterSpacing: '0',
    delay: .75,
    ease: "power3.inOut"
  });
  TweenMax.to(btnWorkShopStart, .75, {
    opacity: 1,
    clipPath: "inset(0% 0% 0% 0%)",
    delay: .75,
    ease: "power3.inOut"
  });
  TweenMax.to(btnStoryStart, .75, {
    opacity: 1,
    clipPath: "inset(0% 0% 0% 0%)",
    delay: .75,
    ease: "power3.inOut"
  });
  TweenMax.to(btnBackHome, 1, {
    opacity: 0,
    clipPath: "inset(0% 100% 0% 0%)",
    ease: "power3.inOut"
  }); //MODELS ANIM

  gsap.to(logo.position, 1.5, {
    y: .2,
    ease: "power3.inOut"
  });
  gsap.to(logo.scale, 1.5, {
    z: 1.2,
    x: 1.2,
    y: 1.2,
    ease: "power3.inOut"
  });
  gsap.to(logo.rotation, 1.5, {
    z: -.725,
    y: 0,
    ease: "power3.inOut"
  });
  gsap.to(socle.position, 1.5, {
    y: -4.7,
    ease: "power3.inOut"
  });
  gsap.to(socle.rotation, 1.5, {
    y: 0,
    ease: "power3.inOut"
  }); //LIGHTS ANIM

  TweenMax.to(lightCenterSocle.color, .75, {
    r: cyanColorReset.r,
    g: cyanColorReset.g,
    b: cyanColorReset.b,
    delay: .35
  });
  TweenMax.to(lightCenter.color, .75, {
    r: cyanColorReset.r,
    g: cyanColorReset.g,
    b: cyanColorReset.b,
    delay: .35
  });
  TweenMax.to(lightLeft.color, .75, {
    r: magentaColorReset.r,
    g: magentaColorReset.g,
    b: magentaColorReset.b,
    delay: .35
  });
  TweenMax.to(lightRight.color, .75, {
    r: magentaColorReset.r,
    g: magentaColorReset.g,
    b: magentaColorReset.b,
    delay: .35
  }); //SWITCH ELEMENTS ON CLICK

  homeContainer.classList.add('close');
  homeContainer.classList.remove('open');
  btnBackHome.classList.add('close');
  btnBackHome.classList.remove('open');
  canvas.style.zIndex = -1;
});
btnWorkShopStart.addEventListener('click', function () {
  //AXES ANIM
  gsap.to(planeAxe.scale, 0, {
    y: 1,
    x: 1,
    z: 1
  });
  gsap.to(planeAxe.position, 1.5, {
    y: -4,
    ease: "power3.inOut",
    delay: 1.5
  });
  gsap.to(planeAxe.rotation, 1.5, {
    y: 2 * Math.PI,
    ease: "power3.inOut",
    delay: 1.5
  });
  gsap.to(camera.position, 1.5, {
    z: 3.7,
    ease: "power3.inOut"
  }); //HTML ELEMENTS ANIM

  TweenMax.to(h1, 1, {
    opacity: 0,
    scale: 1.3,
    letterSpacing: '1vw',
    ease: "power3.inOut"
  });
  TweenMax.to(btnWorkShopStart, 1, {
    opacity: 0,
    clipPath: "inset(0% 0% 0% 100%)",
    ease: "power3.inOut"
  });
  TweenMax.to(btnStoryStart, 1, {
    opacity: 0,
    clipPath: "inset(0% 100% 0% 0%)",
    ease: "power3.inOut"
  });
  TweenMax.to(btnBackHome, .75, {
    opacity: 1,
    clipPath: "inset(0% 0% 0% 0%)",
    delay: .75,
    ease: "power3.inOut"
  }); //PLANE ROTATION Z ANIM

  gsap.to(planeMesh1.rotation, 1.5, {
    z: 0,
    ease: "power3.inOut"
  });
  gsap.to(planeMesh2.rotation, 1.5, {
    z: -.2,
    ease: "power3.inOut",
    delay: 1
  });
  gsap.to(planeMesh3.rotation, 1.5, {
    z: -.2,
    ease: "power3.inOut",
    delay: 1
  });
  gsap.to(planeMesh4.rotation, 1.5, {
    z: -.2,
    ease: "power3.inOut",
    delay: 1
  });
  gsap.to(planeMesh5.rotation, 1.5, {
    z: -.2,
    ease: "power3.inOut",
    delay: 1
  });
  gsap.to(planeMesh6.rotation, 1.5, {
    z: -.2,
    ease: "power3.inOut",
    delay: 1
  });
  gsap.to(planeMesh7.rotation, 1.5, {
    z: -.2,
    ease: "power3.inOut",
    delay: 1
  });
  gsap.to(planeMesh8.rotation, 1.5, {
    z: -.2,
    ease: "power3.inOut",
    delay: 1
  }); //MODELS ANIM

  gsap.to(logo.position, 1.5, {
    y: 0,
    ease: "power3.inOut"
  });
  gsap.to(logo.scale, 1.5, {
    z: .9,
    x: .9,
    y: .9,
    ease: "power3.inOut"
  });
  gsap.to(logo.rotation, 1.5, {
    z: 0.25,
    ease: "power3.inOut"
  });
  gsap.to(socle.position, 2.5, {
    y: -2.5,
    ease: "power3.inOut"
  });
  gsap.to(socle.rotation, 2.5, {
    y: -Math.PI,
    ease: "power3.inOut"
  }); //LIGHTS ANIM

  TweenMax.to(lightCenterSocle.color, .75, {
    r: cyanColor.r,
    g: cyanColor.g,
    b: cyanColor.b,
    delay: 1.5
  });
  TweenMax.to(lightCenter.color, .75, {
    r: cyanColor.r,
    g: cyanColor.g,
    b: cyanColor.b,
    delay: 1.5
  });
  TweenMax.to(lightLeft.color, .75, {
    r: magentaColor.r,
    g: magentaColor.g,
    b: magentaColor.b,
    delay: 1.5
  });
  TweenMax.to(lightRight.color, .75, {
    r: magentaColor.r,
    g: magentaColor.g,
    b: magentaColor.b,
    delay: 1.5
  }); //SWITCH ELEMENTS ON CLICK  

  setTimeout(function () {
    btnBackHome.classList.add('open');
    btnBackHome.classList.remove('close');
    homeContainer.classList.add('open');
    homeContainer.classList.remove('close');
    canvas.style.zIndex = 1;
  }, 1500);
});
btnWorkShop1.addEventListener('click', function () {
  gsap.to(planeAxe.position, 1, {
    y: -4,
    ease: "power3.inOut"
  });
  gsap.to(planeAxe.rotation, 1, {
    y: 2 * Math.PI,
    ease: "power3.inOut"
  });
  gsap.to(planeMesh1.rotation, .75, {
    z: 0,
    ease: "power3.inOut"
  });
  gsap.to(planeMesh2.rotation, .75, {
    z: -.2,
    ease: "power3.inOut"
  });
  gsap.to(planeMesh3.rotation, .75, {
    z: -.2,
    ease: "power3.inOut"
  });
  gsap.to(planeMesh4.rotation, .75, {
    z: -.2,
    ease: "power3.inOut"
  });
  gsap.to(planeMesh5.rotation, .75, {
    z: -.2,
    ease: "power3.inOut"
  });
  gsap.to(planeMesh6.rotation, .75, {
    z: -.2,
    ease: "power3.inOut"
  });
  gsap.to(planeMesh7.rotation, .75, {
    z: -.2,
    ease: "power3.inOut"
  });
  gsap.to(planeMesh8.rotation, .75, {
    z: -.2,
    ease: "power3.inOut"
  });
});
btnWorkShop2.addEventListener('click', function () {
  gsap.to(planeAxe.position, 1, {
    y: -5,
    ease: "power3.inOut"
  });
  gsap.to(planeAxe.rotation, 1, {
    y: 2.5 * Math.PI,
    ease: "power3.inOut"
  });
  gsap.to(planeMesh1.rotation, .75, {
    z: -.2,
    ease: "power3.inOut"
  });
  gsap.to(planeMesh2.rotation, .75, {
    z: 0,
    ease: "power3.inOut"
  });
  gsap.to(planeMesh3.rotation, .75, {
    z: -.2,
    ease: "power3.inOut"
  });
  gsap.to(planeMesh4.rotation, .75, {
    z: -.2,
    ease: "power3.inOut"
  });
  gsap.to(planeMesh5.rotation, .75, {
    z: -.2,
    ease: "power3.inOut"
  });
  gsap.to(planeMesh6.rotation, .75, {
    z: -.2,
    ease: "power3.inOut"
  });
  gsap.to(planeMesh7.rotation, .75, {
    z: -.2,
    ease: "power3.inOut"
  });
  gsap.to(planeMesh8.rotation, .75, {
    z: -.2,
    ease: "power3.inOut"
  });
});
btnWorkShop3.addEventListener('click', function () {
  gsap.to(planeAxe.position, 1, {
    y: -6,
    ease: "power3.inOut"
  });
  gsap.to(planeAxe.rotation, 1, {
    y: 3 * Math.PI,
    ease: "power3.inOut"
  });
  gsap.to(planeMesh1.rotation, .75, {
    z: -.2,
    ease: "power3.inOut"
  });
  gsap.to(planeMesh2.rotation, .75, {
    z: -.2,
    ease: "power3.inOut"
  });
  gsap.to(planeMesh3.rotation, .75, {
    z: 0,
    ease: "power3.inOut"
  });
  gsap.to(planeMesh4.rotation, .75, {
    z: -.2,
    ease: "power3.inOut"
  });
  gsap.to(planeMesh5.rotation, .75, {
    z: -.2,
    ease: "power3.inOut"
  });
  gsap.to(planeMesh6.rotation, .75, {
    z: -.2,
    ease: "power3.inOut"
  });
  gsap.to(planeMesh7.rotation, .75, {
    z: -.2,
    ease: "power3.inOut"
  });
  gsap.to(planeMesh8.rotation, .75, {
    z: -.2,
    ease: "power3.inOut"
  });
});
btnWorkShop4.addEventListener('click', function () {
  gsap.to(planeAxe.position, 1, {
    y: -7,
    ease: "power3.inOut"
  });
  gsap.to(planeAxe.rotation, 1, {
    y: 3.5 * Math.PI,
    ease: "power3.inOut"
  });
  gsap.to(planeMesh1.rotation, .75, {
    z: -.2,
    ease: "power3.inOut"
  });
  gsap.to(planeMesh2.rotation, .75, {
    z: -.2,
    ease: "power3.inOut"
  });
  gsap.to(planeMesh3.rotation, .75, {
    z: -.2,
    ease: "power3.inOut"
  });
  gsap.to(planeMesh4.rotation, .75, {
    z: 0,
    ease: "power3.inOut"
  });
  gsap.to(planeMesh5.rotation, .75, {
    z: -.2,
    ease: "power3.inOut"
  });
  gsap.to(planeMesh6.rotation, .75, {
    z: -.2,
    ease: "power3.inOut"
  });
  gsap.to(planeMesh7.rotation, .75, {
    z: -.2,
    ease: "power3.inOut"
  });
  gsap.to(planeMesh8.rotation, .75, {
    z: -.2,
    ease: "power3.inOut"
  });
});
btnWorkShop5.addEventListener('click', function () {
  gsap.to(planeAxe.position, 1, {
    y: -8,
    ease: "power3.inOut"
  });
  gsap.to(planeAxe.rotation, 1, {
    y: 4 * Math.PI,
    ease: "power3.inOut"
  });
  gsap.to(planeMesh1.rotation, .75, {
    z: -.2,
    ease: "power3.inOut"
  });
  gsap.to(planeMesh2.rotation, .75, {
    z: -.2,
    ease: "power3.inOut"
  });
  gsap.to(planeMesh3.rotation, .75, {
    z: -.2,
    ease: "power3.inOut"
  });
  gsap.to(planeMesh4.rotation, .75, {
    z: -.2,
    ease: "power3.inOut"
  });
  gsap.to(planeMesh5.rotation, .75, {
    z: 0,
    ease: "power3.inOut"
  });
  gsap.to(planeMesh6.rotation, .75, {
    z: -.2,
    ease: "power3.inOut"
  });
  gsap.to(planeMesh7.rotation, .75, {
    z: -.2,
    ease: "power3.inOut"
  });
  gsap.to(planeMesh8.rotation, .75, {
    z: -.2,
    ease: "power3.inOut"
  });
});
btnWorkShop6.addEventListener('click', function () {
  gsap.to(planeAxe.position, 1, {
    y: -9,
    ease: "power3.inOut"
  });
  gsap.to(planeAxe.rotation, 1, {
    y: 4.5 * Math.PI,
    ease: "power3.inOut"
  });
  gsap.to(planeMesh1.rotation, .75, {
    z: -.2,
    ease: "power3.inOut"
  });
  gsap.to(planeMesh2.rotation, .75, {
    z: -.2,
    ease: "power3.inOut"
  });
  gsap.to(planeMesh3.rotation, .75, {
    z: -.2,
    ease: "power3.inOut"
  });
  gsap.to(planeMesh4.rotation, .75, {
    z: -.2,
    ease: "power3.inOut"
  });
  gsap.to(planeMesh5.rotation, .75, {
    z: -.2,
    ease: "power3.inOut"
  });
  gsap.to(planeMesh6.rotation, .75, {
    z: 0,
    ease: "power3.inOut"
  });
  gsap.to(planeMesh7.rotation, .75, {
    z: -.2,
    ease: "power3.inOut"
  });
  gsap.to(planeMesh8.rotation, .75, {
    z: -.2,
    ease: "power3.inOut"
  });
});
btnWorkShop7.addEventListener('click', function () {
  gsap.to(planeAxe.position, 1, {
    y: -10,
    ease: "power3.inOut"
  });
  gsap.to(planeAxe.rotation, 1, {
    y: 5 * Math.PI,
    ease: "power3.inOut"
  });
  gsap.to(planeMesh1.rotation, .75, {
    z: -.2,
    ease: "power3.inOut"
  });
  gsap.to(planeMesh2.rotation, .75, {
    z: -.2,
    ease: "power3.inOut"
  });
  gsap.to(planeMesh3.rotation, .75, {
    z: -.2,
    ease: "power3.inOut"
  });
  gsap.to(planeMesh4.rotation, .75, {
    z: -.2,
    ease: "power3.inOut"
  });
  gsap.to(planeMesh5.rotation, .75, {
    z: -.2,
    ease: "power3.inOut"
  });
  gsap.to(planeMesh6.rotation, .75, {
    z: -.2,
    ease: "power3.inOut"
  });
  gsap.to(planeMesh7.rotation, .75, {
    z: 0,
    ease: "power3.inOut"
  });
  gsap.to(planeMesh8.rotation, .75, {
    z: -.2,
    ease: "power3.inOut"
  });
});
btnWorkShop8.addEventListener('click', function () {
  gsap.to(planeAxe.position, 1, {
    y: -11,
    ease: "power3.inOut"
  });
  gsap.to(planeAxe.rotation, 1, {
    y: 5.5 * Math.PI,
    ease: "power3.inOut"
  });
  gsap.to(planeMesh1.rotation, .75, {
    z: -.2,
    ease: "power3.inOut"
  });
  gsap.to(planeMesh2.rotation, .75, {
    z: -.2,
    ease: "power3.inOut"
  });
  gsap.to(planeMesh3.rotation, .75, {
    z: -.2,
    ease: "power3.inOut"
  });
  gsap.to(planeMesh4.rotation, .75, {
    z: -.2,
    ease: "power3.inOut"
  });
  gsap.to(planeMesh5.rotation, .75, {
    z: -.2,
    ease: "power3.inOut"
  });
  gsap.to(planeMesh6.rotation, .75, {
    z: -.2,
    ease: "power3.inOut"
  });
  gsap.to(planeMesh7.rotation, .75, {
    z: -.2,
    ease: "power3.inOut"
  });
  gsap.to(planeMesh8.rotation, .75, {
    z: 0,
    ease: "power3.inOut"
  });
}); ///// SCROLL EVENT ///////

document.body.addEventListener('wheel', checkScrollDirection);

function checkScrollDirection(event) {
  if (checkScrollDirectionIsUp(event)) {
    // SCROLL UP
    console.log("position up:" + planeAxe.position.y);

    if (planeAxe.position.y == -4) {
      //AXES ANIM
      gsap.to(planeAxe.position, 1.5, {
        y: .2,
        ease: "power3.inOut"
      });
      gsap.to(planeAxe.rotation, 1.5, {
        y: -.5 * Math.PI,
        ease: "power3.inOut"
      });
      gsap.to(camera.position, 1.5, {
        z: 2.7,
        ease: "power3.inOut"
      }); //HTML ELEMENTS ANIM

      TweenMax.to(h1, .75, {
        opacity: 1,
        scale: 1,
        letterSpacing: '0',
        delay: .75,
        ease: "power3.inOut"
      });
      TweenMax.to(btnWorkShopStart, .75, {
        opacity: 1,
        clipPath: "inset(0% 0% 0% 0%)",
        delay: .75,
        ease: "power3.inOut"
      });
      TweenMax.to(btnStoryStart, .75, {
        opacity: 1,
        clipPath: "inset(0% 0% 0% 0%)",
        delay: .75,
        ease: "power3.inOut"
      });
      TweenMax.to(btnBackHome, 1, {
        opacity: 0,
        clipPath: "inset(0% 100% 0% 0%)",
        ease: "power3.inOut"
      }); //PLANES ROTATION Z ANIM

      gsap.to(planeMesh1.rotation, .75, {
        z: -.2,
        ease: "power3.inOut"
      });
      gsap.to(planeMesh2.rotation, .75, {
        z: -.2,
        ease: "power3.inOut"
      });
      gsap.to(planeMesh3.rotation, .75, {
        z: -.2,
        ease: "power3.inOut"
      });
      gsap.to(planeMesh4.rotation, .75, {
        z: -.2,
        ease: "power3.inOut"
      });
      gsap.to(planeMesh5.rotation, .75, {
        z: -.2,
        ease: "power3.inOut"
      });
      gsap.to(planeMesh6.rotation, .75, {
        z: -.2,
        ease: "power3.inOut"
      });
      gsap.to(planeMesh7.rotation, .75, {
        z: -.2,
        ease: "power3.inOut"
      });
      gsap.to(planeMesh8.rotation, .75, {
        z: -.2,
        ease: "power3.inOut"
      }); //MODELS ANIM

      gsap.to(logo.position, 1.5, {
        y: .2,
        ease: "power3.inOut"
      });
      gsap.to(logo.scale, 1.5, {
        z: 1.2,
        x: 1.2,
        y: 1.2,
        ease: "power3.inOut"
      });
      gsap.to(logo.rotation, 1.5, {
        z: -.725,
        y: 0,
        ease: "power3.inOut"
      });
      gsap.to(socle.position, 1.5, {
        y: -4.7,
        ease: "power3.inOut"
      });
      gsap.to(socle.rotation, 1.5, {
        y: 0,
        ease: "power3.inOut"
      }); //LIGHTS ANIM

      TweenMax.to(lightCenterSocle.color, .75, {
        r: cyanColorReset.r,
        g: cyanColorReset.g,
        b: cyanColorReset.b,
        delay: .35
      });
      TweenMax.to(lightCenter.color, .75, {
        r: cyanColorReset.r,
        g: cyanColorReset.g,
        b: cyanColorReset.b,
        delay: .35
      });
      TweenMax.to(lightLeft.color, .75, {
        r: magentaColorReset.r,
        g: magentaColorReset.g,
        b: magentaColorReset.b,
        delay: .35
      });
      TweenMax.to(lightRight.color, .75, {
        r: magentaColorReset.r,
        g: magentaColorReset.g,
        b: magentaColorReset.b,
        delay: .35
      }); //SWITCH ELEMENTS ON CLICK

      homeContainer.classList.add('close');
      homeContainer.classList.remove('open');
      btnBackHome.classList.add('close');
      btnBackHome.classList.remove('open');
      canvas.style.zIndex = -1;
    } else if (planeAxe.position.y <= -4 && planeAxe.position.y >= -5.1) {
      //AXES ANIM
      gsap.to(planeAxe.position, .75, {
        y: -4,
        ease: "power3.inOut"
      });
      gsap.to(planeAxe.rotation, .75, {
        y: 2 * Math.PI,
        ease: "power3.inOut"
      }); //PLANES ROTATION Z ANIM

      gsap.to(planeMesh1.rotation, .75, {
        z: 0,
        ease: "power3.inOut"
      });
      gsap.to(planeMesh2.rotation, .75, {
        z: -.2,
        ease: "power3.inOut"
      });
      gsap.to(planeMesh3.rotation, .75, {
        z: -.2,
        ease: "power3.inOut"
      });
      gsap.to(planeMesh4.rotation, .75, {
        z: -.2,
        ease: "power3.inOut"
      });
      gsap.to(planeMesh5.rotation, .75, {
        z: -.2,
        ease: "power3.inOut"
      });
      gsap.to(planeMesh6.rotation, .75, {
        z: -.2,
        ease: "power3.inOut"
      });
      gsap.to(planeMesh7.rotation, .75, {
        z: -.2,
        ease: "power3.inOut"
      });
      gsap.to(planeMesh8.rotation, .75, {
        z: -.2,
        ease: "power3.inOut"
      });
    } else if (planeAxe.position.y <= -5 && planeAxe.position.y >= -6.1) {
      //AXES ANIM
      gsap.to(planeAxe.position, .75, {
        y: -5,
        ease: "power3.inOut"
      });
      gsap.to(planeAxe.rotation, .75, {
        y: 2.5 * Math.PI,
        ease: "power3.inOut"
      }); //PLANES ROTATION Z ANIM

      gsap.to(planeMesh1.rotation, .75, {
        z: -.2,
        ease: "power3.inOut"
      });
      gsap.to(planeMesh2.rotation, .75, {
        z: 0,
        ease: "power3.inOut"
      });
      gsap.to(planeMesh3.rotation, .75, {
        z: -.2,
        ease: "power3.inOut"
      });
      gsap.to(planeMesh4.rotation, .75, {
        z: -.2,
        ease: "power3.inOut"
      });
      gsap.to(planeMesh5.rotation, .75, {
        z: -.2,
        ease: "power3.inOut"
      });
      gsap.to(planeMesh6.rotation, .75, {
        z: -.2,
        ease: "power3.inOut"
      });
      gsap.to(planeMesh7.rotation, .75, {
        z: -.2,
        ease: "power3.inOut"
      });
      gsap.to(planeMesh8.rotation, .75, {
        z: -.2,
        ease: "power3.inOut"
      });
    } else if (planeAxe.position.y <= -6 && planeAxe.position.y >= -7.1) {
      //AXES ANIM
      gsap.to(planeAxe.position, .75, {
        y: -6,
        ease: "power3.inOut"
      });
      gsap.to(planeAxe.rotation, .75, {
        y: 3 * Math.PI,
        ease: "power3.inOut"
      }); //PLANES ROTATION Z ANIM

      gsap.to(planeMesh1.rotation, .75, {
        z: -.2,
        ease: "power3.inOut"
      });
      gsap.to(planeMesh2.rotation, .75, {
        z: -.2,
        ease: "power3.inOut"
      });
      gsap.to(planeMesh3.rotation, .75, {
        z: 0,
        ease: "power3.inOut"
      });
      gsap.to(planeMesh4.rotation, .75, {
        z: -.2,
        ease: "power3.inOut"
      });
      gsap.to(planeMesh5.rotation, .75, {
        z: -.2,
        ease: "power3.inOut"
      });
      gsap.to(planeMesh6.rotation, .75, {
        z: -.2,
        ease: "power3.inOut"
      });
      gsap.to(planeMesh7.rotation, .75, {
        z: -.2,
        ease: "power3.inOut"
      });
      gsap.to(planeMesh8.rotation, .75, {
        z: -.2,
        ease: "power3.inOut"
      });
    } else if (planeAxe.position.y <= -7 && planeAxe.position.y >= -8.1) {
      //AXES ANIM
      gsap.to(planeAxe.position, .75, {
        y: -7,
        ease: "power3.inOut"
      });
      gsap.to(planeAxe.rotation, .75, {
        y: 3.5 * Math.PI,
        ease: "power3.inOut"
      }); //PLANES ROTATION Z ANIM

      gsap.to(planeMesh1.rotation, .75, {
        z: -.2,
        ease: "power3.inOut"
      });
      gsap.to(planeMesh2.rotation, .75, {
        z: -.2,
        ease: "power3.inOut"
      });
      gsap.to(planeMesh3.rotation, .75, {
        z: -.2,
        ease: "power3.inOut"
      });
      gsap.to(planeMesh4.rotation, .75, {
        z: 0,
        ease: "power3.inOut"
      });
      gsap.to(planeMesh5.rotation, .75, {
        z: -.2,
        ease: "power3.inOut"
      });
      gsap.to(planeMesh6.rotation, .75, {
        z: -.2,
        ease: "power3.inOut"
      });
      gsap.to(planeMesh7.rotation, .75, {
        z: -.2,
        ease: "power3.inOut"
      });
      gsap.to(planeMesh8.rotation, .75, {
        z: -.2,
        ease: "power3.inOut"
      });
    } else if (planeAxe.position.y <= -8 && planeAxe.position.y >= -9.1) {
      //AXES ANIM
      gsap.to(planeAxe.position, .75, {
        y: -8,
        ease: "power3.inOut"
      });
      gsap.to(planeAxe.rotation, .75, {
        y: 4 * Math.PI,
        ease: "power3.inOut"
      }); //PLANES ROTATION Z ANIM

      gsap.to(planeMesh1.rotation, .75, {
        z: -.2,
        ease: "power3.inOut"
      });
      gsap.to(planeMesh2.rotation, .75, {
        z: -.2,
        ease: "power3.inOut"
      });
      gsap.to(planeMesh3.rotation, .75, {
        z: -.2,
        ease: "power3.inOut"
      });
      gsap.to(planeMesh4.rotation, .75, {
        z: -.2,
        ease: "power3.inOut"
      });
      gsap.to(planeMesh5.rotation, .75, {
        z: 0,
        ease: "power3.inOut"
      });
      gsap.to(planeMesh6.rotation, .75, {
        z: -.2,
        ease: "power3.inOut"
      });
      gsap.to(planeMesh7.rotation, .75, {
        z: -.2,
        ease: "power3.inOut"
      });
      gsap.to(planeMesh8.rotation, .75, {
        z: -.2,
        ease: "power3.inOut"
      });
    } else if (planeAxe.position.y <= -9 && planeAxe.position.y >= -10.1) {
      //AXES ANIM
      gsap.to(planeAxe.position, .75, {
        y: -9,
        ease: "power3.inOut"
      });
      gsap.to(planeAxe.rotation, .75, {
        y: 4.5 * Math.PI,
        ease: "power3.inOut"
      }); //PLANES ROTATION Z ANIM

      gsap.to(planeMesh1.rotation, .75, {
        z: -.2,
        ease: "power3.inOut"
      });
      gsap.to(planeMesh2.rotation, .75, {
        z: -.2,
        ease: "power3.inOut"
      });
      gsap.to(planeMesh3.rotation, .75, {
        z: -.2,
        ease: "power3.inOut"
      });
      gsap.to(planeMesh4.rotation, .75, {
        z: -.2,
        ease: "power3.inOut"
      });
      gsap.to(planeMesh5.rotation, .75, {
        z: -.2,
        ease: "power3.inOut"
      });
      gsap.to(planeMesh6.rotation, .75, {
        z: 0,
        ease: "power3.inOut"
      });
      gsap.to(planeMesh7.rotation, .75, {
        z: -.2,
        ease: "power3.inOut"
      });
      gsap.to(planeMesh8.rotation, .75, {
        z: -.2,
        ease: "power3.inOut"
      });
    } else if (planeAxe.position.y == -11) {
      //AXES ANIM
      gsap.to(planeAxe.position, .75, {
        y: -10,
        ease: "power3.inOut"
      });
      gsap.to(planeAxe.rotation, .75, {
        y: 5 * Math.PI,
        ease: "power3.inOut"
      }); //PLANES ROTATION Z ANIM

      gsap.to(planeMesh1.rotation, .75, {
        z: -.2,
        ease: "power3.inOut"
      });
      gsap.to(planeMesh2.rotation, .75, {
        z: -.2,
        ease: "power3.inOut"
      });
      gsap.to(planeMesh3.rotation, .75, {
        z: -.2,
        ease: "power3.inOut"
      });
      gsap.to(planeMesh4.rotation, .75, {
        z: -.2,
        ease: "power3.inOut"
      });
      gsap.to(planeMesh5.rotation, .75, {
        z: -.2,
        ease: "power3.inOut"
      });
      gsap.to(planeMesh6.rotation, .75, {
        z: -.2,
        ease: "power3.inOut"
      });
      gsap.to(planeMesh7.rotation, .75, {
        z: 0,
        ease: "power3.inOut"
      });
      gsap.to(planeMesh8.rotation, .75, {
        z: -.2,
        ease: "power3.inOut"
      });
    } // if (planeAxe.position.y <= 0) {
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

  } else {
    // SCROLL DOWN
    if (planeAxe.position.y <= -4 && planeAxe.position.y >= -4.9) {
      //AXES ANIM
      gsap.to(planeAxe.position, .75, {
        y: -5,
        ease: "power3.inOut"
      });
      gsap.to(planeAxe.rotation, .75, {
        y: 2.5 * Math.PI,
        ease: "power3.inOut"
      }); //PLANES ROTATION Z ANIM

      gsap.to(planeMesh1.rotation, .75, {
        z: -.2,
        ease: "power3.inOut"
      });
      gsap.to(planeMesh2.rotation, .75, {
        z: 0,
        ease: "power3.inOut"
      });
      gsap.to(planeMesh3.rotation, .75, {
        z: -.2,
        ease: "power3.inOut"
      });
      gsap.to(planeMesh4.rotation, .75, {
        z: -.2,
        ease: "power3.inOut"
      });
      gsap.to(planeMesh5.rotation, .75, {
        z: -.2,
        ease: "power3.inOut"
      });
      gsap.to(planeMesh6.rotation, .75, {
        z: -.2,
        ease: "power3.inOut"
      });
      gsap.to(planeMesh7.rotation, .75, {
        z: -.2,
        ease: "power3.inOut"
      });
      gsap.to(planeMesh8.rotation, .75, {
        z: -.2,
        ease: "power3.inOut"
      });
    } else if (planeAxe.position.y <= -5 && planeAxe.position.y >= -5.9) {
      //AXES ANIM
      gsap.to(planeAxe.position, .75, {
        y: -6,
        ease: "power3.inOut"
      });
      gsap.to(planeAxe.rotation, .75, {
        y: 3 * Math.PI,
        ease: "power3.inOut"
      }); //PLANES ROTATION Z ANIM

      gsap.to(planeMesh1.rotation, .75, {
        z: -.2,
        ease: "power3.inOut"
      });
      gsap.to(planeMesh2.rotation, .75, {
        z: -.2,
        ease: "power3.inOut"
      });
      gsap.to(planeMesh3.rotation, .75, {
        z: 0,
        ease: "power3.inOut"
      });
      gsap.to(planeMesh4.rotation, .75, {
        z: -.2,
        ease: "power3.inOut"
      });
      gsap.to(planeMesh5.rotation, .75, {
        z: -.2,
        ease: "power3.inOut"
      });
      gsap.to(planeMesh6.rotation, .75, {
        z: -.2,
        ease: "power3.inOut"
      });
      gsap.to(planeMesh7.rotation, .75, {
        z: -.2,
        ease: "power3.inOut"
      });
      gsap.to(planeMesh8.rotation, .75, {
        z: -.2,
        ease: "power3.inOut"
      });
    } else if (planeAxe.position.y <= -6 && planeAxe.position.y >= -6.9) {
      //AXES ANIM
      gsap.to(planeAxe.position, .75, {
        y: -7,
        ease: "power3.inOut"
      });
      gsap.to(planeAxe.rotation, .75, {
        y: 3.5 * Math.PI,
        ease: "power3.inOut"
      }); //PLANES ROTATION Z ANIM

      gsap.to(planeMesh1.rotation, .75, {
        z: -.2,
        ease: "power3.inOut"
      });
      gsap.to(planeMesh2.rotation, .75, {
        z: -.2,
        ease: "power3.inOut"
      });
      gsap.to(planeMesh3.rotation, .75, {
        z: -.2,
        ease: "power3.inOut"
      });
      gsap.to(planeMesh4.rotation, .75, {
        z: 0,
        ease: "power3.inOut"
      });
      gsap.to(planeMesh5.rotation, .75, {
        z: -.2,
        ease: "power3.inOut"
      });
      gsap.to(planeMesh6.rotation, .75, {
        z: -.2,
        ease: "power3.inOut"
      });
      gsap.to(planeMesh7.rotation, .75, {
        z: -.2,
        ease: "power3.inOut"
      });
      gsap.to(planeMesh8.rotation, .75, {
        z: -.2,
        ease: "power3.inOut"
      });
    } else if (planeAxe.position.y <= -7 && planeAxe.position.y >= -7.9) {
      //AXES ANIM
      gsap.to(planeAxe.position, .75, {
        y: -8,
        ease: "power3.inOut"
      });
      gsap.to(planeAxe.rotation, .75, {
        y: 4 * Math.PI,
        ease: "power3.inOut"
      }); //PLANES ROTATION Z ANIM

      gsap.to(planeMesh1.rotation, .75, {
        z: -.2,
        ease: "power3.inOut"
      });
      gsap.to(planeMesh2.rotation, .75, {
        z: -.2,
        ease: "power3.inOut"
      });
      gsap.to(planeMesh3.rotation, .75, {
        z: -.2,
        ease: "power3.inOut"
      });
      gsap.to(planeMesh4.rotation, .75, {
        z: -.2,
        ease: "power3.inOut"
      });
      gsap.to(planeMesh5.rotation, .75, {
        z: 0,
        ease: "power3.inOut"
      });
      gsap.to(planeMesh6.rotation, .75, {
        z: -.2,
        ease: "power3.inOut"
      });
      gsap.to(planeMesh7.rotation, .75, {
        z: -.2,
        ease: "power3.inOut"
      });
      gsap.to(planeMesh8.rotation, .75, {
        z: -.2,
        ease: "power3.inOut"
      });
    } else if (planeAxe.position.y <= -8 && planeAxe.position.y >= -8.9) {
      //AXES ANIM
      gsap.to(planeAxe.position, .75, {
        y: -9,
        ease: "power3.inOut"
      });
      gsap.to(planeAxe.rotation, .75, {
        y: 4.5 * Math.PI,
        ease: "power3.inOut"
      }); //PLANES ROTATION Z ANIM

      gsap.to(planeMesh1.rotation, .75, {
        z: -.2,
        ease: "power3.inOut"
      });
      gsap.to(planeMesh2.rotation, .75, {
        z: -.2,
        ease: "power3.inOut"
      });
      gsap.to(planeMesh3.rotation, .75, {
        z: -.2,
        ease: "power3.inOut"
      });
      gsap.to(planeMesh4.rotation, .75, {
        z: -.2,
        ease: "power3.inOut"
      });
      gsap.to(planeMesh5.rotation, .75, {
        z: -.2,
        ease: "power3.inOut"
      });
      gsap.to(planeMesh6.rotation, .75, {
        z: 0,
        ease: "power3.inOut"
      });
      gsap.to(planeMesh7.rotation, .75, {
        z: -.2,
        ease: "power3.inOut"
      });
      gsap.to(planeMesh8.rotation, .75, {
        z: -.2,
        ease: "power3.inOut"
      });
    } else if (planeAxe.position.y <= -9 && planeAxe.position.y >= -9.9) {
      //AXES ANIM
      gsap.to(planeAxe.position, .75, {
        y: -10,
        ease: "power3.inOut"
      });
      gsap.to(planeAxe.rotation, .75, {
        y: 5 * Math.PI,
        ease: "power3.inOut"
      }); //PLANES ROTATION Z ANIM

      gsap.to(planeMesh1.rotation, .75, {
        z: -.2,
        ease: "power3.inOut"
      });
      gsap.to(planeMesh2.rotation, .75, {
        z: -.2,
        ease: "power3.inOut"
      });
      gsap.to(planeMesh3.rotation, .75, {
        z: -.2,
        ease: "power3.inOut"
      });
      gsap.to(planeMesh4.rotation, .75, {
        z: -.2,
        ease: "power3.inOut"
      });
      gsap.to(planeMesh5.rotation, .75, {
        z: -.2,
        ease: "power3.inOut"
      });
      gsap.to(planeMesh6.rotation, .75, {
        z: -.2,
        ease: "power3.inOut"
      });
      gsap.to(planeMesh7.rotation, .75, {
        z: 0,
        ease: "power3.inOut"
      });
      gsap.to(planeMesh8.rotation, .75, {
        z: -.2,
        ease: "power3.inOut"
      });
    } else if (planeAxe.position.y <= -10 && planeAxe.position.y >= -10.9) {
      //AXES ANIM
      gsap.to(planeAxe.position, .75, {
        y: -11,
        ease: "power3.inOut"
      });
      gsap.to(planeAxe.rotation, .75, {
        y: 5.5 * Math.PI,
        ease: "power3.inOut"
      }); //PLANES ROTATION Z ANIM

      gsap.to(planeMesh1.rotation, .75, {
        z: -.2,
        ease: "power3.inOut"
      });
      gsap.to(planeMesh2.rotation, .75, {
        z: -.2,
        ease: "power3.inOut"
      });
      gsap.to(planeMesh3.rotation, .75, {
        z: -.2,
        ease: "power3.inOut"
      });
      gsap.to(planeMesh4.rotation, .75, {
        z: -.2,
        ease: "power3.inOut"
      });
      gsap.to(planeMesh5.rotation, .75, {
        z: -.2,
        ease: "power3.inOut"
      });
      gsap.to(planeMesh6.rotation, .75, {
        z: -.2,
        ease: "power3.inOut"
      });
      gsap.to(planeMesh7.rotation, .75, {
        z: -.2,
        ease: "power3.inOut"
      });
      gsap.to(planeMesh8.rotation, .75, {
        z: 0,
        ease: "power3.inOut"
      });
    } else if (planeAxe.position.y <= -11 && planeAxe.position.y >= -11.9) {
      //AXES ANIM
      gsap.to(planeAxe.position, 1.5, {
        y: -15,
        ease: "power3.inOut"
      });
      gsap.to(planeAxe.rotation, 1.5, {
        y: 7 * Math.PI,
        ease: "power3.inOut"
      });
      gsap.to(camera.position, 1.5, {
        z: 2.7,
        ease: "power3.inOut"
      }); //HTML ELEMENTS ANIM

      TweenMax.to(h1, .75, {
        opacity: 1,
        scale: 1,
        letterSpacing: '0',
        delay: .75,
        ease: "power3.inOut"
      });
      TweenMax.to(btnWorkShopStart, .75, {
        opacity: 1,
        clipPath: "inset(0% 0% 0% 0%)",
        delay: .75,
        ease: "power3.inOut"
      });
      TweenMax.to(btnStoryStart, .75, {
        opacity: 1,
        clipPath: "inset(0% 0% 0% 0%)",
        delay: .75,
        ease: "power3.inOut"
      });
      TweenMax.to(btnBackHome, 1, {
        opacity: 0,
        clipPath: "inset(0% 100% 0% 0%)",
        ease: "power3.inOut"
      }); //PLANES ROTATION Z ANIM

      gsap.to(planeMesh1.rotation, .75, {
        z: -.2,
        ease: "power3.inOut"
      });
      gsap.to(planeMesh2.rotation, .75, {
        z: -.2,
        ease: "power3.inOut"
      });
      gsap.to(planeMesh3.rotation, .75, {
        z: -.2,
        ease: "power3.inOut"
      });
      gsap.to(planeMesh4.rotation, .75, {
        z: -.2,
        ease: "power3.inOut"
      });
      gsap.to(planeMesh5.rotation, .75, {
        z: -.2,
        ease: "power3.inOut"
      });
      gsap.to(planeMesh6.rotation, .75, {
        z: -.2,
        ease: "power3.inOut"
      });
      gsap.to(planeMesh7.rotation, .75, {
        z: -.2,
        ease: "power3.inOut"
      });
      gsap.to(planeMesh8.rotation, .75, {
        z: -.2,
        ease: "power3.inOut"
      }); //MODELS ANIM

      gsap.to(logo.position, 1.5, {
        y: .2,
        ease: "power3.inOut"
      });
      gsap.to(logo.scale, 1.5, {
        z: 1.2,
        x: 1.2,
        y: 1.2,
        ease: "power3.inOut"
      });
      gsap.to(logo.rotation, 1.5, {
        z: -.725,
        y: 0,
        ease: "power3.inOut"
      });
      gsap.to(socle.position, 1.5, {
        y: -4.7,
        ease: "power3.inOut"
      });
      gsap.to(socle.rotation, 1.5, {
        y: 0,
        ease: "power3.inOut"
      }); //LIGHTS ANIM

      TweenMax.to(lightCenterSocle.color, .75, {
        r: cyanColorReset.r,
        g: cyanColorReset.g,
        b: cyanColorReset.b,
        delay: .35
      });
      TweenMax.to(lightCenter.color, .75, {
        r: cyanColorReset.r,
        g: cyanColorReset.g,
        b: cyanColorReset.b,
        delay: .35
      });
      TweenMax.to(lightLeft.color, .75, {
        r: magentaColorReset.r,
        g: magentaColorReset.g,
        b: magentaColorReset.b,
        delay: .35
      });
      TweenMax.to(lightRight.color, .75, {
        r: magentaColorReset.r,
        g: magentaColorReset.g,
        b: magentaColorReset.b,
        delay: .35
      }); //SWITCH ELEMENTS ON CLICK

      homeContainer.classList.add('close');
      homeContainer.classList.remove('open');
      btnBackHome.classList.add('close');
      btnBackHome.classList.remove('open');
      canvas.style.zIndex = -1; //RESET AXESPOSITION 

      gsap.to(planeAxe.position, 0, {
        y: .2,
        delay: 1.5
      });
      gsap.to(planeAxe.rotation, 0, {
        y: -.5 * Math.PI,
        delay: 1.5
      });
      gsap.to(planeAxe.scale, 0, {
        y: 0.0001,
        x: 0.0001,
        z: 0.0001,
        delay: 1.5
      });
    }

    console.log("position down:" + planeAxe.position.y); // if (planeAxe.position.y >= 0) {
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
} /////// REVERSE SCROLL ///////


function checkScrollDirectionIsUp(event) {
  if (event.wheelDeltaY) {
    return event.wheelDeltaY > 0;
  }

  return event.deltaY < 0;
} // /////// DRAG EVENT ///////
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


var variation = 0;

var render = function render() {
  requestAnimationFrame(render);

  if (camera.position.z > 2.9) {
    logo.rotation.y += .01;
  }

  particleGeo.vertices.forEach(function (p) {
    p.y += 0.002;
    variation += 0.000005;
    p.x += Math.sin(variation) / 1000;

    if (p.y > 9) {
      p.y = -9;
    }
  });
  particleGeo.verticesNeedUpdate = true;
  renderer.render(scene, camera); // if (materialPlane1.uniforms.uTime.value == 1) {
  //     materialPlane1.uniforms.uTime.value -= 0.02;
  //     materialPlane2.uniforms.uTime.value -= 0.02;
  //     materialPlane3.uniforms.uTime.value -= 0.02;
  //     materialPlane4.uniforms.uTime.value -= 0.02;
  //     materialPlane5.uniforms.uTime.value -= 0.02;
  //     materialPlane6.uniforms.uTime.value -= 0.02;
  //     materialPlane7.uniforms.uTime.value -= 0.02;
  //     materialPlane8.uniforms.uTime.value -= 0.02;
  // } else {
  //     materialPlane1.uniforms.uTime.value += 0.02;
  //     materialPlane2.uniforms.uTime.value += 0.02;
  //     materialPlane3.uniforms.uTime.value += 0.02;
  //     materialPlane4.uniforms.uTime.value += 0.02;
  //     materialPlane5.uniforms.uTime.value += 0.02;
  //     materialPlane6.uniforms.uTime.value += 0.02;
  //     materialPlane7.uniforms.uTime.value += 0.02;
  //     materialPlane8.uniforms.uTime.value += 0.02;
  // }
};

render();
},{}],"node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "24393" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["node_modules/parcel-bundler/src/builtins/hmr-runtime.js","js/app.js"], null)
//# sourceMappingURL=/app.c3f9f951.js.map