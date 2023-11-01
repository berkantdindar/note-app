import * as React from "react";
import "./App.scss";
import NoteComponent from "./components/note-component";
import AddTaskDialog from "./shared-components/addTaskDialog";

function App() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className="app">
      <svg
        className="add-task-icon"
        onClick={handleClickOpen}
        xmlns="http://www.w3.org/2000/svg"
        width="180"
        height="180"
        fill="bisque"
        viewBox="0 0 16 16"
      >
        <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm6.5 4.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3a.5.5 0 0 1 1 0z" />
      </svg>
      <AddTaskDialog open={open} handleClose={handleClose}></AddTaskDialog>
      <div className="note-display">
        <NoteComponent key={open.toString()} />
        {/* <NoteComponent /> */}
      </div>
    </div>
  );
}

export default App;
