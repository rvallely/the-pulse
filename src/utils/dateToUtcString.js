const dateToUtcString = (createdAt) => {
  const date = new Date(createdAt);
  return date.toUTCString();
};

export default dateToUtcString;
