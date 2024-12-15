const isTitleValid = (title) => {
  return title === '' || title.trim().length !== title.length;
};

export default isTitleValid;
