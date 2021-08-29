const db = require('../../utils/db');
const tableName = 'payment';



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

    async findByUniqueKey(key)
    {
        const rows = await db(tableName).where('unique_key','like',key);
        if(rows.length === 0)
        {
            return null;
        }
        return rows[0];
    },
    
    async findByHostID(id)
    {
        const rows = await db(tableName).where('hostID',id);
        if(rows.length === 0)
        {
            return null;
        }
        return rows[0];
    },

    add(payment){
        return db(tableName).insert(payment);
    },

    del(id)
    {
        return db(tableName).where('Id',id).del();
    },

    patch(id, payment_noId)
    {
        return db(tableName).where('Id', id).update(payment_noId);
    },

}