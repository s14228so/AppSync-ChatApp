import React from 'react'
import AddMessage from "./AddMessage"
export default ({ room }) => {
  const renderRoom = () => {
    if (room.messages.length) {
      return (
        <div>
          {room.messages.map(msg => {
            return (
              <p>{msg.title}</p>
            )
          })}
        </div>
      )
    }
  }

  return (
    <div>Room
      <p>{room.name}</p>
      {renderRoom()}
      <AddMessage room={room} />
    </div>
  )
}