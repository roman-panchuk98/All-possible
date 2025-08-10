import Swiper from 'swiper';
import 'swiper/css';
import 'swiper/css/pagination';
import { Navigation, Pagination } from 'swiper/modules';
import axios from 'axios';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import rater from 'rater-js';
import refs from './refs';

axios.defaults.baseURL = 'https://furniture-store.b.goit.study/api';

const starToRun = document.querySelector('.star-to-run');
const starUrl = starToRun.getAttribute('src');
const feedbackSection = document.querySelector('.feedback');

function removeSlider() {
  const swipeBox = document.querySelector('.feedback-swiper');
  swipeBox.remove();
}

async function getFeedback(currentPage = 1) {
  try {
    const response = await axios.get(`/feedbacks?limit=3&page=${currentPage}`);
    return response.data.feedbacks;
  } catch (error) {
    removeSlider();
    iziToast.error({
      title: 'Помилка',
      message: 'Не вдалось завантажити дані. Спробуйте пізніше',
      position: 'topRight',
    });
  }
}

let currentPage = 1;
let totalPages = 1;
let isLoading = false;
let swiper = null;
let allFeedbacks = [];

async function getFeedbackData(page = 1) {
  try {
    const response = await axios.get(`/feedbacks?limit=3&page=${page}`);
    return {
      feedbacks: response.data.feedbacks || [],
      totalPages: Math.ceil(response.data.total / response.data.limit) || 1,
      currentPage: parseInt(response.data.page) || 1
    };
  } catch (error) {
    hideSwipeBox();
    iziToast.error({
      title: 'Помилка',
      message: 'Не вдалось завантажити дані. Спробуйте пізніше',
      position: 'topRight',
    });
    return null;
  }
}

function createFeedbackSlide({ descr, name, rate, _id }) {
  return `
    <li class="feedback-item swiper-slide">
        <div id="rater-${_id}" data-rating="${rate}"></div>
        <p class="feedback-descr">${descr}</p>
        <p class="feedback-name">${name}</p>
    </li>`;
}

async function loadMoreFeedbacks() {
  if (isLoading || currentPage >= totalPages) return;

  isLoading = true;
  const nextPage = currentPage + 1;
  const response = await getFeedbackData(nextPage);
  
  if (response && response.feedbacks.length > 0) {
    currentPage = response.currentPage;
    allFeedbacks = [...allFeedbacks, ...response.feedbacks];
    
    const newSlides = response.feedbacks
      .map(feedback => createFeedbackSlide(feedback))
      .join('');
    
    refs.feedbackList.insertAdjacentHTML('beforeend', newSlides);
    addStarToFeedbackList(response.feedbacks);
    
    // Застосовуємо стилі зірочок для нових елементів
    const starToRun = document.querySelector('.star-to-run');
    const starUrl = starToRun.getAttribute('href');
    const feedbackSection = document.querySelector('.feedback');

    feedbackSection.querySelectorAll('.star-value').forEach(el => {
      el.style.backgroundImage = `url("${starUrl}")`;
    });
    
    if (swiper) {
      swiper.update();
    }
  }
  
  isLoading = false;
}

async function renderFeedback() {
  const response = await getFeedbackData(1);
  
  if (!response || response.feedbacks.length < 3) {
    hideSwipeBox();
    iziToast.info({
      title: 'Увага',
      message: 'Недостатньо відгуків для відображення (мінімум 3)',
      position: 'topRight',
    });
    return;
  }

  allFeedbacks = response.feedbacks;
  currentPage = response.currentPage;
  totalPages = response.totalPages;

  const slidesMarkup = response.feedbacks
    .map(feedback => createFeedbackSlide(feedback))
    .join('');

  refs.feedbackList.insertAdjacentHTML('beforeend', slidesMarkup);
  addStarToFeedbackList(response.feedbacks);

  const starToRun = document.querySelector('.star-to-run');
  const starUrl = starToRun.getAttribute('href');
  const feedbackSection = document.querySelector('.feedback');

  feedbackSection.querySelectorAll('.star-value').forEach(el => {
    el.style.backgroundImage = `url("${starUrl}")`;
  });

  swipeFeedbackLists();
}

function addStarToFeedbackList(response) {
  response.forEach(({ rate, _id }) => {
    rater({
      max: 5,
      readOnly: true,
      rating: rate,
      starSize: 20,
      element: document.querySelector(`#rater-${_id}`),
    });
  });
}

function swipeFeedbackLists() {
  swiper = new Swiper('.feedback-swiper', {
    modules: [Navigation, Pagination],
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
      dynamicBullets: true,
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    grabCursor: true,
    breakpoints: {
      375: {
        slidesPerView: 1,
        spaceBetween: 20,
      },
      768: {
        slidesPerView: 2,
        spaceBetween: 24,
      },
      1440: {
        slidesPerView: 3,
        spaceBetween: 24,
      },
    },
    on: {
      reachEnd: function() {
        if (currentPage < totalPages) {
          loadMoreFeedbacks();
        }
      },
      slideChange: function() {
        const remainingSlides = this.slides.length - this.activeIndex - this.slidesPerViewDynamic();
        if (remainingSlides <= 2 && currentPage < totalPages) {
          loadMoreFeedbacks();
        }
      }
    }
  });
}

renderFeedback();
