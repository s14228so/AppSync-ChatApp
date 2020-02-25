import React, { useEffect, useState } from 'react'
import AddMessage from "./AddMessage"
import { API, graphqlOperation } from 'aws-amplify';

const getRoom = `query getRoom($id: ID!) {
  getRoom(id: $id) {
    id
    name
    messages {
      items {
        id
        title
        username
      }
      nextToken
    }
  }
}
`;


export default ({ room }) => {

  const [roomData, setRoomData] = useState(room)

  useEffect(() => {
    const fetchRoomData = async () => {
      const input = { id: room.id };
      const res = await API.graphql(graphqlOperation(getRoom, input));
      setRoomData(res.data.getRoom)
    }
    fetchRoomData()

  }, [])
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