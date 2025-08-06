// import Swiper from 'swiper';
// import 'swiper/css';
// import 'swiper/css/navigation';
// import 'swiper/css/pagination';
// import { getFeedback } from './product-api';
// import 'css-star-rating/css/star-rating.min.css';
// import refs from './refs';

// function renderFeedback(response) {
//   const markup = response
//     .map(({ descr, name, rate }) => {
//       return `
//         <li class="feedback-item">
//             <div class="rating" data-rating="${rate} [modifier class]">
//                 <div class="star-container">
//                     <div class="star">
//                         <svg class="star-empty" width="20" height="20">
//                             <use href="../img/icons.svg#icon-star-empty"></use>
//                         </svg>
//                         <svg class="star-half" width="20" height="20">
//                             <use href="../img/icons.svg#icon-star-half"></use>
//                         </svg>
//                         <svg class="star-filled" width="20" height="20">
//                             <use href="../img/icons.svg#icon-star-filled"></use>
//                         </svg>
//                     </div>
//                     <div class="star">
//                         <svg class="star-empty" width="20" height="20">
//                             <use href="../img/icons.svg#icon-star-empty"></use>
//                         </svg>
//                         <svg class="star-half" width="20" height="20">
//                             <use href="../img/icons.svg#icon-star-half"></use>
//                         </svg>
//                         <svg class="star-filled" width="20" height="20">
//                             <use href="../img/icons.svg#icon-star-filled"></use>
//                         </svg>
//                     </div>
//                     <div class="star">
//                         <svg class="star-empty" width="20" height="20">
//                             <use href="../img/icons.svg#icon-star-empty"></use>
//                         </svg>
//                         <svg class="star-half" width="20" height="20">
//                             <use href="../img/icons.svg#icon-star-half"></use>
//                         </svg>
//                         <svg class="star-filled" width="20" height="20">
//                             <use href="../img/icons.svg#icon-star-filled"></use>
//                         </svg>
//                     </div>
//                     <div class="star">
//                         <svg class="star-empty" width="20" height="20">
//                             <use href="../img/icons.svg#icon-star-empty"></use>
//                         </svg>
//                         <svg class="star-half" width="20" height="20">
//                             <use href="../img/icons.svg#icon-star-half"></use>
//                         </svg>
//                         <svg class="star-filled" width="20" height="20">
//                             <use href="../img/icons.svg#icon-star-filled"></use>
//                         </svg>
//                     </div>
//                     <div class="star">
//                         <svg class="star-empty" width="20" height="20">
//                             <use href="../img/icons.svg#icon-star-empty"></use>
//                         </svg>
//                         <svg class="star-half" width="20" height="20">
//                             <use href="../img/icons.svg#icon-star-half"></use>
//                         </svg>
//                         <svg class="star-filled" width="20" height="20">
//                             <use href="../img/icons.svg#icon-star-filled"></use>
//                         </svg>
//                     </div>
//                 </div>
//             </div>
//             <p class="feedback-descr">${descr}</p>
//             <p class="feedback-name">${name}</p>
//         </li>`;
//     })
//     .join('');

//   refs.feedbackList.insertAdjacentHTML('beforeend', markup);

//   if (window.StarRating) {
//     new StarRating('.rating');
//   }
// }

// export async function feedbackSection() {
//   const response = await getFeedback();
//   console.log(response.data.feedbacks);

//   renderFeedback(response.data.feedbacks);
// }

import Swiper from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination } from 'swiper/modules';
import { getFeedback } from './product-api';
import 'css-star-rating/css/star-rating.min.css';
import refs from './refs';

function getStars(rate) {
  const fullStars = Math.floor(rate);
  const hasHalfStar = rate % 1 !== 0;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
  let stars = '';

  for (let i = 0; i < fullStars; i++) {
    stars += `<svg class="star star-filled" width="20" height="20"><use href="../img/icons.svg#icon-star-filled"></use></svg>`;
  }
  if (hasHalfStar) {
    stars += `<svg class="star star-half" width="20" height="20"><use href="../img/icons.svg#icon-star-half"></use></svg>`;
  }
  for (let i = 0; i < emptyStars; i++) {
    stars += `<svg class="star star-empty" width="20" height="20"><use href="../img/icons.svg#icon-star-empty"></use></svg>`;
  }

  return stars;
}

function renderFeedback(response) {
  const slidesMarkup = response
    .map(({ descr, name, rate }) => {
      const starsMarkup = getStars(rate);

      return `
        <div class="swiper-slide">
          <div class="feedback-item">
            <div class="star-container">${starsMarkup}</div>
            <p class="feedback-descr">${descr}</p>
            <p class="feedback-name">${name}</p>
          </div>
        </div>`;
    })
    .join('');

  const fullSwiperMarkup = `
    <div class="swiper">
      <div class="swiper-wrapper">
        ${slidesMarkup}
      </div>
      <div class="swiper-pagination"></div>
      <div class="swiper-button-prev"></div>
      <div class="swiper-button-next"></div>
    </div>`;

  refs.feedbackList.innerHTML = fullSwiperMarkup;

  new Swiper('.swiper', {
    modules: [Navigation, Pagination],
    slidesPerView: 1,
    spaceBetween: 20,
    loop: true,
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  });
}

export async function feedbackSection() {
  const response = await getFeedback();
  renderFeedback(response.data.feedbacks);
}
