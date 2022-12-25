const express = require("express");

require('dotenv').config()
console.log('check env ', process.env) // remove this after you've confirmed it is working

const app = express();

app.use("/", async (req, res, next) => {
    return res.send('hello 2');
});
const PORT = process.env.PORTAUTH || 3113
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}/`);
});