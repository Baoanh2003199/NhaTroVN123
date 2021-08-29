const express = require('express')

const router = express.Router();
const userModel = require('../services/models/user.js')
const subModel = require('../services/models/subcription')
const hostModel = require('../services/models/host')

router.get('/saved_room/:userId', async function(req, res) {
    const userId = req.params.userId || 0;

    const saved_rooms = await userModel.findSavedRoomsById(userId);

    return res.json(saved_rooms).status(202).end();
})

router.post('/subscribe', async (req, res) => {
    const host_sub = req.body;
    //get host
    let host = await hostModel.findByUserId(host_sub.userID)
    
    
    let dateNow = new Date()

    // trong trường hợp trùng gói 
    // có lẽ không cần => trong trường hợp thằng host gia hạn nhưng nó lại bấm nhầm cái gói cũ
    if(host != null && host.id_subscription == host_sub.id_subscription ){
            return res.json({
                message: "same subscription"
            }).status(200).end()
    }

    // get user
    const user = await userModel.findById(host_sub.userID)
    // find host_sub
    const sub = await subModel.findById(host_sub.id_subscription)
    // trừ tiền
    let price = parseFloat(user.balance - sub.price)
    if(price < 0){
        return res.json({
            message: "balance not enough"
        }).status(200).end();
    }

    await userModel.updatePrice(host_sub.userID, price)

    //da duoc dang ki hay chua
    
    if(host != null){
        let expired_date_host = new Date(host.expired_subcription)
        expired_date_host.setMonth(expired_date_host.getMonth() + sub.expired_date)
        await hostModel.updateSubscription(host.id, host_sub.id_subscription, expired_date_host)
        return res.json({
            message: "update subscription"
        }).status(200).end(); 
        
    } else{
        dateNow.setMonth(dateNow.getMonth() + sub.expired_date)
        host_sub.expired_subcription = dateNow
        // them host
        await hostModel.add(host_sub)    
        return res.json({
            message: "add host"
        }).status(200).end();
    }
})

router.get('/information/:userId', async (req, res)=> {
    const id = req.params.userId || 0;
    if (id === 0) {
        return res.status(400).end();
    }
    const result = await userModel.findById(id);
    if (result === 0) {
        return res.status(400).end();
    }
    else{
        return res.json(result).status(200).end();
    }
  });
  
  router.get('/information/all', async (req, res)=> {
    const result = await userModel.findAll();
    if (result === 0) {
        return res.status(400).end();
    }
    else{
        return res.json(result).status(200).end();
    }
  });

  router.get('/information', async (req, res)=> {
    const result = await userModel.findAll();
    if (result === 0) {
        return res.status(400).end();
    }
    else{
        return res.json(result).status(200).end();
    }
  });

  router.patch('/update', async (req, res)=> {
    const body = req.body;
    const user = {
        name: body.name,
        email: body.email,
        phone: body.phone,
        cardId: body.cardId
    }
    const id = body.id;
    const result = await userModel.patch(id,user);
    if(result === 0)
    {
        return res.status(404).end();
    }
    return res.json(result).status(200).end();
  });

  router.delete('/del/:id', async function(req,res){
    const id = +req.params.id || 0;
    const result = await userModel.del(id);
    if(result === 0)
    {
        return res.status(404).end();
    }
    else{
        return res.json({
            message: 'User deleted.'
        }).status(201).end();
    }
})

module.exports = router;