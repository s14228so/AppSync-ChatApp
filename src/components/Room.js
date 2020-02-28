import React, { useEffect, useState, useContext, useRef } from 'react'
import AddMessage from "./AddMessage"
import { API, graphqlOperation } from 'aws-amplify';
import { makeStyles } from '@material-ui/core/styles';
import { UserContext } from "../App"
import Message from "./Message"
import styled from "styled-components"
import { useSubscription } from '../hooks/useSubscription'


const useStyles = makeStyles(theme => ({
  chatHistory: {
    overflowY: "auto",
    minHeight: "300px",
    padding: "20px 0",
    display: "flex",
    justifyContent: "flex-end",
    flexDirection: "column"
  }
}));
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

  const [roomData, setRoomData] = useState({})
  const messagesEndRef = useRef(null)
  const username = useContext(UserContext)
  const classes = useStyles();
  console.log(room.name)
  const newMessages = useSubscription(room)
  console.log(newMessages)


  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView(false, { behavior: "smooth" })
  }

  useEffect(scrollToBottom, [newMessages]);


  useEffect(() => {
    const fetchRoomData = async () => {
      const input = { id: room.id };
      const res = await API.graphql(graphqlOperation(getRoom, input));
      setRoomData(res.data.getRoom)
    }
    fetchRoomData()

  }, [room.id])


  return (
    <div>
      <Chat>
        <ChatBox>

          <ChatHistoryWrapper>
            <div className={classes.chatHistory} ref={messagesEndRef}>
              {newMessages && newMessages.map(msg => {
                return (
                  <Message key={msg.id} msg={msg} isOwner={msg.username === username}>{msg.title}</Message>
                )
              })}
            </div>
          </ChatHistoryWrapper>
          <AddMessage room={roomData} />
        </ChatBox>

      </Chat>
    </div>
  )
}


const Chat = styled.div`
  display: flex;
  background: #ffffff69;
  overflow-y: auto;
`

const ChatBox = styled.div`
    display: flex;
    flex: 1 1 auto;
    flex-direction: column;
    padding: 10px 8px;
    height: 500px;
`

const ChatHistoryWrapper = styled.div`
   height: 100%;
    width: 100%;
    position: relative;
    `
//user: null

// user: {
//   room: {
//     messages: []
//   }
// }




// 普通に書くとこうなると思うんですが、
// if(this.user){
//   if(this.user.room){
//     if(this.user.room.messages){
//       this.user.room.messages.map(msg => {
//         return msg.body
//       })
//     }
//   }
// }


// これで行けるっぽいです
// this.user?.room?.messages.map(msg => {
//   return msg.body
// })
