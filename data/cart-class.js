class Cart {
    cartitems = undefined;
    #localstoragekey = undefined; /* means private only altered inside the class */
    constructor(storagekey) {
        this.localstoragekey = storagekey;
    }
    loadfromstorage() {   /* we can use loadfromstorage(){} */
        this.cartitems = JSON.parse(localStorage.getItem(this.#localstoragekey));

        if (!this.cartitems) {
            this.cartitems = [{
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
    savecartdata() {
        localStorage.setItem(this.#localstoragekey, JSON.stringify(this.cartitems));
    }
    addtocart() {
        let matchingitem;
        this.cartitems.forEach((product) => {
            if (product.productId == productId) {
                matchingitem = product;
            }
        });
        console.log(typeof (matchingitem));
        if (matchingitem) {
            matchingitem.quantity++;
        }
        else {
            this.cartitems.push({
                productId: productId,
                quantity: 1,
                deliveryid: '1'
            });
        }
        this.savecartdata();
    }
    reovefromcart() {
        let newcart = [];
        this.cartitems.forEach((item) => {
            if (item.productId != productId) {
                newcart.push(item);
            }
        });
        this.cartitems = newcart;
        this.savecartdata();
    }
    updatedelivery() {
        let matchingitem;
        this.cartitems.forEach((product) => {
            if (product.productId == productId) {
                matchingitem = product;
            }
        });
        matchingitem.deliveryid = deliverId;
        this.savecartdata();
    }

}


Cart.loadfromstorage();

const cart = new Cart('cart-class');
const bussinesscart = new Cart('cart-bussiness-class');
/* for creating multiple carts at a time rather than using a an 
array of objects we used a single class and a constructor with array 
of object inside 

*/
