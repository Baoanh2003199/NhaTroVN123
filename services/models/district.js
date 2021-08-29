const db = require('../../utils/db');

module.exports = {
  findAll() {
    return db('district').select('district.id','district._name as name','district._prefix as prefix');
  }
};
