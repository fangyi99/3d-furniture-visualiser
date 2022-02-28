let scene, camera, renderer, controls;
let canvasWidth = window.innerWidth * 0.72;
let canvasHeight = window.innerHeight * 0.97;
var mesh;

function init() {
    createStage();
    setControls();
    configureViewCube();
    renderMesh(createParts);
}

function createStage() {
    //scene
    scene = new THREE.Scene();

    //camera
    camera = new THREE.PerspectiveCamera(45, canvasWidth / canvasHeight, 1, 1000);
    // camera.position.y = 30;
    camera.position.z = 100;

    //lightings
    alight = new THREE.AmbientLight(0xffffff, 0.3);
    scene.add(alight);

    dlight1 = new THREE.DirectionalLight(0xffffff, 0.3);
    dlight1.position.set(10, 10, 5);
    scene.add(dlight1);

    dlight2 = new THREE.DirectionalLight(0xffffff, 0.3);
    dlight2.position.set(0, 10, 0);
    scene.add(dlight2);

    slight = new THREE.SpotLight(0xffffff, 0.3);
    slight.position.set(1000, 0, 0);
    scene.add(slight);

    //renderer
    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(canvasWidth, canvasHeight);
    renderer.setClearColor(0xffffff, 0);
    renderer.domElement.classList.add('mainRenderer');
    document.body.appendChild(renderer.domElement);

}

function setControls() {
    //controls
    controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enablePan = false;
}

function renderMesh(callback) {
    let loader = new THREE.GLTFLoader();
    loader.load('../../assets/models/' + selectedProduct.model, function(gltf) {
        mesh = gltf.scene;
        setDefaultColor(mesh);
        resizeMesh(camera);
        centerMesh(gltf);
        scene.add(gltf.scene);
        renderer.render(scene, camera);
        callback(mesh);

    }, undefined, function(error) {
        console.error(error);
    });
    return mesh;
}

function centerMesh(gltf) {
    const box = new THREE.Box3().setFromObject(gltf.scene);
    const center = box.getCenter(new THREE.Vector3());

    gltf.scene.position.x += gltf.scene.position.x - center.x;
    gltf.scene.position.y += gltf.scene.position.y - center.y;
    gltf.scene.position.z += gltf.scene.position.z - center.z;
}

function resizeMesh(camera) {
    offset = 3;

    const boundingBox = new THREE.Box3();

    boundingBox.setFromObject(camera);

    const center = boundingBox.getCenter(new THREE.Vector3());
    const size = boundingBox.getSize(new THREE.Vector3());

    const startDistance = center.distanceTo(camera.position);
    // here we must check if the screen is horizontal or vertical, because camera.fov is
    // based on the vertical direction.
    const endDistance =
        camera.aspect > 1 ?
        (size.y / 2 + offset) / Math.abs(Math.tan(camera.fov / 2)) :
        (size.y / 2 + offset) /
        Math.abs(Math.tan(camera.fov / 2)) /
        camera.aspect;

    camera.position.set(
        (camera.position.x * endDistance) / startDistance,
        (camera.position.y * endDistance) / startDistance,
        (camera.position.z * endDistance) / startDistance
    );
    camera.lookAt(center);
}

function setDefaultColor(mesh) {
    let default_mtl;
    default_mtl = new THREE.MeshPhongMaterial({
        color: 0xB1B1B1,
    });

    mesh.traverse((c) => {
        c.material = default_mtl;
    });

}

function setMaterial(parent, part, mtl) {
    if (part == null) {
        window.alert("Please select a part!");
    }
    parent.traverse((o) => {
        if (o.type == 'Mesh' && o.name == part) {
            o.material = mtl;
        }
    });
}

function animate() {
    renderer.render(scene, camera);
    updateCubeCamera();
    cubeRenderer.render(cubeScene, cubeCamera);
    requestAnimationFrame(animate);
    controls.update();
}


init();
animate();