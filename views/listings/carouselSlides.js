let category = new URL(window.location.href).searchParams.get("category");
let filteredProducts = products.filter((p) => p.category === category);

//create image slideshow
function createSlides() {
    for (i = 0; i < filteredProducts.length; i++) {
        var product = filteredProducts[i];
        var html = document.getElementById("inner1");
        if (i == 0 && i % 3 == 0) {
            //create active carousel div
            var ele = document.createElement("div");
            ele.classList.add("carousel-item");
            ele.classList.add("active");
            html.appendChild(ele);

            ele2 = document.createElement("div");
            ele2.classList.add("container");
            ele.appendChild(ele2);
        } else if (i !== 0 && i % 3 == 0) {
            //create normal carousel div
            var ele = document.createElement("div");
            ele.classList.add("carousel-item");
            html.appendChild(ele);

            ele2 = document.createElement("div");
            ele2.classList.add("container");
            ele.appendChild(ele2);
        }

        //add image container
        var ele3 = document.createElement("div");
        ele2.appendChild(ele3);

        //add image
        var img = document.createElement("img");
        img.setAttribute("id", product.id);
        img.src = product.img;
        ele3.appendChild(img);

        img.onclick = function(e) {
            getProductDetails(e.target.id);
        }
    }
}

createSlides();