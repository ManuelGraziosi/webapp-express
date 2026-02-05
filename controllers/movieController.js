import connection from "../database/dbConnection.js";
import { DateTime } from "luxon";

function index(req, res, next) {
  const moviesQuery = `
    SELECT movies.*, AVG(reviews.vote) AS "avg_vote"
FROM movies
INNER JOIN reviews
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
  return res.json({
    message: `show: ${id}`,
  });
}

export default { index, show };
