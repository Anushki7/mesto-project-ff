const cardTemplate = document.querySelector('#card-template').content;
import { deleteCardServer, addLike, deleteLike } from './api.js'

export function createCard(data, deleteCard, handleLike, openImagePopup, userId) {   // Функция для создания элемента карточки
    const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true); // клонирование шаблона
    const deleteButton = cardElement.querySelector('.card__delete-button');
    const cardImage = cardElement.querySelector('.card__image') // Заполняем элемент данными
    const cardTitle = cardElement.querySelector('.card__title');
    const likeButton = cardElement.querySelector('.card__like-button');
    const likeCounter = cardElement.querySelector('.like-counter');

    cardImage.src = data.link;  
    cardImage.alt = data.name; 
    cardTitle.textContent = data.name;
    likeCounter.textContent = data.likes.length 

    const cardId = data._id;

    if (data.owner._id !==  userId) { // проверяем владельца карточки
        deleteButton.remove();
    } else {
        deleteButton.addEventListener('click', () => {
            deleteCard(cardId, cardElement);
        });
    }

    if (data.likes.some((like) => like._id == userId)) { // чтобы при обновлении лайк был закрашенным
        likeButton.classList.add('card__like-button_is-active');
    }

    likeButton.addEventListener('click', function() {
        handleLike(likeButton, cardId, likeCounter);
    });

    cardImage.addEventListener('click', function()  { // Обработчик клика на картинку
        openImagePopup(data.name, data.link);
    });
    
    return cardElement;
}

export function deleteCard(cardId, cardElement) { // Функция удаления карточки 
    deleteCardServer(cardId)
    .then(() => {
        cardElement.remove();
    })
    .catch((err) => {
        console.error(err);
    });
}

export function handleLike( likeButton, cardId, likeCounter) {
    if (!likeButton.classList.contains('card__like-button_is-active')) {
        addLike(cardId) // лайкнуть
        .then((res) => {
            likeButton.classList.add('card__like-button_is-active');
            likeCounter.textContent = res.likes.length; // обновление счетчика
        })
        .catch((err) => {
            console.log(err);
        });
    } else {
        deleteLike(cardId) // удалить лайк
        .then((res) => {
            likeButton.classList.remove('card__like-button_is-active');
            likeCounter.textContent = res.likes.length; //обновление счетчика
        })
        .catch((err) => {
            console.log(err);
        });
    }
}