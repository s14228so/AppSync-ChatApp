import React, { useState, useEffect, useContext } from 'react';
import styled from "styled-components"
import { FormControl, InputLabel, Input, FormHelperText, } from '@material-ui/core';
import { createMessage } from "../graphql/mutations"
import { API, graphqlOperation } from 'aws-amplify'

import { UserContext } from "../App"
window.LOG_LEVEL = 'VERBOSE';

const AddMessage = ({ room }) => {
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
    <Wrapper>
      <Form>
        <InputLabel htmlFor="my-input">Chat</InputLabel>
        <Input id="my-input" aria-describedby="my-helper-text"
          onChange={e => setMessage(e.target.value)}
          value={message}

          onKeyPress={e => e.key === "Enter" ? enter(e, message) && setMessage("") : null}
        />
        <FormHelperText id="my-helper-text">Type Chat Message</FormHelperText>
      </Form>
    </Wrapper>
  )
}


const Wrapper = styled.div`
    margin: 20px 0px;
  `

const Form = styled(FormControl)`
    position: absolute;
    bottom: 0;
    width: 100%;
  `

export default AddMessage;