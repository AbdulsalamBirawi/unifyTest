export const appStyles = {
  container: {
    padding: {
      left: "100px",
      right: "100px",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
    },
  },
  label: {
    margin: "8px",
  },
  input: {
    marginBottom: "16px",
    padding: "8px",
    border: "1px solid #ccc",
    borderRadius: "4px",
    outline: "none",
    "&:focus": {
      borderColor: "#007bff",
      boxShadow: "0 0 0 0.2rem rgba(0,123,255,.25)",
    },
  },
  button: {
    padding: "8px 16px",
    borderRadius: "4px",

    border: "none",
    backgroundColor: "#007bff",
    color: "#fff",
    cursor: "pointer",
    transition: "background-color 0.3s",
    "&:hover": {
      backgroundColor: "#0056b3",
    },
    "&:not(:last-child)": {
      marginRight: "8px",
      marginLeft: "8px",
    },
    marginLeft: "10px",
  },
  noBikes: {
    textAlign: "center",
    marginTop: "30px",
    fontSize: "30px",
  },
};
