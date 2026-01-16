/* ===============================
   CALENDAR BASED QUOTE APP
   =============================== */

/* ---------- QUOTES DATABASE ---------- */
const quotes = [
    { text: "Believe in yourself.", author: "Unknown" },
    { text: "Success is not final, failure is not fatal.", author: "Winston Churchill" },
    { text: "Dream big and dare to fail.", author: "Norman Vaughan" },
    { text: "Do what you can with what you have.", author: "Theodore Roosevelt" },
    { text: "Hard work beats talent when talent doesn't work hard.", author: "Tim Notke" },
    { text: "Education is the most powerful weapon to change the world.", author: "Nelson Mandela" },
    { text: "The best way to predict the future is to invent it.", author: "Alan Kay" },
    { text: "Innovation distinguishes between a leader and a follower.", author: "Steve Jobs" },
    { text: "Technology is best when it brings people together.", author: "Matt Mullenweg" }
];

/* ---------- GLOBAL VARIABLES ---------- */
let currentQuote = null;
let selectedDate = null;
let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
let dateQuotes = JSON.parse(localStorage.getItem("dateQuotes")) || {};

/* ---------- DATE HELPERS ---------- */
function getToday() {
    return new Date().toISOString().split("T")[0];
}

function showReadableDate(dateStr) {
    const date = new Date(dateStr);
    document.getElementById("todayDate").innerText =
        "Selected Date: " + date.toDateString();
}

/* ---------- LOAD QUOTE FOR DATE ---------- */
function loadQuoteForDate(date) {
    selectedDate = date;

    if (dateQuotes[date]) {
        currentQuote = dateQuotes[date];
    } else {
        const random = Math.floor(Math.random() * quotes.length);
        currentQuote = quotes[random];
        dateQuotes[date] = currentQuote;
        localStorage.setItem("dateQuotes", JSON.stringify(dateQuotes));
    }

    displayQuote();
    showReadableDate(date);
}

/* ---------- DISPLAY ---------- */
function displayQuote() {
    document.getElementById("quoteText").innerText =
        `"${currentQuote.text}"`;
    document.getElementById("quoteAuthor").innerText =
        `— ${currentQuote.author}`;
}

/* ---------- BUTTON ACTIONS ---------- */
function newQuote() {
    if (!selectedDate) return;

    const random = Math.floor(Math.random() * quotes.length);
    currentQuote = quotes[random];
    dateQuotes[selectedDate] = currentQuote;
    localStorage.setItem("dateQuotes", JSON.stringify(dateQuotes));

    displayQuote();
}

function saveFavorite() {
    if (!currentQuote) return;

    if (!favorites.some(q => q.text === currentQuote.text)) {
        favorites.push(currentQuote);
        localStorage.setItem("favorites", JSON.stringify(favorites));
        alert("Saved to favorites ❤️");
    } else {
        alert("Already saved!");
    }
}

function shareQuote() {
    const text = `${currentQuote.text} - ${currentQuote.author}`;
    navigator.clipboard.writeText(text);
    alert("Quote copied 📋");
}

/* ---------- PAGE LOAD ---------- */
document.addEventListener("DOMContentLoaded", () => {
    const picker = document.getElementById("datePicker");

    // Set default date = today
    picker.value = getToday();
    loadQuoteForDate(picker.value);

    picker.addEventListener("change", () => {
        loadQuoteForDate(picker.value);
    });

    document.getElementById("newBtn").addEventListener("click", newQuote);
    document.getElementById("saveBtn").addEventListener("click", saveFavorite);
    document.getElementById("shareBtn").addEventListener("click", shareQuote);
});
