import { Sequelize, DataTypes } from 'sequelize';
import config from '../config.ts'

const sequelize = new Sequelize({
    host: config.mysql_host,
    port: config.mysql_port,
    database: config.mysql_db,
    username: config.mysql_user,
    password: config.mysql_pass,
    dialect: 'mysql',
    logging: (msg) => {
        if (msg.includes('ERROR')) {
            console.error(msg);
        }
    }
})

export default sequelize; 