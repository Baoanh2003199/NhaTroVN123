const db = require('../../utils/db');

module.exports = {
  findAll() {
    return db('status_post');
  },
  add(status_post) {
    return db('status_post').insert(status_post);
  },
  del(id) {
    return db('status_post')
      .where('id', id)
      .del();
  },
  updater(id, status_post) {
    return db('status_post')
      .where('id', id)
      .update(status_post);
  }
};
