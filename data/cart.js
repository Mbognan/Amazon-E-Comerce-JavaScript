
export let cart = JSON.parse(localStorage.getItem('cart'));

let total =0;
if(!cart){
  cart =     [{
        productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
        quantity: 2,
        deliveryOptionId: '1' 
      },{
        productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
        quantity: 1,
        deliveryOptionId: '2'
      }];
}

function localStorageSave(){
  localStorage.setItem('cart', JSON.stringify(cart));
}

 export function updateProductQuantity(productId){
  const quantitySelector =  document.querySelector(`.js-quantity-selector-${productId}`);
  const quantity = Number(quantitySelector.value);

      const matchingItem = cart.findIndex(item => item.productId === productId);
      
      if(matchingItem !== -1){
      cart[matchingItem].quantity += quantity;
      }else{
        cart.push({
          productId: productId,  
          quantity: quantity,
          deliveryOptionId: '1'
        });
      } 

       let totalQuantity = 0;

    cart.forEach((value) =>{
      totalQuantity += value.quantity;
    });     

    document.querySelector('.js-cart-quantity').innerHTML = totalQuantity;
    
    localStorageSave();

}



    export function removeFromCart(productId){
      const newCart = [];
      cart.forEach((cartItem)=>{
          if(cartItem.productId !== productId){
              newCart.push(cartItem);
          }
      });

      cart = newCart;
      localStorageSave()
    }
      export function updateQuantity(productId,newQuantity){
        let matchingItem;

        cart.forEach((cartItem) => {
          if (productId === cartItem.productId) {
            matchingItem = cartItem;
          }
        });

        matchingItem.quantity = newQuantity;

        localStorageSave();
      
      }


        export function updateDeliveryOption(productId, deliveryOptionId){
          let matchingItem;

          cart.forEach((cartItem) => {
            if (productId === cartItem.productId) {
              matchingItem = cartItem;
            }
          });
          matchingItem.deliveryOptionId = deliveryOptionId;
          localStorageSave();
        }
          