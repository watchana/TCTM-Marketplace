const server = require('http').createServer()
const io = require('socket.io')(server)

io.on('connection', socket => {
  socket.on('chat message', msg => {
    io.emit('chat message', msg)
  })

  socket.on('disconnect', () => {})
})

server.listen(3001, () => {})
