import { cart, reovefromcart, updatedelivery } from "../data/cart.js";
import { products, loadproducts } from "../data/products.js";
import { deliveryoptions } from "../data/delivarycart.js";
import { payment } from "./payment.js";

loadproducts(renderthepage);

/* renderthepage(); used to be active */
export function renderthepage() {
  let html = '';


  cart.forEach((cartitem, index) => {
    console.log(cartitem.deliveryid);
    const productId = cartitem.productId;
    let matchproduct = '';
    products.forEach((product) => {
      if (productId == product.id) {
        matchproduct = product;

      }
    });
    let matchingid = '';
    deliveryoptions.forEach((item) => {
      if (item.id == cartitem.deliveryid) {
        matchingid = item;
      }
    });
    const date = dayjs();
    const deliverdate = date.add(matchingid.deliverydays, 'days');
    const day = deliverdate.format("dddd, MMMM D");
    html += `<div class="cart-item-container js-cart-container-${matchproduct.id}">
            <div class="delivery-date">
              Delivery date: ${day}
            </div>

            <div class="cart-item-details-grid">
              <img class="product-image"
                src="${matchproduct.image}">

              <div class="cart-item-details">
                <div class="product-name">
                  ${matchproduct.name}
                </div>
                <div class="product-price">
                  $${(matchproduct.priceCents / 100).toFixed(2)}
                </div>
                <div class="product-quantity">
                  <span>
                    Quantity: <span class="quantity-label">${cartitem.quantity}</span>
                  </span>
                  <span class="update-quantity-link link-primary">
                    Update
                  </span>
                  <span class="delete-quantity-link link-primary js-delete-item"
                   data-product-id="${matchproduct.id}">
                    Delete
                  </span>
                </div>
              </div>

              <div class="delivery-options">
                <div class="delivery-options-title">
                  Choose a delivery option:
                </div>
                 ${deliveryoptionhtml(index, cartitem)} 
              </div>
            </div>
          </div>`;

  });
  /* console.log(html); */
  function deliveryoptionhtml(index, cartitem) {
    let deliveryhtml = '';
    deliveryoptions.forEach((item) => {
      const date = dayjs();
      const deliverdate = date.add(item.deliverydays, 'days');
      const day = deliverdate.format("dddd, MMMM D");
      const price = (item.priceCents == 0) ? ('free') : (`$${(item.priceCents / 100).toFixed(2)}`);
      const ischecked = item.id === cartitem.deliveryid;
      deliveryhtml += `<div class="delivery-option js-input-button"
                        data-delivery-id="${item.id}"
                        data-product-id="${cartitem.productId}">
                  <input type="radio"
                    ${ischecked ? 'checked' : ''}
                    class="delivery-option-input"
                    
                    name="delivery-option-${index}">
                  <div>
                    <div class="delivery-option-date">
                      ${day}
                    </div>
                    <div class="delivery-option-price">
                       ${price}- Shipping
                    </div>
                  </div>
                </div>
                `;
    });
    return deliveryhtml;
  }

  const body = document.querySelector('.js-checkout-container');
  body.innerHTML = html;
  document.querySelectorAll('.js-delete-item')
    .forEach((item) => {
      item.addEventListener('click', () => {
        const productId = item.dataset.productId;
        console.log(productId);
        /* let newcart = [];
        cart.forEach((product) => {
            if (product.productId != productId) {
                newcart.push(product);
            }
        });
        cart = newcart; */
        reovefromcart(productId);
        const container = document.querySelector(`.js-cart-container-${productId}`);
        console.log(container);
        container.remove();
        payment();
      });
    });
  document.querySelectorAll('.js-input-button')
    .forEach((button) => {
      button.addEventListener('click', () => {
        const deliveryId = button.dataset.deliveryId;
        const productId = button.dataset.productId;
        updatedelivery(productId, deliveryId);
        renderthepage();
      });
    });
  payment();
}
/* console.log(cart); */
/* deliveryoptionhtml(); */
/* console.log(deliveryoptionhtml()); */
