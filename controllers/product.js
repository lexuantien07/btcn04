const db = require("../models/connect").db;

// const movies = require("../db/movies.json");
// const casts = require("../db/casts.json");

const nItem = 6;

const movieController = {
    // handleViewDetails: async (req, res, next) => {
    //     const idMovie = req.query.q;
    //     const page = req.query?.page || 1;
    //     const curHref = `http://localhost:20612/movie/viewdetails?q=${idMovie}`;
    //     const rs = await movieController.findMoviesWithID(idMovie);
    //     if (rs !== undefined) {
    //         rs.genres = rs.genres.split(",").join(", ");

    //         const castsOfMovie = await movieController.findCastsAndCharactersWithIdMovie(idMovie);

    //         const reviewsOfMovie = await movieController.findReviewOfMovie(idMovie);

    //         const reviewsPerPage = [];
    //         const nPagi = Math.ceil(reviewsOfMovie.length / nItem);
    //         const nPagination = [];
    //         for (let i = 0; i < nPagi; i++) {
    //             nPagination.push({ index: i + 1, href: `${curHref + "&page=" + parseInt(i + 1)}`, active: page });
    //             reviewsPerPage.push(reviewsOfMovie.splice(0, nItem));
    //         }

    //         res.render("detailsMovie", {
    //             movie: rs,
    //             reviews: reviewsPerPage[page - 1],
    //             casts: castsOfMovie,
    //             nPagination,
    //         });
    //     } else {
    //         res.status(200).json("server has error :((");
    //     }
    // },

    // handleSearch: async (req, res, next) => {
    //     const subTitle = req.query.q;
    //     const isAction = req.query.a;
    //     const page = req.query?.page || 1;

    //     const curHref = `http://localhost:20612/movie/search?q=${subTitle}${isAction ? "&a=true" : ""}`;

    //     if (!isAction) {
    //         const rs = await movieController.findMoviesWithTitle(subTitle);
    //         const moviesPerPage = [];

    //         const nPagi = Math.ceil(rs.length / nItem);
    //         const nPagination = [];
    //         for (let i = 0; i < nPagi; i++) {
    //             nPagination.push({ index: i + 1, href: `${curHref + "&page=" + parseInt(i + 1)}`, active: page });
    //             moviesPerPage.push(rs.splice(0, nItem));
    //         }
    //         res.render("searchMovie", { movies: moviesPerPage[page - 1], subTitle: subTitle, nPagination });
    //     } else {
    //         let rs = await movieController.findCastWithName(subTitle.substring(1));
    //         const castsPerPage = [];

    //         const nPagi = Math.ceil(rs.length / nItem);
    //         const nPagination = [];
    //         for (let i = 0; i < nPagi; i++) {
    //             nPagination.push({ index: i + 1, href: `${curHref + "&page=" + parseInt(i + 1)}`, active: page });
    //             castsPerPage.push(rs.splice(0, nItem));
    //         }

    //         res.render("searchCast", { casts: castsPerPage[page - 1], subTitle: subTitle.substring(1), nPagination });
    //     }
    // },

    // findReviewOfMovie: async (idMovie) => {
    //     try {
    //         const rs = await db.any("SELECT * FROM Reviews WHERE Reviews.idMovie = $1", [idMovie]);
    //         return rs;
    //     } catch (err) {
    //         console.log(err);
    //     }
    // },

    // findMoviesWithTitle: async (title) => {
    //     try {
    //         const rs = await db.any(`SELECT * FROM Movies WHERE Movies.title ILIKE '%${title}%'`);
    //         return rs;
    //     } catch (err) {
    //         console.log(err);
    //     }
    // },

    findProductWithID: async (id) => {
        try {
            const rs = await db.one(`SELECT * FROM Products WHERE Products.ProductID = $1`, [id]);
            return rs;
        } catch (err) {
            console.log(err);
        }
    },

    // findCastWithName: async (name) => {
    //     try {
    //         const rs = await db.any(`SELECT * FROM Casts WHERE Casts.realName ILIKE '%${name}%'`);
    //         return rs;
    //     } catch (err) {
    //         console.log(err);
    //     }
    // },

    // findCastsAndCharactersWithIdMovie: async (idMovie) => {
    //     try {
    //         const rs = await db.any(
    //             `SELECT distinct(Casts.realName) FROM Characters, Movies, Casts WHERE Characters.idMovie = Movies.idMovie AND Characters.idCast = Casts.idCast AND Movies.idMovie = $1`,
    //             [idMovie]
    //         );
    //         return rs;
    //     } catch (err) {
    //         console.log(err);
    //     }
    // },

    // handleImportJSON: async (req, res, next) => {
    //     console.log(req.body);
    // },

    // handleImport: async (req, res, next) => {
    //     casts.forEach(async (cast) => {
    //         try {
    //             const rs = await movieController.findCast(cast.id);
    //             if (!rs) {
    //                 await db.none(
    //                     "INSERT INTO Casts(idCast, img, legacyNameText, name, birthDate, birthPlace, gender, heightCentimeters, nicknames, realName) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)",
    //                     [
    //                         cast.id,
    //                         cast?.image || "",
    //                         cast?.legacyNameText || "",
    //                         cast?.name || "",
    //                         cast?.birthDate || "",
    //                         cast?.birthPlace || "",
    //                         cast?.gender || "",
    //                         cast?.heightCentimeters || -1,
    //                         cast?.nicknames.join(",") || "",
    //                         cast?.realName || "",
    //                     ]
    //                 );
    //             }
    //         } catch (err) {
    //             console.log(err);
    //         }
    //     });

    //     movies.forEach(async (movie) => {
    //         try {
    //             const rs = await movieController.findMovie(movie.id);
    //             if (!rs) {
    //                 await db.none(
    //                     "INSERT INTO Movies(idMovie, img, title, year, topRank, rating, ratingCount, genres, synopsesHasProfanity, synopsesLanguage, synopsesText) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)",
    //                     [
    //                         movie.id,
    //                         movie?.img || "",
    //                         movie?.title || "",
    //                         movie?.year || -1,
    //                         movie?.topRank || -1,
    //                         movie?.rating || -1,
    //                         movie?.ratingCount || -1,
    //                         movie?.genres.join(",") || "",
    //                         movie?.synopses?.hasProfanity || false,
    //                         movie?.synopses?.language || "",
    //                         movie?.synopses?.text || "",
    //                     ]
    //                 );

    //                 //insert reviews
    //                 movie.reviews.forEach(async (review) => {
    //                     try {
    //                         await db.none(
    //                             "INSERT INTO Reviews(idMovie, author, authorRating, helpfulnessScore, interestingVotesDown, interestingVotesUp, languageCode, reviewText, reviewTitle, submissionDate) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)",
    //                             [
    //                                 movie.id,
    //                                 review?.author || "",
    //                                 review?.authorRating || -1,
    //                                 review?.helpfulnessScore || -1,
    //                                 review?.interestingVotes?.down || -1,
    //                                 review?.interestingVotes?.up || -1,
    //                                 review?.languageCode || "",
    //                                 review?.reviewText || "",
    //                                 review?.reviewTitle || "",
    //                                 review?.submissionDate || "",
    //                             ]
    //                         );
    //                     } catch (err) {
    //                         console.log(err);
    //                     }
    //                 });

    //                 // insert characters
    //                 movie?.casts.forEach(async (cast) => {
    //                     cast?.characters?.forEach(async (character) => {
    //                         try {
    //                             await db.none("INSERT INTO Characters(idMovie, idCast, name) VALUES ($1, $2, $3)", [
    //                                 movie.id,
    //                                 cast.id,
    //                                 character || "",
    //                             ]);
    //                         } catch (err) {
    //                             console.log(err);
    //                         }
    //                     });
    //                 });
    //             }
    //         } catch (err) {
    //             console.log(err);
    //         }
    //     });
    //     return res.send(movies[1]);
    // },

    findProduct: async (id) => {
        try {
            const rs = await db.one("SELECT * FROM Products WHERE Products.ProductID = $1", [id]);
            return rs;
        } catch (err) {
            return undefined;
        }
    },

    // findCast: async (id) => {
    //     try {
    //         const rs = await db.one("SELECT * FROM Casts WHERE Casts.idCast = $1", [id]);
    //         return rs;
    //     } catch (err) {
    //         return undefined;
    //     }
    // },
};

module.exports = movieController;