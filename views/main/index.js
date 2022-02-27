const products = [
    { id: 1, name: "Modern Armchair", category: "chairs", img: "https://img-new.cgtrader.com/items/2654307/cab899a309/grey-modern-armchair-3d-model-obj-stl-gltf.jpg", model: "chair1.glb" },
    { id: 2, name: "Wooden Cabinet", category: "wardrobes", img: "https://img-new.cgtrader.com/items/3089911/4a999670e7/3d-wooden-cabinet-3d-model-rigged-max-obj-fbx-gltf.jpg", model: "wardrobe1.glb" },
    { id: 3, name: "Modern Sofa", category: "sofas", img: "https://img2.cgtrader.com/items/2784986/aa0bf58d9b/a-modern-sofa-set-3d-model-low-poly-fbx-blend-dae-gltf.jpg", model: "sofa1.gltf" },
    { id: 4, name: "Dining Armchair", category: "chairs", img: "https://img1.cgtrader.com/items/3534240/6f638f63e6/dining-chair-3d-model-low-poly-obj-fbx-stl-blend-gltf.jpg", model: "chair5.glb" },
    { id: 5, name: "William Couch", category: "sofas", img: "https://img1.cgtrader.com/items/3036700/4f1ae78ae1/william-couch-3d-model-obj-fbx-stl-blend-dae-abc.jpg", model: "william_couch.glb" },
    { id: 6, name: "Koltuk Sofa", category: "sofas", img: "https://img2.cgtrader.com/items/3607059/d3ea550d62/free-sofa-furniture-home-blender-3d-model-obj-fbx-stl-blend-dae-abc.jpg", model: "koltuk_sofa.glb" },
    { id: 7, name: "Office Desk", category: "tables", img: "https://img1.cgtrader.com/items/2406334/45d6181b62/office-desk-3d-model-low-poly-fbx-blend-gltf.jpg", model: "table2.gltf" },
    { id: 8, name: "Table", category: "tables", img: "https://img2.cgtrader.com/items/2546366/7a93388122/table-3d-model-3d-model-low-poly-obj-fbx-stl-abc-gltf.jpg", model: "table3.glb" },
    { id: 9, name: "Chesterfield Sofa", category: "sofas", img: "https://img1.cgtrader.com/items/2722552/5bba0b9220/chesterfield-sofa-3d-model-low-poly-obj-fbx-blend-spp-gltf.jpg", model: "sofa3.glb" },
    { id: 10, name: "Sofa", category: "sofas", img: "https://img-new.cgtrader.com/items/3220457/8b6c908069/low-polly-sofa-with-textures-3d-model-low-poly-obj-fbx-blend-dae-gltf.jpg", model: "sofa4.glb" },
];

const colors = [
    { color: 'f1f1f1' },
    { color: 'e8c060' },
    { color: 'ea9078' },
    { color: '153944' },
    { color: '66533C' }
];

function listProducts(category) {
    window.location = "/listings?category=" + category;
}

function getProductDetails(id) {
    window.location = "/details?id=" + id;
}