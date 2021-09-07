import path from "path";
import { createConnection, Entity } from "typeorm";
import { enviroment } from "./enviroment";

export const connect = async()=> {
    
    try {
        await createConnection({
            type: 'postgres',
            port: Number(enviroment.DB_PORT),
            username: enviroment.DB_USERNAME,
            password: enviroment.DB_PASSWORD,
            database: enviroment.DB_DATABASE,
            entities: [
                path.join(__dirname, '../entity/**/**.ts'), //Se  importa path para usar variable dirname
            ],
            synchronize: true,
        });
        console.log('Database running');
    } catch (error) {
        console.error(error);
    }
};