/* ================= USER SYSTEM ================= */
let currentUser = null;

const loginForm = document.getElementById("loginForm");
const signupForm = document.getElementById("signupForm");
const logoutBtn = document.getElementById("logoutBtn");
const userStatus = document.getElementById("userStatus");

// Mock users database
let usersDB = [
  { username: "admin", password: "admin123", role: "admin", email: "admin@example.com" }
];

function updateUserStatus() {
  userStatus.textContent = currentUser ? `Logged in as: ${currentUser.username} (${currentUser.role})` : "Not logged in";
}

// Signup
signupForm?.addEventListener("submit", (e) => {
  e.preventDefault();
  const username = signupForm.username.value;
  const password = signupForm.password.value;
  const email = signupForm.email.value;
  if (usersDB.find(u => u.username === username)) {
    alert("Username already exists!");
    return;
  }
  usersDB.push({ username, password, email, role: "customer" });
  alert("Signup successful!");
  signupForm.reset();
});

// Login
loginForm?.addEventListener("submit", (e) => {
  e.preventDefault();
  const username = loginForm.username.value;
  const password = loginForm.password.value;
  const user = usersDB.find(u => u.username === username && u.password === password);
  if (user) {
    currentUser = user;
    alert("Login successful!");
    updateUserStatus();
    loginForm.reset();
  } else {
    alert("Invalid credentials!");
  }
});

// Logout
logoutBtn?.addEventListener("click", () => {
  currentUser = null;
  updateUserStatus();
});

/* ================= CRUD OPERATIONS ================= */
// Mock database
let productsDB = [
  { id: 1, name: "Product 1", price: 100 },
  { id: 2, name: "Product 2", price: 200 }
];

const productList = document.getElementById("productList");
function renderProducts() {
  if (!productList) return;
  productList.innerHTML = "";
  productsDB.forEach(product => {
    const li = document.createElement("li");
    li.textContent = `${product.name} - $${product.price}`;
    const delBtn = document.createElement("button");
    delBtn.textContent = "Delete";
    delBtn.addEventListener("click", () => {
      productsDB = productsDB.filter(p => p.id !== product.id);
      renderProducts();
    });
    li.appendChild(delBtn);
    productList.appendChild(li);
  });
}
renderProducts();

/* ================= CONTACT / LEADS ================= */
const contactForm = document.getElementById("contactForm");
const leadsDB = [];

contactForm?.addEventListener("submit", (e) => {
  e.preventDefault();
  const name = contactForm.name.value;
  const email = contactForm.email.value;
  const message = contactForm.message.value;
  leadsDB.push({ name, email, message });
  alert("Lead submitted!");
  contactForm.reset();
  console.log("Leads:", leadsDB);
});

/* ================= E-COMMERCE SYSTEM ================= */
const cart = [];
const cartList = document.getElementById("cartList");

document.querySelectorAll(".add-cart")?.forEach(btn => {
  btn.addEventListener("click", () => {
    const id = parseInt(btn.dataset.id);
    const product = productsDB.find(p => p.id === id);
    if (product) {
      cart.push(product);
      renderCart();
    }
  });
});

function renderCart() {
  if (!cartList) return;
  cartList.innerHTML = "";
  cart.forEach((item, index) => {
    const li = document.createElement("li");
    li.textContent = `${item.name} - $${item.price}`;
    const delBtn = document.createElement("button");
    delBtn.textContent = "Remove";
    delBtn.addEventListener("click", () => {
      cart.splice(index, 1);
      renderCart();
    });
    li.appendChild(delBtn);
    cartList.appendChild(li);
  });
}

/* ================= BOOKING SYSTEM ================= */
const bookingForm = document.getElementById("bookingForm");
const bookingsDB = [];

bookingForm?.addEventListener("submit", (e) => {
  e.preventDefault();
  const name = bookingForm.name.value;
  const date = bookingForm.date.value;
  const time = bookingForm.time.value;
  bookingsDB.push({ name, date, time });
  alert("Booking confirmed!");
  bookingForm.reset();
  console.log("Bookings:", bookingsDB);
});

/* ================= MEMBERSHIP / SUBSCRIPTION ================= */
const subscribeBtn = document.getElementById("subscribeBtn");
const memberContent = document.getElementById("memberContent");

subscribeBtn?.addEventListener("click", () => {
  if (currentUser) {
    memberContent.textContent = "You now have access to premium content!";
  } else {
    alert("You must login to subscribe!");
  }
});

/* ================= API DEMO ================= */
const apiBtn = document.getElementById("apiBtn");
const apiResult = document.getElementById("apiResult");

apiBtn?.addEventListener("click", async () => {
  apiResult.textContent = "Fetching data...";
  try {
    // Using placeholder API for demo
    const response = await fetch("https://jsonplaceholder.typicode.com/posts?_limit=5");
    const data = await response.json();
    apiResult.textContent = JSON.stringify(data, null, 2);
  } catch (err) {
    apiResult.textContent = "Error fetching API data.";
  }
});

/* ================= SEARCH & FILTER ================= */
const searchInput = document.getElementById("searchInput");
const searchSelect = document.getElementById("searchSelect");
const searchList = document.getElementById("searchList");

searchInput?.addEventListener("input", filterList);
searchSelect?.addEventListener("change", filterList);

function filterList() {
  const query = searchInput.value.toLowerCase();
  const category = searchSelect.value;
  const filtered = productsDB.filter(p => p.name.toLowerCase().includes(query));
  if (searchList) {
    searchList.innerHTML = "";
    filtered.forEach(p => {
      const li = document.createElement("li");
      li.textContent = `${p.name} - $${p.price}`;
      searchList.appendChild(li);
    });
  }
}
