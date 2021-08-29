const express = require('express');

const model= require('../services/models/subcription');
const router = express.Router();

router.get('/', async function (req, res) {
  const rows = await model.findAll();
  res.json(rows);
})

module.exports = router;