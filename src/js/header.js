// Open and close modal functionality for mobile navigation + "escape" button to close modal

(function () {
    const refs = {
    openModalBtn: document.querySelector('[data-modal-open]'),
    closeModalBtns: document.querySelectorAll('[data-modal-close]'),
    modal: document.querySelector('[data-modal-mobnav]'),
    menuLinks: document.querySelectorAll('[data-modal-mobnav] a'),
    body: document.body,
    };

    if (refs.openModalBtn) {
        refs.openModalBtn.addEventListener('click', openModal);
    }

    refs.closeModalBtns.forEach(btn =>
        btn.addEventListener('click', closeModal));
    refs.modal.addEventListener('click', onBackdropClick);
    refs.menuLinks.forEach(link => link.addEventListener('click', closeModal));
    window.addEventListener('keydown', onEscPress);

    function openModal() {
        refs.modal.classList.add('isopen');
        refs.body.classList.add('modal-open');
    }

    function closeModal() {
        refs.modal.classList.remove('isopen');
        refs.body.classList.remove('modal-open');
    }

    function onBackdropClick(event) {
        const clickedInsideModal = event.target.closest('.mob-modal-wrap');
        if (!clickedInsideModal) {
            closeModal();
        }
    }

    function onEscPress(event) {
        if (event.key === 'Escape' || event.code === 'Escape') {
            closeModal();
        }
    }
})();


// Scroll to "Furniture" section when clicking on the button

document.querySelectorAll('.scroll-to-furniture').forEach(button => {
    button.addEventListener('click', function (e) {
        e.preventDefault();

        const target = document.getElementById('furniture');
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });

            const modal = document.querySelector('.header-modal-overlay');
            if (modal && modal.classList.contains('isopen')) {
                modal.classList.remove('isopen');
                document.body.classList.remove('modal-open');
            }
        }
    });
});