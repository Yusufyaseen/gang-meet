import React from "react";
import { Typography, AppBar } from "@mui/material";
import Notifications from "./components/Notifications";
import VideoPlayer from "./components/VideoPlayer";
import Options from "./components/Options";
import { makeStyles } from "@material-ui/core/styles";

import useStyles from "./styles";
const App = () => {
  const classes = useStyles();
  return (
    <div className={classes.wrapper}>
      <AppBar className={classes.appBar} position="static" color="inherit">
        <Typography variant="h4" align="center">
          Go and chat with others..
        </Typography>
      </AppBar>
      <VideoPlayer />
      <Options>
        <Notifications />
      </Options>
    </div>
  );
};

export default App;
