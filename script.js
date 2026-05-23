let basket = [];

const basketElement = document.getElementById('basket-items');
const totalElement = document.getElementById('basket-total');
const clearBasketBtn = document.getElementById('clear-basket');
const checkoutBtn = document.getElementById('checkout');

const saveBasketToLocalStorage = () => {
    localStorage.setItem('basket', JSON.stringify(basket))
}

const loadBasketFromLocalStorage = () => {
    const savedBasket = localStorage.getItem('basket');
    if (savedBasket) {
        basket = JSON.parse(savedBasket);
        renderBasket();
    }
};

const addToBasket = (product) => {
    basket.push(product);
    saveBasketToLocalStorage();
    renderBasket();
    alert(`Товар "${product.name}" добавлен в корзину!`);
};

const removeFromBasket = (index) => {
    basket.splice(index, 1);
    saveBasketToLocalStorage();
    renderBasket();
    alert('Товар удалён из корзины');
};

const totalSum = () => {
    let total = 0;
    for (let i = 0; i < basket.length; i++) {
        total = total + basket[i].price;
    }
    return total;
};

const renderBasket = () => {
    if (basket.length === 0) {
        basketElement.innerHTML = '<p>Корзина пуста</p>';
        totalElement.textContent = 'Итого: 0 ₽';
        return;
    }

    let html = '';
    for (let i = 0; i < basket.length; i++) {
        const item = basket[i];
        html += `
            <div class="basket-item">
                <div>
                    <strong>${item.name}</strong><br>
                    <small>${item.price} ₽</small>
                </div>
                <button onclick="removeFromBasket(${i})">Удалить</button>
            </div>
        `;
    }

    basketElement.innerHTML = html;
    const total = totalSum();
    totalElement.textContent = `Итого: ${total} ₽`;
};

const clearBasket = () => {
    basket = [];
    saveBasketToLocalStorage();
    renderBasket();
    alert('Корзина очищена');
};

const checkout = () => {
    if (basket.length === 0) {
        alert('Корзина пуста, добавьте товары перед оплатой');
    } else {
        alert('Покупка прошла успешно');
        basket = [];
        saveBasketToLocalStorage(); 
        renderBasket();
    }
};

document.addEventListener('DOMContentLoaded', () => {
    loadBasketFromLocalStorage();
    const addButtons = document.querySelectorAll('.add-to-basket');

    for (let i = 0; i < addButtons.length; i++) {
        const button = addButtons[i];
        button.addEventListener('click', () => {
            const id = button.getAttribute('data-id');
            const name = button.getAttribute('data-name');
            const price = parseInt(button.getAttribute('data-price'));
            addToBasket({ id: id, name: name, price: price });
        });
    }

    if (clearBasketBtn) 
    {
        clearBasketBtn.addEventListener('click', clearBasket);
    }

    if (checkoutBtn) 
    {
        checkoutBtn.addEventListener('click', checkout);
    }

    const filterBtns = document.querySelectorAll('.filter-btn');
    const products = document.querySelectorAll('.product-card');

    for (let i = 0; i < filterBtns.length; i++) {
        const btn = filterBtns[i];
        btn.addEventListener('click', () => {
            for (let j = 0; j < filterBtns.length; j++) {
                filterBtns[j].classList.remove('active');
            }
            btn.classList.add('active');

            const category = btn.getAttribute('data-category');

            for (let j = 0; j < products.length; j++) 
            {
                const product = products[j];
                const productCategory = product.getAttribute('data-category');
                if (category === 'all' || productCategory === category) 
                {
                    product.style.display = 'block';
                } 
                else 
                {
                    product.style.display = 'none';
                }
            }
        });
    }
});
