import '/styles/global.scss'
import '/styles/header.scss'
import '/scripts/burger-menu';
import '/styles/menu-main.scss'
import { products } from '../data/products';
import '/styles/ofer-list.scss'
import '/styles/footer.scss'

let isMobile = window.innerWidth <= 768;
let productsPagesLoaded = 1
let curentActiveCategory = 'coffee'
let productTotalPrice = 0
let additivesCost = 0
let productDefaultprice = 0

function createProductCard(product, index) {
  const div = document.createElement('div');
  div.className = 'product-card';
  div.onclick = function () {
    showPopUp(product, `/resource-coffee-house/img/products/${product.category.toLowerCase()}-${index + 1}.jpg`)
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

function updateDisplayMode() {
  isMobile = window.innerWidth <= 768;
  productsPagesLoaded = 1
  showOffers(curentActiveCategory)
}

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

function showPopUp(product, img) {
  console.log(product);
  document.body.classList.toggle('burger-open')
  let modal = document.createElement('div');
  modal.id = 'product-modal';
  modal.className = 'product-modal';

  let modalContent = document.createElement('div');
  modalContent.className = 'modal-content-container';

  let modalImg = document.createElement('div');
  modalImg.className = 'modal-img-container';

  let imgElement = document.createElement('img');
  imgElement.className = 'modal-img';
  imgElement.src = img;
  imgElement.alt = `photo of ${product.name}`;

  modalImg.appendChild(imgElement);

  let productDescriptionContainer = document.createElement('div');
  productDescriptionContainer.className = 'product-description-container';

  let proudctHeader = document.createElement('p');
  proudctHeader.className = 'proudct-header';
  proudctHeader.textContent = product.name;
  productDescriptionContainer.appendChild(proudctHeader);

  let proudctDescription = document.createElement('p');
  proudctDescription.className = 'product-description';
  proudctDescription.textContent = product.description;
  productDescriptionContainer.appendChild(proudctDescription);

  let sizeLabelElement = document.createElement('p');
  sizeLabelElement.textContent = 'Size';
  productDescriptionContainer.appendChild(sizeLabelElement);
  productDescriptionContainer.appendChild(createSizeElement(product.sizes));

  let additivesLabelElement = document.createElement('p');
  additivesLabelElement.textContent = 'Additives';
  productDescriptionContainer.appendChild(additivesLabelElement);
  productDescriptionContainer.appendChild(createAdditiveElement(product.additives));

  let costBox = document.createElement('div');
  costBox.className = 'total-cost-box';
  let costBoxLable = document.createElement('p');
  costBoxLable.textContent = 'Total:'
  costBox.appendChild(costBoxLable);
  let costBoxValue = document.createElement('p');
  productDefaultprice = parseFloat(product.price);
  costBoxValue.textContent = `$ ${productDefaultprice.toFixed(2)}`;
  costBoxValue.id = 'cost-box-value'
  costBox.appendChild(costBoxValue);
  productDescriptionContainer.appendChild(costBox);

  let toolTipBox = document.createElement('div')
  toolTipBox.className = 'tool-tip-box';
  toolTipBox.appendChild(genereteSvgForToolTip());
  let toolTip = document.createElement('p');
  toolTip.textContent = 'The cost is not final. Download our mobile app to see the final price and place your order. Earn loyalty points and enjoy your favorite coffee with up to 20% discount.';
  toolTipBox.appendChild(toolTip);
  productDescriptionContainer.appendChild(toolTipBox);

  let closeBtn = document.createElement('button');
  closeBtn.className = 'close-modal-button';
  closeBtn.innerHTML = 'Close';
  closeBtn.onclick = closeModal;

  productDescriptionContainer.appendChild(closeBtn);

  modalContent.appendChild(modalImg);
  modalContent.appendChild(productDescriptionContainer);

  modal.appendChild(modalContent);
  document.body.appendChild(modal);

  document.querySelector('.addons-selector').classList.add('active');
}

function closeModal() {
  let modal = document.getElementById('product-modal');
  if (modal) {
    modal.parentNode.removeChild(modal);
  }
  document.body.classList.toggle('burger-open')
}

function createSizeElement(sizes) {
  let sizeBoxElement = document.createElement('div');
  sizeBoxElement.className = 'addons-selectors-box';

  for (const key in sizes) {
    if (sizes.hasOwnProperty(key)) {
      const item = sizes[key];
      const div = document.createElement('div');
      div.className = 'addons-selector size-selector';

      let sizeLable = document.createElement('div')
      sizeLable.textContent = key
      sizeLable.className = 'addons-lable'
      div.appendChild(sizeLable)
      let sizeValue = document.createElement('div')
      sizeValue.className = 'addons-value'
      sizeValue.textContent = item['size']
      div.appendChild(sizeValue)

      div.onclick = function () {
        let costBoxValue = document.getElementById('cost-box-value')
        const sizeSelectors = document.querySelectorAll('.size-selector')
        productTotalPrice = productDefaultprice + parseFloat(item['add-price'])
        costBoxValue.textContent = `$ ${productTotalPrice.toFixed(2)}`;
        sizeSelectors.forEach(element => {
          element.classList.remove('active')
        });
        this.classList.add('active')

        console.log(costBoxValue)
        console.log(sizeSelectors)
        console.log(productTotalPrice)

        console.log(item['add-price'])


      };
      sizeBoxElement.appendChild(div)
    }
  }
  return sizeBoxElement;
}

function createAdditiveElement(additives) {
  console.log(additives)
  let additiveElement = document.createElement('div');
  additiveElement.className = 'addons-selectors-box';

  for (const key in additives) {
    if (additives.hasOwnProperty(key)) {
      const item = additives[key];
      const div = document.createElement('div');
      div.className = 'addons-selector';

      let addonsLable = document.createElement('div')

      addonsLable.textContent = (Number(key) + 1)
      addonsLable.className = 'addons-lable'
      div.appendChild(addonsLable)
      let addonName = document.createElement('div')
      addonName.className = 'addons-value'
      addonName.textContent = item['name']
      div.appendChild(addonName)

      div.onclick = function () {
        this.classList.toogle('active')
        console.log(item['add-price'])
        console.log(productTotalPrice)
        productTotalPrice += Number(item['add-price'])
        console.log(productTotalPrice)
      };
      additiveElement.appendChild(div)
    }
  }

  return additiveElement;
}

function genereteSvgForToolTip() {
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("width", "16");
  svg.setAttribute("height", "16");
  svg.setAttribute("viewBox", "0 0 16 16");
  svg.setAttribute("fill", "none");

  const g = document.createElementNS("http://www.w3.org/2000/svg", "g");
  g.setAttribute("clip-path", "url(#clip0_268_12877)");

  const path1 = document.createElementNS("http://www.w3.org/2000/svg", "path");
  path1.setAttribute("d", "M8 7.66663V11");
  path1.setAttribute("stroke", "#403F3D");
  path1.setAttribute("stroke-linecap", "round");
  path1.setAttribute("stroke-linejoin", "round");

  const path2 = document.createElementNS("http://www.w3.org/2000/svg", "path");
  path2.setAttribute("d", "M8 5.00667L8.00667 4.99926");
  path2.setAttribute("stroke", "#403F3D");
  path2.setAttribute("stroke-linecap", "round");
  path2.setAttribute("stroke-linejoin", "round");

  const path3 = document.createElementNS("http://www.w3.org/2000/svg", "path");
  path3.setAttribute("d", "M7.99967 14.6667C11.6816 14.6667 14.6663 11.6819 14.6663 8.00004C14.6663 4.31814 11.6816 1.33337 7.99967 1.33337C4.31778 1.33337 1.33301 4.31814 1.33301 8.00004C1.33301 11.6819 4.31778 14.6667 7.99967 14.6667Z");
  path3.setAttribute("stroke", "#403F3D");
  path3.setAttribute("stroke-linecap", "round");
  path3.setAttribute("stroke-linejoin", "round");

  g.appendChild(path1);
  g.appendChild(path2);
  g.appendChild(path3);

  const clipPath = document.createElementNS("http://www.w3.org/2000/svg", "clipPath");
  clipPath.setAttribute("id", "clip0_268_12877");

  const rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
  rect.setAttribute("width", "16");
  rect.setAttribute("height", "16");
  rect.setAttribute("fill", "white");

  clipPath.appendChild(rect);

  svg.appendChild(clipPath);
  svg.appendChild(g);

  return svg;
}

window.onclick = function (event) {
  let modal = document.getElementById('product-modal');
  if (modal && event.target === modal) {
    closeModal();
  }
};
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
window.addEventListener('resize', updateDisplayMode);
updateDisplayMode()