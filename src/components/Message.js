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

export default ({ children, isOwner, msg }) => {
  const classes = useStyles();
  console.log({ msg })

  return isOwner
    ? (
      <div className={classes.isOwner}>
        {msg.username}
        <div className={classes.chatMessage}>
          {children}</div>
      </div>

    )
    : (
      <div className={classes.isOwner}>
        {msg.username}
        <div className={classes.chatMessage}>{children}</div>
      </div>
    )
}

