function handleNotFound(req, res, next) {
  res.status(404);

  return res.json({
    error: "NOT FOUND",
    message: "Rotta Non Trovata",
  });
}

export default handleNotFound;
