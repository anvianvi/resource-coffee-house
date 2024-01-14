import '/styles/global.scss'
import '/styles/header.scss'
import '/scripts/burger-menu';
import '/styles/menu-main.scss'
import { products } from '../data/products';
import '/styles/ofer-list.scss'
import '/styles/footer.scss'

let isMobile = window.innerWidth <= 768;
let productsPagesLoaded = 1

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
  let productsToRender = products

  if (isMobile === true) {
    productsToRender = products.slice(0, 4 * productsPagesLoaded);
  }

  productsToRender.forEach((product, index) => {
    const productCard = createProductCard(product, index);
    productListDiv.appendChild(productCard);
  });
  if (productsToRender.length < products.length) {
    const renderMoreButton = createRenderMoreButton()
    productListDiv.appendChild(renderMoreButton)
    renderMoreButton.addEventListener('click', () => {
      loadMoreProducts();
    });
  }
}

function loadMoreProducts() {
  productsPagesLoaded += 1
  showOffers(curentActiveCategory)

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

let curentActiveCategory = 'coffee'

document.getElementById('coffee-tab').addEventListener('click', () => {
  productsPagesLoaded = 1

  showOffers('coffee');
  curentActiveCategory = 'coffee'
});
document.getElementById('tea-tab').addEventListener('click', () => {
  productsPagesLoaded = 1
  showOffers('tea');
  curentActiveCategory = 'tea'
});
document.getElementById('dessert-tab').addEventListener('click', () => {
  productsPagesLoaded = 1
  showOffers('dessert');
  curentActiveCategory = 'dessert'
});

function updateDisplayMode() {
  isMobile = window.innerWidth <= 768;
  productsPagesLoaded = 1
  showOffers(curentActiveCategory)
}


window.addEventListener('resize', updateDisplayMode);
updateDisplayMode()

function createRenderMoreButton() {
  const divElement = document.createElement('div');
  divElement.className = 'render-more-button';
  const svgElement = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svgElement.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
  svgElement.setAttribute('width', '24');
  svgElement.setAttribute('height', '24');
  svgElement.setAttribute('viewBox', '0 0 24 24');
  svgElement.setAttribute('fill', 'none');
  const path1 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  path1.setAttribute('d', 'M21.8883 13.5C21.1645 18.3113 17.013 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C16.1006 2 19.6248 4.46819 21.1679 8');
  path1.setAttribute('stroke', '#403F3D');
  path1.setAttribute('stroke-linecap', 'round');
  path1.setAttribute('stroke-linejoin', 'round');
  const path2 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  path2.setAttribute('d', 'M17 8H21.4C21.7314 8 22 7.73137 22 7.4V3');
  path2.setAttribute('stroke', '#403F3D');
  path2.setAttribute('stroke-linecap', 'round');
  path2.setAttribute('stroke-linejoin', 'round');
  svgElement.appendChild(path1);
  svgElement.appendChild(path2);
  divElement.appendChild(svgElement);
  return divElement
}