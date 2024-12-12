export function openPopup(popup) { //функция открытия попапа
    popup.classList.add('popup_is-opened', 'popup_is-animated');
    document.addEventListener('keydown', closePopupOnEsc);

    const closePopupByOverlayHandler = (evt) => { //Создаем функцию-обработчик
        if (evt.target === evt.currentTarget) {
            closePopup(evt.currentTarget);
        }
    };

    popup.addEventListener('click', closePopupByOverlayHandler);
}      

export function closePopup(popup) { //функция закрытия попапа
    popup.classList.remove('popup_is-opened', 'popup_is-animated');
    document.removeEventListener('keydown', closePopupOnEsc);
}

export function closePopupOnEsc(evt) { // обработчик для закрытия кнопнкой esc
    if (evt.key === 'Escape') {
        const openedPopup = document.querySelector('.popup_is-opened');
        if (openedPopup) {
            closePopup(openedPopup, false);
        }
    }
} 