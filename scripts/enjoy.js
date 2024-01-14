import { coffeListMain } from '../data/coffe-slider';

let intervalId;
let progressBarWidth = 0;
let startTime;
let pausedTime = 0;
let isPaused = false;
let currentSlideIndex = 0;
let sliderTranslation = 0;

const dotsFill = document.querySelectorAll(".dot-fill");
const dots = document.querySelectorAll(".dot")
const slideList = document.getElementById('slider-list')


function generateEnjoyList() {
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
    price.textContent = `$${item.price}`;

    slideCard.appendChild(img);
    slideCard.appendChild(h3);
    slideCard.appendChild(description);
    slideCard.appendChild(price);
    sliderItem.appendChild(slideCard);
    sliderList.appendChild(sliderItem);
  });
}

generateEnjoyList()

function currentSlide(index) {
  progressBarWidth = 0
  dotsFill[currentSlideIndex].style.width = 0
  currentSlideIndex = index
  sliderTranslation = -(index * 100)
  slideList.style.transform = `translateX(${sliderTranslation}%)`;
  dots.forEach(element => {
    element.classList.remove('active')
  });
  dots[currentSlideIndex].classList.add('active')
}

function nextSlide() {
  progressBarWidth = 0
  dotsFill[currentSlideIndex].style.width = 0
  currentSlideIndex = (currentSlideIndex + 1) % dots.length;
  sliderTranslation = - (currentSlideIndex * 100);
  slideList.style.transform = `translateX(${sliderTranslation}%)`;
  startInterval();
}

function prevSlide() {
  progressBarWidth = 0
  dotsFill[currentSlideIndex].style.width = 0
  currentSlideIndex = (currentSlideIndex - 1 + dots.length) % dots.length;
  sliderTranslation = - (currentSlideIndex * 100);
  slideList.style.transform = `translateX(${sliderTranslation}%)`;
  startInterval();
}

document.getElementById('enjoy-next-button').addEventListener('click', nextSlide);
document.getElementById('enjoy-prev-button').addEventListener('click', prevSlide);
dots.forEach((element, index) => {
  element.addEventListener('click', () => currentSlide(index));
});

function startInterval() {
  startTime = Date.now() - pausedTime;

  function updateProgressBar() {
    if (!isPaused) {
      const currentTime = Date.now();
      const elapsedTime = currentTime - startTime;
      progressBarWidth = (elapsedTime / 5000) * 100; // Use 5000 milliseconds (5 seconds) for the slide interval
      dotsFill[currentSlideIndex].style.width = progressBarWidth + "%";
      if (progressBarWidth < 100) {
        requestAnimationFrame(updateProgressBar);
      } else {
        progressBarWidth = 0;
        dotsFill[currentSlideIndex].style.width = 0;
        nextSlide();
        startTime = Date.now(); // Reset startTime after completing a slide
      }
    } else {
      requestAnimationFrame(updateProgressBar);
    }
  }
  intervalId = requestAnimationFrame(updateProgressBar);
}

startInterval();

let touchstartX = 0;
let touchendX = 0;

function checkDirection() {
  if (touchendX < touchstartX) nextSlide();
  if (touchendX > touchstartX) prevSlide();
}

const sliderContainer = document.getElementById('slider-container');

sliderContainer.addEventListener('touchstart', e => {
  touchstartX = e.changedTouches[0].screenX;
  pauseInterval();
});

sliderContainer.addEventListener('touchend', e => {
  touchendX = e.changedTouches[0].screenX;
  resumeInterval();
  checkDirection();
});

sliderContainer.addEventListener('mouseover', () => {
  pauseInterval();
});

sliderContainer.addEventListener('mouseout', () => {
  resumeInterval();
});

function pauseInterval() {
  isPaused = true;
  pausedTime = Date.now() - startTime;
}

function resumeInterval() {
  isPaused = false;
  startInterval();
}