// To use the HTTP server and client one must require this module.
const { createServer } = require('http');
// To use next server.
const next = require('next');

// This is a development environment.
const app = next({
    dev: process.env.NODE_ENV !== 'production'
});

const routes = require('./routes');
const handler = routes.getRequestHandler(app);

//Set up the application to listen to a specific port.
app.prepare().then( () => {
    createServer(handler).listen(3000, (err) => {
        if(err) throw err;
        console.log("Ready on localhost:3000");
    });
});
