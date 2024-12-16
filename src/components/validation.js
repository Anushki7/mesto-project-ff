const showInputError = (formElement, inputElement, errorMessage, validationConfig) => { // Функция, которая добавляет класс с ошибкой
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`); // Находим элемент ошибки внутри самой функции
    inputElement.classList.add(validationConfig.inputErrorClass);
    errorElement.textContent = errorMessage; // Заменим содержимое span с ошибкой на переданный параметр
    errorElement.classList.add(validationConfig.errorClass); // Показываем сообщение об ошибке
};
  
  
const hideInputError = (formElement, inputElement, validationConfig) => { // Функция, которая удаляет класс с ошибкой
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);  // Находим элемент ошибки
    inputElement.classList.remove(validationConfig.inputErrorClass);
    errorElement.classList.remove(validationConfig.errorClass);// Скрываем сообщение об ошибке
    errorElement.textContent = ''; // Очистим ошибку
};
  
  
const isValid = (formElement, inputElement, validationConfig) => { // Функция, которая проверяет валидность поля
    if (inputElement.validity.patternMismatch) {
        inputElement.setCustomValidity(inputElement.dataset.errorMessage);
    } else {
        inputElement.setCustomValidity("");
    }
    
    if (!inputElement.validity.valid) { // showInputError теперь получает параметром форму, в которой находится проверяемое поле, и само это поле
      showInputError(formElement, inputElement, inputElement.validationMessage, validationConfig); // Если поле не проходит валидацию, покажем ошибку
    } else { // Если проходит, скроем
      hideInputError(formElement, inputElement, validationConfig);
    }
};

const hasInvalidInput = (inputList) => { //проверяет наличие невалидного поля и сигнализирует, можно ли разблокировать кнопку сабмита
    return inputList.some((inputElement) => { 
      return !inputElement.validity.valid; 
    });
}; 

const toggleButtonState = (inputList, buttonElement, validationConfig) => { //отключает и включает кнопку - меняет состояние кнопки
    if (hasInvalidInput(inputList)) { // Если есть хотя бы один невалидный инпут сделай кнопку неактивной
        buttonElement.disabled = true;
        buttonElement.classList.add(validationConfig.inactiveButtonClass);
    } else { // иначе сделай кнопку активной
        buttonElement.disabled = false;
        buttonElement.classList.remove(validationConfig.inactiveButtonClass);
    }
}; 

const setInputListeners = (formElement, validationConfig) => { //добавиv обработчики сразу всем полям формы
    const inputList = Array.from(formElement.querySelectorAll(validationConfig.inputSelector)); // Находим все поля внутри формы, сделаем из них массив методом Array.from
    const buttonElement = formElement.querySelector(validationConfig.submitButtonSelector);

    toggleButtonState(inputList, buttonElement, validationConfig);  // Вызовем toggleButtonState, чтобы не ждать ввода данных в поля

    inputList.forEach((input) => { // Обойдём все элементы полученной коллекции
      input.addEventListener('input', () => { // каждому полю добавим обработчик события input
        isValid(formElement, input, validationConfig); // Внутри колбэка вызовем isValid, передав ей форму и проверяемый элемент
        toggleButtonState(inputList, buttonElement, validationConfig); // Вызовем toggleButtonState и передадим ей массив полей и кнопку
      });
    });
};  



export const enableValidation = (validationConfig) => { //найдёт и переберёт все формы на странице
    const formList = Array.from(document.querySelectorAll(validationConfig.formSelector)); // Найдём все формы с указанным классом в DOM, сделаем из них массив методом Array.from
  
    formList.forEach((formElement) => { // Переберём полученную коллекцию
      setInputListeners(formElement, validationConfig); // Для каждой формы вызовем функцию setEventListeners, передав ей элемент формы
    });
};

export const clearValidation = (formElement, validationConfig) => {
    const inputList = Array.from(formElement.querySelectorAll(validationConfig.inputSelector));
    const buttonElement = formElement.querySelector(validationConfig.submitButtonSelector);
    inputList.forEach((inputElement) => {
      hideInputError(formElement, inputElement, validationConfig)
    });
    buttonElement.disabled = true;
    buttonElement.classList.add(validationConfig.inactiveButtonClass);
}

  






