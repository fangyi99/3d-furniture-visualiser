<p align="justify">
  
# 3D Furniture Visualiser
 This repository allows you to customise the color of 3D models using THREE.js. 
 <p align="center">
 <a href="https://ibb.co/w7rVjGy"><img src="https://i.ibb.co/bFRTDw1/Screenshot-2022-02-28-181622.png" alt="Screenshot-2022-02-28-181622" border="0"></a>
 </p>
  
## Usage
### Mesh Rendering
> Based on: [Three.js](https://github.com/mrdoob/three.js/)
<br> Based on: [GLTF Loader](https://threejs.org/docs/#examples/en/loaders/GLTFLoader)
  
This code consists of 4 sections: creating the scene, setting the controls, importing the mesh and rendering the scene.

    let scene, camera, renderer, controls;
    let canvasWidth = window.innerWidth * 0.5;
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
        document.getElementById('mesh').appendChild(renderer.domElement);

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
        loader.load('../../assets/models/main_feature/scene.gltf', function(gltf) {
            mesh = gltf.scene.children[0];
            mesh.position.set(0, -20, 0);
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
  
## Credits
This application uses the following open source packages:
- [Node.js](https://nodejs.org/en/)
- [Three.js](https://github.com/mrdoob/three.js/)
- [GLB-Viewer](https://github.com/bytezeroseven/GLB-Viewer)
- [Color Customiser](https://tympanus.net/codrops/2019/09/17/how-to-build-a-color-customizer-app-for-a-3d-model-with-three-js/)
  
</p>
