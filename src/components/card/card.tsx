import { createUseStyles } from "react-jss";
import placeholder from "../../assets/bike_placeolder.svg";
import { Link } from "react-router-dom";
import { cardStyles } from "../../styles/card.styles";

const useStyles = createUseStyles(cardStyles);
type CardProps = {
  id: string;
  title: string;
  location: string;
  img_url: string | null;
  colors: string[];
  serial: string;
  date: number;
};
const Card = ({
  title,
  img_url,
  colors,
  date,
  location,
  serial,
  id,
}: CardProps) => {
  const classes = useStyles();
  return (
    <div className={classes.card_container}>
      <img width={200} height={200} src={img_url ?? placeholder} alt={title} />
      <div className={classes.content_container}>
        <Link className={classes.link} to={`bike/${id}`}>
          {" "}
          {title}
        </Link>
        <div style={{ display: "flex", gap: 100 }}>
          <div>
            <p>
              <span className={classes.subtitle}> Serial : </span> {serial}
            </p>
            <p>
              <span className={classes.subtitle}> Primary colors: </span>{" "}
              {colors.join(", ")}
            </p>
          </div>
          <div>
            <p>
              {" "}
              <span style={{ color: "red", fontWeight: 700 }}>
                STOLEN :
              </span>{" "}
              {new Date(date * 1000).toLocaleDateString()}
            </p>
            <p>
              {" "}
              <span className={classes.subtitle}> stolen loaction: </span>{" "}
              {location}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
