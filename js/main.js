
document.addEventListener('DOMContentLoaded', () => {

    const cartItemCount = document.querySelector('.cart-icon span');
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    const cartItemList = document.querySelector('.cart-items');
    const cartTotal = document.querySelector('.cart-total');
    const cartIcon = document.querySelector('.cart-icon');
    const sidebarClose = document.querySelector('.sidebar-close');
    const sidebar = document.querySelectorAll('.sidebar');

    const testcss = document.querySelectorAll('.test');
    const testId = document.getElementById('mytest');

    let cartItems = [];
    let totalAmount = 0;

    addToCartButtons.forEach((button, index) => {
        button.addEventListener('click', () => {
            const item = {
                name: document.querySelectorAll('.card .card-title')[index].textContent,
                price: parseFloat(document.querySelectorAll('.price .count')[index].textContent),
                quantity: 1
            }
            const exisitingItem = cartItems.find((cartItem) => cartItem.name === item.name,)

            if (exisitingItem) {
                exisitingItem.quantity++;
            } else {
                cartItems.push(item);
            }
            totalAmount += item.price;
            updateCartUI()
        })
    })

    cartIcon.addEventListener('click', () => {
        test()
    })

    sidebarClose.addEventListener('click', () => {
        test()
    })

    function updateCartUI() {
        // console.log("aaa");
        calcTotalAmount()
        updateCartItemCount(cartItems.length)
        updateCartItemList()
        updateCartTotal()
    }

    function updateCartItemCount(count) {
        cartItemCount.textContent = count;
    }

    function updateCartItemList() {
        cartItemList.innerHTML = "";
        cartItems.forEach((item, index) => {
            const cartItem = document.createElement('div')
            cartItem.classList.add('cart-item', 'individual-cart-item')
            cartItem.innerHTML = `
            <span>(${item.quantity}x)${item.name}</span>
            <span class="cart-item-price">$${(item.price * item.quantity).toFixed(2)}
                <button class="plus-btn" data-index="${index}">
                    <i class="fa-solid fa-plus-circle"></i>
                </button>
                <button class="minus-btn" data-index="${index}">
                    <i class="fa-solid fa-minus-circle"></i>
                </button>
                <button class="remove-btn" data-index="${index}">
                    <i class="fa-solid fa-times"></i>
                </button>
            </span>`
            cartItemList.append(cartItem)
        })

        const removeButtons = document.querySelectorAll('.remove-btn')
        removeButtons.forEach((button) => {
            button.addEventListener('click', (event) => {
                const index = button.dataset.index
                removeItemFromCart(index)
            })
        })

        const plusButtons = document.querySelectorAll('.plus-btn')
        plusButtons.forEach((button) => {
            button.addEventListener('click', (event) => {
                const index = button.dataset.index
                changeItemFromCart(index, 1)
            })
        })

        const minusButtons = document.querySelectorAll('.minus-btn')
        minusButtons.forEach((button) => {

            button.addEventListener('click', (event) => {
                const index = button.dataset.index
                changeItemFromCart(index, -1)
            })
        })

    }

    function updateCartTotal() {
        cartTotal.textContent = `$${totalAmount.toFixed(2)}`
    }

    function removeItemFromCart(index) {
        const removeItem = cartItems.splice(index, 1)[0];
        updateCartUI();
    }

    function changeItemFromCart(index, x) {
        const editItem = cartItems[index];
        editItem.quantity = editItem.quantity + x
        if (editItem.quantity == 0) {
            cartItems.splice(index, 1)[0];
        }
        updateCartUI();
    }

    function calcTotalAmount() {
        totalAmount = 0;
        cartItems.forEach(item => {
            totalAmount += item.quantity * item.price;
        });
    }
})

function test() {
    sidebar.classList.toggle('close');
}





