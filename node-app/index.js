const express = require("express");

const PORT = 4000;
const app = express();

app.get("/", (req, res) => res.send("<h1>Hello Chess!</h1>"));

app.listen(PORT, () => console.log(`Hi Hi! from ${PORT}`));
