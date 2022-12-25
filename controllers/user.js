const User = require("../models/connect").User;
const db = require("../models/connect").db;

const userController = {
    findAll: async (req, res, next) => {
        try {
            const data = await User.all();
            return res.status(200).json(data);
        } catch (err) {
            return res.status(500).json(err);
        }
    },

    handleLogin: async (req, res, next) => {
        const user = req.body;
        const rs = await User.login(user);
        if (rs?.message) {
            if (rs.message === "success!") {
                req.session.user = user.username;
            }
            return res.status(200).json(rs);
        }
    },

    handleRegister: async (req, res, next) => {
        const user = req.body;
        const isExists = await User.isExistsUser(user);
        if (isExists.length > 0) {
            return res.status(200).json({ message: "user already exists" });
        }
        const rs = await User.add(user);
        console.log(rs);
        return res.status(200).json({ ...rs, message: "Success!" });
    },

    handleLogout: async (req, res, next) => {
        delete req.session.user;
        return res.render("userlogin");
    },

    handleRenderLogin: async (req, res, next) => {
        return res.render("userlogin");
    },

    handleRenderRegister: async (req, res, next) => {
        return res.render("userregister");
    },

    getListProduct: async (listProductId) => {
        const listProduct = [];
        for(let i =0; i<listProductId.length; i++) {
            const movie = await userController.findMovieWithIdMovie(listProductId[i].idproduct);
            if (movie !== undefined) {
                listProduct.push(product);
            }
        }
        return listProduct;
    },

    // handleRenderFavorite: async (req, res, next) => {
    //     const id = await userController.findIdOfUser(req.session.user);
    //     const listMovieId = await userController.findFavoriteMoviesOfUserByUserId(id.id);

    //     if (listMovieId !== []) {
    //         const listMovie = await userController.getListMovie(listMovieId);
    //         return res.render("favorite", { movies: listMovie, user: req.session.user });
    //     }
    //     return res.render("favorite", { user: req.session.user });
    // },

    // addFavorite: async (req, res, next) => {
    //     const idMovie = req.query.q;
    //     const username = req.session.user;
    //     try {
    //         const id = await userController.findIdOfUser(username);
    //         await db.none("INSERT INTO FavoriteMovie(id, idMovie) VALUES($1, $2)", [id.id, idMovie]);
    //         return res.status(200).json({ message: "success!" });
    //     } catch (err) {
    //         console.log(err);
    //         return res.status(200).json({ message: "failed!" });
    //     }
    // },

    // removeFavorite: async (req, res, next) => {
    //     const idMovie = req.query.q;
    //     const username = req.session.user;
    //     try {
    //         const id = await userController.findIdOfUser(username);
    //         await db.none("DELETE FROM FavoriteMovie WHERE id=$1 AND idMovie=$2", [id.id, idMovie]);
    //         return res.status(200).json({ message: "success!" });
    //     } catch (err) {
    //         console.log(err);
    //         return res.status(200).json({ message: "failed!" });
    //     }
    // },

    // findIdOfUser: async (username) => {
    //     try {
    //         const rs = await db.one("SELECT id FROM Users WHERE username = $1", [username]);
    //         return rs;
    //     } catch (err) {
    //         console.log(err);
    //     }
    // },

    // findFavoriteMoviesOfUserByUserId: async (id) => {
    //     try {
    //         const rs = await db.any("SELECT idMovie FROM FavoriteMovie WHERE id = $1", [id]);
    //         return rs;
    //     } catch (err) {
    //         console.log(err);
    //     }
    // },

    findProductWithId: async (idProduct) => {
        try {
            const rs = await db.one("SELECT * FROM Movies WHERE ProductID = $1", [idProduct]);
            return rs;
        } catch (err) {
            console.log(err);
        }
    },
};

module.exports = userController;