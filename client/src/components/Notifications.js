import React, { useContext } from "react";
import { Button, Typography } from "@material-ui/core";

import { SocketContext } from "../SocketContext";

const Notifications = () => {
  const { answerCall, call, callAccepted } = useContext(SocketContext);

  return (
    <>
      {call.isRecivingCall && !callAccepted && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-around",
            backgroundColor: "#07c407",
            borderRadius: 10,
            padding: 8,
            margin: "15px 10px 5px 10px",
          }}
        >
          <Typography
            variant="h5"
            style={{
              color: "#fff",
              fontWeight: "bold",
              textShadow: "2px 2px 10px #000, 2px 2px 10px #000",
            }}
          >
            {call.name} is calling
          </Typography>
          <Button
            variant="contained"
            style={{
              borderRadius: 7,
              backgroundColor: "#07c407",
              color: "#fff",
              fontWeight: "bold",
              border: "2px solid #fff",
              textShadow: "1px 1px 5px #000, 1px 1px 5px #fff",
            }}
            onClick={answerCall}
          >
            Answer
          </Button>
        </div>
      )}
    </>
  );
};

export default Notifications;
