import { cart } from "../data/cart.js";
import { deliveryoptions } from "../data/delivarycart.js";
import { products, loadproducts } from "../data/products.js";

export function payment() {
  let productprice = 0;
  let deliveryprice = 0;
  let totalitems = 0;
  cart.forEach((item) => {
    let matchingitem = '';
    products.forEach((product) => {
      if (item.productId == product.id) {
        matchingitem = product;
      }
    });
    productprice += matchingitem.priceCents * item.quantity;
    if (item.deliveryid == '1') {
      deliveryprice += 0;
    }
    else if (item.deliveryid == '2') {
      deliveryprice += 499;
    }
    else if (item.deliveryid == '3') {
      deliveryprice += 999;
    }
    totalitems += 1 * item.quantity;
  });
  let total = (productprice + deliveryprice);
  let taxprice = (total) * (10 / 100);
  let orderprice = total + taxprice;
  console.log(productprice);
  console.log(deliveryprice);
  console.log(total);
  console.log(taxprice);
  console.log(orderprice);
  console.log(totalitems);
  let html = `        <div class="payment-summary-title">
          Order Summary
        </div>

        <div class="payment-summary-row">
          <div>Items (${totalitems}):</div>
          <div class="payment-summary-money">$${(productprice / 100).toFixed(2)}</div>
        </div>

        <div class="payment-summary-row">
          <div>Shipping &amp; handling:</div>
          <div class="payment-summary-money">$${(deliveryprice / 100).toFixed(2)}</div>
        </div>

        <div class="payment-summary-row subtotal-row">
          <div>Total before tax:</div>
          <div class="payment-summary-money">$${(total / 100).toFixed(2)}</div>
        </div>

        <div class="payment-summary-row">
          <div>Estimated tax (10%):</div>
          <div class="payment-summary-money">$${(taxprice / 100).toFixed(2)}</div>
        </div>

        <div class="payment-summary-row total-row">
          <div>Order total:</div>
          <div class="payment-summary-money">$${(orderprice / 100).toFixed(2)}</div>
        </div>

        <button class="place-order-button button-primary">
          Place your order
        </button>`;
  console.log(html);
  document.querySelector('.js-payment-summary').innerHTML = html;
}