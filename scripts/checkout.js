import { cart } from '../data/cart.js';
import { getProduct, products } from '../data/products.js';
import { renderOrderSummary } from './checkoutSummary/orderSummary.js';
import { getDeliveryOption } from '../data/deliveryOptions.js';
import { formatCurrency } from './utils/money.js';

renderOrderSummary();

   

export function renderPaymentSummary(){



    let total = 0;
    let shippingPrice = 0;
   

  
    cart.forEach((element) => {
      const product = getProduct(element.productId);
      total += product.priceCents * element.quantity;
      
      const deliveryOption = getDeliveryOption(element.deliveryOptionId);
     
      shippingPrice += deliveryOption.priceCents;
    
    });

    const totalBeforeTax = total + shippingPrice;
    const taxCents = totalBeforeTax * 0.1;
    const totalPayment = totalBeforeTax + taxCents;
 
  
    const paymentSummaryHtml = `
        <div class="payment-summary-title">
        Order Summary
      </div>

      <div class="payment-summary-row">
        <div>Items (3):</div>
        <div class="payment-summary-money">$${formatCurrency(total)}</div>
      </div>

      <div class="payment-summary-row">
        <div>Shipping &amp; handling:</div>
        <div class="payment-summary-money">$${formatCurrency(shippingPrice)}</div>
      </div>

      <div class="payment-summary-row subtotal-row">
        <div>Total before tax:</div>
        <div class="payment-summary-money">$${formatCurrency(totalBeforeTax)}</div>
      </div>

      <div class="payment-summary-row">
        <div>Estimated tax (10%):</div>
        <div class="payment-summary-money">$${formatCurrency(taxCents)}</div>
      </div>

      <div class="payment-summary-row total-row">
        <div>Order total:</div>
        <div class="payment-summary-money">$${formatCurrency(totalPayment)}</div>
      </div>

      <button class="place-order-button button-primary">
        Place your order
      </button>`;


document.querySelector('.js-payment-summary').innerHTML = paymentSummaryHtml;


}

renderPaymentSummary();