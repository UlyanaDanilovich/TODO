const isSearchHasTitleDescSubstring = (rawSearch, rawTitle, rawDesc) => {
  const search = rawSearch.toLowerCase();
  const title = rawTitle.toLowerCase();
  const desc = rawDesc.toLowerCase();
  return title.includes(search) || desc.includes(search);
};

export default isSearchHasTitleDescSubstring;
