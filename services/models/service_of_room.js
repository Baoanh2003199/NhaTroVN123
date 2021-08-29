const db = require('../../utils/db');

module.exports = {

  add(host) {
    return db('service_of_room').insert(host);
  },
  
  del(id) {
    return db('service_of_room')
      .where('id', id)
      .update('isdelete', 1)
  },
};