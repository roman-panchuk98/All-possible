import axios from 'axios';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

axios.defaults.baseURL = 'https://furniture-store.b.goit.study/api';

export async function getFurnitureList(currentPage = 1) {
  try {
    const response = await axios.get(`/furnitures?page=${currentPage}&limit=8`);
    return response;
  } catch (error) {
    iziToast.error({
      title: error.message,
      position: 'topRight',
    });
  }
}

export async function getCategoriesList() {
  try {
    const response = axios.get('/categories');
    return response;
  } catch (error) {
    iziToast.error({
      title: error.message,
      position: 'topRight',
    });
  }
}

export async function postOrders() {
  try {
    const response = await axios.post('/orders');
    return response;
  } catch (error) {
    iziToast.error({
      title: error.message,
      position: 'topRight',
    });
  }
}

export async function getFeedback(currentPage = 1) {
  try {
    const response = await axios.get(`/feedbacks?limit=10&page=${currentPage}`);
    return response;
  } catch (error) {
    iziToast.error({
      title: error.message,
      position: 'topRight',
    });
  }
}
