import { ColorRing } from "react-loader-spinner";

const Loader = () => {
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
      {" "}
      <ColorRing
        visible={true}
        height="80"
        width="80"
        ariaLabel="color-ring-loading"
        wrapperStyle={{}}
        wrapperClass="color-ring-wrapper"
        colors={["#333", "#333", "#333", "#333", "#333"]}
      />
    </div>
  );
};

export default Loader;
