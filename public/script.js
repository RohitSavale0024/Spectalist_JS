let docTitle = document.title;
window.addEventListener("blur", () => {
    document.title = "come back soon";
});

window.addEventListener("focus", () => {
    document.title = docTitle;
})


let openShopping = document.querySelector('.shopping');
let closeShopping = document.querySelector('.closeShopping');
let list = document.querySelector('.list');
let listCart = document.querySelector('.listCart');
let body = document.querySelector('body');
let total = document.querySelector('.total');
let quantity = document.querySelector('.quantity');


openShopping.addEventListener("click", ()=>{
  body.classList.add('active');
})
closeShopping.addEventListener('click', ()=>{
  body.classList.remove('active');
})
let products = [
    {
        id: 1,
        name: 'Highlight',
        image: 'img1.png',
        price: 999


    },
   {
        id: 2,
        name: 'Urban Retro',
        image: '2.png',
        price: 1200
   },
   {
    id: 3,
    name: 'Float Pop',
    image: '3.PNG',
    price: 699
   },
   {
    id: 4,
    name: 'Power',
    image: 'gog1.png',
    price: 899
   },
   {
    id: 5,
    name: 'Square Style',
    image: 'gog2.png',
    price: 899
   },
   {
    id: 6,
    name: 'Round',
    image: 'gog3.png',
    price: 1111
    },
    {
        id: 7,
        name: 'Hustler',
        image: 'img4.png',
        price: 499
       },
       {
        id: 7,
        name: 'Ojos',
        image: 'img5.png',
        price: 699
       },
       {
        id: 7,
        name: 'Readers',
        image: 'img6.png',
        price: 899
       },   
];
let listCarts  = [];
function initApp(){
    products.forEach((value, key) =>{
        let newDiv = document.createElement('div');
        newDiv.classList.add('item');
        newDiv.innerHTML = `
            <img src="image/${value.image}">
            <div class="title">${value.name}</div>
            <div class="price">${value.price.toLocaleString()}</div>
            <button onclick="addToCart(${key})">Add To Cart</button>`;
        list.appendChild(newDiv);
    })
}
initApp();
function addToCart(key){
    if(listCarts[key] == null){
        // copy product form list to list cart
        listCarts[key] = JSON.parse(JSON.stringify(products[key]));
        listCarts[key].quantity = 1;
    }
    reloadCart();
}
function reloadCart(){
    listCart.innerHTML = '';
    let count = 0;
    let totalPrice = 0;
    listCarts.forEach((value, key)=>{
        totalPrice = totalPrice + value.price;
        count = count + value.quantity;
        if(value != null){
            let newDiv = document.createElement('li');
            newDiv.innerHTML = `
                <div><img src="image/${value.image}"/></div>
                <div>${value.name}</div>
                <div>${value.price.toLocaleString()}</div>
                <div>
                    <button onclick="changeQuantity(${key}, ${value.quantity - 1})">-</button>
                    <div class="count">${value.quantity}</div>
                    <button onclick="changeQuantity(${key}, ${value.quantity + 1})">+</button>
                </div>`;
                listCart.appendChild(newDiv);
        }
    })
    total.innerText = totalPrice.toLocaleString();
    quantity.innerText = count;
}
function changeQuantity(key, quantity){
    if(quantity == 0){
        delete listCarts[key];
    }else{
        listCarts[key].quantity = quantity;
        listCarts[key].price = quantity * products[key].price;
    }
    reloadCart();
}