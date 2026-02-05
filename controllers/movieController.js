import connection from "../database/dbConnection.js";

function index(req, res, next) {
  const moviesQuery = `
    SELECT * 
    FROM movies
  `;

  connection.query(moviesQuery, (err, results) => {
    console.log("movieController/index/results", results);
    if (err) return next(err);

    const replayObject = {
      info: {
        length: results.length,
      },
      results,
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
