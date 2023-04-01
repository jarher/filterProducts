import data from "./data.js";

const productsContainer = document.querySelector(".products");
const searchInput = document.querySelector(".menu__search");
const categoriesContainer = document.querySelector(".menu__categories");
const priceRange = document.querySelector(".menu__price__range");
const priceValue = document.querySelector(".menu__price__value");

const displayProducts = (filteredProducts) => {
  productsContainer.innerHTML = filteredProducts
    .map(
      (product) => `
    <div class="product">
                <div class="product__image">
                  <img src="${product.image}" alt="">
                </div>
                <span class="product__name">${product.title}</span>
                <span class="product__price">$${product.price}</span>
            </div>
    `
    )
    .join("");
};

searchInput.addEventListener("keyup", (e) => {
  const value = e.target.value.toLowerCase();
  if (value) {
    displayProducts(
      data.filter((data) => data.title.toLowerCase().indexOf(value) !== -1)
    );
  } else {
    displayProducts(data);
  }
});

const setCategories = (data) => {
  const allCategories = data.map((item) => item.category);
  const categories = [
    "all",
    ...allCategories.filter((item, i) => {
      return allCategories.indexOf(item) === i;
    }),
  ];

  categoriesContainer.innerHTML = categories
    .map(
      (item) =>
        `<span class="category" data-category="${item}">${
          item.substring(0, 1) + item.substring(1)
        }</span>`
    )
    .join("");

  categoriesContainer.addEventListener("click", (e) => {
    const category = e.target.dataset.category;
    category !== "all"
      ? displayProducts(data.filter((item) => item.category === category))
      : displayProducts(data);
  });
};

const setPrices = (data) => {
  const prices = data.map((item) => Number(item.price));
  const max = Math.max(...prices);
  const min = Math.min(...prices);
  priceRange.min = min;
  priceRange.max = max;
  priceRange.value = max;
  priceValue.textContent = `$ ${max}`;

  priceRange.addEventListener("change", (e) => {
    displayProducts(data.filter((item) => item.price <= e.target.value));
    priceValue.textContent = `$ ${e.target.value}`;
  });
};

displayProducts(data);
setCategories(data);
setPrices(data);
