import React, { useState, useEffect, createContext } from 'react';
import './App.css';
import { makeStyles } from '@material-ui/core/styles';
import "./App.css"
import { Authenticator, Loading } from 'aws-amplify-react'; // 認証系のコンポーネント
import { Grid } from '@material-ui/core';
import AppBar from "./components/layouts/AppBar"
import MyRoomList from "./components/RoomList"
import CurrentRoom from "./components/Room"
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Dialog from "./components/atoms/Dialog"

export const UserContext = createContext()

const useStyles = makeStyles(theme => ({
  text: {
    padding: theme.spacing(2, 2, 0),
  },
  paper: {
    paddingBottom: 50,
  },
  list: {
    marginBottom: theme.spacing(2),
  },
  subheader: {
    backgroundColor: theme.palette.background.paper,
  },
  appBar: {
    top: 'auto',
    bottom: 0,
  },
  grow: {
    flexGrow: 1,
  },
  fabButton: {
    position: 'absolute',
    zIndex: 1,
    bottom: 50,
    right: 50,
  },
}));

const App = () => {
  const classes = useStyles();
  const [username, setUserName] = useState("")
  const [open, setOpen] = useState(false);
  const [room, setRoom] = useState({ messages: [] });

  const changeDialog = () => {
    setOpen(!open);
  };


  const showDialog = () => {
    changeDialog()
  }

  const changeRoom = (room) => {
    setRoom(room)
  }

  return (
    <UserContext.Provider value={username}>
      <AppBar />
      <Grid container justify="center">
        {username ? (
          <>
            <Grid item xs={12} sm={3}>
              <MyRoomList changeRoom={changeRoom} />
            </Grid>
            <Grid item xs={12} sm={6}>
              {room.name && <CurrentRoom room={room} />}

            </Grid>
          </>
        ) : <Authenticator onStateChange={(_, user) => {
          user ? setUserName(user.username) : setUserName("")
        }} >
            <Loading />
          </Authenticator>
        }
      </Grid>
      <Fab color="secondary" aria-label="add" className={classes.fabButton} onClick={showDialog}>
        <AddIcon />
      </Fab>
      <Dialog isOpen={open} changeDialog={changeDialog} />
    </UserContext.Provider >

  )
}


export default App;



//this._validAuthStates = ['signedIn'];