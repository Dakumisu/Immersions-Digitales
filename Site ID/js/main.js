var scene = new THREE.Scene(); // CRÉATION DE LA SCÈNE
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

var render = function() {
    requestAnimationFrame(render);

    mesh.rotation.y += 0.002;

    renderer.render(scene, camera);
};

render();

document.body.addEventListener('wheel', checkScrollDirection); // SCROLL EVENT 

function checkScrollDirection(event) {
    if (checkScrollDirectionIsUp(event)) {
        mesh.rotation.y += 0.1;
        mesh.position.y -= 0.05;
    } else {
        mesh.rotation.y -= 0.1;
        mesh.position.y += 0.05;
    }
}

function checkScrollDirectionIsUp(event) { // DÉTECTION DU SENS DU SCROLL 
    if (event.wheelDelta) {
        return event.wheelDelta > 0;
    }
    return event.deltaY < 0;
}