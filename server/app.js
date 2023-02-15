const path = require('path')
const express = require('express')
const morgan = require('morgan')
const app = express();
const server = require('http').createServer(app);
const { Server } = require("socket.io");
const helmet = require('helmet')
const cors = require('cors')
module.exports = app
//we are using socket.io to create a server that will listen for events from the client
const io = new Server(server, {
  cors: {
    origin: "http://localhost:8080",
    credentials: true
  }
});





// logging middleware
app.use(helmet({
  contentSecurityPolicy: false,
  crossOriginEmbedderPolicy: false,
  crossOriginResourcePolicy: false,
  
}))
//helmet is a security package that helps prevent attacks
app.use(morgan('dev')) 
app.use(cors({  //cors is a package that allows us to make requests to our server from a different origin
  origin: 'http://localhost:8080',
  credentials: true,
}))


// body parsing middleware
app.use(express.json())

// auth and api routes
app.use('/auth', require('./auth'))
app.use('/api', require('./api'))



app.get('/', (req, res)=> res.sendFile(path.join(__dirname, '..', 'public/index.html')));

// static file-serving middleware
app.use(express.static(path.join(__dirname, '..', 'video')));
app.use(express.static(path.join(__dirname, '..', 'public')))

// any remaining requests with an extension (.js, .css, etc.) send 404
// app.use((req, res, next) => {
//   if (path.extname(req.path).length) {
//     const err = new Error('Not found')
//     err.status = 404
//     next(err)
//   } else {
//     next()
//   }
// })

// sends index.html
app.use('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public/index.html'));
})


//socket io connection
io.on('connect', (socket) => {});

//server listening
server.listen(4000, () => {
  console.log('listening on *:4000');
});

// error handling endware
app.use((err, req, res, next) => {
  console.error(err)
  console.error(err.stack)
  res.status(err.status || 500).send(err.message || 'Internal server error.')
})
