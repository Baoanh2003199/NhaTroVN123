const db = require('../../utils/db');

module.exports = {
  findAll() {
    return db('images');
  },
  add(image) {
    return db('images').insert(image);
  },
  del(id) {
    return db('images')
      .where('id', id)
      .del();
  },
  updater(id, image) {
    return db('your_table')
      .where('id', id)
      .update(image);
  }
};
