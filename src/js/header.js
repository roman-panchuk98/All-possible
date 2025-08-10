import refs from './refs.js';

// Open and close modal functionality for mobile navigation + "escape" button to close modal

(function () {

    refs.headerOpenModalBtn?.addEventListener('click', openModal);

    refs.headerCloseModalBtns?.forEach(btn =>
        btn.addEventListener('click', closeModal));
    
    refs.headerModal?.addEventListener('click', onBackdropClick);
    refs.headerMenuLinks?.forEach(link => link.addEventListener('click', closeModal));
    window.addEventListener('keydown', onEscPress);

    function openModal() {
        refs.headerModal?.classList.add('isopen');
        refs.headerBody?.classList.add('modal-open');
    }

    function closeModal() {
        refs.headerModal?.classList.remove('isopen');
        refs.headerBody?.classList.remove('modal-open');
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

refs.headerScrollBtns?.forEach(button => {
    button.addEventListener('click', e => {
        e.preventDefault();

        const target = document.getElementById('furniture');
        if (!target) return;

        if (refs.headerModal?.classList.contains('isopen')) {
            refs.headerModal.classList.remove('isopen');
            refs.headerBody?.classList.remove('modal-open');

            setTimeout(() => {
                target.scrollIntoView({ behavior: 'smooth' });
            }, 300);
        } else {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});