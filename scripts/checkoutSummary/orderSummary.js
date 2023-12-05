import { cart,removeFromCart,updateQuantity,updateDeliveryOption } from '../../data/cart.js';
import { products,getProduct } from '../../data/products.js';
import { formatCurrency } from '../utils/money.js';
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import {deliveryOptions,getDeliveryOption} from '../../data/deliveryOptions.js';
import { renderPaymentSummary } from '../checkout.js';



export function renderOrderSummary(){

    let checkOutQuantity = 0;
    let summaryCartHtml = '';
    const today = dayjs();

    cart.forEach((cartItem) =>{
      const productId = cartItem.productId;

      
      checkOutQuantity += cartItem.quantity;
      const matchingProduct = getProduct(productId);
      
     


      const deliveryOptionId = cartItem.deliveryOptionId;
      const deliveryOption = getDeliveryOption(deliveryOptionId);
      

      const deliveryDate = today.add(deliveryOption.deliveryDays,'days');
      const dateString = deliveryDate.format('dddd, MMMM D');

      summaryCartHtml +=` 
              <div class="cart-item-container 
              js-cart-item-container-${matchingProduct.id}">
              <div class="delivery-date">
                Delivery date: ${dateString}
              </div>

              <div class="cart-item-details-grid">
                <img class="product-image"
                  src="${matchingProduct.image}">

                <div class="cart-item-details">
                  <div class="product-name">
                    ${matchingProduct.name}
                  </div>
                  <div class="product-price">
                    $${formatCurrency(matchingProduct.priceCents)}
                  </div>
                  <div class="product-quantity">
                    <span>
                      Quantity: <span class="quantity-label js-quantity-label">${cartItem.quantity}</span>
                    </span>
                    <span class="update-quantity-link link-primary js-update-quantity-link-${matchingProduct.id} " data-product-id="${matchingProduct.id}">
                      Update 
                    </span>
                      <input class="quantity-input js-quantity-input-${matchingProduct.id}" >  
                      <span class="save-quantity-input link-primary js-save-quantity-input" data-product-id="${matchingProduct.id}">
                        Save
                      </span>
                    <span class="delete-quantity-link link-primary js-delete-link" data-product-id="${matchingProduct.id}">
                      Delete
                    </span>
                  </div>
                </div>

                <div class="delivery-options">
                  <div class="delivery-options-title">
                    Choose a delivery option:
                  </div>
                ${deliveryOptionHtml(matchingProduct, cartItem)}
                </div>
              </div>
            </div>`;
    });

    function deliveryOptionHtml( matchingProduct, cartItem){
      let html = '';
      deliveryOptions.forEach((deliveryOption) =>{
        
        
        const deliveryDate = today.add(deliveryOption.deliveryDays,'days');
        const dateString = deliveryDate.format('dddd, MMMM D');
      
        const priceString= deliveryOption.priceCents ===0 ? 'FREE' : `$${formatCurrency(deliveryOption.priceCents)} -`;
        
        const isChecked = deliveryOption.id === cartItem.deliveryOptionId;

        html +=    `
            <div class="delivery-option js-delivery-option" data-product-id="${matchingProduct.id}" data-delivery-option-id="${deliveryOption.id}">
              <input type="radio"
                ${isChecked ? 'checked':''}
                class="delivery-option-input"
                  name="delivery-option-${ matchingProduct.id}">
            <div>
              <div class="delivery-option-date">
                ${dateString}
              </div>
              <div class="delivery-option-price">
                ${priceString} Shipping
              </div>
            </div>
          </div>`
      });
      return html;
    }

    document.querySelector('.js-order-summary')
    .innerHTML = summaryCartHtml;

    document.querySelectorAll('.js-delete-link')
    .forEach((link)=>{
      link.addEventListener('click', ()=>{
        const productId = link.dataset.productId;
        removeFromCart(productId);
          renderPaymentSummary();
          
        

        const container = document.querySelector(`.js-cart-item-container-${productId}`);
        container.remove();
        document.querySelector('.js-total-quantity').innerHTML =  checkOutQuantity;
        renderOrderSummary();
      
      });
    });



    document.querySelectorAll('.update-quantity-link')
    .forEach((value)=>{
      value.addEventListener('click', ()=>{
        const productId = value.dataset.productId;
        const isContainer = document.querySelector(`.js-cart-item-container-${productId}`);
          if(!isContainer.classList.contains(`is-editing-quantity-${productId}`)){
            isContainer.classList.add('is-editing-quantity');
          }        
          console.log(productId);
    });
    });


    document.querySelectorAll('.js-save-quantity-input')
    .forEach((link)=>{
      link.addEventListener('click', ()=>{
        const productId = link.dataset.productId;

        const quantityInput = document.querySelector(`.js-quantity-input-${productId}`);
        const newQuantity = Number(quantityInput.value);

          if(newQuantity <0 || newQuantity>=100){
            alert('Quantity must be above 0 but not greater than 100');
            return;

          }
        updateQuantity(productId, newQuantity);
        const container = document.querySelector(`.js-cart-item-container-${productId}`);
        container.classList.remove('is-editing-quantity');
        renderOrderSummary();
        renderPaymentSummary();

          

      });
    });


    function keyDown(event){
      if(event.key === 'Enter'){
        
      }
    }


    document.querySelector('.js-total-quantity').innerHTML = checkOutQuantity;

    document.querySelectorAll('.js-delivery-option')
      .forEach((value) =>{
        value.addEventListener('click', () =>{
          const {productId, deliveryOptionId} = value.dataset;
          updateDeliveryOption(productId, deliveryOptionId);
          renderOrderSummary();
          renderPaymentSummary();
        });
      });

    }

renderOrderSummary();
