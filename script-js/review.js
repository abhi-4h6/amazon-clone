import { cart } from "../data/cart.js";
import { products } from "../data/products.js";

let html = '';
cartupdate(cart);
function cartupdate(cart) {
    cart.forEach((cartitem, index) => {
        const productId = cartitem.productId;
        let matchproduct;
        products.forEach((product) => {
            if (productId == product.id) {
                matchproduct = product;

            }
        });
        html += `<div class="cart-item-container">
            <div class="delivery-date">
              Delivery date: Tuesday, June 21
            </div>

            <div class="cart-item-details-grid">
              <img class="product-image"
                src="${matchproduct.image}">

              <div class="cart-item-details">
                <div class="product-name">
                  ${matchproduct.name}
                </div>
                <div class="product-price">
                  ${(matchproduct.priceCents / 100).toFixed(2)}
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
                <div class="delivery-option">
                  <input type="radio" checked
                    class="delivery-option-input"
                    name="delivery-option-${index}">
                  <div>
                    <div class="delivery-option-date">
                      Tuesday, June 21
                    </div>
                    <div class="delivery-option-price">
                      FREE Shipping
                    </div>
                  </div>
                </div>
                <div class="delivery-option">
                  <input type="radio"
                    class="delivery-option-input"
                    name="delivery-option-${index}">
                  <div>
                    <div class="delivery-option-date">
                      Wednesday, June 15
                    </div>
                    <div class="delivery-option-price">
                      $4.99 - Shipping
                    </div>
                  </div>
                </div>
                <div class="delivery-option">
                  <input type="radio"
                    class="delivery-option-input"
                    name="delivery-option-${index}">
                  <div>
                    <div class="delivery-option-date">
                      Monday, June 13
                    </div>
                    <div class="delivery-option-price">
                      $9.99 - Shipping
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>`;

    });
    /*  console.log(html); */
    const body = document.querySelector('.js-checkout-container');
    body.innerHTML = html;
}
document.querySelectorAll('.js-delete-item')
    .forEach((item) => {
        item.addEventListener('click', () => {
            const productId = item.dataset.productId;
            console.log(productId);
            cart.forEach((product, index) => {
                if (product.productId == productId) {
                    cart.splice(index, 1);
                }
            });
            console.log(cart);
            cartupdate(cart);
            console.log(html);
        });
    });
console.log(cart);