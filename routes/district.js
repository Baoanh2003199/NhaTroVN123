const express = require('express');

const districtModel = require('../services/models/district');
const router = express.Router();

router.get('/', async function (req, res) {
  const rows = await districtModel.findAll();
  res.json(rows);
})

module.exports = router;