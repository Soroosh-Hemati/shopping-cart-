import { productsData } from "./products.js";
const productsWrapper = document.querySelector(".products-wrapper");
const cartBtn = document.querySelector(".shopping-cart-btn");
const modal = document.querySelector(".modal");
const backdrop = document.querySelector(".backdrop");
const cartNumOfProducts = document.querySelector(".num-of-product");
const totalCartPrice = document.querySelector(".total-price");
const closeModalBtn = document.querySelector(".close-modal-btn");
const cartItems = document.querySelector(".cart-products .products");
const clearCart = document.querySelector(".clear-cart-btn");
let cart = [];
let buttonsDOM = [];

class Products {
  getProducts() {
    return productsData;
  }
}
class UI {
  showProducts(products) {
    let resault = "";
    products.forEach((item) => {
      resault += `<div class="product">
            <img
              src="${item.imageURL}"
              alt=""
              class="product-img w-full max-w-[300px] h-full max-h-[200px] object-cover"
            />
            <div class="product-info flex flex-col justify-center items-center py-5">
              <div class="product-name uppercase mb-2 text-violet-700">${item.title}</div>
              <div class="product-price mb-2 text-violet-700 font-semibold">
                $${item.price}
              </div>
              <button
                class="add-to-cart bg-violet-100 text-violet-700 px-2 py-1 rounded border border-violet-700 hover:bg-white transition-all duration-200 ease-linear" 
                data-id=${item.id}
              >
                <i class="fa fa-shopping-cart mr-2"></i>Add to Cart
              </button>
            </div>
          </div>`;
    });
    productsWrapper.innerHTML = resault;
  }
  getAddToCartBtns() {
    const DOMAllBtns = [...document.querySelectorAll(".add-to-cart")];
    buttonsDOM = DOMAllBtns;

    DOMAllBtns.forEach((btn) => {
      const id = btn.dataset.id;
      const isInCart = cart.find((product) => product.id === parseInt(id));
      if (isInCart) {
        btn.innerText = "In Cart";
        btn.disabled = true;
      }
      btn.addEventListener("click", (e) => {
        e.target.innerText = "In Cart";
        e.target.disabled = true;
        const addedProduct = { ...Storage.getProduct(id), quantity: 1 };
        cart = [...cart, addedProduct];
        Storage.saveCart(cart);
        this.setCartValue(cart);
        this.addCartItem(addedProduct);
      });
    });
  }
  setCartValue(cart) {
    let tempNumOfCartItems = 0;
    const totalPrice = cart.reduce((acc, curr) => {
      tempNumOfCartItems += curr.quantity;
      return (acc += curr.quantity * curr.price);
    }, 0);
    totalCartPrice.innerText = `Total Price : $${totalPrice}`;
    cartNumOfProducts.innerText = tempNumOfCartItems;
  }
  addCartItem(product) {
    const li = document.createElement("li");
    li.classList.add("product");
    li.innerHTML = `<img
    src="${product.imageURL}"
    alt=""
    class="product-img rounded w-[100px] h-[60px] object-cover"
  />
  <div class="flex flex-col justify-center items-center">
    <div class="product-name uppercase font-medium">
      ${product.title}
    </div>
    <div class="product-price text-gray-500">$${product.price}</div>
  </div>
  <div class="flex flex-col justify-center items-center">
    <i
      class="fa fa-chevron-up text-violet-500 cursor-pointer data-id=${product.id}"
    ></i>
    <span class="product-quantity">${product.quantity}</span>
    <i
      class="fa fa-chevron-down text-red-600 cursor-pointer data-id=${product.id}"
    ></i>
  </div>
  <i class="fa fa-trash text-red-600 cursor-pointer data-id=${product.id}"></i>`;
    cartItems.appendChild(li);
  }
  setUpApp() {
    cart = Storage.getCart() || [];
    cart.forEach((cartItem) => this.addCartItem(cartItem));
    this.setCartValue(cart);
  }
  cartLogic() {
    clearCart.addEventListener("click", () => this.clearCart());
  }
  clearCart() {
    cart.forEach((cartItem) => this.removeCartItem(cartItem.id));
    while (cartItems.children.length) {
      cartItems.removeChild(cartItems.children[0]);
    }
    modal.classList.remove("show-modal");
  }
  removeCartItem(id) {
    cart = cart.filter((cartItem) => cartItem.id != id);
    this.setCartValue(cart);
    Storage.saveCart(cart);
    this.getSingleBtn(id);
  }
  getSingleBtn(id) {
    const button = buttonsDOM.find(
      (btn) => parseInt(btn.dataset.id) == parseInt(id)
    );
    button.innerText = "Add To Cart";
    buttonsDOM.disabled = false;
  }
}
class Storage {
  static saveProducts(products) {
    localStorage.setItem("products", JSON.stringify(products));
  }
  static getProduct(id) {
    const _products = JSON.parse(localStorage.getItem("products"));
    return _products.find((p) => p.id === parseInt(id));
  }
  static saveCart(cart) {
    localStorage.setItem("cart", JSON.stringify(cart));
  }
  static getCart() {
    return (cart = JSON.parse(localStorage.getItem("cart")));
  }
}
document.addEventListener("DOMContentLoaded", () => {
  const product = new Products();
  const products = product.getProducts();
  const ui = new UI();
  ui.setUpApp();
  ui.showProducts(products);
  ui.getAddToCartBtns();
  ui.cartLogic();
  Storage.saveProducts(products);
});
cartBtn.addEventListener("click", () => {
  modal.classList.add("show-modal");
});
backdrop.addEventListener("click", () => {
  modal.classList.remove("show-modal");
});
closeModalBtn.addEventListener("click", () => {
  modal.classList.remove("show-modal");
});
