
import { useReducer, useEffect } from "react";
import API, { graphqlOperation } from '@aws-amplify/api';
import { listMessages } from "../graphql/queries";
import { onCreateMessage } from "../graphql/subscriptions";

const initialState = { messageList: [] }

function reducer(state, action) {
  switch (action.type) {
    case "set":
      return { messageList: action.payload }
    case "add":
      return { messageList: [...state.messageList, action.payload] }
  }
}

export function useSubscription(room) {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    async function fetchData() {
      const res = await API.graphql(graphqlOperation(listMessages))
      const messages = res.data.listMessages.items.filter(msg => {
        return msg.room.id === room.id
      })

      return messages
    }
    fetchData().then(res => {
      dispatch({ type: "set", payload: res })
    })
  }, [room.id])



  useEffect(() => {
    const subscriber = API.graphql(graphqlOperation(onCreateMessage)).subscribe({
      next: data => {
        const {
          value: {
            data: { onCreateMessage }
          }
        } = data
        dispatch({ type: "add", payload: onCreateMessage })
      }
    });
    return () => subscriber.unsubscribe()
  }, []);

  return state.messageList
}