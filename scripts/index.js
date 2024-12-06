const cardTemplate = document.querySelector('#card-template').content;
const placesList = document.querySelector('.places__list');

function createCard(data, deleteCard) {   // Функция для создания элемента карточки
    const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true); // клонирование шаблона
    const deleteButton = cardElement.querySelector('.card__delete-button');
    const cardImage = cardElement.querySelector(".card__image") // Заполняем элемент данными
    const cardTitle = cardElement.querySelector('.card__title');
    cardImage.src = data.link;  
    cardImage.alt = data.name; 
    cardTitle.textContent = data.name;
    
    deleteButton.addEventListener('click', function() { //  обработчик клика по иконке
        deleteCard(cardElement);
    });
    
    return cardElement;
}
    
function deleteCard(cardElement) { // Функция удаления карточки 
    cardElement.remove();
}

initialCards.forEach(function(card) {  // Выводим все карточки из массива на страницу в элемент .places__list
    const newCard = createCard(card, deleteCard);
    placesList.append(newCard);
});