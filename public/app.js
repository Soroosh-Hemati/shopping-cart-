import { productsData } from "./products.js";
const productsWrapper = document.querySelector(".products-wrapper");

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
}
class Storage {
  static saveProducts(products) {
    localStorage.setItem("products", JSON.stringify(products));
  }
}
document.addEventListener("DOMContentLoaded", () => {
  const product = new Products();
  const products = product.getProducts();
  const ui = new UI();
  ui.showProducts(products);
  Storage.saveProducts(products);
});
