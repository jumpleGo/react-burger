

const getFillings = (state) => {
    const {
        burgerIngredients
    } = state.storeReducer;

    return burgerIngredients.filter( item => item.type !== 'bun');
};

const getBun = (state) => {
    const {
        burgerIngredients
    } = state.storeReducer;
    return burgerIngredients.filter(item => item.type === 'bun')?.[0];
}

export {
    getFillings,
    getBun
};