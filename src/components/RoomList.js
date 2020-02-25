import React, { useContext, useState } from 'react'

import { graphqlOperation } from "aws-amplify";
import { Connect } from "aws-amplify-react";
import { listRooms } from "../graphql/queries";
import { UserContext } from "../App";

import styled, { css } from "styled-components"
import CircularProgess from "./CircularProgress"

export default ({ changeRoom }) => {
  const username = useContext(UserContext);
  const [selectedRoom, setRoom] = useState(null)
  const handleChangeRoom = (room) => {
    setRoom(room)
    changeRoom(room)
  }
  // Connectコンポーネントを使うとdata, loading, errorsを関数の引数で受け取って使える。
  return (
    <Connect
      query={graphqlOperation(listRooms)}
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
${props => props.isActive ? css`
  border-right: 2px solid #c51162;
` : css`
`}
`