import React from "react";
import "./note-component.scss";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

function NoteComponent(props) {
  const NotePaper = styled(Paper)(({ theme }) => ({
    width: 120,
    height: 120,
    padding: theme.spacing(2),
    ...theme.typography.body2,
    textAlign: "center",
  }));

  const [notes, setNotes] = useState([]);
  const [localDataKey, setLocalDataKey] = useState({});
  const [open, setOpen] = useState(false);
  const [UUID, setUUID] = useState("");

  const handleClickOpen = (storageKey) => {
    console.log("storageKey" + storageKey);
    const existingData = JSON.parse(
      localStorage.getItem("TaskApp" + storageKey)
    );
    setUUID(storageKey);
    setLocalDataKey(existingData);
    setOpen(true);
  };

  const [localData, setLocalData] = useState({ localTitle: "", localTask: "" });

  useEffect(() => {
    if (localDataKey.title && localDataKey.task) {
      setLocalData((prevData) => ({
        ...prevData,
        localTitle: localDataKey.title,
        localTask: localDataKey.task,
      }));
    }
  }, [localDataKey]);

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    const keys = Object.keys(localStorage).filter((key) =>
      key.includes("TaskApp")
    );
    const data = keys.map((key) => JSON.parse(localStorage.getItem(key)));
    setNotes(data);
  }, []);

  const handleDeleteNote = (uniqueId) => {
    localStorage.removeItem("TaskApp" + uniqueId);

    const updatedNotes = notes.filter((note) => note.uniqueId !== uniqueId);
    setNotes(updatedNotes);
  };
  const updateLocalData = (uniqueId) => {
    const existingData = JSON.parse(localStorage.getItem("TaskApp" + uniqueId));

    const { localTitle, localTask } = localData;

    existingData.title = localTitle;
    existingData.task = localTask;

    localStorage.setItem("TaskApp" + uniqueId, JSON.stringify(existingData));
    setOpen(false);

    const updatedNotes = notes.map((note) => {
      if (note.uniqueId === uniqueId) {
        return {
          ...note,
          title: localTitle,
          task: localTask,
        };
      }
      return note;
    });
    setNotes(updatedNotes);
  };

  return (
    <>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit Task</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="title"
            label="Title"
            type="text"
            fullWidth
            value={localData.localTitle}
            onChange={(e) =>
              setLocalData({ ...localData, localTitle: e.target.value })
            }
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
            value={localData.localTask}
            onChange={(e) =>
              setLocalData({ ...localData, localTask: e.target.value })
            }
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={() => updateLocalData(UUID)}>Edit</Button>
        </DialogActions>
      </Dialog>
      {notes.length > 0 ? (
        notes.map((note) => (
          <div className="note-paper" key={note.uniqueId}>
            <NotePaper
              style={{ position: "relative" }}
              elevation={12}
              variant="elevation"
            >
              <div className="note-title">{note.title}</div>
              <div className="note-exp">{note.task}</div>
              <div className="note-date">{note.time}</div>
              <svg
                onClick={() => {
                  handleClickOpen(note.uniqueId);
                  console.log("TaskApp" + note.uniqueId);
                }}
                className="edit-task-icon"
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z" />
              </svg>
              <svg
                onClick={() => {
                  handleDeleteNote(note.uniqueId);
                  console.log("TaskApp" + note.uniqueId);
                }}
                className="delete-task-icon"
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z" />
                <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z" />
              </svg>
            </NotePaper>
          </div>
        ))
      ) : (
        <h3>You don't have any task.</h3>
      )}
    </>
  );
}

export default NoteComponent;
