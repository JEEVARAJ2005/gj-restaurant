// Menu items data
const menuItems = [
    { name: "Masala-Dosa", price: 60, img: "images/breakfast-images/masala-dosa.jpg" },
    { name: "Kerala-Puttu", price: 50, img: "images/breakfast-images/kerala-puttu.webp" },
    { name: "Poori", price: 50, img: "images/breakfast-images/poori.webp" },
    { name: "Ven-Pongal", price: 70, img: "images/breakfast-images/ven-pongal.webp" },
    { name: "Appam", price: 40, img: "images/breakfast-images/appam.jpg" },
    { name: "Idiyappam", price: 45, img: "images/breakfast-images/idiyappam.webp" },
    { name: "Paniyaram", price: 35, img: "images/breakfast-images/masala-paniyaram.webp" },
    { name: "Neer-Dosa", price: 40, img: "images/breakfast-images/neer-dosa.webp" },
    { name: "Ragi-Dosa", price: 50, img: "images/breakfast-images/ragi-dosa.jpg" },
    { name: "Rava-Dosa", price: 45, img: "images/breakfast-images/rava-dosa.jpg" },
    { name: "Rava-Kichadi", price: 40, img: "images/breakfast-images/rava-kichadi.webp" },
    { name: "Semiya", price: 30, img: "images/breakfast-images/semiya.webp" },
    { name: "Uttapam", price: 50, img: "images/breakfast-images/uttapam.webp" }
];

// Generate menu items dynamically
const menuList = document.getElementById("menuList");

menuItems.forEach(item => {
    const container = document.createElement("div");
    container.className = "container";
    container.innerHTML = `
        <div class="inner-container">
            <div class="img-container">
                <img class="img-logo" src="${item.img}" alt="${item.name}" 
                     onclick="showPopup('${item.name}', ${item.price}, '${item.img}')">
            </div>
            <div class="catagory-container">
                <p class="catagory">${item.name}</p>
            </div>
        </div>
    `;
    menuList.appendChild(container);
});

// Popup functions
let currentDish = {};
let value = 1;

function showPopup(dishName, price, imgSrc) {
    const popup = document.getElementById("popup");
    popup.style.display = "block";

    popup.querySelector(".popupImage-logo").src = imgSrc;
    popup.querySelector(".popupdishName").textContent = dishName;
    popup.querySelector(".rate").textContent = `₹${price} /-`;

    // Reset counter and buttons
    value = 1;
    const counter = popup.querySelector("#counter");
    counter.innerText = value;
    popup.querySelector("#incrementDecrementButtons").classList.add("hidden");
    popup.querySelector("#addBtn").classList.remove("hidden");
    popup.querySelector("#tickMark").classList.add("hidden");

    currentDish = { name: dishName, price: price, img: imgSrc };
}

function closePopup() {
    document.getElementById("popup").style.display = "none";
}

// Add to Cart
function placeOrder() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    // Check if dish already exists in cart
    const existingIndex = cart.findIndex(item => item.name === currentDish.name);
    if (existingIndex !== -1) {
        cart[existingIndex].quantity += value;
    } else {
        cart.push({ ...currentDish, quantity: value });
    }

    localStorage.setItem("cart", JSON.stringify(cart));

    // Show tick mark
    document.getElementById("tickMark").classList.remove("hidden");
}

// Increment/Decrement functionality
const addBtn = document.getElementById("addBtn");
const incrementDecrementButtons = document.getElementById("incrementDecrementButtons");
const incrementBtn = document.getElementById("incrementBtn");
const decrementBtn = document.getElementById("decrementBtn");
const counter = document.getElementById("counter");

addBtn.addEventListener("click", () => {
    addBtn.classList.add("hidden");
    incrementDecrementButtons.classList.remove("hidden");
});

incrementBtn.addEventListener("click", () => {
    value += 1;
    counter.innerText = value;
});

decrementBtn.addEventListener("click", () => {
    if (value > 1) {
        value -= 1;
        counter.innerText = value;
    }
});
