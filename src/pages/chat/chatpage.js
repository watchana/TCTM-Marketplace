import React, { useEffect, useState } from 'react'
import io from 'socket.io-client'

const ChatPage = () => {
  const [messages, setMessages] = useState([])
  const [messageInput, setMessageInput] = useState('')
  const socket = io('http://localhost:3001')

  useEffect(() => {
    socket.on('chat message', msg => {
      setMessages([...messages, msg])
    })

    return () => {
      socket.disconnect()
    }
  }, [messages, socket])

  const sendMessage = () => {
    socket.emit('chat message', messageInput)
    setMessageInput('')
  }

  return (
    <div>
      <ul>
        {messages.map((message, index) => (
          <li key={index}>{message}</li>
        ))}
      </ul>
      <input type='text' value={messageInput} onChange={e => setMessageInput(e.target.value)} />
      <button onClick={sendMessage}>Send</button>
    </div>
  )
}

export default ChatPage
