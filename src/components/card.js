const cardTemplate = document.querySelector('#card-template').content;

export function createCard(data, deleteCard, handleLike, openImagePopup) {   // Функция для создания элемента карточки
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

    likeButton.addEventListener('click', function() {
        handleLike(likeButton);
    });

    cardImage.addEventListener('click', function()  { // Обработчик клика на картинку
        openImagePopup(data.name, data.link);
    });
    
    return cardElement;
}

export function deleteCard(cardElement) { // Функция удаления карточки 
    cardElement.remove();
}

export function handleLike(likeButton) { // Обработчик события клика по кнопке лайка
    likeButton.classList.toggle('card__like-button_is-active'); // Меняем класс для изменения цвета
}


