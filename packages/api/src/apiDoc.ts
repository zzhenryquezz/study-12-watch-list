import pkg from '../package.json' assert { type: 'json' };

export const apiDoc = {
    openapi: '3.0.1',
    info: {
        version: pkg.version,
        title: pkg.name,
        description: pkg.description,
    },
    definitions: {
        Media: {
            type: 'object',
            properties: {
                id: { type: 'string' },
                name: { type: 'string' },
                type: { type: 'string' },
                url: { type: 'string' },
            },
        }
    },
    servers: [
        {
            url: 'http://localhost:3000',
            description: 'Development server'
        }
    ],
}