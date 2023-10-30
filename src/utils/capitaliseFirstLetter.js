const capitaliseFirstLetter = (topic) => {
  const capital = topic.substring(0, 1).toUpperCase();
  const lower = topic.substring(1).split('').map((char) => char.toLowerCase()).join('');
  return capital + lower;
};

export default capitaliseFirstLetter;
