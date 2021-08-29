const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const user_model = require('../services/models/user');
const hostModel = require('../services/models/host')
const mailer = require('../utils/mailer');


router.post('/', async function(req, res) {
    const body = req.body;
    console.log(body);
    if(body.email == null || body.password == null)
    {
        return res.status(403).end();
    }
    else{
        const user = await user_model.findByMail(body.email);
        if(user === null)
        {
            return res.status(204).end();
        }
        const hashed = user.password;
        var validUser = bcrypt.compareSync(body.password, hashed) 
        if(validUser)
        {
            // check gói hết hạn
            //isHost
            //unchecked
            const host = hostModel.findByUserId(user.Id)
            const dateNow = new Date()
            if(host != null) {
               let expired = new Date(host.expired_subcription)
               if(expired > dateNow){
                   // mail
                   mailer.send({
                    from: 'nhatrovn.nhom4@gmail.com',
                    to: `${regUser.email}`,
                    subject: 'NhaTroVn: Gia Hạn Gói.',
                    html: `
                        Xin chào ${regUser.name}, Vui lòng gia hạn vì gói đăng kí của bạn đã hết hạn
                    `
                    });
               } 
            }

            const userReturned =
            {
                id: user.Id,
                name: user.name,
                status: user.activate_status
            }
            return res.json(userReturned).status(200).end();
        }
        else{
            return res.status(403).end();
        }
    }
});



module.exports = router;