module.exports = require('knex')({
    client: 'mysql2',
    connection: {
      host : 'us-cdbr-east-04.cleardb.com',
      port : 3306,
      user : 'b790a18f2b4618',
      password : '1b1d0088',
      database : 'heroku_e1ff3cb05b03b56', 
    }
  });
