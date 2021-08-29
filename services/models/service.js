const db = require('../../utils/db');

module.exports = {
  findAll() {
    return db('service');
  },
  add(service) {
    return db('service').insert(service);
  },
  del(id) {
    return db('service')
      .where('id', id)
      .del();
  },
  updater(id, service) {
    return db('service')
      .where('id', id)
      .update(service);
  }
};
