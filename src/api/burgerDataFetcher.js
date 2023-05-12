const API_URL = 'https://norma.nomoreparties.space/api/'
export const fetcher = (path) => {
    const res = fetch(API_URL + path)
        .then(res => res.ok
            ? res.json().then(data => Promise.resolve(data))
            : res.json().then((err) => Promise.reject(err)))
        .catch(err => console.error(err))

    return res
}