const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const user_model = require('../services/models/user');
const activate_Model = require('../services/models/register_activation');
const TokenGenerator = require('uuid-token-generator');
const mailer = require('../utils/mailer');
const saltRounds = 10;

router.post('/', async function(req, res) {
    const body = req.body;
    if(body.email == null || body.password == null)
    {
        return res.status(403).end();
    }
    else{
        const user = await user_model.findByMail(body.email);
        if(user === null)
        {
            const salt = bcrypt.genSaltSync(saltRounds);
            const hash = bcrypt.hashSync(body.password, salt);
            let createdDate = new Date(Date.now());
            const code_gen = new TokenGenerator(256, TokenGenerator.BASE62); // generate ra token kích hoạt
            const code = code_gen.generate();
            let expiredHours = new Date(Date.now() + 1 * 86400000); //thời gian hết hạn của mã kích hoạt

            const regUser = {
                name: body.name,
                email: body.email,
                phone: body.phone,
                cardId: body.cardId,
                password: hash,
                role: 0,
                created_at: createdDate,
                balance:0,
                activate_status: 0
            }
            const result = await user_model.add(regUser);
            console.log(result[0]);
            const codeObj = 
            {
                user_id: result[0],
                code: code,
                date_expired: expiredHours
            }
            const codeResult = await activate_Model.add(codeObj);
            mailer.send({
                from: 'nhatrovn.nhom4@gmail.com',
                to: `${regUser.email}`,
                subject: 'NhaTroVn: Xác thực tài khoản của bạn.',
                html: `
                Xin chào ${regUser.name}, cảm ơn bạn đã đăng ký 1 tài khoản ở trang NhaTroVn.
                <br> 
                Hãy nhấp vào 
                <a href="https://nhatrovietnam.herokuapp.com/activate-account/${code}"> đây </a> 
                để xác minh email và kích hoạt tài khoản của bạn, xin hãy xác minh email của bạn trong vòng 24h.
                <br>
                (Đây là thư tự động vui lòng không phản hồi)
                `
            });
            return res.json({
                message: "user created"
              }).status(200).end();
        }
        else{
            return res.status(304).end();
        }
    }
});



module.exports = router;