function index(req, res) {
  return res.json("index");
}

function show(req, res) {
  const id = req.params.id;
  return res.json(`show: ${id}`);
}

export default { index, show };
