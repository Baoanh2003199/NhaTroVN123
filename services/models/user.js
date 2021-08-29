const db = require('../../utils/db');
const tableName = 'user';
const user_saved_room_table = 'user_saved_room';
const room_table = 'room';
const image_table = 'images';



module.exports = {
    findAll()
    {
        return db(tableName);
    },

    async findById(id)
    {
        const rows = await db(tableName).where('Id',id);
        if(rows.length === 0)
        {
            return null;
        }
        return rows[0];
    },

    async findByMail(mail)
    {
        const rows = await db(tableName).where('email','like',mail);
        if(rows.length === 0)
        {
            return null;
        }
        return rows[0];
    },
    
    add(actor){
        return db(tableName).insert(actor);
    },

    del(id)
    {
        return db(tableName).where('Id',id).del();
    },

    patch(id, user_noId)
    {
        return db(tableName).where('Id', id).update(user_noId);
    },
    updatePrice(id, price) 
    {
        return db(tableName).where('Id', id).update('balance', price)
    },
    async findSavedRoomsById(userId) {
        return await db(user_saved_room_table)
            .join(room_table, 'room.id', 'user_saved_room.room_id')
            .join(image_table, 'room.id','images.roomID')
            .where('user_id',userId);
    }
}