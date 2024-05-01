export const bikeStyles = {
  container: {
    padding: {
      left: "100px",
      right: "100px",
      top: "50px",
    },
  },
  bikeTitle: {
    fontSize: "30px",
    fontWeight: 700,
    color: "#333",
  },
  image: {
    objectFit: "cover",
    position: "absolute",
    width: "100%",
    height: "100%",
  },
  image_container: {
    width: "70%",
    height: "500px",
    position: "relative",
  },
  span: {
    fontWeight: 700,
  },
  list: {
    listStyle: "none",
    padding: 0,
    fontSize: "17px",
    gap: "10px",
    width: "50%",
  },
  li: {
    marginTop: "10px",
    marginBottom: "10px",
  },
  button: {
    padding: "8px 16px",
    borderRadius: "4px",
    border: "none",
    backgroundColor: "#007bff",
    color: "#fff",
    cursor: "pointer",
    textDecoration: "none",
    transition: "background-color 0.3s",
    "&:hover": {
      backgroundColor: "#0056b3",
    },
  },
};
