const config = {
    baseUrl: 'https://nomoreparties.co/v1/pwff-cohort-1',
    headers: {
      authorization: '33a08338-0271-486f-aeb9-6d4cdb361d2d',
      'Content-Type': 'application/json'
    }
}

// функция обработки response 
const handleResponse = (res) => {
    if (res.ok) {
        return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`); //если ошибка отклоняем промис 
}

// информация о пользователе
export const getUserInfo = () => {
    return fetch(`${config.baseUrl}/users/me`, {
        method: "GET",
        headers: config.headers,
    })
    .then(handleResponse)
}


// получаем карточки
export const getInitialCards = () => {
    return fetch(`${config.baseUrl}/cards`, {
        method: "GET",
        headers: config.headers,
    })
    .then(handleResponse)
}

//редактирование профиля - отправка данных на сервер 
//(отредактированные данные профиля должны сохраняться на сервере)
export const profileEditing = (name, about) => {
    return fetch(`${config.baseUrl}/users/me`, {
        method: "PATCH",
        headers: config.headers,
        body: JSON.stringify({
            name: name,
            about: about
        })
    })
    .then(handleResponse)
}

//добавление новой карточки 
export const addNewCard = (name, link) => {
    return fetch(`${config.baseUrl}/cards`, {
        method: "POST",
        headers: config.headers,
        body: JSON.stringify({
            name: name, 
            link: link
        })
    })
    .then(handleResponse)
}

//удаление карточки 
export const deleteCardServer = (cardId) => {
    return fetch(`${config.baseUrl}/cards/${cardId}`, {
        method: "DELETE",
        headers: config.headers,
    })
    .then(handleResponse)
}

//лайк на карточку
export const addLike = (cardId) => {
    return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
        method: "PUT",
        headers: config.headers
    })
    .then(handleResponse)
}

//удаление лайка 
export const deleteLike = (cardId) => {
    return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
        method: "DELETE",
        headers: config.headers
    })
    .then(handleResponse)
}

//обновление аватара 
export const avatarEditing = (link) => {
    return fetch(`${config.baseUrl}/users/me/avatar`, {
        method: "PATCH",
        headers: config.headers,
        body: JSON.stringify ({
            avatar: link
        })
    })
    .then(handleResponse)
}