
const _sqlite3 = require('sqlite3').verbose();

class _Connector{

    constructor(db_name){
        this.db = null;
        this.is_connect = false;
    }

    connect(db_name){
        this.db = new _sqlite3.Database(db_name, err => {
            if(err){
                console.log(err.message)
                return err
            }

            this.db.run("PRAGMA foreign_keys = ON");
            console.log('INIT :: DB Connect SUCCESS')
        })
    }

    query(...args) {
        return this.db.run(...args)
    }

    transaction (func) {
        this.db.serialize(() => {
            try{
                this.db.run('BEGIN TRANSACTION')
                func()
            }catch(e){
                this.db.run('ROLLBACK')
                throw e
            }finally{
                this.db.run('END')
            }
            func()
        })

    }

}

_connector = new _Connector()

module.exports = {
    connect: (db_name) => {_connector.connect(db_name)},
    getConnection: () => _connector
}


