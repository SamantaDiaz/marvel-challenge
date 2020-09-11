var express = require("express");
var marvelService = require("./../services/marvel");

var router = express.Router();

// API Route to search characters
router.get("/search", async function (req, res) {
  let query = "";
  let page = "";

  // Validate query param
  if (req.query.query) {
    query = req.query.query;
  }

  // Validate page param
  if (req.query.page) {
    page = parseInt(req.query.page, 10);
  }

  // consume marvel service
  const service = new marvelService();

  try {
    const result = await service.searchCharacters(query, page);
    res.status(200).json(result.data);
  } catch (error) {
    res
      .status(error.response.status)
      .json({ message: error.response.statusText });
  }
});

// API route te get character info
router.get("/character/:id([0-9]+)", async function (req, res) {
  // consume marvel service
  const service = new marvelService();

  try {
    const result = await service.getCharacter(req.params.id);
    res.status(200).json(result.data);
  } catch (error) {
    res
      .status(error.response.status)
      .json({ message: error.response.statusText });
  }
});

module.exports = router;
