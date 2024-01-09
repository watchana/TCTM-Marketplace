const server = require('http').createServer()
const io = require('socket.io')(server)

io.on('connection', socket => {
  console.log('a user connected')

  socket.on('chat message', msg => {
    console.log('message: ' + msg)
    io.emit('chat message', msg)
  })

  socket.on('disconnect', () => {
    console.log('user disconnected')
  })
})

server.listen(3001, () => {
  console.log('listening on *:3001')
})
