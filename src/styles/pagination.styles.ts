export const paginationStyles = {
  paginationContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    listStyleType: "none",
  },
  paginationItem: {
    padding: "0 12px",
    height: "32px",
    textAlign: "center",
    margin: "auto 4px",
    color: "rgba(0, 0, 0, 0.87)",
    display: "flex",
    boxSizing: "border-box",
    alignItems: "center",
    letterSpacing: "0.01071em",
    borderRadius: "16px",
    lineHeight: "1.43",
    fontSize: "13px",
    minWidth: "32px",
    cursor: "pointer",
    "&$dots:hover": {
      backgroundColor: "transparent",
      cursor: "default",
    },
    "&:hover": {
      backgroundColor: "rgba(0, 0, 0, 0.04)",
    },
    "&$selected": {
      backgroundColor: "rgba(0, 0, 0, 0.08)",
    },
    "& $arrow": {
      "&::before": {
        position: "relative",
        content: '""',
        display: "inline-block",
        width: "0.4em",
        height: "0.4em",
        borderRight: "0.12em solid rgba(0, 0, 0, 0.87)",
        borderTop: "0.12em solid rgba(0, 0, 0, 0.87)",
      },
      "&$left": {
        transform: "rotate(-135deg) translate(-50%)",
      },
      "&$right": {
        transform: "rotate(45deg)",
      },
    },
    "&$disabled": {
      pointerEvents: "none",
      "& $arrow::before": {
        borderRight: "0.12em solid rgba(0, 0, 0, 0.43)",
        borderTop: "0.12em solid rgba(0, 0, 0, 0.43)",
      },
      "&:hover": {
        backgroundColor: "transparent",
        cursor: "default",
      },
    },
  },
  dots: {},
  selected: {},
  left: {},
  right: {},
  disabled: {},
  arrow: {}, // Define the arrow style
};
