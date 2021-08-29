const express = require('express');
const router = express.Router();
const payment_model = require('../services/models/payment');
const TokenGenerator = require('uuid-token-generator');
const subscription_model = require('../services/models/subcription')
const paid_model = require('../services/models/paid_bill');
const paid_bill = require('../services/models/paid_bill');

router.get('/view/all', async function(req, res) {
    const result = await payment_model.findAll();
    if (result === 0) {
        return res.status(400).end();
    }
    else{
        return res.json(result).status(200).end();
    }
});

router.get('/view/:id', async function(req, res) {
    const id = req.params.id || 0;
    if (id === 0) {
        return res.status(400).end();
    }
    const result = await payment_model.findById(id);
    if (result === 0) {
        return res.status(400).end();
    }
    else{
        return res.json(result).status(200).end();
    }
  });

  function randomString() {
    var result = '';
    var length = 12;
    var chars = '0123456789';
    for (var i = length; i > 0; --i) result += chars[Math.round(Math.random() * (chars.length - 1))];
    return result;
}

router.post('/submit', async function(req, res) {
    const body = req.body;
    const code_gen = new TokenGenerator(128,TokenGenerator.BASE36); // generate ra token kích hoạt
    const unique_key = code_gen.generate();
    const addPayment ={
        hostID: body.hostID,
        subscription_id: body.sub_id,
        unique_key: unique_key
    }
    const result = await payment_model.findByHostID(body.hostID);
    const sub_res = await subscription_model.findById(body.sub_id);
    if(sub_res === 0)
    {
        return res.status(404).end();
    }
    else{
        if (result == null) {
            const payment = await payment_model.add(addPayment);
            return res.json({uuid: unique_key}).status(200).end();
        }
        else{
            return res.status(404).end();
        }
    }

});

router.post('/confirm', async function(req, res) {
    const body = req.body;
    const result = await payment_model.findByUniqueKey(body.uuid);
    const sub_res = await subscription_model.findById(result.subscription_id);

    if(sub_res === 0)
    {
        return res.status(404).end();
    }
    else{
        if (result == null) {
            return res.status(404).end();

        }
        else{
            const bill = {
                charged_amount: sub_res.price,
                hostID: result.hostID,
                unique_key: result.unique_key,
                paid_date: new Date(Date.now())
            }
            const deletedPayment = await payment_model.del(result.Id);
            const paid_bill = await paid_model.add(bill);
            return res.json(paid_bill).status(200).end();
        }
    }

});

router.delete('/del/:id', async function(req,res){
    const id = +req.params.id || 0;
    const result = await payment_model.del(id);
    if(result === 0)
    {
        return res.status(404).end();
    }
    else{
        return res.json({
            message: 'Payment form deleted'
        }).status(201).end();
    }
})


module.exports = router;