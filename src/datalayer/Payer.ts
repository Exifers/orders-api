import {Entity, Column, PrimaryGeneratedColumn, BaseEntity, ManyToOne, Index, Unique, JoinColumn} from 'typeorm'
import {Order} from "./Order";

@Entity()
@Unique(['email', 'order'])
export class Payer extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column()
    email: string

    @Index()
    @ManyToOne(() => Order, (order) => order.payers, {
        createForeignKeyConstraints: true,
    })
    @JoinColumn({
        name: 'order_id',
        referencedColumnName: 'id',
    })
    order: Order
}
