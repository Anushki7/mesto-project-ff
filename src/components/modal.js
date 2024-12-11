const form = document.querySelector('.popup__form');

export function openPopup(popup, imageData = null) { //функция открытия попапа
    popup.classList.add('popup_is-opened', 'popup_is-animated');
    document.addEventListener('keydown', closePopupOnEsc);

    
    if (imageData) { // Обработка данных изображения (если переданы)
      popup.querySelector('.popup__image').src = imageData.src;
      popup.querySelector('.popup__image').alt = imageData.alt;
    }


    popup.addEventListener('click', function(evt) {
        if (evt.target === popup) {
            closePopup(popup, false);
        }
    }, { once: true }); // { once: true } - обработчик сработает только один раз
}      

export function closePopup(popup, saveData = true) { //функция закрытия попапа
    popup.classList.remove('popup_is-opened', 'popup_is-animated');
    document.removeEventListener('keydown', closePopupOnEsc);
    if (!saveData && form) {
        form.reset();
    }
}

export function closePopupOnEsc(evt) { // обработчик для закрытия кнопнкой esc
    if (evt.key === 'Escape') {
        const openedPopup = document.querySelector('.popup_is-opened');
        if (openedPopup) {
            closePopup(openedPopup, false);
        }
    }
} 