import React, { createContext, useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import Peer from "simple-peer";

const SocketContext = createContext();
const socket = io("http://localhost:5000");
// const socket = io("https://gang-meet.herokuapp.com/");
const ContextProvider = ({ children }) => {
  const [stream, setStream] = useState(null);
  const [me, setMe] = useState("");
  const [name, setName] = useState("");
  const [otherName, setOtherName] = useState("");
  const [otherId, setOtherId] = useState();
  const [call, setCall] = useState({});
  const [callAccepted, setCallAccepted] = useState(false);
  const [callEnded, setCallEnded] = useState(false);

  const myVideo = useRef({});
  const userVideo = useRef({});
  const connectionRef = useRef();
  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({
        video: {
          facingMode: "user",
          width: 1200,
          height: 1350,
        },
        audio: true,
      })
      .then((currentStream) => {
        setStream(currentStream);
        myVideo.current.srcObject = currentStream;
      });

    socket.on("me", (id) => setMe(id));
    socket.on("callUser", ({ signal, name, from }) => {
      setCall({ isRecivingCall: true, name: name, from, signal });
    });
    socket.on("cancelRef", () => {
      connectionRef.current.destroy();
      window.location.reload();
    });
  }, []);

  const callUser = (id) => {
    const peer = new Peer({ initiator: true, trickle: false, stream });
    peer.on("signal", (data) => {
      socket.emit("callUser", {
        userToCall: id,
        signalData: data,
        from: me,
        name: name,
      });
    });

    peer.on("stream", (currentStream) => {
      userVideo.current.srcObject = currentStream;
    });

    socket.on("callAccepted", ({ signal, theOtherName }) => {
      setCallAccepted(true);
      setOtherName(theOtherName);
      setOtherId(id);
      peer.signal(signal);
    });
    connectionRef.current = peer;
  };

  const answerCall = () => {
    setCallAccepted(true);
    const peer = new Peer({ initiator: false, trickle: false, stream });

    peer.on("signal", (data) => {
      socket.emit("answerCall", {
        signal: data,
        to: call.from,
        theOtherName: name,
      });
    });

    peer.on("stream", (currentStream) => {
      userVideo.current.srcObject = currentStream;
    });

    peer.signal(call.signal);
    connectionRef.current = peer;
  };

  const leaveCall = () => {
    setCallEnded(true);

    connectionRef.current.destroy();
    if (call.from) {
      socket.emit("leaveCall", {
        to: call.from,
      });
    } else {
      socket.emit("leaveCall", { to: otherId });
    }

    window.location.reload();
  };
  return (
    <SocketContext.Provider
      value={{
        call,
        callAccepted,
        myVideo,
        userVideo,
        stream,
        name,
        setName,
        callEnded,
        me,
        callUser,
        leaveCall,
        answerCall,
        otherName,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};

export { ContextProvider, SocketContext };
