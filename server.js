"use strict";

const fs = require( 'fs' );
const express = require( 'express' );
const serveStatic = require( 'serve-static' );
const bodyParser = require( 'body-parser' );
const winston = require( 'winston' );

const port = process.env.PORT || 3000;
const config = require('./ng-site-config');

// Read up start up page.
const startup = fs.readFileSync( config.startUpPage || './dist/index.html', { encoding: 'utf8' } );

// Create application.
const app = express();

// Serve static files.
app.use( serveStatic( config.ngSitePath || 'dist', { index: false } ) );

// Parse application/json.
app.use( bodyParser.json() );

// Configure logger.
winston.configure( {
  transports: [
    new (winston.transports.File)( {
      filename: config.logFile || 'logs/ng-site-runner.log'
    } )
  ]
} );

// GET: /home
app.get( [ '/', '/home' ], (req, res) => {
  res.send( startup );
} );

// METHOD: *
app.use( '*', (req, res) => {
  res.status( 404 ).send( 'The requested resource is not found.' );
} );

// Handle errors.
app.use( (err, req, res, next) => {
  winston.error( err.stack );
  res.status( 500 ).json( { message: err.message } );
} );

// Start web server.

app.listen( port, () => {
  console.log( `Angular site runner is listening on port ${ port }.\n` )
} );
