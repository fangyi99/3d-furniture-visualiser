const products = [
    { id: 1, name: "Birch Stool", category: "chairs", img: "https://www.ikea.com/sg/en/images/products/kyrre-stool-birch__0714153_pe729952_s5.jpg?f=s", model: "" },
    { id: 2, name: "Birch Armchair", category: "chairs", img: "https://www.ikea.com/sg/en/images/products/poaeng-armchair-birch-veneer-knisa-light-beige__0571500_pe666933_s5.jpg?f=s", model: "" },
    { id: 3, name: "Gunnared Recliner", category: "chairs", img: "https://www.ikea.com/sg/en/images/products/ekolsund-recliner-gunnared-dark-grey__0709891_pe727153_s5.jpg?f=s", model: "" },
    { id: 4, name: "Samsta Corner Section Sofa", category: "sofas", img: "https://www.ikea.com/sg/en/images/products/soederhamn-corner-section-cover-samsta-dark-grey__0141356_pe301240_s5.jpg?f=s", model: "" },
    { id: 5, name: "Wing Chair", category: "chairs", img: "https://www.ikea.com/sg/en/images/products/strandmon-wing-chair-skiftebo-yellow__0325450_pe517970_s5.jpg?f=s", model: "" },
    { id: 6, name: "Ritchie Armchair", category: "chairs", img: "https://res.cloudinary.com/castlery/image/private/w_700,f_auto,q_auto/b_rgb:F3F3F3,c_fit/v1624964136/crusader/variants/T50440583-PL4001-NA/Capella-Armchair-Light-Gray-Natural-Leg.jpg", model: "" },
    { id: 7, name: "Corner Sofa with Storage", category: "sofas", img: "https://www.ikea.com/sg/en/images/products/friheten-corner-sofa-bed-with-storage-skiftebo-dark-grey__0175610_pe328883_s5.jpg", model: "" },
    { id: 8, name: "Miggy 2 Door Wardrobe", category: "wardrobes", img: "https://www.fortytwo.sg/media/catalog/product/cache/1/image/600x870/040ec09b1e35df139433887a97daa66f/w/e/wenge_miggy_1.jpg", model: "" },
    { id: 9, name: "2 Door Armoire Wardrobe", category: "wardrobes", img: "https://i.pinimg.com/originals/e9/b4/ee/e9b4ee42131d21cc2fbbafbeaf5d48dd.jpg", model: "" },
    { id: 10, name: "Walnut Coffee Table", category: "tables", img: "https://i.ytimg.com/vi/IY02nJQezSw/maxresdefault.jpg", model: "" }
]

function listProducts(category) {
    window.location = "/listings?category=" + category;
}

function getProductDetails(id) {
    window.location = "/details?id=" + id;
}