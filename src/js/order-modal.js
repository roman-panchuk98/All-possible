import iziToast from "izitoast";
import 'izitoast/dist/css/iziToast.min.css';
import axios from "axios";

const form = document.querySelector(".modal-form");
const modalForm = document.querySelector(".order-modal");
const emailForm = document.querySelector(".input-email");
const commentForm = document.querySelector(".textarea");
const phoneForm = document.querySelector(".input-phone");
const plus = document.querySelector(".plus-elem");

const savedData = localStorage.getItem("orderData");
const parsedData = JSON.parse(savedData);
const productId = parsedData.productId;
const color = parsedData.color;

// слухач події для форми
form.addEventListener("submit", handleFormSubmit);

// Сабміт на формі
function handleFormSubmit(event) {
    event.preventDefault();

    // значення в інпутах
    const email = event.currentTarget.elements.email.value.trim();
    const phone = event.currentTarget.elements.phone.value.trim();
    const comment = event.currentTarget.elements.comment.value.trim();
    const orderData = {
        "email": email,
        "phone": phone,
        "modelId": productId,
        "color": color,
        "comment": comment
    }
    console.log(orderData);

    // помилка на емейлі (функція нижче)
    const existingEmailError = emailForm.parentElement.querySelector(".error-text");
    if (!email || email.length > 64) {
        emailForm.classList.add("error-message");
        markupError(emailForm, "Не валідний Email");
    } else {
        emailForm.classList.remove("error-message");
        if (existingEmailError) {
            existingEmailError.remove();
        };
    };

    // помилка на телефоні якщо він порожній, якщо не валідний, то патерн і так не дає пройти, тому я вже не писала
    const existingPhoneError = phoneForm.parentElement.querySelector(".error-text");
    if (!phone) {
        phoneForm.classList.add("error-message");
        markupError(phoneForm, "Введіть номер телефону");
    } else {
        phoneForm.classList.remove("error-message");
        if (existingPhoneError) {
            existingPhoneError.remove();
        };
    };

    // помилка на комент
    const existingCommentError = commentForm.parentElement.querySelector(".error-text");
    if (comment.length < 5 || comment.length > 256) {
        commentForm.classList.add("error-message");
        markupError(commentForm, "Введіть коментар довжиною від 5 до 256 символів");
    } else {
        commentForm.classList.remove("error-message");
        if (existingCommentError) {
            existingCommentError.remove();
        };
    }

    // перевірка на валідність при сабміті з повідомленням iziToast
    const isEmailValid = email && email.length <= 64;
    const isPhoneValid = phone;
    const isCommentValid = comment.length >= 5 && comment.length <= 256;

    if (isEmailValid && isPhoneValid && isCommentValid) {
        iziToast.success({
            title: 'Успіх',
            message: 'Форма успішно відправлена!',
            position: 'topCenter',
        });
        submitOrder(orderData);
        form.reset();
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
    modalForm.classList.remove('visually-hidden');
}

//  закриття модалки
function closseOrderModal() {
    document.body.classList.remove('body--no-scroll');
    modalForm.classList.add('visually-hidden');
}

// слухачі подій для закриття
function listenerHandlClose() {
    const closeFormBtn = document.querySelector(".close-form-btn");
    closeFormBtn.addEventListener("click", closseOrderModal);


    document.addEventListener("keydown", event => {
        if (event.key === "Escape") {
            closseOrderModal();
        };
    });
    modalForm.addEventListener("click", event => {
        if (event.target === modalForm) {
            closseOrderModal();
        }
    });
}
 listenerHandlClose();

// інпут у фокусі
function elementInFocus(targetElement) {
    targetElement.addEventListener("focus", () => {
        targetElement.removeAttribute("placeholder");
        if (targetElement === phoneForm) {
            plus.classList.remove("visually-hidden");
            phoneForm.style.paddingLeft = "20px"
        };
    });
};
elementInFocus(emailForm);
elementInFocus(commentForm);
elementInFocus(phoneForm);

// інпут не у фокусі
function elementOutFocus(targetElement, placeholder) {
    targetElement.addEventListener("blur", () => {
        targetElement.setAttribute("placeholder", `${placeholder}`);
        if (targetElement === phoneForm && targetElement.value.trim().length === 0) {
            plus.classList.add("visually-hidden");
            phoneForm.style.paddingLeft = "12px"
        }
    })
}
elementOutFocus(emailForm, "12345ggg@gmail.com");
elementOutFocus(commentForm, "Type your message...");
elementOutFocus(phoneForm, "+38 (099) 123 22 11");

// запит на бекенд
const baseURL = "https://furniture-store.b.goit.study/api"
async function submitOrder(orderData) {
    try {
        const response = await axios.post(`${baseURL}/orders`, orderData, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        console.log('Замовлення відправлено:', response.data);
        return response;
        
    } catch (error) {
        iziToast.error({
            title: error.message,
            position: 'topCenter',
        });
    }
}