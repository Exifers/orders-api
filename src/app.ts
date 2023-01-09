import fastify, {FastifyInstance} from 'fastify'
import {serializerCompiler, validatorCompiler, ZodTypeProvider} from 'fastify-type-provider-zod';
import {FailedConstraintError, NotFoundError} from "./errors";
import {ZodError} from "zod";

const handleError: Parameters<FastifyInstance['setErrorHandler']>[0] = (error, request, reply) => {
    console.error(error)
    if (error instanceof NotFoundError) {
        return reply.status(404).send({type: 'notFound', payload: error.message})
    }
    if (error instanceof FailedConstraintError) {
        return reply.status(400).send({type: 'constraint', payload: error.message})
    }
    if (error instanceof ZodError) {
        return reply.status(400).send({type:'validation', payload: error.issues})
    }
    if ('statusCode' in error) {
        return reply.status(error.statusCode as number).send()
    }
    reply.status(500).send()
}

export const app = fastify({logger: true})
    .setValidatorCompiler(validatorCompiler)
    .setSerializerCompiler(serializerCompiler)
    .setErrorHandler(handleError)
    .withTypeProvider<ZodTypeProvider>()

