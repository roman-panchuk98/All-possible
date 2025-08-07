import axios from 'axios';
import refs from './refs';
import Swiper from 'swiper';
import 'swiper/css';
import 'swiper/css/pagination';
import { Navigation, Pagination } from 'swiper/modules';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

async function getPopularGoods() {
  try {
    const response = await axios.get(
      `https://furniture-store.b.goit.study/api/furnitures?page=1&limit=11&type=popular`
    );
    return response.data;
  } catch (error) {
    // hideSwipeBox();
    iziToast.error({
      title: error.message,
      position: 'topRight',
    });
  }
}

async function renderPopularGoods() {
  const response = await getPopularGoods();
  const markup = response.furnitures
    .map(({ images, name, color, price, _id }) => {
      if (name.length > 28) {
        name = name.slice(0, 28) + '...';
      }
      return `
      <li class="popular-goods-item swiper-slide" id="${_id}">
        <img class="popular-goods-img" src="${images[0]}" alt="${name}">
        <div class="popular-goods-item-desc">
            <h3 class="popular-goods-item-title">${name}</h3>
            <ul class="popular-goods-colors">
                ${color
                  .map(
                    goodsColor =>
                      `<input type="checkbox" class="goods-color" style="background-color: ${goodsColor}" disabled>`
                  )
                  .join('')}
            </ul>
            <p class="popular-goods-price">${price} грн</p>
        </div>
        <button class="popular-goods-more-datails-btn">Детальніше</button>
      </li>
        `;
    })
    .join('');
  refs.popularGoodsList.innerHTML = markup;

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
    grabCursor: true,
    breakpoints: {
      375: {
        slidesPerView: 1,
        spaceBetween: 16,
      },
      768: {
        slidesPerView: 2,
        spaceBetween: 24,
      },
      1440: {
        slidesPerView: 4,
        spaceBetween: 24,
      },
    },
  });
}

function hideSwipeBox() {
  const swipeBox = document.querySelector('.swiper');
  swipeBox.remove();
}

renderPopularGoods();
