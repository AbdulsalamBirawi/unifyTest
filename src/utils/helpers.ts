export const convertDateToTimestamp = (dateString: string): number => {
  const parts = dateString.split("-");
  const year = parseInt(parts[0]);
  const month = parseInt(parts[1]) - 1;
  const day = parseInt(parts[2]);

  const date = new Date(year, month, day);
  return Math.floor(date.getTime() / 1000);
};

export const convertTimestampToDate = (
  timestamp: number | undefined
): string => {
  if (typeof timestamp === "undefined") {
    return "";
  }
  const date = new Date(timestamp * 1000);
  return date.toISOString().split("T")[0];
};
