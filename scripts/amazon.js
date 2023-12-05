import {cart,updateProductQuantity} from '../data/cart.js';
import {products} from '../data/products.js';
import { formatCurrency } from './utils/money.js'
let productsHtml = '';
let timeOut;
let checkTimeOut =false;

products.forEach((product) => {
            productsHtml += ` 
            <div class="product-container">
            <div class="product-image-container">
              <img class="product-image"
                src="${product.image}">
            </div>

            <div class="product-name limit-text-to-2-lines">
              ${product.name}
            </div>

            <div class="product-rating-container">
              <img class="product-rating-stars"
                src="images/ratings/rating-${product.rating.stars * 10}.png">
              <div class="product-rating-count link-primary">
                ${product.rating.count}
              </div>
            </div>

            <div class="product-price">
              $${formatCurrency(product.priceCents)}
            </div>

            <div class="product-quantity-container">
              <select class="js-quantity-selector-${product.id}">
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

            <div class="product-spacer"></div>

            <div class="added-to-cart added-to-cart-${product.id}">
              <img src="images/icons/checkmark.png">
              Added to Cart
            </div>

            <button class="add-to-cart-button button-primary js-add-to-cart" data-product-Id="${product.id}">
              Add to Cart
            </button>
          </div>`

});
document.querySelector('.js-product-grid').innerHTML = productsHtml;

let matchingItem;


function addToggleButton(timeToggle){ 
    const addCart = document.querySelector(`.added-to-cart-${timeToggle}`);   
    if(!checkTimeOut){
    if(!addCart.classList.contains(`js-new-added-to-cart-${timeToggle}`)){
      addCart.classList.add('js-new-added-to-cart');
      timeOut = setTimeout(()=>{
            addCart.classList.remove('js-new-added-to-cart');
            checkTimeOut = false;
        },800);
    } 
    checkTimeOut = true;
  }else{
    clearTimeout(timeOut)
    timeOut = setTimeout(()=>{
      addCart.classList.remove('js-new-added-to-cart');
      checkTimeOut = false;
  },800);
    
  }
}


document.querySelectorAll('.js-add-to-cart')
.forEach((button) =>{
  button.addEventListener('click',() => {
    const productId = button.dataset.productId;
        updateProductQuantity(productId);
          addToggleButton(productId);
    
        
  });
});
 let total = 0;

cart.forEach((value) =>{
  total += value.quantity;
});  
document.querySelector('.js-cart-quantity').innerHTML = total;