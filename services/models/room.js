// thông tin phòng bao gồm
/*
    id 
    status 
    address 
    hostID
    price
    area
    create_at
    addition_info
    city
    district
    ward
    isdelete
*/

const db = require('../../utils/db');

module.exports = {
  roomRequest(){
    return db('room')
            .join('images','room.id','images.roomID')
            .join('host', 'room.hostID','host.id')
            .join('user', 'host.userID', 'user.Id')
            .join('post', 'room.id', 'post.roomID')
            .join('service', 'post.service', 'service.id')
            .join('status_post','post.status','status_post.id')
            .select('room.id as room_id',
                      'room.status',  
                      'room.address',
                      'user.name',
                      'user.email',
                      'user.phone',
                      'room.price',
                      'room.area',
                      'room.created_at',
                      'room.city',
                      'room.district',
                      'room.ward',
                      'room.isdelete',
                      'room.addition_infor',
                      'images.id as image_id',
                      'images.name as image_name',
                      'post.id as post_id',
                      'post.title as post_title',
                      'post.description as post_des',
                      'status_post.id as status_id',
                      'status_post.name as status_name',
                      'service.id as service_id',
                      'service.name as service_name'
                    );
  },  
  findAll() {
    return this.roomRequest().where('room.isdelete', 0);
  },
  add(room) {
    return db('room').insert(room);
  },
  
  /////////////////// FIND
  
  findByHostID(hostID){
    return this.roomRequest().where('room.hostId', hostID).andWhere('room.isdelete', 0);
  },
  findById(id){
    return this.roomRequest().where('room.id', id)
  },
  findRoomByStatus(status){
    return this.roomRequest().where('room.status', status)
  },
  findRoomByWard(ward){
    return this.roomRequest().where('room.ward', ward)
  },

  findRoomByCity(city){
    return this.roomRequest().where('room.city', city)
  },

  findRoomByDistrict(district){
    return this.roomRequest().where('room.district', district)
  },

  //------------ FILTER

  filterRoomByPrice(lt, gt){
    return this.roomRequest().where('room.price','>=',lt)
                    .andWhere('room.price','<=',gt)
  },
  filterRoomByArea(lt, gt){
    return this.roomRequest().where('room.area','>=',lt)
                        .andWhere('room.area','<=',gt)
  },

  async del(id) {
    // xóa post
    await db('post').where('roomID', id).del()
    await db('images').where('roomID', id).del()
    return db('room')
      .where('id', id)
      .update('isdelete', 1)
  },

  updater(id, room) {
    return db('room')
      .where('id', id)
      .update(room);
  }
};


