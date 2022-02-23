let scene, camera, renderer, controls;
let canvasWidth = window.innerWidth;
let canvasHeight = window.innerHeight;

function init() {
    createStage();
    setControls();
    renderMesh();

}

function createStage() {
    //scene
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf26b8a);

    //camera
    camera = new THREE.PerspectiveCamera(40, canvasWidth / canvasHeight, 1, 5000);
    camera.position.y = 30;
    camera.position.z = 100;

    //lightings
    alight = new THREE.AmbientLight(0xffffff, 0.3);
    scene.add(alight);

    dlight1 = new THREE.DirectionalLight(0xffffff, 1);
    dlight1.position.set(10, 10, 5);
    scene.add(dlight1);

    dlight2 = new THREE.DirectionalLight(0xffffff, 1.5);
    dlight2.position.set(0, 10, 0);
    scene.add(dlight2);

    slight = new THREE.SpotLight(0xffffff, 1);
    slight.position.set(1000, 0, 0);
    scene.add(slight);

    //renderer
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(canvasWidth, canvasHeight);
    document.body.appendChild(renderer.domElement);

}

function setControls() {
    //controls
    controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.autoRotate = true;
    controls.enableZoom = false;
    controls.enablePan = false;
}

function renderMesh() {
    let loader = new THREE.GLTFLoader();
    loader.load('../../assets/models/armchair/scene.gltf', function(gltf) {
        mesh = gltf.scene.children[0];
        mesh.position.set(-30, -20, 0);
        mesh.scale.set(0.7, 0.7, 0.7);
        scene.add(gltf.scene);
        renderer.render(scene, camera);

    }, undefined, function(error) {

        console.error(error);

    });
}

function animate() {
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
    controls.update();
}

init();
animate();