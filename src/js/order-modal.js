// const form = document.querySelector(".modal-form");
// const closeFormBtn = document.querySelector(".close-form-btn");
// const submitBtn = document.querySelector(".submit-btn");
// const modalForm = document.querySelector(".order-modal");
// const emailForm = document.querySelector(".input-email");

// closeFormBtn.addEventListener("click", handleCloseForm);
// modalForm.addEventListener("click", handleCloseModal);
// form.addEventListener("submit", handleFormSubmit);
// document.addEventListener("keydown", handleEscapeClose);

// function handleEscapeClose(event) {
//   if (event.key === "Escape") {
//     modalForm.classList.add("visually-hidden");
//   }
// }

// function handleCloseForm() {
//     modalForm.classList.add("visually-hidden");
// }

// function handleCloseModal(event) {
//     if (event.target === modalForm) {
//         modalForm.classList.add("visually-hidden");
//     }
// }

// function handleFormSubmit(event) {
//     event.preventDefault();
//     const email = event.currentTarget.elements.email.value.trim();
//     const phone = event.currentTarget.elements.phone.value.trim();
//     const comment = event.currentTarget.elements.comment.value.trim();
//     if (!email || email.length > 64) {
//         emailForm.classList.add("error-message");
//         markupError();
//     } else {
//         emailForm.classList.remove("error-message");
//         const existingError = document.querySelector(".error-text");
//         if (existingError) {
//             existingError.remove();
//         };
//     };
// }

// function markupError() {
//     const errorMessage = `
//     <p class="error-text">Error Text</p>
//     `;
//     emailForm.insertAdjacentHTML("afterend", errorMessage);
// }