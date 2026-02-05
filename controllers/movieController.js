import connection from "../database/dbConnection.js";
import { DateTime } from "luxon";

function index(req, res, next) {
  const moviesQuery = `
    SELECT movies.*, CAST(AVG(reviews.vote) AS FLOAT) AS "avg_vote"
    FROM movies
    LEFT JOIN reviews
    WHERE movies.id = reviews.movie_id
    GROUP BY movies.id
  `;

  connection.query(moviesQuery, (err, results) => {
    if (err) return next(err);

    const movies = results.map((movie) => {
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

function show(req, res) {
  const id = req.params.id;

  const movieQuery = `
    SELECT *
    FROM movies
    WHERE id = ?
  `;

  const rewiesQuery = `
    SELECT *
    FROM reviews
    WHERE movie_id = ?
  `;
  connection.query(movieQuery, [id], (err, results) => {
    if (err) return next(err);

    if (results.length === 0) {
      res.status(404);
      return res.json({
        error: "NOT FOUND",
        messate: "Film non trovato",
      });
    }

    const movie = results[0];

    return res.json({
      movie,
    });
  });
}

export default { index, show };
