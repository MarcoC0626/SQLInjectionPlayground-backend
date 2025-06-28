import dotenv from 'dotenv'
import path from 'path'
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url))

dotenv.config({ path: path.resolve(__dirname, '.env') })

class Config {

    mysql_host: string
    mysql_user: string
    mysql_pass: string
    mysql_db: string
    mysql_port: number

    constructor() {
        this.mysql_host = this.required('MYSQL_HOST')
        this.mysql_user = this.required('MYSQL_USER')
        this.mysql_pass = this.required('MYSQL_PASS')
        this.mysql_db = this.required('MYSQL_DB')
        this.mysql_port = Number(this.required('MYSQL_PORT'))
    }

    required(key: string): string {
        const value = process.env[key];
        if (!value) {
            throw new Error(`Missing environment variable: ${key}`);
        }
        return value;
    }
}

export default new Config()