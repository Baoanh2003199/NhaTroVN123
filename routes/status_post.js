const express = require('express');

const model= require('../services/models/status_post');
const router = express.Router();

router.get('/', async function (req, res) {
  const rows = await model.findAll();
  res.json(rows);
})
router.post('/add',async(req, res) => {
  const object = req.body
  const result = await model.add(object);
  object.id = result[0];
  res.status(201).json(object);
})
router.delete('/delete', async (req, res)=> {
  const id = +req.query.id || 0
  if (id === 0) {
    return res.json({
      message: 'no status post deleted'
    });
  }
  const affected_rows = await model.del(id);
  if (affected_rows === 0) {
    return res.json({
      message: 'no status post deleted'
    });
  }
  res.json({
    message: 'status post deleted'
  });
})
router.patch('/update',async (req, res)=>{
    const object= req.body;

    const id = object.id;
    delete object.id;
    
    const affected_rows = await model.updater(id,object)
    if (affected_rows === 0) {
      return res.status(304).end();
    }
    res.status(201).json(object);
})
module.exports = router;