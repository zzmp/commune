"use strict";

/*
 *
 * Entry file into the server
 * @app -
 *    our express app. Exported for testing and flexibility.
 *
*/

var app   = require('./main/app.js'),
    io    = require('./main/io.js')(app),
    port  = app.get('port'),
    log   = 'Listening on ' + app.get('base url') + ':' + port,

    server = app.listen(port),

    io = require('./main/io.js')(server);

console.log(log);
