import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Storage, Auth, API, graphqlOperation } from 'aws-amplify';
import { createRoom } from '../../graphql/mutations';

export default function FormDialog({ isOpen, changeDialog }) {
  const [roomName, setRoomName] = useState("")

  const handleCreateRoom = async () => {
    const input = {
      name: roomName,
    }
    const res = await API.graphql(graphqlOperation(createRoom, { input }));
    console.log('Created Room', res)
    changeDialog()
  }


  return (
    <div>
      <Dialog open={isOpen} onClose={changeDialog} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">ルームを作る</DialogTitle>
        <DialogContent>
          <DialogContentText>
            ルーム名を入れてね！誰でも入れるルームだから気をつけてね
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            label="ルーム名"
            type="text"
            fullWidth
            value={roomName}
            onChange={e => setRoomName(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={changeDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleCreateRoom} color="primary">
            作成
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}