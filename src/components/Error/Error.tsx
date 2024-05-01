import React from "react";

type error = {
  errorText: string;
};
const Error = ({ errorText }: error) => {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginTop: "40vh",
      }}
    >
      {errorText}
    </div>
  );
};

export default Error;
