import { productsData } from "./products.js";
const productsWrapper = document.querySelector(".products-wrapper");
const cartBtn = document.querySelector(".shopping-cart-btn");
const modal = document.querySelector(".modal");
const backdrop = document.querySelector(".backdrop");

let cart = [];

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
                class="add-to-cart bg-violet-100 text-violet-700 px-2 py-1 rounded" 
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
    const DOMAllBtns = document.querySelectorAll(".add-to-cart");
    const AllBtns = [...DOMAllBtns];
    AllBtns.forEach((btn) => {
      const id = btn.dataset.id;
      const isInCart = cart.find((product) => product.id === id);
      if (isInCart) {
        btn.innerText = "In Cart";
        btn.disabled = true;
      }
      btn.addEventListener("click", (e) => {
        e.target.innerText = "In Cart";
        e.target.disabled = true;
        const addedProduct = Storage.getProduct(id);
        cart = [...cart, { ...addedProduct, quantity: 1 }];
        Storage.saveCart(cart);
      });
    });
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
}
document.addEventListener("DOMContentLoaded", () => {
  const product = new Products();
  const products = product.getProducts();
  const ui = new UI();
  ui.showProducts(products);
  ui.getAddToCartBtns();
  Storage.saveProducts(products);
});
cartBtn.addEventListener("click", () => {
  modal.classList.add("show-modal");
});
backdrop.addEventListener("click", () => {
  modal.classList.remove("show-modal");
});
