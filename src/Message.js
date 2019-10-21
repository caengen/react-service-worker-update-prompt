import React from "react";

const buttonCommon = {
  display: "flex",
  border: "none",
  cursor: "pointer",
  outline: "inherit",
  height: "2rem",
  padding: "0 1rem",
  borderRadius: "3px"
};
const styles = {
  prompt: {
    display: "flex",
    position: "absolute",
    bottom: "3rem",
    right: "9rem",
    backgroundColor: "hsl(209, 61%, 16%)",
    zIndex: 1,
    color: "white",
    padding: "0 1rem 0 2rem",
    borderRadius: "3px",
    alignItems: "center"
  },
  hidden: {
    border: 0,
    clip: "rect(0 0 0 0)",
    height: "1px",
    width: "1px",
    margin: "-1px",
    padding: 0,
    overflow: "hidden",
    position: "absolute"
  },
  loading: {
    display: "inline",
    marginLeft: ".5rem"
  },
  button: {
    background: "hsl(209, 34%, 30%)",
    color: "hsl(212, 33%, 89%)",
    ...buttonCommon,
    textTransform: "uppercase",
    marginLeft: "2rem",
    fontWeight: "bold",
    "&:hover": {
      background: "hsl(209, 28%, 39%)"
    }
  },
  dismiss: {
    ...buttonCommon,
    background: "none",
    marginLeft: "1rem",
    color: "hsl(212, 33%, 89%)"
  }
};

export function Message(props) {
  return (
    <div
        className={props.className}
        style={assetsUpdateReady ? styles.prompt : styles.hidden}
      >
        <p>{props.message}</p>
        <button
          style={styles.button}
          type="button"
          onClick={props.onClick}
          disabled={!visible}
        >
          {props.buttonText}
          {/* {loading && (
            <Icon className={styles.loading} size="SMALL" svg={Loading} />
          )} */}
        </button>
        <button style={styles.dismiss} type="button" onClick={props.onDismiss}>
          {/* <ClearIcon
            height="1rem"
            width="1rem"
            fill="hsla(255, 100%, 100%, 0.3)"
          /> */}
          X
        </button>
      </div>
  );
}