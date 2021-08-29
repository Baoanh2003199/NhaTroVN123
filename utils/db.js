module.exports = require('knex')({
    client: 'mysql2',
    connection: {
      host : 'us-cdbr-east-04.cleardb.com',
      port : 3306,
      user : 'b9afd6d9a41194',
      password : '201b3a64',
      database : 'heroku_61be1cd83e7e5f3'
    }
  });