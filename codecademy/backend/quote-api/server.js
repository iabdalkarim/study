/**
 * Add a PUT route for updating quotes in the data. This might require adding some sort of unique ID for each quote in the array in data.js.
 * Add a DELETE route for deleting quotes from the data array. As with PUT, this might require adding IDs to the data array and using req.params. For both of these ideas, you’ll be able to interact via Postman.
 * Add other data to the array, such as the year of each quote, and try to display it on the front-end.
 * Add another resource to your API in addition to quotes, such as biographical blurbs (you’ll need to find your own data for this new resource). Use Express Routers to keep your code simple and separated into different files for each router.
 */
const express = require("express");
const morgan = require("morgan");
const app = express();

const { quotes } = require("./data");
const { getRandomElement } = require("./utils");

const PORT = process.env.PORT || 4001;

app.use(express.static("public"));

const quotesRouter = express.Router();
app.use("/api/quotes", quotesRouter);

quotesRouter.get("/random", (req, res, next) => {
    const quote = getRandomElement(quotes);
    res.send({ quote });
});

quotesRouter.get("/", (req, res, next) => {
    let filteredQuotes = [];
    if (req.query.person) {
        filteredQuotes = quotes.filter((q) => q.person === req.query.person);
    } else {
        filteredQuotes = quotes;
    }
    res.send({ quotes: filteredQuotes });
});

quotesRouter.post("/", (req, res, next) => {
    const { quote, person } = req.query;
    if (!quote) {
        res.status(400).send("Missing quote value");
    } else if (!person) {
        res.status(400).send("Missing person value");
    } else {
        const id = quotes.length;
        const newQuote = { id, quote, person };
        quotes.push(newQuote);
        res.status(201).send({ quote: newQuote });
    }
});

quotesRouter.put("/", (req, res, next) => {
    const { quote, person } = req.query;
    if (!quote) {
        res.status(400).send("Missing quote value");
    } else if (!person) {
        res.status(400).send("Missing person value");
    } else {
        const id = quotes.length;
        const newQuote = { id, quote, person };
        quotes.push(newQuote);
        res.status(201).send(newQuote);
    }
});

app.listen(PORT, () => {
    console.log("Listening on port " + PORT);
});
