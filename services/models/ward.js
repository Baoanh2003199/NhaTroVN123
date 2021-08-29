const db = require('../../utils/db');

module.exports = {
  findAll() {
    return db('ward').select('ward.id','ward._name as name','ward._prefix as prefix');
  },
  add(ward) {
    return db('ward').insert(ward);
  },
  findById(wardId){
    return db('ward').where('id', wardId)
  },
  update(id, ward) {
    return db('ward')
      .where('id', id)
      .update(ward);
  }
};
