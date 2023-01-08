import {app} from "./app";
import {OrdersService} from "./service";
import * as Types from './types'

app.post(
    '/orders',
    {schema: {body: Types.CreateOrderDto, response: {201: Types.Order}}},
    async (request, reply) => {
        const order = await OrdersService.create(request.body)
        reply.status(201).send(order)
    })

app.post('/orders/:id/add-payer',
    {schema: {params: Types.OrderParam, body: Types.AddPayerDto, response: {200: Types.Order}}},
    async (request, reply) => {
        const order = await OrdersService.addPayer(request.params.id, request.body)
        reply.status(200).send(order)
    }
)

app.get('/orders/:id',
    {schema: {params: Types.OrderParam, response: {200: Types.Order}}},
    async (request, reply) => {
        const order = await OrdersService.retrieve(request.params.id)
        reply.status(200).send(order)
    }
)