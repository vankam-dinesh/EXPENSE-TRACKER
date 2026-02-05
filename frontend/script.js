const API = "http://localhost:5000";

// Add new expense
async function addExpense() {
  const expense = {
    title: title.value,
    amount: amount.value,
    category: category.value,
    date: date.value
  };

  // Simple validation
  if (!expense.title || !expense.amount || !expense.date) {
    alert("Please fill all fields");
    return;
  }

  await fetch(API + "/add-expense", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(expense)
  });

  // Clear inputs
  title.value = "";
  amount.value = "";
  date.value = "";

  loadExpenses();
}

// Load all expenses
async function loadExpenses() {
  const res = await fetch(API + "/expenses");
  const data = await res.json();

  let rows = "";
  let totalSpent = 0;

  data.forEach(exp => {
    rows += `
      <tr>
        <td>${exp.title}</td>
        <td>₹${exp.amount}</td>
        <td>${exp.category}</td>
        <td>${exp.date}</td>
        <td>
          <button class="delete-btn" onclick="deleteExpense('${exp._id}')">
            Delete
          </button>
        </td>
      </tr>
    `;

    totalSpent += Number(exp.amount);
  });

  list.innerHTML = rows;

  // Update total spent
  document.getElementById("total").innerText = totalSpent;

  // Calculate remaining balance
  const accountBalance =
    Number(document.getElementById("accountBalance").value) || 0;

  const remainingBalance = accountBalance - totalSpent;
  document.getElementById("remaining").innerText = remainingBalance;
}

// Delete expense
async function deleteExpense(id) {
  await fetch(API + "/delete-expense/" + id, {
    method: "DELETE"
  });

  loadExpenses();
}

// DOM Elements
const title = document.getElementById("title");
const amount = document.getElementById("amount");
const category = document.getElementById("category");
const date = document.getElementById("date");
const list = document.getElementById("list");
const accountBalanceInput = document.getElementById("accountBalance");

// Recalculate remaining balance when balance changes
accountBalanceInput.addEventListener("input", () => {
  loadExpenses();
});

// Initial load
loadExpenses();
