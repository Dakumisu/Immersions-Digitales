////////// SCENE //////////
var scene = new THREE.Scene(); // CRÉATION DE LA SCÈNE

////////// CAMERA //////////
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000); // CRÉATION DE LA CAMÉRA
camera.position.z = 3;

var renderer = new THREE.WebGLRenderer(); // CRÉATION DU RENDERER
renderer.setClearColor("#020659");
renderer.setSize(window.innerWidth, window.innerHeight);

document.body.appendChild(renderer.domElement);

window.addEventListener('resize', () => { // AJUSTEMENT DE LA TAILLE AU RESIZE
    renderer.setSize(window.innerWidth, window.innerHeight);

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
})

var geometry = new THREE.BoxGeometry(1, 3, 1); // CRÉATION DE LA GEOMETRY 
var material = new THREE.MeshLambertMaterial({ color: 0x0142AC }); // CRÉATION DU MATERIAL
var mesh = new THREE.Mesh(geometry, material); // CRÉATION DE LA MESH
scene.add(mesh);

const light = new THREE.PointLight(0xffffff, 1, 500);
light.position.set(10, 0, 25);
scene.add(light);

var item = new THREE.PlaneGeometry(1.92/1.5, 1.08/1.5);
var materialItem = new THREE.MeshBasicMaterial({ color: 0xffff00, side: THREE.DoubleSide });
var meshItem = new THREE.Mesh(item, materialItem);
scene.add(meshItem);

// plane.position.z = 0.8;


meshItem.position.set(0, 0, 1.5);

function rotateAboutWorldAxis(object, axis, angle) {
    var rotationMatrix = new THREE.Matrix4();
    rotationMatrix.makeRotationAxis(axis.normalize(), angle);
    var currentPos = new THREE.Vector4(object.position.x, object.position.y, object.position.z, 1.5);
    var newPos = currentPos.applyMatrix4(rotationMatrix);
    object.position.x = newPos.x;
    object.position.y = newPos.y;
    object.position.z = newPos.z;
}


var render = function () {
    requestAnimationFrame(render);
    
    mesh.rotation.y += 0.002;
    
    renderer.render(scene, camera);
};

render();

document.body.addEventListener('wheel', checkScrollDirection); // SCROLL EVENT 

function checkScrollDirection(event) {
    if (checkScrollDirectionIsUp(event)) {
        mesh.rotation.y += 0.1;
        // mesh.position.y -= 0.005;
        
        meshItem.rotation.y -= 2*Math.PI / 360;
        meshItem.rotation.x -= 0.1*Math.PI / 360;
        meshItem.position.y += 0.02;
        // meshItem.position.z += 2*Math.PI / 0.002;
        
        var yAxis = new THREE.Vector3(0, 50, 15);
        rotateAboutWorldAxis(meshItem, yAxis, Math.PI / -180);
    } else {
        mesh.rotation.y -= 0.1;
        // mesh.position.y += 0.005;
        
        meshItem.rotation.y += 2*Math.PI / 360;
        meshItem.rotation.x += 0.1*Math.PI / 360;
        meshItem.position.y -= 0.02;
        // meshItem.position.z -= 2*Math.PI / 0.002;
        
        var yAxis = new THREE.Vector3(0, 50, 15);
        rotateAboutWorldAxis(meshItem, yAxis, Math.PI / 180);
    }
}

function checkScrollDirectionIsUp(event) { // DÉTECTION DU SENS DU SCROLL 
    if (event.wheelDelta) {
        return event.wheelDelta > 0;
    }
    return event.deltaY < 0;
}