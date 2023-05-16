import {get, post} from './api'
export const fetchData = () => {
    return get('ingredients')
}

export const order = (orderArr) => {
    return post('orders', orderArr)
}