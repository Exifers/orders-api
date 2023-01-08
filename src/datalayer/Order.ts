import {BaseEntity, Column, Entity, Index, OneToMany, PrimaryColumn} from "typeorm";
import {Payer} from "./Payer";

@Entity()
export class Order extends BaseEntity {
    @PrimaryColumn()
    id: string

    @Column()
    name: string

    @Column({type: 'float'})
    amount: number

    @OneToMany(() => Payer, user => user.order, {eager: true})
    payers: Payer[]
}