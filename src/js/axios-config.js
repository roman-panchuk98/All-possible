import axios from 'axios';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import loader from './loader';

// Базова конфігурація axios
const axiosInstance = axios.create({
  baseURL: 'https://furniture-store.b.goit.study/api/',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  }
});

// Конфігурація для retry логіки
const MAX_RETRY_ATTEMPTS = 3;
const RETRY_DELAY = 1000; // мілісекунди

// Мапа для збереження кількості спроб для кожного запиту
const retryCountMap = new WeakMap();

// Request interceptor - показуємо loader перед запитом
axiosInstance.interceptors.request.use(
  (config) => {
    // Показуємо loader для всіх запитів
    loader.show();
    
    // Ініціалізуємо retry count
    if (!retryCountMap.has(config)) {
      retryCountMap.set(config, 0);
    }
    
    return config;
  },
  (error) => {
    loader.hide();
    return Promise.reject(error);
  }
);

// Response interceptor - ховаємо loader після відповіді
axiosInstance.interceptors.response.use(
  (response) => {
    // Успішна відповідь - ховаємо loader
    loader.hide();
    
    // Очищаємо retry count для успішного запиту
    if (response.config) {
      retryCountMap.delete(response.config);
    }
    
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    
    // Перевіряємо чи це network error або timeout
    const isNetworkError = !error.response || error.code === 'ECONNABORTED';
    const isServerError = error.response?.status >= 500;
    
    // Отримуємо поточну кількість спроб
    const retryCount = retryCountMap.get(originalRequest) || 0;
    
    // Retry логіка для network errors та 5xx помилок
    if ((isNetworkError || isServerError) && retryCount < MAX_RETRY_ATTEMPTS) {
      // Збільшуємо лічильник спроб
      retryCountMap.set(originalRequest, retryCount + 1);
      
      // Показуємо повідомлення про повторну спробу
      loader.setText(`Повторна спроба ${retryCount + 1}/${MAX_RETRY_ATTEMPTS}...`);
      
      // Затримка перед повторною спробою
      await new Promise(resolve => setTimeout(resolve, RETRY_DELAY * (retryCount + 1)));
      
      // Повторний запит
      return axiosInstance(originalRequest);
    }
    
    // Якщо всі спроби вичерпані або інша помилка - ховаємо loader
    loader.hide();
    
    // Очищаємо retry count
    if (originalRequest) {
      retryCountMap.delete(originalRequest);
    }
    
    // Обробка різних типів помилок
    handleApiError(error);
    
    return Promise.reject(error);
  }
);

// Функція для централізованої обробки помилок
function handleApiError(error) {
  let title = 'Помилка';
  let message = 'Щось пішло не так. Спробуйте пізніше.';
  
  if (!error.response) {
    // Network error
    title = 'Помилка мережі';
    message = 'Перевірте інтернет-з\'єднання та спробуйте ще раз';
  } else if (error.response.status === 404) {
    title = 'Не знайдено';
    message = 'Запитуваний ресурс не знайдено';
  } else if (error.response.status === 400) {
    title = 'Некоректний запит';
    message = error.response.data?.message || 'Перевірте введені дані';
  } else if (error.response.status === 401) {
    title = 'Не авторизовано';
    message = 'Необхідна авторизація для виконання цієї дії';
  } else if (error.response.status === 403) {
    title = 'Доступ заборонено';
    message = 'У вас немає прав для виконання цієї дії';
  } else if (error.response.status >= 500) {
    title = 'Помилка сервера';
    message = 'Проблема на сервері. Спробуйте пізніше';
  }
  
  // Timeout error
  if (error.code === 'ECONNABORTED') {
    title = 'Час очікування вичерпано';
    message = 'Сервер не відповідає. Спробуйте пізніше';
  }
  
  // Показуємо повідомлення про помилку
  iziToast.error({
    title: title,
    message: message,
    position: 'topRight',
    timeout: 5000,
  });
}

// Додаткові helper функції для різних типів запитів
export const api = {
  get: (url, config) => axiosInstance.get(url, config),
  post: (url, data, config) => axiosInstance.post(url, data, config),
  put: (url, data, config) => axiosInstance.put(url, data, config),
  delete: (url, config) => axiosInstance.delete(url, config),
  patch: (url, data, config) => axiosInstance.patch(url, data, config),
};

// Експортуємо налаштований екземпляр axios
export default axiosInstance;