import React, { useContext, useState } from 'react'

import { graphqlOperation } from "aws-amplify";
import { Connect } from "aws-amplify-react";
import { listRooms } from "../graphql/queries";
import { UserContext } from "../App";
import styled, { css } from "styled-components"
import CircularProgess from "./atoms/CircularProgress"
import { onCreateRoom } from "../graphql/subscriptions"

export default ({ changeRoom }) => {
  const username = useContext(UserContext);
  const [selectedRoom, setRoom] = useState(null)
  const handleChangeRoom = (room) => {
    setRoom(room)
    changeRoom(room)
  }

  const onNewRoom = (prevQuery, newData) => {
    let updatedQuery = { ...prevQuery }
    const updatedRoomList = [
      newData.onCreateRoom,
      ...prevQuery.listRooms.items
    ];

    console.log(updatedQuery)
    updatedQuery.listRooms.items = updatedRoomList;
    return updatedQuery;
  }
  // Connectコンポーネントを使うとdata, loading, errorsを関数の引数で受け取って使える。
  return (
    <Connect
      query={graphqlOperation(listRooms)}
      subscription={graphqlOperation(onCreateRoom, { owner: username })}
      onSubscriptionMsg={onNewRoom}
    >
      {({ data, loading, errors }) => {
        if (errors.length > 0) return <div>{errors.length}</div>
        if (loading || !data.listRooms) return <CircularProgess />
        return (data && <>
          <h3 className="header">
            参加してるルーム
            </h3>
          {data.listRooms.items.map(room => (
            <RoomElement key={room.id} isActive={selectedRoom?.id === room.id}>
              <div onClick={() => handleChangeRoom(room)}>{room.name}</div>
            </RoomElement>))}
        </>)
      }}
    </Connect >
  )
}

styled.div`
  ${props => props.active ? css`
    color: white;
    background: red;
  ` : css`
    color: black;
    background: gray;
  `}
`

const RoomElement = styled.div`
width: 150px;
cursor: pointer;
margin-top: 20px;
padding: 5px 3px;
border-radius: 8px;
text-align:center;
background: #fff;
box-shadow: 4px 4px;
&:active{
  box-shadow: 0px 0px;
  padding-top: 6px;
  margin-left: 1px;
}
${props => props.isActive ? css`
box-shadow: 0px 0px;
color: grey;
font-weight: bold;
` : css`

`}
`