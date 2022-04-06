const fs = require("fs");
const words = fs.readFileSync("data/mots.txt").toString().split("\n").filter((word) => word.length >= 6 && word.length <= 9);
const oWords = require("./data/words");
const express = require("express");
const app = express();

app.all("/mot.txt", (req, res) => {
    res.send(words[Math.floor(Math.random() * words.length)].toUpperCase());
});

app.get("/isvalid/:word", (req, res) => {
    res.json({
        result: oWords.includes(req.params.word)
    });
});

app.listen(3000, () => console.log("API is listening on port :3000"));