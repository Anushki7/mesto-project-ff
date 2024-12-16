import '../pages/index.css';
import { createCard, deleteCard, handleLike } from '../components/card.js';
import { openPopup, closePopup, closePopupOnEsc, closePopupByOverlayHandler } from '../components/modal.js';
import { enableValidation, clearValidation } from '../components/validation.js';
import { getUserInfo, getInitialCards, profileEditing, addNewCard, avatarEditing } from '../components/api.js';
const placesList = document.querySelector('.places__list');

const profileEditButton = document.querySelector('.profile__edit-button'); // Находим кнопки открытия попапов
const newCardButton = document.querySelector('.profile__add-button');
const profileNameElement = document.querySelector('.profile__title');
const profileDescriptionElement = document.querySelector('.profile__description');
const profileImage = document.querySelector('.profile__image');
const avatarPopupEdit = document.querySelector('.popup_type_avatar')
const profilePopupEdit = document.querySelector('.popup_type_edit');
const popupNewCard = document.querySelector('.popup_type_new-card');
const popupTypeImage = document.querySelector('.popup_type_image');
const popupCloseButtons = document.querySelectorAll('.popup__close');
const formEditProfile = document.querySelector('.popup_type_edit .popup__form'); // Форма редактирования профиля
const formNewCard = document.querySelector('.popup_type_new-card .popup__form'); // Форма добавления карточки
const formAvatar = document.querySelector('.popup_type_avatar .popup__form');


let userId; // вывести карточки на страницу 
function getInfoUserAndCards () {
    return Promise.all([getUserInfo(), getInitialCards()]) //для загрузки данных пользователя и карточек - метод Promise.all
    .then(([userData, cardsData]) => {
        
        profileNameElement.textContent = userData.name;
        profileDescriptionElement.textContent = userData.about;
        profileImage.style.backgroundImage = `url(${userData.avatar})`;

        userId = userData._id;

        cardsData.forEach((card) => {
            placesList.append(createCard(card, deleteCard, handleLike, openImagePopup, userId));
        });
    })
    .catch((err) => {
        console.log(err) // выводим ошибку в консоль - если запрос не ушел на сервер или тот не ответил
    })
}

getInfoUserAndCards();

function openImagePopup (name, link) { //данные изображения
    popupTypeImage.querySelector('.popup__image').src = link; 
    popupTypeImage.querySelector('.popup__image').alt = name;
    popupTypeImage.querySelector('.popup__caption').textContent = name;  
    openPopup(popupTypeImage); 
} 

const avatarLinkInput = document.querySelector('.popup__input_type_url_avatar');

profileImage.addEventListener('click', function () { //обработчик клика редактировать аватар 
    openPopup(avatarPopupEdit);
    clearValidation(avatarPopupEdit, validationConfig);
}) 

formAvatar.addEventListener('submit', () => {
    evt.preventDefault();

    const avatarSaveBtn = formAvatar.querySelector(".popup__button");
    avatarSaveBtn.textContent = 'Сохранение...';

    avatarEditing(avatarLinkInput.value)
    .then ((res) => {
        profileImage.style.backgroundImage = `url(${res.avatar})`;
        closePopup(avatarPopupEdit);
        avatarPopupEdit.reset();
    })
    .catch((err) => {
        console.log(err)
    })
    .finally(() => {
        avatarSaveBtn.textContent = "Сохранить";
    })
});

profileEditButton.addEventListener('click', function() { //обработчик клика редактировать профиль
    openPopup(profilePopupEdit);
    clearValidation(formEditProfile, validationConfig); // вызов функции clearValidation - функция очистки ошибок валидации
    const profileName = profileNameElement.textContent;
    const profileDescription = profileDescriptionElement.textContent;
    const nameInput = profilePopupEdit.querySelector('.popup__input_type_name');
    const descriptionInput = profilePopupEdit.querySelector('.popup__input_type_description');

    nameInput.value = profileName;
    descriptionInput.value = profileDescription;
});

newCardButton.addEventListener('click', function() {  //обработчик клика добавить +
    openPopup(popupNewCard);
    clearValidation(popupNewCard, validationConfig); // вызов функции clearValidation - функция очистки ошибок валидации
});

popupCloseButtons.forEach(button => { // Обработчики закрытия попапов (на крестик)
    button.addEventListener('click', () => closePopup(button.closest('.popup'), false));
});


function handleFormSubmitEditProfile(evt) { //реализация обработчика события submit при отправке формы 
    evt.preventDefault(); 

    const profileSaveBtn = formEditProfile.querySelector('.popup__button');
    profileSaveBtn.textContent = 'Сохранение...';

    profileEditing(profileNameElement.textContent, profileDescriptionElement.textContent)
    .then((data) => {
        profileNameElement.textContent = data.name; //новые значения в поля  !
        profileDescriptionElement.textContent = data.about;
        closePopup(profilePopupEdit);
    })
    .catch((err) => {
        console.log(err)
    })
    .finally(() => {
        profileSaveBtn.textContent = "Сохранить";
    })
}

formEditProfile.addEventListener('submit', handleFormSubmitEditProfile); // Прикрепляем обработчик к форме:он будет следить за событием “submit” - «отправка»


function handleNewCardSubmitNewCard(evt) { //реализация обработчика события submit при добавлении карточки
    evt.preventDefault();

    const formNewCardSaveBtn = formNewCard.querySelector('.popup__button');
    formNewCardSaveBtn.textContent = 'Сохранение...';

    const nameInput = formNewCard.querySelector('.popup__input_type_card-name');
    const linkInput = formNewCard.querySelector('.popup__input_type_url');

    addNewCard(nameInput.value, linkInput.value)
    .then ((data) => {
        placesList.prepend(createCard(data, deleteCard, handleLike, openImagePopup, userId));
        closePopup(popupNewCard);
        formNewCard.reset();
    })
    .catch((err) => {
        console.log(err)
    })
    .finally (() => {
        formNewCardSaveBtn.textContent = 'Сохранить';
    })
}

formNewCard.addEventListener('submit', handleNewCardSubmitNewCard); 

const validationConfig = {
    formSelector: ".popup__form",
    inputSelector: ".popup__input",
    submitButtonSelector: ".popup__button",
    inactiveButtonClass: "popup__button_disabled",
    inputErrorClass: "popup__input_type_error",
    errorClass: "popup__input-error_active",
}; 

enableValidation(validationConfig); // Вызовем функцию активации валидации

