//Mobile Menu Toggle
const mobileMenuButton = document.getElementById("mobile-menu-button");
const mobileMenu = document.getElementById("mobile-menu");

mobileMenuButton.addEventListener("click", () => {
  // Toggle menu
  mobileMenu.classList.toggle("hidden");
});

// Auto-close menu
document.querySelectorAll("#mobile-menu a").forEach((link) => {
  link.addEventListener("click", () => {
    if (window.innerWidth < 768) {
      mobileMenu.classList.add("hidden");
    }
  });
});

// Active Menu JavaScript code
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".navLinks a");

window.addEventListener("scroll", () => {
  let current = "";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 100;
    const sectionHeight = section.clientHeight;

    if (
      window.pageYOffset >= sectionTop &&
      window.pageYOffset < sectionTop + sectionHeight
    ) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    // Remove active state
    link.classList.remove("text-blue-500", "after:scale-x-100");
    link.classList.add("text-gray-600", "after:scale-x-0");

    // Compare link #home with current section id="home"
    if (link.getAttribute("href") === `#${current}`) {
      link.classList.remove("text-gray-600", "after:scale-x-0");
      link.classList.add("text-blue-500", "after:scale-x-100");
    }
  });
});

// -------------------------------------------------------------------------------------------------------------------------------------------
//Sliding banner code here
const prevImage = document.querySelector("#prevBtn");
const nextImage = document.querySelector("#nextBtn");
const slider = document.querySelector(".slider");

let images = document.querySelectorAll(".image");

let length = images.length;
let slideNumber = 1;

const nextSlide = () => {
  if (slideNumber < length) {
    slider.style.transform = `translateX(-${slideNumber * 100}%)`;
    slideNumber++;
  } else {
    slider.style.transform = `translateX(0px)`;
    slideNumber = 1;
  }
};

nextImage.addEventListener("click", nextSlide);

const prevSlide = () => {
  if (slideNumber > 1) {
    slider.style.transform = `translateX(-${(slideNumber - 2) * 100}%)`;
    slideNumber--;
  } else {
    slider.style.transform = `translateX(-${(length - 1) * 100}%)`;
    slideNumber = length;
  }
};
prevImage.addEventListener("click", prevSlide);

let autoSlide = setInterval(nextSlide, 3000);
// ---------------------------------------------------------------------------------------------------------------------------------------------

//prouct display code here
const searchProducts = () => {
  fetch("https://fakestoreapi.com/products")
    .then((res) => res.json())
    .then((data) => showDetails(data));
};

// Get the container
const displayCard = document.getElementById("display-card");

// Function to show products
let cart = {}; // Store how many prduct selected

const showDetails = (products) => {
  displayCard.innerHTML = ""; // Clear previous content

  products.forEach((product) => {
    const CNdiv = document.createElement("div");
    CNdiv.classList.add("mb-6");

    CNdiv.innerHTML = `
      <div class="border rounded-lg p-4 flex flex-col items-center text-center shadow-md bg-white">
        <img src="${product.image}" alt="${product.title}" class="h-40 object-contain mb-4">
        <h5 class="text-gray-800 font-semibold mb-2">${product.title}</h5>
        <h5 class="text-blue-600 font-bold mb-2">${product.price} BDT</h5>
        <p class="text-yellow-500 mb-2">Rating: ${product.rating.rate} ★ (${product.rating.count})</p>
        <div class="flex items-center space-x-2 cart-controls">
          <button class="buy-btn bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition">Add to Cart</button>
          <div class="quantity-controls hidden items-center space-x-2">
            <button class="decrease bg-red-500 text-white px-3 py-1 rounded">-</button>
            <span class="quantity font-semibold">1</span>
            <button class="increase bg-green-500 text-white px-3 py-1 rounded">+</button>
          </div>
        </div>
      </div>
    `;

    const addBtn = CNdiv.querySelector(".buy-btn");
    const quantityControls = CNdiv.querySelector(".quantity-controls");
    const quantitySpan = quantityControls.querySelector(".quantity");
    const decreaseBtn = quantityControls.querySelector(".decrease");
    const increaseBtn = quantityControls.querySelector(".increase");

    // Add to cart click
    addBtn.addEventListener("click", () => {
      if (!cart[product.id]) {
        cart[product.id] = 1;
      } else {
        cart[product.id]++;
      }
      quantitySpan.textContent = cart[product.id];
      quantityControls.classList.remove("hidden");
    });

    // Increase quantity
    increaseBtn.addEventListener("click", () => {
      cart[product.id]++;
      quantitySpan.textContent = cart[product.id];
    });

    // Decrease quantity
    decreaseBtn.addEventListener("click", () => {
      cart[product.id]--;
      if (cart[product.id] <= 0) {
        delete cart[product.id];
        quantityControls.classList.add("hidden");
      } else {
        quantitySpan.textContent = cart[product.id];
      }
    });

    displayCard.appendChild(CNdiv);
  });
};

// ---------------------------------------------------------------------------------------------------------

const reviewSlider = document.getElementById("review-slider");

// Fetch reviews from JSON
fetch("reviews.json")
  .then((res) => res.json())
  .then((data) => showReviews(data));

let reviewNumber = 1; // start with first review
let totalSlides = 0;

function showReviews(reviews) {
  totalSlides = reviews.length;

  reviews.forEach((review) => {
    const card = document.createElement("div");
    card.classList.add("min-w-full", "p-4"); // each slide full width
    card.innerHTML = `
      <div class="bg-white rounded-xl shadow-md p-6">
        <div class="flex items-center mb-4">
          <div class="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
            ${review.name.charAt(0)}
          </div>
          <div class="ml-4">
            <h4 class="font-semibold text-gray-800">${review.name}</h4>
            <p class="text-sm text-gray-500">${review.date}</p>
          </div>
        </div>
        <div class="text-yellow-500 mb-3">${"★".repeat(
          review.rating
        )}${"☆".repeat(5 - review.rating)}</div>
        <p class="text-gray-600">${review.comment}</p>
      </div>
    `;
    reviewSlider.appendChild(card);
  });
}

// Next review
const nextReview = () => {
  if (reviewNumber < totalSlides) {
    reviewSlider.style.transform = `translateX(-${reviewNumber * 100}%)`;
    reviewNumber++;
  } else {
    reviewSlider.style.transform = `translateX(0)`;
    reviewNumber = 1;
  }
};

// Previous review
const prevReview = () => {
  if (reviewNumber > 1) {
    reviewSlider.style.transform = `translateX(-${(reviewNumber - 2) * 100}%)`;
    reviewNumber--;
  } else {
    reviewSlider.style.transform = `translateX(-${(totalSlides - 1) * 100}%)`;
    reviewNumber = totalSlides;
  }
};

// Event listeners
document.getElementById("nextReview").addEventListener("click", nextReview);
document.getElementById("prevReview").addEventListener("click", prevReview);

// Auto-slide every 4 seconds
setInterval(nextReview, 4000);

// -------------------------------------------------------------------------------------------------------------
// user balance code here

//add money
let userBalance = 1000;
const walletBalance = document.querySelectorAll(".wallet-balance");

//taking input value
const addedAmount = document.getElementById("addAmount");
const addBtn = document.getElementById("addBtn");

//adding money
function updateBalanceDisplay() {
  walletBalance.forEach((balance) => {
    balance.textContent = `${userBalance.toFixed(2)} BDT`;
  });
}
//after clicking + button
addBtn.addEventListener("click", () => {
  const amount = Number(addedAmount.value);
  if (amount > 0) {
    userBalance += amount;
    updateBalanceDisplay();
    addedAmount.value = "";
  } else {
    alert("Please Enter a valid amount!");
  }
});

updateBalanceDisplay();
// ------------------------------------------------------------------------------------------------------
//sorting code
let productsData = []; // to store products

const searchProductsForSort = () => {
  fetch("https://fakestoreapi.com/products")
    .then((res) => res.json())
    .then((data) => {
      productsData = data; // store products
      showDetails(productsData);
    });
};

// Sorting
const sortSelect = document.querySelector("select");

sortSelect.addEventListener("change", () => {
  let sortedProducts = [...productsData]; // copy original array

  if (sortSelect.value === "price-low") {
    sortedProducts.sort((a, b) => a.price - b.price);
  } else if (sortSelect.value === "price-high") {
    sortedProducts.sort((a, b) => b.price - a.price);
  }

  showDetails(sortedProducts);// render sorted products
  setupCartButtons();
});

searchProductsForSort(); // fetch and display products initially
// ----------------------------------------------------------------------------------------------------------

// ---------------------- Cart & Order Summary ----------------------

let userCart = {}; // {productId: quantity}
let balance = 1000;
const balanceDisplays = document.querySelectorAll(".wallet-balance");
const addMoneyInput = document.getElementById("addAmount");
const addMoneyBtn = document.getElementById("addBtn");

// Update wallet display
function updateWallet() {
  balanceDisplays.forEach((el) => (el.textContent = `${balance} BDT`));
}
updateWallet();

// Add money
addMoneyBtn.addEventListener("click", () => {
  const amount = Number(addMoneyInput.value);
  if (amount > 0) {
    balance += amount;
    updateWallet();
    addMoneyInput.value = "";
  } else alert("Enter a valid amount!");
});

// Order summary elements
const subtotalEl = document.querySelector(".subTotal");
const deliveryEl = document.querySelector(".deliveryCharge");
const shippingEl = document.querySelector(".shippingCost");
const discountEl = document.querySelector(".discount");
const totalEl = document.querySelector(".totalAmount");
const couponInput = document.querySelector(".inputAmount");
const couponBtn = document.querySelector(".inputAmountBtn");

let summary = {
  subtotal: 0,
  delivery: 60,
  shipping: 100,
  discount: 0,
  total: 0,
  couponApplied: false,
};

// Update order summary
function updateSummary() {
  summary.subtotal = 0;

  for (let id in userCart) {
    const product = productsData.find((p) => p.id == id);
    summary.subtotal += product.price * userCart[id];
  }

  summary.discount = summary.couponApplied ? summary.subtotal * 0.1 : 0;

  summary.total =
    summary.subtotal > 0
      ? summary.subtotal +
        summary.delivery +
        summary.shipping -
        summary.discount
      : 0;

  subtotalEl.textContent = `${summary.subtotal.toFixed(2)} BDT`;
  deliveryEl.textContent =
    summary.subtotal > 0 ? `${summary.delivery} BDT` : "0 BDT";
  shippingEl.textContent =
    summary.subtotal > 0 ? `${summary.shipping} BDT` : "0 BDT";
  discountEl.textContent = `-${summary.discount.toFixed(2)} BDT`;
  totalEl.textContent = `${summary.total.toFixed(2)} BDT`;
}

// Coupon button
couponBtn.addEventListener("click", () => {
  const code = couponInput.value.trim();
  if (code === "SMART10" && summary.subtotal > 0) {
    summary.couponApplied = true;
    updateSummary();
    alert("Coupon applied!");
  } else if (summary.subtotal === 0) {
    alert("Cart is empty! Add products first.");
  } else {
    alert("Invalid coupon!");
    summary.couponApplied = false;
    updateSummary();
  }
});

// Product Cart Logic
function setupCartButtons() {
  const productCards = document.querySelectorAll("#display-card > div");

  productCards.forEach((card) => {
    const addBtn = card.querySelector(".buy-btn");
    const quantityControls = card.querySelector(".quantity-controls");
    const quantitySpan = card.querySelector(".quantity");
    const increaseBtn = card.querySelector(".increase");
    const decreaseBtn = card.querySelector(".decrease");
    const title = card.querySelector("h5").textContent;
    const product = productsData.find((p) => p.title === title);

    // Add to cart button
    addBtn.onclick = () => {
      if (!userCart[product.id]) userCart[product.id] = 1;
      quantitySpan.textContent = userCart[product.id];
      quantityControls.classList.remove("hidden");
      updateSummary();
    };

    // Increase button
    increaseBtn.onclick = () => {
      userCart[product.id]++;
      quantitySpan.textContent = userCart[product.id];
      updateSummary();
    };

    // Decrease button
    decreaseBtn.onclick = () => {
      userCart[product.id]--;
      if (userCart[product.id] <= 0) {
        delete userCart[product.id];
        quantityControls.classList.add("hidden");
      } else {
        quantitySpan.textContent = userCart[product.id];
      }
      updateSummary();
    };
  });
}

// Call after products loaded
searchProductsForSort();
setTimeout(setupCartButtons, 1000);
// ------
// Proceed to Checkout button
const checkoutBtn = document.getElementById("checkoutBtn");

checkoutBtn.addEventListener("click", () => {
  if (summary.total <= 0) {
    alert("Your cart is empty!");
    return;
  }

  if (userBalance >= summary.total) {
    userBalance -= summary.total; // balance minus from wallet
    updateBalanceDisplay(); // Update wallet & display
    alert("Payment successful!");
    userCart = {}; // Clear cart after checkout
    updateSummary(); // Reset order summary
    // Optionally hide all quantity controls
    const quantityControls = document.querySelectorAll(".quantity-controls");
    quantityControls.forEach((ctrl) => ctrl.classList.add("hidden"));
  } else {
    alert("Not enough balance in your wallet!");
  }
});

