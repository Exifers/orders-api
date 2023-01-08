import {z} from "zod";

const OrderId = z.string().min(6)

export const OrderParam = z.object({
    id: OrderId
})

export const CreateOrderDto = z.object({
    name: z.string().min(4).trim(),
    id: OrderId,
    amount: z.number().positive(),
})

export type CreateOrderDto = z.infer<typeof CreateOrderDto>

export const AddPayerDto = z.object({
    name: z.string().min(4).trim(),
    email: z.string().email(),
})

export type AddPayerDto = z.infer<typeof AddPayerDto>

export const Payer = AddPayerDto.extend({
    id: z.number(),
})

export const Order = CreateOrderDto.extend({
    id: z.string(),
    payers: z.object({payer: Payer, amount: z.number().positive()}).array(),
})

export type Order = z.infer<typeof Order>