const express = require("express");

const PORT = process.env.PORT || 4000;
const app = express();

app.get("/", (req, res) => res.send("<h1>Hi Naruto and Asta!</h1>"));

app.listen(PORT, () => console.log(`Hi Hi! from ${PORT}`));
