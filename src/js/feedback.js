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
    const response = await axios.get(`/feedbacks?limit=10&page=${currentPage}`);
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

async function renderFeedback() {
  const response = await getFeedback();
  const slidesMarkup = response
    .map(({ descr, name, rate, _id }) => {
      return `
      <li class="feedback-item swiper-slide">
          <div id="rater-${_id}" data-rating="${rate}"  aria-label="Rated ${rate} out of 5 stars"></div>
          <p class="feedback-descr">${descr}</p>
          <p class="feedback-name">${name}</p>
      </li>`;
    })
    .join('');

  refs.feedbackList.insertAdjacentHTML('beforeend', slidesMarkup);

  addStarToFeedbackList(response);

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
  new Swiper('.feedback-swiper', {
    modules: [Navigation, Pagination],
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
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
  });
}

renderFeedback();
