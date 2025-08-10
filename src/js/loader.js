// Loader utility module
class LoaderManager {
  constructor() {
    this.loaderElement = null;
    this.activeRequests = 0;
    this.minimumDisplayTime = 300; // мінімальний час показу loader в мс
    this.showTimestamp = null;
  }

  init() {
    // Отримуємо елемент loader з DOM
    this.loaderElement = document.getElementById('global-loader');
    
    if (!this.loaderElement) {
      console.warn('Loader element not found in DOM');
      return;
    }
  }

  show(text = 'Завантаження...') {
    if (!this.loaderElement) {
      this.init();
    }

    this.activeRequests++;
    
    // Показуємо loader тільки якщо це перший запит
    if (this.activeRequests === 1 && this.loaderElement) {
      this.showTimestamp = Date.now();
      
      // Оновлюємо текст якщо потрібно
      const textElement = this.loaderElement.querySelector('.loader-text');
      if (textElement) {
        textElement.textContent = text;
      }
      
      // Додаємо клас для показу
      this.loaderElement.classList.add('active');
      // Не блокуємо скрол для bottom loader
      // document.body.classList.add('loader-active');
    }
  }

  hide() {
    this.activeRequests = Math.max(0, this.activeRequests - 1);
    
    // Ховаємо loader тільки якщо немає активних запитів
    if (this.activeRequests === 0 && this.loaderElement) {
      // Перевіряємо мінімальний час відображення
      const elapsedTime = this.showTimestamp ? Date.now() - this.showTimestamp : this.minimumDisplayTime;
      const remainingTime = Math.max(0, this.minimumDisplayTime - elapsedTime);
      
      setTimeout(() => {
        if (this.activeRequests === 0) {
          this.loaderElement.classList.remove('active');
          // document.body.classList.remove('loader-active');
          this.showTimestamp = null;
        }
      }, remainingTime);
    }
  }

  forceHide() {
    // Примусово ховає loader незалежно від кількості запитів
    this.activeRequests = 0;
    if (this.loaderElement) {
      this.loaderElement.classList.remove('active');
      // document.body.classList.remove('loader-active');
      this.showTimestamp = null;
    }
  }

  setText(text) {
    if (!this.loaderElement) return;
    
    const textElement = this.loaderElement.querySelector('.loader-text');
    if (textElement) {
      textElement.textContent = text;
    }
  }

  isActive() {
    return this.activeRequests > 0;
  }
}

// Створюємо глобальний екземпляр
const loader = new LoaderManager();

// Ініціалізуємо після завантаження DOM
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => loader.init());
} else {
  loader.init();
}

export default loader;