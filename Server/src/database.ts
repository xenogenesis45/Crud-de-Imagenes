import mysql from 'promise-mysql';
import keys from './keys';

export default class Pool{
    async getConn(){
        return(await mysql.createPool(keys.database)).getConnection();
    }
}