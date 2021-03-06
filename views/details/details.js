let productId = new URL(window.location.href).searchParams.get("id");
let selectedProduct = products.find((p) => p.id === parseInt(productId));
var activePart = null;
let parts;
const options = document.getElementById('parts');
const palette = document.getElementById('palette');

//create collapsibles
var coll = document.getElementsByClassName("collapsible");
var i;

for (i = 0; i < coll.length; i++) {
    coll[i].addEventListener("click", function() {
        this.classList.toggle("active");
        var content = this.nextElementSibling;
        if (content.style.display === "block") {
            content.style.display = "none";
        } else {
            content.style.display = "block";
        }
    });
}

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
    mesh.traverse((o) => {
        if (o.type == 'Mesh') {
            let part = document.createElement('div');
            part.innerText = o.name;
            part.classList.add('part');
            part.setAttribute('data-part', o.name);
            options.appendChild(part);
        }
    });

    parts = document.querySelectorAll(".part");
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
    for (const otherPart of parts) {
        otherPart.classList.remove('active');
    }
    //check selection method
    //raycaster selection
    if (e.geometry) {
        activePart = e.name;
        //find html division
        let htmlEle = Object.values(parts).find((d) => d.getAttribute("data-part") === activePart);
        htmlEle.classList.add('active');
    }
    //panel selection
    else {
        let part = e.target;
        activePart = e.target.dataset.part;
        part.classList.add('active');
    }
}