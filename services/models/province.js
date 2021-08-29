const db = require('../../utils/db');

module.exports = {
  findAll() {
    return db('province').select('province.id','province._name as name','province._code as code');
  },
  add(province) {
    return db('province').insert(province);
  },
  del(id) {
    return db('province')
      .where('id', id)
      .del();
  },
  updater(id, province) {
    return db('province')
      .where('id', id)
      .update(province);
  }
};
