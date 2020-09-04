import React from "react";

const SortingMenu = ({
  setSortingBy,
  sortingOptions,
  changeArticlesPerPage,
}) => {
  const availableSortingOptions = [
    "Date",
    "Author",
    "Topic",
    "Votes",
    "Comments",
  ];
  const noArticlesPerPage = [5, 10, 15];
  const handleSelect = (selectEvent) => {
    if (selectEvent.nativeEvent.target.id === "noPages") {
      changeArticlesPerPage(selectEvent.nativeEvent.target.value);
    } else {
      setSortingBy(selectEvent.nativeEvent.target.value.toLowerCase());
    }
  };

  return (
    <React.Fragment>
      <form onChange={handleSelect} id="sortForm">
        <label htmlFor="sorting">Sort by: </label>
        <select
          defaultValue={
            sortingOptions.charAt(0).toUpperCase() + sortingOptions.slice(1)
          }
          name="sorting"
          id="sorting"
        >
          {availableSortingOptions.map((option) => {
            return (
              <option id={option} key={option} value={option}>
                {option}
              </option>
            );
          })}
        </select>
        <label htmlFor="noPages">Articles per page: </label>
        <select defaultValue={noArticlesPerPage[0]} name="noPages" id="noPages">
          {noArticlesPerPage.map((option) => {
            return (
              <option id={option} key={option} value={option}>
                {option}
              </option>
            );
          })}
        </select>
      </form>
    </React.Fragment>
  );
};

export default SortingMenu;
