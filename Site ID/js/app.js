import vertexShader from "/glsl/vertex.glsl";
import fragmentShader from "/glsl/fragment.glsl";

////////// SCENE //////////
var scene = new THREE.Scene();

////////// CAMERA //////////
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 0, 3);

/////// MAIN RENDERER ///////
var renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: true
});
renderer.setClearColor("#020659");
renderer.setSize(window.innerWidth, window.innerHeight);

document.body.appendChild(renderer.domElement);

/////// RESIZE EVENT ///////
window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    css3Renderer.setSize(window.innerWidth, window.innerHeight);

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

})

/////// CENTRAL MODEL ///////
var geometry = new THREE.BoxGeometry(.5, 3, 1);
var material = new THREE.MeshLambertMaterial({ color: 0x0142AC });
var mesh = new THREE.Mesh(geometry, material);

scene.add(mesh);

var render = function() {
    requestAnimationFrame(render);

    mesh.rotation.y += 0.002;

    renderer.render(scene, camera);
};

render();

/////// PLANES ///////
var plane = new THREE.PlaneGeometry(1.6 / 1.5, .9 / 1.5);

/////// PLANES MATERIALS ///////

var uniforms = {
    texture1: { type: "t", value: THREE.ImageUtils.loadTexture( "./assets/img/atelier1.png" ) }
};

var materialPlane1 = new THREE.MeshLambertMaterial({
    vertexShader,
    fragmentShader,
    uniforms: uniforms,
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
planeAxe = new THREE.Object3D();
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

pivot1.position.z = 2;
pivot2.position.x = -2;
pivot3.position.z = -2;
pivot4.position.x = 2;
pivot5.position.z = 2;
pivot6.position.x = -2;
pivot7.position.z = -2;
pivot8.position.x = 2;

planeAxe.add(pivot1);
planeAxe.add(pivot2);
planeAxe.add(pivot3);
planeAxe.add(pivot4);
planeAxe.add(pivot5);
planeAxe.add(pivot6);
planeAxe.add(pivot7);
planeAxe.add(pivot8);

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

/////// LIGHT ///////
const lightBottom = new THREE.PointLight(0xffffff, .5, 500);
lightBottom.position.set(0, -15, 0);

const lightTop = new THREE.PointLight(0xffffff, .5, 500);
lightTop.position.set(0, 15, 0);

const lightRight = new THREE.PointLight(0xffffff, 1, 500);
lightRight.position.set(3, 0, 25);

scene.add(lightBottom, lightRight, lightTop);



/////// CLICS EVENTS ///////
let workShopStart = document.querySelector('.workShopStart');
let workShop1 = document.querySelector('.workShop1');
let workShop2 = document.querySelector('.workShop2');
let workShop3 = document.querySelector('.workShop3');
let workShop4 = document.querySelector('.workShop4');
let workShop5 = document.querySelector('.workShop5');
let workShop6 = document.querySelector('.workShop6');
let workShop7 = document.querySelector('.workShop7');
let workShop8 = document.querySelector('.workShop8');

workShopStart.addEventListener('click', function() {
    gsap.to(planeAxe.position, 1.5, { y: -4, ease: Expo.easeOut })
    gsap.to(planeAxe.rotation, 1.5, { y: 2 * Math.PI, ease: Expo.easeOut })
})

workShop1.addEventListener('click', function() {
    gsap.to(planeAxe.position, 1.5, { y: -4, ease: Expo.easeOut })
    gsap.to(planeAxe.rotation, 1.5, { y: 2 * Math.PI, ease: Expo.easeOut })
})

workShop2.addEventListener('click', function() {
    gsap.to(planeAxe.position, 1.5, { y: -5, ease: Expo.easeOut })
    gsap.to(planeAxe.rotation, 1.5, { y: 2.5 * Math.PI, ease: Expo.easeOut })
})

workShop3.addEventListener('click', function() {
    gsap.to(planeAxe.position, 1.5, { y: -6, ease: Expo.easeOut })
    gsap.to(planeAxe.rotation, 1.5, { y: 3 * Math.PI, ease: Expo.easeOut })
})

workShop4.addEventListener('click', function() {
    gsap.to(planeAxe.position, 1.5, { y: -7, ease: Expo.easeOut })
    gsap.to(planeAxe.rotation, 1.5, { y: 3.5 * Math.PI, ease: Expo.easeOut })
})

workShop5.addEventListener('click', function() {
    gsap.to(planeAxe.position, 1.5, { y: -8, ease: Expo.easeOut })
    gsap.to(planeAxe.rotation, 1.5, { y: 4 * Math.PI, ease: Expo.easeOut })
})

workShop6.addEventListener('click', function() {
    gsap.to(planeAxe.position, 1.5, { y: -9, ease: Expo.easeOut })
    gsap.to(planeAxe.rotation, 1.5, { y: 4.5 * Math.PI, ease: Expo.easeOut })
})

workShop7.addEventListener('click', function() {
    gsap.to(planeAxe.position, 1.5, { y: -10, ease: Expo.easeOut })
    gsap.to(planeAxe.rotation, 1.5, { y: 5 * Math.PI, ease: Expo.easeOut })
})

workShop8.addEventListener('click', function() {
    gsap.to(planeAxe.position, 1.5, { y: -11, ease: Expo.easeOut })
    gsap.to(planeAxe.rotation, 1.5, { y: 5.5 * Math.PI, ease: Expo.easeOut })
})

/////// SCROLL EVENT ///////
document.body.addEventListener('wheel', checkScrollDirection);

function checkScrollDirection(event) {
    if (checkScrollDirectionIsUp(event)) {

        mesh.rotation.y += 0.1;

        planeAxe.rotation.y -= 1 / 2 * Math.PI / 8; // ROTATION SPEED
        planeAxe.position.y += 1 / 8; // POSITION SPEED

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

    } else {

        mesh.rotation.y -= 0.1;

        planeAxe.rotation.y += 1 / 2 * Math.PI / 8; // ROTATION SPEED
        planeAxe.position.y -= 1 / 8; // POSITION SPEED

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

/////// DRAG EVENT ///////
let isDown = false;
var last_position = {};

document.body.addEventListener('mousedown', () => {
    isDown = true;

    document.body.style.cursor = "grab";
});
document.body.addEventListener('mouseleave', () => {
    isDown = false;
});
document.body.addEventListener('mouseup', () => {
    isDown = false;

    document.body.style.cursor = "grab";
});


/////// DRAG EVENT COMPUTER ///////
document.body.addEventListener('mousemove', function(event) {
    if (typeof(last_position.x) != 'undefined') {
        var deltaX = last_position.x - event.offsetX,
            deltaY = last_position.y - event.offsetY;
        if (Math.abs(deltaX) > Math.abs(deltaY) && deltaX > 0) { // MOUSEMOVE LEFT

            if (!isDown) return;

            mesh.rotation.y += 0.1;

            planeAxe.rotation.y -= 1 / 2 * Math.PI / 20; // ROTATION SPEED
            planeAxe.position.y += 1 / 20; // POSITION SPEED

            document.body.style.cursor = "grabbing";

        } else if (Math.abs(deltaX) > Math.abs(deltaY) && deltaX < 0) { // MOUSEMOVE RIGHT

            if (!isDown) return;

            mesh.rotation.y -= 0.1;

            planeAxe.rotation.y += 1 / 2 * Math.PI / 20; // ROTATION SPEED
            planeAxe.position.y -= 1 / 20; // POSITION SPEED

            document.body.style.cursor = "grabbing";

        } else if (Math.abs(deltaY) > Math.abs(deltaX) && deltaY > 0) { // MOUSEMOVE UP

            if (!isDown) return;

            mesh.rotation.y -= 0.1;

            planeAxe.rotation.y += 1 / 2 * Math.PI / 20; // ROTATION SPEED
            planeAxe.position.y -= 1 / 20; // POSITION SPEED

            document.body.style.cursor = "grabbing";

        } else if (Math.abs(deltaY) > Math.abs(deltaX) && deltaY < 0) { // MOUSEMOVE DOWN

            if (!isDown) return;

            mesh.rotation.y += 0.1;

            planeAxe.rotation.y -= 1 / 2 * Math.PI / 20; // ROTATION SPEED
            planeAxe.position.y += 1 / 20; // POSITION SPEED

            document.body.style.cursor = "grabbing";
        }
    }
    last_position = {
        x: event.offsetX,
        y: event.offsetY
    }
})

/////// DRAG EVENT MOBILE ///////
document.body.addEventListener('touchmove', function(event) {
    if (typeof(last_position.x) != 'undefined') {
        var deltaX = last_position.x - event.offsetX,
            deltaY = last_position.y - event.offsetY;
        if (Math.abs(deltaX) > Math.abs(deltaY) && deltaX > 0) { // TOUCHMOVE LEFT

            if (!isDown) return;

            mesh.rotation.y += 0.1;

            planeAxe.rotation.y -= 1 / 2 * Math.PI / 20; // ROTATION SPEED
            planeAxe.position.y += 1 / 20; // POSITION SPEED

        } else if (Math.abs(deltaX) > Math.abs(deltaY) && deltaX < 0) { // TOUCHMOVE RIGHT

            if (!isDown) return;

            mesh.rotation.y -= 0.1;

            planeAxe.rotation.y += 1 / 2 * Math.PI / 20; // ROTATION SPEED
            planeAxe.position.y -= 1 / 20; // POSITION SPEED


        } else if (Math.abs(deltaY) > Math.abs(deltaX) && deltaY > 0) { // TOUCHMOVE UP

            if (!isDown) return;

            mesh.rotation.y -= 0.1;

            planeAxe.rotation.y += 1 / 2 * Math.PI / 20; // ROTATION SPEED
            planeAxe.position.y -= 1 / 20; // POSITION SPEED

        } else if (Math.abs(deltaY) > Math.abs(deltaX) && deltaY < 0) { // TOUCHMOVE DOWN

            if (!isDown) return;

            mesh.rotation.y += 0.1;

            planeAxe.rotation.y -= 1 / 2 * Math.PI / 20; // ROTATION SPEED
            planeAxe.position.y += 1 / 20; // POSITION SPEED
        }
    }
    last_position = {
        x: event.offsetX,
        y: event.offsetY
    }
})
