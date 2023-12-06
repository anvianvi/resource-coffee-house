import '/styles/global.scss'
import '/styles/header.scss'
import '/styles/menu-main.scss'
import { products } from '../data/products';
import '/styles/ofer-list.scss'
import '/styles/footer.scss'

function createProductCard(product, index) {
  const div = document.createElement('div');
  div.className = 'product-card';
  div.onclick = function () {
    console.log(product.name)
  };

  const img = document.createElement('img');
  img.className = 'photo';
  img.src = `/resource-coffee-house/img/products/${product.category.toLowerCase()}-${index + 1}.jpg`;
  img.alt = `photo of ${product.name}`;

  const h3 = document.createElement('h3');
  h3.className = 'h3';
  h3.textContent = product.name;

  const description = document.createElement('p');
  description.className = 'description';
  description.textContent = product.description;

  const price = document.createElement('p');
  price.className = 'price';
  price.textContent = `$ ${product.price}`;

  div.appendChild(img);
  div.appendChild(h3);
  div.appendChild(description);
  div.appendChild(price);

  return div;
}

function renderProductList(products) {
  const productListDiv = document.getElementById('ofer-list');

  products.forEach((product, index) => {
    const productCard = createProductCard(product, index);
    productListDiv.appendChild(productCard);
  });
}

// Call the function to render the product list
// renderProductList(products);


export function showOffers(category) {
  document.getElementById('ofer-list').replaceChildren();

  const offers = products.filter(product => product.category === category);
  renderProductList(offers);
  const tabs = document.querySelectorAll('.menu-selector')
  tabs.forEach(element => {
    element.classList.remove('active')
  });
  const activeTab = document.getElementById(`${category}-tab`)
  activeTab.classList.add('active')
}

showOffers('coffee')

document.getElementById('coffee-tab').addEventListener('click', () => {
  showOffers('coffee');
});
document.getElementById('tea-tab').addEventListener('click', () => {
  showOffers('tea');
});
document.getElementById('dessert-tab').addEventListener('click', () => {
  showOffers('dessert');
});
