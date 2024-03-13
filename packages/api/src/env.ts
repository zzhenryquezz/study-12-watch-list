import 'dotenv/config'

import { object, number, string, optional, parse } from 'valibot'

export const schema = object({
    PORT: optional(number(), 3333),
    HOST: optional(string(), 'localhost'),
    DB_FILENAME: optional(string(), 'local.db')
})

export const env = parse(schema, process.env)