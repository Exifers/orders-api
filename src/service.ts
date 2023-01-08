import {Payer} from "./datalayer/Payer";
import * as Types from './types'
import {Order} from "./datalayer/Order";
import {NotFoundError, FailedConstraintError} from "./errors";

export namespace OrdersService {
    export const create = async (createOrderDto: Types.CreateOrderDto): Promise<Types.Order> => {
        const existing = await Order.findOne({where: {id: createOrderDto.id}})
        if (existing !== null)
            throw new FailedConstraintError('id already exists.')

        const order = new Order()
        Object.assign(order, createOrderDto)
        await order.save()
        return serialize(order)
    }

    export const addPayer = async (id: string, addPayerDto: Types.AddPayerDto): Promise<Types.Order> => {
        const order = await Order.findOne({where: {id}})
        if (order === null)
            throw new NotFoundError()

        if (order.payers.find(payer => payer.email === addPayerDto.email)) {
            throw new FailedConstraintError('A payer with this email already exists.')
        }

        const payer = new Payer()
        Object.assign(payer, addPayerDto)
        payer.order = order
        await payer.save()

        await order.reload()
        return serialize(order)
    }

    export const retrieve = async (id: string): Promise<Types.Order> => {
        const order = await Order.findOne({where: {id}})
        if (order === null)
            throw new NotFoundError()
        return serialize(order)
    }

    const serialize = (order: Order): Types.Order => {
        const payers = order.payers || []
        const amountPerPayer = order.amount / payers.length
        return {
            id: order.id,
            name: order.name,
            amount: order.amount,
            payers: payers.map(payer => ({
                payer: {
                    id: payer.id,
                    name: payer.name,
                    email: payer.email,
                },
                amount: amountPerPayer
            })),
        }
    }
}