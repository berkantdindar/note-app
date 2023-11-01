import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import generateUUID from "./generateUUID";

function AddTaskDialog(props) {
  const [data, setData] = React.useState({ title: "", task: "", id: "" });

  const handleTitleChange = (event) => {
    setData({ ...data, title: event.target.value });
  };

  const handleTaskChange = (event) => {
    setData({ ...data, task: event.target.value });
  };

  function sendLocalData() {
    const currentDateTime = new Date();
    const UUID = generateUUID();
    localStorage.setItem(
      "TaskApp" + UUID,
      JSON.stringify({
        title: data.title,
        task: data.task,
        time: currentDateTime.toLocaleString(),
        uniqueId: UUID,
      })
    );
    data.title = "";
    data.task = "";

    props.handleClose();
  }

  return (
    <Dialog open={props.open} onClose={props.handleClose}>
      <DialogTitle>New Task</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          id="title"
          label="Title"
          type="text"
          fullWidth
          value={data.title}
          onChange={handleTitleChange}
        />
        <TextField
          autoFocus
          margin="dense"
          id="task"
          label="Task"
          type="text"
          fullWidth
          multiline
          rows={4}
          value={data.task}
          onChange={handleTaskChange}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={props.handleClose}>Cancel</Button>
        <Button onClick={sendLocalData}>Create</Button>
      </DialogActions>
    </Dialog>
  );
}

export default AddTaskDialog;
