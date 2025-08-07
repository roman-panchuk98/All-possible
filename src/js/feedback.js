import Swiper from 'swiper';
import 'swiper/css';
import 'swiper/css/pagination';
import { Navigation, Pagination } from 'swiper/modules';
import refs from './refs';
import axios from 'axios';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

axios.defaults.baseURL = 'https://furniture-store.b.goit.study/api';

function hideSwipeBox() {
  const swipeBox = document.querySelector('.swiper');
  swipeBox.remove();
}

async function getFeedback(currentPage = 1) {
  try {
    const response = await axios.get(`/feedbacks?limit=10&page=${currentPage}`);
    return response;
  } catch (error) {
    hideSwipeBox();
    iziToast.error({
      title: error.message,
      position: 'topRight',
    });
  }
}

function getStars(rate) {
  const fullStars = Math.floor(rate);
  const hasHalfStar = rate % 1 !== 0;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
  let stars = '';

  for (let i = 0; i < fullStars; i++) {
    stars += `<svg class="star star-filled" width="20" height="20"><use href="/img/icons.svg#icon-star-filled"></use></svg>`;
  }
  if (hasHalfStar) {
    stars += `<svg class="star star-half" width="20" height="20"><use href="/img/icons.svg#icon-star-half"></use></svg>`;
  }
  for (let i = 0; i < emptyStars; i++) {
    stars += `<svg class="star star-empty" width="20" height="20"><use href="/img/icons.svg#icon-star-empty"></use></svg>`;
  }

  return stars;
}

function renderFeedback(response) {
  const slidesMarkup = response
    .map(({ descr, name, rate }) => {
      const starsMarkup = getStars(rate);

      return `
      <li class="feedback-item swiper-slide">
          <div class="star-container">${starsMarkup}</div>
          <p class="feedback-descr">${descr}</p>
          <p class="feedback-name">${name}</p>
      </li>`;
    })
    .join('');

  refs.feedbackList.insertAdjacentHTML('beforeend', slidesMarkup);

  new Swiper('.swiper', {
    modules: [Navigation, Pagination],
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    breakpoints: {
      375: {
        slidesPerView: 1,
        spaceBetween: 0,
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

export async function feedbackSection() {
  const response = await getFeedback();
  renderFeedback(response.data.feedbacks);
}
