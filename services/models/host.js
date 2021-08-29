const db = require('../../utils/db');

module.exports = {
  findAll() {
    return db('host');
  },
  add(host) {
    return db('host').insert(host);
  },
  del(id) {
    return db('host')
      .where('id', id)
      .del();
  },
  updater(id, host) {
    return db('host')
      .where('id', id)
      .update(host);
  },
  updateSubscription(id, id_subscription, expired_subcription){
    return db('host')
      .where('id', id)
      .update({   
            id_subscription,
            expired_subcription
            });
  },
  async findByIdHost(id){
    let rows = await db('host').where('id',id);
    return rows[0]
  },
  async findByUserId(id){
    let rows = await db('host').where('userID',id);
    return rows[0]
  }
};
