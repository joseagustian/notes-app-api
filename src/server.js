import hapi from '@hapi/hapi';
import routes from './routes.js';

/**
    * @description Initialize the server
*/
async function init() {
    const dt = new Date()

    const server = hapi.server({
        port: 5000,
        host: 'localhost',
        routes: {
            cors: {
                origin: ['*'],
            },
        },
    })
    server.route(routes)
    await server.start();
    console.log(`Server running at: ${server.info.uri}`)
    console.log(`Started at: ${dt.toLocaleTimeString()}`)
}

init()