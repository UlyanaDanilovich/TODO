const toggleArrayElement = (arr, element) => {
  const index = arr.indexOf(element);

  if (index !== -1) {
    arr.splice(index, 1);
  } else {
    arr.push(element);
  }

  return arr;
};

export default toggleArrayElement;
