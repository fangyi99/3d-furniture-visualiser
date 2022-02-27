let productId = new URL(window.location.href).searchParams.get("id");
let selectedProduct = products.find((p) => p.id === parseInt(productId));
var activePart = null;
const options = document.getElementById('parts');
const palette = document.getElementById('palette');

function createPalette(colors) {
    for (let [i, color] of colors.entries()) {
        let swatch = document.createElement('button');
        swatch.classList.add('swatch');
        swatch.style.background = "#" + color.color;
        swatch.setAttribute('data-key', i);
        palette.append(swatch);
    }

    const swatches = document.querySelectorAll(".swatch");
    for (const swatch of swatches) {
        swatch.addEventListener('click', selectSwatch);
    }
}

createPalette(colors);

var createParts = (mesh) => {
    console.log(mesh);
    mesh.traverse((o) => {
        if (o.type == 'Mesh') {
            let part = document.createElement('div');
            part.innerText = o.name;
            part.classList.add('part');
            part.setAttribute('data-part', o.name);
            options.appendChild(part);
        }
    });

    const parts = document.querySelectorAll(".part");

    for (const part of parts) {
        part.addEventListener('click', selectPart);
    }
}

function selectSwatch(e) {
    let color = colors[parseInt(e.target.dataset.key)];
    let new_mtl;

    new_mtl = new THREE.MeshPhongMaterial({
        color: parseInt('0x' + color.color),
        shininess: color.shininess ? color.shininess : 10
    });

    setMaterial(mesh, activePart, new_mtl);
}

function selectPart(e) {
    let part = e.target;
    activePart = e.target.dataset.part;
    for (const otherPart of parts) {
        otherPart.classList.remove('active');
    }
    part.classList.add('active');
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