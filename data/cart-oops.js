
function Cart(localstoragekey) {
    const Cart = {
        cartitems: undefined,
        loadfromstorage: function () {   /* we can use loadfromstorage(){} */
            this.cartitems = JSON.parse(localStorage.getItem(localstoragekey));

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

        },
        savecartdata: function () {
            localStorage.setItem(localstoragekey, JSON.stringify(this.cartitems));
        },
        addtocart: function () {
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
        },
        reovefromcart: function () {
            let newcart = [];
            this.cartitems.forEach((item) => {
                if (item.productId != productId) {
                    newcart.push(item);
                }
            });
            this.cartitems = newcart;
            this.savecartdata();
        },
        updatedelivery: function () {
            let matchingitem;
            this.cartitems.forEach((product) => {
                if (product.productId == productId) {
                    matchingitem = product;
                }
            });
            matchingitem.deliveryid = deliverId;
            this.savecartdata();
        }
    };
    return Cart;
}
Cart.loadfromstorage();

const cart = Cart('cart-oops');
const bussinesscart = Cart('cart-bussiness');
/* for creating multiple carts at a time rather than using a an 
array of objects we used a single object with array 
of object inside 

*/
