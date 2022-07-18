import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  appBar: {
    borderRadius: 15,
    padding: 5,
    margin: "10px 0",
    border: "2px solid black",
    [theme.breakpoints.down("xs")]: {
      width: "20%",
    },
  },
  image: {
    marginLeft: "15px",
  },
  wrapper: {
    marginLeft: "15%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "70%",
  },
}));
