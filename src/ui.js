const buyBtns = [...document.querySelectorAll('[data-name]')];
const basketUl = document.querySelector('.basket-list');
const buyAllBtn = document.querySelector('.btn-buy-all');

const basket = new Basket();

const removeItem = event => {
    const id = Number(event.target.dataset.id);
    basket.remove(id);
    createBasketUi();
};

const createBasketUi = () => {
    basketUl.innerText = '';
    const summary = basket.getBasketSummary();

    for (const oneProductInfo of summary) {
        const newLi = document.createElement('li');
        newLi.innerText = oneProductInfo.text;
        newLi.addEventListener('click', removeItem);
        newLi.dataset.id = oneProductInfo.id;
        basketUl.appendChild(newLi);
    }

    const basketTotalValue = basket.getTotalValue();
    buyAllBtn.innerText = `Place your order at the amount: ${basketTotalValue.toFixed(2)} PLN`;

    if (basketTotalValue > 0) {
        buyAllBtn.disabled = false;
    } else {
        buyAllBtn.disabled = true;
    }
};

const buyAllProducts = () => {
    const basketTotalValue = basket.getTotalValue();
    alert(`You ordered products at a total of ${basketTotalValue.toFixed(2)} PLN`)
    basket.clear();
    createBasketUi();
};

const addProductToBasket = event => {
    const name = event.target.dataset.name;
    const price = Number(event.target.dataset.price);

    const newProduct = new Product(name, price);
    basket.add(newProduct);
    createBasketUi();
};

for (const btn of buyBtns) {
    btn.addEventListener('click', addProductToBasket);
}

buyAllBtn.addEventListener('click', buyAllProducts);

createBasketUi();
