import React, { useContext } from 'react'

import { graphqlOperation } from "aws-amplify";
import { Connect } from "aws-amplify-react";
import { listRooms } from "../graphql/queries";
import { UserContext } from "../App";



export default ({ changeRoom }) => {
  const username = useContext(UserContext);
  const handleChangeRoom = (room) => {
    changeRoom(room)
  }
  // Connectコンポーネントを使うとdata, loading, errorsを関数の引数で受け取って使える。
  return (
    <Connect
      query={graphqlOperation(listRooms)}
    >
      {({ data, loading, errors }) => {
        if (errors.length > 0) return <div>{errors.length}</div>
        if (loading || !data.listRooms) return <div>loading...</div>
        return (data && <>
          <h2 className="header">
            ルーム一覧
            </h2>
          {data.listRooms.items.map(room => (
            <div key={room.id} className="my-2">
              <button onClick={() => handleChangeRoom(room)}>{room.name}</button>
            </div>))}
        </>)
      }}
    </Connect >
  )
}
