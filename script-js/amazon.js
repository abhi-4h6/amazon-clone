import { cart, addtocart } from "../data/cart.js";
import { products, loadproducts } from "../data/products.js";

loadproducts(renderhomepage);

let html = '';

function renderhomepage() {
  products.forEach((product) => {
    html += `
    <div class="product-container">
        <div class="product-image-container">
          <img class="product-image" src="${product.image}">
        </div>

        <div class="product-name limit-text-to-2-lines">
          ${product.name}
        </div>

        <div class="product-rating-container">
          <img class="product-rating-stars" src="${product.get_rating_of_product()}">
          <div class="product-rating-count link-primary">
            ${product.rating.count}
          </div>
        </div>

        <div class="product-price">
          $${(product.priceCents / 100).toFixed(2)}
        </div>

        <div class="product-quantity-container">
          <select>
            <option selected value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option>
          </select>
        </div>
        ${product.setsizechart()}
        <div class="product-spacer"></div>

        <div class="added-to-cart">
          <img src="images/icons/checkmark.png">
          Added
        </div>

        <button class="add-to-cart-button button-primary js-add-tocart"
            data-product-id="${product.id}">
          Add to Cart
        </button>
      </div>

    `;

  });
  /* console.log(html); */
  const body = document.querySelector('.js-body');
  body.innerHTML = html;


  document.querySelectorAll('.js-add-tocart')

    .forEach((product) => {
      product.addEventListener('click', () => {
        console.log(product.dataset.productId);
        const productId = product.dataset.productId;
        addtocart(productId);
        console.log(cart);
        let total = 0;
        cart.forEach((item) => {
          total += item.quantity;
        });
        console.log(total);
        document.querySelector('.js-cart-quantity').innerHTML = total;
      });
    });
}
