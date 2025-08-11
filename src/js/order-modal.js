import iziToast from "izitoast";
import 'izitoast/dist/css/iziToast.min.css';
import axios from "axios";
import refs from "./refs";

window.addEventListener('unhandledrejection', event => {
    event.preventDefault();
});
// слухач події для форми
refs.modalOrderForm.addEventListener("submit", handleFormSubmit);

// Сабміт на формі
async function handleFormSubmit(event) {
    event.preventDefault();

    const savedData = localStorage.getItem("orderData");
    if (!savedData) {
        iziToast.error({
            title: 'Помилка',
            message: 'Немає інформації про товар. Оформлення неможливе.',
            position: 'topCenter',
        });
        return;
    }

    const parsedData = JSON.parse(savedData);
    const productId = parsedData.productId;
    const color = parsedData.color;

    if (!productId || !color) {
        iziToast.error({
            title: 'Помилка',
            message: 'Немає даних про товар. Спробуйте додати його ще раз.',
            position: 'topCenter',
        });
        return;
    }

    // значення в інпутах
    const email = event.currentTarget.elements.email.value.trim();
    const phone = event.currentTarget.elements.phone.value.replace(/^\+/, "");
    const comment = event.currentTarget.elements.comment.value.trim();
    const orderData = {
        "email": email,
        "phone": phone,
        "modelId": productId,
        "color": color,
        "comment": comment
    };

    // помилка на емейлі (функція нижче)
    const existingEmailError = refs.modalOrderEmail.parentElement.querySelector(".error-text");
    if (!email || email.length > 64) {
        refs.modalOrderEmail.classList.add("error-message");
        markupError(refs.modalOrderEmail, "Не валідний Email");
    } else {
        refs.modalOrderEmail.classList.remove("error-message");
        if (existingEmailError) {
            existingEmailError.remove();
        };
    };

    // помилка на телефоні якщо він порожній, якщо не валідний, то патерн і так не дає пройти, тому я вже не писала
    const existingPhoneError = refs.modalOrderPhone.parentElement.querySelector(".error-text");
    if (!phone) {
        refs.modalOrderPhone.classList.add("error-message");
        markupError(refs.modalOrderPhone, "Введіть номер телефону");
    } else {
        refs.modalOrderPhone.classList.remove("error-message");
        if (existingPhoneError) {
            existingPhoneError.remove();
        };
    };

    // помилка на комент
    const existingCommentError = refs.modalOrderComment.parentElement.querySelector(".error-text");
    if (comment.length < 5 || comment.length > 256) {
        refs.modalOrderComment.classList.add("error-message");
        markupError(refs.modalOrderComment, "Введіть коментар довжиною від 5 до 256 символів");
    } else {
        refs.modalOrderComment.classList.remove("error-message");
        if (existingCommentError) {
            existingCommentError.remove();
        };
    }

    // перевірка на валідність при сабміті з повідомленням iziToast
    const isEmailValid = email && email.length <= 64 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
const isPhoneValid = /^380\d{9}$/.test(phone);
const isCommentValid = comment.length >= 5 && comment.length <= 256;

if (!isEmailValid || !isPhoneValid || !isCommentValid) {
    iziToast.error({
        title: 'Помилка',
        message: 'Будь ласка, виправ помилки у формі',
        position: 'topCenter',
    });
    return; 
}

const success = await submitOrder(orderData);
if (success) {
    iziToast.success({
        title: 'Успіх',
        message: 'Форма успішно відправлена!',
        position: 'topCenter',
    });
    refs.modalOrderForm.reset();
    closeOrderModal();
    
} else {
        iziToast.error({
            title: 'Помилка',
            message: 'Будь ласка, виправ помилки у формі',
            position: 'topCenter',
        });
    }
}

// Функція повідомлення при помилці під інпутами
function markupError(targetElement, message) {
    const existingError = targetElement.parentElement.querySelector(".error-text");
    if (!existingError) {
        const errorMessage = `<p class="error-text">${message}</p>`;
        targetElement.insertAdjacentHTML("afterend", errorMessage);
    };
}

// відкриття модалки
export function openOrderModal() {
    document.body.classList.add('body--no-scroll');
    refs.modalOrderBackground.classList.add('order-open');
}

//  закриття модалки
function closeOrderModal() {
    document.body.classList.remove('body--no-scroll');
    refs.modalOrderBackground.classList.remove('order-open');
    localStorage.clear();
}

// слухачі подій для закриття
function listenerHandlClose() {
    const closeFormBtn = document.querySelector(".close-form-btn");
    closeFormBtn.addEventListener("click", closeOrderModal);


    document.addEventListener("keydown", event => {
        if (event.key === "Escape") {
            closeOrderModal();
        };
    });
    refs.modalOrderBackground.addEventListener("click", event => {
        if (event.target === refs.modalOrderBackground) {
            closeOrderModal();
        }
    });
}
 listenerHandlClose();

// інпут у фокусі
function elementInFocus(targetElement) {
    targetElement.addEventListener("focus", () => {
        targetElement.removeAttribute("placeholder");

        if (targetElement === refs.modalOrderPhone) {
            // Якщо немає префікса — додаємо один раз
            if (!targetElement.value.startsWith('+380')) {
                targetElement.value = '+380';
            }
        }
    });

    if (targetElement === refs.modalOrderPhone) {
        // Слухач для вводу — додається лише один раз
        targetElement.addEventListener("input", () => {
            refs.modalOrderPhone.value = "+380" + refs.modalOrderPhone.value.replace(/\D/g, '').slice(3);
        });
    }
}
elementInFocus(refs.modalOrderEmail);
elementInFocus(refs.modalOrderComment);
elementInFocus(refs.modalOrderPhone);

// інпут не у фокусі
function elementOutFocus(targetElement, placeholder) {
    targetElement.addEventListener("blur", () => {
        targetElement.setAttribute("placeholder", `${placeholder}`);
    })
}
elementOutFocus(refs.modalOrderEmail, "12345ggg@gmail.com");
elementOutFocus(refs.modalOrderComment, "Type your message...");
elementOutFocus(refs.modalOrderPhone, "+38 (099) 123 22 11");

// запит на бекенд
const baseURL = "https://furniture-store.b.goit.study/api"
async function submitOrder(orderData) {
    try {
        const response = await axios.post(`${baseURL}/orders`, orderData, {
            headers: { 'Content-Type': 'application/json' }
        });
        return response.status === 201;
    } catch (error) {
        const errorMessage = error.response?.data?.message || 'Помилка запиту';
        iziToast.error({
            title: 'Помилка',
            message: errorMessage,
            position: 'topCenter',
        });
        return false;
    }
}
