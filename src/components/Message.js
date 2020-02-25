import React, { useState, useEffect, Children } from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  chatMessage: {
    background: "#ffffff",
    margin: "10px 0px",
    padding: "8px",
    borderRadius: "5px",
    width: "auto",
    maxWidth: "80%"
  },
  notOwner: {
    alignSelf: "flex-start",
  },
  isOwner: {
    alignSelf: "flex-end",
  },

}));

const ChatMessage = ({ children, isOwner }) => {
  const classes = useStyles();

  return isOwner
    ? (
      <div className={classes.chatMessage + " " + classes.isOwner}> {children}</div >
    )
    : (
      <div className={classes.chatMessage + " " + classes.notOwner}>{children}</div>
    )
}


export default ChatMessage