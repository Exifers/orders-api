import {DataSource} from 'typeorm'
import {Payer} from "./Payer";
import {Order} from "./Order";

export const db = new DataSource({
    type: 'sqlite',
    database: 'sqlite.db',
    synchronize: true,
    logging: true,
    entities: [Payer, Order],
    subscribers: [],
    migrations: [],
})
