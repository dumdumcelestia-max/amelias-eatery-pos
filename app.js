// =======================
// SETUP
// =======================

let cart = [];
let sales = JSON.parse(localStorage.getItem("sales")) || [];
const salesHistory = document.getElementById("salesHistory");

const menuGrid = document.getElementById("menuGrid");
const cartItems = document.getElementById("cartItems");
const total = document.getElementById("total");
const cash = document.getElementById("cash");
const change = document.getElementById("change");
const search = document.getElementById("search");
const clearBtn = document.getElementById("clearBtn");
const payBtn = document.getElementById("payBtn");
const adminBtn = document.getElementById("adminBtn");
const receiptModal = document.getElementById("receiptModal");
const receiptContent = document.getElementById("receiptContent");
const closeReceipt = document.getElementById("closeReceipt");
const adminModal = document.getElementById("adminModal");
const closeAdmin = document.getElementById("closeAdmin");
const saveFood = document.getElementById("saveFood");
const newName = document.getElementById("newName");
const newPrice = document.getElementById("newPrice");
const newCategory = document.getElementById("newCategory");
const todaySales = document.getElementById("todaySales");
const totalOrders = document.getElementById("totalOrders");
const averageSale = document.getElementById("averageSale");
const backupBtn = document.getElementById("backupBtn");
const restoreBtn = document.getElementById("restoreBtn");
const restoreFile = document.getElementById("restoreFile");
const resetSalesBtn = document.getElementById("resetSalesBtn");
const reportDate = document.getElementById("reportDate");
const viewReportBtn = document.getElementById("viewReportBtn");
const reportResult = document.getElementById("reportResult");
const weeklyReportBtn = document.getElementById("weeklyReportBtn");
const weeklyReportResult = document.getElementById("weeklyReportResult");

const ADMIN_PASSWORD = "1234";

function checkAdmin() {
    const pass = prompt("🔒 Enter Admin Password");

    if (pass !== ADMIN_PASSWORD) {
        alert("❌ Wrong Password!");
        return false;
    }

    return true;
}
let menu = JSON.parse(localStorage.getItem("menu")) || [
  // ULAM
  { id:1, name:"Adobo", price:50, category:"Ulam" },
  { id:2, name:"Humba", price:50, category:"Ulam" },
  { id:3, name:"Adobong Sitaw", price:35, category:"Ulam" },
  { id:4, name:"Ginataang Sitaw at Kalabasa", price:35, category:"Ulam" },
  { id:5, name:"Menudo", price:50, category:"Ulam" },
  { id:6, name:"Fried Chicken", price:50, category:"Ulam" },
  { id:7, name:"Bicol Express", price:50, category:"Ulam" },
  { id:8, name:"Dinuguan", price:50, category:"Ulam" },
  { id:9, name:"Pakbet", price:35, category:"Ulam" },
  { id:10, name:"Chopsuey", price:35, category:"Ulam" },
  { id:11, name:"Sari Gulay", price:35, category:"Ulam" },
  { id:12, name:"Pork Caldereta", price:50, category:"Ulam" },
  { id:13, name:"Sinuglaw w/ Tuna", price:60, category:"Ulam" },
  { id:14, name:"Sinuglaw Plain", price:50, category:"Ulam" },
  { id:15, name:"Dabong Gata", price:35, category:"Ulam" },
  { id:16, name:"Monggo", price:35, category:"Ulam" },
  { id:17, name:"Kare-Kare", price:60, category:"Ulam" },
  { id:18, name:"Nilaga Pork Pata", price:50, category:"Ulam" },
  { id:19, name:"Porkchop", price:50, category:"Ulam" },
  { id:20, name:"Pancit", price:35, category:"Ulam" },
  { id:21, name:"Bihon", price:35, category:"Ulam" },
  { id:22, name:"Torta Talong", price:30, category:"Ulam" },
  { id:23, name:"Hotdog", price:20, category:"Ulam" },
  { id:24, name:"Longganisa", price:20, category:"Ulam" },
  { id:25, name:"Bopis", price:50, category:"Ulam" },
  { id:26, name:"Pork Maskara", price:50, category:"Ulam" },
  { id:27, name:"Bulalo", price:75, category:"Ulam" },
  { id:28, name:"Balbacua", price:75, category:"Ulam" },
  { id:29, name:"Hinalang", price:75, category:"Ulam" },
  { id:30, name:"Chicken Tinola", price:50, category:"Ulam" },
  { id:31, name:"Buffalo Wings", price:50, category:"Ulam" },

  // RICE
  { id:32, name:"Plain Rice", price:15, category:"Rice" },
  { id:33, name:"Java Rice", price:20, category:"Rice" },

  // BBQ
  { id:34, name:"Pork BBQ", price:7, category:"BBQ" },
  { id:35, name:"Isaw", price:7, category:"BBQ" },
  { id:36, name:"Taba", price:15, category:"BBQ" },
  { id:37, name:"Isol", price:15, category:"BBQ" },
  { id:38, name:"Bulaklak", price:15, category:"BBQ" },
  { id:39, name:"Tiil", price:15, category:"BBQ" },
  { id:40, name:"Ulo", price:15, category:"BBQ" },
  { id:41, name:"Batikolon", price:15, category:"BBQ" },

  // DRINKS
  { id:42, name:"Coke", price:20, category:"Drinks" },
  { id:43, name:"Sprite", price:20, category:"Drinks" },
  { id:44, name:"Bottled Water", price:30, category:"Drinks" },
  { id:45, name:"Fruit Soda", price:20, category:"Drinks" }
];
// =======================
// RENDER MENU
// =======================

function renderMenu(items = menu){

    menuGrid.innerHTML = "";

    items.forEach(food => {

        menuGrid.innerHTML += `

        <div class="food-card">

            <h3>${food.name}</h3>

            <p>₱${food.price}</p>

            <button onclick="addToCart(${food.id})">

                Add
            </button>
            <button class="deleteBtn" onclick="deleteFood(${food.id})">
    🗑 Delete
</button>
        </div>

        `;

    });

}

// =======================
// LOAD MENU
// =======================

renderMenu();
// =======================
// ADD TO CART
// =======================

function addToCart(id){

    const food = menu.find(item => item.id === id);

    const existing = cart.find(item => item.id === id);

    if(existing){

        existing.qty++;

    }else{

        cart.push({
            ...food,
            qty:1
        });

    }

    renderCart();

}

// =======================
// RENDER CART
// =======================

function renderCart(){

    cartItems.innerHTML = "";

    if(cart.length===0){

        cartItems.innerHTML = `
        <p class="empty">
            No items yet
        </p>
        `;

        total.textContent="₱0.00";

        return;

    }

    let grandTotal=0;

    cart.forEach(item => {

    const subtotal = item.price * item.qty;
    grandTotal += subtotal;

    cartItems.innerHTML += `
    <div class="cart-item">

        <strong>${item.name}</strong><br>

        ₱${item.price} × ${item.qty} = <b>₱${subtotal}</b>

        <div class="cart-buttons">

            <button onclick="decreaseQty(${item.id})">➖</button>

            <button onclick="increaseQty(${item.id})">➕</button>

            <button onclick="removeItem(${item.id})">🗑️</button>

        </div>

    </div>

    <hr>
    `;
});

    total.textContent=`₱${grandTotal}`;

}
function increaseQty(id){

    const item = cart.find(i => i.id === id);

    if(item){
        item.qty++;
        renderCart();
    }

}

function decreaseQty(id){

    const item = cart.find(i => i.id === id);

    if(item){

        item.qty--;

        if(item.qty <= 0){
            removeItem(id);
            return;
        }

        renderCart();

    }

}

function removeItem(id){

    cart = cart.filter(i => i.id !== id);

    renderCart();

}
// =======================
// CASH & CHANGE
// =======================

cash.addEventListener("input", updateChange);

function updateChange(){

    // Kunin ang total mula sa text (hal. "₱170")
    const totalAmount = Number(
        total.textContent.replace("₱","")
    );

    const cashAmount = Number(cash.value);

    if(!cash.value){

        change.value = "";
        return;

    }

    const sukli = cashAmount - totalAmount;

    if(sukli < 0){

        change.value = "Kulang ang bayad";

    }else{

        change.value = "₱" + sukli.toFixed(2);

    }

}
function removeItem(id){

    cart = cart.filter(i => i.id !== id);

    renderCart();

}

// =======================
// PAY
// =======================

payBtn.addEventListener("click", payOrder);

function payOrder(){

    if(cart.length === 0){
        alert("Walang order.");
        return;
    }

    const totalAmount = Number(total.textContent.replace("₱",""));
    const cashAmount = Number(cash.value);

    if(cashAmount < totalAmount){
        alert("Kulang ang bayad!");
        return;
    }

    alert("Payment Successful!");
    const sale = {

    receiptNo: sales.length + 1,

    date: new Date().toISOString().split("T")[0],
time: new Date().toLocaleTimeString(),

    items: [...cart],

    total: totalAmount,

    cash: cashAmount,

    change: cashAmount - totalAmount

};

sales.push(sale);

localStorage.setItem("sales", JSON.stringify(sales));
renderSales();

const itemList = sale.items.map(item =>
`${item.name} x${item.qty}    ₱${item.price * item.qty}`
).join("\n");
receiptContent.textContent = `
Receipt #${sale.receiptNo}

${sale.date}

------------------------
${itemList}
------------------------

TOTAL : ₱${sale.total}
CASH  : ₱${sale.cash}
CHANGE: ₱${sale.change}

Maraming Salamat!
`;

receiptModal.style.display = "flex";

cart = [];
renderCart();

cash.value = "";
change.value = "";
}
// =======================
// SALES HISTORY
// =======================

function renderSales(){

    if(!salesHistory) return;

    salesHistory.innerHTML = "";

    if(sales.length === 0){

        salesHistory.innerHTML = `
            <p class="empty">No sales yet</p>
        `;

        return;
    }
const totalSalesAmount = sales.reduce((sum, sale) => sum + sale.total, 0);
const total = sales.length;
const average = total > 0 ? totalSalesAmount / total : 0;

todaySales.textContent = "₱" + totalSalesAmount.toFixed(2);
totalOrders.textContent = total;
averageSale.textContent = "₱" + average.toFixed(2);

    sales.slice().reverse().forEach(sale => {

        salesHistory.innerHTML += `
            <div class="sale-card">

                <strong>Receipt #${sale.receiptNo}</strong><br>

                Total: ₱${sale.total}<br>

                <small>${sale.date}</small>

            </div>
        `;

    });

}
renderSales();
adminBtn.addEventListener("click", () => {
    const password = prompt("Enter Admin Password:");

    if (password === "1234") {
        adminModal.style.display = "flex";
    } else if (password !== null) {
        alert("❌ Wrong Password!");
    }
});

closeAdmin.addEventListener("click", () => {
    adminModal.style.display = "none";
});
saveFood.addEventListener("click", () => {

    if (newName.value.trim() === "" || newPrice.value.trim() === "") {
        alert("Please fill in all fields.");
        return;
    }

    menu.push({
        id: menu.length + 1,
        name: newName.value,
        price: Number(newPrice.value),
        category: newCategory.value
    });
   
   localStorage.setItem("menu", JSON.stringify(menu));

    renderMenu();

    newName.value = "";
    newPrice.value = "";
    newCategory.value = "Ulam";

    alert("✅ Food Added!");

    adminModal.style.display = "none";
});

closeReceipt.addEventListener("click", () => {
    receiptModal.style.display = "none";
});
function deleteFood(id) {
    if (!confirm("Delete this food?")) return;

    menu = menu.filter(food => food.id !== id);

    localStorage.setItem("menu", JSON.stringify(menu));

    renderMenu();
    
    alert("🗑️ Food Deleted!");
}
backupBtn.addEventListener("click", () => {
    const data = {
        menu,
        sales
    };

    const blob = new Blob(
        [JSON.stringify(data, null, 2)],
        { type: "application/json" }
    );

    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "Amelias_Eatery_Backup.json";
    a.click();

    alert("💾 Backup completed!");
});
viewReportBtn.addEventListener("click", () => {

const selectedDate = reportDate.value;

if (!selectedDate) {
    alert("Pumili muna ng date!");
    return;
}

const filteredSales = sales.filter(sale => sale.date === selectedDate);

if (filteredSales.length === 0) {
    reportResult.innerHTML = "<p>Walang sales sa date na ito.</p>";
    return;
}

let totalSales = 0;
let html = "";

filteredSales.forEach(sale => {
    totalSales += sale.total;

    html += `
    <div style="border:1px solid #ccc;padding:10px;margin:10px 0;border-radius:8px;">
        <b>Receipt #${sale.receiptNo}</b><br>
        🕒 ${sale.time}<br>
        💰 ₱${sale.total}
    </div>
    `;
});

reportResult.innerHTML = `
<h4>📅 ${selectedDate}</h4>
<p><b>Total Orders:</b> ${filteredSales.length}</p>
<p><b>Total Sales:</b> ₱${totalSales}</p>
${html}
`;

});
weeklyReportBtn.addEventListener("click", () => {

    const today = new Date();
    const weekAgo = new Date();
    weekAgo.setDate(today.getDate() - 6);

    const weeklySales = sales.filter(sale => {
        const saleDate = new Date(sale.date);
        return saleDate >= weekAgo && saleDate <= today;
    });

    if (weeklySales.length === 0) {
        weeklyReportResult.innerHTML = "<p>Walang sales ngayong linggo.</p>";
        return;
    }

    let total = 0;
    let html = "";

    weeklySales.forEach(sale => {
        total += sale.total;

        html += `
        <div style="border:1px solid #ccc;padding:10px;margin:10px 0;border-radius:8px;">
            <b>Receipt #${sale.receiptNo}</b><br>
            📅 ${sale.date}<br>
            🕒 ${sale.time}<br>
            💰 ₱${sale.total}
        </div>
        `;
    });

    weeklyReportResult.innerHTML = `
        <h4>📅 Weekly Sales Report</h4>
        <p><b>Total Orders:</b> ${weeklySales.length}</p>
        <p><b>Total Sales:</b> ₱${total}</p>
        ${html}
    `;
});
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("sw.js");
  });
}