function handleErrors(err, req, res, next) {
  res.status(500);

  return res.json({
    error:
      process.env.ENVIRONMENT === "development"
        ? err.toString()
        : "ERRORE INTERNO",
    message: "Qualcosa è andato storto",
  });
}

export default handleErrors;
