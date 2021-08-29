var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'nhatrovn.nhom4@gmail.com',
      pass: 'vmrubhxspseufzdf'
    }
  });

var defaultMail = {
    from: 'nhatrovn.nhom4@gmail.com',
    text: 'test text',
};

module.exports ={
    // use default setting
    //mail = _.merge({}, defaultMail, mail);
    
    // send email
    send: function(mail)
    {
        transporter.sendMail(mail, function(error, info){
            if(error) return console.log(error);
            console.log('mail sent:', info.response);
        });
    }
   
};