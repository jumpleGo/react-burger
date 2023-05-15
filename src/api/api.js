const API_URL = 'https://norma.nomoreparties.space/api/'

const resolver = (res) => {
    return res.ok
        ? res.json().then(data => Promise.resolve(data))
        : res.json().then((err) => Promise.reject(err))
}
const get = (path) => {
    const res = fetch(API_URL + path)
        .then(resolver)
        .catch(err => console.error(err))

    return res
}

const post = (path, payload) => {
        const res = fetch(API_URL + path, {
            method: 'POST',
            body: JSON.stringify(payload),
            headers: {
                "Content-Type": "application/json"
            },
        })
        .then(resolver)
        .catch(err => console.error(err))

    return res
}

export {
    get,
    post
}