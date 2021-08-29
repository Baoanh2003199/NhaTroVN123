const express = require('express');
const router = express.Router();
const user_model = require('../services/models/user');
const activate_Model = require('../services/models/register_activation');


router.post('/activate-account', async (req, res)=> {
    const activate_code = req.body.code;
    if(activate_code == -1)
    {
        return res.status(400).end();
    }
    if (activate_code === 0) {
        return res.status(400).end();
    }
    const result = await activate_Model.findByCode(activate_code);
    if (result === 0) {
        return res.status(400).end();
    }
    else{
        if(result.date_expired > new Date(Date.now()))
        {
            const user = await user_model.findById(result.user_id)
            if(user === 0)
            {
                return res.status(400).end();
            }
            user.activate_status = 1;
            const userID = user.Id;
            delete user.Id;
            await user_model.patch(userID,user);
            await activate_Model.del(result.Id);
            return res.json({
                message: "User activation successfully"
            }).status(200).end();
        }
        else
        {
            return res.status(400).end();
        }
    }
  });







module.exports = router;