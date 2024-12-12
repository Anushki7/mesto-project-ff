import '../pages/index.css';
import { initialCards } from '../scripts/cards.js'
import { createCard, deleteCard, handleLike } from '../components/card.js';
import { openPopup, closePopup, closePopupOnEsc } from '../components/modal.js';
const placesList = document.querySelector('.places__list');

const profileEditButton = document.querySelector('.profile__edit-button'); // Находим кнопки открытия попапов
const newCardButton = document.querySelector('.profile__add-button');
const profileNameElement = document.querySelector('.profile__title');
const profileDescriptionElement = document.querySelector('.profile__description');
const profilePopupEdit = document.querySelector('.popup_type_edit');
const popupNewCard = document.querySelector('.popup_type_new-card');
const popupsClose = document.querySelectorAll('.popup__close');
const formEditProfile = document.querySelector('.popup_type_edit .popup__form'); // Форма редактирования профиля
const formNewCard = document.querySelector('.popup_type_new-card .popup__form'); // Форма добавления карточки


initialCards.forEach(function(card) {  // Выводим все карточки из массива на страницу в элемент .places__list
    placesList.append(createCard(card, deleteCard, handleLike));
}); 

profileEditButton.addEventListener('click', function() { //обработчик клика редактировать профиль
    openPopup(profilePopupEdit);
    const profileName = profileNameElement.textContent;
    const profileDescription = profileDescriptionElement.textContent;
    const nameInput = profilePopupEdit.querySelector('.popup__input_type_name');
    const descriptionInput = profilePopupEdit.querySelector('.popup__input_type_description');

    nameInput.value = profileName;
    descriptionInput.value = profileDescription;
});

newCardButton.addEventListener('click', function() {  //обработчик клика добавить +
    openPopup(popupNewCard);
});

popupsClose.forEach(button => { // Обработчики закрытия попапов (на крестик)
    button.addEventListener('click', () => closePopup(button.closest('.popup'), false));
});


//реализация обработчика события submit при отправке формы 

// Находим поля формы в DOM
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_description');

// Обработчик «отправки» формы, хотя пока она никуда отправляться не будет
function handleFormSubmit(evt) {
    evt.preventDefault(); 
    const nameValue = nameInput.value; // Получите значение полей jobInput и nameInput из свойства value
    const jobValue = jobInput.value;

    const profileName = document.querySelector('.profile__title'); // Выберите элементы, куда должны быть вставлены значения полей
    const profileDescription = document.querySelector('.profile__description'); 

    profileName.textContent = nameValue; // Вставьте новые значения с помощью textContent
    profileDescription.textContent = jobValue;

    closePopup(profilePopupEdit);
}

formEditProfile.addEventListener('submit', handleFormSubmit); // Прикрепляем обработчик к форме:он будет следить за событием “submit” - «отправка»


//реализация обработчика события submit при добавлении карточки
function handleNewCardSubmit(evt) {
    evt.preventDefault();
    const nameInput = formNewCard.querySelector('.popup__input_type_card-name');
    const linkInput = formNewCard.querySelector('.popup__input_type_url');

    const newCardData = {
        name: nameInput.value,
        link: linkInput.value
    };


    addNewCard(newCardData);
    closePopup(popupNewCard);
}

function addNewCard(data) {
    placesList.prepend(createCard(data, deleteCard, handleLike));
}

formNewCard.addEventListener('submit', handleNewCardSubmit); 



