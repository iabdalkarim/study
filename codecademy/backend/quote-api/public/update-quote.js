const submitButton = document.getElementById("update-quote");
const newQuoteContainer = document.getElementById("updated-quote");

submitButton.addEventListener("click", () => {
    const quote = document.getElementById("quote").value;
    const person = document.getElementById("person").value;
    const id = document.getElementById("id").value;

    fetch(`/api/quotes/${id}?quote=${quote}&person=${person}`, {
        method: "PUT",
    })
        .then((response) => response.json())
        .then(({ quote }) => {
            const newQuote = document.createElement("div");
            newQuote.innerHTML = `
    <h3>Congrats, your quote was added!</h3>
    <div class="quote-text">${quote.quote}</div>
    <div class="attribution">- ${quote.person}</div>
    <p>Go to the <a href="index.html">home page</a> to request and view all quotes.</p>
    `;
            newQuoteContainer.appendChild(newQuote);
        });
});
