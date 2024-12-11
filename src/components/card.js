const cardTemplate = document.querySelector('#card-template').content;
const popupTypeImage = document.querySelector('.popup_type_image');
import { openPopup } from './modal';

export function createCard(data, deleteCard, handleLike) {   // Функция для создания элемента карточки
    const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true); // клонирование шаблона
    const deleteButton = cardElement.querySelector('.card__delete-button');
    const cardImage = cardElement.querySelector(".card__image") // Заполняем элемент данными
    const cardTitle = cardElement.querySelector('.card__title');
    const likeButton = cardElement.querySelector('.card__like-button');

    cardImage.src = data.link;  
    cardImage.alt = data.name; 
    cardTitle.textContent = data.name;
    
    deleteButton.addEventListener('click', function() { //  обработчик клика по иконке
        deleteCard(cardElement);
    });

    // Обработчик клика на картинку
    cardImage.addEventListener('click', function()  {
        openPopup(popupTypeImage, {src: data.link, alt: data.name}); // Передаем данные изображения
    });

    likeButton.addEventListener('click', function() {
        handleLike(likeButton);
    });
    
    return cardElement;
}

export function deleteCard(cardElement) { // Функция удаления карточки 
    cardElement.remove();
}

export function handleLike(likeButton) { // Обработчик события клика по кнопке лайка
    likeButton.classList.toggle('card__like-button_is-active'); // Меняем класс для изменения цвета
}


