import connection from "../database/dbConnection.js";
import { DateTime } from "luxon";

function index(req, res, next) {
  const moviesQuery = `
    SELECT movies.*, CAST(AVG(reviews.vote) AS FLOAT) AS "avg_vote"
    FROM movies
    LEFT JOIN reviews
    ON movies.id = reviews.movie_id
    GROUP BY movies.id
  `;

  connection.query(moviesQuery, (err, moviesQueryResults) => {
    if (err) return next(err);

    const movies = moviesQueryResults.map((movie) => {
      // console.log("movie.created_at", movie.created_at);
      // console.log("typeof(movie.created_at)", typeof movie.created_at);
      return {
        ...movie,
        image: `${process.env.SRV_PATH}/img/${movie.image}`,
        created_at: DateTime.fromJSDate(movie.created_at).toISODate(),
        updated_at: DateTime.fromJSDate(movie.updated_at).toISODate(),
      };
    });

    const replayObject = {
      info: {
        length: movies.length,
      },
      movies,
    };
    return res.json(replayObject);
  });
}

function show(req, res, next) {
  const id = req.params.id;

  const movieQuery = `
    SELECT movies.*, CAST(AVG(reviews.vote) AS FLOAT) AS "avg_vote"
    FROM movies
    LEFT JOIN reviews
    ON movies.id = reviews.movie_id
    WHERE movies.id = ?
    GROUP BY movies.id
  `;

  connection.query(movieQuery, [id], (err, movieQueryresults) => {
    if (err) return next(err);

    if (movieQueryresults.length === 0) {
      res.status(404);
      return res.json({
        error: "NOT FOUND",
        messate: "Film non trovato",
      });
    }

    const movie = movieQueryresults[0];

    const reviewsQuery = `
      SELECT *
      FROM reviews
      WHERE movie_id = ?
    `;

    connection.query(reviewsQuery, [id], (err, reviewsQueryResults) => {
      if (err) return next(err);

      const reviewsFormatted = reviewsQueryResults.map((curReview) => {
        return {
          ...curReview,
          created_at: DateTime.fromJSDate(curReview.created_at).toISODate(),
          updated_at: DateTime.fromJSDate(curReview.updated_at).toISODate(),
        };
      });

      const movieWithReviews = {
        ...movie,
        image: `${process.env.SRV_PATH}/img/${movie.image}`,
        created_at: DateTime.fromJSDate(movie.created_at).toISODate(),
        updated_at: DateTime.fromJSDate(movie.updated_at).toISODate(),
        reviews: reviewsFormatted,
      };

      return res.json({
        movieWithReviews,
      });
    });
  });
}

export default { index, show };
