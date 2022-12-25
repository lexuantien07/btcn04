const express = require("express");
const handlebars = require("express-handlebars");
const session = require("express-session");
const path = require("path");

const userRoute = require("./routes/user");
const productRoute = require("./routes/product");
const { db } = require("./models/connect");

require('dotenv').config()
// console.log('check env ', process.env) // remove this after you've confirmed it is working

const app = express();

app.set("trust proxy", 1); // trust first proxy
app.use(
    session({
        secret: "lxt",
        resave: false,
        saveUninitialized: true,
        cookie: { secure: false },
    })
);

app.engine(
    "hbs",
 handlebars.engine({
        extname: "hbs",
        defaultLayout: "main.hbs",
        partialsDir: [path.join(__dirname, "views/partials")],
        helpers: {
            pageActive: (page, active) => {
                return parseInt(page) === parseInt(active);
            },
        },
    })
);

app.set("view engine", "hbs");

app.use("/public/css", express.static("public/css"));
app.use("/public/js", express.static("public/js"));

app.use(express.json({ limit: "10MB" }));
app.use(express.urlencoded({ extended: true }));

//
app.use("/user", userRoute);

app.use("/product", productRoute);

app.use("/", async (req, res, next) => {
    if (!req.session.user) {
        return res.render("login");
    }
    try {
        return res.send('hello');
    } catch (err) {
        console.log(err);
        return res.send('hello');
    }
});

app.use((err, req, res, next) => {
    const statusCode = err.statusCode | 500;
    res.status(statusCode).send(err.message);
});

const PORT = process.env.PORT || 20593
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}/`);
});
