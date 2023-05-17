const API_URL = 'https://norma.nomoreparties.space/api/'

const request = (path, options) => {
    const url = API_URL + path
    return fetch(url, options).then(resolver)
}

const resolver = (res) => {
    return res.ok
        ? res.json().then(data => Promise.resolve(data))
        : res.json().then((err) => Promise.reject(err))
}

const get = (path) => {
    return request(path)
}

const post = (path, payload) => {
    return request(path, {
        method: 'POST',
        body: JSON.stringify(payload),
        headers: {
            "Content-Type": "application/json"
        },
    })
}

export {
    get,
    post
}