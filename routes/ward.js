const express = require('express');

const wardModel = require('../services/models/ward');
const router = express.Router();

router.get('/', async function (req, res) {
  const rows = await wardModel.findAll();
  res.json(rows);
})

module.exports = router;