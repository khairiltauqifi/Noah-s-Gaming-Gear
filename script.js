const cartIcon = document.querySelector("#cart-icon");
const cart = document.querySelector(".cart");
const cartClose = document.querySelector("#cart-close"); // fix typo
const cartContent = document.querySelector(".cart-content");
const cartItemCount = document.querySelector(".cart-item-count");



cartIcon.addEventListener("click", () => {
    cart.classList.add("active"); // class yg dipakai di CSS
});

cartClose.addEventListener("click", () => {
    cart.classList.remove("active");
});

// Tombol tambah ke keranjang
const addCartButtons = document.querySelectorAll(".add-cart");
addCartButtons.forEach(button => {
  button.addEventListener("click", event => {
    const productBox = event.target.closest(".product-box");
    addToCart(productBox);
  });
});

// Fungsi tambah produk ke keranjang
function addToCart(productBox) {
  const productImgSrc = productBox.querySelector("img").src;
  const productTitle = productBox.querySelector(".product-title").textContent;
  const productPrice = productBox.querySelector(".price").textContent;

  // Cek apakah produk sudah ada di keranjang
  const cartBoxes = cartContent.querySelectorAll(".cart-box");
  for (let box of cartBoxes) {
    const title = box.querySelector(".cart-product-title").textContent;
    if (title === productTitle) {
      // Jika sudah ada, tambah jumlahnya saja
      let qtyElem = box.querySelector(".number");
      qtyElem.textContent = parseInt(qtyElem.textContent) + 1;
      updateTotalPrice();
      return;
    }
  }

  // Jika belum ada, buat baru
  const cartBox = document.createElement("div");
  cartBox.classList.add("cart-box");
  cartBox.innerHTML = `
    <img src="${productImgSrc}" class="cart-img">
    <div class="cart-detail">
      <h2 class="cart-product-title">${productTitle}</h2>
      <span class="cart-price">${productPrice}</span>
      <div class="cart-quantity-and-remove" style="display:flex; align-items:center; gap:10px; margin-top:8px;">
        <div class="cart-quantity" style="display:flex; border:1px solid #999; border-radius:6px; overflow:hidden;">
          <button class="decrement" style="padding:0 10px; border:none; background:transparent; cursor:pointer;">-</button>
          <span class="number" style="padding:0 10px; user-select:none;">1</span>
          <button class="increment" style="padding:0 10px; border:none; background:transparent; cursor:pointer;">+</button>
        </div>
        <i class="ri-delete-bin-6-line cart-remove" style="font-size:24px; cursor:pointer; color:#e35f26;"></i>
      </div>
    </div>
  `;

  cartContent.appendChild(cartBox);

  // Event increment, decrement, remove
  const incrementBtn = cartBox.querySelector(".increment");
  const decrementBtn = cartBox.querySelector(".decrement");
  const quantitySpan = cartBox.querySelector(".number");
  const removeBtn = cartBox.querySelector(".cart-remove");

  incrementBtn.addEventListener("click", () => {
    quantitySpan.textContent = parseInt(quantitySpan.textContent) + 1;
    updateTotalPrice();
  });

  decrementBtn.addEventListener("click", () => {
    let currentQty = parseInt(quantitySpan.textContent);
    if (currentQty > 1) {
      quantitySpan.textContent = currentQty - 1;
      updateTotalPrice();
    }
  });

  removeBtn.addEventListener("click", () => {
    cartBox.remove();
    updateTotalPrice();
  });

  updateTotalPrice();
}

// Fungsi update total harga dan jumlah item pada icon
function updateTotalPrice() {
  const cartBoxes = cartContent.querySelectorAll(".cart-box");
  let total = 0;
  let totalItems = 0;

  cartBoxes.forEach(box => {
    const priceText = box.querySelector(".cart-price").textContent;
    // Ambil angka dari harga misalnya "Rp 6.300.330"
    const priceNumber = parseInt(priceText.replace(/[^0-9]/g, ""));
    const qty = parseInt(box.querySelector(".number").textContent);

    total += priceNumber * qty;
    totalItems += qty;
  });

  const totalPriceElement = document.querySelector(".total-price");
  totalPriceElement.textContent = `Rp ${total.toLocaleString("id-ID")}`;

  if (totalItems > 0) {
    cartItemCount.style.visibility = "visible";
    cartItemCount.textContent = totalItems;
  } else {
    cartItemCount.style.visibility = "hidden";
  }
}
