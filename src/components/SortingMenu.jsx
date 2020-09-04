import React from "react";

const sortingOptions = ["Date", "Author", "Topic", "Votes", "Comments"];

const SortingMenu = (props) => {
  const handleSelect = (selectEvent) => {
    props.setSortingBy(selectEvent.nativeEvent.target.value.toLowerCase());
  };

  return (
    <form onChange={handleSelect} id="sortForm">
      <label htmlFor="sorting">Sort by: </label>
      <select
        defaultValue={
          props.sortingOptions.charAt(0).toUpperCase() +
          props.sortingOptions.slice(1)
        }
        name="sorting"
        id="sorting"
      >
        {sortingOptions.map((option) => {
          return (
            <option id={option} key={option} value={option}>
              {option}
            </option>
          );
        })}
      </select>
    </form>
  );
};

export default SortingMenu;
