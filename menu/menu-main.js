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

  const imgContainer = document.createElement('div');
  imgContainer.className = 'img-container';

  const img = document.createElement('img');
  img.className = 'photo';
  img.src = `/resource-coffee-house/img/products/${product.category.toLowerCase()}-${index + 1}.jpg`;
  img.alt = `photo of ${product.name}`;
  img.loading = "lazy"

  imgContainer.appendChild(img);

  const textContainer = document.createElement('div');
  textContainer.className = 'text-container';

  const h3 = document.createElement('h3');
  h3.className = 'h3';
  h3.textContent = product.name;

  const description = document.createElement('p');
  description.className = 'description';
  description.textContent = product.description;

  const price = document.createElement('p');
  price.className = 'price';
  price.textContent = `$${product.price}`;

  textContainer.appendChild(h3);
  textContainer.appendChild(description);
  textContainer.appendChild(price);

  div.appendChild(imgContainer);
  div.appendChild(textContainer);

  return div;
}

function renderProductList(products) {
  const productListDiv = document.getElementById('ofer-list');
  productListDiv.replaceChildren();

  products.forEach((product, index) => {
    const productCard = createProductCard(product, index);
    productListDiv.appendChild(productCard);
  });
}

function showOffers(category) {
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
