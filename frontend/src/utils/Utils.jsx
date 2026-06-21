const extract_date_from_timestamp = (timestamp) => {
  const date = new Date(timestamp).toLocaleDateString();
  return date;
};

export default extract_date_from_timestamp;
