export let cart;
//function for mock testing 
loadfromstorage();
export function loadfromstorage() {
    cart = JSON.parse(localStorage.getItem('cart'));

    if (!cart) {
        cart = [{
            productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
            quantity: 2,
            deliveryid: '1'
        }, {
            productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
            quantity: 1,
            deliveryid: '2'
        }];
    }
}

function savecartdata() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

export function addtocart(productId) {
    let matchingitem;
    cart.forEach((product) => {
        if (product.productId == productId) {
            matchingitem = product;
        }
    });
    console.log(typeof (matchingitem));
    if (matchingitem) {
        matchingitem.quantity++;
    }
    else {
        cart.push({
            productId: productId,
            quantity: 1,
            deliveryid: '1'
        });
    }
    savecartdata();
}
export function reovefromcart(productId) {
    let newcart = [];
    cart.forEach((item) => {
        if (item.productId != productId) {
            newcart.push(item);
        }
    });
    cart = newcart;
    savecartdata();

}
export function updatedelivery(productId, deliverId) {
    let matchingitem;
    cart.forEach((product) => {
        if (product.productId == productId) {
            matchingitem = product;
        }
    });
    matchingitem.deliveryid = deliverId;
    savecartdata();
}