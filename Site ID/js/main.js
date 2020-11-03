////////// SCENE //////////
var scene = new THREE.Scene();

////////// CAMERA //////////
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 3;

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
var geometry = new THREE.BoxGeometry(1, 3, 1);
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
    emissive: '#448aff',
    specular: '#efefef',
    shininess: 20,
    flatShading: true,
});
<<<<<<< Updated upstream


// meshPlane.position.set(0, 0, 2);

// meshPlane.castShadow = true;
// meshPlane.receiveShadow = true;

// scene.add(meshPlane);

let rotY = 0;
let posX = 0;
let posY = 0;
let posZ = 0;
let meshPlanes = [];

for (let i = 0; i < 2; i++) {
    meshPlane = new THREE.Mesh(plane, materialPlane);

    meshPlane.position.set(0 + posX, 0 + posY, 2);
    meshPlane.rotation.y += rotY;

    meshPlane.castShadow = true;
    meshPlane.receiveShadow = true;

    meshPlanes.push(meshPlane);
    scene.add(meshPlane);

=======

var meshPlane = new THREE.Mesh(plane, materialPlane);

// meshPlane.position.set(0, 0, 2);

// meshPlane.castShadow = true;
// meshPlane.receiveShadow = true;

// scene.add(meshPlane);

let rotY = 0;
let posX = 0;
let posY = 0;
let posZ = 0;
let meshPlanes = [];

for (let i = 0; i < 10; i++) {
    var meshPlane = new THREE.Mesh(plane, materialPlane);

    meshPlane.position.set(0 + posX, 0 + posY, 2);
    meshPlane.rotation.y += rotY;

    meshPlane.castShadow = true;
    meshPlane.receiveShadow = true;

    meshPlanes.push(meshPlane);
    scene.add(meshPlane);

    console.log(meshPlanes);

>>>>>>> Stashed changes
    rotY += 0.7330382858376184;
    posX += 0.9999999999999997;
    posY += -0.35;
    // posZ += 1.486289650954788;
}

/////// PLANE2 ///////
// var plane2 = new THREE.PlaneGeometry(1.6 / 1.5, .9 / 1.5);
// var materialPlane2 = new THREE.MeshLambertMaterial({
//     color: 0xff0000,
//     side: THREE.DoubleSide
// });
// var meshPlane2 = new THREE.Mesh(plane2, materialPlane2);

// meshPlane2.position.set(0, 0, 2);

// meshPlane2.castShadow = true;
// meshPlane2.receiveShadow = true;

// scene.add(meshPlane2);


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
// document.body.addEventListener('scroll', checkScrollDirection);

// function checkScrollDirection(event) {
//     if (checkScrollDirectionIsUp(event)) {
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
// }

// function checkScrollDirectionIsUp(event) {
//     if (event.scrollDelta) {
//         return event.scrollDelta > 0;
//     }
//     return event.deltaY < 0;
// }


var scrollContainer = document.querySelector('.scrollContainer');
var scrollPos = 0;

document.body.addEventListener('scroll', function() {

    if ((scrollContainer.getBoundingClientRect()).top > scrollPos) {
        mesh.rotation.y += 0.1;

        meshPlanes.forEach(e => {
            var yAxisPlane = new THREE.Vector3(0, 50);
            rotateAboutWorldAxis(e, yAxisPlane, Math.PI * 6 / -180);
            e.rotation.y -= 12 * Math.PI / 360;
            e.position.y += 0.05;

<<<<<<< Updated upstream
        });
=======
            console.log(e.position)
        });
        

        // for (let i = 0; i < nbPlane; i++) {
        //     var yAxisPlane = new THREE.Vector3(0, 50);
        //     rotateAboutWorldAxis(meshPlane.i, yAxisPlane, Math.PI * 6 / -180);
        //     meshPlane.i.rotation.y -= 12 * Math.PI / 360;
        //     meshPlane.i.position.y += 0.05;

        //     console.log(meshPlane.i.position);
        // }

        // var yAxisPlane = new THREE.Vector3(0, 50);
        // rotateAboutWorldAxis(meshPlane, yAxisPlane, Math.PI * 6 / -180);
        // meshPlane.rotation.y -= 12 * Math.PI / 360;
        // meshPlane.position.y += 0.05;

        // console.log(meshPlane.rotation.y);
        // console.log(meshPlane.position.y);
        // console.log(meshPlane.position.z);
>>>>>>> Stashed changes
    } else {
        mesh.rotation.y -= 0.1;

        meshPlanes.forEach(e => {
            var yAxisPlane = new THREE.Vector3(0, 50);
            rotateAboutWorldAxis(e, yAxisPlane, Math.PI * 6 / 180);
            e.rotation.y += 12 * Math.PI / 360;
            e.position.y -= 0.05;
        });
<<<<<<< Updated upstream
    }
=======

        // for (let i = 0; i < nbPlane; i++) {
        //     var yAxisPlane = new THREE.Vector3(0, 50);
        //     rotateAboutWorldAxis(meshPlane.i, yAxisPlane, Math.PI * 6 / 180);
        //     meshPlane.i.rotation.y += 12 * Math.PI / 360;
        //     meshPlane.i.position.y -= 0.05;

        //     console.log(meshPlane.i.position);

        // }

        // var yAxisPlane = new THREE.Vector3(0, 50);
        // rotateAboutWorldAxis(meshPlane, yAxisPlane, Math.PI * 6 / 180);
        // meshPlane.rotation.y += 12 * Math.PI / 360;
        // meshPlane.position.y -= 0.05;

        // var yAxisPlane2 = new THREE.Vector3(0, 50);
        // rotateAboutWorldAxis(meshPlane2, yAxisPlane2, Math.PI * 6 / 180);
        // meshPlane2.rotation.y += 12 * Math.PI / 360;
        // meshPlane2.position.y -= 0.05;
    }
    
}
>>>>>>> Stashed changes

    scrollPos = (scrollContainer.getBoundingClientRect()).top;
});