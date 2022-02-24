let productId = new URL(window.location.href).searchParams.get("id");
let selectedProduct = products.find((p) => p.id === parseInt(productId));