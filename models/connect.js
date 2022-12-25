const initOptions = {};
const pgp = require("pg-promise")(initOptions);
const bcrypt = require("bcrypt");
const connect = require('../configs/cnStr');

const db = pgp(connect);

const Bcrypt_Salt = 12;

const User = {
    all: async () => {
        try {
            const rs = await db.any("SELECT * FROM Users");
            return rs;
        } catch (err) {
            console.log(err);
        }
    },

    add: async (user) => {
        try {
            // hash pw
            const salt = await bcrypt.genSalt(Bcrypt_Salt);
            const hashed = await bcrypt.hash(user.password, salt);

            const maxID = await pgUser.findMaxID();
            const rs = await db.one(
                "INSERT INTO Users(UserID, Username, Password, FullName, Token, Address) VALUES($1, $2, $3, $4, $5, $6) RETURNING *",
                [maxID + 1, user.username, hashed, user.name, user.email, user.address]
            );
            return rs;
        } catch (err) {
            console.log(err);
        }
    },

    
    login: async (user) => {
        try {
            const userDb = await db.one("SELECT * FROM Users WHERE Users.Username = $1", [user.username]);
            if (userDb) {
                const isValid = await bcrypt.compare(user.password, userDb.Password);
                if (isValid) {
                    return { message: "success!" };
                }
                return { message: "login error!" };
            }
        } catch (err) {
            console.log(err);
        }
    },

    findMaxID: async () => {
        try {
            const max = await db.one("SELECT MAX(UserID) FROM Users");
            return max.max;
        } catch (err) {
            console.log(err);
        }
    },

    isExistsUser: async (user) => {
        try {
            const rs = await db.any("SELECT * FROM Users WHERE Users.Username = $1 OR Users.Token = $2", [
                user.username,
                user.email,
            ]);
            return rs;
        } catch (err) {
            console.log("isexits, ", err);
        }
    },
};

module.exports = { User, db };