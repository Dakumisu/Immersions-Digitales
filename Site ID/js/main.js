////////// SCENE //////////
var scene = new THREE.Scene();

////////// CAMERA //////////
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 0, 3);

/////// RENDERER ///////
var renderer = new THREE.WebGLRenderer();
renderer.setClearColor("#020659");
renderer.setSize(window.innerWidth, window.innerHeight);

document.body.appendChild(renderer.domElement);

/////// RESIZE EVENT ///////
window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

})

/////// CENTRAL MODEL ///////
var geometry = new THREE.BoxGeometry(.5, 3, 1);
var material = new THREE.MeshLambertMaterial({ color: 0x0142AC });
var mesh = new THREE.Mesh(geometry, material);

mesh.castShadow = true;
mesh.receiveShadow = true;

scene.add(mesh);

var render = function () {
    requestAnimationFrame(render);
    mesh.rotation.y += 0.002;
    renderer.render(scene, camera);
};

render();

/////// PLANES ///////
var plane = new THREE.PlaneGeometry(1.6 / 1.5, .9 / 1.5);
var materialPlane = new THREE.MeshLambertMaterial({
    color: 0xffff00,
    side: THREE.DoubleSide,
    emissive: '#448aff'
});

let rotY = 0;
let posX = 0;
let posY = 0;
let posZ = 0;
let meshPlanes = [];

for (let i = 0; i < 2; i++) {
    meshPlane = new THREE.Mesh(plane, materialPlane);

    meshPlane.castShadow = true;
    meshPlane.receiveShadow = true;

    meshPlane.position.set(0 + posX, 0 + posY, 2 + posZ);
    meshPlane.rotation.y += rotY;

    meshPlanes.push(meshPlane);
    scene.add(meshPlane);

    rotY += 12 * Math.PI / 360 + 1 / 2 * Math.PI;
    posX += -2;
    posY += 0.7;
    posZ += -1.8;
}

/////// ROTATION AROUND AXIS ///////
function rotateAboutWorldAxis(object, axis, angle) {
    var rotationMatrix = new THREE.Matrix4();
    rotationMatrix.makeRotationAxis(axis.normalize(), angle);
    var currentPos = new THREE.Vector4(object.position.x, object.position.y, object.position.z);
    var newPos = currentPos.applyMatrix4(rotationMatrix);
    object.position.x = newPos.x;
    object.position.y = newPos.y;
    object.position.z = newPos.z;
}

/////// LIGHT ///////
const light = new THREE.PointLight(0xffffff, 1, 500);
light.position.set(10, 0, 25);
scene.add(light);


/////// SCROLL EVENT ///////
document.body.addEventListener('wheel', checkScrollDirection);

function checkScrollDirection(event) {
    if (checkScrollDirectionIsUp(event)) {
        mesh.rotation.y += 0.1;

        meshPlanes.forEach(e => {
            var yAxisPlane = new THREE.Vector3(0, 1);
            rotateAboutWorldAxis(e, yAxisPlane, Math.PI * 6 / -180);
            e.rotation.y -= 12 * Math.PI / 360;
            e.position.y += 0.05;
        });

    } else {
        mesh.rotation.y -= 0.1;

        meshPlanes.forEach(e => {
            var yAxisPlane = new THREE.Vector3(0, 1);
            rotateAboutWorldAxis(e, yAxisPlane, Math.PI * 6 / 180);
            e.rotation.y += 12 * Math.PI / 360;
            e.position.y -= 0.05;
        });
    }
}

function checkScrollDirectionIsUp(event) {
    if (event.wheelDelta) {
        return event.wheelDelta > 0;
    }
    return event.deltaY < 0;
}

// var scrollContainer = document.querySelector('.scrollContainer');
// var scrollPos = 0;

// document.body.addEventListener('scroll', function() {

//     if ((scrollContainer.getBoundingClientRect()).top > scrollPos) {
//         mesh.rotation.y += 0.1;

//         meshPlanes.forEach(e => {
//             var yAxisPlane = new THREE.Vector3(0, 50);
//             rotateAboutWorldAxis(e, yAxisPlane, Math.PI * 6 / -180);
//             e.rotation.y -= 12 * Math.PI / 360;
//             e.position.y += 0.05;

//         });
//     } else {
//         mesh.rotation.y -= 0.1;

//         meshPlanes.forEach(e => {
//             var yAxisPlane = new THREE.Vector3(0, 50);
//             rotateAboutWorldAxis(e, yAxisPlane, Math.PI * 6 / 180);
//             e.rotation.y += 12 * Math.PI / 360;
//             e.position.y -= 0.05;
//         });
//     }

//     scrollPos = (scrollContainer.getBoundingClientRect()).top;
// });