var cubeCamera, cubeControls, cubeRenderer, cubeCameraDistance, planes, cube;
const cubeWrapper = document.getElementById("orientCubeWrapper");

function configureViewCube() {
    cubeCameraDistance = 1.75;
    cubeScene = new THREE.Scene();
    cubeCamera = new THREE.PerspectiveCamera(
        70,
        cubeWrapper.offsetWidth / cubeWrapper.offsetHeight,
        0.1,
        100
    );
    cubeRenderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
        preserveDrawingBuffer: true,
    });

    cubeRenderer.setSize(cubeWrapper.offsetWidth, cubeWrapper.offsetHeight);
    cubeRenderer.setPixelRatio(window.devicePixelRatio);

    cubeWrapper.appendChild(cubeRenderer.domElement);
    createCube(cubeScene);
    updateCubeCamera();

    let activePlane = null;

    cubeRenderer.domElement.onmousemove = function(evt) {
        if (activePlane) {
            activePlane.material.opacity = 0;
            activePlane.material.needsUpdate = true;
            activePlane = null;
        }

        let x = evt.offsetX;
        let y = evt.offsetY;
        let size = cubeRenderer.getSize(new THREE.Vector2());
        let mouse = new THREE.Vector2(
            (x / size.width) * 2 - 1,
            (-y / size.height) * 2 + 1
        );

        let raycaster = new THREE.Raycaster();
        raycaster.setFromCamera(mouse, cubeCamera);
        let intersects = raycaster.intersectObjects(planes.concat(cube));

        if (intersects.length > 0 && intersects[0].object != cube) {
            activePlane = intersects[0].object;
            activePlane.material.opacity = 0.2;
            activePlane.material.needsUpdate = true;
        }
    };

    let oldPosition = new THREE.Vector3();
    let newPosition = new THREE.Vector3();

    cubeRenderer.domElement.onclick = function(evt) {
        cubeRenderer.domElement.onmousemove(evt);

        if (!activePlane) {
            return false;
        }

        oldPosition.copy(camera.position);

        let distance = camera.position.clone().sub(controls.target).length();
        newPosition.copy(controls.target);

        if (activePlane.position.x !== 0) {
            newPosition.x += activePlane.position.x < 0 ? -distance : distance;
        } else if (activePlane.position.y !== 0) {
            newPosition.y += activePlane.position.y < 0 ? -distance : distance;
        } else if (activePlane.position.z !== 0) {
            newPosition.z += activePlane.position.z < 0 ? -distance : distance;
        }

        camera.position.copy(newPosition);
    };

    cubeRenderer.domElement.ontouchmove = function(e) {
        let rect = e.target.getBoundingClientRect();
        let x = e.targetTouches[0].pageX - rect.left;
        let y = e.targetTouches[0].pageY - rect.top;
        cubeRenderer.domElement.onmousemove({
            offsetX: x,
            offsetY: y,
        });
    };

    cubeRenderer.domElement.ontouchstart = function(e) {
        let rect = e.target.getBoundingClientRect();
        let x = e.targetTouches[0].pageX - rect.left;
        let y = e.targetTouches[0].pageY - rect.top;
        cubeRenderer.domElement.onclick({
            offsetX: x,
            offsetY: y,
        });
    };

    cubeControls = new THREE.OrbitControls(camera, cubeRenderer.domElement);
    cubeControls.enablePan = false;
    cubeControls.enableZoom = false;
    cubeControls.rotateSpeed = 0.125;
}

function createCube(cubeScene) {
    let materials = [];
    let texts = ["RIGHT", "LEFT", "TOP", "BOTTOM", "FRONT", "BACK"];

    let textureLoader = new THREE.TextureLoader();
    let canvas = document.createElement("canvas");
    let ctx = canvas.getContext("2d");

    size = 64;
    canvas.width = size;
    canvas.height = size;

    ctx.font = 'bolder 12px "Open sans", Arial';
    ctx.textBaseline = "middle";
    ctx.textAlign = "center";

    let mainColor = "#fff";
    let otherColor = "#ccc";

    let bg = ctx.createLinearGradient(0, 0, 0, size);
    bg.addColorStop(0, mainColor);
    bg.addColorStop(1, otherColor);

    for (let i = 0; i < 6; i++) {
        if (texts[i] == "TOP") {
            ctx.fillStyle = mainColor;
        } else if (texts[i] == "BOTTOM") {
            ctx.fillStyle = otherColor;
        } else {
            ctx.fillStyle = bg;
        }
        ctx.fillRect(0, 0, size, size);
        ctx.strokeStyle = "#aaa";
        ctx.setLineDash([8, 8]);
        ctx.lineWidth = 4;
        ctx.strokeRect(0, 0, size, size);
        ctx.fillStyle = "#999";
        ctx.fillText(texts[i], size / 2, size / 2);
        materials[i] = new THREE.MeshBasicMaterial({
            map: textureLoader.load(canvas.toDataURL()),
        });
    }

    planes = [];

    let planeMaterial = new THREE.MeshBasicMaterial({
        side: THREE.DoubleSide,
        color: 0x00c0ff,
        transparent: true,
        opacity: 0,
        depthTest: false,
    });
    let planeSize = 0.7;
    let planeGeometry = new THREE.PlaneGeometry(planeSize, planeSize);

    let a = 0.51;

    let plane1 = new THREE.Mesh(planeGeometry, planeMaterial.clone());
    plane1.position.z = a;
    cubeScene.add(plane1);
    planes.push(plane1);

    let plane2 = new THREE.Mesh(planeGeometry, planeMaterial.clone());
    plane2.position.z = -a;
    cubeScene.add(plane2);
    planes.push(plane2);

    let plane3 = new THREE.Mesh(planeGeometry, planeMaterial.clone());
    plane3.rotation.y = Math.PI / 2;
    plane3.position.x = a;
    cubeScene.add(plane3);
    planes.push(plane3);

    let plane4 = new THREE.Mesh(planeGeometry, planeMaterial.clone());
    plane4.rotation.y = Math.PI / 2;
    plane4.position.x = -a;
    cubeScene.add(plane4);
    planes.push(plane4);

    let plane5 = new THREE.Mesh(planeGeometry, planeMaterial.clone());
    plane5.rotation.x = Math.PI / 2;
    plane5.position.y = a;
    cubeScene.add(plane5);
    planes.push(plane5);

    let plane6 = new THREE.Mesh(planeGeometry, planeMaterial.clone());
    plane6.rotation.x = Math.PI / 2;
    plane6.position.y = -a;
    cubeScene.add(plane6);
    planes.push(plane6);

    let groundMaterial = new THREE.MeshBasicMaterial({
        color: 0xaaaaaa,
    });
    let groundGeometry = new THREE.PlaneGeometry(1, 1);
    let groundPlane = new THREE.Mesh(groundGeometry, groundMaterial);
    groundPlane.rotation.x = -Math.PI / 2;
    groundPlane.position.y = -0.6;

    cubeScene.add(groundPlane);

    cube = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), materials);
    cubeScene.add(cube);
}

function updateCubeCamera() {
    cubeCamera.rotation.copy(camera.rotation);
    let dir = camera.position.clone().sub(controls.target).normalize();
    cubeCamera.position.copy(dir.multiplyScalar(cubeCameraDistance));
}