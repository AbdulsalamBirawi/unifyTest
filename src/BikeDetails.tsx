/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Bike from "./interfaces/bike";
import axios from "axios";
import { createUseStyles } from "react-jss";
import placeholder from "../src/assets/big_placeholder.jpg";
import { convertTimestampToDate } from "./utils/helpers";
import { useGlobalContext } from "./context/context";
import { Error, Loader } from "./components/index";
import { bikeStyles } from "./styles/BikeDetails.styles";
import { API_URL } from "./constant/api";
const BikeDetails = () => {
  const useStyles = createUseStyles(bikeStyles);
  const params = useParams();
  const id = params.id;
  const classes = useStyles();
  const { loading, setLoading, error, setError } = useGlobalContext();
  const [Data, setData] = useState<Bike>();

  const getBike = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        `${API_URL}/bikes/${id}?access_token=x4IJhoEcdOIcOY1BpDiAF-8fd7yN6nlgeYIMQU4vZZY`
      );
      setData(res.data.bike);
    } catch (error) {
      setError("something wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getBike();
  }, []);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <Error errorText={error} />;
  }

  return (
    <div className={classes.container}>
      <Link className={classes.button} to={"/"}>
        {" "}
        Back{" "}
      </Link>
      <p className={classes.bikeTitle}>{Data?.title}</p>
      <p>
        <span className={classes.span}> stolen </span>
        {convertTimestampToDate(Data?.date_stolen)}{" "}
        <span className={classes.span}>from </span> {Data?.stolen_location}
      </p>
      <div className={classes.image_container}>
        <img
          className={classes.image}
          src={Data?.large_img ?? placeholder}
          alt={Data?.title}
        />
      </div>
      <div style={{ display: "flex" }}>
        <ul className={classes.list}>
          <li className={classes.li}>
            <span className={classes.span}>Serial: </span>
            {Data?.serial}
          </li>
          <li className={classes.li}>
            <span className={classes.span}>Manufacturer: </span>
            {Data?.manufacturer_name}
          </li>
          <li className={classes.li}>
            <span className={classes.span}>Primary colors: </span>
            {Data?.frame_colors.join(", ")}
          </li>
          <li className={classes.li}>
            <span className={classes.span}>description: </span>
            {Data?.description ?? "no description"}
          </li>
          <li className={classes.li}>
            <span className={classes.span}>date reported: </span>
            {convertTimestampToDate(Data?.stolen_record?.date_stolen)}
          </li>
        </ul>
      </div>
    </div>
  );
};

export default BikeDetails;
