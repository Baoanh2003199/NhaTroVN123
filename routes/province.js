const express = require('express');

const provinceModel = require('../services/models/province');
const router = express.Router();

router.get('/', async function (req, res) {
  const rows = await provinceModel.findAll();
  res.json(rows);
})

module.exports = router;