const db = require('../../utils/db');

module.exports = {
  findByUserId(hostID){
   return this.postRequest().where('host.userID',hostID)
  },

  findByRoomId(roomID){
    return db('post').where('roomID',roomID);
   },

  add(post) {
    return db('post').insert(post);
  },
  del(id) {
    return db('post')
      .where('id', id)
      .update('isdeleted', 1);
  },
  update(id, post) {
    return db('post')
      .where('id', id)
      .update(post);
  }
};
