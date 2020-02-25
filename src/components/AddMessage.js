import React, { useState, useEffect, useContext } from 'react';
import styled from "styled-components"
import { createMessage } from "../graphql/mutations"
import { API, graphqlOperation } from 'aws-amplify'

import { UserContext } from "../App"
window.LOG_LEVEL = 'VERBOSE';

export default ({ room }) => {
  const [message, setMessage] = useState("")
  const username = useContext(UserContext)

  const enter = async () => {
    const input = {
      messageRoomId: room.id,
      title: message,
      username
    }

    console.log(input)
    const res = await API.graphql(graphqlOperation(createMessage, { input }));
    console.log('Created Message', res)
    setMessage("")

  }

  return (
    <ChatInputWrapper>

      <Form>
        <ChatInput
          className='chat-input'
          placeholder='Send...'
          value={message}
          onChange={e => setMessage(e.target.value)}
          onKeyPress={e => e.key === "Enter" ? enter(e, message) && setMessage("") : null}
        />
      </Form>
    </ChatInputWrapper>

    // <Form>
    //   <InputLabel htmlFor="my-input">Chat</InputLabel>
    //   <Input id="my-input" aria-describedby="my-helper-text"
    //     onChange={e => setMessage(e.target.value)}
    //     value={message}

    //     
    //   />
    //   <FormHelperText id="my-helper-text">Type Chat Message</FormHelperText>
    // </Form>
  )
}


const ChatInputWrapper = styled.div`
   display: flex;
   margin-top: auto;
  `


const Form = styled.form`
display: flex;
flex: 1 1 auto;
`

const ChatInput = styled.input`
  padding: 15px 20px;
  border: none;
  border-radius: 5px;
  font-size: 20px;
  flex: 1 1 auto;
  outline: none;
`