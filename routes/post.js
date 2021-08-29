const express = require('express');

const model = require('../services/models/post');

const router = express.Router();


router.post('/add',async(req, res) => {
  const object = req.body

  const checkdata = await model.findByRoomId(object.roomID);

  if(checkdata.length == null){
    return res.status(500).json("Room was exist").end();
  }

  if(checkdata.length =! 0){
    return res.status(500).json("Room was exist").end();
  }

  const result = await model.add(object);

  object.id = result[0];

  res.status(202).json(object);
})

router.patch('/update' ,async (req, res)=>{
    const object= req.body;

    const id = object.id;
 
    const affected_rows = await model.update(id,object)
    if (affected_rows === 0) {
      return res.status(500).json("was row ecfect").end();
    }
    res.status(201).json(object);
})

module.exports = router;