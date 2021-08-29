const db = require('../../utils/db');

const table = "subscription"
const condition_name = "id"

module.exports = {
  findAll() {
    return db(table);
  },
  async findById(id){
    let rows = await db(table).where("id", id)
    return rows[0]
  },
  add(object) {
    return db(table).insert(object);
  },
  del(condition) {
    return db(table)
      .where(condition_name, condition)
      .del();
  },
  updater(condition, object) {
    return db(table)
      .where(condition_name, condition)
      .update(object);
  }
};
