const db = require('../../utils/db');
const tableName = 'activate_code'



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

    async findByCode(code)
    {
        const rows = await db(tableName).where('code','like',code);
        if(rows.length === 0)
        {
            return null;
        }
        return rows[0];
    },
    
    add(code){
        return db(tableName).insert(code);
    },

    del(id)
    {
        return db(tableName).where('Id',id).del();
    },

    patch(id, code_noId)
    {
        return db(tableName).where('Id', id).update(code_noId);
    }
}