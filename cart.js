const cartContainer = document.getElementById('cartContainer');
const totalContainer = document.getElementById('totalContainer');

let cart = JSON.parse(localStorage.getItem('cart')) || [];

function renderCart() {
    cartContainer.innerHTML = '';
    let total = 0;

    if(cart.length === 0){
        cartContainer.innerHTML = '<tr><td colspan="5" style="text-align:center;">Your cart is empty.</td></tr>';
        totalContainer.textContent = '';
        return;
    }

    cart.forEach((item, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${item.name}</td>
            <td>${item.quantity}</td>
            <td>₹${item.price * item.quantity}</td>
            <td><button class="button" onclick="removeItem(${index})">Remove</button></td>
        `;
        cartContainer.appendChild(row);
        total += item.price * item.quantity;
    });

    totalContainer.textContent = `Total: ₹${total}/-`;
}

function removeItem(index){
    cart.splice(index,1);
    localStorage.setItem('cart', JSON.stringify(cart));
    renderCart();
}

// Initial render
renderCart();
