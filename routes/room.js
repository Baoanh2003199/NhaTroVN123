const express = require('express');

const roomModel = require('../services/models/room');
const hostModel = require('../services/models/host')
const imageModel = require('../services/models/images')

const router = express.Router();
const upload = require('../middlewares/upload')
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

const formatJson = room_found => {
  return {
    id: room_found.room_id,
    status: room_found.status,
    address: room_found.address,
    image:{
      id: room_found.image_id,
      name: room_found.image_name,
    },
    host: {
      name:room_found.name,
      email: room_found.email,
      phone: room_found.phone
    },
    price: room_found.price,
    area: room_found.area,
    create_at: room_found.created_at,
    addition_infor: room_found.addition_infor,
    city: room_found.city,
    district: room_found.district,
    ward: room_found.ward,
    isdelete: room_found.isdelete,
    post:{
      id: room_found.post_id,
      title: room_found.post_title,
      description: room_found.post_des,
      status:{
        id: room_found.status_id,
        name: room_found.status_name
      },
      service:{
        id: room_found.service_id,
        name: room_found.service_name
      }
    }
  }
}

// get all room
router.get('/', async function (req, res) {
  const room_found = []
  const room = await roomModel.findAll();
  room.map(r => {
    room_found.push(formatJson(r))
  });
  return res.json(room_found).status(202);
})
// get room by host id
router.get('/searchByhost/:id', async function(req, res){
  const id = req.params.id;
  const room = await roomModel.findByHostID(id);

  if (room === null  || room.length == 0) {
    return res.json({
      message: 'not found'
    }).status(204).end();
  }

  const room_found = []
  room.map(r => {
    room_found.push(formatJson(r))
  });

  return res.json(room_found).status(202);
});
// search
router.get('/search', async function(req, res) {
    const id = +req.query.id || null
    const status = +req.query.status || null
    const ward = +req.query.ward || null
    const district = +req.query.district || null
    const province = +req.query.province || null
    const hostID = +req.query.hostID || null
    const room_found = []
    
    if(id != null) {
      const room = await roomModel.findById(id);
      if (room === null  || room.length == 0) {
        return res.json({
          message: 'not found'
        }).status(204).end();
      }
      room_found.push(room[0])
      return res.json(formatJson(room_found[0]));
    }

    if(hostID != null ){
      const room = await roomModel.findByHostID(hostID);
      if (room === null  || room.length == 0) {
        return res.json({
          message: 'not found'
        }).status(204).end();
      }
      room_found.push(room[0])
      return res.json(formatJson(room_found[0]));
    } 

    if(status != null) {
      const room = await roomModel.findRoomByStatus(status);
      if (room === null || room.length == 0) {
        return res.json({
          message: 'not found'
        }).status(204).end();
      }

      room.map(r => {
        room_found.push(formatJson(r))
      })
      return res.json(room_found)
    } 
    if(ward != null){
      const room = await roomModel.findRoomByWard(parseInt(ward));
      if (room === null || room.length == 0) {
        return res.json({
          message: 'not found'
        }).status(204).end();
      }
      room.map(r => {
        room_found.push(formatJson(r))
      })
      return res.json(room_found)
    }

    if(district != null){
      const room = await roomModel.findRoomByDistrict(parseInt(district));
      if (room === null || room.length == 0) {
        return res.json({
          message: 'not found'
        }).status(204).end();
      }
      room.map(r => {
        room_found.push(formatJson(r))
      })
      return res.json(room_found)
    }
    
    if(province != null){
      const room = await roomModel.findRoomByProvince(parseInt(province));
      if (room === null || room.length == 0) {
        return res.json({
          message: 'not found'
        }).status(204).end();
      }
      room.map(r => {
        room_found.push(formatJson(r))
      })
      return res.json(room_found)
    }

    if(room_found == null || room_found.length == 0){
      const room = await roomModel.findAll();
      room.map(r => {
        room_found.push(formatJson(r))
      })
      return res.json(room_found)
    }

    return res.json({
      message: 'not found'
    }).status(204).end();
})
// filter
router.get('/filter', async (req, res) =>{
  const price = +req.query.price || null
  const area = +req.query.area || null
  const lt = +req.query.lt || 0
  const gt = +req.query.gt || Number.MAX_SAFE_INTEGER
  const room_found = []
  if(price != null) {
    const room = await roomModel.filterRoomByPrice(lt, gt);
    if (room === null || room.length == 0) {
      return res.json({
        message: 'no filter condition'
      }).status(204).end();
    }
    room.map(r => {
      room_found.push(formatJson(r))
    })
    return res.json(room_found)
  }

  if(area != null){
    const room = await roomModel.filterRoomByArea(lt, gt);
    if (room === null || room.length == 0) {
      return res.json({
        message: 'not found'
      }).status(204).end();
    }
    room.map(r => {
      room_found.push(formatJson(r))
    })
    return res.json(room_found)
  }

  return res.json({
    message: 'no filter condition'
  }).status(204).end();
})
// thêm room
router.post('/add',async(req, res) => {
    const room = req.body;
    
    const checkhostid = await hostModel.findByIdHost(room.hostID);

    if(checkhostid.length == 0 || checkhostid == null){
      return res.json({
        message: 'not found'
      }).status(500).end();
    }

    const result = await roomModel.add(room);
    room.id = result[0];

    console.log(result);

    res.status(202).json(room);
});
// delete room
router.delete('/delete/:id', async (req, res)=> {
  const id = req.params.id;

  const affected_rows = await roomModel.del(id);

  if (affected_rows === 0) {
    return res.status(500);
  }
  res.status(202);
});
// update room
router.patch('/update',async (req, res)=>{
    const room = req.body;
    const id = room.id;
    console.log(room);
    var update_room = await roomModel.updater(id,room);

    if(update_room === 0){
      return res.status(500);
    }

    return res.status(202).json('Update room successfully');
});


router.post('/uploadImage', upload.any(), async (req, res) =>{
  const id = req.body.roomID;
  let path_name = "room_" + id + "_" + uuidv4().toString() + ".jpg"
    let dest = req.files[0].destination;
          await fs.renameSync(dest + "/" + req.files[0].filename,
              dest + "/room/" + path_name);

    console.log(dest)
    const image = {
      name: path_name,
      roomID: id
    }
    await imageModel.add(image)
  
    return res.status(202).json('Upload image successfully');
});

module.exports = router;