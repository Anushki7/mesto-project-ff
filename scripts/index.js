// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу

function createCard(data, deleteCard) {   // Функция для создания элемента карточки
    const cardTemplate = document.querySelector('#card-template').content;
    const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true); // клонирование шаблона
    
    
    cardElement.querySelector('.card__image').src = data.link;  // Заполняем элемент данными
    cardElement.querySelector('.card__image').alt = data.name;
    cardElement.querySelector('.card__title').textContent = data.name;
    
    
    cardElement.querySelector('.card__delete-button').addEventListener('click', function() { //  обработчик клика по иконке
    deleteCard(cardElement);
    });
    
    return cardElement;
}
    
    
function deleteCard(cardElement) { // Функция удаления карточки 
    cardElement.remove();
}
    

const placesList = document.querySelector('.places__list'); // Выводим все карточки из массива на страницу в элемент .places__list

initialCards.forEach(function(card) {
    const newCard = createCard(card, deleteCard);
    placesList.append(newCard);
});



