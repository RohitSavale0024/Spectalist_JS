let docTitle = document.title;
window.addEventListener("blur", () => {
    document.title = "come back soon";
});

window.addEventListener("focus", () => {
    document.title = docTitle;
})

const gatewayData = (data) => {
    const [name, price, amount] = data;
    console.log(name, price, amount);
    sessionStorage.setItem("gateway-data", JSON.stringify(data));
    window.location.href = "http://localhost:5000/payment-gateway.html";
}



// shop.js
// document.addEventListener('DOMContentLoaded', function () {
//     const addToCartButtons = document.querySelectorAll('.button');
  
//     addToCartButtons.forEach(function (button) {
//       button.addEventListener('click', function (event) {
//         const spectacleItem = event.target.closest('.feature-item2');
//         const spectacleId = spectacleItem.dataset.id;
//         const spectacleTitle = spectacleItem.querySelector('h3').innerText;
//         const spectaclePrice = spectacleItem.querySelector('p').innerText;
  
//         // Create the cart item object
//         const cartItem = {
//           id: spectacleId,
//           title: spectacleTitle,
//           price: spectaclePrice,
//         };
  
//         // Retrieve existing cart items from local storage or initialize an empty array
//         const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
  
//         // Add the new item to the cart
//         cartItems.push(cartItem);
  
//         // Store the updated cart items in local storage
//         localStorage.setItem('cartItems', JSON.stringify(cartItems));
  
//         // Redirect to the cart.html page
//         window.location.href = 'cart.html';
//       });
//     });
//   });
  

//   // cart.js
//   document.addEventListener('DOMContentLoaded', function () {
//     renderCartItems();
//   });
  
//   function renderCartItems() {
//     const cartItems = JSON.parse(localStorage.getItem('cartItems'));
  
//     const cartItemsContainer = document.getElementById('cartItems');
//     cartItemsContainer.innerHTML = '';
  
//     if (cartItems && cartItems.length > 0) {
//       for (let i = 0; i < cartItems.length; i++) {
//         const cartItem = cartItems[i];
  
//         const spectacleItem = document.createElement('div');
//         spectacleItem.classList.add('feature-item2');
  
//         const image = document.createElement('img');
//         image.src = cartItem.image;
//         image.alt = cartItem.name;
  
//         const name = document.createElement('h3');
//         name.textContent = cartItem.name;
  
//         const price = document.createElement('p');
//         price.textContent = 'Price: $' + cartItem.price;
  
//         spectacleItem.appendChild(image);
//         spectacleItem.appendChild(name);
//         spectacleItem.appendChild(price);
  
//         cartItemsContainer.appendChild(spectacleItem);
//       }
//     } else {
//       const emptyCartMessage = document.createElement('p');
//       emptyCartMessage.textContent = 'Your cart is empty';
//       cartItemsContainer.appendChild(emptyCartMessage);
//     }
//   }
  