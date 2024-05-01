/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { useState } from "react";
import { createUseStyles } from "react-jss";
import {
  convertDateToTimestamp,
  convertTimestampToDate,
} from "./utils/helpers";
import { useGlobalContext } from "./context/context";
import { appStyles } from "./styles/app.styles";
import { Card, Error, Loader, Pagination } from "./components/index";
import useBikes from "./hooks/useBikes";
import { START_PAGE } from "./constant/settings";

const useStyles = createUseStyles(appStyles);

function App() {
  const pageSize = 10;
  const [currentPage, setCurrentPage] = useState(START_PAGE);
  const [startDate, setStartDate] = useState<number>(0);
  const [query, setQuery] = useState("");
  const [endDate, setEndDate] = useState<number>(0);
  const [isFilterActive, setIsFilterActive] = useState<boolean>(false);
  const { loading, error } = useGlobalContext();
  const classes = useStyles();

  const handleStartDateChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const selectedDate = event.target.value;
    const timestamp = convertDateToTimestamp(selectedDate);
    setStartDate(timestamp);
    setCurrentPage(1);
  };

  const handleEndDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedDate = event.target.value;
    const timestamp = convertDateToTimestamp(selectedDate);
    setEndDate(timestamp);
    setCurrentPage(1);
  };
  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedQuery = event.target.value;
    setQuery(selectedQuery);
    setCurrentPage(1);
  };

  const resetFilter = () => {
    setIsFilterActive(false);
    setStartDate(0);
    setEndDate(0);
    setCurrentPage(1);
  };
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };
  const { bikes, count: totalCount } = useBikes(currentPage, {
    query,
    startDate,
    endDate,
  });
  console.log({ loading });

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <Error errorText={error} />;
  }

  return (
    <div className="App">
      <div className={classes.container}>
        <h2>the total number of bike theft cases is : {totalCount}</h2>
        <div>
          <h3>Date filter</h3>
          <label className={classes.label}>Start Date:</label>
          <input
            type="date"
            className={classes.input}
            value={startDate ? convertTimestampToDate(startDate) : ""}
            onChange={handleStartDateChange}
          />
          <label className={classes.label}>End Date:</label>
          <input
            type="date"
            className={classes.input}
            value={endDate ? convertTimestampToDate(endDate) : ""}
            onChange={handleEndDateChange}
          />
          <button className={classes.button} onClick={resetFilter}>
            Reset Filter
          </button>
        </div>
        <div>
          <label className={classes.label}>search for a title : </label>
          <input
            type="text"
            className={classes.input}
            value={query}
            onChange={handleQueryChange}
          />
        </div>
        {totalCount === 0 ? (
          <div className={classes.noBikes}> no bikes</div>
        ) : (
          bikes.map((bike) => (
            <Card
              id={bike.id.toString()}
              key={bike.id}
              title={bike.title}
              colors={bike.frame_colors}
              date={bike.date_stolen}
              img_url={bike.thumb}
              location={bike.stolen_location}
              serial={bike.serial}
            />
          ))
        )}

        <Pagination
          className="pagination-bar"
          siblingCount={1}
          currentPage={currentPage}
          totalCount={totalCount}
          pageSize={pageSize}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
}

export default App;
