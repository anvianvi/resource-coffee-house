import { coffeListMain } from '../data/coffe-slider';

export function generateEnjoyList() {
  const sliderList = document.getElementById('slider-list')

  coffeListMain.forEach((item) => {
    const sliderItem = document.createElement('div');
    sliderItem.className = 'slider-item';

    const slideCard = document.createElement('div');
    slideCard.className = 'slide-card';

    const img = document.createElement('img');
    img.className = 'slide-card-img';
    img.src = item.img;
    img.alt = `photo of ${item.name}`;

    const h3 = document.createElement('h3');
    h3.className = 'slide-card-h3';
    h3.textContent = item.name;

    const description = document.createElement('p');
    description.className = 'slide-card-description';
    description.textContent = item.description;

    const price = document.createElement('p');
    price.className = 'slide-card-price';
    price.textContent = `$ ${item.price}`;

    slideCard.appendChild(img);
    slideCard.appendChild(h3);
    slideCard.appendChild(description);
    slideCard.appendChild(price);
    sliderItem.appendChild(slideCard);
    sliderList.appendChild(sliderItem);
  });
}

let currentSlideIndex = 0;
const dots = document.querySelectorAll(".dot")
dots[currentSlideIndex].classList.add('active')

const slideList = document.getElementById('slider-list')

let sliderTranslation = 0;

export function currentSlide(index) {
  currentSlideIndex = index
  sliderTranslation = -(index * 100)
  slideList.style.transform = `translateX(${sliderTranslation}%)`;
  dots.forEach(element => {
    element.classList.remove('active')
  });
  dots[currentSlideIndex].classList.add('active')
}

export function nextSlide() {
  currentSlideIndex = (currentSlideIndex + 1) % dots.length;
  sliderTranslation = - (currentSlideIndex * 100);
  slideList.style.transform = `translateX(${sliderTranslation}%)`;
  updateDots();
}

export function prevSlide() {
  currentSlideIndex = (currentSlideIndex - 1 + dots.length) % dots.length;
  sliderTranslation = - (currentSlideIndex * 100);
  console.log(currentSlideIndex)
  slideList.style.transform = `translateX(${sliderTranslation}%)`;
  updateDots();
}

function updateDots() {
  dots.forEach(element => {
    element.classList.remove('active');
  });
  dots[currentSlideIndex].classList.add('active');
}

document.getElementById('enjoy-next-button').addEventListener('click', nextSlide);
document.getElementById('enjoy-prev-button').addEventListener('click', prevSlide);
dots.forEach((element, index) => {
  element.addEventListener('click', () => currentSlide(index));
});

