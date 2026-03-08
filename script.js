let transactions = JSON.parse(localStorage.getItem("transactions")) || [];

function addTransaction() {
    let date = document.getElementById("date").value;
    let desc = document.getElementById("desc").value;
    let category = document.getElementById("category").value;
    let amount = document.getElementById("amount").value;
    let type = document.getElementById("type").value;
    let error = document.getElementById("error");

    if (!date || !desc || !category || !amount || !type) {
        error.textContent = "Please fill all fields!";
        return;
    }

    error.textContent = "";

    let transaction = {
        id: Date.now(),
        date,
        desc,
        category,
        amount: Number(amount),
        type
    };

    transactions.push(transaction);
    localStorage.setItem("transactions", JSON.stringify(transactions));

    displayTransactions();
}

function displayTransactions() {
    let list = document.getElementById("list");
    list.innerHTML = "";

    let income = 0;
    let expense = 0;

    transactions.forEach(t => {
        let li = document.createElement("li");
        li.classList.add(t.type);

        li.innerHTML = `
            ${t.date} | ${t.desc} | ${t.category} | ₹${t.amount}
            <button onclick="deleteTransaction(${t.id})">X</button>
        `;

        list.appendChild(li);

        if (t.type === "income") {
            income += t.amount;
        } else {
            expense += t.amount;
        }
    });

    document.getElementById("income").textContent = income;
    document.getElementById("expense").textContent = expense;
    document.getElementById("balance").textContent = income - expense;
}

function deleteTransaction(id) {
    transactions = transactions.filter(t => t.id !== id);
    localStorage.setItem("transactions", JSON.stringify(transactions));
    displayTransactions();
}

displayTransactions();